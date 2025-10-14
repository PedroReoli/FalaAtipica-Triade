# 📚 Swagger API Documentation - FalaAtípica

## 🎯 Acesso Rápido

**URL:** http://localhost:3001/api/docs

---

## 🚀 Como Usar

### 1. Iniciar API
```bash
npm run api
```

### 2. Abrir Swagger
Acesse no navegador: **http://localhost:3001/api/docs**

### 3. Visualizar Rotas
- Todas as 24 rotas estão documentadas
- Organizadas por tags (Auth, Kids, Tutors, Pro, Sync)
- Exemplos de request/response

### 4. Testar Endpoints
- Clique em qualquer rota
- Clique em "Try it out"
- Preencha os parâmetros
- Clique em "Execute"
- Veja a resposta!

---

## 📋 Rotas Disponíveis

### **🔐 Auth (3 rotas)**
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Verificar sessão
- `POST /api/auth/logout` - Logout

### **🎮 Kids (4 rotas)**
- `POST /api/kids/progress` - Salvar progresso
- `GET /api/kids/progress/{userId}` - Buscar progresso
- `GET /api/kids/games` - Lista de jogos
- `GET /api/kids/achievements/{userId}` - Conquistas

### **👨‍👩‍👧 Tutors (7 rotas)**
- `GET /api/tutors/profile/{tutorId}` - Perfil do tutor
- `GET /api/tutors/children/{tutorId}` - Crianças
- `GET /api/tutors/progress/{childId}` - Progresso da criança
- `GET /api/tutors/reports/{childId}` - Relatórios
- `GET /api/tutors/tips` - Dicas
- `GET /api/tutors/support` - Suporte/FAQ
- `GET/PUT /api/tutors/settings/{tutorId}` - Configurações

### **👨‍⚕️ Pro (7 rotas)**
- `GET /api/pro/patients` - Lista de pacientes
- `GET /api/pro/patient/{patientId}` - Detalhes do paciente
- `POST /api/pro/session` - Criar sessão
- `GET /api/pro/reports/{patientId}` - Relatórios
- `PUT /api/pro/patient/{patientId}` - Atualizar paciente
- `GET /api/pro/medications` - Medicamentos
- `POST /api/pro/medication` - Adicionar medicamento

### **🔄 Sync (3 rotas)**
- `GET /api/sync/status` - Status da API
- `POST /api/sync/force` - Forçar sincronização
- `GET /api/sync/history` - Histórico

---

## 🧪 Exemplos de Teste no Swagger

### **1. Fazer Login (Tutors)**

1. Abra http://localhost:3001/api/docs
2. Procure "Auth" → `POST /api/auth/login`
3. Clique em "Try it out"
4. Cole este JSON:
```json
{
  "email": "carlos@tutors.com",
  "senha": "123456",
  "appType": "tutors"
}
```
5. Clique em "Execute"
6. Veja a resposta com o token!

---

### **2. Enviar Progresso (Kids)**

1. Procure "Kids" → `POST /api/kids/progress`
2. Clique em "Try it out"
3. Cole este JSON:
```json
{
  "userId": "1",
  "gameId": "palavras",
  "level": 1,
  "score": 85,
  "correctAnswers": 8,
  "wrongAnswers": 2,
  "timeSpent": 120,
  "category": "animais"
}
```
4. Clique em "Execute"
5. Veja o progresso salvo!

---

### **3. Buscar Perfil (Tutors)**

1. Procure "Tutors" → `GET /api/tutors/profile/{tutorId}`
2. Clique em "Try it out"
3. tutorId: `tutor_001`
4. Clique em "Execute"
5. Veja o perfil completo com crianças!

---

### **4. Criar Sessão (Pro)**

1. Procure "Pro" → `POST /api/pro/session`
2. Clique em "Try it out"
3. Cole este JSON:
```json
{
  "patientId": "1",
  "profissionalId": "prof_001",
  "tipo": "Terapia",
  "observacoes": "Sessão de avaliação inicial"
}
```
4. Clique em "Execute"
5. Sessão criada + Tutor notificado via WebSocket!

---

## 📊 Recursos do Swagger

### **✅ O Que Você Pode Fazer:**

1. **Ver Todas as Rotas** - Organizadas por categoria
2. **Ler Descrições** - De cada endpoint
3. **Ver Exemplos** - Request e Response
4. **Testar Direto** - Sem precisar Postman/curl
5. **Ver Schemas** - Estrutura dos dados
6. **Copiar curl** - Comando curl gerado automaticamente
7. **Ver Status Codes** - 200, 400, 404, 500

### **✅ Vantagens:**

- ✅ Interface visual bonita
- ✅ Testes interativos
- ✅ Documentação sempre atualizada
- ✅ Exemplos prontos para usar
- ✅ Validação automática
- ✅ Exportar JSON/YAML

---

## 🎯 URLs Importantes

| Recurso | URL |
|---------|-----|
| **Swagger UI** | http://localhost:3001/api/docs |
| **Swagger JSON** | http://localhost:3001/api/docs.json |
| **Health Check** | http://localhost:3001/api/health |
| **API Base** | http://localhost:3001/api |

---

## 💡 Dicas

### **Testar Fluxo Completo:**

1. **Login (Auth)**
   - `POST /api/auth/login`
   - Copiar o token da resposta

2. **Enviar Progresso (Kids)**
   - `POST /api/kids/progress`
   - Usar userId retornado do login

3. **Ver Progresso (Tutors)**
   - `GET /api/tutors/progress/{childId}`
   - Ver os dados atualizados!

---

## 🔧 Personalizações

### **Swagger está configurado com:**
- ✅ Título: "API Local - FalaAtípica"
- ✅ Versão: 1.0.0
- ✅ Servidor: http://localhost:3001
- ✅ Tags: Auth, Kids, Tutors, Pro, Sync
- ✅ Schemas: SuccessResponse, ErrorResponse, Progress
- ✅ Topbar escondida (UI limpa)

---

## 📚 Documentação Adicional

- [README da API](./README.md)
- [Plano Completo](../docs/api/PLANO-API-LOCAL.md)
- [Quick Reference](../docs/api/QUICK-REFERENCE.md)

---

**🎉 Swagger está pronto! Acesse: http://localhost:3001/api/docs**

