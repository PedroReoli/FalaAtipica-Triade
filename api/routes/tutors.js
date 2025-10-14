// Rotas do Tutors (Pais/Responsáveis)
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, calculateOverallProgress, getLatest } = require('../utils/helpers');

/**
 * @swagger
 * /api/tutors/profile/{tutorId}:
 *   get:
 *     tags: [Tutors]
 *     summary: Perfil completo do tutor
 *     description: Retorna dados do tutor e suas crianças com progresso
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: string
 *         example: tutor_001
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *       404:
 *         description: Tutor não encontrado
 */
router.get('/profile/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    // Buscar dados do tutor
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.id === tutorId);
    
    if (!tutor) {
      return res.status(404).json(
        errorResponse('TUTOR_NOT_FOUND', 'Tutor não encontrado')
      );
    }
    
    // Buscar crianças do tutor
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const criancas = kidsData.usuarios?.filter(u => 
      tutor.criancasIds?.includes(u.id)
    ) || [];
    
    // Buscar progresso de cada criança
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    
    const criancasComProgresso = criancas.map(crianca => {
      const progressoCrianca = progressFile.progress?.filter(p => p.userId === crianca.id) || [];
      const progressoGeral = calculateOverallProgress(progressoCrianca);
      
      return {
        id: crianca.id,
        nome: crianca.nome,
        idade: crianca.idade,
        progressoGeral,
        diagnostico: 'Atraso no desenvolvimento da linguagem', // Mockado
        ultimaAtividade: progressoCrianca.length > 0 
          ? progressoCrianca[progressoCrianca.length - 1].timestamp 
          : null,
        jogos: {
          totalJogos: progressoCrianca.length,
          jogosCompletos: progressoCrianca.length,
          tempoTotal: Math.round(progressoCrianca.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / 60)
        }
      };
    });
    
    // Remover senha
    const { senha, ...tutorSemSenha } = tutor;
    
    res.json(successResponse({
      usuario: tutorSemSenha,
      criancas: criancasComProgresso,
      estatisticas: {
        totalCriancas: criancasComProgresso.length,
        criancasAtivas: criancasComProgresso.length,
        progressoMedio: Math.round(
          criancasComProgresso.reduce((sum, c) => sum + c.progressoGeral, 0) / criancasComProgresso.length || 0
        )
      }
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar perfil do tutor:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar perfil', error.message)
    );
  }
});

// GET /api/tutors/children/:tutorId - Lista de crianças do tutor
router.get('/children/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    // Buscar tutor
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.id === tutorId);
    
    if (!tutor) {
      return res.status(404).json(
        errorResponse('TUTOR_NOT_FOUND', 'Tutor não encontrado')
      );
    }
    
    // Buscar crianças
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const criancas = kidsData.usuarios?.filter(u => 
      tutor.criancasIds?.includes(u.id)
    ) || [];
    
    res.json(successResponse(criancas));
    
  } catch (error) {
    console.error('❌ Erro ao buscar crianças:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar crianças', error.message)
    );
  }
});

// GET /api/tutors/progress/:childId - Progresso detalhado de uma criança
router.get('/progress/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Buscar criança
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const child = kidsData.usuarios?.find(u => u.id === childId);
    
    if (!child) {
      return res.status(404).json(
        errorResponse('CHILD_NOT_FOUND', 'Criança não encontrada')
      );
    }
    
    // Buscar progresso
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const progressoCrianca = progressFile.progress?.filter(p => p.userId === childId) || [];
    
    // Calcular estatísticas
    const progressoGeral = calculateOverallProgress(progressoCrianca);
    const ultimasAtividades = getLatest(progressoCrianca, 10);
    
    // Agrupar por jogo
    const porJogo = progressoCrianca.reduce((acc, p) => {
      if (!acc[p.gameId]) {
        acc[p.gameId] = {
          gameId: p.gameId,
          gameName: getGameName(p.gameId),
          jogos: [],
          mediaScore: 0
        };
      }
      acc[p.gameId].jogos.push(p);
      return acc;
    }, {});
    
    // Calcular média por jogo
    Object.values(porJogo).forEach(game => {
      game.mediaScore = Math.round(
        game.jogos.reduce((sum, j) => sum + j.score, 0) / game.jogos.length
      );
    });
    
    res.json(successResponse({
      childId,
      childName: child.nome,
      progressoGeral,
      ultimasAtividades,
      estatisticas: {
        totalJogos: progressoCrianca.length,
        jogosCompletos: progressoCrianca.length,
        tempoTotal: Math.round(
          progressoCrianca.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / 60
        ),
        mediaGeral: progressoGeral
      },
      porJogo: Object.values(porJogo)
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar progresso:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar progresso', error.message)
    );
  }
});

// GET /api/tutors/reports/:childId - Relatórios da criança
router.get('/reports/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Buscar relatórios (simplificado - mockado)
    const reports = [
      {
        id: 'report_001',
        childId,
        tipo: 'Mensal',
        periodo: new Date().toISOString().substring(0, 7),
        resumo: 'Progresso satisfatório',
        timestamp: new Date().toISOString()
      }
    ];
    
    res.json(successResponse(reports));
    
  } catch (error) {
    console.error('❌ Erro ao buscar relatórios:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar relatórios', error.message)
    );
  }
});

// GET /api/tutors/tips - Buscar dicas
router.get('/tips', async (req, res) => {
  try {
    const { category } = req.query;
    
    // Buscar dicas do JSON
    const dicasData = await jsonService.readJSON('TUTORS/dicas.json');
    
    let tips = dicasData.dicas || [];
    
    // Filtrar por categoria se fornecida
    if (category) {
      tips = tips.filter(tip => tip.categoria === category);
    }
    
    res.json(successResponse(tips));
    
  } catch (error) {
    console.error('❌ Erro ao buscar dicas:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar dicas', error.message)
    );
  }
});

// GET /api/tutors/support - Buscar suporte/FAQ
router.get('/support', async (req, res) => {
  try {
    // Buscar dados de suporte do JSON
    const suporteData = await jsonService.readJSON('TUTORS/suporte.json');
    
    res.json(successResponse(suporteData));
    
  } catch (error) {
    console.error('❌ Erro ao buscar suporte:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar suporte', error.message)
    );
  }
});

// GET /api/tutors/settings/:tutorId - Configurações do tutor
router.get('/settings/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    // Buscar tutor
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.id === tutorId);
    
    if (!tutor) {
      return res.status(404).json(
        errorResponse('TUTOR_NOT_FOUND', 'Tutor não encontrado')
      );
    }
    
    res.json(successResponse({
      configuracoes: tutor.configuracoes || {}
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar configurações:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar configurações', error.message)
    );
  }
});

// PUT /api/tutors/settings/:tutorId - Atualizar configurações
router.put('/settings/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    const { configuracoes } = req.body;
    
    // Atualizar configurações
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutorIndex = tutorsData.tutores?.findIndex(t => t.id === tutorId);
    
    if (tutorIndex === -1 || tutorIndex === undefined) {
      return res.status(404).json(
        errorResponse('TUTOR_NOT_FOUND', 'Tutor não encontrado')
      );
    }
    
    tutorsData.tutores[tutorIndex].configuracoes = {
      ...tutorsData.tutores[tutorIndex].configuracoes,
      ...configuracoes
    };
    
    await jsonService.writeJSON('TUTORS/usuarios.json', tutorsData);
    
    console.log(`✅ Configurações atualizadas: ${tutorId}`);
    
    res.json(successResponse(
      tutorsData.tutores[tutorIndex].configuracoes,
      'Configurações atualizadas com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao atualizar configurações:', error);
    res.status(500).json(
      errorResponse('UPDATE_ERROR', 'Erro ao atualizar configurações', error.message)
    );
  }
});

// Função auxiliar
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

