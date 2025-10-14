// Serviço de API para Pro
const API_URL = 'http://localhost:3001/api';

export interface SessionData {
  patientId: string;
  profissionalId: string;
  tipo?: string;
  observacoes?: string;
  atividades?: any[];
}

class APIService {
  // Buscar lista de pacientes
  async getPatients(professionalId: string) {
    try {
      const response = await fetch(`${API_URL}/pro/patients?professionalId=${professionalId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar pacientes');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar pacientes:', error);
      throw error;
    }
  }

  // Buscar detalhes de um paciente
  async getPatient(patientId: string) {
    try {
      const response = await fetch(`${API_URL}/pro/patient/${patientId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar paciente');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar paciente:', error);
      throw error;
    }
  }

  // Criar sessão
  async createSession(data: SessionData) {
    try {
      const response = await fetch(`${API_URL}/pro/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao criar sessão');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao criar sessão:', error);
      throw error;
    }
  }

  // Buscar relatórios de um paciente
  async getReports(patientId: string) {
    try {
      const response = await fetch(`${API_URL}/pro/reports/${patientId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar relatórios');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar relatórios:', error);
      throw error;
    }
  }

  // Atualizar paciente
  async updatePatient(patientId: string, updates: any) {
    try {
      const response = await fetch(`${API_URL}/pro/patient/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao atualizar paciente');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar paciente:', error);
      throw error;
    }
  }

  // Verificar se API está disponível
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/sync/status`, {
        signal: AbortSignal.timeout(2000)
      });
      
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const apiService = new APIService();

