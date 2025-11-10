// Rotas do Pro (Profissionais)
const express = require('express');
const router = express.Router();
const jsonService = require('../services/jsonService');
const { successResponse, errorResponse, generateId, calculateOverallProgress } = require('../utils/helpers');

// POST /api/pro/patient - Criar novo paciente
router.post('/patient', async (req, res) => {
  try {
    const patientData = {
      id: generateId('patient'),
      ...req.body,
      criadoEm: new Date().toISOString()
    };
    
    // Salvar no JSON de crianças (Kids)
    let kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    
    if (!kidsData.usuarios) {
      kidsData = { usuarios: [] };
    }
    
    // Criar usuário criança
    const newChild = {
      id: patientData.id,
      nome: patientData.nome,
      email: `${patientData.nome.toLowerCase().replace(/\s/g, '')}@kids.com`,
      senha: '123456',
      idade: patientData.idade,
      dataNascimento: patientData.dataNascimento
    };
    
    kidsData.usuarios.push(newChild);
    await jsonService.writeJSON('KIDS/usuarios.json', kidsData);
    
    // Criar relação com tutor (se tiver email do tutor)
    if (patientData.tutor && patientData.tutor.email) {
      const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
      const tutor = tutorsData.tutores?.find((t) => t.email === patientData.tutor.email);
      
      if (tutor) {
        if (!tutor.criancasIds) tutor.criancasIds = [];
        if (!tutor.criancasIds.includes(patientData.id)) {
          tutor.criancasIds.push(patientData.id);
          tutor.profissionalId = patientData.profissionalId;
          await jsonService.writeJSON('TUTORS/usuarios.json', tutorsData);
        }
      }
    }
    
    console.log(`✅ Paciente criado: ${patientData.nome}`);
    
    res.status(201).json(successResponse(
      patientData,
      'Paciente criado com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao criar paciente:', error);
    res.status(500).json(
      errorResponse('CREATE_ERROR', 'Erro ao criar paciente', error.message)
    );
  }
});

// GET /api/pro/sessions - Listar todas as sessões do profissional
// GET /api/pro/sessions - Listar sessões (DESABILITADO - usa agendas)
/*
router.get('/sessions', async (req, res) => {
  try {
    const { professionalId } = req.query;
    
    console.log('📋 [API] GET /pro/sessions - Query completo:', req.query);
    console.log('📋 [API] GET /pro/sessions - professionalId:', professionalId);
    
    // Buscar agendas (novo sistema)
    const agendasData = await jsonService.readJSON('shared/agendas.json').catch(() => ({ agendas: [] }));
    let allAgendas = agendasData.agendas || [];
    
    // Fallback mockado se não houver dados
    if (allAgendas.length === 0) {
      console.log('📋 [API] Arquivo agendas.json vazio, usando fallback mockado');
      allAgendas = [
        {
          id: 'fallback_001',
          criancaId: '1',
          criancaNome: 'João Silva',
          tutorId: 'tutor_001',
          tutorNome: 'Carlos Silva',
          tutorEmail: 'carlos@tutors.com',
          tutorTelefone: '(11) 99999-8888',
          profissionalId: 'prof_001',
          profissionalNome: 'Dr. Silva',
          profissionalEspecialidade: 'Fonoaudiologia Infantil',
          data: '2025-10-22',
          horario: '14:00',
          duracao: 60,
          tipo: 'Consulta Presencial',
          status: 'pendente',
          observacoes: 'Sessão de avaliação inicial',
          local: 'Clínica FalaAtípica',
          criadoEm: new Date().toISOString()
        },
        {
          id: 'fallback_002',
          criancaId: '2',
          criancaNome: 'Maria Santos',
          tutorId: 'tutor_002',
          tutorNome: 'Ana Santos',
          tutorEmail: 'ana@tutors.com',
          tutorTelefone: '(11) 88888-7777',
          profissionalId: 'prof_001',
          profissionalNome: 'Dr. Silva',
          profissionalEspecialidade: 'Fonoaudiologia Infantil',
          data: '2025-10-25',
          horario: '10:00',
          duracao: 45,
          tipo: 'Consulta Online',
          status: 'pendente',
          observacoes: 'Acompanhamento de progresso',
          local: 'Google Meet',
          criadoEm: new Date().toISOString()
        }
      ];
    }
    
    console.log('📋 [API] Total de agendas no arquivo:', allAgendas.length);
    console.log('📋 [API] Todas as agendas:', JSON.stringify(allAgendas.map(a => ({
      id: a.id, 
      profissionalId: a.profissionalId,
      criancaNome: a.criancaNome,
      data: a.data
    })), null, 2));
    
    // Filtrar por profissional se fornecido e converter para formato de sessão
    console.log('📋 [API] Filtrando por professionalId:', professionalId);
    console.log('📋 [API] Tipo de professionalId:', typeof professionalId);
    
    const filteredSessions = professionalId 
      ? allAgendas
          .filter(agenda => {
            const match = agenda.profissionalId === professionalId;
            console.log(`📋 [API] Agenda ${agenda.id}: profissionalId="${agenda.profissionalId}" (tipo: ${typeof agenda.profissionalId}) === "${professionalId}" (tipo: ${typeof professionalId}) ? ${match}`);
            return match;
          })
          .map(agenda => ({
            id: agenda.id,
            patient: agenda.criancaNome,
            patientId: agenda.criancaId,
            profissionalId: agenda.profissionalId,
            date: agenda.data,
            time: agenda.horario,
            duration: agenda.duracao || 60,
            status: agenda.status === 'confirmada' ? 'completed' : 
                    agenda.status === 'cancelada' ? 'cancelled' : 'pending',
            type: agenda.tipo || 'Sessão Terapêutica',
            notes: agenda.observacoes || '',
            professionalType: 'fonoaudiologo', // TODO: pegar do profissional
            criadoEm: agenda.criadoEm
          }))
      : allAgendas.map(agenda => ({
          id: agenda.id,
          patient: agenda.criancaNome,
          patientId: agenda.criancaId,
          profissionalId: agenda.profissionalId,
          date: agenda.data,
          time: agenda.horario,
          duration: agenda.duracao || 60,
          status: agenda.status === 'confirmada' ? 'completed' : 
                  agenda.status === 'cancelada' ? 'cancelled' : 'pending',
          type: agenda.tipo || 'Sessão Terapêutica',
          notes: agenda.observacoes || '',
          professionalType: 'fonoaudiologo',
          criadoEm: agenda.criadoEm
        }));
    
    console.log(`✅ [API] Sessões filtradas para ${professionalId}: ${filteredSessions.length} sessões`);
    console.log('📋 [API] Sessões filtradas:', JSON.stringify(filteredSessions, null, 2));
    
    res.json(successResponse({
      sessions: filteredSessions,
      total: filteredSessions.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar sessões:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar sessões', error.message)
    );
  }
});
*/

// GET /api/pro/dashboard/:professionalId - Estatísticas do dashboard
router.get('/dashboard/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;
    
    // Buscar pacientes
    const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
    const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
    
    const pacientes = kidsData.usuarios?.filter(crianca => {
      const tutor = tutorsData.tutores?.find(t => 
        t.criancasIds?.includes(crianca.id) && t.profissionalId === professionalId
      );
      return !!tutor;
    }) || [];
    
    // Buscar sessões (agendas) - DESABILITADO
    // const agendasData = await jsonService.readJSON('shared/agendas.json').catch(() => ({ agendas: [] }));
    // const sessions = agendasData.agendas?.filter((s) => s.profissionalId === professionalId) || [];
    const sessions = []; // Temporariamente vazio
    
    // Calcular sessões desta semana
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const sessionsThisWeek = sessions.filter((s) => new Date(s.criadoEm) >= weekAgo);
    
    const stats = {
      totalPatients: pacientes.length,
      totalSessions: sessions.length,
      sessionsThisWeek: sessionsThisWeek.length,
      pendingReports: 0
    };
    
    console.log(`✅ Dashboard stats: ${stats.totalPatients} pacientes, ${stats.totalSessions} sessões`);
    
    res.json(successResponse(stats));
    
  } catch (error) {
    console.error('❌ Erro ao buscar dashboard stats:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar estatísticas', error.message)
    );
  }
});

/**
 * @swagger
 * /api/pro/patients:
 *   get:
 *     tags: [Pro]
 *     summary: Lista de pacientes do profissional
 *     parameters:
 *       - in: query
 *         name: professionalId
 *         schema:
 *           type: string
 *         example: prof_001
 *     responses:
 *       200:
 *         description: Lista de pacientes retornada
 */
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
        tutor: {
          name: tutor.nome,
          email: tutor.email,
          phone: tutor.telefone || '(00) 00000-0000',
          relationship: tutor.relacionamento || 'Responsável'
        },
        progressoGeral,
        lastSession: progressoCrianca.length > 0 
          ? progressoCrianca[progressoCrianca.length - 1].timestamp 
          : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        nextSession: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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

/**
 * @swagger
 * /api/pro/session:
 *   post:
 *     tags: [Pro]
 *     summary: Criar sessão para paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - profissionalId
 *             properties:
 *               patientId:
 *                 type: string
 *                 example: "1"
 *               profissionalId:
 *                 type: string
 *                 example: prof_001
 *               tipo:
 *                 type: string
 *                 example: Terapia
 *               observacoes:
 *                 type: string
 *               atividades:
 *                 type: array
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 */
router.post('/session', async (req, res) => {
  try {
    console.log('📝 [API] POST /pro/session - Dados recebidos:', req.body);
    
    const {
      patientId,
      patient,
      profissionalId,
      date,
      time,
      duration,
      type,
      status,
      notes
    } = req.body;
    
    // Validações
    if (!patientId || !profissionalId || !date || !time) {
      console.error('❌ [API] Campos obrigatórios faltando:', { patientId, profissionalId, date, time });
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'Campos obrigatórios: patientId, profissionalId, date, time')
      );
    }
    
    // Criar sessão no formato esperado pelo frontend
    const sessionData = {
      id: generateId('session'),
      patient: patient || 'Paciente',
      patientId,
      profissionalId: profissionalId,  // ← Adicionar para filtro
      date,
      time,
      duration: duration || 60,
      status: status || 'pending',
      type: type || 'Sessão Terapêutica',
      notes: notes || '',
      professionalType: 'fonoaudiologo', // TODO: pegar do profissional
      criadoEm: new Date().toISOString()
    };
    
    // Salvar no JSON
    let sessionsFile = await jsonService.readJSON('shared/sessions.json').catch(() => ({ sessions: [] }));
    
    if (!sessionsFile.sessions) {
      sessionsFile = { sessions: [] };
    }
    
    sessionsFile.sessions.push(sessionData);
    await jsonService.writeJSON('shared/sessions.json', sessionsFile);
    console.log('💾 [API] Sessão salva em shared/sessions.json');
    
    // Emitir evento WebSocket para atualizar em tempo real
    const io = req.app.get('io');
    if (io) {
      io.emit('session-created', {
        session: sessionData,
        professionalId: profissionalId,
      });
      console.log('🔔 [API] Evento session-created emitido via Socket.IO');
    } else {
      console.warn('⚠️ [API] Socket.IO não disponível');
    }
    
    console.log(`✅ [API] Sessão criada com sucesso: ${patient} - ${date} ${time}`);
    
    res.status(201).json(successResponse({
      session: sessionData
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

// GET /api/pro/medications - Lista de medicamentos
router.get('/medications', async (req, res) => {
  try {
    // Buscar medicamentos do JSON
    const medicamentosData = await jsonService.readJSON('PRO/medicamentos.json');
    
    res.json(successResponse(medicamentosData));
    
  } catch (error) {
    console.error('❌ Erro ao buscar medicamentos:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar medicamentos', error.message)
    );
  }
});

// POST /api/pro/medication - Adicionar medicamento
router.post('/medication', async (req, res) => {
  try {
    const medicamentoData = {
      id: generateId('med'),
      ...req.body,
      timestamp: new Date().toISOString()
    };
    
    // Adicionar ao JSON
    let medicamentosFile = await jsonService.readJSON('PRO/medicamentos.json').catch(() => ({ medicamentos: [] }));
    
    if (!medicamentosFile.medicamentos) {
      medicamentosFile = { medicamentos: [] };
    }
    
    medicamentosFile.medicamentos.push(medicamentoData);
    await jsonService.writeJSON('PRO/medicamentos.json', medicamentosFile);
    
    console.log(`✅ Medicamento adicionado: ${medicamentoData.nome}`);
    
    res.status(201).json(successResponse(
      medicamentoData,
      'Medicamento adicionado com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao adicionar medicamento:', error);
    res.status(500).json(
      errorResponse('CREATE_ERROR', 'Erro ao adicionar medicamento', error.message)
    );
  }
});

// GET /api/pro/agendas/:professionalId - Buscar agendas do profissional
router.get('/agendas/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;
    
    // Buscar agendas do arquivo compartilhado
    const agendasData = await jsonService.readJSON('shared/agendas.json');
    const agendas = agendasData.agendas || [];
    
    // Filtrar agendas do profissional
    const agendasDoProfissional = agendas.filter(agenda => 
      agenda.profissionalId === professionalId
    );
    
    console.log(`✅ Agendas buscadas: ${agendasDoProfissional.length} agendas para profissional ${professionalId}`);
    
    res.json(successResponse({
      agendas: agendasDoProfissional,
      total: agendasDoProfissional.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao buscar agendas:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao buscar agendas', error.message)
    );
  }
});

// POST /api/pro/agenda - Criar nova agenda (DESABILITADO)
/*
router.post('/agenda', async (req, res) => {
  try {
    console.log('📅 [API] POST /pro/agenda - Dados recebidos:', req.body);
    
    const {
      criancaId,
      criancaNome,
      tutorId,
      tutorNome,
      tutorEmail,
      tutorTelefone,
      profissionalId,
      profissionalNome,
      profissionalEspecialidade,
      data,
      horario,
      duracao,
      tipo,
      observacoes,
      local
    } = req.body;

    // Buscar dados completos da criança se não fornecidos
    let criancaNomeFinal = criancaNome;
    if (!criancaNomeFinal && criancaId) {
      try {
        const kidsData = await jsonService.readJSON('KIDS/usuarios.json');
        const crianca = kidsData.usuarios?.find(c => c.id === criancaId);
        if (crianca) {
          criancaNomeFinal = crianca.nome;
          console.log('👶 [API] Nome da criança encontrado:', criancaNomeFinal);
        }
      } catch (error) {
        console.log('⚠️ [API] Erro ao buscar dados da criança:', error.message);
      }
    }

    // Buscar dados completos do tutor se não fornecidos
    let tutorNomeFinal = tutorNome;
    let tutorEmailFinal = tutorEmail;
    let tutorTelefoneFinal = tutorTelefone;
    
    if ((!tutorNomeFinal || !tutorEmailFinal || !tutorTelefoneFinal) && tutorId) {
      try {
        const tutorsData = await jsonService.readJSON('TUTORS/usuarios.json');
        const tutor = tutorsData.tutores?.find(t => t.id === tutorId);
        if (tutor) {
          tutorNomeFinal = tutorNomeFinal || tutor.nome;
          tutorEmailFinal = tutorEmailFinal || tutor.email;
          tutorTelefoneFinal = tutorTelefoneFinal || tutor.telefone;
          console.log('👨‍👩‍👧‍👦 [API] Dados do tutor encontrados:', { nome: tutorNomeFinal, email: tutorEmailFinal });
        }
      } catch (error) {
        console.log('⚠️ [API] Erro ao buscar dados do tutor:', error.message);
      }
    }
    
    const agendaData = {
      id: generateId('agenda'),
      criancaId,
      criancaNome: criancaNomeFinal || '',
      tutorId,
      tutorNome: tutorNomeFinal || '',
      tutorEmail: tutorEmailFinal || '',
      tutorTelefone: tutorTelefoneFinal || '',
      profissionalId,
      profissionalNome: profissionalNome || 'Dr. Silva',
      profissionalEspecialidade: profissionalEspecialidade || 'Fonoaudiologia Infantil',
      data,
      horario,
      duracao: duracao || 60,
      tipo: tipo || 'Sessão Terapêutica',
      observacoes: observacoes || '',
      local: local || 'Clínica FalaAtípica',
      status: 'pendente', // Status inicial sempre pendente
      criadoEm: new Date().toISOString()
    };
    
    // Salvar no arquivo compartilhado
    let agendasFile = await jsonService.readJSON('shared/agendas.json').catch(() => ({ agendas: [] }));
    
    if (!agendasFile.agendas) {
      agendasFile = { agendas: [] };
    }
    
    agendasFile.agendas.push(agendaData);
    await jsonService.writeJSON('shared/agendas.json', agendasFile);
    console.log('💾 [API] Agenda salva em shared/agendas.json');
    
    // Emitir evento completo para tutor
    const io = req.app.get('io');
    if (io) {
      io.emit('agenda-created', {
        tutorId: agendaData.tutorId,
        agenda: agendaData,
      });
      console.log('🔔 [API] Evento agenda-created emitido via Socket.IO para Tutors');
    } else {
      console.warn('⚠️ [API] Socket.IO não disponível');
    }
    
    console.log(`✅ [API] Agenda criada (pendente): ${agendaData.criancaNome} - ${agendaData.data} ${agendaData.horario}`);
    
    res.status(201).json(successResponse(
      agendaData,
      'Agenda criada com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao criar agenda:', error);
    res.status(500).json(
      errorResponse('CREATE_ERROR', 'Erro ao criar agenda', error.message)
    );
  }
});
*/

// POST /api/pro/reminder - Criar lembrete para criança
router.post('/reminder', async (req, res) => {
  try {
    const reminderData = {
      id: generateId('reminder'),
      ...req.body,
      lido: false,
      criadoEm: new Date().toISOString()
    };
    
    // Salvar no arquivo compartilhado
    let remindersFile = await jsonService.readJSON('shared/reminders.json').catch(() => ({ reminders: [] }));
    
    if (!remindersFile.reminders) {
      remindersFile = { reminders: [] };
    }
    
    remindersFile.reminders.push(reminderData);
    await jsonService.writeJSON('shared/reminders.json', remindersFile);
    
    // Emitir evento para criança
    const io = req.app.get('io');
    if (reminderData.childId) {
      io.to(`user_${reminderData.childId}`).emit('reminder-received', {
        reminderId: reminderData.id,
        titulo: reminderData.titulo,
        mensagem: reminderData.mensagem,
        prioridade: reminderData.prioridade
      });
    }
    
    console.log(`🔔 Lembrete criado: ${reminderData.childName} - ${reminderData.titulo}`);
    
    res.status(201).json(successResponse(
      reminderData,
      'Lembrete criado com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao criar lembrete:', error);
    res.status(500).json(
      errorResponse('CREATE_ERROR', 'Erro ao criar lembrete', error.message)
    );
  }
});

// PUT /api/pro/agenda/:agendaId - Atualizar agenda
router.put('/agenda/:agendaId', async (req, res) => {
  try {
    const { agendaId } = req.params;
    const updates = req.body;
    
    // Buscar e atualizar agenda
    const agendasFile = await jsonService.readJSON('shared/agendas.json');
    const agendaIndex = agendasFile.agendas?.findIndex(a => a.id === agendaId);
    
    if (agendaIndex === -1 || agendaIndex === undefined) {
      return res.status(404).json(
        errorResponse('AGENDA_NOT_FOUND', 'Agenda não encontrada')
      );
    }
    
    agendasFile.agendas[agendaIndex] = {
      ...agendasFile.agendas[agendaIndex],
      ...updates
    };
    
    await jsonService.writeJSON('shared/agendas.json', agendasFile);
    
    // Emitir evento para tutor
    const io = req.app.get('io');
    const agenda = agendasFile.agendas[agendaIndex];
    if (agenda.tutorId) {
      io.to(`user_${agenda.tutorId}`).emit('agenda-updated', {
        agendaId: agenda.id,
        criancaNome: agenda.criancaNome,
        status: agenda.status
      });
    }
    
    console.log(`✅ Agenda atualizada: ${agendaId}`);
    
    res.json(successResponse(
      agendasFile.agendas[agendaIndex],
      'Agenda atualizada com sucesso'
    ));
    
  } catch (error) {
    console.error('❌ Erro ao atualizar agenda:', error);
    res.status(500).json(
      errorResponse('UPDATE_ERROR', 'Erro ao atualizar agenda', error.message)
    );
  }
});

// POST /api/pro/partnership-token - Gerar token de parceria
router.post('/partnership-token', async (req, res) => {
  try {
    const { professionalId, professionalName, professionalType } = req.body;
    
    if (!professionalId || !professionalName || !professionalType) {
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'professionalId, professionalName e professionalType são obrigatórios')
      );
    }
    
    // Gerar token único
    const tokenString = `PARCERIA_${Math.random().toString(36).substring(2, 15)}${Date.now().toString(36)}`;
    
    const tokenData = {
      id: generateId('token'),
      token: tokenString,
      professionalId,
      professionalName,
      professionalType,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 dias
      status: 'pending',
      claimedBy: null,
      claimedAt: null
    };
    
    // Salvar no arquivo
    let tokensFile = await jsonService.readJSON('shared/partnership-tokens.json').catch(() => ({ tokens: [] }));
    
    if (!tokensFile.tokens) {
      tokensFile = { tokens: [] };
    }
    
    tokensFile.tokens.push(tokenData);
    await jsonService.writeJSON('shared/partnership-tokens.json', tokensFile);
    
    console.log(`🔗 Token de parceria gerado: ${tokenString} por ${professionalName}`);
    
    res.status(201).json(successResponse({
      token: tokenString,
      expiresAt: tokenData.expiresAt
    }, 'Token gerado com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro ao gerar token:', error);
    res.status(500).json(
      errorResponse('TOKEN_ERROR', 'Erro ao gerar token', error.message)
    );
  }
});

// POST /api/pro/claim-partnership - Reivindicar token de parceria
router.post('/claim-partnership', async (req, res) => {
  try {
    const { token, professionalId, professionalName, professionalType } = req.body;
    
    if (!token || !professionalId || !professionalName || !professionalType) {
      return res.status(400).json(
        errorResponse('MISSING_FIELDS', 'token, professionalId, professionalName e professionalType são obrigatórios')
      );
    }
    
    // Buscar token
    const tokensFile = await jsonService.readJSON('shared/partnership-tokens.json');
    const tokenData = tokensFile.tokens?.find(t => t.token === token);
    
    if (!tokenData) {
      return res.status(404).json(
        errorResponse('TOKEN_NOT_FOUND', 'Token inválido ou não encontrado')
      );
    }
    
    // Verificar se token já foi usado
    if (tokenData.status === 'claimed') {
      return res.status(400).json(
        errorResponse('TOKEN_ALREADY_USED', 'Este token já foi utilizado')
      );
    }
    
    // Verificar se token expirou
    if (new Date(tokenData.expiresAt) < new Date()) {
      return res.status(400).json(
        errorResponse('TOKEN_EXPIRED', 'Este token expirou')
      );
    }
    
    // Verificar se não está tentando fazer parceria consigo mesmo
    if (tokenData.professionalId === professionalId) {
      return res.status(400).json(
        errorResponse('SELF_PARTNERSHIP', 'Você não pode fazer parceria consigo mesmo')
      );
    }
    
    // Atualizar token
    const tokenIndex = tokensFile.tokens.findIndex(t => t.token === token);
    tokensFile.tokens[tokenIndex].status = 'claimed';
    tokensFile.tokens[tokenIndex].claimedBy = professionalId;
    tokensFile.tokens[tokenIndex].claimedAt = new Date().toISOString();
    await jsonService.writeJSON('shared/partnership-tokens.json', tokensFile);
    
    // Criar parceria
    const partnershipData = {
      id: generateId('partnership'),
      professionalA: tokenData.professionalId,
      professionalB: professionalId,
      nameA: tokenData.professionalName,
      nameB: professionalName,
      typeA: tokenData.professionalType,
      typeB: professionalType,
      status: 'active',
      createdAt: new Date().toISOString(),
      token: token
    };
    
    let partnershipsFile = await jsonService.readJSON('shared/partnerships.json').catch(() => ({ partnerships: [] }));
    
    if (!partnershipsFile.partnerships) {
      partnershipsFile = { partnerships: [] };
    }
    
    partnershipsFile.partnerships.push(partnershipData);
    await jsonService.writeJSON('shared/partnerships.json', partnershipsFile);
    
    // Emitir evento Socket.IO para ambos profissionais
    const io = req.app.get('io');
    
    // Notificar profissional A (quem gerou o token)
    io.to(`user_${tokenData.professionalId}`).emit('partnership-established', {
      partnershipId: partnershipData.id,
      partnerName: professionalName,
      partnerType: professionalType,
      message: `${professionalName} aceitou sua parceria!`
    });
    
    // Notificar profissional B (quem reivindicou)
    io.to(`user_${professionalId}`).emit('partnership-established', {
      partnershipId: partnershipData.id,
      partnerName: tokenData.professionalName,
      partnerType: tokenData.professionalType,
      message: `Parceria estabelecida com ${tokenData.professionalName}!`
    });
    
    console.log(`🤝 Parceria estabelecida: ${tokenData.professionalName} ↔ ${professionalName}`);
    
    res.status(201).json(successResponse({
      partnershipId: partnershipData.id,
      partner: {
        name: tokenData.professionalName,
        type: tokenData.professionalType
      }
    }, 'Parceria estabelecida com sucesso'));
    
  } catch (error) {
    console.error('❌ Erro ao reivindicar parceria:', error);
    res.status(500).json(
      errorResponse('CLAIM_ERROR', 'Erro ao reivindicar parceria', error.message)
    );
  }
});

// GET /api/pro/partnerships/:professionalId - Listar parcerias do profissional
router.get('/partnerships/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;
    
    // Buscar parcerias
    const partnershipsFile = await jsonService.readJSON('shared/partnerships.json');
    const allPartnerships = partnershipsFile.partnerships || [];
    
    // Filtrar parcerias onde o profissional está envolvido
    const myPartnerships = allPartnerships.filter(p => 
      p.professionalA === professionalId || p.professionalB === professionalId
    ).map(p => {
      // Retornar dados do parceiro (não do próprio profissional)
      const isA = p.professionalA === professionalId;
      return {
        id: p.id,
        partnerId: isA ? p.professionalB : p.professionalA,
        partnerName: isA ? p.nameB : p.nameA,
        partnerType: isA ? p.typeB : p.typeA,
        status: p.status,
        createdAt: p.createdAt
      };
    });
    
    console.log(`✅ Parcerias listadas: ${myPartnerships.length} parcerias para profissional ${professionalId}`);
    
    res.json(successResponse({
      partnerships: myPartnerships,
      total: myPartnerships.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao listar parcerias:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao listar parcerias', error.message)
    );
  }
});

// GET /api/pro/my-tokens/:professionalId - Listar tokens gerados pelo profissional
router.get('/my-tokens/:professionalId', async (req, res) => {
  try {
    const { professionalId } = req.params;
    
    // Buscar tokens
    const tokensFile = await jsonService.readJSON('shared/partnership-tokens.json');
    const allTokens = tokensFile.tokens || [];
    
    // Filtrar tokens criados pelo profissional
    const myTokens = allTokens.filter(t => t.professionalId === professionalId);
    
    console.log(`✅ Tokens listados: ${myTokens.length} tokens para profissional ${professionalId}`);
    
    res.json(successResponse({
      tokens: myTokens,
      total: myTokens.length
    }));
    
  } catch (error) {
    console.error('❌ Erro ao listar tokens:', error);
    res.status(500).json(
      errorResponse('FETCH_ERROR', 'Erro ao listar tokens', error.message)
    );
  }
});

module.exports = router;

