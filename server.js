const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('./routes/auth');
const petRoutes = require('./routes/pets');
const { initializeData } = require('./scripts/initData');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adopet API',
      version: '1.0.0',
      description: 'API REST para sistema de adoção de pets com autenticação',
      contact: {
        name: 'Brunna',
        email: 'brunna@example.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware de segurança
app.use(helmet());

// Rate limiting para prevenir ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requests por IP
  message: 'Muitas tentativas de acesso, tente novamente mais tarde.'
});
app.use('/api/', limiter);

// Middleware específico para login (3 tentativas)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // máximo 3 tentativas
  message: 'Muitas tentativas de login. Usuário bloqueado por 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', loginLimiter);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API Adopet!',
    docs: '/api-docs',
    auth: '/api/auth',
    pets: '/api/pets'
  });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: 'A rota solicitada não existe'
  });
});

initializeData()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
      console.log(`🔐 API de autenticação: http://localhost:${PORT}/api/auth`);
      console.log(`🐾 API de pets: http://localhost:${PORT}/api/pets`);
    });
  })
  .catch((err) => {
    console.error('Erro ao inicializar dados:', err);
  });

module.exports = app;