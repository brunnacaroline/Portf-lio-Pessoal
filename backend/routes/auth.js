const express = require('express');
const bcrypt = require('bcryptjs');
const { users, DEFAULT_PASSWORD, isUserBlocked, incrementLoginAttempts, resetLoginAttempts } = require('../data/mockData');
const { generateToken } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica se o login foi bem-sucedido
 *         message:
 *           type: string
 *           description: Mensagem de resposta
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             email:
 *               type: string
 *             name:
 *               type: string
 *     PasswordResetRequest:
 *       type: object
 *       required:
 *         - email
 *         - newPassword
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         newPassword:
 *           type: string
 *           description: Nova senha
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Criar novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Usuário já existe
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validação dos campos obrigatórios
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios',
        message: 'Email, senha e nome são obrigatórios'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Formato de email inválido'
      });
    }

    // Verificar se o usuário já existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Usuário já existe',
        message: 'Já existe um usuário com este email'
      });
    }

    // Criar novo usuário
    const newUser = {
      id: users.length + 1,
      email,
      password: await bcrypt.hash(password, 10),
      name,
      isBlocked: false,
      loginAttempts: 0,
      lastLoginAttempt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao criar usuário'
    });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 *       423:
 *         description: Usuário bloqueado
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação dos campos obrigatórios
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios',
        message: 'Email e senha são obrigatórios'
      });
    }

    // Buscar usuário pelo email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Credenciais inválidas',
        message: 'Usuário ou senha inválidos, tente novamente'
      });
    }

    // Verificar se o usuário está bloqueado
    if (isUserBlocked(user.id)) {
      return res.status(423).json({
        success: false,
        error: 'Usuário bloqueado',
        message: 'Usuário bloqueado por múltiplas tentativas de login. Tente novamente em 15 minutos.'
      });
    }

    // Verificar senha
      // Verificar senha (aceita hash bcrypt ou texto puro mock)
      let isValidPassword = false;
      const stored = user.password || '';
      const isBcrypt = typeof stored === 'string' && stored.startsWith('$2');
  
      if (isBcrypt) {
        isValidPassword = await bcrypt.compare(password, stored);
      } else {
        isValidPassword = password === stored;
        if (isValidPassword) {
          user.password = await bcrypt.hash(stored, 10);
          user.updatedAt = new Date();
        }
      }
  
      if (!isValidPassword) {
        incrementLoginAttempts(user.id);
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas',
          message: 'Usuário ou senha inválidos, tente novamente'
        });
      }

    // Login bem-sucedido - resetar tentativas
    resetLoginAttempts(user.id);

    // Gerar token JWT
    const token = generateToken(user);

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao realizar login'
    });
  }
});

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Trocar senha do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordResetRequest'
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validação dos campos obrigatórios
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios',
        message: 'Email e nova senha são obrigatórios'
      });
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
        message: 'Formato de email inválido'
      });
    }

    // Buscar usuário pelo email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuário não encontrado',
        message: 'Não foi encontrado um usuário com este email'
      });
    }

    // Atualizar senha
    user.password = await bcrypt.hash(newPassword, 10);
    user.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Senha alterada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno',
      message: 'Erro ao alterar senha'
    });
  }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Obter perfil do usuário autenticado
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 */
router.get('/profile', (req, res) => {
  // Esta rota seria protegida pelo middleware de autenticação
  // Por enquanto, retorna uma mensagem informativa
  res.json({
    success: true,
    message: 'Esta rota requer autenticação. Use o middleware authenticateToken.'
  });
});

module.exports = router;
