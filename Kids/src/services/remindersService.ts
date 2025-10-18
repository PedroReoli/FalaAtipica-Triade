// Serviço de Lembretes para Kids
import { mockAuthService } from './mockAuthService';

const API_URL = 'http://localhost:3001/api';

export interface Reminder {
  id: string;
  childId: string;
  childName: string;
  professionalId: string;
  professionalName: string;
  tipo: 'atividade' | 'lembrete' | 'consulta';
  titulo: string;
  mensagem: string;
  prioridade: 'alta' | 'media' | 'baixa';
  lido: boolean;
  criadoEm: string;
  expirarEm?: string;
}

export interface RemindersResponse {
  naoLidos: Reminder[];
  lidos: Reminder[];
  totalNaoLidos: number;
  totalLidos: number;
}

class RemindersService {
  // Buscar lembretes da criança
  async getReminders(): Promise<RemindersResponse> {
    try {
      const currentUser = mockAuthService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Usuário não autenticado');
      }

      const response = await fetch(`${API_URL}/kids/reminders/${currentUser.id}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao buscar lembretes');
      }

      // Log silencioso (apenas em desenvolvimento)
      // console.log('✅ Lembretes carregados da API:', result.data.totalNaoLidos, 'não lidos');
      return result.data;
    } catch (error) {
      // Log silencioso (apenas em desenvolvimento)
      // console.log('⚠️ API erro - usando dados mockados locais');
      
      // FALLBACK: Carregar dados mockados locais
      try {
        const remindersData = require('../../mockup-data/reminders.json');
        const currentUser = mockAuthService.getCurrentUser();
        
        if (remindersData && remindersData.reminders && currentUser) {
          const allReminders = remindersData.reminders as Reminder[];
          const userReminders = allReminders.filter(r => r.childId === currentUser.id);
          
          const naoLidos = userReminders.filter(r => !r.lido);
          const lidos = userReminders.filter(r => r.lido);
          
          // Log silencioso (apenas em desenvolvimento)
          // console.log('✅ Lembretes carregados do mockup:', naoLidos.length, 'não lidos');
          
          return {
            naoLidos,
            lidos,
            totalNaoLidos: naoLidos.length,
            totalLidos: lidos.length
          };
        }
      } catch (mockError) {
        // Log silencioso (apenas em desenvolvimento)
        // console.error('❌ Erro ao carregar mockup de lembretes:', mockError);
      }
      
      // Último fallback: retornar vazio
      return {
        naoLidos: [],
        lidos: [],
        totalNaoLidos: 0,
        totalLidos: 0
      };
    }
  }

  // Marcar lembrete como lido
  async markAsRead(reminderId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/kids/reminder/${reminderId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || 'Erro ao marcar lembrete como lido');
      }

      return true;
    } catch (error) {
      console.error('❌ Erro ao marcar lembrete como lido:', error);
      return false;
    }
  }

  // Buscar apenas contagem de não lidos (para badge)
  async getUnreadCount(): Promise<number> {
    try {
      const reminders = await this.getReminders();
      return reminders.totalNaoLidos;
    } catch (error) {
      // Log silencioso (apenas em desenvolvimento)
      // console.error('❌ Erro ao buscar contagem de lembretes:', error);
      return 0;
    }
  }
}

export const remindersService = new RemindersService();

