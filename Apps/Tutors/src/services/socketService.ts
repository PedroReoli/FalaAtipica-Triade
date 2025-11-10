// Serviço de WebSocket para Tutors
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3001';

type EventCallback = (data: any) => void;

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, EventCallback[]> = new Map();
  private isConnected = false;

  // Conectar ao WebSocket
  connect(tutorId: string, tutorName: string) {
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
        userId: tutorId,
        userType: 'tutor',
        userName: tutorName,
      });
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
        userId: tutorId,
        userType: 'tutor',
        userName: tutorName,
      });
    });

    // Escutar eventos de progresso
    this.socket.on('progress-updated', (data: any) => {
      this.emit('progress-updated', data);
    });

    // Escutar eventos de jogo iniciado
    this.socket.on('child-game-started', (data: any) => {
      this.emit('child-game-started', data);
    });

    // Escutar eventos de jogo completado
    this.socket.on('child-game-completed', (data: any) => {
      this.emit('child-game-completed', data);
    });

    // Escutar eventos de conquista
    this.socket.on('child-achievement-unlocked', (data: any) => {
      this.emit('child-achievement-unlocked', data);
    });

    // Escutar eventos de sessão criada
    this.socket.on('session-created', (data: any) => {
      this.emit('session-created', data);
    });

    // DESABILITADO - Sistema de agenda
    /*
    // Escutar eventos de agenda criada
    this.socket.on('agenda-created', (data: any) => {
      this.emit('agenda-created', data);
    });

    // Escutar eventos de agenda atualizada
    this.socket.on('agenda-updated', (data: any) => {
      this.emit('agenda-updated', data);
    });
    */

    // Escutar eventos de usuário online
    this.socket.on('user-online', (data: any) => {
      this.emit('user-online', data);
    });

    // Escutar eventos de usuário offline
    this.socket.on('user-offline', (data: any) => {
      this.emit('user-offline', data);
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

  // Escutar evento
  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(callback);
  }

  // Emitir para listeners locais
  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  // Remover listener
  off(event: string, callback?: EventCallback) {
    if (callback) {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    } else {
      // Remover todos os listeners do evento
      this.listeners.delete(event);
    }
  }

  // Verificar se está conectado
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }
}

export const socketService = new SocketService();

