# Regras de Negócio - FalaAtípica

## Visão Geral
Este documento define as regras de negócio fundamentais do sistema FalaAtípica, uma plataforma de auxílio para crianças com atraso de fala.

## Público-Alvo

### 1. Crianças (KIDS)
- **Faixa etária**: 3-12 anos
- **Características**: Crianças com atraso de fala
- **Necessidades**: Estimulação lúdica e educativa
- **Interação**: Mínima, focada em jogos
- **Plataforma**: React Native com TypeScript

### 2. Pais/Responsáveis (TUTORS)
- **Perfil**: Pais e responsáveis pelas crianças
- **Necessidades**: Acompanhamento básico de progresso
- **Limitações**: Não são especialistas em tecnologia
- **Foco**: Relatórios simples e conquistas
- **Plataforma**: React Native com TypeScript

### 3. Profissionais da Saúde (PRO)
- **Perfil**: Fonoaudiólogos, Psicólogos e Psiquiatras
- **Necessidades**: Gestão completa de pacientes e sessões
- **Recursos**: Dashboard avançado, agenda, relatórios detalhados
- **Foco**: Ferramentas profissionais para acompanhamento clínico
- **Plataforma**: React com TypeScript
- **Funcionalidades Específicas**:
  - **Fonoaudiólogos**: Gestão de sessões de fonoaudiologia
  - **Psicólogos**: Gestão de sessões de psicologia
  - **Psiquiatras**: Gestão de consultas, medicações e prescrições

## Regras Principais

### RN001 - Hierarquia de Acesso
- **KIDS**: Acesso apenas aos jogos e atividades
- **TUTORS**: Acesso aos dados das crianças que acompanham (pais/responsáveis)
- **PRO**: Acesso completo ao sistema com funcionalidades específicas por especialidade

### RN002 - Dados das Crianças
- Cada criança deve ter um perfil único
- Dados devem ser sincronizados entre KIDS e TUTORS
- Progresso deve ser rastreado por categoria e item
- Conquistas devem ser visíveis para TUTORS

### RN003 - Jogos e Atividades
- Jogos devem ser adaptados à idade da criança
- Dificuldade deve ser progressiva
- Feedback deve ser positivo e motivador
- Atividades devem focar em desenvolvimento da fala

### RN004 - Relatórios
- **TUTORS**: Relatórios básicos e visuais
- **PRO**: Relatórios detalhados com métricas avançadas e funcionalidades específicas por especialidade
- Dados devem ser exportáveis
- Histórico deve ser mantido

### RN005 - Sistema de Cores
**PALETA OFICIAL DO PROJETO**:
- **Azul**: `#1e88e5` (cor principal)
- **Verde**: `#43a047` (fonoaudiólogos)
- **Vermelho**: `#e53935` (psiquiatras)
- **Amarelo**: `#fbc02d` (acessórios)
- **Azul Escuro**: `#054776` (fundo)
- **Branco**: `#f4f6ff` (fundo claro)
- **Preto**: `#3c3c3c` (texto)
- **Branco**: `#ffffff` (texto claro)

### RN006 - Acessibilidade
- Elementos de toque devem ter tamanho mínimo de 44px
- Contraste adequado entre texto e fundo
- Hierarquia visual clara
- Textos legíveis e apropriados para a idade

### RN007 - Sistema Modular PRO
- Interface adaptativa baseada no tipo de profissional
- Funcionalidades específicas por especialidade
- Dashboard personalizado com dados relevantes
- Sistema de cores diferenciado por profissional

## Fluxos de Negócio

### FBN001 - Cadastro de Criança
1. TUTORS solicita acesso
2. Sistema aprova solicitação
3. Criança é cadastrada no sistema
4. Perfil é criado com dados básicos
5. Acesso é liberado para KIDS

### FBN002 - Acompanhamento de Progresso
1. Criança joga em KIDS
2. Dados são registrados no sistema
3. TUTORS (pais/responsáveis) visualiza progresso
4. PRO analisa dados detalhados
5. Relatórios são gerados

### FBN003 - Gestão Profissional (PRO)
1. Profissional faz login no sistema
2. Sistema identifica tipo de profissional
3. Interface é adaptada à especialidade
4. Dashboard mostra dados relevantes
5. Funcionalidades específicas são disponibilizadas

### FBN004 - Gamificação
1. Criança completa atividades
2. Conquistas são desbloqueadas
3. Progresso é atualizado
4. TUTORS (pais/responsáveis) visualiza conquistas
5. Motivação é mantida

## Restrições Técnicas

### RT001 - Dados Mockados
- Fase inicial: Todos os dados vêm de MOCAP
- Estrutura deve permitir migração para Supabase
- Chaves comuns devem ser mantidas entre aplicações

### RT002 - Comunicação
- KIDS e TUTORS: Comunicação via dados compartilhados
- PRO: Sistema independente com funcionalidades avançadas
- Sincronização: Conceitual na fase inicial

### RT003 - Performance
- Aplicações devem carregar rapidamente
- Dados devem ser otimizados para mobile
- Interface deve ser responsiva

### RT004 - Sistema PRO
- Interface responsiva para desktop
- Navegação intuitiva entre funcionalidades
- Sistema de cores consistente
- Componentes reutilizáveis

## Validações

### V001 - Dados de Criança
- Nome obrigatório
- Idade entre 3 e 12 anos
- Responsável obrigatório
- Dados de contato válidos

### V002 - Acesso de TUTORS
- Credenciais válidas
- Aprovação de solicitação
- Limitação de acesso por criança (pais/responsáveis)

### V003 - Acesso de PRO
- Credenciais válidas
- Identificação do tipo de profissional
- Acesso às funcionalidades específicas da especialidade

### V004 - Jogos
- Dificuldade apropriada para idade
- Conteúdo adequado
- Feedback positivo

## Métricas de Sucesso

### MS001 - Engajamento
- Tempo de uso da aplicação KIDS
- Frequência de jogos
- Conquistas desbloqueadas

### MS002 - Progresso
- Melhoria na fala da criança
- Conclusão de atividades
- Evolução por categoria

### MS003 - Satisfação
- Feedback de TUTORS (pais/responsáveis)
- Uso contínuo da plataforma
- Recomendação para outros pais/responsáveis

### MS004 - Eficiência Profissional (PRO)
- Tempo de gestão de pacientes
- Qualidade dos relatórios gerados
- Satisfação dos profissionais
- Uso das funcionalidades específicas

## Funcionalidades Específicas por Profissional

### Fonoaudiólogos
- Dashboard com foco em sessões de fonoaudiologia
- Gestão de pacientes com atraso de fala
- Relatórios de progresso da fala
- Agenda de sessões

### Psicólogos
- Dashboard com foco em sessões de psicologia
- Gestão de pacientes com aspectos psicológicos
- Relatórios de desenvolvimento emocional
- Agenda de sessões

### Psiquiatras
- Dashboard com foco em consultas psiquiátricas
- Gestão de medicações e prescrições
- Relatórios de evolução clínica
- Biblioteca de medicamentos
- Sistema de prescrições
