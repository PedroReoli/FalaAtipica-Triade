# Documentação - Aplicação PRO

## Visão Geral
A aplicação PRO é uma plataforma web desenvolvida em React com TypeScript, destinada a profissionais da saúde que trabalham com crianças com atraso de fala. A aplicação oferece funcionalidades específicas para cada tipo de profissional, com interface adaptativa e dashboard personalizado.

## 🎯 Público-Alvo Atual

### Profissionais Suportados
1. **Fonoaudiólogos** - Cor: Verde (`#43a047`)
2. **Psicólogos** - Cor: Azul (`#1e88e5`) 
3. **Psiquiatras** - Cor: Vermelho (`#e53935`)
4. **Pedagogos** - Cor: Amarelo (`#fbc02d`) - NOVO
5. **Psicopedagogos** - Cor: Roxo (`#9c27b0`) - NOVO

### Funcionalidades por Profissional

#### Fonoaudiólogos
- Dashboard com foco em sessões de fonoaudiologia
- Gestão de pacientes com atraso de fala
- Relatórios de progresso da fala
- Agenda de sessões
- Ações rápidas: Nova Sessão, Avaliação, Relatórios, Apps

#### Psicólogos
- Dashboard com foco em sessões de psicologia
- Gestão de pacientes com aspectos psicológicos
- Relatórios de desenvolvimento emocional
- Agenda de sessões
- Ações rápidas: Nova Sessão, Avaliação, Relatórios, Apps

#### Psiquiatras
- Dashboard com foco em consultas psiquiátricas
- Gestão de medicações e prescrições
- Relatórios de evolução clínica
- Biblioteca de medicamentos
- Sistema de prescrições
- Ações rápidas: Nova Consulta, Medicações, Prescrições, Apps

#### Pedagogos (NOVO)
- Dashboard com foco em desenvolvimento educacional
- Gestão de alunos com dificuldades de aprendizagem
- Relatórios de progresso educacional
- Sessões pedagógicas adaptativas
- Ações rápidas: Nova Sessão, Avaliação, Relatórios, Apps

#### Psicopedagogos (NOVO)
- Dashboard com foco em superação de dificuldades
- Gestão de pacientes com dificuldades de aprendizagem
- Relatórios de superação de dificuldades
- Sessões psicopedagógicas especializadas
- Ações rápidas: Nova Sessão, Avaliação, Relatórios, Apps

## 🏗️ Arquitetura da Aplicação

### Tecnologias Utilizadas
- **Frontend**: React 19.1.1 com TypeScript
- **Build Tool**: Vite 7.1.2
- **Roteamento**: React Router DOM 7.8.2
- **Estilização**: Tailwind CSS 3.4.17
- **Ícones**: Lucide React 0.541.0
- **Gráficos**: Recharts 3.1.2
- **Formulários**: React Hook Form 7.62.0

### Estrutura de Pastas
```
Pro/src/
├── components/           # Componentes reutilizáveis
│   ├── common/          # Componentes comuns
│   ├── dashboardComponents/ # Componentes específicos do dashboard
│   └── morph/           # Componentes morfos adaptativos (NOVO)
├── contexts/            # Contextos React
├── hooks/               # Hooks customizados (NOVO)
├── layouts/             # Layouts da aplicação
├── pages/               # Páginas/rotas
├── services/            # Serviços e APIs
├── styles/              # Estilos globais
└── types/               # Definições TypeScript
```

## 📋 Regras de Negócio
- [Regras de Negócio PRO](./regras-negocio-pro.md) - Documentação completa das regras de negócio por profissional

## 🚧 Páginas Pendentes
- [Páginas Pendentes](./paginas-pendentes.md) - Lista de páginas não desenvolvidas completamente

## 🧩 Componentes Morfos
- [Componentes Morfos](./componentes-morfos.md) - Componentes adaptativos por profissional

## ✅ Implementações Realizadas
- [Implementações Realizadas](./implementacoes-realizadas.md) - Documentação completa das implementações

## 📱 Páginas Implementadas

### Páginas Públicas
1. **LoginPage** - Sistema de autenticação com credenciais de teste
2. **RequestAccessPage** - Solicitação de acesso ao sistema
3. **ForgotPasswordPage** - Recuperação de senha

### Páginas Internas (Com Navbar)
1. **DashboardPage** - Dashboard principal adaptativo por profissional
2. **AppsManagementPage** - Gerenciamento de aplicações
3. **NewSessionPage** - Criação de nova sessão
4. **AssessmentsPage** - Página de avaliações
5. **ReportsPage** - Relatórios gerais
6. **DetailedReportsPage** - Relatórios detalhados
7. **MedicationsPage** - Gestão de medicações (Psiquiatras)
8. **PrescriptionsPage** - Gestão de prescrições (Psiquiatras)
9. **FullCalendarPage** - Calendário completo
10. **PatientsPage** - Gestão de pacientes/alunos (NOVA)
11. **SessionsPage** - Gestão de sessões/consultas (NOVA)
12. **ProfilePage** - Perfil do usuário (NOVA)

### Páginas Placeholder (Em Desenvolvimento)
- `/assessments/new` - Nova Avaliação
- `/assessments/:id` - Detalhes da Avaliação
- `/reports/generate` - Gerar Relatório
- `/reports/:id` - Visualizar Relatório
- `/medications/new` - Nova Prescrição
- `/medications/:id` - Editar Medicação
- `/prescriptions/new` - Nova Prescrição
- `/prescriptions/:id` - Visualizar Prescrição
- `/patients` - Página de Pacientes
- `/sessions` - Página de Sessões
- `/settings` - Página de Configurações
- `/contact` - Página de Contato
- `/profile` - Página de Perfil

## 🎨 Sistema de Design

### Paleta de Cores
```css
:root {
  --blue: #1e88e5;           /* Cor principal / Psicólogos */
  --green: #43a047;          /* Fonoaudiólogos */
  --red: #e53935;            /* Psiquiatras */
  --yellow: #fbc02d;         /* Pedagogos */
  --purple: #9c27b0;         /* Psicopedagogos (NOVO) */
  --background-blue: #054776; /* Fundo escuro */
  --background-white: #f4f6ff; /* Fundo claro */
  --text-black: #3c3c3c;     /* Texto escuro */
  --text-white: #ffffff;     /* Texto claro */
}
```

### Componentes Principais

#### 1. ProfessionalContext
- Gerencia o estado global do tipo de profissional
- Controla dados do usuário logado
- Adapta interface baseada no tipo de profissional

#### 2. InternalNavbar
- Barra de navegação superior
- Seletor de tipo de profissional
- Informações do usuário logado
- Navegação principal

#### 3. Dashboard Components
- **QuickActions**: Ações rápidas adaptativas
- **DataSummary**: Resumo de dados com estatísticas
- **WeeklySchedule**: Agenda semanal
- **ProgressSection**: Seção de progresso com gráficos

#### 4. Componentes Morfos (NOVOS)
- **ProfessionalCard**: Card adaptativo para profissionais
- **SessionCard**: Card para sessões com cores específicas
- **ReportCard**: Card para relatórios por especialidade
- **AlertCard**: Card para alertas e notificações
- **DashboardWidget**: Widget adaptativo para dashboards

#### 5. Hooks Customizados (NOVOS)
- **useProfessionalColors**: Sistema de cores adaptativo
- **useProfessionalActions**: Ações específicas por profissional
- **useProfessionalMetrics**: Métricas personalizadas por área

## 🔐 Sistema de Autenticação

### Usuários Mockados
```typescript
// Fonoaudiólogo
{
  email: 'fono@teste.com',
  password: '123456',
  name: 'Dra. Maria Silva',
  type: 'fonoaudiologo',
  license: 'CRFa 12345',
  specialty: 'Fonoaudiologia Infantil'
}

// Psicólogo
{
  email: 'psico@teste.com',
  password: '123456',
  name: 'Dr. João Santos',
  type: 'psicologo',
  license: 'CRP 67890',
  specialty: 'Psicologia Infantil'
}

// Psiquiatra
{
  email: 'psiqui@teste.com',
  password: '123456',
  name: 'Dra. Ana Costa',
  type: 'psiquiatra',
  license: 'CRM 54321',
  specialty: 'Psiquiatria Infantil'
}

// Pedagogo (NOVO)
{
  email: 'pedagogo@teste.com',
  password: '123456',
  name: 'Prof. Maria Santos',
  type: 'pedagogo',
  license: 'CREF 12345',
  specialty: 'Pedagogia Infantil'
}

// Psicopedagogo (NOVO)
{
  email: 'psicopedagogo@teste.com',
  password: '123456',
  name: 'Dra. Ana Costa',
  type: 'psicopedagogo',
  license: 'CRP 67890',
  specialty: 'Psicopedagogia Clínica'
}
```

### Funcionalidades de Autenticação
- Login com validação
- Persistência de sessão (localStorage)
- Logout seguro
- Credenciais de teste visíveis na tela de login

## 📊 Dashboard Adaptativo

### Estrutura do Dashboard
1. **Ações Rápidas** (Topo)
   - Botões adaptativos por tipo de profissional
   - Navegação direta para funcionalidades principais

2. **Layout Principal** (Centro)
   - **Resumo de Dados** (Esquerda - 1/4 da tela)
     - Estatísticas específicas por profissional
     - Indicadores de performance
   - **Agenda Semanal** (Direita - 3/4 da tela)
     - Compromissos da semana
     - Status das sessões
     - Link para calendário completo

3. **Seção de Progresso** (Abaixo)
   - Gráficos de progresso dos pacientes
   - Dados de sessões por período
   - Visualizações adaptativas

### Dados Mockados
- **Progresso**: Dados mensais de progresso
- **Sessões**: Dados semanais de sessões
- **Compromissos**: Lista de compromissos com status
- **Estatísticas**: Dados específicos por profissional

## 🧩 Componentes Reutilizáveis

### Common Components
- **FillButton**: Botão com estilo preenchido
- **ChartCarousel**: Carrossel de gráficos
- **ProfessionalTypeSelector**: Seletor de tipo de profissional
- **WeeklyCalendar**: Calendário semanal

### Dashboard Components
- **DataSummary**: Resumo de dados com estatísticas
- **ProgressSection**: Seção de progresso
- **QuickActions**: Ações rápidas
- **WeeklySchedule**: Agenda semanal

## 📋 Tipos TypeScript

### ProfessionalType
```typescript
type ProfessionalType = 'fonoaudiologo' | 'psicologo' | 'psiquiatra';
```

### Interfaces Principais
- **Professional**: Dados do profissional
- **Patient**: Dados do paciente
- **Session**: Dados da sessão
- **Report**: Dados do relatório
- **Activity**: Dados da atividade

## 🚀 Funcionalidades Implementadas

### ✅ Completas
- Sistema de autenticação
- Dashboard adaptativo por profissional
- Navegação completa
- Componentes reutilizáveis
- Sistema de cores por profissional
- Layout responsivo
- Dados mockados integrados

### 🔄 Em Desenvolvimento
- Páginas de detalhes (placeholders)
- Funcionalidades específicas por profissional
- Integração com dados MOCAP
- Sistema de relatórios avançado

### ❌ Pendentes
- Gestão completa de pacientes
- Sistema de sessões detalhado
- Relatórios exportáveis
- Configurações do usuário
- Sistema de notificações

## 🎯 Próximos Passos

### Expansão para Novos Profissionais
- **Pedagogos**: Foco em desenvolvimento educacional
- **Psicopedagogos**: Foco em dificuldades de aprendizagem

### Melhorias Planejadas
- Integração com dados MOCAP
- Sistema de relatórios avançado
- Funcionalidades específicas por profissional
- Melhorias de UX/UI
- Sistema de notificações

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações
- Layout flexível para diferentes tamanhos
- Componentes responsivos
- Navegação adaptativa
- Gráficos responsivos

## 🔧 Configuração de Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run lint     # Linting do código
npm run preview  # Preview do build
```

### Variáveis de Ambiente
- Configurações de API (futuro)
- Configurações de autenticação
- Configurações de ambiente

## 📈 Métricas de Performance

### Dados Mockados por Profissional
- **Fonoaudiólogos**: 24 pacientes, 156 sessões
- **Psicólogos**: 18 pacientes, 89 sessões  
- **Psiquiatras**: 32 pacientes, 124 consultas

### Indicadores de Progresso
- Progresso mensal dos pacientes
- Tendências de crescimento
- Eficiência das sessões
- Satisfação dos profissionais
