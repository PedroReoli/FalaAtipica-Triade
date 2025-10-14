// Rotas do Kids (Crianças)
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, generateId, calculateOverallProgress } = require('../utils/helpers');

// POST /api/kids/progress - Salvar progresso de jogo
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
      
      io.emit('progress-updated', {
        userId,
        childName: child.nome,
        gameId,
        gameName: getGameName(gameId),
        score,
        category,
        timestamp: progressData.timestamp
      });
      
      console.log(`🎮 Progresso salvo: ${child.nome} - ${gameId} - ${score}%`);
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

// GET /api/kids/progress/:userId - Buscar progresso de uma criança
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

// GET /api/kids/games - Lista de jogos disponíveis
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

