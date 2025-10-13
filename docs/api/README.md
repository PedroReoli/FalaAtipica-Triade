# 📡 Documentação da API Local - FalaAtípica

## 📋 Índice Geral

Esta pasta contém toda a documentação relacionada à API local de sincronização entre os aplicativos Kids, Tutors e Pro.

---

## 📚 Documentos Disponíveis

### **1. 🚀 [PLANO-API-LOCAL.md](./PLANO-API-LOCAL.md)** ⭐
**Status:** ✅ Completo  
**Descrição:** Plano completo de implementação da API local com WebSocket

**Conteúdo:**
- Visão geral e arquitetura
- 5 fases de implementação
- Checklist detalhado de progresso
- Tecnologias e estrutura de pastas
- Rotas da API (GET, POST, PUT, DELETE)
- Integração com Kids, Tutors e Pro
- Fluxos de dados completos
- Guia de testes

**Quando usar:** Antes de começar a implementação da API

---

### **2. 📖 SETUP-API.md** *(A criar)*
**Status:** ⏳ Pendente  
**Descrição:** Guia passo a passo para configurar e iniciar a API

**Conteúdo (Planejado):**
- Pré-requisitos (Node.js, npm)
- Instalação de dependências
- Configuração de variáveis de ambiente
- Primeiro startup
- Testes básicos
- Troubleshooting inicial

---

### **3. 🛣️ ROTAS-DETALHADAS.md** *(A criar)*
**Status:** ⏳ Pendente  
**Descrição:** Documentação técnica completa de todas as rotas

**Conteúdo (Planejado):**
- Todas as rotas com exemplos
- Request/Response schemas
- Códigos de erro
- Rate limiting
- Autenticação
- Exemplos com curl, Postman, código

---

### **4. 🔌 WEBSOCKET-EVENTS.md** *(A criar)*
**Status:** ⏳ Pendente  
**Descrição:** Lista completa de eventos WebSocket

**Conteúdo (Planejado):**
- Todos os eventos disponíveis
- Payloads de cada evento
- Exemplos de uso
- Como escutar eventos
- Como emitir eventos
- Sistema de rooms

---

### **5. 🐛 TROUBLESHOOTING.md** *(A criar)*
**Status:** ⏳ Pendente  
**Descrição:** Problemas comuns e soluções

**Conteúdo (Planejado):**
- Erros de conexão
- Problemas de CORS
- WebSocket não conecta
- JSON corrompido
- Performance lenta
- Logs de debug

---

### **6. 🔄 MIGRACAO-SUPABASE.md** *(A criar)*
**Status:** ⏳ Pendente  
**Descrição:** Como migrar da API local para Supabase

**Conteúdo (Planejado):**
- Comparação: API local vs Supabase
- Preparação para migração
- Passo a passo da migração
- Configuração do Supabase
- Mapeamento de rotas
- Realtime Supabase
- Checklist de migração

---

## 🎯 Status da Implementação

| Fase | Descrição | Status | Progresso |
|------|-----------|--------|-----------|
| **FASE 1** | Setup Básico | ⏳ Não Iniciado | 0% |
| **FASE 2** | Rotas HTTP | ⏳ Não Iniciado | 0% |
| **FASE 3** | WebSocket | ⏳ Não Iniciado | 0% |
| **FASE 4** | Integração Apps | ⏳ Não Iniciado | 0% |
| **FASE 5** | Testes | ⏳ Não Iniciado | 0% |

---

## 🚀 Quick Start

### **1. Ler Documentação**
```bash
# Ler plano completo
docs/api/PLANO-API-LOCAL.md
```

### **2. Setup Inicial** *(Quando disponível)*
```bash
cd api/
npm install
npm start
```

### **3. Testar API**
```bash
# Verificar se está rodando
curl http://localhost:3001/api/sync/status
```

### **4. Conectar Apps**
```bash
# Kids
cd Kids/
npm install socket.io-client

# Tutors
cd Tutors/
npm install socket.io-client

# Pro
cd Pro/
npm install socket.io-client
```

---

## 📊 Fluxo de Desenvolvimento Recomendado

```
1. Ler PLANO-API-LOCAL.md (30 min)
   ↓
2. Seguir SETUP-API.md (1 hora)
   ↓
3. Implementar FASE 1: Setup Básico (1-2 horas)
   ↓
4. Implementar FASE 2: Rotas HTTP (2-3 horas)
   ↓
5. Consultar ROTAS-DETALHADAS.md quando necessário
   ↓
6. Implementar FASE 3: WebSocket (1-2 horas)
   ↓
7. Consultar WEBSOCKET-EVENTS.md para eventos
   ↓
8. Implementar FASE 4: Integração Apps (2-3 horas)
   ↓
9. Implementar FASE 5: Testes (1-2 horas)
   ↓
10. Consultar TROUBLESHOOTING.md se houver problemas
```

**TOTAL ESTIMADO: 7-12 horas**

---

## 🛠️ Tecnologias

### **Backend:**
- Node.js v18+
- Express.js
- Socket.io
- CORS
- Nodemon
- Winston (logs)

### **Frontend:**
- socket.io-client
- axios (opcional)

---

## 🌐 URLs Importantes

### **Desenvolvimento:**
- API: `http://localhost:3001`
- WebSocket: `ws://localhost:3001`
- Docs: `http://localhost:3001/docs` *(futuramente)*

### **Endpoints Principais:**
- Health Check: `GET /api/sync/status`
- Auth: `POST /api/auth/login`
- Progress (Kids): `POST /api/kids/progress`
- Dashboard (Tutors): `GET /api/tutors/profile/:id`
- Patients (Pro): `GET /api/pro/patients`

---

## 📝 Convenções

### **Nomenclatura:**
- **Rotas:** kebab-case (`/api/kids/progress`)
- **Variáveis:** camelCase (`userId`, `progressData`)
- **Arquivos:** kebab-case (`progress-controller.js`)
- **Classes:** PascalCase (`ProgressService`)

### **Responses:**
```javascript
// Sucesso
{
  "success": true,
  "data": { ... }
}

// Erro
{
  "success": false,
  "error": {
    "code": "INVALID_USER",
    "message": "Usuário não encontrado"
  }
}
```

### **Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔗 Links Úteis

### **Documentação Externa:**
- [Express.js](https://expressjs.com/)
- [Socket.io](https://socket.io/docs/)
- [Node.js](https://nodejs.org/)

### **Documentação Interna:**
- [Estrutura do Projeto](../../README.md)
- [Mockup de Dados](../../Mockup/)
- [Integração Completa](../../Mockup/INTEGRACAO-COMPLETA.md)

---

## 🎯 Próximos Passos

### **Para Começar Agora:**
1. ✅ Leia o [PLANO-API-LOCAL.md](./PLANO-API-LOCAL.md)
2. ⏳ Decida se quer implementar HTTP ou WebSocket primeiro
3. ⏳ Crie a pasta `api/` na raiz do projeto
4. ⏳ Siga os passos da FASE 1

### **Para Contribuir:**
1. Leia toda a documentação
2. Siga as convenções estabelecidas
3. Teste suas mudanças
4. Documente novas features

---

## 📞 Suporte

### **Problemas?**
1. Consulte [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) *(quando disponível)*
2. Verifique os logs da API
3. Teste com Postman/curl
4. Revise a documentação

### **Bugs ou Melhorias?**
- Documente no código
- Adicione testes
- Atualize esta documentação

---

## 📅 Histórico de Atualizações

| Data | Documento | Mudanças |
|------|-----------|----------|
| 13/10/2025 | PLANO-API-LOCAL.md | Criação inicial |
| 13/10/2025 | README.md | Índice da documentação |

---

**Última atualização:** 13/10/2025  
**Mantido por:** Sistema de Desenvolvimento FalaAtípica  
**Versão:** 1.0.0

