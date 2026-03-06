# 📸 Like Me — Servidor Backend

Proyecto desarrollado con **Node.js**, **Express** y **PostgreSQL** para gestionar publicaciones ("posts") en una aplicación tipo red social.
Forma parte del desafío **Like Me (Parte I)**.

---

## 🚀 Tecnologías usadas

- Node.js
- Express
- PostgreSQL
- CORS
- Dotenv
- Nodemon (modo desarrollo)

---

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio o copiar la carpeta del servidor

```bash
git clone <url-del-repo>
cd likeme-server
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

---

## 🗂️ Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con tus credenciales de PostgreSQL:

```bash
PORT=3000
PGUSER=postgres
PGPASSWORD=tu_contraseña
PGHOST=localhost
PGDATABASE=likeme
PGPORT=5432
```

---

## 🧱 Creación de la base de datos y tabla

Abre **psql** o **pgAdmin**, y ejecuta las siguientes consultas SQL para crear la base de datos y la tabla `posts`:

```sql
-- Crear la base de datos
CREATE DATABASE likeme;

-- Conectarse a la base de datos
\c likeme

-- Crear la tabla de publicaciones
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255),
  url VARCHAR(1000),
  descripcion TEXT,
  likes INT
);
```

---

## 🧩 Ejecución del servidor

### Modo normal:

```bash
npm start
```

### Modo desarrollo (reinicio automático con nodemon):

```bash
npm run dev
```

---

## 🌐 Endpoints disponibles

| Método     | Ruta              | Descripción                              |
| ---------- | ----------------- | ---------------------------------------- |
| **GET**    | `/posts`          | Obtiene todos los posts                  |
| **POST**   | `/posts`          | Crea un nuevo post                       |
| **PUT**    | `/posts/like/:id` | Incrementa el contador de likes del post |
| **DELETE** | `/posts/:id`      | Elimina un post                          |

---

## 🧠 Ejemplo de uso del endpoint POST

Solicitud:

```bash
POST /posts
Content-Type: application/json
```

Body:

```json
{
  "titulo": "Mi primer post",
  "url": "https://ejemplo.com/imagen.jpg",
  "descripcion": "¡Hola mundo!",
  "likes": 0
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "titulo": "Mi primer post",
  "url": "https://ejemplo.com/imagen.jpg",
  "descripcion": "¡Hola mundo!",
  "likes": 0
}
```

---

## 📞 Notas importantes

- Asegúrate de que el backend (puerto 3000) y el frontend (puerto 5173 o 3001) no entren en conflicto.
- Si usas **Vite** para el frontend, ejecuta con `npm run dev` en su carpeta correspondiente.
- CORS está habilitado globalmente para permitir comunicación entre ambos.
- Se recomienda usar contraseñas seguras y mantener el archivo `.env` fuera del repositorio.

---

## 💬 Créditos

Desarrollado por **Leslie Figueroa**
Desafío **“Like Me” — Desafío Latam**
