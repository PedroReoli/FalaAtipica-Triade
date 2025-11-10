// Configuração avançada de WebSocket
const socketEvents = require('./events');

function setupWebSocket(io) {
  // Armazenar usuários online
  const onlineUsers = new Map();
  
  io.on('connection', (socket) => {
    console.log(`✅ Cliente conectado: ${socket.id}`);
    
    // Autenticação do socket
    socket.on('authenticate', (data) => {
      const { userId, userType, userName } = data;
      
      socket.userId = userId;
      socket.userType = userType;
      socket.userName = userName;
      
      // Adicionar aos usuários online
      onlineUsers.set(userId, {
        socketId: socket.id,
        userId,
        userType,
        userName,
        connectedAt: new Date()
      });
      
      // Join em room específica do usuário
      socket.join(`user_${userId}`);
      
      // Se for tutor, join na room de tutors
      if (userType === 'tutor') {
        socket.join('tutors');
      }
      
      // Se for profissional, join na room de profissionais
      if (userType === 'professional') {
        socket.join('professionals');
      }
      
      // Notificar que usuário está online
      io.emit('user-online', {
        userId,
        userType,
        userName,
        timestamp: new Date().toISOString()
      });
      
      console.log(`🔐 Autenticado: ${userName} (${userType})`);
    });
    
    // Join em room específica
    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      console.log(`📍 Socket ${socket.id} entrou na room: ${roomId}`);
      
      socket.emit('joined-room', { roomId });
    });
    
    // Leave de room específica
    socket.on('leave-room', (roomId) => {
      socket.leave(roomId);
      console.log(`📍 Socket ${socket.id} saiu da room: ${roomId}`);
      
      socket.emit('left-room', { roomId });
    });
    
    // Jogo iniciado (Kids)
    socket.on('game-started', (data) => {
      const { userId, gameId, gameName } = data;
      
      // Emitir para tutors e professionals
      io.to('tutors').emit('child-game-started', {
        userId,
        userName: socket.userName,
        gameId,
        gameName,
        timestamp: new Date().toISOString()
      });
      
      io.to('professionals').emit('patient-game-started', {
        userId,
        userName: socket.userName,
        gameId,
        gameName,
        timestamp: new Date().toISOString()
      });
      
      console.log(`🎮 Jogo iniciado: ${socket.userName} - ${gameName}`);
    });
    
    // Jogo completado (Kids)
    socket.on('game-completed', (data) => {
      const { userId, gameId, gameName, score } = data;
      
      // Emitir para tutors e professionals
      io.to('tutors').emit('child-game-completed', {
        userId,
        userName: socket.userName,
        gameId,
        gameName,
        score,
        timestamp: new Date().toISOString()
      });
      
      io.to('professionals').emit('patient-game-completed', {
        userId,
        userName: socket.userName,
        gameId,
        gameName,
        score,
        timestamp: new Date().toISOString()
      });
      
      console.log(`🏆 Jogo completado: ${socket.userName} - ${gameName} - ${score}%`);
    });
    
    // Conquista desbloqueada
    socket.on('achievement-unlocked', (data) => {
      const { userId, achievementId, achievementName } = data;
      
      // Emitir para tutors
      io.to('tutors').emit('child-achievement-unlocked', {
        userId,
        userName: socket.userName,
        achievementId,
        achievementName,
        timestamp: new Date().toISOString()
      });
      
      console.log(`⭐ Conquista: ${socket.userName} - ${achievementName}`);
    });
    
    // Ping/Pong para manter conexão viva
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date().toISOString() });
    });
    
    // Desconexão
    socket.on('disconnect', (reason) => {
      console.log(`❌ Cliente desconectado: ${socket.id} - Razão: ${reason}`);
      
      if (socket.userId) {
        // Remover dos usuários online
        onlineUsers.delete(socket.userId);
        
        // Notificar que usuário está offline
        io.emit('user-offline', {
          userId: socket.userId,
          userType: socket.userType,
          userName: socket.userName,
          timestamp: new Date().toISOString()
        });
        
        console.log(`👋 Usuário offline: ${socket.userName}`);
      }
    });
  });
  
  // Retornar funções úteis
  return {
    getOnlineUsers: () => Array.from(onlineUsers.values()),
    getUserSocket: (userId) => onlineUsers.get(userId),
    emitToUser: (userId, event, data) => {
      io.to(`user_${userId}`).emit(event, data);
    },
    emitToTutors: (event, data) => {
      io.to('tutors').emit(event, data);
    },
    emitToProfessionals: (event, data) => {
      io.to('professionals').emit(event, data);
    }
  };
}

module.exports = setupWebSocket;

