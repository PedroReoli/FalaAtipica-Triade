# 🚀 API Local - FalaAtípica

API de sincronização em tempo real entre Kids, Tutors e Pro.

## 📋 Requisitos

- Node.js v18+
- npm v9+

## 🏁 Instalação

```bash
cd api/
npm install
```

## ▶️ Como Rodar

### Modo Produção
```bash
npm start
```

### Modo Desenvolvimento (auto-restart)
```bash
npm run dev
```

A API estará disponível em: **http://localhost:3001**

## 📡 Endpoints Principais

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Verificar sessão
- `POST /api/auth/logout` - Logout

### Kids (Progresso)
- `POST /api/kids/progress` - Enviar progresso
- `GET /api/kids/progress/:userId` - Buscar progresso
- `GET /api/kids/games` - Lista de jogos
- `GET /api/kids/achievements/:userId` - Conquistas

### Tutors (Dashboard)
- `GET /api/tutors/profile/:tutorId` - Perfil do tutor
- `GET /api/tutors/children/:tutorId` - Crianças do tutor
- `GET /api/tutors/progress/:childId` - Progresso da criança
- `GET /api/tutors/reports/:childId` - Relatórios

### Pro (Profissional)
- `GET /api/pro/patients` - Lista de pacientes
- `GET /api/pro/patient/:patientId` - Detalhes do paciente
- `POST /api/pro/session` - Criar sessão
- `GET /api/pro/reports/:patientId` - Relatórios
- `PUT /api/pro/patient/:patientId` - Atualizar paciente

### Sincronização
- `GET /api/sync/status` - Status da API
- `POST /api/sync/force` - Forçar sincronização
- `GET /api/sync/history` - Histórico

## 🔌 WebSocket

Conectar ao WebSocket:
```javascript
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
```

### Eventos Disponíveis:
- `progress-updated` - Progresso atualizado
- `session-created` - Sessão criada
- `force-sync` - Sincronização forçada

## 📁 Estrutura

```
api/
├── server.js              # Servidor principal
├── config/               # Configurações
├── routes/               # Rotas da API
├── controllers/          # Lógica de negócio (futuro)
├── services/             # Serviços (JSON, etc)
├── middleware/           # Middlewares (futuro)
├── socket/               # Configuração WebSocket (futuro)
├── utils/                # Funções auxiliares
└── package.json
```

## 🧪 Testar

### Health Check
```bash
curl http://localhost:3001/api/sync/status
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carlos@tutors.com","senha":"123456","appType":"tutors"}'
```

### Enviar Progresso
```bash
curl -X POST http://localhost:3001/api/kids/progress \
  -H "Content-Type: application/json" \
  -d '{"userId":"1","gameId":"palavras","score":85}'
```

## 📊 Status

- ✅ FASE 1: Setup Básico - **COMPLETO**
- ✅ FASE 2: Rotas HTTP - **COMPLETO**
- ⏳ FASE 3: WebSocket - **PARCIAL** (eventos básicos)
- ⏳ FASE 4: Integração Apps - **PENDENTE**
- ⏳ FASE 5: Testes - **PENDENTE**

## 📚 Documentação Completa

Consulte: `docs/api/PLANO-API-LOCAL.md`

---

**Última atualização:** 13/10/2025

