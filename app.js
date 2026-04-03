const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// 🔐 Configuración
const SECRET_KEY = 'super_secret_key_123'; // usar .env en producción
const users = []; // simulación de DB

// ==========================
// 🟢 REGISTER
// ==========================
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validación básica
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  // Verificar si existe
  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(409).json({
      error: 'Usuario ya existe'
    });
  }

  try {
    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente'
    });

  } catch (err) {
    res.status(500).json({
      error: 'Error en el servidor'
    });
  }
});


// ==========================
// 🔵 LOGIN
// ==========================
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }

  // Payload
  const payload = {
    username: user.username,
    rol: 'usuario'
  };

  // Token
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: '1h'
  });

  res.json({ token });
});


// ==========================
// 🛡️ MIDDLEWARE
// ==========================
function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      error: 'Token requerido'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      error: 'Token inválido o expirado'
    });
  }
}


// ==========================
// 🔐 RUTA PROTEGIDA
// ==========================
app.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Acceso permitido',
    usuario: req.usuario
  });
});


// ==========================
// 🚀 SERVER
// ==========================
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});