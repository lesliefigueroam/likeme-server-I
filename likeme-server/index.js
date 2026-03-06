require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// 1) Habilitar CORS (requisito)
app.use(cors());

// 2) Poder leer JSON
app.use(express.json());

// 3) Configurar pool de pg usando variables de entorno
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
});

// Ruta de prueba base
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Servidor Like Me funcionando' });
});

/*
  RUTA GET: devolver todos los posts
  - Devuelve status 200 y arreglo JSON con los registros.
  - Manejo básico de errores para devolver 500 si la consulta falla.
*/
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error GET /posts', err);
    res.status(500).json({ error: 'Error al obtener posts' });
  }
});

/*
  RUTA POST: crear un nuevo post
  - Espera JSON con { titulo, url, descripcion, likes }
  - Usa consultas parametrizadas para evitar inyección SQL
*/
app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion, likes } = req.body;

    // Validación básica (puedes ajustarla)
    if (!titulo || typeof titulo !== 'string') {
      return res.status(400).json({ error: 'titulo es requerido y debe ser string' });
    }

    const query = `
      INSERT INTO posts (titulo, url, descripcion, likes)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [titulo, url || null, descripcion || null, Number.isInteger(likes) ? likes : 0];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error POST /posts', err);
    res.status(500).json({ error: 'Error al crear post' });
  }
});

// Ruta para actualizar los likes
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Actualizamos el valor de likes incrementando en 1
    const result = await pool.query(
      'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error PUT /posts/like/:id:', err.message);
    res.status(500).json({ error: 'Error al actualizar los likes' });
  }
});

// Ruta para eliminar un post
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *;', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    res.status(200).json({ mensaje: 'Post eliminado correctamente', post: result.rows[0] });
  } catch (err) {
    console.error('Error DELETE /posts/:id:', err.message);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
}); 

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});