# 🧪 GUIA COMPLETO DE TESTES MANUAIS

**Última Atualização:** 16/10/2025  
**Tempo Estimado:** 30 minutos

---

## 📋 **PRÉ-REQUISITOS**

### **1. Iniciar a API**
```bash
# Terminal 1
cd api
npm start

# Deve aparecer:
# ✅ Servidor rodando em http://localhost:3001
# 🔌 WebSocket configurado
```

### **2. Credenciais de Teste**

| App | Email | Senha | Observação |
|-----|-------|-------|------------|
| **Kids** | `joao@kids.com` | `123456` | João Silva (8 anos) |
| **Tutors** | `carlos@tutors.com` | `123456` | Carlos Silva (pai do João) |
| **Pro** | `fono@teste.com` | `123456` | Dra. Ana Paula Santos |

---

## 🎮 **TESTE 1: Sistema de Lembretes (Pro → Kids)**

### **Objetivo:** Testar se lembretes aparecem no Kids

### **📱 PASSO A PASSO:**

#### **1. Abrir Kids App**
```bash
# Terminal 2
cd Kids
npm start
```

#### **2. Fazer Login no Kids**
- Email: `joao@kids.com`
- Senha: `123456`
- Clicar em **"Entrar"**

#### **3. Ver Lembretes na Dashboard**
✅ **O QUE VOCÊ DEVE VER:**
- No canto superior direito, **ícone de sino (🔔)**
- Badge vermelho com número **"3"** (3 lembretes não lidos)

![Badge de notificação deve estar visível]

#### **4. Clicar no Sino**
✅ **O QUE VOCÊ DEVE VER:**
- Tela de "Meus Lembretes"
- Toggle "Novos (3)" e "Lidos (1)"
- 3 cards de lembretes:
  1. 🎯 **Praticar sons da letra R** (barra vermelha - URGENTE)
  2. 📅 **Consulta amanhã!** (barra amarela - NORMAL)
  3. 🎮 **Jogue Igual-Diferente** (barra azul - BAIXA)

#### **5. Marcar como Lido**
- Clicar em **"Marcar como lido"** no primeiro lembrete
- ✅ Badge deve mudar de **3 → 2**
- ✅ Lembrete some da aba "Novos"

#### **6. Ver Lidos**
- Clicar em **"Lidos (2)"**
- ✅ Deve mostrar 2 lembretes lidos:
  - ✅ Parabéns pelo progresso!
  - O que você acabou de marcar

---

## 📊 **TESTE 2: Progresso em Tempo Real (Kids → Tutors)**

### **Objetivo:** Ver se tutor recebe notificação quando criança joga

### **📱 PASSO A PASSO:**

#### **1. Abrir Tutors App** (novo terminal)
```bash
# Terminal 3
cd Tutors
npm start
```

#### **2. Fazer Login no Tutors**
- Email: `carlos@tutors.com`
- Senha: `123456`
- Clicar em **"Entrar"**

✅ **O QUE VOCÊ DEVE VER:**
- Dashboard com nome: **"Olá, Carlos Silva"**
- 2 cards de crianças:
  - João Silva, 8 anos
  - Lucas Silva, 5 anos

#### **3. Voltar para Kids e Jogar**
- **No Kids (Terminal 2):**
  - Na Dashboard, clicar em **"JOGO DAS PALAVRAS"**
  - Jogar e completar o jogo (qualquer pontuação)
  - Voltar para Home

#### **4. Ver Notificação no Tutors**
✅ **O QUE VOCÊ DEVE VER NO TUTORS:**
- Toast verde aparece no topo: 🎉 **"João Silva completou Jogo das Palavras!"**
- Badge de progresso da criança atualiza automaticamente

#### **5. Ver Console da API**
✅ **O QUE DEVE APARECER NO CONSOLE DA API:**
```
🎮 Progresso salvo: João Silva - palavras - 100%
📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
```

---

## 📅 **TESTE 3: Visualizar Agendas (Tutors)**

### **Objetivo:** Ver consultas agendadas

### **📱 PASSO A PASSO:**

#### **1. No Tutors, clicar em "Agenda"**
✅ **O QUE VOCÊ DEVE VER:**
- Selector de criança no topo (João Silva ← →)
- Filtros: Todas / Agendadas / Confirmadas / Concluídas
- Lista de consultas com:
  - Data e horário
  - Nome do profissional
  - Local
  - Status (colorido)

#### **2. Filtrar por Status**
- Clicar em **"Agendadas"**
- ✅ Deve mostrar apenas consultas com status "agendada"

#### **3. Expandir Card**
- Clicar em qualquer agenda
- ✅ Card expande mostrando:
  - Observações completas
  - Tipo de consulta
  - Duração
  - Profissional com dados de contato

#### **4. Arrastar para Atualizar**
- Arrastar lista para baixo
- ✅ Animação de refresh
- ✅ Lista recarrega

---

## 📈 **TESTE 4: Visualizar Progresso (Tutors)**

### **Objetivo:** Ver progresso detalhado da criança

### **📱 PASSO A PASSO:**

#### **1. No Tutors, clicar em "Progresso"**
✅ **O QUE VOCÊ DEVE VER:**
- Selector de criança no topo
- **4 cards de estatísticas gerais** (vertical):
  1. **Total de Sessões** (borda azul)
  2. **Tempo Total** (borda verde)
  3. **Média Geral** (borda amarela)
  4. **Melhor Jogo** (borda vermelha)

- **4 cards de jogos** (compactos):
  1. Igual-Diferente
  2. Cena Certa
  3. Adivinha
  4. Jogo das Palavras

#### **2. Expandir Card de Jogo**
- Clicar em **"Jogo das Palavras"**
- ✅ Card expande mostrando:
  - Vezes jogado
  - Melhor pontuação
  - Média de acertos
  - Tempo médio
  - Última vez jogado

#### **3. Trocar de Criança**
- Clicar na seta direita **→**
- ✅ Muda para "Lucas Silva"
- ✅ Progresso atualiza automaticamente

#### **4. Pull to Refresh**
- Arrastar lista para baixo
- ✅ Recarrega dados

---

## 🎯 **TESTE 5: Notificações em Tempo Real (Completo)**

### **Objetivo:** Ver toda a cadeia de notificações funcionando

### **📱 PASSO A PASSO:**

#### **1. Abrir TODOS os Apps**
```bash
# Terminal 1 - API
cd api
npm start

# Terminal 2 - Kids
cd Kids
npm start

# Terminal 3 - Tutors
cd Tutors
npm start
```

#### **2. Login em Todos**
- **Kids:** `joao@kids.com` / `123456`
- **Tutors:** `carlos@tutors.com` / `123456`

#### **3. Posicionar Windows**
- Deixe Kids e Tutors lado a lado na tela
- Console da API visível em outra janela

#### **4. No Kids: Jogar um Jogo**
- Escolher qualquer jogo
- Completar
- Voltar para Home

#### **5. Observar em TEMPO REAL:**

✅ **Console da API mostra:**
```
🎮 Progresso salvo: João Silva - [nome do jogo] - [score]%
📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
```

✅ **Tutors mostra:**
- Toast verde: 🎉 **"João Silva completou [nome do jogo]!"**
- Badge de progresso atualiza

#### **6. No Tutors: Ir para Progresso**
- Clicar em "Progresso"
- ✅ Deve mostrar o jogo recém-completado nos dados

---

## 🔔 **TESTE 6: Badge de Notificação (Kids)**

### **Objetivo:** Ver badge atualizar dinamicamente

### **📱 PASSO A PASSO:**

#### **1. No Kids, na Dashboard**
- Observar o sino no canto superior direito
- Badge mostra: **"3"**

#### **2. Clicar no Sino**
- Ver 3 lembretes novos

#### **3. Marcar 1 como Lido**
- Clicar em "Marcar como lido"
- Voltar para Dashboard

#### **4. Verificar Badge**
- ✅ Badge agora mostra: **"2"**
- Badge atualiza automaticamente!

#### **5. Marcar Todos como Lidos**
- Entrar nos lembretes novamente
- Marcar os 2 restantes como lidos
- Voltar para Dashboard

#### **6. Badge Desaparece**
- ✅ Badge não aparece mais (nenhum lembrete novo)

---

## 📱 **TESTE 7: Fallback (Sem API)**

### **Objetivo:** Verificar se apps funcionam offline

### **📱 PASSO A PASSO:**

#### **1. FECHAR a API** (Terminal 1)
- Ctrl+C para parar o servidor

#### **2. No Kids: Clicar no Sino**
✅ **O QUE DEVE ACONTECER:**
- Console do Kids mostra:
  ```
  ⚠️ API erro - usando dados mockados locais
  ✅ Lembretes carregados do mockup: 3 não lidos
  ```
- Tela de lembretes abre normalmente
- Todos os 3 lembretes aparecem

#### **3. No Tutors: Ir para Agenda**
✅ **O QUE DEVE ACONTECER:**
- Console do Tutors mostra:
  ```
  ⚠️ API erro - usando dados mockados do perfil
  ✅ Agendas mockadas carregadas: 2
  ```
- Tela de agenda abre com dados mockados

#### **4. No Tutors: Ir para Progresso**
✅ **O QUE DEVE ACONTECER:**
- Dados mockados aparecem
- Tudo funciona normalmente

---

## 🎨 **TESTE 8: UI/UX dos Lembretes**

### **Objetivo:** Verificar design e animações

### **📱 PASSO A PASSO:**

#### **1. No Kids: Tela de Lembretes**
✅ **Verificar Visual:**
- **Badge de Prioridade:**
  - Vermelho (URGENTE) = Alta
  - Amarelo (NORMAL) = Média
  - Azul (BAIXA) = Baixa

- **Barra Lateral do Card:**
  - Mesma cor da prioridade
  - 4px de largura

- **Animação ao Clicar:**
  - Botão "Marcar como lido" tem animação suave
  - Card some com fade out

#### **2. Toggle Novos/Lidos**
- Clicar em "Lidos"
- ✅ Botão muda de cor (branco → azul)
- ✅ Ícone muda (sino → check)
- ✅ Lista atualiza suavemente

---

## 🔍 **TESTE 9: Logs Completos**

### **Objetivo:** Verificar todos os logs da API

### **📱 PASSO A PASSO:**

#### **1. Console da API Limpo**
- Reiniciar API (Ctrl+C e `npm start`)

#### **2. Fazer Cada Ação e Ver Log:**

**Ação:** Kids busca lembretes
**Log esperado:**
```
✅ Lembretes buscados: 3 não lidos, 1 lidos para criança 1
```

**Ação:** Kids marca lembrete como lido
**Log esperado:**
```
✅ Lembrete marcado como lido: reminder_001
```

**Ação:** Kids joga um jogo
**Log esperado:**
```
🎮 Progresso salvo: João Silva - palavras - 100%
📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
```

**Ação:** Tutors busca agendas
**Log esperado:**
```
✅ Agendas buscadas: 8 agendas para tutor tutor_001
```

---

## ✅ **CHECKLIST FINAL DE TESTES**

Use esta checklist para marcar o que foi testado:

### **Sistema de Lembretes**
- [ ] Badge aparece no Kids com número correto
- [ ] Clicar no sino abre tela de lembretes
- [ ] 3 lembretes novos aparecem
- [ ] Cores de prioridade corretas (vermelho, amarelo, azul)
- [ ] Marcar como lido funciona
- [ ] Badge atualiza ao marcar como lido
- [ ] Toggle Novos/Lidos funciona
- [ ] Lembretes lidos aparecem na aba "Lidos"
- [ ] Fallback funciona (sem API)

### **Progresso em Tempo Real**
- [ ] Jogar no Kids envia progresso
- [ ] Tutors recebe notificação (toast)
- [ ] Badge de progresso atualiza
- [ ] Console da API mostra logs corretos

### **Agendas**
- [ ] Tutors mostra lista de agendas
- [ ] Filtros funcionam (Todas, Agendadas, etc)
- [ ] Cards expandem ao clicar
- [ ] Pull-to-refresh funciona
- [ ] Selector de criança funciona
- [ ] Fallback funciona (sem API)

### **Progresso**
- [ ] 4 cards de estatísticas aparecem
- [ ] 4 jogos aparecem (todos, mesmo não jogados)
- [ ] Cards de jogos expandem
- [ ] Selector de criança funciona
- [ ] Pull-to-refresh funciona

### **Logs**
- [ ] Todos os logs aparecem no console da API
- [ ] Logs são informativos e claros
- [ ] Fallback loga corretamente

---

## 🐛 **PROBLEMAS COMUNS**

### **Badge não aparece**
**Solução:** 
- Verificar se API está rodando
- Verificar se usuário logado é João Silva (id: "1")
- Verificar arquivo `Kids/mockup-data/reminders.json`

### **Toast não aparece no Tutors**
**Solução:**
- Verificar se ambos apps estão rodando
- Verificar se Socket.IO conectou (console deve mostrar "✅ WebSocket conectado")
- Reiniciar ambos apps

### **Agendas não aparecem**
**Solução:**
- Verificar se API está rodando
- Verificar arquivo `Mockup/shared/agendas.json` existe
- Ver console do Tutors para mensagens de erro

---

## 📊 **TEMPO ESTIMADO POR TESTE**

| Teste | Tempo | Dificuldade |
|-------|-------|-------------|
| Teste 1 (Lembretes) | 5 min | Fácil |
| Teste 2 (Tempo Real) | 5 min | Média |
| Teste 3 (Agendas) | 3 min | Fácil |
| Teste 4 (Progresso) | 3 min | Fácil |
| Teste 5 (Completo) | 10 min | Média |
| Teste 6 (Badge) | 3 min | Fácil |
| Teste 7 (Fallback) | 5 min | Fácil |
| Teste 8 (UI/UX) | 3 min | Fácil |
| Teste 9 (Logs) | 3 min | Fácil |

**TOTAL:** ~40 minutos

---

## 🎯 **RESULTADO ESPERADO**

Ao finalizar todos os testes, você deve ter visto:

✅ **Sistema de Lembretes funcionando 100%**  
✅ **Notificações em tempo real entre apps**  
✅ **Fallback offline funcionando**  
✅ **Todos os logs aparecendo corretamente**  
✅ **UI/UX bonita e responsiva**  
✅ **Zero erros no console**

---

**🎉 Parabéns! Sistema está COMPLETO e FUNCIONANDO! 🚀**


