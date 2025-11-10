// Serviço de API para Tutors
const API_URL = 'http://localhost:3001/api';

class APIService {
  // Buscar perfil do tutor
  async getTutorProfile(tutorId: string) {
    try {
      const response = await fetch(`${API_URL}/tutors/profile/${tutorId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar perfil');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar perfil:', error);
      throw error;
    }
  }

  // Buscar crianças do tutor
  async getChildren(tutorId: string) {
    try {
      const response = await fetch(`${API_URL}/tutors/children/${tutorId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar crianças');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar crianças:', error);
      throw error;
    }
  }

  // Buscar progresso de uma criança
  async getChildProgress(childId: string) {
    try {
      const response = await fetch(`${API_URL}/tutors/progress/${childId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar progresso');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar progresso:', error);
      throw error;
    }
  }

  // Buscar relatórios de uma criança
  async getReports(childId: string) {
    try {
      const response = await fetch(`${API_URL}/tutors/reports/${childId}`);
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

  // Buscar dicas
  async getTips(category?: string) {
    try {
      const url = category 
        ? `${API_URL}/tutors/tips?category=${category}`
        : `${API_URL}/tutors/tips`;
        
      const response = await fetch(url);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar dicas');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar dicas:', error);
      throw error;
    }
  }

  // Buscar suporte/FAQ
  async getSupport() {
    try {
      const response = await fetch(`${API_URL}/tutors/support`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar suporte');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar suporte:', error);
      throw error;
    }
  }

  // Buscar configurações
  async getSettings(tutorId: string) {
    try {
      const response = await fetch(`${API_URL}/tutors/settings/${tutorId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar configurações');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar configurações:', error);
      throw error;
    }
  }

  // Atualizar configurações
  async updateSettings(tutorId: string, configuracoes: any) {
    try {
      const response = await fetch(`${API_URL}/tutors/settings/${tutorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ configuracoes }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao atualizar configurações');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao atualizar configurações:', error);
      throw error;
    }
  }
}

export const apiService = new APIService();

