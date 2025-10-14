// Servidor principal da API Local - FalaAtípica
// Sincroniza dados entre Kids, Tutors e Pro em tempo real

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Configuração do Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // Permite Kids, Tutors e Pro
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger customizado
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Setup avançado de WebSocket
const setupWebSocket = require('./socket');
const socketHelpers = setupWebSocket(io);

// Disponibilizar io e helpers para as rotas
app.set('io', io);
app.set('socketHelpers', socketHelpers);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'FalaAtípica API Docs'
}));

// Swagger JSON
app.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rotas
const authRoutes = require('./routes/auth');
const kidsRoutes = require('./routes/kids');
const tutorsRoutes = require('./routes/tutors');
const proRoutes = require('./routes/pro');
const syncRoutes = require('./routes/sync');

app.use('/api/auth', authRoutes);
app.use('/api/kids', kidsRoutes);
app.use('/api/tutors', tutorsRoutes);
app.use('/api/pro', proRoutes);
app.use('/api/sync', syncRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Erro interno do servidor'
    }
  });
});

// Rota 404 (Express 5 não aceita mais '*')
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Rota não encontrada'
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log(`🚀 API Local - FalaAtípica`);
  console.log(`🚀 Rodando em: http://localhost:${PORT}`);
  console.log(`🚀 WebSocket: ws://localhost:${PORT}`);
  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api/docs`);
  console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ========================================');
  console.log('');
  console.log('📡 Aguardando conexões...');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
    process.exit(0);
  });
});

module.exports = { app, server, io };

