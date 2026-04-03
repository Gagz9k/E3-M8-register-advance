# 🔐 API de Autenticación con JWT + Upload de Avatar

## 🚀 Descripción

Este proyecto implementa una API REST completa usando Node.js y Express
que incluye:

-   Registro de usuarios con contraseñas seguras (bcrypt)
-   Login con generación de JSON Web Tokens (JWT)
-   Middleware de autenticación para proteger rutas
-   Subida de archivos (avatar) usando express-fileupload

------------------------------------------------------------------------

## 📦 Tecnologías

-   Node.js
-   Express
-   bcryptjs
-   jsonwebtoken
-   express-fileupload

------------------------------------------------------------------------

## ⚙️ Instalación

``` bash
npm install
```

Dependencias clave:

``` bash
npm install express bcryptjs jsonwebtoken express-fileupload
```

------------------------------------------------------------------------

## ▶️ Ejecución

``` bash
node app.js
```

Servidor disponible en:

    http://localhost:3000

------------------------------------------------------------------------

## 🔐 Endpoints

### 🟢 Registro

POST `/register`

``` json
{
  "username": "user",
  "password": "123456"
}
```

------------------------------------------------------------------------

### 🔵 Login

POST `/login`

``` json
{
  "username": "user",
  "password": "123456"
}
```

Respuesta:

``` json
{
  "token": "JWT_TOKEN"
}
```

------------------------------------------------------------------------

### 🔒 Ruta Protegida

GET `/perfil`

Headers:

    Authorization: Bearer JWT_TOKEN

------------------------------------------------------------------------

### 🖼️ Upload de Avatar

POST `/upload/avatar/:userId`

Body → form-data

-   key: `avatar`
-   type: File

------------------------------------------------------------------------

## 🧠 Conceptos Clave

-   Hashing de contraseñas con bcrypt
-   Autenticación con JWT
-   Middleware en Express
-   Manejo de archivos con express-fileupload
-   Seguridad básica en APIs

------------------------------------------------------------------------

## 📁 Estructura del Proyecto

    project/
    │-- app.js
    │-- package.json
    │-- uploads/
        └── avatars/

------------------------------------------------------------------------

## 🔥 Mejoras Futuras

-   Uso de variables de entorno (.env)
-   Base de datos real (PostgreSQL / MongoDB)
-   Validación avanzada (express-validator)
-   Roles y permisos (admin/user)
-   Refresh tokens

------------------------------------------------------------------------


