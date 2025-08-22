const jwt = require('jsonwebtoken');

const JWT_SECRET = 'adopet-secret-key-2024';

/**
 * Middleware para verificar se o usuário está autenticado
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: 'Token não fornecido',
      message: 'Acesso negado. Token de autenticação é obrigatório.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: 'Token inválido',
      message: 'Token de autenticação inválido ou expirado.'
    });
  }
};

/**
 * Middleware para verificar se o usuário não está bloqueado
 */
const checkUserBlocked = (req, res, next) => {
  const { users } = require('../data/mockData');
  const user = users.find(u => u.id === req.user.id);
  
  if (user && user.isBlocked) {
    return res.status(403).json({
      error: 'Usuário bloqueado',
      message: 'Sua conta foi bloqueada devido a múltiplas tentativas de login inválidas.'
    });
  }
  
  next();
};

module.exports = {
  authenticateToken,
  checkUserBlocked,
  JWT_SECRET
};
