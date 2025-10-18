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
    
    // Definir TODOS os jogos disponíveis
    const todosOsJogos = {
      'igual-diferente': {
        gameId: 'igual-diferente',
        gameName: 'Igual-Diferente',
        jogos: [],
        mediaScore: 0
      },
      'cena-certa': {
        gameId: 'cena-certa',
        gameName: 'Cena Certa',
        jogos: [],
        mediaScore: 0
      },
      'adivinha': {
        gameId: 'adivinha',
        gameName: 'Adivinha',
        jogos: [],
        mediaScore: 0
      },
      'palavras': {
        gameId: 'palavras',
        gameName: 'Jogo das Palavras',
        jogos: [],
        mediaScore: 0
      }
    };
    
    // Agrupar progresso por jogo
    progressoCrianca.forEach(p => {
      if (todosOsJogos[p.gameId]) {
        todosOsJogos[p.gameId].jogos.push(p);
      }
    });
    
    // Calcular média por jogo (apenas para jogos jogados)
    Object.values(todosOsJogos).forEach(game => {
      if (game.jogos.length > 0) {
        game.mediaScore = Math.round(
          game.jogos.reduce((sum, j) => sum + j.score, 0) / game.jogos.length
        );
      }
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
      porJogo: Object.values(todosOsJogos) // Retorna TODOS os 4 jogos
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

// GET /api/tutors/agendas/:tutorId - Buscar agendas do tutor
router.get('/agendas/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    
    // Buscar agendas do arquivo compartilhado
    const agendasData = await jsonService.readJSON('shared/agendas.json');
    const agendas = agendasData.agendas || [];
    
    // Filtrar agendas das crianças do tutor
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.id === tutorId);
    
    if (!tutor) {
      return res.status(404).json(
        errorResponse('TUTOR_NOT_FOUND', 'Tutor não encontrado')
      );
    }
    
    // Filtrar agendas das crianças do tutor
    const agendasDoTutor = agendas.filter(agenda => 
      tutor.criancasIds?.includes(agenda.criancaId)
    );
    
    console.log(`✅ Agendas buscadas: ${agendasDoTutor.length} agendas para tutor ${tutorId}`);
    
    res.json(successResponse({
      agendas: agendasDoTutor
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar agendas:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar agendas', error.message)
    );
  }
});

// GET /api/tutors/child/:childId - Dados completos de uma criança específica
router.get('/child/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Buscar dados da criança
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const crianca = kidsData.usuarios?.find(u => u.id === childId);
    
    if (!crianca) {
      return res.status(404).json(
        errorResponse('CHILD_NOT_FOUND', 'Criança não encontrada')
      );
    }
    
    // Buscar progresso/sessões da criança
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const sessoesCrianca = progressFile.progress?.filter(p => p.userId === childId) || [];
    
    // Calcular último acesso
    const ultimoAcesso = sessoesCrianca.length > 0
      ? new Date(Math.max(...sessoesCrianca.map(s => new Date(s.timestamp).getTime())))
      : null;
    
    // Calcular data de início (primeira sessão ou data de criação)
    const dataInicio = sessoesCrianca.length > 0
      ? new Date(Math.min(...sessoesCrianca.map(s => new Date(s.timestamp).getTime())))
      : new Date(crianca.criadoEm || Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 dias atrás se não houver data
    
    // Montar resposta
    const childProfile = {
      id: crianca.id,
      nome: crianca.nome,
      idade: crianca.idade,
      diagnostico: 'Atraso no desenvolvimento da linguagem',
      dataInicio: dataInicio.toISOString(),
      totalSessoes: sessoesCrianca.length,
      ultimoAcesso: ultimoAcesso ? ultimoAcesso.toISOString() : null,
      progressoGeral: calculateOverallProgress(sessoesCrianca),
      estatisticas: {
        tempoTotalMinutos: Math.round(sessoesCrianca.reduce((sum, s) => sum + (s.timeSpent || 0), 0) / 60),
        mediaAcertos: sessoesCrianca.length > 0 
          ? Math.round(sessoesCrianca.reduce((sum, s) => sum + (s.score || 0), 0) / sessoesCrianca.length)
          : 0,
      }
    };
    
    res.json(successResponse(childProfile));
    
  } catch (error) {
    console.error('❌ Erro ao buscar dados da criança:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar dados da criança', error.message)
    );
  }
});

// GET /api/tutors/devices/:childId - Buscar dispositivos conectados
router.get('/devices/:childId', async (req, res) => {
  try {
    const { childId } = req.params;
    
    // Mock de dispositivos - em produção virá do banco de dados
    const devices = [
      {
        id: 'device_001',
        name: 'iPad da Escola',
        type: 'Tablet',
        lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 horas atrás
      },
      {
        id: 'device_002',
        name: 'iPhone da Mãe',
        type: 'Smartphone',
        lastSync: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
      }
    ];
    
    res.json(successResponse({
      devices
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar dispositivos:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar dispositivos', error.message)
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

// PUT /api/tutors/agenda/:agendaId/confirmar - Confirmar agenda pendente
router.put('/agenda/:agendaId/confirmar', async (req, res) => {
  try {
    const { agendaId } = req.params;
    const io = req.app.get('io');
    
    // Buscar agendas
    const agendasData = await jsonService.readJSON('shared/agendas.json');
    const agendas = agendasData.agendas || [];
    
    // Encontrar agenda
    const agendaIndex = agendas.findIndex(a => a.id === agendaId);
    
    if (agendaIndex === -1) {
      return res.status(404).json(
        errorResponse('AGENDA_NOT_FOUND', 'Agenda não encontrada')
      );
    }
    
    // Atualizar status para confirmada
    agendas[agendaIndex].status = 'confirmada';
    agendas[agendaIndex].confirmedAt = new Date().toISOString();
    
    // Salvar no arquivo
    await jsonService.writeJSON('shared/agendas.json', { agendas });
    
    // Emitir evento Socket.IO para o Pro saber que foi confirmada
    if (io) {
      io.emit('agenda-confirmed', {
        agendaId,
        agenda: agendas[agendaIndex],
        professionalId: agendas[agendaIndex].profissionalId,
        confirmedAt: agendas[agendaIndex].confirmedAt,
      });
      console.log('🔔 Evento agenda-confirmed emitido para Pro');
    }
    
    console.log('✅ Agenda confirmada:', agendaId);
    res.json(successResponse({
      agenda: agendas[agendaIndex],
      message: 'Agenda confirmada com sucesso'
    }));
    
  } catch (error) {
    console.error('❌ Erro ao confirmar agenda:', error);
    res.status(500).json(
      errorResponse('CONFIRM_ERROR', 'Erro ao confirmar agenda', error.message)
    );
  }
});

module.exports = router;

