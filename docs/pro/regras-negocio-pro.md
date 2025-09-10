# Regras de Negócio - Aplicação PRO

## 🎯 Visão Geral das Regras de Negócio

A aplicação PRO segue um sistema de regras de negócio específicas que definem o que cada tipo de profissional pode acessar, como visualiza as informações e como as sessões são organizadas. Cada profissional tem acesso diferenciado baseado em sua especialidade e área de atuação.

## 👨‍⚕️ Regras por Tipo de Profissional

### 1. Fonoaudiólogos
**Cor**: Verde (`#43a047`)
**Especialidade**: Fonoaudiologia Infantil
**Foco**: Desenvolvimento da fala e comunicação

#### 🔐 Acesso e Permissões
- **Pacientes**: Acesso a crianças com atraso de fala
- **Sessões**: Gestão de sessões de fonoaudiologia
- **Relatórios**: Relatórios de progresso da fala
- **Avaliações**: Avaliações fonoaudiológicas
- **Apps**: Gerenciamento das aplicações KIDS e TUTORS

#### 📊 Dashboard Específico
- **Estatísticas**:
  - 24 pacientes ativos
  - 156 sessões realizadas
  - 78% de progresso médio
  - 42 relatórios gerados
- **Ações Rápidas**:
  - Nova Sessão de Fonoaudiologia
  - Avaliação Fonoaudiológica
  - Relatórios de Progresso
  - Gerenciar Apps

#### 🎯 Sessões de Fonoaudiologia
**Tipo**: `sessao_fonoaudiologia`
**Duração**: 45-60 minutos
**Frequência**: 1-2x por semana
**Objetivos**:
- Estimulação da fala
- Exercícios de articulação
- Desenvolvimento da linguagem
- Melhoria da comunicação

**Dados da Sessão**:
```typescript
interface SessaoFonoaudiologia {
  id: string;
  pacienteId: string;
  fonoaudiologoId: string;
  data: string;
  duracao: number; // 45-60 minutos
  atividades: AtividadeFonoaudiologia[];
  progresso: {
    articulacao: number; // 0-100
    vocabulario: number; // 0-100
    comunicacao: number; // 0-100
  };
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}
```

**Atividades Específicas**:
- Exercícios de articulação
- Jogos de linguagem
- Estimulação auditiva
- Práticas de comunicação

#### 📈 Relatórios Específicos
- **Relatório de Progresso da Fala**
- **Relatório de Articulação**
- **Relatório de Vocabulário**
- **Relatório de Comunicação**

### 2. Psicólogos
**Cor**: Azul (`#1e88e5`)
**Especialidade**: Psicologia Infantil
**Foco**: Desenvolvimento emocional e comportamental

#### 🔐 Acesso e Permissões
- **Pacientes**: Acesso a crianças com aspectos psicológicos
- **Sessões**: Gestão de sessões de psicologia
- **Relatórios**: Relatórios de desenvolvimento emocional
- **Avaliações**: Avaliações psicológicas
- **Apps**: Gerenciamento das aplicações KIDS e TUTORS

#### 📊 Dashboard Específico
- **Estatísticas**:
  - 18 pacientes ativos
  - 89 sessões realizadas
  - 82% de progresso médio
  - 31 avaliações realizadas
- **Ações Rápidas**:
  - Nova Sessão de Psicologia
  - Avaliação Psicológica
  - Relatórios de Desenvolvimento
  - Gerenciar Apps

#### 🎯 Sessões de Psicologia
**Tipo**: `sessao_psicologia`
**Duração**: 50-60 minutos
**Frequência**: 1x por semana
**Objetivos**:
- Desenvolvimento emocional
- Melhoria comportamental
- Fortalecimento da autoestima
- Desenvolvimento social

**Dados da Sessão**:
```typescript
interface SessaoPsicologia {
  id: string;
  pacienteId: string;
  psicologoId: string;
  data: string;
  duracao: number; // 50-60 minutos
  atividades: AtividadePsicologia[];
  progresso: {
    emocional: number; // 0-100
    comportamental: number; // 0-100
    social: number; // 0-100
    autoestima: number; // 0-100
  };
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}
```

**Atividades Específicas**:
- Terapia lúdica
- Jogos terapêuticos
- Atividades de expressão
- Exercícios de relaxamento

#### 📈 Relatórios Específicos
- **Relatório de Desenvolvimento Emocional**
- **Relatório Comportamental**
- **Relatório de Socialização**
- **Relatório de Autoestima**

### 3. Psiquiatras
**Cor**: Vermelho (`#e53935`)
**Especialidade**: Psiquiatria Infantil
**Foco**: Tratamento medicamentoso e acompanhamento clínico

#### 🔐 Acesso e Permissões
- **Pacientes**: Acesso a crianças com condições psiquiátricas
- **Consultas**: Gestão de consultas psiquiátricas
- **Medicações**: Gestão de medicações e prescrições
- **Relatórios**: Relatórios de evolução clínica
- **Apps**: Gerenciamento das aplicações KIDS e TUTORS

#### 📊 Dashboard Específico
- **Estatísticas**:
  - 32 pacientes ativos
  - 124 consultas realizadas
  - 67 prescrições ativas
  - 28 relatórios gerados
- **Ações Rápidas**:
  - Nova Consulta Psiquiátrica
  - Gerenciar Medicações
  - Ver Prescrições
  - Gerenciar Apps

#### 🎯 Consultas Psiquiátricas
**Tipo**: `consulta_psiquiatrica`
**Duração**: 30-45 minutos
**Frequência**: 1x por mês (ou conforme necessidade)
**Objetivos**:
- Avaliação clínica
- Ajuste de medicação
- Acompanhamento de evolução
- Orientação familiar

**Dados da Consulta**:
```typescript
interface ConsultaPsiquiatrica {
  id: string;
  pacienteId: string;
  psiquiatraId: string;
  data: string;
  duracao: number; // 30-45 minutos
  tipo: 'avaliacao' | 'retorno' | 'emergencia';
  sintomas: string[];
  medicações: Medicacao[];
  prescricoes: Prescricao[];
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}
```

**Funcionalidades Específicas**:
- Gestão de medicações
- Sistema de prescrições
- Acompanhamento de efeitos colaterais
- Biblioteca de medicamentos

#### 📈 Relatórios Específicos
- **Relatório de Evolução Clínica**
- **Relatório de Medicações**
- **Relatório de Prescrições**
- **Relatório de Efeitos Colaterais**

### 4. Pedagogos
**Cor**: Amarelo (`#fbc02d`)
**Especialidade**: Pedagogia Infantil
**Foco**: Desenvolvimento educacional e pedagógico

#### 🔐 Acesso e Permissões
- **Alunos**: Acesso a crianças em desenvolvimento educacional
- **Sessões**: Gestão de sessões pedagógicas
- **Relatórios**: Relatórios de progresso educacional
- **Avaliações**: Avaliações educacionais
- **Apps**: Gerenciamento das aplicações KIDS e TUTORS

#### 📊 Dashboard Específico
- **Estatísticas**:
  - 28 alunos ativos
  - 142 sessões realizadas
  - 85% de progresso educacional
  - 38 relatórios gerados
- **Ações Rápidas**:
  - Nova Sessão Pedagógica
  - Avaliação Educacional
  - Relatórios de Desenvolvimento
  - Gerenciar Apps

#### 🎯 Sessões Pedagógicas
**Tipo**: `sessao_pedagogica`
**Duração**: 40-50 minutos
**Frequência**: 2-3x por semana
**Objetivos**:
- Desenvolvimento cognitivo
- Alfabetização
- Habilidades motoras
- Socialização

**Dados da Sessão**:
```typescript
interface SessaoPedagogica {
  id: string;
  alunoId: string;
  pedagogoId: string;
  data: string;
  duracao: number; // 40-50 minutos
  atividades: AtividadePedagogica[];
  progresso: {
    cognitivo: number; // 0-100
    alfabetizacao: number; // 0-100
    motor: number; // 0-100
    social: number; // 0-100
  };
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}
```

**Atividades Específicas**:
- Exercícios de alfabetização
- Jogos educativos
- Atividades motoras
- Brincadeiras sociais

#### 📈 Relatórios Específicos
- **Relatório de Progresso Educacional**
- **Relatório de Alfabetização**
- **Relatório de Habilidades Motoras**
- **Relatório de Socialização**

### 5. Psicopedagogos
**Cor**: Roxo (`#9c27b0`)
**Especialidade**: Psicopedagogia Clínica
**Foco**: Dificuldades de aprendizagem e desenvolvimento

#### 🔐 Acesso e Permissões
- **Pacientes**: Acesso a crianças com dificuldades de aprendizagem
- **Sessões**: Gestão de sessões psicopedagógicas
- **Relatórios**: Relatórios de superação de dificuldades
- **Avaliações**: Avaliações de dificuldades
- **Apps**: Gerenciamento das aplicações KIDS e TUTORS

#### 📊 Dashboard Específico
- **Estatísticas**:
  - 22 pacientes ativos
  - 98 sessões realizadas
  - 78% de progresso
  - 29 avaliações realizadas
- **Ações Rápidas**:
  - Nova Sessão Psicopedagógica
  - Avaliação de Dificuldades
  - Relatórios de Aprendizagem
  - Gerenciar Apps

#### 🎯 Sessões Psicopedagógicas
**Tipo**: `sessao_psicopedagogica`
**Duração**: 45-55 minutos
**Frequência**: 1-2x por semana
**Objetivos**:
- Superação de dificuldades
- Desenvolvimento de estratégias
- Melhoria da aprendizagem
- Fortalecimento de habilidades

**Dados da Sessão**:
```typescript
interface SessaoPsicopedagogica {
  id: string;
  pacienteId: string;
  psicopedagogoId: string;
  data: string;
  duracao: number; // 45-55 minutos
  atividades: AtividadePsicopedagogica[];
  progresso: {
    leitura: number; // 0-100
    escrita: number; // 0-100
    matematica: number; // 0-100
    atencao: number; // 0-100
  };
  observacoes: string;
  status: 'agendada' | 'realizada' | 'cancelada';
}
```

**Atividades Específicas**:
- Exercícios de leitura
- Práticas de escrita
- Jogos matemáticos
- Exercícios de atenção

#### 📈 Relatórios Específicos
- **Relatório de Dificuldades de Aprendizagem**
- **Relatório de Superação**
- **Relatório de Estratégias**
- **Relatório de Habilidades**

## 🔄 Regras de Sincronização entre Aplicações

### KIDS App
- **Dados Sincronizados**: Progresso das atividades, conquistas, tempo de uso
- **Frequência**: Tempo real durante as sessões
- **Profissionais com Acesso**: Todos os tipos

### TUTORS App
- **Dados Sincronizados**: Relatórios de progresso, conquistas das crianças
- **Frequência**: Diária
- **Profissionais com Acesso**: Todos os tipos

### PRO App
- **Dados Sincronizados**: Dados completos de sessões, relatórios, avaliações
- **Frequência**: Tempo real
- **Profissionais com Acesso**: Apenas o profissional responsável

## 📊 Regras de Visualização de Dados

### Hierarquia de Acesso
1. **Profissional Responsável**: Acesso completo aos dados do paciente
2. **Equipe Multidisciplinar**: Acesso compartilhado (futuro)
3. **Supervisão**: Acesso de supervisão (futuro)

### Dados Compartilhados
- **Progresso Geral**: Visível para todos os profissionais
- **Dados Específicos**: Visível apenas para o profissional responsável
- **Relatórios**: Gerados por cada profissional
- **Avaliações**: Específicas por área de atuação

### Dados Privados
- **Observações Clínicas**: Apenas o profissional responsável
- **Medicações**: Apenas psiquiatras
- **Prescrições**: Apenas psiquiatras
- **Avaliações Específicas**: Apenas o profissional da área

## 🎯 Regras de Negócio Específicas

### RN001 - Acesso por Profissional
- Cada profissional tem acesso apenas aos seus pacientes
- Dados são filtrados por tipo de profissional
- Interface adapta-se automaticamente ao tipo

### RN002 - Sessões por Tipo
- Sessões são categorizadas por tipo de profissional
- Duração e frequência variam por especialidade
- Objetivos são específicos por área de atuação

### RN003 - Relatórios Específicos
- Cada profissional gera relatórios específicos
- Dados são relevantes para a área de atuação
- Métricas são adaptadas por especialidade

### RN004 - Sincronização de Dados
- Dados são sincronizados em tempo real
- Cada aplicação tem nível de acesso específico
- Profissionais têm acesso completo aos dados

### RN005 - Segurança e Privacidade
- Dados são protegidos por tipo de profissional
- Acesso é controlado por autenticação
- Informações sensíveis são privadas

### RN006 - Sistema de Cores por Área
- **Consistência**: Cada cor pertence a apenas uma área e não pode ser reutilizada em outro domínio
- **Hierarquia**: A cor da especialidade deve aparecer em elementos-chave (cabeçalhos, ícones, bordas, indicadores)
- **Clareza multidisciplinar**: Em contextos com mais de um profissional, a cor atua como selo de origem
- **Acessibilidade**: Cores sempre acompanhadas de ícones, títulos ou rótulos
- **Uso proporcional**: A cor deve ser usada como destaque pontual, não dominar toda a tela

### RN007 - Aplicação Visual por Especialidade

#### Fonoaudiologia (Verde #43a047)
- **Justificativa**: Vitalidade, crescimento e desenvolvimento orgânico
- **Dashboards**: Indicadores de articulação, vocabulário e comunicação em verde
- **Sessões**: Cards e agendas identificados em verde
- **Relatórios**: Capa e seções marcadas em verde
- **Alertas**: Lembretes e notificações com marcadores verdes

#### Psicologia (Azul #1e88e5)
- **Justificativa**: Tranquilidade, equilíbrio e confiança
- **Dashboards**: Widgets de autoestima, comportamento e socialização em azul
- **Sessões**: Registros de sessões psicológicas em cartões azuis
- **Relatórios**: Relatórios de desenvolvimento emocional com seções azuis
- **Alertas**: Notificações sobre avaliações vencidas em azul

#### Psiquiatria (Vermelho #e53935)
- **Justificativa**: Atenção, urgência e cuidado clínico
- **Dashboards**: Quadro de prescrições e evolução clínica em vermelho
- **Consultas**: Agendas e registros psiquiátricos em vermelho
- **Relatórios**: Relatórios clínicos com cabeçalhos vermelhos
- **Alertas**: Mensagens sobre medicação vencida e riscos em vermelho

#### Pedagogia e Psicopedagogia (Amarelo #fbc02d)
- **Justificativa**: Aprendizado, criatividade e energia
- **Dashboards**: Progresso em leitura, escrita e matemática em amarelo
- **Sessões**: Cards e agendas de sessões pedagógicas em amarelo
- **Relatórios**: Relatórios educacionais com seções amarelas
- **Alertas**: Notificações sobre acompanhamento escolar em amarelo

## 🔧 Implementação Técnica

### Filtros por Profissional
```typescript
// Exemplo de filtro por tipo de profissional
const getSessionsByProfessional = (professionalType: ProfessionalType) => {
  switch (professionalType) {
    case 'fonoaudiologo':
      return sessions.filter(s => s.type === 'sessao_fonoaudiologia');
    case 'psicologo':
      return sessions.filter(s => s.type === 'sessao_psicologia');
    case 'psiquiatra':
      return sessions.filter(s => s.type === 'consulta_psiquiatrica');
    case 'pedagogo':
      return sessions.filter(s => s.type === 'sessao_pedagogica');
    case 'psicopedagogo':
      return sessions.filter(s => s.type === 'sessao_psicopedagogica');
  }
};
```

### Interface Adaptativa
```typescript
// Exemplo de interface adaptativa
const getProfessionalInterface = (professionalType: ProfessionalType) => {
  return {
    color: getProfessionalColor(professionalType),
    actions: getProfessionalActions(professionalType),
    stats: getProfessionalStats(professionalType),
    reports: getProfessionalReports(professionalType)
  };
};
```

## 📋 Checklist de Regras de Negócio

### Acesso e Permissões
- [ ] Cada profissional tem acesso apenas aos seus pacientes
- [ ] Interface adapta-se automaticamente ao tipo de profissional
- [ ] Dados são filtrados por especialidade
- [ ] Segurança e privacidade são mantidas

### Sessões por Tipo
- [ ] Sessões são categorizadas por tipo de profissional
- [ ] Duração e frequência variam por especialidade
- [ ] Objetivos são específicos por área de atuação
- [ ] Dados são relevantes para cada especialidade

### Relatórios Específicos
- [ ] Cada profissional gera relatórios específicos
- [ ] Dados são relevantes para a área de atuação
- [ ] Métricas são adaptadas por especialidade
- [ ] Relatórios são exportáveis

### Sincronização
- [ ] Dados são sincronizados em tempo real
- [ ] Cada aplicação tem nível de acesso específico
- [ ] Profissionais têm acesso completo aos dados
- [ ] Sincronização é transparente para o usuário
