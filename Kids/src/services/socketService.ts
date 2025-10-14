// Serviço de WebSocket para Kids
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

type EventCallback = (data: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, EventCallback[]> = new Map();
  private isConnected = false;

  // Conectar ao WebSocket
  connect(userId: string, userName: string) {
    if (this.socket?.connected) {
      console.log('🔌 Socket já conectado');
      return;
    }

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Evento de conexão
    this.socket.on('connect', () => {
      console.log('✅ WebSocket conectado:', this.socket?.id);
      this.isConnected = true;

      // Autenticar
      this.socket?.emit('authenticate', {
        userId,
        userType: 'kid',
        userName,
      });
    });

    // Evento de autenticação
    this.socket.on('authenticated', (data: any) => {
      console.log('🔐 Autenticado:', data);
    });

    // Evento de desconexão
    this.socket.on('disconnect', (reason: string) => {
      console.log('❌ WebSocket desconectado:', reason);
      this.isConnected = false;
    });

    // Evento de reconexão
    this.socket.on('reconnect', (attemptNumber: number) => {
      console.log(`🔄 Reconectado após ${attemptNumber} tentativas`);
      this.isConnected = true;

      // Re-autenticar
      this.socket?.emit('authenticate', {
        userId,
        userType: 'kid',
        userName,
      });
    });

    // Pong (keepalive)
    this.socket.on('pong', () => {
      // Connection is alive
    });
  }

  // Desconectar
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('👋 Socket desconectado');
    }
  }

  // Emitir evento de jogo iniciado
  emitGameStarted(userId: string, gameId: string, gameName: string) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket não conectado');
      return;
    }

    this.socket.emit('game-started', {
      userId,
      gameId,
      gameName,
    });

    console.log(`🎮 Emitido: game-started - ${gameName}`);
  }

  // Emitir evento de jogo completado
  emitGameCompleted(userId: string, gameId: string, gameName: string, score: number) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket não conectado');
      return;
    }

    this.socket.emit('game-completed', {
      userId,
      gameId,
      gameName,
      score,
    });

    console.log(`🏆 Emitido: game-completed - ${gameName} - ${score}%`);
  }

  // Emitir conquista desbloqueada
  emitAchievementUnlocked(userId: string, achievementId: string, achievementName: string) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket não conectado');
      return;
    }

    this.socket.emit('achievement-unlocked', {
      userId,
      achievementId,
      achievementName,
    });

    console.log(`⭐ Emitido: achievement-unlocked - ${achievementName}`);
  }

  // Escutar evento
  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(callback);

    // Registrar no socket
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  // Remover listener
  off(event: string, callback?: EventCallback) {
    if (callback) {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }

      // Remover do socket
      if (this.socket) {
        this.socket.off(event, callback);
      }
    } else {
      // Remover todos os listeners do evento
      this.listeners.delete(event);
      if (this.socket) {
        this.socket.off(event);
      }
    }
  }

  // Ping (keepalive)
  startPing() {
    setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit('ping');
      }
    }, 30000); // A cada 30 segundos
  }

  // Verificar se está conectado
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }
}

export const socketService = new SocketService();

