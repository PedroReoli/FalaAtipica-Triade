// Hook para integração com API
import { useEffect, useState } from 'react';
import { apiService, ProgressData } from '../services/apiService';
import { socketService } from '../services/socketService';
import { mockAuthService } from '../services/mockAuthService';

export const useAPIIntegration = () => {
  const [isAPIAvailable, setIsAPIAvailable] = useState(false);

  useEffect(() => {
    // Verificar se API está disponível
    checkAPIAvailability();

    // Conectar WebSocket se usuário estiver logado
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      socketService.connect(currentUser.id, currentUser.nome);
      socketService.startPing();
    }

    return () => {
      // Não desconectar aqui - manter conexão ativa
    };
  }, []);

  const checkAPIAvailability = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(2000) // 2 segundos timeout
      });
      
      if (response.ok) {
        setIsAPIAvailable(true);
        console.log('✅ API disponível');
      } else {
        setIsAPIAvailable(false);
        console.log('⚠️ API não disponível');
      }
    } catch (error) {
      setIsAPIAvailable(false);
      console.log('⚠️ API offline - usando dados locais');
    }
  };

  // Enviar progresso para API (com fallback)
  const sendProgress = async (data: ProgressData) => {
    try {
      if (isAPIAvailable) {
        const result = await apiService.sendProgress(data);
        console.log('✅ Progresso enviado para API:', result);
        return result;
      } else {
        console.log('⚠️ API offline - progresso não sincronizado');
        return null;
      }
    } catch (error) {
      console.error('❌ Erro ao enviar progresso:', error);
      return null;
    }
  };

  // Emitir evento de jogo iniciado
  const emitGameStarted = (gameId: string, gameName: string) => {
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser && socketService.isSocketConnected()) {
      socketService.emitGameStarted(currentUser.id, gameId, gameName);
    }
  };

  // Emitir evento de jogo completado
  const emitGameCompleted = (gameId: string, gameName: string, score: number) => {
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser && socketService.isSocketConnected()) {
      socketService.emitGameCompleted(currentUser.id, gameId, gameName, score);
    }
  };

  // Emitir conquista desbloqueada
  const emitAchievementUnlocked = (achievementId: string, achievementName: string) => {
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser && socketService.isSocketConnected()) {
      socketService.emitAchievementUnlocked(currentUser.id, achievementId, achievementName);
    }
  };

  return {
    isAPIAvailable,
    sendProgress,
    emitGameStarted,
    emitGameCompleted,
    emitAchievementUnlocked
  };
};

