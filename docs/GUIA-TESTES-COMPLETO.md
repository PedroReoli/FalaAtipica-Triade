# 🧪 Guia Completo de Testes - FalaAtípica Triade

**Versão:** 1.2.0  
**Última Atualização:** 17 de Outubro de 2025

---

## 🎯 **Objetivo**

Validar TODAS as funcionalidades implementadas para garantir que o sistema está 100% funcional antes da apresentação.

---

## 🚀 **Setup Inicial**

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

# Terminal 4 - Pro
cd Pro
npm run dev
# Aguardar: App abrir em http://localhost:5173
```

### **2. Credenciais de Teste**

| App | Email | Senha |
|-----|-------|-------|
| Kids | `joao@kids.com` | `123456` |
| Tutors | `carlos@tutors.com` | `123456` |
| Pro | `carlos@pro.com` | `123456` |

---

## ✅ **TESTES OBRIGATÓRIOS**

### **TESTE 1: Sistema de Lembretes (Kids)** 🔴 CRÍTICO

**Objetivo:** Verificar se lembretes aparecem e funcionam corretamente

**Passos:**
1. Kids: Login com `joao@kids.com` / `123456`
2. Kids: Verificar sino (🔔) no canto superior direito
3. Kids: Badge vermelho deve mostrar número "3"
4. Kids: Clicar no sino
5. Kids: Deve abrir tela "Meus Lembretes"
6. Kids: Ver 3 lembretes na aba "Novos":
   - 1 com barra VERMELHA (urgente)
   - 1 com barra AMARELA (normal)
   - 1 com barra AZUL (baixa)
7. Kids: Clicar "Marcar como lido" no primeiro lembrete
8. Kids: Lembrete desaparece da lista "Novos"
9. Kids: Badge atualiza de "3" para "2"
10. Kids: Clicar em "Lidos (2)"
11. Kids: Ver 2 lembretes na aba "Lidos"

**✅ Resultado Esperado:**
- Badge funciona corretamente
- Lembretes aparecem com cores corretas
- Marcar como lido funciona
- Tabs (Novos/Lidos) funcionam

**❌ Se Falhar:**
- Verificar arquivo: `Kids/mockup-data/reminders.json` existe
- Ver console do Kids para erros
- Ver console da API para logs

---

### **TESTE 2: Notificações em Tempo Real (Kids → Tutors)** 🔴 CRÍTICO

**Objetivo:** Verificar se toast aparece instantaneamente no Tutors quando criança joga

**Passos:**
1. Tutors: Login com `carlos@tutors.com` / `123456`
2. Tutors: Dashboard mostra "Olá, Carlos Silva"
3. Tutors: Ver 2 cards de crianças (João e Lucas)
4. Tutors: **Deixar na Dashboard** (NÃO trocar de tela)
5. Kids: Voltar para Dashboard (Home)
6. Kids: Escolher "JOGO DAS PALAVRAS"
7. Kids: Completar o jogo (qualquer pontuação)
8. Kids: Clicar em "Voltar para Home"
9. **Tutors: Toast verde deve aparecer:**
   - "🎉 João Silva completou Jogo das Palavras com X% de acertos!"
10. API Console: Ver log:
   ```
   🎮 Progresso salvo: João Silva - palavras - X%
   📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
   ```

**✅ Resultado Esperado:**
- Toast aparece INSTANTANEAMENTE no Tutors
- Sem necessidade de recarregar
- Badge atualiza automaticamente

**❌ Se Falhar:**
- Verificar se Socket.IO conectou (console: "✅ WebSocket conectado")
- Reiniciar Kids e Tutors
- Ver console da API para erros

---

### **TESTE 3: Progresso por Jogo em Tempo Real (Tutors)** 🔴 CRÍTICO

**Objetivo:** Verificar se cards de jogos atualizam automaticamente (SEM Pull to Refresh)

**Passos:**
1. Tutors: Ir para "Progresso"
2. Tutors: Ver 4 cards de jogos:
   - Igual-Diferente
   - Cena Certa
   - Adivinha
   - Jogo das Palavras
3. Tutors: Anotar estatísticas atuais do "Jogo das Palavras"
4. **Tutors: DEIXAR na tela de Progresso**
5. Kids: Escolher "JOGO DAS PALAVRAS"
6. Kids: Completar o jogo com 100%
7. Kids: Voltar para Home
8. **Tutors: Card "Jogo das Palavras" deve ATUALIZAR AUTOMATICAMENTE**
   - Novas estatísticas (média, melhor, sessões)
   - **SEM arrastar para baixo**
   - **SEM recarregar página**

**✅ Resultado Esperado:**
- Card do jogo atualiza sozinho
- Estatísticas gerais também atualizam
- Sem necessidade de Pull to Refresh

**❌ Se Falhar:**
- Ver console do Tutors (deve mostrar: "🎮 Card do jogo 'Jogo das Palavras' será atualizado automaticamente")
- Ver console da API
- Reiniciar Tutors

---

### **TESTE 4: Sistema de Parcerias (Pro)** 🔴 CRÍTICO

**Objetivo:** Verificar se sistema de token funciona corretamente

#### **Parte A: Gerar Token**

**Passos:**
1. Pro: Ir para "Configurações"
2. Pro: Clicar em "Gerar Token de Parceria"
3. Pro: Modal abre com token gerado (formato: `PARCERIA_xxxxxxxxx`)
4. Pro: Clicar em "Copiar Token"
5. Pro: Botão muda para "Copiado!" (verde)
6. Pro: Token está na área de transferência
7. API Console: Ver log: `🔗 Token de parceria gerado: PARCERIA_xxx por Carlos Silva`

**✅ Resultado Esperado:**
- Token gerado corretamente
- Modal bonito e funcional
- Botão de copiar funciona
- Token tem formato correto

#### **Parte B: Reivindicar Token (Simular)**

**Nota:** Como só temos 1 usuário Pro mockado, vamos testar a validação

**Passos:**
1. Pro: Clicar em "Reivindicar Parceria"
2. Pro: Colar o token gerado
3. Pro: Clicar em "Reivindicar"
4. Pro: Deve aparecer erro: "Você não pode fazer parceria consigo mesmo"

**✅ Resultado Esperado:**
- Validação funciona
- Mensagem de erro aparece
- Não cria parceria inválida

#### **Parte C: Token Inválido**

**Passos:**
1. Pro: Clicar em "Reivindicar Parceria"
2. Pro: Digitar: `PARCERIA_invalido123`
3. Pro: Clicar em "Reivindicar"
4. Pro: Deve aparecer erro: "Token inválido ou não encontrado"

**✅ Resultado Esperado:**
- Validação funciona
- Token inválido não cria parceria

---

### **TESTE 5: Agendas Unificadas (Tutors)** 🟡 IMPORTANTE

**Objetivo:** Verificar se agendas aparecem e filtros funcionam

**Passos:**
1. Tutors: Clicar em "Agenda"
2. Tutors: Ver selector de criança no topo (← João Silva →)
3. Tutors: Ver botões: Todas / Agendadas / Confirmadas / Concluídas
4. Tutors: Ver lista de consultas
5. Tutors: Cada consulta mostra:
   - Data e horário
   - Profissional
   - Status (badge colorido)
6. Tutors: Clicar em uma consulta
7. Tutors: Card expande mostrando detalhes completos
8. Tutors: Clicar em "Agendadas"
9. Tutors: Lista filtra mostrando apenas agendadas
10. Tutors: Trocar de criança (clicar →)
11. Tutors: Agendas atualizam para a nova criança

**✅ Resultado Esperado:**
- Agendas aparecem corretamente
- Filtros funcionam
- Cards expandem/fecham
- Selector de criança funciona

---

### **TESTE 6: Contexto de Paciente (Pro)** 🔴 CRÍTICO

**Objetivo:** Verificar se campo de paciente vem preenchido ao criar sessão de um paciente específico

**Passos:**
1. Pro: Ir para "Pacientes"
2. Pro: Clicar em qualquer paciente (ex: João Silva)
3. Pro: Clicar na aba "Sessões"
4. Pro: Clicar em "Nova Sessão"
5. Pro: Verificar campo "Paciente":
   - ✅ Deve estar PREENCHIDO com "João Silva"
   - ✅ Deve mostrar avatar circular com iniciais "JS"
   - ✅ Deve ter badge "Selecionado automaticamente"
   - ✅ Deve estar BLOQUEADO (fundo cinza, não editável)
6. Pro: Preencher data, hora, observações
7. Pro: Salvar sessão

**✅ Resultado Esperado:**
- Campo vem preenchido e bloqueado
- Avatar e badge aparecem
- Não permite selecionar outro paciente

**❌ Se Falhar:**
- Ver console do Pro para erros
- Verificar se `navigate` está passando `state`
- Ver imports do `useLocation`

---

### **TESTE 7: Fallback Offline** 🟢 SECUNDÁRIO

**Objetivo:** Verificar se apps funcionam offline

**Passos:**
1. Terminal 1 (API): Pressionar Ctrl+C (parar API)
2. Kids: Clicar no sino de notificações
3. Kids: Lembretes AINDA aparecem (dados mockados)
4. Kids Console: Ver log:
   ```
   ⚠️ API erro - usando dados mockados locais
   ✅ Lembretes carregados do mockup: 3 não lidos
   ```
5. Tutors: Ir para "Agenda"
6. Tutors: Agendas AINDA aparecem (dados mockados)
7. Tutors Console: Ver log:
   ```
   ⚠️ API erro - usando dados mockados do perfil
   ✅ Agendas mockadas carregadas: 2
   ```

**✅ Resultado Esperado:**
- Apps funcionam 100% offline
- Dados mockados são carregados
- Logs informativos aparecem

---

## 📊 **Resumo de Resultados**

Preencha após os testes:

| # | Teste | Status | Observações |
|---|-------|--------|-------------|
| 1 | Lembretes (Kids) | ⬜ OK / ⬜ FALHOU | |
| 2 | Notificações Tempo Real | ⬜ OK / ⬜ FALHOU | |
| 3 | Progresso por Jogo | ⬜ OK / ⬜ FALHOU | |
| 4 | Sistema de Parcerias | ⬜ OK / ⬜ FALHOU | |
| 5 | Agendas Unificadas | ⬜ OK / ⬜ FALHOU | |
| 6 | Contexto de Paciente | ⬜ OK / ⬜ FALHOU | |
| 7 | Fallback Offline | ⬜ OK / ⬜ FALHOU | |

**Total Aprovado:** ___/7

---

## 🐛 **Troubleshooting**

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

### **Progresso não atualiza automaticamente:**
- Ver console do Tutors (buscar por "📊 Progresso atualizado em tempo real")
- Ver console da API (buscar por "📡 Eventos emitidos")
- Reiniciar Tutors

### **Parcerias não funcionam:**
- Verificar se API está rodando
- Ver console da API (buscar por "🔗 Token de parceria gerado")
- Ver console do Pro para erros

---

## ✅ **Critério de Aprovação**

Para considerar o sistema APROVADO:

**OBRIGATÓRIO (não pode falhar):**
- ✅ Teste 1 (Lembretes)
- ✅ Teste 2 (Notificações Tempo Real)
- ✅ Teste 3 (Progresso por Jogo)
- ✅ Teste 4 (Sistema de Parcerias)
- ✅ Teste 6 (Contexto de Paciente)

**IMPORTANTE (deve funcionar):**
- ✅ Teste 5 (Agendas)

**DESEJÁVEL (bom ter):**
- ✅ Teste 7 (Fallback)

---

## 🎯 **Próximos Passos**

### **Se TUDO PASSOU (✅):**
1. ✅ Fazer commit final
2. ✅ Documentar no README
3. ✅ Preparar apresentação

### **Se ALGO FALHOU (❌):**
1. ❌ Anotar qual teste falhou
2. ❌ Ver troubleshooting acima
3. ❌ Verificar logs (API, Kids, Tutors, Pro)
4. ❌ Corrigir e testar novamente
5. ❌ Não seguir adiante até corrigir

---

**🎉 BOA SORTE NOS TESTES! 🎉**

