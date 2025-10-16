# 🔄 Análise Completa - Compartilhamento de Dados entre Aplicações

**Data:** 16/10/2025  
**Status:** ✅ Análise Completa

---

## 📋 Sumário

1. [Kids → Tutors (Dados Enviados)](#1-kids--tutors-dados-enviados)
2. [Tutors → Kids (Dados Enviados)](#2-tutors--kids-dados-enviados)
3. [Kids → Pro (Dados Enviados)](#3-kids--pro-dados-enviados)
4. [Pro → Kids (Dados Enviados)](#4-pro--kids-dados-enviados)
5. [Tutors → Pro (Dados Enviados)](#5-tutors--pro-dados-enviados)
6. [Pro → Tutors (Dados Enviados)](#6-pro--tutors-dados-enviados)
7. [Arquivos Compartilhados](#7-arquivos-compartilhados)
8. [Gaps Identificados](#8-gaps-identificados)
9. [Recomendações](#9-recomendações)

---

## 1. Kids → Tutors (Dados Enviados)

### ✅ Dados que ESTÃO sendo compartilhados:

#### 1.1. **Progresso de Jogos** (API)
**Rota:** `POST /api/kids/progress`  
**Arquivo Destino:** `Mockup/shared/progress.json`

```json
{
  "id": "progress_xxx",
  "userId": "1",              // ✅ ID da criança
  "gameId": "palavras",       // ✅ ID do jogo
  "level": 1,                 // ✅ Nível do jogo
  "score": 100,               // ✅ Pontuação (%)
  "correctAnswers": 7,        // ✅ Respostas corretas
  "wrongAnswers": 0,          // ✅ Respostas erradas
  "timeSpent": 111,           // ✅ Tempo em segundos
  "category": "animais",      // ✅ Categoria do jogo
  "timestamp": "2025-10-16T01:56:06.322Z"  // ✅ Data/hora
}
```

**Tutors Consome Em:**
- `GET /api/tutors/progress/:childId` - Progresso detalhado
- `GET /api/tutors/child/:childId` - Perfil da criança (Total Sessões, Último Acesso)
- `GET /api/tutors/profile/:tutorId` - Perfil do tutor com crianças

#### 1.2. **Eventos em Tempo Real** (Socket.IO)
**Eventos Emitidos pelo Kids:**

##### a) `game-started`
```javascript
{
  userId: "1",              // ✅ ID da criança
  userName: "João Silva",   // ✅ Nome da criança
  gameId: "palavras",       // ✅ ID do jogo
  gameName: "Jogo das Palavras",  // ✅ Nome do jogo
  timestamp: "2025-10-16..."      // ✅ Data/hora
}
```

**Tutors Escuta Como:** `child-game-started`  
**Usado Em:**
- `DashboardScreen.tsx` - Mostra toast de notificação
- `ChildProfileScreen.tsx` - Atualiza lista de dispositivos

##### b) `game-completed`
```javascript
{
  userId: "1",              // ✅ ID da criança
  userName: "João Silva",   // ✅ Nome da criança
  gameId: "palavras",       // ✅ ID do jogo
  gameName: "Jogo das Palavras",  // ✅ Nome do jogo
  score: 100,               // ✅ Pontuação
  timestamp: "2025-10-16..."      // ✅ Data/hora
}
```

**Tutors Escuta Como:** `child-game-completed`  
**Usado Em:**
- `DashboardScreen.tsx` - Mostra toast de notificação e recarrega dados
- `ProgressScreen.tsx` - Atualiza progresso em tempo real
- `ChildProfileScreen.tsx` - Atualiza perfil da criança e dispositivos

### ✅ Status: **FUNCIONANDO PERFEITAMENTE**

---

## 2. Tutors → Kids (Dados Enviados)

### ❌ Dados que DEVERIAM ser compartilhados mas NÃO ESTÃO:

#### 2.1. **Configurações de Privacidade**
**Exemplo de Uso:**
- Pais poderiam limitar tempo de jogo por dia
- Pais poderiam desabilitar certos jogos
- Pais poderiam definir horários permitidos

**Status:** ❌ NÃO IMPLEMENTADO

#### 2.2. **Mensagens de Incentivo**
**Exemplo de Uso:**
- Pais poderiam enviar mensagens que aparecem no Kids
- "Parabéns filho! Continue assim!" antes de jogar

**Status:** ❌ NÃO IMPLEMENTADO

#### 2.3. **Metas/Objetivos**
**Exemplo de Uso:**
- Pais definem meta: "Completar 5 jogos esta semana"
- Kids mostra progresso da meta

**Status:** ❌ NÃO IMPLEMENTADO

### 📊 Status Atual:
**Tutors → Kids:** Fluxo unidirecional (Kids envia, Tutors apenas consome)

---

## 3. Kids → Pro (Dados Enviados)

### ✅ Dados que ESTÃO sendo compartilhados:

#### 3.1. **Progresso de Jogos** (API)
**Rota:** `GET /api/pro/patients` (lê `shared/progress.json`)

```javascript
// Pro consome os mesmos dados que Tutors
progressFile.progress.filter(p => p.userId === pacienteId)
```

**Pro Usa Em:**
- `GET /api/pro/patient/:patientId` - Detalhes do paciente
- `GET /api/pro/reports/:patientId` - Relatórios do paciente

#### 3.2. **Eventos em Tempo Real** (Socket.IO)

**Pro Escuta:**
- `progress-updated` ✅
- `patient-game-started` ✅ (relabeled de `game-started`)
- `patient-game-completed` ✅ (relabeled de `game-completed`)

**Status:** ✅ INFRAESTRUTURA PRONTA, mas...

### ⚠️ Problema Identificado:
**O Kids emite eventos, mas a API NÃO reemite para o Pro!**

**Código Atual (api/routes/kids.js):**
```javascript
// Emite apenas para tutores!
io.emit('progress-updated', { ... });
```

**Deveria emitir também:**
```javascript
io.emit('patient-game-started', { ... });
io.emit('patient-game-completed', { ... });
```

---

## 4. Pro → Kids (Dados Enviados)

### ✅ Dados que ESTÃO sendo compartilhados:

#### 4.1. **Atualização de Dados do Paciente**
**Rota:** `PUT /api/pro/patient/:patientId`

```javascript
// Pro pode atualizar dados da criança
{
  nome: "João Silva",
  idade: 8,
  diagnostico: "...",
  // etc
}
```

**Kids NÃO consome ativamente,** mas os dados ficam em `KIDS/usuarios.json`

#### 4.2. **Criação de Sessões**
**Rota:** `POST /api/pro/session`

```json
{
  "id": "session_xxx",
  "patientId": "1",         // ✅ ID da criança
  "profissionalId": "prof_001",
  "tipo": "Terapia",
  "observacoes": "...",
  "atividades": [],
  "timestamp": "..."
}
```

**Salvo em:** `shared/sessions.json`

**Socket.IO Emite:** `session-created` para o tutor (não para a criança)

### ❌ Dados que DEVERIAM ser compartilhados mas NÃO ESTÃO:

#### 4.3. **Exercícios Personalizados**
**Exemplo:**
- Profissional cria exercícios customizados para criança
- Kids mostra esses exercícios como mini-jogos

**Status:** ❌ NÃO IMPLEMENTADO

#### 4.4. **Plano de Tratamento**
**Exemplo:**
- Profissional define: "Jogar 'Palavras' 3x por semana"
- Kids mostra lembretes e acompanha meta

**Status:** ❌ NÃO IMPLEMENTADO

---

## 5. Tutors → Pro (Dados Enviados)

### ⚠️ Status: **FLUXO QUASE INEXISTENTE**

#### Dados que DEVERIAM ser compartilhados mas NÃO ESTÃO:

##### 5.1. **Observações dos Pais**
**Exemplo:**
- Pais notam que criança teve dificuldade em casa
- Enviam observação que profissional vê no Pro

**Status:** ❌ NÃO IMPLEMENTADO

##### 5.2. **Confirmação de Consultas**
**Exemplo:**
- Tutors confirma/cancela consulta agendada
- Pro recebe notificação em tempo real

**Status:** ❌ PARCIALMENTE - Agendas existem, mas sem interação

##### 5.3. **Solicitação de Relatórios**
**Exemplo:**
- Tutor solicita relatório mensal pelo app
- Pro recebe notificação de solicitação

**Status:** ❌ NÃO IMPLEMENTADO

##### 5.4. **Feedback sobre Sessões**
**Exemplo:**
- Após consulta, tutor avalia a sessão (1-5 estrelas)
- Pro vê feedback no dashboard

**Status:** ❌ NÃO IMPLEMENTADO

---

## 6. Pro → Tutors (Dados Enviados)

### ✅ Dados que ESTÃO sendo compartilhados:

#### 6.1. **Agendas**
**Arquivo:** `Mockup/PRO/agendas.json` e `Mockup/TUTORS/agendas.json`

```json
{
  "id": "agenda_001",
  "criancaId": "1",         // ✅ Compartilhado
  "tutorId": "tutor_001",   // ✅ Compartilhado
  "profissionalId": "prof_001",  // ✅ Compartilhado
  "data": "2025-10-18",     // ✅ Compartilhado
  "horario": "14:00",       // ✅ Compartilhado
  "status": "confirmada",   // ✅ Compartilhado
  "observacoes": "..."      // ✅ Compartilhado
}
```

**Tutors Consome Em:**
- `GET /api/tutors/agendas/:tutorId`
- `AgendaScreen.tsx`

**Status:** ✅ FUNCIONANDO

#### 6.2. **Sessões Criadas** (Socket.IO)
**Evento:** `session-created`

```javascript
{
  sessionId: "session_xxx",
  patientName: "João Silva",
  tipo: "Terapia",
  timestamp: "..."
}
```

**Tutors PODE escutar,** mas atualmente não está configurado.

**Status:** ⚠️ EVENTO EXISTE, mas Tutors não escuta

### ❌ Dados que DEVERIAM ser compartilhados mas NÃO ESTÃO:

#### 6.3. **Relatórios de Progresso**
**Exemplo:**
- Profissional gera relatório mensal
- Tutor recebe notificação e pode visualizar no app

**Status:** ❌ NÃO IMPLEMENTADO (relatórios existem, mas sem visualização)

#### 6.4. **Recomendações**
**Exemplo:**
- Profissional adiciona: "Praticar exercício X em casa"
- Tutors mostra na tela de Dicas

**Status:** ❌ NÃO IMPLEMENTADO

#### 6.5. **Alertas Importantes**
**Exemplo:**
- Profissional marca paciente como "necessita atenção urgente"
- Tutor recebe alerta no app

**Status:** ❌ NÃO IMPLEMENTADO

---

## 7. Arquivos Compartilhados

### 7.1. **Mockup/shared/progress.json**
**Compartilhado entre:** Kids, Tutors, Pro  
**Escrita:** Kids (via API)  
**Leitura:** Tutors (via API), Pro (via API)  
**Status:** ✅ FUNCIONANDO

### 7.2. **Mockup/shared/sessions.json**
**Compartilhado entre:** Pro, Tutors  
**Escrita:** Pro (via API)  
**Leitura:** Pro (via API), Tutors (via API - AINDA NÃO IMPLEMENTADO)  
**Status:** ⚠️ PARCIALMENTE IMPLEMENTADO

### 7.3. **Mockup/KIDS/usuarios.json**
**Acessado por:** Kids, Tutors, Pro  
**Escrita:** Kids (registro), Pro (atualização)  
**Leitura:** Todos  
**Status:** ✅ FUNCIONANDO

### 7.4. **Mockup/TUTORS/agendas.json** e **Mockup/PRO/agendas.json**
**Problema:** DUPLICAÇÃO DE DADOS!  
**Status:** ⚠️ DOIS ARQUIVOS COM MESMOS DADOS

**Recomendação:** Mover para `Mockup/shared/agendas.json`

---

## 8. Gaps Identificados

### 🔴 **Críticos (Afetam funcionalidade esperada)**

1. **Pro NÃO recebe eventos de jogos em tempo real**
   - Socket.IO emite apenas `progress-updated`, mas Pro escuta `patient-game-started/completed`
   - **Fix:** API deve reemitir eventos com nome correto

2. **Agendas duplicadas**
   - `TUTORS/agendas.json` e `PRO/agendas.json` têm dados idênticos
   - **Fix:** Mover para `shared/agendas.json`

3. **Tutors não escuta `session-created`**
   - Pro cria sessão, mas Tutors não é notificado
   - **Fix:** Adicionar listener em `DashboardScreen.tsx`

### 🟡 **Importantes (Melhorariam UX)**

4. **Sem fluxo Tutors → Kids para configurações**
   - Pais não podem limitar tempo, jogos, horários
   - **Fix:** Criar rota `POST /api/tutors/child-settings/:childId`

5. **Sem fluxo Tutors → Pro para observações**
   - Pais não podem enviar feedback para profissional
   - **Fix:** Criar rota `POST /api/tutors/observation`

6. **Pro não pode enviar exercícios customizados**
   - Profissional não pode criar atividades personalizadas
   - **Fix:** Criar sistema de exercícios customizados

### 🟢 **Nice-to-Have (Funcionalidades futuras)**

7. **Mensagens entre Tutor e Profissional**
8. **Sistema de notificações push**
9. **Relatórios automatizados mensais**
10. **Dashboard de comparação (criança vs média)**

---

## 9. Recomendações

### 🔧 **Correções Imediatas**

#### 9.1. Corrigir Eventos Socket.IO para Pro

**Arquivo:** `api/routes/kids.js` (linha 90-110)

```javascript
// ANTES (atual)
io.emit('progress-updated', {
  userId,
  childName: child.nome,
  gameId,
  gameName: getGameName(gameId),
  score,
  category,
  timestamp: progressData.timestamp
});

// DEPOIS (corrigido)
// Emitir para Tutors
io.emit('progress-updated', { /* dados */ });
io.emit('child-game-completed', { /* dados */ });

// Emitir para Pro (com prefixo 'patient')
io.emit('patient-game-started', {
  patientId: userId,
  patientName: child.nome,
  gameId,
  gameName: getGameName(gameId),
  timestamp: progressData.timestamp
});

io.emit('patient-game-completed', {
  patientId: userId,
  patientName: child.nome,
  gameId,
  gameName: getGameName(gameId),
  score,
  timestamp: progressData.timestamp
});
```

#### 9.2. Unificar Agendas

**Mover:**
- `Mockup/TUTORS/agendas.json` → `Mockup/shared/agendas.json`
- `Mockup/PRO/agendas.json` → DELETAR

**Atualizar APIs:**
- `api/routes/tutors.js` - Linha 355: `jsonService.readJSON('shared/agendas.json')`
- `api/routes/pro.js` - Adicionar rota `GET /api/pro/agendas/:professionalId`

#### 9.3. Adicionar Listener de Sessões no Tutors

**Arquivo:** `Tutors/src/screens/DashboardScreen.tsx`

```typescript
useEffect(() => {
  // ... existing listeners ...
  
  socketService.on('session-created', (data: any) => {
    if (currentUser && currentUser.criancasIds?.includes(data.patientId)) {
      success(`📅 Nova sessão agendada para ${data.patientName}`);
      loadAgendas(); // Recarrega agendas
    }
  });
  
  return () => {
    socketService.off('session-created');
  };
}, []);
```

### 📈 **Melhorias Futuras (Próxima Sprint)**

1. **Criar sistema de configurações para pais (Tutors → Kids)**
2. **Implementar observações dos pais (Tutors → Pro)**
3. **Adicionar relatórios compartilhados (Pro → Tutors)**
4. **Criar sistema de exercícios customizados (Pro → Kids)**

---

## 📊 Resumo Executivo

| Fluxo | Status Atual | Dados Enviados | Completude |
|-------|--------------|----------------|------------|
| **Kids → Tutors** | ✅ FUNCIONANDO | Progresso, Eventos RT | 100% |
| **Tutors → Kids** | ❌ INEXISTENTE | Nenhum | 0% |
| **Kids → Pro** | ⚠️ PARCIAL | Progresso (API), Eventos (falha) | 50% |
| **Pro → Kids** | ⚠️ PARCIAL | Atualização cadastro, Sessões | 40% |
| **Tutors → Pro** | ❌ QUASE INEXISTENTE | Agendas (read-only) | 10% |
| **Pro → Tutors** | ⚠️ PARCIAL | Agendas, Eventos (não escutados) | 60% |

### 🎯 Prioridades:

1. **Alta:** Corrigir eventos Socket.IO para Pro
2. **Alta:** Unificar arquivo de agendas
3. **Alta:** Adicionar listener `session-created` no Tutors
4. **Média:** Implementar fluxo Tutors → Pro (observações)
5. **Média:** Implementar fluxo Tutors → Kids (configurações)
6. **Baixa:** Sistema de exercícios customizados

---

**Documento gerado em:** 16/10/2025  
**Próxima revisão:** Após implementação das correções críticas

