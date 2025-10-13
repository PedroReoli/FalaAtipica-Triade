# Aplicação KIDS - FalaAtípica

## Visão Geral
Aplicação React Native desenvolvida especificamente para crianças com atraso de fala, focada em proporcionar uma experiência lúdica e educativa com mínima interação.

## Público-Alvo
- **Faixa etária**: 3-12 anos
- **Características**: Crianças com atraso de fala
- **Necessidades**: Estimulação lúdica e educativa
- **Interação**: Mínima, focada em jogos

## Objetivos
- Estimular o desenvolvimento da fala através de atividades lúdicas
- Proporcionar feedback positivo e motivador
- Manter a atenção e interesse da criança
- Facilitar o aprendizado através de jogos

## Tecnologias
- **Framework**: React Native
- **Linguagem**: TypeScript
- **Navegação**: React Navigation
- **Estilização**: Tailwind CSS
- **Dados**: MOCAP/KIDS (fase inicial) → Supabase (fase final)

## Estrutura do Projeto
```
Kids/
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── common/        # Componentes comuns
│   │   ├── games/         # Componentes específicos dos jogos
│   │   └── layout/        # Componentes de layout
│   ├── screens/           # Telas da aplicação
│   ├── navigation/        # Configuração de navegação
│   ├── services/          # Serviços de dados
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Funções utilitárias
│   ├── types/             # Tipos TypeScript
│   └── styles/            # Estilos globais
├── assets/                # Imagens, sons, etc.
├── android/               # Configuração Android
├── ios/                   # Configuração iOS
└── package.json
```

## Telas Implementadas

### 1. Tela de Início
- **Objetivo**: Primeira tela que a criança vê
- **Elementos**: Logo, botão de início, cores da paleta
- **Interação**: Toque simples para começar

### 2. Tela de Login
- **Objetivo**: Autenticação da criança
- **Elementos**: Campo de nome/usuário, senha simples, botão de entrar
- **Interação**: Formulário simples

### 3. Solicitar Acesso (Parte 1)
- **Objetivo**: Primeira etapa do cadastro
- **Elementos**: Nome da criança, idade, responsável
- **Interação**: Formulário de dados básicos

### 4. Solicitar Acesso (Parte 2)
- **Objetivo**: Segunda etapa do cadastro
- **Elementos**: Dados de contato, informações do fonoaudiólogo, termos
- **Interação**: Finalização do cadastro

### 5. Dashboard Inicial
- **Objetivo**: Tela principal com jogos
- **Elementos**: Cartões de jogos, progresso visual, conquistas
- **Interação**: Toque nos cartões para jogar

### 6. Categorias
- **Objetivo**: Lista de categorias de jogos
- **Elementos**: Grid de categorias, ícones coloridos, nomes
- **Interação**: Toque para ver itens da categoria

### 7. Itens da Categoria
- **Objetivo**: Lista de itens/jogos da categoria
- **Elementos**: Lista de itens, imagens, status de conclusão
- **Interação**: Toque para jogar

### 8. Jogo "Adivinha"
- **Objetivo**: Jogo de adivinhação
- **Elementos**: Imagem ou som, opções de resposta, feedback
- **Interação**: Toque na resposta correta

### 9. Jogo "Jogo das Palavras"
- **Objetivo**: Jogo de formação de palavras
- **Elementos**: Letras disponíveis, área de formação, palavra objetivo
- **Interação**: Arrastar letras para formar palavras

## Jogos Implementados

### Jogo "Adivinha"
- **Mecânica**: Apresentar imagem/som e opções de resposta
- **Feedback**: Positivo para acertos, encorajador para erros
- **Dificuldade**: Progressiva por categoria
- **Pontuação**: Baseada em acertos e tempo

### Jogo "Jogo das Palavras"
- **Mecânica**: Arrastar letras para formar palavras
- **Feedback**: Visual e sonoro
- **Dificuldade**: Palavras simples para complexas
- **Pontuação**: Baseada em acertos e tentativas

## Dados Consumidos (MOCAP/KIDS)

### categories.json
- Lista de categorias de jogos
- Informações de dificuldade
- Cores e ícones

### items.json
- Itens/jogos por categoria
- Conteúdo específico de cada jogo
- Configurações de dificuldade

### progress.json
- Progresso da criança
- Pontuações e conquistas
- Histórico de atividades

### profiles.json
- Perfil da criança
- Dados pessoais
- Configurações

### games.json
- Dados específicos dos jogos
- Conteúdo e configurações
- Lógica de pontuação

### achievements.json
- Conquistas disponíveis
- Critérios de desbloqueio
- Recompensas

## Características de Design

### Paleta de Cores
- **Verde Escuro**: `#44624a` - Elementos principais
- **Verde Médio**: `#8ba888` - Elementos secundários
- **Verde Claro**: `#c0cfb2` - Destaques e hover
- **Bege**: `#f1ebe1` - Fundos e textos

### Interface
- **Elementos grandes**: Fáceis de tocar
- **Cores vibrantes**: Atraem atenção
- **Animações suaves**: Feedback visual
- **Som**: Feedback auditivo

### Acessibilidade
- **Tamanho mínimo**: 44px para elementos de toque
- **Contraste**: Adequado para crianças
- **Navegação**: Simples e intuitiva
- **Feedback**: Visual e sonoro

## Funcionalidades

### Sistema de Progresso
- Rastreamento de pontuação
- Conquistas desbloqueáveis
- Níveis de dificuldade
- Histórico de atividades

### Gamificação
- Conquistas visuais
- Sistema de pontos
- Progresso por categoria
- Motivação contínua

### Personalização
- Avatar da criança
- Preferências de jogo
- Configurações de som
- Dificuldade adaptativa

## Integração com Outras Aplicações

### Sincronização com TUTORS
- Dados de progresso compartilhados
- Conquistas visíveis para pais/responsáveis
- Relatórios automáticos
- Comunicação via MOCAP

### Preparação para PRO
- Estrutura de dados compatível
- Pontos de integração identificados
- Migração para Supabase planejada

## Critérios de Aceite

### Funcionalidade
- [ ] Todas as telas renderizadas
- [ ] Navegação funcional
- [ ] Jogos interativos
- [ ] Sistema de progresso

### Design
- [ ] Respeito à paleta de cores
- [ ] Interface amigável para crianças
- [ ] Elementos de toque adequados
- [ ] Feedback visual e sonoro

### Dados
- [ ] Consumo correto do MOCAP
- [ ] Sincronização de progresso
- [ ] Persistência de dados
- [ ] Validação de entrada

### Performance
- [ ] Carregamento rápido
- [ ] Animações suaves
- [ ] Sem travamentos
- [ ] Otimização para mobile

## Próximos Passos

### Fase 1 (Atual)
- Implementação das telas básicas
- Configuração de navegação
- Integração com MOCAP

### Fase 2
- Refinamento dos jogos
- Melhorias de UX
- Testes com usuários

### Fase 3
- Otimizações de performance
- Correções de bugs
- Preparação para produção

### Fase 4
- Migração para Supabase
- Integração completa
- Deploy para stores
