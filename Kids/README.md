# FalaAtípica - KIDS App

## Descrição
Aplicação React Native para crianças com atraso de fala, desenvolvida como parte do TCC FalaAtípica.

## Funcionalidades Implementadas

### Telas Criadas
- **Splash Screen**: Tela inicial com logo e botões de acesso
- **Login Screen**: Tela de login com formulário
- **Dashboard**: Tela principal com os dois jogos
- **Categories**: Grid de categorias de alimentos
- **Guess Game**: Jogo de adivinhação
- **Request Access**: Tela para solicitar acesso

### Componentes
- **Header**: Cabeçalho com perfil, título e ícone do cérebro
- **BottomNavigation**: Navegação inferior
- **BrainIcon**: Ícone do cérebro colorido
- **Colors**: Constantes de cores da aplicação

## Tecnologias
- React Native com Expo
- TypeScript
- React Navigation
- React Native Safe Area Context

## Cores da Aplicação
- **Azul**: `#1e88e5`
- **Verde**: `#43a047`
- **Vermelho**: `#e53935`
- **Amarelo**: `#fbc02d`
- **Fundo Azul**: `#054776`
- **Fundo Branco**: `#f4f6ff`
- **Texto Preto**: `#3c3c3c`
- **Texto Branco**: `#ffffff`

## Como Executar

### Pré-requisitos
- Node.js
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação
```bash
# Instalar dependências
npm install

# Executar no Android
npm run android

# Executar no iOS
npm run ios

# Executar no web
npm run web
```

## Estrutura do Projeto
```
src/
├── components/          # Componentes reutilizáveis
│   ├── BrainIcon.tsx
│   ├── Header.tsx
│   └── BottomNavigation.tsx
├── constants/           # Constantes
│   └── colors.ts
├── navigation/          # Navegação
│   └── AppNavigator.tsx
├── screens/            # Telas da aplicação
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── CategoriesScreen.tsx
│   ├── GuessGameScreen.tsx
│   └── RequestAccessScreen.tsx
└── types/              # Tipos TypeScript
```

## Fluxo de Navegação
1. **Splash** → Login ou Request Access
2. **Login** → Dashboard
3. **Dashboard** → Categories ou Guess Game
4. **Categories** → Itens da categoria
5. **Guess Game** → Jogo de adivinhação

## Próximos Passos
- Implementar lógica dos jogos
- Conectar com dados mockados
- Adicionar sons e animações
- Implementar sistema de progresso
- Integrar com backend Supabase

## Desenvolvido por
Pedro Lucas Reis - TCC FalaAtípica
