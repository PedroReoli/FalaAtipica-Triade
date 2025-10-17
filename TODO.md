# 📋 TODO - FalaAtípica Triade

**Última Atualização:** 17 de Outubro de 2025
**Versão:** 1.2.0

---

## ✅ **IMPLEMENTAÇÕES RECENTES (v1.2.0)**

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

### 🔴 **Refatoração do Tutors**

- [ ] **Remover dados hardcoded:**
  - [ ] Perfil - remover dados fixos
  - [ ] Dashboard - usar dados dinâmicos
  - [ ] Progresso - sincronizar com 4 jogos do Kids
- [ ] **Melhorias de UX:**
  - [ ] Renomear "Dicas" para nome mais apropriado (ex: "Orientações", "Guia de Apoio")
  - [ ] Implementar download de dicas em PDF
  - [ ] Melhorar separação visual na página de Suporte
  - [ ] Substituir TODOS os emojis por ícones Lucide
- [ ] **Atualizar informações:**
  - [ ] Trocar todos os emails para: pedrosousa2160@gmail.com
  - [ ] Remover botão/opção "Cadastrar nova conta"
- [ ] **Nova página "Jogos" (substituir "Imagens e Sons"):**
  - [ ] Card do jogo "Adivinha" + descrição + o que a criança aprende
  - [ ] Card do jogo "Igual-Diferente" + descrição + o que a criança aprende
  - [ ] Card do jogo "Cena Certa" + descrição + o que a criança aprende
  - [ ] Card do jogo "Palavras" + descrição + o que a criança aprende
  - [ ] Layout responsivo e atrativo
  - [ ] Ícones consistentes para cada jogo
- [ ] **Página de Progresso:**
  - [ ] Sincronizar com os 4 jogos do Kids
  - [ ] Mostrar progresso individual por jogo
  - [ ] Estatísticas consistentes com dados reais
  - [ ] Gráficos visuais de evolução

### 🔴 **Integração API no Pro**

- [ ] **Criar `Pro/src/services/mockDataService.ts`**

  - [ ] Função para carregar `pacientes.json`
  - [ ] Função para carregar `sessoes.json`
  - [ ] Função para carregar `relatorios.json`
  - [ ] Função para carregar `medicamentos.json`
  - [ ] Função para salvar paciente (localStorage + API)
  - [ ] Função para salvar sessão (localStorage + API)
  - [ ] Função para atualizar paciente (localStorage + API)
- [ ] **Integrar `useAPIIntegration` nas páginas principais:**

  - [X] `LoginPage.tsx` (já integrado)
  - [ ] `PatientsPage.tsx`
  - [ ] `SessionsPage.tsx`
  - [ ] `ReportsPage.tsx`
  - [ ] `NewPatientPage.tsx`
  - [ ] `NewSessionPage.tsx`
  - [ ] `PatientDetailsPage.tsx`
  - [ ] `MedicationsPage.tsx`
  - [ ] `SettingsPage.tsx`
- [ ] **Implementar fallback offline em todas as páginas**

  - [ ] Testar cada página com API online
  - [ ] Testar cada página com API offline
  - [ ] Adicionar logs de debug em todas as operações
- [ ] **Testar CRUD completo:**

  - [ ] Create (Criar paciente, sessão, relatório)
  - [ ] Read (Listar pacientes, sessões, relatórios)
  - [ ] Update (Editar paciente, sessão, relatório)
  - [ ] Delete (Deletar paciente, sessão - se necessário)

---

## 📄 DOCUMENTAÇÃO PENDENTE

### 🔴 **Crítica:**

- [ ] **Documentar integração API no Pro** (`docs/pro/integracao-api.md`)
- [ ] **Atualizar README do Pro** com instruções de API
- [ ] **Criar guia de troubleshooting** para API offline

### 🟡 **Alta:**

- [ ] **Documentar mockDataService** (`docs/pro/mock-data-service.md`)
- [ ] **Atualizar diagramas de arquitetura** incluindo API
- [ ] **Documentar fluxo de fallback** para cada funcionalidade

### 🟢 **Média:**

- [ ] **Criar changelog** das mudanças de integração API
- [ ] **Documentar boas práticas** de integração API
- [ ] **Atualizar guia de desenvolvimento** do Pro

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
- [ ] **Refatoração e Melhorias Pendentes:**
  - [ ] Remover dados hardcoded (especialmente em Perfil)
  - [ ] Implementar funcionalidade de baixar dicas
  - [ ] Renomear seção "Dicas" para nome mais apropriado
  - [ ] Melhorar separação visual na página de Suporte
  - [ ] Substituir emojis por ícones da lib (Lucide)
  - [ ] Atualizar todos os emails para pedrosousa2160@gmail.com
  - [ ] Remover opção "Cadastrar nova conta"
  - [ ] Melhorar página de Progresso (consistente com 4 jogos do Kids)
  - [ ] Substituir "Imagens e Sons" por página de Jogos
  - [ ] Adicionar informações dos 4 jogos na nova página
  - [ ] Documentar o que a criança aprende em cada jogo

### **Pro:**

- [X] Login - Completo
- [ ] Pacientes - Precisa integração API
- [ ] Sessões - Precisa integração API
- [ ] Relatórios - Precisa integração API
- [ ] Novo Paciente - Precisa integração API
- [ ] Nova Sessão - Precisa integração API
- [X] Aplicações - Modificado (Solicitar Licença)
- [ ] Integração API - Incompleta
- [ ] Fallback offline - Incompleta
- [ ] **Validar interface com os 4 jogos do Kids:**
  - [ ] Adivinha
  - [ ] Igual-Diferente
  - [ ] Cena Certa
  - [ ] Palavras

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
