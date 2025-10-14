// Lista de eventos disponíveis no WebSocket

module.exports = {
  // Conexão e autenticação
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  AUTHENTICATE: 'authenticate',
  
  // Rooms
  JOIN_ROOM: 'join-room',
  LEAVE_ROOM: 'leave-room',
  JOINED_ROOM: 'joined-room',
  LEFT_ROOM: 'left-room',
  
  // Progresso
  PROGRESS_UPDATED: 'progress-updated',
  
  // Jogos
  GAME_STARTED: 'game-started',
  GAME_COMPLETED: 'game-completed',
  CHILD_GAME_STARTED: 'child-game-started',
  CHILD_GAME_COMPLETED: 'child-game-completed',
  PATIENT_GAME_STARTED: 'patient-game-started',
  PATIENT_GAME_COMPLETED: 'patient-game-completed',
  
  // Conquistas
  ACHIEVEMENT_UNLOCKED: 'achievement-unlocked',
  CHILD_ACHIEVEMENT_UNLOCKED: 'child-achievement-unlocked',
  
  // Sessões
  SESSION_CREATED: 'session-created',
  
  // Presença
  USER_ONLINE: 'user-online',
  USER_OFFLINE: 'user-offline',
  
  // Sincronização
  FORCE_SYNC: 'force-sync',
  
  // Keepalive
  PING: 'ping',
  PONG: 'pong'
};

