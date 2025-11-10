// Rotas do Kids (Crianças)
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, generateId, calculateOverallProgress } = require('../utils/helpers');

// Cache para lembretes (evitar spam de logs)
const remindersCache = new Map();

/**
 * @swagger
 * /api/kids/progress:
 *   post:
 *     tags: [Kids]
 *     summary: Salvar progresso de jogo
 *     description: Registra o progresso da criança após completar um jogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Progress'
 *     responses:
 *       201:
 *         description: Progresso salvo com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/progress', async (req, res) => {
  try {
    const {
      userId,
      gameId,
      level,
      score,
      correctAnswers,
      wrongAnswers,
      timeSpent,
      category
    } = req.body;
    
    // Validações
    if (!userId || !gameId || score === undefined) {
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'userId, gameId e score são obrigatórios')
      );
    }
    
    // Criar objeto de progresso
    const progressData = {
      id: generateId('progress'),
      userId,
      gameId,
      level: level || 1,
      score,
      correctAnswers: correctAnswers || 0,
      wrongAnswers: wrongAnswers || 0,
      timeSpent: timeSpent || 0,
      category: category || 'geral',
      timestamp: new Date().toISOString()
    };
    
    // Salvar no JSON (criar arquivo shared se não existir)
    let progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    
    if (!progressFile.progress) {
      progressFile = { progress: [] };
    }
    
    progressFile.progress.push(progressData);
    await jsonService.writeJSON('shared/progress.json', progressFile);
    
    // Verificar conquistas (simplificado)
    const newAchievements = [];
    const userProgress = progressFile.progress.filter(p => p.userId === userId);
    
    if (userProgress.length === 1) {
      newAchievements.push({
        id: 'first_game',
        title: 'Primeira Estrela',
        description: 'Completou o primeiro jogo'
      });
    }
    
    if (score === 100) {
      newAchievements.push({
        id: 'perfect_score',
        title: 'Perfeição',
        description: 'Completou um jogo com 100%'
      });
    }
    
    // Emitir evento WebSocket
    const io = req.app.get('io');
    
    // Buscar dados da criança para notificação
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const child = kidsData.usuarios?.find(u => u.id === userId);
    
    if (child) {
      // Emitir para tutor e profissional
      const responsavelEmail = child.responsavel?.email;
      
      // Evento genérico de progresso
      io.emit('progress-updated', {
        userId,
        childName: child.nome,
        gameId,
        gameName: getGameName(gameId),
        score,
        category,
        timestamp: progressData.timestamp
      });
      
      // Evento específico para Tutors (child-game-completed)
      io.emit('child-game-completed', {
        userId,
        userName: child.nome,
        gameId,
        gameName: getGameName(gameId),
        score,
        category,
        timestamp: progressData.timestamp
      });
      
      // Evento específico para Pro (patient-game-completed)
      io.emit('patient-game-completed', {
        patientId: userId,
        patientName: child.nome,
        gameId,
        gameName: getGameName(gameId),
        score,
        category,
        timestamp: progressData.timestamp
      });
      
      console.log(`🎮 Progresso salvo: ${child.nome} - ${gameId} - ${score}%`);
      console.log(`📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed`);
    }
    
    // Calcular próximo nível
    const nextLevel = level + 1;
    
    res.status(201).json(successResponse({
      progressId: progressData.id,
      newAchievements,
      nextLevel,
      totalGames: userProgress.length
    }, 'Progresso salvo com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro ao salvar progresso:', error);
    res.status(500).json(
      errorResponse('PROGRESS_ERROR', 'Erro ao salvar progresso', error.message)
    );
  }
});

/**
 * @swagger
 * /api/kids/progress/{userId}:
 *   get:
 *     tags: [Kids]
 *     summary: Buscar progresso de uma criança
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "1"
 *     responses:
 *       200:
 *         description: Progresso retornado com sucesso
 */
router.get('/progress/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Buscar progresso
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const userProgress = progressFile.progress?.filter(p => p.userId === userId) || [];
    
    // Calcular estatísticas
    const progressoGeral = calculateOverallProgress(userProgress);
    const jogosCompletos = userProgress.length;
    const tempoTotal = userProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);
    
    // Buscar conquistas (simplificado)
    const conquistas = [];
    if (jogosCompletos >= 1) {
      conquistas.push({
        id: 'primeira_conquista',
        nome: 'Primeira Estrela',
        data: userProgress[0].timestamp
      });
    }
    
    res.json(successResponse({
      userId,
      progressoGeral,
      jogosCompletos,
      tempoTotal: Math.round(tempoTotal / 60), // em minutos
      conquistas,
      ultimasAtividades: userProgress.slice(-5).reverse()
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar progresso:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar progresso', error.message)
    );
  }
});

/**
 * @swagger
 * /api/kids/games:
 *   get:
 *     tags: [Kids]
 *     summary: Lista de jogos disponíveis
 *     responses:
 *       200:
 *         description: Lista de jogos retornada
 */
router.get('/games', (req, res) => {
  const games = [
    { id: 'palavras', nome: 'Jogo das Palavras', categoria: 'linguagem' },
    { id: 'adivinha', nome: 'Adivinha', categoria: 'cognição' },
    { id: 'igual-diferente', nome: 'Igual ou Diferente', categoria: 'percepção' },
    { id: 'cena-certa', nome: 'Cena Certa', categoria: 'compreensão' }
  ];
  
  res.json(successResponse(games));
});

// GET /api/kids/achievements/:userId - Conquistas de uma criança
router.get('/achievements/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Buscar progresso para calcular conquistas
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const userProgress = progressFile.progress?.filter(p => p.userId === userId) || [];
    
    const conquistas = [];
    
    if (userProgress.length >= 1) {
      conquistas.push({
        id: 'primeira_estrela',
        nome: 'Primeira Estrela',
        descricao: 'Completou o primeiro jogo',
        data: userProgress[0].timestamp,
        icone: 'star'
      });
    }
    
    if (userProgress.length >= 10) {
      conquistas.push({
        id: 'jogador_dedicado',
        nome: 'Jogador Dedicado',
        descricao: 'Completou 10 jogos',
        icone: 'trophy'
      });
    }
    
    const perfectScores = userProgress.filter(p => p.score === 100);
    if (perfectScores.length >= 1) {
      conquistas.push({
        id: 'perfeicao',
        nome: 'Perfeição',
        descricao: 'Completou um jogo com 100%',
        icone: 'medal'
      });
    }
    
    res.json(successResponse(conquistas));
    
  } catch (error) {
    console.error('❌ Erro ao buscar conquistas:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar conquistas', error.message)
    );
  }
});

// GET /api/kids/reminders/:userId - Buscar lembretes da criança
router.get('/reminders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Buscar lembretes do arquivo compartilhado
    const remindersFile = await jsonService.readJSON('shared/reminders.json').catch(() => ({ reminders: [] }));
    const todosLembretes = remindersFile.reminders || [];
    
    // Filtrar apenas lembretes da criança
    const lembretesUsuario = todosLembretes.filter(reminder => reminder.childId === userId);
    
    // Separar entre não lidos e lidos
    const naoLidos = lembretesUsuario.filter(r => !r.lido);
    const lidos = lembretesUsuario.filter(r => r.lido);
    
    // Verificar se houve mudança nos dados
    const cacheKey = `user_${userId}`;
    const currentState = `${naoLidos.length}-${lidos.length}`;
    const cachedState = remindersCache.get(cacheKey);
    
    if (currentState !== cachedState) {
      console.log(`✅ Lembretes atualizados: ${naoLidos.length} não lidos, ${lidos.length} lidos para criança ${userId}`);
      remindersCache.set(cacheKey, currentState);
    }
    
    res.json(successResponse({
      naoLidos,
      lidos,
      totalNaoLidos: naoLidos.length,
      totalLidos: lidos.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar lembretes:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar lembretes', error.message)
    );
  }
});

// PUT /api/kids/reminder/:reminderId/read - Marcar lembrete como lido
router.put('/reminder/:reminderId/read', async (req, res) => {
  try {
    const { reminderId } = req.params;
    
    // Buscar e atualizar lembrete
    const remindersFile = await jsonService.readJSON('shared/reminders.json');
    const reminderIndex = remindersFile.reminders?.findIndex(r => r.id === reminderId);
    
    if (reminderIndex === -1 || reminderIndex === undefined) {
      return res.status(404).json(
        errorResponse('REMINDER_NOT_FOUND', 'Lembrete não encontrado')
      );
    }
    
    remindersFile.reminders[reminderIndex].lido = true;
    await jsonService.writeJSON('shared/reminders.json', remindersFile);
    
    console.log(`✅ Lembrete marcado como lido: ${reminderId}`);
    
    res.json(successResponse(
      remindersFile.reminders[reminderIndex],
      'Lembrete marcado como lido'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao marcar lembrete como lido:', error);
    res.status(500).json(
      errorResponse('UPDATE_ERROR', 'Erro ao atualizar lembrete', error.message)
    );
  }
});

// Função auxiliar para nome do jogo
function getGameName(gameId) {
  const names = {
    'palavras': 'Jogo das Palavras',
    'adivinha': 'Adivinha',
    'igual-diferente': 'Igual ou Diferente',
    'cena-certa': 'Cena Certa'
  };
  return names[gameId] || gameId;
}

module.exports = router;

