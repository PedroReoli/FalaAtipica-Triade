// Serviço de API para Kids
import { mockAuthService } from './mockAuthService';

const API_URL = 'http://localhost:3001/api';

export interface ProgressData {
  userId: string;
  gameId: string;
  level?: number;
  score: number;
  correctAnswers?: number;
  wrongAnswers?: number;
  timeSpent?: number;
  category?: string;
}

export interface ProgressResponse {
  success: boolean;
  data: {
    progressId: string;
    newAchievements: Array<{
      id: string;
      title: string;
      description: string;
    }>;
    nextLevel: number;
    totalGames: number;
  };
  message?: string;
}

class APIService {
  // Enviar progresso de jogo
  async sendProgress(data: ProgressData): Promise<ProgressResponse> {
    try {
      const response = await fetch(`${API_URL}/kids/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao enviar progresso');
      }

      return result;
    } catch (error) {
      console.error('❌ Erro ao enviar progresso:', error);
      throw error;
    }
  }

  // Buscar progresso do usuário
  async getProgress(userId: string) {
    try {
      const response = await fetch(`${API_URL}/kids/progress/${userId}`);
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

  // Buscar conquistas
  async getAchievements(userId: string) {
    try {
      const response = await fetch(`${API_URL}/kids/achievements/${userId}`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar conquistas');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar conquistas:', error);
      throw error;
    }
  }

  // Buscar lista de jogos
  async getGames() {
    try {
      const response = await fetch(`${API_URL}/kids/games`);
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar jogos');
      }

      return result.data;
    } catch (error) {
      console.error('❌ Erro ao buscar jogos:', error);
      throw error;
    }
  }
}

export const apiService = new APIService();

