// Rotas de sincronização
const express = require('express');
const router = express.Router();
const { successResponse, errorResponse } = require('../utils/helpers');

// GET /api/sync/status - Status da API
router.get('/status', (req, res) => {
  const io = req.app.get('io');
  const connectedClients = io.engine.clientsCount || 0;
  
  res.json(successResponse({
    status: 'online',
    lastSync: new Date().toISOString(),
    connectedClients,
    pendingUpdates: 0,
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    }
  }));
});

// POST /api/sync/force - Forçar sincronização
router.post('/force', async (req, res) => {
  try {
    const io = req.app.get('io');
    
    // Emitir evento de sincronização forçada
    io.emit('force-sync', {
      timestamp: new Date().toISOString()
    });
    
    console.log('🔄 Sincronização forçada');
    
    res.json(successResponse({
      syncedFiles: [
        'progress.json',
        'sessions.json',
        'usuarios.json'
      ],
      timestamp: new Date().toISOString()
    }, 'Sincronização forçada com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro ao forçar sincronização:', error);
    res.status(500).json(
      errorResponse('SYNC_ERROR', 'Erro ao sincronizar', error.message)
    );
  }
});

// GET /api/sync/history - Histórico de sincronizações (mockado)
router.get('/history', (req, res) => {
  const history = [
    {
      id: 'sync_001',
      tipo: 'automática',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'sucesso'
    },
    {
      id: 'sync_002',
      tipo: 'manual',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      status: 'sucesso'
    }
  ];
  
  res.json(successResponse(history));
});

module.exports = router;

