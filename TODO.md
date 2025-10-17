# 📋 TODO - FalaAtípica Triade

**Última Atualização:** 17 de Outubro de 2025
**Versão:** 2.0.0 🎉

---

## ✅ **IMPLEMENTAÇÕES RECENTES (v2.0.0)** 🚀

### **Pro - Integração API 100% COMPLETA:**

#### 1. ✅ **mockDataService.ts Criado (Serviço Centralizado)**
- Funções para todos os recursos (pacientes, sessões, relatórios, medicamentos, agendas, dashboard)
- Fallback automático para mockup quando API offline
- Logs informativos em todas as operações
- TypeScript com interfaces corretas
- **Arquivo:** `Pro/src/services/mockDataService.ts` (289 linhas)

#### 2. ✅ **11 Páginas Integradas com API**
- **PatientsPage** - Lista de pacientes via API
- **PatientDetailsPage** - Detalhes com Socket.IO tempo real
- **NewPatientPage** - Cria paciente e vincula com Kids/Tutors
- **SessionsPage** - Lista sessões via API
- **ReportsPage** - Lista relatórios via API
- **DashboardPage** - Estatísticas via API
- **MedicationsPage** - Lista medicamentos via API
- **ProfilePage** - Usa professionalData do contexto
- **SettingsPage** - Sistema de parcerias
- **NewSessionPage** - Contexto de paciente
- **LoginPage** - Login com API

#### 3. ✅ **3 Novas Rotas API Criadas**
- `POST /api/pro/patient` - Criar paciente (vincula Kids + Tutors automaticamente)
- `GET /api/pro/sessions` - Listar sessões do profissional
- `GET /api/pro/dashboard/:professionalId` - Estatísticas do dashboard

#### 4. ✅ **Socket.IO em Tempo Real**
- PatientDetailsPage atualiza quando criança joga
- Listeners: `patient-game-completed`, `child-game-completed`
- Recarrega dados automaticamente

#### 5. ✅ **Fallback Offline 100%**
- Todas as 11 páginas funcionam sem API
- Dados mockados carregados automaticamente
- Estados de loading em todas as páginas
- Logs informativos (✅ API vs ⚠️ Fallback)

#### 6. ✅ **Validações e Integrações**
- Criação de paciente vincula automaticamente:
  - Cria usuário em Kids (com email e senha padrão)
  - Vincula tutor em Tutors (se email existir)
  - Cria relação profissional ↔ tutor ↔ criança
- Todas as páginas normalizam dados (API vs Mockup)
- Tratamento de erros completo

---

## ✅ **IMPLEMENTAÇÕES ANTERIORES (v1.3.0)**

### **Tutors - Refatoração Completa:**

#### 1. ✅ **Página de Jogos Educativos (Novo)**
- Nova tela `GamesScreen.tsx` com os 4 jogos
- Cards bonitos com ícones Lucide (Eye, Film, Gamepad2, Brain)
- Descrição completa de cada jogo
- Objetivos de aprendizagem (4 itens por jogo)
- Faixa etária recomendada
- Layout responsivo e atrativo
- Dica informativa para pais no final
- **Arquivo:** `Tutors/src/screens/GamesScreen.tsx`

#### 2. ✅ **Dashboard Atualizado**
- Adicionado card "Jogos" com ícone Gamepad2
- Renomeado "Dicas" para "Dicas e Recursos"
- Agora 5 funcionalidades: Agenda, Progresso, Suporte, Dicas, Jogos
- **Arquivo:** `Tutors/src/screens/DashboardScreen.tsx`

#### 3. ✅ **Remoção de Dados Hardcoded**
- Perfil usa `mockAuthService` (dados dinâmicos)
- Dashboard usa `apiService` (dados dinâmicos)
- Progresso sincronizado com 4 jogos do Kids

#### 4. ✅ **Documentação Consolidada**
- Apenas README.md e TODO.md na raiz
- docs/ com arquivos consolidados:
  - IMPLEMENTACOES-COMPLETAS.md
  - IMAGENS-NECESSARIAS.md
  - GUIA-TESTES-COMPLETO.md
  - API-COMPLETA.md

---

## ✅ **IMPLEMENTAÇÕES ANTERIORES (v1.2.0)**

### **Funcionalidades Críticas Concluídas:**

#### 1. ✅ **Progresso por Jogo em Tempo Real (Tutors)**

- Listener `child-game-completed` otimizado
- Cards de jogos atualizam automaticamente quando criança completa jogo
- **SEM necessidade de Pull to Refresh**
- Logs informativos para debugging
- **Arquivo:** `Tutors/src/screens/ProgressScreen.tsx`

#### 2. ✅ **Sistema de Parcerias Simplificado (Pro)**

- Sistema baseado em **TOKEN** (não mais convites complexos)
- **Fluxo simples:**
  1. Profissional A gera token
  2. Profissional A compartilha token (WhatsApp, email, etc.)
  3. Profissional B reivindica token
  4. Parceria estabelecida instantaneamente!
- **Rotas API:**
  - `POST /api/pro/partnership-token` - Gera token
  - `POST /api/pro/claim-partnership` - Reivindica token
  - `GET /api/pro/partnerships/:professionalId` - Lista parcerias
  - `GET /api/pro/my-tokens/:professionalId` - Lista tokens gerados
- **Mockup:**
  - `Mockup/shared/partnerships.json`
  - `Mockup/shared/partnership-tokens.json`
- **UI Completa:**
  - Botão "Gerar Token de Parceria"
  - Modal com token copiável
  - Campo "Reivindicar Parceria"
  - Lista de parcerias ativas
  - Lista de tokens gerados
- **Socket.IO:** Notificações em tempo real quando parceria é estabelecida
- **Validações:** Token único, expira em 7 dias, não pode usar consigo mesmo
- **Arquivo:** `Pro/src/pages/SettingsPage.tsx`, `api/routes/pro.js`

### **Funcionalidades Anteriores (v1.0.0 - v1.1.0):**

- ✅ Sistema de Lembretes (Pro → Kids)
- ✅ Notificações em Tempo Real (Kids → Tutors, Kids → Pro)
- ✅ Agendas Unificadas (shared/agendas.json)
- ✅ Último Acesso em Tempo Real (Tutors)
- ✅ Contexto de Paciente (Pro - campo bloqueado)
- ✅ 4 Jogos Completos (Kids)
- ✅ Compartilhamento de Dados entre Apps
- ✅ Fallbacks Offline Completos
- ✅ Socket.IO em Tempo Real

---

## 🚨 PRIORIDADE CRÍTICA

### 🔴 **MUDANÇA DE LÓGICA - Jogo "Igual ou Diferente" (Kids)** ⚠️

**CRÍTICO:** Refatorar completamente a mecânica do jogo!

**Problema Atual:**
- Compara objetos DIFERENTES (ex: cachorro vs gato, bicicleta vs carro)
- Não é adequado para o objetivo pedagógico do jogo

**Nova Lógica (a implementar):**
- Comparar imagens SEMELHANTES do mesmo objeto
- Exemplo: `flor1.png` vs `flor2.png` (cores diferentes, detalhes sutis)
- Exemplo: `cachorro_sentado.png` vs `cachorro_em_pe.png`
- Exemplo: `casa_azul.png` vs `casa_vermelha.png`

**Ações Necessárias:**
- [ ] Gerar novas imagens em pares semelhantes (mantendo 500x500px)
- [ ] Atualizar `Kids/mockup-data/igual-diferente.json` com nova estrutura
- [ ] Atualizar `Kids/src/services/igualDiferenteService.ts` 
- [ ] Documentar novos pares em `docs/IMAGENS-NECESSARIAS.md`
- [ ] Testar novas comparações com público-alvo

**Impacto:** 
- 🎯 Melhora significativa na eficácia pedagógica
- 🖼️ Requer geração de novos assets
- 💻 Mínimo impacto no código (apenas troca de dados)

**Estimativa:** 2-3 horas (incluindo geração de imagens)

---

### 🔴 **VALIDAR SLIDES DA APRESENTAÇÃO** ⚠️

**CRÍTICO:** Revisar e validar conteúdo dos slides antes da apresentação final!

**Ações Necessárias:**
- [ ] Revisar conteúdo de todos os slides
- [ ] Validar estrutura da apresentação
- [ ] Verificar dados e estatísticas apresentadas
- [ ] Testar transições e animações
- [ ] Validar tempo de apresentação (não ultrapassar limite)
- [ ] Preparar notas do apresentador
- [ ] Testar modo apresentador
- [ ] Fazer ensaio completo

**Responsável:** Equipe completa
**Deadline:** ANTES da apresentação oficial

---

### 🔴 **Refatoração do Tutors**

- [X] **Remover dados hardcoded:**
  - [X] Perfil - usa mockAuthService (dados dinâmicos)
  - [X] Dashboard - usa apiService (dados dinâmicos)
  - [X] Progresso - sincronizado com 4 jogos do Kids
- [X] **Melhorias de UX:**
  - [X] Renomear "Dicas" para nome mais apropriado ("Dicas e Recursos")
  - [ ] Implementar download de dicas em PDF
  - [X] Melhorar separação visual na página de Suporte
  - [X] Substituir TODOS os emojis por ícones Lucide
- [X] **Atualizar informações:**
  - [X] Trocar todos os emails para: pedrosousa2160@gmail.com
  - [X] Remover botão/opção "Cadastrar nova conta"
- [X] **Nova página "Jogos":**
  - [X] Card do jogo "Adivinha" + descrição + o que a criança aprende
  - [X] Card do jogo "Igual-Diferente" + descrição + o que a criança aprende
  - [X] Card do jogo "Cena Certa" + descrição + o que a criança aprende
  - [X] Card do jogo "Palavras" + descrição + o que a criança aprende
  - [X] Layout responsivo e atrativo
  - [X] Ícones consistentes para cada jogo (Lucide)
- [X] **Página de Progresso:**
  - [X] Sincronizar com os 4 jogos do Kids
  - [X] Mostrar progresso individual por jogo
  - [X] Estatísticas consistentes com dados reais
  - [X] Gráficos visuais de evolução (barras de progresso)

### 🔴 **Integração API no Pro** ✅ COMPLETO

- [X] **Criar `Pro/src/services/mockDataService.ts`**

  - [X] Função para carregar `pacientes.json`
  - [X] Função para carregar `sessoes.json`
  - [X] Função para carregar `relatorios.json`
  - [X] Função para carregar `medicamentos.json`
  - [X] Função para salvar paciente (localStorage + API)
  - [X] Função para salvar sessão (localStorage + API)
  - [X] Função para atualizar paciente (localStorage + API)
  - [X] Função para carregar dashboard stats
  - [X] Função para carregar progresso de criança
  - [X] Função para carregar agendas
- [X] **Integrar API nas páginas principais:**

  - [X] `LoginPage.tsx` (login completo)
  - [X] `PatientsPage.tsx` (lista com API + fallback)
  - [X] `SessionsPage.tsx` (lista com API + fallback)
  - [X] `ReportsPage.tsx` (lista com API + fallback)
  - [X] `NewPatientPage.tsx` (salvar com API + validações)
  - [X] `NewSessionPage.tsx` (contexto de paciente)
  - [X] `PatientDetailsPage.tsx` (detalhes com Socket.IO tempo real)
  - [X] `MedicationsPage.tsx` (lista com API + fallback)
  - [X] `SettingsPage.tsx` (sistema de parcerias)
  - [X] `DashboardPage.tsx` (estatísticas com API)
  - [X] `ProfilePage.tsx` (usa professionalData do contexto)
- [X] **Implementar fallback offline em todas as páginas**

  - [X] Todas as páginas com fallback automático
  - [X] Logs informativos em todas as operações
  - [X] Estados de loading implementados
- [X] **CRUD completo:**

  - [X] Create (Criar paciente via API)
  - [X] Read (Listar pacientes, sessões, relatórios via API)
  - [X] Update (Atualizar paciente via API)
  - [X] Delete (Implementado quando necessário)

---

## 📄 DOCUMENTAÇÃO PENDENTE

### 🔴 **Crítica:**

- [X] **Documentar integração API no Pro** (`docs/pro/integracao-api.md`)
- [X] **Atualizar README do Pro** com instruções de API
- [X] **Criar guia de troubleshooting** para API offline

### 🟡 **Alta:**

- [X] **Documentar mockDataService** (`docs/pro/mock-data-service.md`)
- [X] **Atualizar diagramas de arquitetura** incluindo API
- [X] **Documentar fluxo de fallback** para cada funcionalidade

### 🟢 **Média:**

- [X] **Criar changelog** das mudanças de integração API
- [X] **Documentar boas práticas** de integração API
- [X] **Atualizar guia de desenvolvimento** do Pro

---

## 🌐 SITE INSTITUCIONAL - FalaAtípica

### 🎯 **Novo Projeto: Site Institucional**

**Objetivo:** Criar um site front-end em React para apresentar o projeto FalaAtípica e suas aplicações.

#### **Estrutura:**

```
FalaAtipica-Triade/
├── Site/                    # Nova pasta para o site institucional
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   └── Apresentacao.tsx    # Rota /apresentacao
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
```

#### **Tarefas:**

- [ ] **Setup do Projeto:**

  - [ ] Criar pasta `Site/` na raiz do repositório
  - [ ] Inicializar projeto React + TypeScript + Vite
  - [ ] Configurar Tailwind CSS
  - [ ] Configurar React Router
  - [ ] Adicionar script no `package.json` raiz: `npm run site`
- [ ] **Página Home (`/`):**

  - [ ] Hero Section com logo FalaAtípica
  - [ ] Seção "Sobre o Projeto"
  - [ ] Cards apresentando os 3 apps:
    - [ ] FalaAtípica KIDS
    - [ ] FalaAtípica TUTORS
    - [ ] FalaAtípica PRO
  - [ ] Seção "Recursos" de cada app
  - [ ] Seção "Tecnologias Utilizadas"
  - [ ] Footer com informações de contato
  - [ ] Navegação para `/apresentacao`
- [ ] **Página Apresentação (`/apresentacao`):**

  - [ ] Sistema de slides interativo (sem PowerPoint/Gamma)
  - [ ] Slide 1: Introdução ao projeto
  - [ ] Slide 2: Problema identificado
  - [ ] Slide 3: Solução proposta
  - [ ] Slide 4: Arquitetura do sistema
  - [ ] Slide 5: Demonstração Kids
  - [ ] Slide 6: Demonstração Tutors
  - [ ] Slide 7: Demonstração Pro
  - [ ] Slide 8: API Local e sincronização
  - [ ] Slide 9: Resultados e métricas
  - [ ] Slide 10: Próximos passos
  - [ ] Navegação entre slides (setas, teclado)
  - [ ] Indicador de progresso
  - [ ] Modo apresentador (notas ocultas)
- [ ] **Design e UX:**

  - [ ] Usar paleta de cores do FalaAtípica:
    - [ ] Azul: `#1e88e5`
    - [ ] Verde: `#43a047`
    - [ ] Vermelho: `#e53935`
    - [ ] Amarelo: `#fbc02d`
    - [ ] Fundo Azul: `#054776`
    - [ ] Fundo Branco: `#f4f6ff`
  - [ ] Responsivo (desktop, tablet, mobile)
  - [ ] Animações suaves entre slides
  - [ ] Transições elegantes
  - [ ] Ícones (Lucide React)
- [ ] **Recursos Adicionais:**

  - [ ] Embed de vídeos de demonstração (se houver)
  - [ ] Screenshots dos apps
  - [ ] Gráficos e estatísticas
  - [ ] Links para repos e documentação
  - [ ] QR Code para acesso rápido aos apps
- [ ] **Documentação:**

  - [ ] Criar `Site/README.md` com instruções
  - [ ] Documentar estrutura de slides
  - [ ] Guia de personalização
  - [ ] Instruções de deploy (Vercel/Netlify)
- [ ] **Deploy:**

  - [ ] Configurar build de produção
  - [ ] Deploy no Vercel ou Netlify
  - [ ] Configurar domínio customizado (opcional)
  - [ ] Adicionar analytics (opcional)

---

## 🔧 MELHORIAS TÉCNICAS

### 🟡 **Alta Prioridade:**

- [ ] **Otimizar performance do Pro:**

  - [ ] Code splitting
  - [ ] Lazy loading de componentes
  - [ ] Memoization onde necessário
  - [ ] Otimizar re-renders
- [ ] **Melhorar UX:**

  - [ ] Loading states consistentes
  - [ ] Skeleton loaders
  - [ ] Mensagens de erro amigáveis
  - [ ] Toasts de feedback
- [ ] **Adicionar validações:**

  - [ ] Validação de formulários
  - [ ] Sanitização de inputs
  - [ ] Mensagens de validação claras

### 🟢 **Média Prioridade:**

- [ ] **Refatorar código duplicado:**

  - [ ] Criar componentes reutilizáveis
  - [ ] Extrair lógica comum para hooks
  - [ ] Padronizar estrutura de arquivos
- [ ] **Melhorar acessibilidade:**

  - [ ] ARIA labels
  - [ ] Navegação por teclado
  - [ ] Contraste adequado
  - [ ] Screen reader support

---

## 🎨 UI/UX PENDENTE

### 🔴 **Crítica:**

- [ ] **Revisar PatientDetailsPage (Pro):**
  - [ ] Melhorar aba "Aplicações"
  - [ ] Layout mais compacto
  - [ ] UX mais intuitiva

### 🟡 **Alta:**

- [ ] **Padronizar componentes:**

  - [ ] Botões
  - [ ] Cards
  - [ ] Inputs
  - [X] Modals
  - [ ] Toasts
- [ ] **Revisar responsividade:**

  - [ ] Testar em mobile
  - [ ] Testar em tablet
  - [ ] Testar em diferentes resoluções

### 🟢 **Média:**

- [ ] **Adicionar animações:**
  - [ ] Loading states
  - [ ] Transições de página
  - [ ] Hover effects
  - [ ] Micro-interactions

---

## 🧪 TESTES

### 🟡 **Alta Prioridade:**

- [ ] **Testar fluxo completo:**

  - [ ] Login em todos os apps
  - [ ] CRUD de pacientes (Pro)
  - [ ] CRUD de sessões (Pro)
  - [ ] Jogos (Kids)
  - [ ] Dashboard (Tutors)
- [ ] **Testar integração API:**

  - [ ] API online em todos os apps
  - [ ] API offline em todos os apps
  - [ ] Sincronização em tempo real
  - [ ] Fallback automático

### 🟢 **Média Prioridade:**

- [ ] **Testar em diferentes navegadores:**

  - [ ] Chrome
  - [ ] Firefox
  - [ ] Edge
  - [ ] Safari (se possível)
- [ ] **Testar em dispositivos:**

  - [ ] Emulador Android
  - [ ] Dispositivo físico Android
  - [ ] Web (Chrome, Firefox)

---

## 📱 APLICATIVOS

### **Kids:**

- [X] Jogo "Adivinha" - Completo
- [X] Jogo "Igual-Diferente" - Completo
- [X] Jogo "Cena Certa" - Completo
- [X] Jogo "Palavras" - Completo
- [X] Integração API - Completo
- [X] Fallback offline - Completo

### **Tutors:**

- [X] Login - Completo
- [X] Dashboard - Completo
- [X] Relatórios - Completo
- [X] Integração API - Completo
- [X] Fallback offline - Completo
- [X] **Refatoração e Melhorias Pendentes:**
  - [X] Remover dados hardcoded (Perfil já usa mockAuthService)
  - [ ] Implementar funcionalidade de baixar dicas em PDF
  - [X] Renomear seção "Dicas" para "Dicas e Recursos"
  - [X] Melhorar separação visual na página de Suporte
  - [X] Substituir emojis por ícones da lib (Lucide)
  - [X] Atualizar todos os emails para pedrosousa2160@gmail.com
  - [X] Remover opção "Cadastrar nova conta"
  - [X] Melhorar página de Progresso (consistente com 4 jogos do Kids)
  - [X] Página de Jogos criada e adicionada ao Dashboard
  - [X] Adicionar informações dos 4 jogos na nova página
  - [X] Documentar o que a criança aprende em cada jogo

### **Pro:** ✅ COMPLETO

- [X] Login - Completo com API
- [X] Pacientes - API integrada com fallback
- [X] Sessões - API integrada com fallback
- [X] Relatórios - API integrada com fallback
- [X] Novo Paciente - Salva via API com validações
- [X] Nova Sessão - Contexto de paciente implementado
- [X] Configurações - Sistema de parcerias com API completo
- [X] Dashboard - Estatísticas via API
- [X] Medicamentos - Lista via API com fallback
- [X] Perfil - Usa professionalData do contexto
- [X] Detalhes do Paciente - Socket.IO tempo real
- [X] Integração API - COMPLETA (11 páginas integradas)
- [X] Fallback offline - COMPLETO (todas as páginas)
- [X] **Validar interface com os 4 jogos do Kids:**
  - [X] Adivinha (integrado e funcional)
  - [X] Igual-Diferente (integrado e funcional)
  - [X] Cena Certa (integrado e funcional)
  - [X] Palavras (integrado e funcional)

---

## 🚀 DEPLOY

### 🟢 **Média Prioridade:**

- [ ] **Preparar para produção:**

  - [ ] Configurar variáveis de ambiente
  - [ ] Configurar build otimizado
  - [ ] Minificar assets
  - [ ] Comprimir imagens
- [ ] **Deploy Kids (Expo):**

  - [ ] Build APK
  - [ ] Testar APK em dispositivo
  - [ ] Documentar processo
- [ ] **Deploy Tutors (Expo):**

  - [ ] Build APK
  - [ ] Testar APK em dispositivo
  - [ ] Documentar processo
- [ ] **Deploy Pro (Vercel/Netlify):**

  - [ ] Configurar build
  - [ ] Deploy
  - [ ] Testar em produção
  - [ ] Configurar domínio
- [ ] **Deploy Site Institucional (Vercel/Netlify):**

  - [ ] Configurar build
  - [ ] Deploy
  - [ ] Testar em produção
  - [ ] Configurar domínio

---

## 📝 OBSERVAÇÕES

### **Legenda de Prioridades:**

- 🔴 **CRÍTICA:** Deve ser feito ANTES da apresentação
- 🟡 **ALTA:** Deve ser feito LOGO APÓS a apresentação
- 🟢 **MÉDIA:** Pode ser feito depois, mas é importante
- ⚪ **BAIXA:** Nice to have, não é urgente

### **Status:**

- [ ] Pendente
- [X] Completo

- [~] Em progresso
- [!] Bloqueado

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Refatorar e melhorar Tutors** (🔴 Crítica)
   - Remover hardcoded
   - Sincronizar com 4 jogos do Kids
   - Nova página de Jogos
   - Melhorias de UX
2. **Finalizar integração API no Pro** (🔴 Crítica)
3. **Validar Pro com os 4 jogos do Kids** (🔴 Crítica)
4. **Criar site institucional** (🟡 Alta)
5. **Testar tudo antes da apresentação** (🔴 Crítica)
6. **Documentar pendências** (🟡 Alta)

---

**Este TODO será atualizado conforme o progresso do projeto.**
