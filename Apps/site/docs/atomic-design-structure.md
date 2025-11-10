# Atomic Design Structure - Site Institucional FalaAtípica

## Visão Geral

O site institucional do FalaAtípica foi desenvolvido seguindo a metodologia **Atomic Design**, criada por Brad Frost. Esta abordagem modular permite criar interfaces consistentes, escaláveis e fáceis de manter.

---

## Estrutura de Componentes

### Átomos (Atoms)
Componentes básicos e indivisíveis da interface. São os blocos de construção fundamentais.

**Localização:** `site/src/components/atoms/`

- **Button** - Botões com variações de estilo (primary, secondary, outline) e tamanhos
- **Heading** - Títulos com 6 níveis (h1-h6) e cores customizáveis
- **Text** - Textos com diferentes tamanhos, pesos e cores
- **Container** - Wrapper para centralizar conteúdo com diferentes max-widths

### Moléculas (Molecules)
Combinações de átomos que formam componentes mais complexos com funcionalidade específica.

**Localização:** `site/src/components/molecules/`

- **Model3D** - Componente Three.js que renderiza e anima o modelo 3D GLB
- **Model3DViewer** - Canvas Three.js com iluminação e ambiente configurado
- **StatCard** - Card de estatística com valor, descrição, cor e ícone
- **AppCard** - Card de aplicativo com informações sobre KIDS, TUTORS ou PRO

### Organismos (Organisms)
Componentes complexos formados por moléculas e átomos, representando seções completas da página.

**Localização:** `site/src/components/organisms/`

- **HeroSection** - Seção inicial com texto à esquerda e modelo 3D à direita
- **AboutSection** - Seção sobre o projeto e origem acadêmica
- **EcosystemSection** - Seção com os três aplicativos do ecossistema
- **ChallengesSection** - Seção com estatísticas de desafios e oportunidades
- **MethodologySection** - Seção sobre metodologias e fundamentação
- **AchievementsSection** - Seção com conquistas e reconhecimento
- **ImpactSection** - Seção sobre impacto social e educacional
- **FutureSection** - Seção sobre próximos passos e CTA final
- **FooterSection** - Rodapé com informações institucionais

### Templates
Composições de organismos que formam layouts completos de páginas.

**Localização:** `site/src/components/templates/`

- **LandingPageTemplate** - Template completo da landing page com todas as seções

### Pages
Páginas finais que utilizam os templates com conteúdo real.

**Localização:** `site/src/app/`

- **page.tsx** - Homepage utilizando o LandingPageTemplate
- **apresentacao/page.tsx** - Página de apresentação (já existente)

---

## Tecnologias Utilizadas

### Core
- **Next.js 15.5.5** - Framework React
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática

### 3D Rendering
- **Three.js** - Biblioteca para renderização 3D
- **@react-three/fiber 8.15.0** - Wrapper React para Three.js
- **@react-three/drei 9.88.0** - Helpers e componentes utilitários

### Styling
- **Tailwind CSS 3.4.1** - Framework de CSS utility-first
- **PostCSS 8.5.6** - Processador de CSS

---

## Modelo 3D

### Arquivo
- **Localização:** `site/public/blender/falaatipica3d.glb`
- **Formato:** GLB (GL Transmission Format Binary)
- **Animação:** Rotação suave e contínua no eixo Y

### Configuração
- **Scale:** 2x do tamanho original
- **Rotação:** 0.005 radianos por frame (~0.29 graus/frame)
- **Iluminação:** Ambiente + Direcional + Pontual
- **Ambiente:** Preset "city" para reflexos realistas

---

## Paleta de Cores (Projeto)

```css
/* Cores Primárias */
--azul: #1e88e5
--verde: #43a047
--vermelho: #e53935
--amarelo: #fbc02d

/* Cores de Fundo */
--fundo-azul: #054776
--fundo-branco: #f4f6ff

/* Cores de Texto */
--texto-escuro: #3c3c3c
--texto-claro: #ffffff
```

---

## Responsividade

### Breakpoints Tailwind CSS
- **Mobile:** `< 768px` (padrão)
- **Tablet:** `md: >= 768px`
- **Desktop:** `lg: >= 1024px`
- **Large Desktop:** `xl: >= 1280px`

### Abordagem
- **Mobile First** - Design otimizado primeiro para mobile
- **Progressive Enhancement** - Melhorias graduais para telas maiores

---

## Boas Práticas Implementadas

### Componentização
- Cada componente tem uma única responsabilidade
- Props tipadas com TypeScript para segurança
- Componentes reutilizáveis e extensíveis

### Performance
- Preload do modelo 3D para carregamento mais rápido
- Suspense para carregamento assíncrono
- Otimização de imagens com Next.js Image

### Acessibilidade
- Hierarquia semântica de headings (h1-h6)
- Contraste adequado entre texto e fundo
- Tamanhos de fonte responsivos

### Manutenibilidade
- Estrutura clara e organizada por nível de complexidade
- Separação de concerns (apresentação vs. lógica)
- Documentação inline quando necessário

---

## Como Adicionar Novos Componentes

### 1. Identificar o Nível
Determine se o componente é um:
- **Átomo:** Componente básico indivisível
- **Molécula:** Combinação de átomos
- **Organismo:** Seção complexa da página
- **Template:** Layout completo

### 2. Criar o Arquivo
```bash
# Exemplo: Novo átomo
site/src/components/atoms/NovoAtomo.tsx

# Exemplo: Nova molécula
site/src/components/molecules/NovaMolecula.tsx
```

### 3. Estrutura do Componente
```tsx
import React from 'react'

interface NovoComponenteProps {
  // Props tipadas
}

export const NovoComponente: React.FC<NovoComponenteProps> = ({
  // Destructuring de props
}) => {
  return (
    // JSX do componente
  )
}
```

### 4. Exportar no Index
```typescript
// site/src/components/atoms/index.ts
export { NovoComponente } from './NovoComponente'
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Servidor de produção
npm start

# Linter
npm run lint
```

---

## Estrutura de Diretórios

```
site/
├── src/
│   ├── app/                      # Pages (Next.js App Router)
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Homepage
│   │   └── apresentacao/        # Página de apresentação
│   ├── components/
│   │   ├── atoms/               # Átomos
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   ├── molecules/           # Moléculas
│   │   │   ├── Model3D.tsx
│   │   │   ├── Model3DViewer.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── AppCard.tsx
│   │   │   └── index.ts
│   │   ├── organisms/           # Organismos
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── EcosystemSection.tsx
│   │   │   ├── ChallengesSection.tsx
│   │   │   ├── MethodologySection.tsx
│   │   │   ├── AchievementsSection.tsx
│   │   │   ├── ImpactSection.tsx
│   │   │   ├── FutureSection.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   └── index.ts
│   │   └── templates/           # Templates
│   │       └── LandingPageTemplate.tsx
│   └── app/
│       └── globals.css          # Estilos globais
├── public/
│   ├── blender/
│   │   └── falaatipica3d.glb   # Modelo 3D
│   └── images/
│       ├── falaatipica-logo.png
│       └── falaatipica-logo-letras.png
├── docs/
│   ├── conteudo-landing-page.md
│   └── atomic-design-structure.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

---

**Desenvolvido com Atomic Design para o projeto FalaAtípica**


## Visão Geral

O site institucional do FalaAtípica foi desenvolvido seguindo a metodologia **Atomic Design**, criada por Brad Frost. Esta abordagem modular permite criar interfaces consistentes, escaláveis e fáceis de manter.

---

## Estrutura de Componentes

### Átomos (Atoms)
Componentes básicos e indivisíveis da interface. São os blocos de construção fundamentais.

**Localização:** `site/src/components/atoms/`

- **Button** - Botões com variações de estilo (primary, secondary, outline) e tamanhos
- **Heading** - Títulos com 6 níveis (h1-h6) e cores customizáveis
- **Text** - Textos com diferentes tamanhos, pesos e cores
- **Container** - Wrapper para centralizar conteúdo com diferentes max-widths

### Moléculas (Molecules)
Combinações de átomos que formam componentes mais complexos com funcionalidade específica.

**Localização:** `site/src/components/molecules/`

- **Model3D** - Componente Three.js que renderiza e anima o modelo 3D GLB
- **Model3DViewer** - Canvas Three.js com iluminação e ambiente configurado
- **StatCard** - Card de estatística com valor, descrição, cor e ícone
- **AppCard** - Card de aplicativo com informações sobre KIDS, TUTORS ou PRO

### Organismos (Organisms)
Componentes complexos formados por moléculas e átomos, representando seções completas da página.

**Localização:** `site/src/components/organisms/`

- **HeroSection** - Seção inicial com texto à esquerda e modelo 3D à direita
- **AboutSection** - Seção sobre o projeto e origem acadêmica
- **EcosystemSection** - Seção com os três aplicativos do ecossistema
- **ChallengesSection** - Seção com estatísticas de desafios e oportunidades
- **MethodologySection** - Seção sobre metodologias e fundamentação
- **AchievementsSection** - Seção com conquistas e reconhecimento
- **ImpactSection** - Seção sobre impacto social e educacional
- **FutureSection** - Seção sobre próximos passos e CTA final
- **FooterSection** - Rodapé com informações institucionais

### Templates
Composições de organismos que formam layouts completos de páginas.

**Localização:** `site/src/components/templates/`

- **LandingPageTemplate** - Template completo da landing page com todas as seções

### Pages
Páginas finais que utilizam os templates com conteúdo real.

**Localização:** `site/src/app/`

- **page.tsx** - Homepage utilizando o LandingPageTemplate
- **apresentacao/page.tsx** - Página de apresentação (já existente)

---

## Tecnologias Utilizadas

### Core
- **Next.js 15.5.5** - Framework React
- **React 18** - Biblioteca de interface
- **TypeScript** - Tipagem estática

### 3D Rendering
- **Three.js** - Biblioteca para renderização 3D
- **@react-three/fiber 8.15.0** - Wrapper React para Three.js
- **@react-three/drei 9.88.0** - Helpers e componentes utilitários

### Styling
- **Tailwind CSS 3.4.1** - Framework de CSS utility-first
- **PostCSS 8.5.6** - Processador de CSS

---

## Modelo 3D

### Arquivo
- **Localização:** `site/public/blender/falaatipica3d.glb`
- **Formato:** GLB (GL Transmission Format Binary)
- **Animação:** Rotação suave e contínua no eixo Y

### Configuração
- **Scale:** 2x do tamanho original
- **Rotação:** 0.005 radianos por frame (~0.29 graus/frame)
- **Iluminação:** Ambiente + Direcional + Pontual
- **Ambiente:** Preset "city" para reflexos realistas

---

## Paleta de Cores (Projeto)

```css
/* Cores Primárias */
--azul: #1e88e5
--verde: #43a047
--vermelho: #e53935
--amarelo: #fbc02d

/* Cores de Fundo */
--fundo-azul: #054776
--fundo-branco: #f4f6ff

/* Cores de Texto */
--texto-escuro: #3c3c3c
--texto-claro: #ffffff
```

---

## Responsividade

### Breakpoints Tailwind CSS
- **Mobile:** `< 768px` (padrão)
- **Tablet:** `md: >= 768px`
- **Desktop:** `lg: >= 1024px`
- **Large Desktop:** `xl: >= 1280px`

### Abordagem
- **Mobile First** - Design otimizado primeiro para mobile
- **Progressive Enhancement** - Melhorias graduais para telas maiores

---

## Boas Práticas Implementadas

### Componentização
- Cada componente tem uma única responsabilidade
- Props tipadas com TypeScript para segurança
- Componentes reutilizáveis e extensíveis

### Performance
- Preload do modelo 3D para carregamento mais rápido
- Suspense para carregamento assíncrono
- Otimização de imagens com Next.js Image

### Acessibilidade
- Hierarquia semântica de headings (h1-h6)
- Contraste adequado entre texto e fundo
- Tamanhos de fonte responsivos

### Manutenibilidade
- Estrutura clara e organizada por nível de complexidade
- Separação de concerns (apresentação vs. lógica)
- Documentação inline quando necessário

---

## Como Adicionar Novos Componentes

### 1. Identificar o Nível
Determine se o componente é um:
- **Átomo:** Componente básico indivisível
- **Molécula:** Combinação de átomos
- **Organismo:** Seção complexa da página
- **Template:** Layout completo

### 2. Criar o Arquivo
```bash
# Exemplo: Novo átomo
site/src/components/atoms/NovoAtomo.tsx

# Exemplo: Nova molécula
site/src/components/molecules/NovaMolecula.tsx
```

### 3. Estrutura do Componente
```tsx
import React from 'react'

interface NovoComponenteProps {
  // Props tipadas
}

export const NovoComponente: React.FC<NovoComponenteProps> = ({
  // Destructuring de props
}) => {
  return (
    // JSX do componente
  )
}
```

### 4. Exportar no Index
```typescript
// site/src/components/atoms/index.ts
export { NovoComponente } from './NovoComponente'
```

---

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Servidor de produção
npm start

# Linter
npm run lint
```

---

## Estrutura de Diretórios

```
site/
├── src/
│   ├── app/                      # Pages (Next.js App Router)
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Homepage
│   │   └── apresentacao/        # Página de apresentação
│   ├── components/
│   │   ├── atoms/               # Átomos
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   ├── Text.tsx
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   ├── molecules/           # Moléculas
│   │   │   ├── Model3D.tsx
│   │   │   ├── Model3DViewer.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── AppCard.tsx
│   │   │   └── index.ts
│   │   ├── organisms/           # Organismos
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── EcosystemSection.tsx
│   │   │   ├── ChallengesSection.tsx
│   │   │   ├── MethodologySection.tsx
│   │   │   ├── AchievementsSection.tsx
│   │   │   ├── ImpactSection.tsx
│   │   │   ├── FutureSection.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   └── index.ts
│   │   └── templates/           # Templates
│   │       └── LandingPageTemplate.tsx
│   └── app/
│       └── globals.css          # Estilos globais
├── public/
│   ├── blender/
│   │   └── falaatipica3d.glb   # Modelo 3D
│   └── images/
│       ├── falaatipica-logo.png
│       └── falaatipica-logo-letras.png
├── docs/
│   ├── conteudo-landing-page.md
│   └── atomic-design-structure.md
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

---

**Desenvolvido com Atomic Design para o projeto FalaAtípica**

