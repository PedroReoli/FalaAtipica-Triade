// Rotas do Pro (Profissionais)
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, generateId, calculateOverallProgress } = require('../utils/helpers');

// GET /api/pro/patients - Lista de pacientes do profissional
router.get('/patients', async (req, res) => {
  try {
    const { professionalId } = req.query;
    
    // Buscar profissional (opcional - mockado se não fornecido)
    const proId = professionalId || 'prof_001';
    
    // Buscar crianças (pacientes)
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    
    // Buscar tutores para pegar relacionamento
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    
    // Filtrar pacientes do profissional
    const pacientes = kidsData.usuarios?.map(crianca => {
      // Buscar tutor da criança
      const tutor = tutorsData.tutores?.find(t => 
        t.criancasIds?.includes(crianca.id) && t.profissionalId === proId
      );
      
      if (!tutor) return null;
      
      // Calcular progresso
      const progressoCrianca = progressFile.progress?.filter(p => p.userId === crianca.id) || [];
      const progressoGeral = calculateOverallProgress(progressoCrianca);
      
      return {
        id: crianca.id,
        nome: crianca.nome,
        idade: crianca.idade,
        tutor: tutor.nome,
        tutorEmail: tutor.email,
        progressoGeral,
        ultimaSessao: progressoCrianca.length > 0 
          ? progressoCrianca[progressoCrianca.length - 1].timestamp 
          : null,
        diagnostico: 'Atraso no desenvolvimento da linguagem', // Mockado
        status: 'ativo'
      };
    }).filter(Boolean) || [];
    
    res.json(successResponse({
      patients: pacientes,
      total: pacientes.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar pacientes:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar pacientes', error.message)
    );
  }
});

// GET /api/pro/patient/:patientId - Detalhes de um paciente
router.get('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Buscar criança
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const patient = kidsData.usuarios?.find(u => u.id === patientId);
    
    if (!patient) {
      return res.status(404).json(
        errorResponse('PATIENT_NOT_FOUND', 'Paciente não encontrado')
      );
    }
    
    // Buscar progresso
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const progressoPaciente = progressFile.progress?.filter(p => p.userId === patientId) || [];
    
    // Buscar tutor
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.criancasIds?.includes(patientId));
    
    res.json(successResponse({
      patient: {
        ...patient,
        tutor: tutor ? {
          nome: tutor.nome,
          email: tutor.email,
          telefone: tutor.telefone,
          relacionamento: tutor.relacionamento
        } : null
      },
      progresso: {
        geral: calculateOverallProgress(progressoPaciente),
        totalAtividades: progressoPaciente.length,
        ultimaAtividade: progressoPaciente.length > 0 
          ? progressoPaciente[progressoPaciente.length - 1].timestamp 
          : null
      }
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar paciente:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar paciente', error.message)
    );
  }
});

// POST /api/pro/session - Criar sessão
router.post('/session', async (req, res) => {
  try {
    const {
      patientId,
      profissionalId,
      tipo,
      observacoes,
      atividades
    } = req.body;
    
    // Validações
    if (!patientId || !profissionalId) {
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'patientId e profissionalId são obrigatórios')
      );
    }
    
    // Criar sessão
    const sessionData = {
      id: generateId('session'),
      patientId,
      profissionalId,
      tipo: tipo || 'Terapia',
      observacoes: observacoes || '',
      atividades: atividades || [],
      timestamp: new Date().toISOString()
    };
    
    // Salvar no JSON
    let sessionsFile = await jsonService.readJSON('shared/sessions.json').catch(() => ({ sessions: [] }));
    
    if (!sessionsFile.sessions) {
      sessionsFile = { sessions: [] };
    }
    
    sessionsFile.sessions.push(sessionData);
    await jsonService.writeJSON('shared/sessions.json', sessionsFile);
    
    // Emitir evento WebSocket
    const io = req.app.get('io');
    
    // Buscar dados do paciente para notificação
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const patient = kidsData.usuarios?.find(u => u.id === patientId);
    
    // Buscar tutor para notificar
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    const tutor = tutorsData.tutores?.find(t => t.criancasIds?.includes(patientId));
    
    if (patient && tutor) {
      io.to(tutor.id).emit('session-created', {
        sessionId: sessionData.id,
        patientName: patient.nome,
        tipo: sessionData.tipo,
        timestamp: sessionData.timestamp
      });
      
      console.log(`📝 Sessão criada: ${patient.nome} - ${tipo}`);
    }
    
    res.status(201).json(successResponse({
      sessionId: sessionData.id,
      timestamp: sessionData.timestamp
    }, 'Sessão criada com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro ao criar sessão:', error);
    res.status(500).json(
      errorResponse('SESSION_ERROR', 'Erro ao criar sessão', error.message)
    );
  }
});

// GET /api/pro/reports/:patientId - Relatórios do paciente
router.get('/reports/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    
    // Buscar sessões
    const sessionsFile = await jsonService.readJSON('shared/sessions.json').catch(() => ({ sessions: [] }));
    const patientSessions = sessionsFile.sessions?.filter(s => s.patientId === patientId) || [];
    
    // Buscar progresso
    const progressFile = await jsonService.readJSON('shared/progress.json').catch(() => ({ progress: [] }));
    const patientProgress = progressFile.progress?.filter(p => p.userId === patientId) || [];
    
    // Gerar relatório
    const report = {
      patientId,
      periodo: new Date().toISOString().substring(0, 7),
      totalSessoes: patientSessions.length,
      totalAtividades: patientProgress.length,
      progressoGeral: calculateOverallProgress(patientProgress),
      sessoes: patientSessions,
      ultimasAtividades: patientProgress.slice(-10).reverse()
    };
    
    res.json(successResponse(report));
    
  } catch (error) {
    console.error('❌ Erro ao buscar relatórios:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar relatórios', error.message)
    );
  }
});

// PUT /api/pro/patient/:patientId - Atualizar paciente
router.put('/patient/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const updates = req.body;
    
    // Atualizar no JSON
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const patientIndex = kidsData.usuarios?.findIndex(u => u.id === patientId);
    
    if (patientIndex === -1 || patientIndex === undefined) {
      return res.status(404).json(
        errorResponse('PATIENT_NOT_FOUND', 'Paciente não encontrado')
      );
    }
    
    kidsData.usuarios[patientIndex] = {
      ...kidsData.usuarios[patientIndex],
      ...updates
    };
    
    await jsonService.writeJSON('KIDS/usuarios.json', kidsData);
    
    console.log(`✅ Paciente atualizado: ${patientId}`);
    
    res.json(successResponse(
      kidsData.usuarios[patientIndex],
      'Paciente atualizado com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao atualizar paciente:', error);
    res.status(500).json(
      errorResponse('UPDATE_ERROR', 'Erro ao atualizar paciente', error.message)
    );
  }
});

module.exports = router;

