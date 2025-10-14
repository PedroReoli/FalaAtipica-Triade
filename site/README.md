# 🌐 Site Institucional - FalaAtípica

## 📋 Visão Geral

Site institucional do projeto FalaAtípica desenvolvido com Next.js, apresentando o sistema completo de auxílio para crianças com atraso de fala.

## 🚀 Tecnologias

- **Next.js 15.5.5** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React 18** - Biblioteca de interface

## 📁 Estrutura

```
site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Landing page
│   │   └── apresentacao/
│   │       └── page.tsx        # Página de apresentação
│   ├── components/
│   │   ├── Navbar.tsx          # Barra de navegação
│   │   └── PuzzleShapes.tsx    # Componentes de shapes puzzle
│   └── styles/
│       └── puzzle-shapes.css   # Estilos dos shapes puzzle
├── public/
│   └── images/                 # Imagens e logos
├── docs/
│   └── conteudo-landing-page.md # Documentação do conteúdo
└── README.md
```

## 🎨 Design System

### Cores
- **Azul**: `#1e88e5`
- **Verde**: `#43a047`
- **Vermelho**: `#e53935`
- **Amarelo**: `#fbc02d`
- **Fundo Azul**: `#054776`
- **Fundo Branco**: `#f4f6ff`
- **Texto**: `#3c3c3c`

### Shapes Puzzle
- 4 tipos de shapes CSS personalizados
- Animações: float, rotate, pulse
- Tamanhos: sm, md, lg, xl
- Cores: blue, green, red, yellow

## 📱 Páginas

### 1. Landing Page (`/`)
- Hero section com logo e CTA
- Seção "O Problema" com estatísticas
- Seção "Nossa Solução" com os 3 apps
- Seção "Como Funciona" com fluxo visual
- Seção "Tecnologias" com stack técnico
- Footer com links e informações

### 2. Apresentação (`/apresentacao`)
- 10 slides interativos
- Navegação por botões e teclado
- Indicador de progresso
- Conteúdo baseado na documentação PowerPoint

## 🎯 Funcionalidades

### Landing Page
- ✅ Navbar responsiva
- ✅ Hero section com CTA
- ✅ Seções informativas
- ✅ Shapes puzzle animados
- ✅ Design responsivo
- ✅ SEO otimizado

### Apresentação
- ✅ 10 slides completos
- ✅ Navegação interativa
- ✅ Controles por teclado
- ✅ Indicador de progresso
- ✅ Design consistente

## 🚀 Como Executar

### Instalação
```bash
cd site
npm install
```

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:3000

### Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## 📊 Conteúdo

### Landing Page
- **Hero**: Título principal e CTAs
- **Problema**: Estatísticas sobre autismo e atraso de fala
- **Solução**: Apresentação dos 3 aplicativos
- **Funcionamento**: Fluxo visual do sistema
- **Tecnologias**: Stack técnico utilizado

### Apresentação
1. **Capa** - Informações do projeto
2. **Problema** - Estatísticas e motivação
3. **Objetivo** - Propósito do sistema
4. **Arquitetura** - Visão geral dos apps
5. **Kids** - Demonstração do app infantil
6. **Tutors** - Demonstração do app para pais
7. **Pro** - Demonstração do app profissional
8. **API** - Sistema de sincronização
9. **Resultados** - Métricas e conquistas
10. **Próximos Passos** - Roadmap futuro

## 🎨 Elementos Visuais

### Shapes Puzzle
- **4 tipos**: Diferentes formas de peças
- **Animações**: Float, rotate, pulse
- **Responsivos**: Adaptam-se ao tamanho da tela
- **Decorativos**: Background e elementos visuais

### Responsividade
- **Mobile First**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1440px+

## 📝 Documentação

- `docs/conteudo-landing-page.md` - Estrutura e conteúdo da landing page
- `README.md` - Este arquivo
- Código comentado em português

## 🔗 Links

- **Home**: `/`
- **Apresentação**: `/apresentacao`
- **Sobre**: `#sobre`
- **Apps**: `#apps`

## 🎯 Objetivos

1. **Informar** sobre o problema do atraso de fala
2. **Apresentar** a solução (3 apps)
3. **Direcionar** para a apresentação completa
4. **Demonstrar** credibilidade técnica
5. **Gerar** interesse para apresentação

## 📈 Próximos Passos

- [ ] Testes de responsividade
- [ ] Otimizações de performance
- [ ] Animações mais suaves
- [ ] Integração com analytics
- [ ] Deploy em produção

---

**Desenvolvido com ❤️ para o projeto FalaAtípica**