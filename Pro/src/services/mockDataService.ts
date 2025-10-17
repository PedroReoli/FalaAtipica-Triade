/**
 * Mock Data Service
 * Serviço centralizado para gerenciar dados mockados e integração com API
 * Implementa fallback automático quando API não está disponível
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Serviço de dados mockados com fallback automático
 */
export const mockDataService = {
  /**
   * PACIENTES
   */
  async loadPatients(professionalId?: string): Promise<any> {
    try {
      console.log('🔍 [PATIENTS] Tentando API...');
      const url = professionalId 
        ? `${API_BASE_URL}/pro/patients?professionalId=${professionalId}`
        : `${API_BASE_URL}/pro/patients`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [PATIENTS] API retornou:', result.data.patients?.length || 0, 'pacientes');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [PATIENTS] API erro, usando fallback mockado');
    }

    // Fallback: dados mockados
    const patientsData = await import('../../Mockup/PRO/pacientes.json');
    console.log('✅ [PATIENTS] Mockup carregado:', patientsData.pacientes?.length || 0, 'pacientes');
    return { patients: patientsData.pacientes, total: patientsData.pacientes?.length || 0 };
  },

  async loadPatient(patientId: string): Promise<any> {
    try {
      console.log('🔍 [PATIENT] Tentando API para paciente:', patientId);
      const response = await fetch(`${API_BASE_URL}/pro/patient/${patientId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [PATIENT] API retornou paciente:', result.data.patient?.nome);
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [PATIENT] API erro, usando fallback mockado');
    }

    // Fallback: patient-details mockado
    const patientDetails = await import('../../Mockup/PRO/patient-details.json');
    console.log('✅ [PATIENT] Mockup carregado:', patientDetails.patient?.nome);
    return patientDetails;
  },

  async savePatient(patientData: any): Promise<any> {
    try {
      console.log('🔍 [SAVE PATIENT] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/patient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [SAVE PATIENT] Paciente salvo via API');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [SAVE PATIENT] API erro, salvando localmente');
    }

    // Fallback: salvar em localStorage
    const newPatient = { id: `patient_${Date.now()}`, ...patientData, createdAt: new Date().toISOString() };
    const existingPatients = JSON.parse(localStorage.getItem('mockup_patients') || '[]');
    existingPatients.push(newPatient);
    localStorage.setItem('mockup_patients', JSON.stringify(existingPatients));
    console.log('✅ [SAVE PATIENT] Paciente salvo localmente');
    return newPatient;
  },

  async updatePatient(patientId: string, updates: any): Promise<any> {
    try {
      console.log('🔍 [UPDATE PATIENT] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/patient/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [UPDATE PATIENT] Paciente atualizado via API');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [UPDATE PATIENT] API erro, atualizando localmente');
    }

    // Fallback: atualizar em localStorage
    const existingPatients = JSON.parse(localStorage.getItem('mockup_patients') || '[]');
    const index = existingPatients.findIndex((p: any) => p.id === patientId);
    if (index !== -1) {
      existingPatients[index] = { ...existingPatients[index], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem('mockup_patients', JSON.stringify(existingPatients));
    }
    console.log('✅ [UPDATE PATIENT] Paciente atualizado localmente');
    return { ...updates, id: patientId };
  },

  /**
   * SESSÕES
   */
  async loadSessions(professionalId?: string): Promise<any> {
    try {
      console.log('🔍 [SESSIONS] Tentando API...');
      const url = professionalId 
        ? `${API_BASE_URL}/pro/sessions?professionalId=${professionalId}`
        : `${API_BASE_URL}/pro/sessions`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [SESSIONS] API retornou sessões');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [SESSIONS] API erro, usando fallback mockado');
    }

    // Fallback: shared/sessions.json
    const sessionsData = await import('../../Mockup/shared/sessions.json');
    console.log('✅ [SESSIONS] Mockup carregado');
    return { sessions: sessionsData.sessions || [], total: sessionsData.sessions?.length || 0 };
  },

  async saveSession(sessionData: any): Promise<any> {
    try {
      console.log('🔍 [SAVE SESSION] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [SAVE SESSION] Sessão salva via API');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [SAVE SESSION] API erro, salvando localmente');
    }

    // Fallback: localStorage
    const newSession = { id: `session_${Date.now()}`, ...sessionData, timestamp: new Date().toISOString() };
    const existingSessions = JSON.parse(localStorage.getItem('mockup_sessions') || '[]');
    existingSessions.push(newSession);
    localStorage.setItem('mockup_sessions', JSON.stringify(existingSessions));
    console.log('✅ [SAVE SESSION] Sessão salva localmente');
    return newSession;
  },

  /**
   * RELATÓRIOS
   */
  async loadReports(patientId: string): Promise<any> {
    try {
      console.log('🔍 [REPORTS] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/reports/${patientId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [REPORTS] API retornou relatórios');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [REPORTS] API erro, usando fallback mockado');
    }

    // Fallback: relatorios.json
    const reportsData = await import('../../Mockup/PRO/relatorios.json');
    console.log('✅ [REPORTS] Mockup carregado');
    return reportsData;
  },

  /**
   * MEDICAMENTOS
   */
  async loadMedications(): Promise<any> {
    try {
      console.log('🔍 [MEDICATIONS] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/medications`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [MEDICATIONS] API retornou medicamentos');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [MEDICATIONS] API erro, usando fallback mockado');
    }

    // Fallback: medicamentos.json
    const medicationsData = await import('../../Mockup/PRO/medicamentos.json');
    console.log('✅ [MEDICATIONS] Mockup carregado');
    return medicationsData;
  },

  async saveMedication(medicationData: any): Promise<any> {
    try {
      console.log('🔍 [SAVE MEDICATION] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/medication`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(medicationData),
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [SAVE MEDICATION] Medicamento salvo via API');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [SAVE MEDICATION] API erro, salvando localmente');
    }

    // Fallback: localStorage
    const newMedication = { id: `med_${Date.now()}`, ...medicationData, createdAt: new Date().toISOString() };
    const existingMedications = JSON.parse(localStorage.getItem('mockup_medications') || '[]');
    existingMedications.push(newMedication);
    localStorage.setItem('mockup_medications', JSON.stringify(existingMedications));
    console.log('✅ [SAVE MEDICATION] Medicamento salvo localmente');
    return newMedication;
  },

  /**
   * AGENDAS
   */
  async loadAgendas(professionalId: string): Promise<any> {
    try {
      console.log('🔍 [AGENDAS] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/agendas/${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [AGENDAS] API retornou agendas');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [AGENDAS] API erro, usando fallback mockado');
    }

    // Fallback: shared/agendas.json
    const agendasData = await import('../../Mockup/shared/agendas.json');
    const agendas = agendasData.agendas?.filter((a: any) => a.profissionalId === professionalId) || [];
    console.log('✅ [AGENDAS] Mockup carregado:', agendas.length, 'agendas');
    return { agendas, total: agendas.length };
  },

  /**
   * PROGRESSO (KIDS/TUTORS)
   */
  async loadChildProgress(childId: string): Promise<any> {
    try {
      console.log('🔍 [CHILD PROGRESS] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/tutors/progress/${childId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [CHILD PROGRESS] API retornou progresso');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [CHILD PROGRESS] API erro, usando fallback mockado');
    }

    // Fallback: shared/progress.json
    const progressData = await import('../../Mockup/shared/progress.json');
    const childProgress = progressData.progress?.filter((p: any) => p.userId === childId) || [];
    console.log('✅ [CHILD PROGRESS] Mockup carregado');
    return { progress: childProgress };
  },

  /**
   * DASHBOARD STATS
   */
  async loadDashboardStats(professionalId: string): Promise<any> {
    try {
      console.log('🔍 [DASHBOARD] Tentando API...');
      const response = await fetch(`${API_BASE_URL}/pro/dashboard/${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const result: APIResponse<any> = await response.json();
        if (result.success) {
          console.log('✅ [DASHBOARD] API retornou estatísticas');
          return result.data;
        }
      }
    } catch (error) {
      console.log('⚠️ [DASHBOARD] API erro, usando fallback mockado');
    }

    // Fallback: calcular localmente
    const patientsData = await this.loadPatients(professionalId);
    const sessionsData = await this.loadSessions(professionalId);
    
    const stats = {
      totalPatients: patientsData.patients?.length || 0,
      totalSessions: sessionsData.sessions?.length || 0,
      sessionsThisWeek: sessionsData.sessions?.filter((s: any) => {
        const sessionDate = new Date(s.timestamp);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return sessionDate >= weekAgo;
      }).length || 0,
      pendingReports: 0,
    };

    console.log('✅ [DASHBOARD] Estatísticas calculadas localmente');
    return stats;
  },
};

