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
}

export const apiService = new APIService();

