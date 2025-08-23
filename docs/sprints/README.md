# Sprints - FalaAtípica

## Visão Geral
Este documento acompanha o desenvolvimento do projeto FalaAtípica através das sprints organizadas por fases.

## Fases do Projeto

### Fase 1: KIDS (React Native)
**Status**: Pendente
**Duração**: 2-3 sprints
**Objetivo**: Implementar aplicação KIDS completa

#### Sprint 1.1: Estrutura Base
- [ ] Setup do projeto React Native
- [ ] Configuração do TypeScript
- [ ] Estrutura de pastas
- [ ] Navegação básica
- [ ] Tela de Início
- [ ] Tela de Login

#### Sprint 1.2: Autenticação e Cadastro
- [ ] Tela de Solicitar Acesso (Parte 1)
- [ ] Tela de Solicitar Acesso (Parte 2)
- [ ] Dashboard inicial
- [ ] Cartões de jogos
- [ ] Integração com MOCAP/KIDS

#### Sprint 1.3: Jogos e Atividades
- [ ] Tela de Categorias
- [ ] Tela de Itens da categoria
- [ ] Jogo "Adivinha"
- [ ] Jogo "Jogo das Palavras"
- [ ] Sistema de progresso

### Fase 2: TUTORS (React Native)
**Status**: Pendente
**Duração**: 2-3 sprints
**Objetivo**: Implementar aplicação TUTORS completa

#### Sprint 2.1: Estrutura e Autenticação
- [ ] Setup do projeto React Native
- [ ] Configuração do TypeScript
- [ ] Tela de Início
- [ ] Tela de Login
- [ ] Tela de Redefinir Senha
- [ ] Solicitar Acesso (Parte 1 e 2)

#### Sprint 2.2: Dashboard e Funcionalidades
- [ ] Dashboard com funcionalidades
- [ ] Tela de Imagens e Sons
- [ ] Lista de categorias
- [ ] Lista de itens
- [ ] Integração com MOCAP/TUTORS

#### Sprint 2.3: Relatórios e Perfis
- [ ] Tela de Progresso
- [ ] Tela de Suporte
- [ ] Tela de Dicas
- [ ] Perfil do Usuário
- [ ] Perfil da Criança

### Fase 3: PRO (React)
**Status**: Pendente
**Duração**: 1-2 sprints
**Objetivo**: Implementar aplicação PRO básica

#### Sprint 3.1: Estrutura e Telas Básicas
- [ ] Setup do projeto React
- [ ] Configuração do TypeScript
- [ ] Tela de Login
- [ ] Home placeholder
- [ ] Seção de Sessões
- [ ] Integração com MOCAP/PRO

#### Sprint 3.2: Funcionalidades Avançadas
- [ ] Seção de Relatórios
- [ ] Seção de Configurações
- [ ] Contato com desenvolvimento
- [ ] Relatórios detalhados

### Fase 4: Integração Supabase
**Status**: Pendente
**Duração**: 2-3 sprints
**Objetivo**: Migrar de MOCAP para Supabase

#### Sprint 4.1: Setup do Backend
- [ ] Configuração do Supabase
- [ ] Estrutura do banco de dados
- [ ] APIs básicas
- [ ] Autenticação

#### Sprint 4.2: Migração de Dados
- [ ] Migração KIDS para Supabase
- [ ] Migração TUTORS para Supabase
- [ ] Migração PRO para Supabase
- [ ] Sincronização entre aplicações

#### Sprint 4.3: Testes e Otimização
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] Correção de bugs
- [ ] Deploy final

## Critérios de Aceite por Sprint

### Critérios Gerais
- [ ] Todas as telas renderizadas
- [ ] Navegação funcional
- [ ] Dados visíveis vindos do MOCAP
- [ ] Sem erros de runtime
- [ ] Acessibilidade básica implementada
- [ ] Respeito aos mockups fornecidos

### Critérios Específicos por Fase

#### Fase 1 (KIDS)
- [ ] Jogos funcionais e interativos
- [ ] Progresso sendo registrado
- [ ] Interface amigável para crianças
- [ ] Feedback positivo implementado

#### Fase 2 (TUTORS)
- [ ] Relatórios básicos funcionais
- [ ] Visualização de progresso das crianças
- [ ] Interface intuitiva para profissionais
- [ ] Dados sincronizados com KIDS

#### Fase 3 (PRO)
- [ ] Relatórios detalhados funcionais
- [ ] Interface avançada para profissionais
- [ ] Contato com desenvolvimento implementado
- [ ] Dados completos do sistema

#### Fase 4 (Supabase)
- [ ] Todas as aplicações funcionando com Supabase
- [ ] Sincronização em tempo real
- [ ] Performance otimizada
- [ ] Sistema pronto para produção

## Riscos e Mitigações

### Riscos Técnicos
- **Risco**: Complexidade do React Native
  - **Mitigação**: Começar com estrutura simples e evoluir

- **Risco**: Sincronização entre aplicações
  - **Mitigação**: Usar chaves comuns nos dados mockados

- **Risco**: Performance em dispositivos móveis
  - **Mitigação**: Otimizar imagens e dados

### Riscos de Prazo
- **Risco**: Tempo de desenvolvimento maior que estimado
  - **Mitigação**: Priorizar funcionalidades essenciais

- **Risco**: Mudanças nos requisitos
  - **Mitigação**: Manter documentação atualizada

## Métricas de Acompanhamento

### Velocidade da Equipe
- Story points por sprint
- Tarefas concluídas vs. planejadas
- Tempo médio por tarefa

### Qualidade
- Bugs encontrados por sprint
- Cobertura de testes
- Satisfação do usuário

### Progresso
- Porcentagem de conclusão por fase
- Milestones atingidos
- Entregas no prazo
