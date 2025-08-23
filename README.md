# FalaAtípica - Plataforma de Auxílio para Atraso de Fala

## Descrição
Sistema completo de auxílio para crianças com atraso de fala, desenvolvido como projeto de TCC. A plataforma consiste em três aplicações complementares, cada uma direcionada a um público específico e com funcionalidades adaptadas às suas necessidades.

## Visão Geral do Projeto

### Aplicação KIDS
- **Público**: Crianças com atraso de fala
- **Plataforma**: React Native com TypeScript
- **Foco**: Mínima interação, apenas jogos educativos
- **Objetivo**: Estimular o desenvolvimento da fala através de atividades lúdicas

### Aplicação TUTORS
- **Público**: Doutores/Fonoaudiólogos
- **Plataforma**: React Native com TypeScript
- **Foco**: Relatórios básicos e acompanhamento de conquistas
- **Objetivo**: Permitir que profissionais acompanhem o progresso das crianças

### Aplicação PRO
- **Público**: Profissionais avançados
- **Plataforma**: React com TypeScript
- **Foco**: Relatórios detalhados e contato direto com desenvolvimento
- **Objetivo**: Fornecer ferramentas avançadas para análise e acompanhamento

## Estrutura do Projeto
```
FalaAtipica-Triade/
├── Kids/                    # Aplicação para crianças
├── Pro/                     # Aplicação para profissionais avançados
├── Tutors/                  # Aplicação para doutores/fonoaudiólogos
├── MOCAP/                   # Dados mockados centralizados
│   ├── KIDS/               # Mocks específicos para Kids
│   ├── TUTORS/             # Mocks específicos para Tutors
│   └── PRO/                # Mocks específicos para Pro
├── docs/                    # Documentação completa
│   ├── RegraDeNegocios/    # Regras de negócio
│   ├── sprints/            # Documentação de sprints
│   ├── mockups/            # Mockups das telas
│   ├── api/                # Documentação da API
│   └── deployment/         # Guias de deploy
└── .gitattributes
```

## Paleta de Cores
**IMPORTANTE**: As cores da aplicação devem ser EXCLUSIVAMENTE as seguintes:
- **Verde Escuro**: `#44624a`
- **Verde Médio**: `#8ba888`
- **Verde Claro**: `#c0cfb2`
- **Bege**: `#f1ebe1`

## Tecnologias
- **Frontend Mobile**: React Native com TypeScript
- **Frontend Web**: React com TypeScript
- **Estilização**: Tailwind CSS
- **Navegação**: React Navigation (mobile)
- **Dados**: MOCAP (fase inicial) → Supabase (fase final)

## Fases de Desenvolvimento

### Fase 1: KIDS
- Implementação das telas em React Native
- Navegação completa
- Consumo de dados MOCAP/KIDS
- Jogos: "Adivinha" e "Jogo das Palavras"

### Fase 2: TUTORS
- Implementação das telas em React Native
- Navegação completa
- Consumo de dados MOCAP/TUTORS
- Relatórios básicos e progresso

### Fase 3: PRO
- Implementação das telas em React
- Navegação e placeholders
- Consumo de dados MOCAP/PRO
- Relatórios avançados

### Fase 4: Integração Supabase
- Substituição do MOCAP por Supabase
- Implementação de backend
- Sincronização entre aplicações

## Instalação
[Instruções de instalação serão adicionadas conforme o desenvolvimento]

## Desenvolvimento
[Instruções de desenvolvimento serão adicionadas conforme o desenvolvimento]

## Documentação
- **Regras de negócio**: `docs/RegraDeNegocios/`
- **Sprints**: `docs/sprints/`
- **Mockups**: `docs/mockups/`
- **API**: `docs/api/`
- **Deploy**: `docs/deployment/`
- **Configurações**: `cursor.rules`

## Critérios de Aceite
- Todas as telas renderizadas
- Navegação funcional
- Dados visíveis vindos do MOCAP
- Sem integrações reais (fase inicial)
- Acessibilidade básica implementada
- Respeito aos mockups fornecidos
