const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'adopet-secret-key-2024';

// Middleware para verificar se o usuário está autenticado
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: 'Token não fornecido',
      message: 'É necessário fornecer um token de autenticação'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Token inválido',
        message: 'Token expirado ou inválido'
      });
    }

    req.user = user;
    next();
  });
};

// Função para gerar token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET
};
