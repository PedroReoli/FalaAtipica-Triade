// Configuração do Swagger
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Local - FalaAtípica',
      version: '1.0.0',
      description: 'API de sincronização em tempo real entre Kids, Tutors e Pro',
      contact: {
        name: 'FalaAtípica Team',
        email: 'pedrosousa2160@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor Local de Desenvolvimento'
      }
    ],
    tags: [
      { name: 'Auth', description: 'Autenticação' },
      { name: 'Kids', description: 'Endpoints para crianças (progresso, jogos)' },
      { name: 'Tutors', description: 'Endpoints para pais/responsáveis' },
      { name: 'Pro', description: 'Endpoints para profissionais (fono, psico, etc)' },
      { name: 'Sync', description: 'Sincronização e status' }
    ],
    components: {
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
            message: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                details: { type: 'string' }
              }
            },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        Progress: {
          type: 'object',
          properties: {
            userId: { type: 'string', example: '1' },
            gameId: { type: 'string', example: 'palavras' },
            level: { type: 'integer', example: 1 },
            score: { type: 'integer', example: 85 },
            correctAnswers: { type: 'integer', example: 8 },
            wrongAnswers: { type: 'integer', example: 2 },
            timeSpent: { type: 'integer', example: 120 },
            category: { type: 'string', example: 'animais' }
          },
          required: ['userId', 'gameId', 'score']
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

