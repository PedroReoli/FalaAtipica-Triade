# 📡 API Completa - FalaAtípica Triade

**Versão:** 1.2.0  
**Porta:** 3001  
**Base URL:** `http://localhost:3001/api`

---

## 🚀 **Rodar a API**

```bash
cd api
npm install
npm start
```

**Logs esperados:**
```
✅ Servidor rodando em http://localhost:3001
📡 Socket.IO ativo
📊 Swagger disponível em http://localhost:3001/api-docs
```

---

## 📋 **Rotas Implementadas**

### **Kids (`/api/kids`)**

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | `/progress` | Salvar progresso do jogo | ❌ |
| GET | `/reminders/:userId` | Buscar lembretes da criança | ❌ |
| PUT | `/reminder/:reminderId/read` | Marcar lembrete como lido | ❌ |

### **Tutors (`/api/tutors`)**

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/profile/:tutorId` | Buscar perfil completo | ❌ |
| GET | `/child/:childId` | Dados da criança | ❌ |
| GET | `/progress/:childId` | Progresso detalhado | ❌ |
| GET | `/agendas/:tutorId` | Agendas do tutor | ❌ |

### **Pro (`/api/pro`)**

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | `/patients` | Lista de pacientes | ❌ |
| GET | `/patient/:patientId` | Detalhes do paciente | ❌ |
| POST | `/session` | Criar sessão | ❌ |
| GET | `/reports/:patientId` | Relatórios | ❌ |
| PUT | `/patient/:patientId` | Atualizar paciente | ❌ |
| GET | `/medications` | Lista de medicamentos | ❌ |
| POST | `/medication` | Adicionar medicamento | ❌ |
| GET | `/agendas/:professionalId` | Agendas do profissional | ❌ |
| POST | `/agenda` | Criar agenda | ❌ |
| PUT | `/agenda/:agendaId` | Atualizar agenda | ❌ |
| POST | `/reminder` | Criar lembrete | ❌ |
| POST | `/partnership-token` | Gerar token de parceria | ❌ |
| POST | `/claim-partnership` | Reivindicar parceria | ❌ |
| GET | `/partnerships/:professionalId` | Listar parcerias | ❌ |
| GET | `/my-tokens/:professionalId` | Listar tokens gerados | ❌ |

---

## 📡 **Socket.IO Events**

| Evento | Emissor | Receptor | Dados |
|--------|---------|----------|-------|
| `progress-updated` | API | Todos | userId, gameName, score |
| `child-game-completed` | API | Tutors | userId, userName, gameId, gameName, score |
| `patient-game-completed` | API | Pro | userId, userName, gameId, gameName, score |
| `session-created` | API | Tutors | sessionId, patientName, tipo |
| `agenda-created` | API | Tutors | agendaId, criancaNome, data, horario |
| `agenda-updated` | API | Tutors | agendaId, criancaNome, status |
| `reminder-received` | API | Kids | reminderId, titulo, mensagem, prioridade |
| `partnership-established` | API | Pro (ambos) | partnershipId, partnerName, partnerType |

---

## 🗂️ **Mockup Files (JSON)**

### **Shared (Centralizados)**
- `Mockup/shared/progress.json` - Progresso das crianças
- `Mockup/shared/sessions.json` - Sessões realizadas
- `Mockup/shared/agendas.json` - Agendas unificadas
- `Mockup/shared/reminders.json` - Lembretes para crianças
- `Mockup/shared/partnerships.json` - Parcerias entre profissionais
- `Mockup/shared/partnership-tokens.json` - Tokens de parceria
- `Mockup/shared/observations.json` - Observações dos pais (preparado)
- `Mockup/shared/recommendations.json` - Recomendações (preparado)

### **Kids**
- `Mockup/KIDS/usuarios.json` - Usuários crianças

### **Tutors**
- `Mockup/TUTORS/usuarios.json` - Usuários tutores

### **Pro**
- `Mockup/PRO/usuarios.json` - Usuários profissionais
- `Mockup/PRO/medicamentos.json` - Medicamentos

---

## 📖 **Exemplos de Uso**

### **POST /api/kids/progress**

**Request:**
```json
{
  "userId": "1",
  "userName": "João Silva",
  "gameId": "palavras",
  "gameName": "Jogo das Palavras",
  "score": 85,
  "timeSpent": 120,
  "correctAnswers": 17,
  "wrongAnswers": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progresso salvo com sucesso",
  "data": {
    "id": "progress_1730000000000",
    "timestamp": "2025-10-17T20:00:00.000Z"
  }
}
```

**Socket.IO Emitido:**
- `progress-updated` (para todos)
- `child-game-completed` (para tutores)
- `patient-game-completed` (para profissionais)

---

### **POST /api/pro/partnership-token**

**Request:**
```json
{
  "professionalId": "prof_001",
  "professionalName": "Dr. Carlos Silva",
  "professionalType": "fonoaudiologo"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token gerado com sucesso",
  "data": {
    "token": "PARCERIA_abc123xyz789",
    "expiresAt": "2025-10-24T20:00:00.000Z"
  }
}
```

---

### **POST /api/pro/claim-partnership**

**Request:**
```json
{
  "token": "PARCERIA_abc123xyz789",
  "professionalId": "prof_002",
  "professionalName": "Dra. Ana Santos",
  "professionalType": "psicologo"
}
```

**Response (Sucesso):**
```json
{
  "success": true,
  "message": "Parceria estabelecida com sucesso",
  "data": {
    "partnershipId": "partnership_1730000000000",
    "partner": {
      "name": "Dr. Carlos Silva",
      "type": "fonoaudiologo"
    }
  }
}
```

**Response (Token Inválido):**
```json
{
  "success": false,
  "error": "TOKEN_NOT_FOUND",
  "message": "Token inválido ou não encontrado"
}
```

**Socket.IO Emitido:**
- `partnership-established` (para ambos profissionais)

---

## 🛠️ **Desenvolvimento**

### **Estrutura**
```
api/
├── server.js              # Servidor principal
├── routes/
│   ├── kids.js           # Rotas Kids
│   ├── tutors.js         # Rotas Tutors
│   └── pro.js            # Rotas Pro
├── services/
│   └── jsonService.js    # Serviço de leitura/escrita JSON
├── utils/
│   └── helpers.js        # Funções auxiliares
├── socket/
│   ├── index.js          # Configuração Socket.IO
│   └── events.js         # Eventos Socket.IO
└── config/
    ├── env.js            # Variáveis de ambiente
    └── swagger.js        # Configuração Swagger
```

### **Adicionar Nova Rota**

1. Criar rota em `routes/[app].js`:
```javascript
router.get('/nova-rota/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Lógica aqui
    res.json(successResponse(data));
  } catch (error) {
    console.error('❌ Erro:', error);
    res.status(500).json(errorResponse('ERROR_CODE', 'Mensagem'));
  }
});
```

2. Testar:
```bash
curl http://localhost:3001/api/[app]/nova-rota/123
```

---

## ✅ **Validações Implementadas**

### **Sistema de Parcerias**
- ✅ Token existe
- ✅ Token não expirado
- ✅ Token não usado
- ✅ Não permite parceria consigo mesmo
- ✅ Token único (não pode ser reutilizado)

### **Progresso**
- ✅ userId obrigatório
- ✅ gameId obrigatório
- ✅ score entre 0-100
- ✅ timestamp automático

---

## 📊 **Swagger**

**URL:** http://localhost:3001/api-docs

Documentação interativa de todas as rotas com exemplos.

---

## 🔍 **Logs**

Todos os endpoints logam:
- ✅ Sucesso: `✅ [Ação] realizada: [detalhes]`
- ❌ Erro: `❌ Erro ao [ação]: [erro]`
- 📡 Socket.IO: `📡 Evento emitido: [evento]`
- 🎮 Progresso: `🎮 Progresso salvo: [nome] - [jogo] - [score]%`
- 🔗 Parceria: `🔗 Token gerado: [token]`
- 🤝 Parceria: `🤝 Parceria estabelecida: [nomeA] ↔ [nomeB]`

---

## 🐛 **Troubleshooting**

### **Porta 3001 ocupada:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID [PID] /F

# Ou mudar porta em .env
PORT=3002
```

### **Socket.IO não conecta:**
- Verificar CORS configurado
- Verificar URL do cliente
- Ver console do cliente: "✅ WebSocket conectado"

### **Dados não salvam:**
- Verificar permissões da pasta `Mockup/`
- Ver logs de erro no console
- Verificar se arquivo JSON existe

---

**🔥 API 100% FUNCIONAL! 🔥**

