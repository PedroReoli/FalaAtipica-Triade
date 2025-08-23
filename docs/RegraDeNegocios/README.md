# Regras de Negócio - FalaAtípica

## Visão Geral
Este documento define as regras de negócio fundamentais do sistema FalaAtípica, uma plataforma de auxílio para crianças com atraso de fala.

## Público-Alvo

### 1. Crianças (KIDS)
- **Faixa etária**: 3-12 anos
- **Características**: Crianças com atraso de fala
- **Necessidades**: Estimulação lúdica e educativa
- **Interação**: Mínima, focada em jogos

### 2. Doutores/Fonoaudiólogos (TUTORS)
- **Perfil**: Profissionais de fonoaudiologia
- **Necessidades**: Acompanhamento básico de progresso
- **Limitações**: Não são especialistas em tecnologia
- **Foco**: Relatórios simples e conquistas

### 3. Profissionais Avançados (PRO)
- **Perfil**: Profissionais com conhecimento técnico
- **Necessidades**: Relatórios detalhados e análise avançada
- **Recursos**: Contato direto com desenvolvimento
- **Foco**: Ferramentas avançadas de análise

## Regras Principais

### RN001 - Hierarquia de Acesso
- **KIDS**: Acesso apenas aos jogos e atividades
- **TUTORS**: Acesso aos dados das crianças que acompanham
- **PRO**: Acesso completo ao sistema e contato com desenvolvimento

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
- **PRO**: Relatórios detalhados com métricas avançadas
- Dados devem ser exportáveis
- Histórico deve ser mantido

### RN005 - Cores da Aplicação
**CRÍTICO**: Apenas as seguintes cores podem ser utilizadas:
- Verde Escuro: `#44624a`
- Verde Médio: `#8ba888`
- Verde Claro: `#c0cfb2`
- Bege: `#f1ebe1`

### RN006 - Acessibilidade
- Elementos de toque devem ter tamanho mínimo de 44px
- Contraste adequado entre texto e fundo
- Hierarquia visual clara
- Textos legíveis e apropriados para a idade

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
3. TUTORS visualiza progresso
4. PRO analisa dados detalhados
5. Relatórios são gerados

### FBN003 - Gamificação
1. Criança completa atividades
2. Conquistas são desbloqueadas
3. Progresso é atualizado
4. TUTORS visualiza conquistas
5. Motivação é mantida

## Restrições Técnicas

### RT001 - Dados Mockados
- Fase inicial: Todos os dados vêm de MOCAP
- Estrutura deve permitir migração para Supabase
- Chaves comuns devem ser mantidas entre aplicações

### RT002 - Comunicação
- KIDS e TUTORS: Comunicação via dados compartilhados
- PRO: Contato direto com desenvolvimento
- Sincronização: Conceitual na fase inicial

### RT003 - Performance
- Aplicações devem carregar rapidamente
- Dados devem ser otimizados para mobile
- Interface deve ser responsiva

## Validações

### V001 - Dados de Criança
- Nome obrigatório
- Idade entre 3 e 12 anos
- Responsável obrigatório
- Dados de contato válidos

### V002 - Acesso de TUTORS
- Credenciais válidas
- Aprovação de solicitação
- Limitação de acesso por criança

### V003 - Jogos
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
- Feedback de TUTORS
- Uso contínuo da plataforma
- Recomendação para outros profissionais
