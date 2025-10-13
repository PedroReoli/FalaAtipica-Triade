# ⚡ Quick Reference - API Local

> Referência rápida para consulta durante o desenvolvimento

---

## 🚀 Comandos Rápidos

### **Iniciar API**
```bash
cd api/
npm start
```

### **Modo Desenvolvimento (auto-restart)**
```bash
npm run dev
```

### **Rodar Testes**
```bash
npm test
```

### **Verificar Status**
```bash
curl http://localhost:3001/api/sync/status
```

---

## 📍 Rotas Principais

### **Autenticação**
```bash
# Login
POST /api/auth/login
Body: { "email": "carlos@tutors.com", "senha": "123456", "appType": "tutors" }

# Verificar sessão
GET /api/auth/me
Headers: Authorization: Bearer token
```

### **Kids - Progresso**
```bash
# Enviar progresso
POST /api/kids/progress
Body: { "userId": "1", "gameId": "palavras", "score": 85 }

# Consultar progresso
GET /api/kids/progress/:userId
```

### **Tutors - Dashboard**
```bash
# Perfil do tutor
GET /api/tutors/profile/:tutorId

# Progresso da criança
GET /api/tutors/progress/:childId
```

### **Pro - Pacientes**
```bash
# Lista de pacientes
GET /api/pro/patients

# Criar sessão
POST /api/pro/session
Body: { "patientId": "1", "profissionalId": "prof_001", "observacoes": "..." }
```

---

## 🔌 Eventos WebSocket

### **Escutar Eventos (Client)**
```javascript
socket.on('progress-updated', (data) => {
  console.log('Progresso atualizado:', data);
});

socket.on('achievement-unlocked', (data) => {
  console.log('Conquista desbloqueada:', data);
});

socket.on('game-completed', (data) => {
  console.log('Jogo completado:', data);
});
```

### **Emitir Eventos (Server)**
```javascript
// Broadcast para todos
io.emit('progress-updated', data);

// Enviar para room específica
io.to('tutor_001').emit('progress-updated', data);

// Enviar para socket específico
socket.emit('progress-updated', data);
```

---

## 🗂️ Estrutura de Dados

### **Progress Data**
```json
{
  "userId": "1",
  "gameId": "palavras",
  "level": 1,
  "score": 85,
  "correctAnswers": 8,
  "wrongAnswers": 2,
  "timeSpent": 120,
  "category": "animais",
  "timestamp": "2024-01-21T10:30:00Z"
}
```

### **User Data**
```json
{
  "id": "1",
  "nome": "João Silva",
  "email": "joao@kids.com",
  "idade": 8,
  "type": "kid"
}
```

### **Response Success**
```json
{
  "success": true,
  "data": { ... }
}
```

### **Response Error**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_USER",
    "message": "Usuário não encontrado"
  }
}
```

---

## 🐛 Debug Rápido

### **Verificar Logs**
```bash
# Logs da API
tail -f api/logs/app.log

# Logs de erro
tail -f api/logs/error.log
```

### **Testar Conexão WebSocket**
```javascript
// No console do navegador
const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Conectado!'));
```

### **Verificar JSON**
```bash
# Ver progresso atual
cat Mockup/shared/progress.json | json_pp
```

---

## 📊 Status Codes

| Code | Significado | Ação |
|------|-------------|------|
| 200 | OK | Sucesso |
| 201 | Created | Recurso criado |
| 400 | Bad Request | Verificar payload |
| 401 | Unauthorized | Fazer login |
| 404 | Not Found | Verificar rota |
| 500 | Server Error | Ver logs |

---

## ⚙️ Configurações

### **Variáveis de Ambiente (.env)**
```env
PORT=3001
NODE_ENV=development
CORS_ORIGIN=*
JSON_PATH=../Mockup/shared
LOG_LEVEL=debug
```

### **CORS Config**
```javascript
app.use(cors({
  origin: '*', // Kids, Tutors, Pro
  credentials: true
}));
```

---

## 🔧 Troubleshooting Rápido

### **API não inicia**
```bash
# Verificar porta ocupada
lsof -i :3001

# Matar processo
kill -9 <PID>
```

### **WebSocket não conecta**
```javascript
// Verificar URL
const socket = io('http://localhost:3001', {
  transports: ['websocket', 'polling']
});
```

### **CORS Error**
```javascript
// Adicionar headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});
```

### **JSON corrompido**
```bash
# Backup
cp Mockup/shared/progress.json Mockup/shared/progress.backup.json

# Validar JSON
cat Mockup/shared/progress.json | jq .
```

---

## 🧪 Testes Rápidos

### **Testar Rota com curl**
```bash
# POST
curl -X POST http://localhost:3001/api/kids/progress \
  -H "Content-Type: application/json" \
  -d '{"userId":"1","gameId":"palavras","score":85}'

# GET
curl http://localhost:3001/api/kids/progress/1
```

### **Testar com Postman**
```
1. Import Collection
2. Set baseUrl = http://localhost:3001
3. Test endpoints
```

---

## 📱 Integração Rápida

### **Kids App**
```typescript
// services/apiService.ts
const API_URL = 'http://localhost:3001/api';

export const sendProgress = async (data) => {
  const response = await fetch(`${API_URL}/kids/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};
```

### **Tutors App**
```typescript
// services/socketService.ts
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('progress-updated', (data) => {
  console.log('Progresso:', data);
});
```

### **Pro App**
```typescript
// services/apiService.ts
export const getPatients = async () => {
  const response = await fetch(`${API_URL}/pro/patients`);
  return response.json();
};
```

---

## 🎯 Checklist de Deploy

- [ ] Testar todas as rotas
- [ ] Verificar WebSocket conecta
- [ ] Testar sincronização Kids → Tutors
- [ ] Testar sincronização Kids → Pro
- [ ] Verificar reconexão após offline
- [ ] Testar múltiplos usuários
- [ ] Logs funcionando
- [ ] Backup de dados
- [ ] Documentação atualizada

---

## 📞 Links Úteis

- [Documentação Completa](./PLANO-API-LOCAL.md)
- [Setup Inicial](./SETUP-API.md) *(a criar)*
- [Troubleshooting](./TROUBLESHOOTING.md) *(a criar)*
- [Rotas Detalhadas](./ROTAS-DETALHADAS.md) *(a criar)*

---

**💡 Dica:** Mantenha este documento aberto durante o desenvolvimento para referência rápida!

