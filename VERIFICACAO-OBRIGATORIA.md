# ⚠️ VERIFICAÇÃO OBRIGATÓRIA - TESTES DO SISTEMA

**Data de Criação:** 16/10/2025  
**Prioridade:** 🔴 MÁXIMA  
**Status:** ⏳ PENDENTE

---

## 🎯 **OBJETIVO**

Verificar se TODAS as funcionalidades implementadas estão funcionando:
- Sistema de Lembretes (Pro → Kids)
- Notificações em Tempo Real (Kids → Tutors)
- Agendas Unificadas (Tutors)
- Progresso em Tempo Real (Tutors)
- Fallbacks Offline

---

## 🚀 **SETUP INICIAL**

### **1. Iniciar Aplicações**

```bash
# Terminal 1 - API
cd api
npm start
# Aguardar: ✅ Servidor rodando em http://localhost:3001

# Terminal 2 - Kids
cd Kids
npm start
# Aguardar: App compilar e abrir

# Terminal 3 - Tutors
cd Tutors
npm start
# Aguardar: App compilar e abrir
```

### **2. Credenciais**

| App | Email | Senha |
|-----|-------|-------|
| Kids | `joao@kids.com` | `123456` |
| Tutors | `carlos@tutors.com` | `123456` |

---

## 📋 **CHECKLIST DE TESTES**

### **TESTE 1: Sistema de Lembretes** 🔴 CRÍTICO

- [ ] **1.1** Kids: Login com `joao@kids.com` / `123456`
- [ ] **1.2** Kids: Sino (🔔) aparece no canto superior direito
- [ ] **1.3** Kids: Badge vermelho mostra número **"3"**
- [ ] **1.4** Kids: Clicar no sino abre tela "Meus Lembretes"
- [ ] **1.5** Kids: Ver 3 lembretes na aba "Novos":
  - [ ] Lembrete com barra VERMELHA (urgente)
  - [ ] Lembrete com barra AMARELA (normal)
  - [ ] Lembrete com barra AZUL (baixa)
- [ ] **1.6** Kids: Clicar "Marcar como lido" no primeiro lembrete
- [ ] **1.7** Kids: Lembrete desaparece da lista "Novos"
- [ ] **1.8** Kids: Badge atualiza de "3" para "2"
- [ ] **1.9** Kids: Clicar em "Lidos (2)"
- [ ] **1.10** Kids: Ver 2 lembretes na aba "Lidos"

**✅ Resultado Esperado:** Badge funciona, lembretes aparecem corretamente, marcar como lido funciona.

**❌ Se Falhar:**
- Verificar arquivo: `Kids/mockup-data/reminders.json` existe
- Ver console do Kids para erros
- Ver console da API para logs

---

### **TESTE 2: Notificação em Tempo Real** 🔴 CRÍTICO

- [ ] **2.1** Tutors: Login com `carlos@tutors.com` / `123456`
- [ ] **2.2** Tutors: Dashboard mostra "Olá, Carlos Silva"
- [ ] **2.3** Tutors: Ver 2 cards de crianças (João e Lucas)
- [ ] **2.4** Tutors: Deixar na Dashboard
- [ ] **2.5** Kids: Voltar para Dashboard (Home)
- [ ] **2.6** Kids: Escolher "JOGO DAS PALAVRAS"
- [ ] **2.7** Kids: Completar o jogo (qualquer pontuação)
- [ ] **2.8** Kids: Voltar para Home
- [ ] **2.9** Tutors: Toast verde aparece: "🎉 João Silva completou Jogo das Palavras!"
- [ ] **2.10** API Console: Ver log:
  ```
  🎮 Progresso salvo: João Silva - palavras - X%
  📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
  ```

**✅ Resultado Esperado:** Toast aparece INSTANTANEAMENTE no Tutors quando criança completa jogo.

**❌ Se Falhar:**
- Verificar se Socket.IO conectou (console deve mostrar "✅ WebSocket conectado")
- Reiniciar Kids e Tutors
- Ver console da API para erros

---

### **TESTE 3: Agendas Unificadas** 🟡 IMPORTANTE

- [ ] **3.1** Tutors: Clicar em "Agenda"
- [ ] **3.2** Tutors: Ver selector de criança no topo (← João Silva →)
- [ ] **3.3** Tutors: Ver botões: Todas / Agendadas / Confirmadas / Concluídas
- [ ] **3.4** Tutors: Ver lista de consultas
- [ ] **3.5** Tutors: Cada consulta mostra data, horário, profissional, status
- [ ] **3.6** Tutors: Clicar em uma consulta
- [ ] **3.7** Tutors: Card expande mostrando detalhes completos
- [ ] **3.8** Tutors: Clicar em "Agendadas"
- [ ] **3.9** Tutors: Lista filtra mostrando apenas agendadas
- [ ] **3.10** Tutors: Trocar de criança (clicar →)
- [ ] **3.11** Tutors: Agendas atualizam para a nova criança

**✅ Resultado Esperado:** Agendas aparecem, filtros funcionam, cards expandem, selector funciona.

**❌ Se Falhar:**
- Ver console do Tutors para mensagens
- Verificar se arquivo `Mockup/shared/agendas.json` existe
- Verificar se API está rodando

---

### **TESTE 4: Progresso Detalhado** 🟡 IMPORTANTE

- [ ] **4.1** Tutors: Clicar em "Progresso"
- [ ] **4.2** Tutors: Ver 4 cards grandes de estatísticas (vertical):
  - [ ] Total de Sessões (borda azul)
  - [ ] Tempo Total (borda verde)
  - [ ] Média Geral (borda amarela)
  - [ ] Melhor Jogo (borda vermelha)
- [ ] **4.3** Tutors: Ver 4 cards de jogos (compactos):
  - [ ] Igual-Diferente
  - [ ] Cena Certa
  - [ ] Adivinha
  - [ ] Jogo das Palavras
- [ ] **4.4** Tutors: Clicar no card "Jogo das Palavras"
- [ ] **4.5** Tutors: Card expande mostrando detalhes
- [ ] **4.6** Tutors: Clicar novamente
- [ ] **4.7** Tutors: Card fecha (volta compacto)
- [ ] **4.8** Tutors: Trocar de criança (→)
- [ ] **4.9** Tutors: Progresso atualiza automaticamente

**✅ Resultado Esperado:** 4 estatísticas + 4 jogos aparecem, cards expandem/fecham, selector funciona.

**❌ Se Falhar:**
- Ver console do Tutors
- Verificar dados em `Mockup/shared/progress.json`

---

### **TESTE 5: Tempo Real Completo** 🔴 CRÍTICO

- [ ] **5.1** Posicionar Kids (esquerda) e Tutors (direita) lado a lado
- [ ] **5.2** Console da API visível
- [ ] **5.3** Kids: Escolher "ADIVINHA"
- [ ] **5.4** Kids: Completar o jogo
- [ ] **5.5** API Console: Ver log de progresso salvo
- [ ] **5.6** Tutors: Toast verde aparece (1 segundo depois)
- [ ] **5.7** Tutors: Ir para "Progresso"
- [ ] **5.8** Tutors: Jogo "Adivinha" mostra dados atualizados

**✅ Resultado Esperado:** Toda a cadeia funciona: Kids → API → Tutors (em tempo real).

**❌ Se Falhar:** Sistema de tempo real tem problema. Verificar Socket.IO.

---

### **TESTE 6: Fallback Offline** 🟢 SECUNDÁRIO

- [ ] **6.1** Terminal 1 (API): Pressionar Ctrl+C (parar API)
- [ ] **6.2** Kids: Clicar no sino de notificações
- [ ] **6.3** Kids: Lembretes AINDA aparecem (dados mockados)
- [ ] **6.4** Kids Console: Ver log:
  ```
  ⚠️ API erro - usando dados mockados locais
  ✅ Lembretes carregados do mockup: 3 não lidos
  ```
- [ ] **6.5** Tutors: Ir para "Agenda"
- [ ] **6.6** Tutors: Agendas AINDA aparecem (dados mockados)
- [ ] **6.7** Tutors Console: Ver log:
  ```
  ⚠️ API erro - usando dados mockados do perfil
  ✅ Agendas mockadas carregadas: 2
  ```

**✅ Resultado Esperado:** Apps funcionam 100% offline com dados mockados.

**❌ Se Falhar:** Fallback não está funcionando. Verificar arquivos mockados.

---

## 📊 **RESUMO DOS RESULTADOS**

Preencha após os testes:

| Teste | Status | Observações |
|-------|--------|-------------|
| 1. Lembretes | ⬜ OK / ⬜ FALHOU | |
| 2. Tempo Real | ⬜ OK / ⬜ FALHOU | |
| 3. Agendas | ⬜ OK / ⬜ FALHOU | |
| 4. Progresso | ⬜ OK / ⬜ FALHOU | |
| 5. Completo | ⬜ OK / ⬜ FALHOU | |
| 6. Fallback | ⬜ OK / ⬜ FALHOU | |

---

## 🐛 **TROUBLESHOOTING**

### **Badge não aparece no Kids:**
```bash
# Verificar arquivo
ls Kids/mockup-data/reminders.json

# Se não existir, copiar:
copy Mockup\shared\reminders.json Kids\mockup-data\reminders.json
```

### **Toast não aparece no Tutors:**
- Reiniciar Kids (Ctrl+C e `npm start`)
- Reiniciar Tutors (Ctrl+C e `npm start`)
- Verificar se API está rodando
- Ver console para erros de Socket.IO

### **Agendas não aparecem:**
```bash
# Verificar arquivo
ls Mockup\shared\agendas.json

# Se não existir, ver documentação
cat docs\api\VERIFICACAO-FALLBACK-LOGS.md
```

### **Erros Gerais:**
- Ver console de cada app (Kids, Tutors, API)
- Ver arquivo: `docs/api/VERIFICACAO-FALLBACK-LOGS.md`
- Ver arquivo: `docs/GUIA-DE-TESTES-MANUAL.md`

---

## 📚 **DOCUMENTAÇÃO RELACIONADA**

- `TESTE-RAPIDO.md` - Teste rápido (5 min)
- `docs/GUIA-DE-TESTES-MANUAL.md` - Guia completo (40 min)
- `docs/api/VERIFICACAO-FALLBACK-LOGS.md` - Debug de fallbacks
- `docs/api/ANALISE-COMPARTILHAMENTO-DADOS.md` - Análise técnica

---

## ✅ **CRITÉRIO DE APROVAÇÃO**

Para considerar o sistema APROVADO, deve passar em:

**OBRIGATÓRIO (não pode falhar):**
- ✅ Teste 1 (Lembretes)
- ✅ Teste 2 (Tempo Real)
- ✅ Teste 5 (Completo)

**IMPORTANTE (deve funcionar):**
- ✅ Teste 3 (Agendas)
- ✅ Teste 4 (Progresso)

**DESEJÁVEL (bom ter):**
- ✅ Teste 6 (Fallback)

---

## 📝 **ANOTAÇÕES**

Use este espaço para anotar observações durante os testes:

```
Data do Teste: ____/____/2025
Testado por: _________________

Observações:
- 
- 
- 

Bugs Encontrados:
- 
- 

Melhorias Sugeridas:
- 
- 
```

---

## 🎯 **PRÓXIMOS PASSOS APÓS VERIFICAÇÃO**

### **Se TUDO PASSOU (✅):**
1. ✅ Marcar TODO como completo
2. ✅ Fazer commit final
3. ✅ Documentar no README
4. ✅ Partir para próximas funcionalidades

### **Se ALGO FALHOU (❌):**
1. ❌ Anotar qual teste falhou
2. ❌ Ver troubleshooting acima
3. ❌ Verificar logs (API, Kids, Tutors)
4. ❌ Corrigir e testar novamente
5. ❌ Não seguir adiante até corrigir

---

### **TESTE 7: Contexto de Paciente (Pro)** 🔴 CRÍTICO

- [ ] **7.1** Pro: Ir para "Pacientes"
- [ ] **7.2** Pro: Clicar em qualquer paciente (ex: João Silva)
- [ ] **7.3** Pro: Clicar na aba "Sessões"
- [ ] **7.4** Pro: Clicar em "Nova Sessão"
- [ ] **7.5** Pro: Verificar campo "Paciente" está PREENCHIDO
- [ ] **7.6** Pro: Verificar campo mostra avatar circular com iniciais
- [ ] **7.7** Pro: Verificar campo mostra nome do paciente
- [ ] **7.8** Pro: Verificar campo tem badge "Selecionado automaticamente"
- [ ] **7.9** Pro: Verificar campo está BLOQUEADO (fundo cinza, não editável)
- [ ] **7.10** Pro: Preencher data/hora/observações e salvar

**✅ Resultado Esperado:** Campo de paciente vem preenchido e bloqueado quando vem de PatientDetails.

**❌ Se Falhar:**
- Verificar navegação está passando `state`
- Ver console para erros
- Verificar imports do `useLocation`

---

---

## 🚨 **PENDÊNCIAS IDENTIFICADAS NA CONVERSA**

### **PENDÊNCIA 1: Progresso por Jogo (Tutors) - Tempo Real** 🔴 CRÍTICO

**Problema:**
- Quando criança joga no Kids, o **progresso geral** atualiza em tempo real no Tutors
- MAS o **progresso por jogo** NÃO atualiza em tempo real
- Usuário tem que fazer "Pull to Refresh" para ver dados atualizados do jogo específico

**Exemplo:**
```
Kids: Joga "Palavras" e completa com 100%
Tutors: 
  - Dashboard: Badge geral atualiza ✅
  - Progresso: Estatísticas gerais atualizam ✅
  - Progresso: Card "Jogo das Palavras" NÃO atualiza ❌
  - Usuário: Tem que arrastar para baixo para atualizar ❌
```

**Solução Esperada:**
- Socket.IO emite evento quando criança completa jogo
- Tutors recebe evento
- Tutors atualiza AUTOMATICAMENTE o card do jogo específico
- **SEM necessidade de Pull to Refresh**

**Onde Implementar:**
- `Tutors/src/screens/ProgressScreen.tsx`
- Listener: `child-game-completed`
- Ação: Recarregar `loadProgressData()` automaticamente

---

### **PENDÊNCIA 2: Sistema de Parcerias (Pro) - Simplificado** 🔴 CRÍTICO

**Problema Atual:**
- Página de Configurações do Pro tem "Convites" e "Parcerias"
- Sistema complexo e confuso
- Não está implementado

**Solução Esperada:**
- **Sistema SIMPLES baseado em TOKEN**

**Fluxo Proposto:**
```
1. Pro A: Gera token de parceria (botão "Gerar Token de Parceria")
   ↓ (API)
2. API: Cria token único (ex: "PARCERIA_abc123xyz")
   ↓
3. Pro A: Copia token e envia para Pro B (WhatsApp, email, etc)
   ↓
4. Pro B: Na página de Configurações, cola token em campo "Reivindicar Parceria"
   ↓
5. Pro B: Clica em "Reivindicar" (claim)
   ↓ (API)
6. API: Valida token e cria parceria entre Pro A ↔ Pro B
   ↓
7. Ambos: Recebem notificação via Socket.IO
   ↓
8. Resultado: Parceria estabelecida! ✅
```

**Benefícios:**
- ✅ Simples (apenas gerar e colar token)
- ✅ Seguro (token único, expirável)
- ✅ Sem necessidade de emails automáticos
- ✅ Funciona offline (gera token localmente)

**Rotas Necessárias:**
- `POST /api/pro/partnership-token` - Gera token
- `POST /api/pro/claim-partnership` - Reivindica token
- `GET /api/pro/partnerships/:professionalId` - Lista parcerias

**Socket.IO:**
- Emitir `partnership-established` quando parceria for criada
- Ambos profissionais recebem notificação

**Mockup:**
- Criar `Mockup/shared/partnerships.json`
- Criar `Mockup/shared/partnership-tokens.json`

---

### **PENDÊNCIA 3: Contexto de Paciente em Formulários** ✅ CORRIGIDO

**Problema:**
- Ao clicar em paciente → "Nova Sessão", campo de paciente não vinha preenchido

**Solução Implementada:**
- `PatientDetailsPage.tsx` passa `patientId` e `patientName` via `state`
- `NewSessionPage.tsx` recebe dados e bloqueia campo
- Campo mostra avatar + nome + badge "Selecionado automaticamente"

**Status:** ✅ CORRIGIDO (ver `docs/pro/CORRECAO-CONTEXTO-PACIENTE.md`)

---

### **PENDÊNCIA 4: Último Acesso (Tutors)** ✅ VERIFICADO

**Status:**
- API calcula último acesso corretamente ✅
- Frontend busca e formata dados ✅
- Atualiza em tempo real via Socket.IO ✅

**Documentação:** `docs/api/VERIFICACAO-FALLBACK-LOGS.md`

---

### **PENDÊNCIA 5: Compartilhamento de Dados** ✅ IMPLEMENTADO

**Status:**
- Kids → Tutors: 100% ✅
- Kids → Pro: 100% ✅ (corrigido Socket.IO)
- Pro → Kids: 90% ✅ (lembretes implementados)
- Pro → Tutors: 80% ✅ (agendas unificadas)
- Tutors → Pro: 30% ⏳ (infraestrutura preparada)
- Tutors → Kids: 20% ⏳ (kids recebe lembretes)

**Documentação:** `docs/api/ANALISE-COMPARTILHAMENTO-DADOS.md`

---

## 📋 **TODO ATUALIZADO**

### 🔴 **URGENTE - Implementar ANTES de Apresentação**

- [ ] **Corrigir progresso por jogo em tempo real (Tutors)**
  - Arquivo: `Tutors/src/screens/ProgressScreen.tsx`
  - Ação: Adicionar auto-reload no listener `child-game-completed`
  - Teste: Jogar no Kids → Card do jogo atualiza sozinho no Tutors

- [ ] **Simplificar sistema de parcerias (Pro)**
  - Remover: Sistema de convites complexo
  - Implementar: Sistema de token (gerar + claim)
  - Criar: Rotas de API (`POST /partnership-token`, `POST /claim-partnership`)
  - UI: Botão "Gerar Token" + Campo "Reivindicar Parceria"
  - Mockup: `shared/partnerships.json` e `shared/partnership-tokens.json`

### 🟡 **IMPORTANTE - Validar Antes de Apresentação**

- [ ] Testar todos os 7 testes da verificação obrigatória
- [ ] Preencher checklist completo
- [ ] Verificar logs da API

### 🟢 **DESEJÁVEL - Se Houver Tempo**

- [ ] Implementar Tutors → Pro (observações dos pais)
- [ ] Implementar Pro → Tutors (recomendações e alertas)
- [ ] Implementar Tutors → Kids (configurações de uso)

---

**⚠️ IMPORTANTE:** Este documento é CRÍTICO para validar a implementação. NÃO pule os testes!

**Última Atualização:** 16/10/2025 - 23:59  
**Próxima Verificação:** Após implementar pendências críticas

