# Deploy - FalaAtípica

## Visão Geral
Este documento contém os guias de deploy e configuração de ambiente para as três aplicações do sistema FalaAtípica.

## Ambientes

### Desenvolvimento (Development)
- **Objetivo**: Desenvolvimento local
- **Dados**: MOCAP (mockados)
- **URL**: Localhost
- **Configuração**: Desenvolvimento

### Homologação (Staging)
- **Objetivo**: Testes e validação
- **Dados**: Supabase (teste)
- **URL**: [URL de homologação]
- **Configuração**: Produção

### Produção (Production)
- **Objetivo**: Sistema em uso
- **Dados**: Supabase (produção)
- **URL**: [URL de produção]
- **Configuração**: Produção

## Aplicação KIDS (React Native)

### Pré-requisitos
- Node.js 18+
- React Native CLI
- Android Studio / Xcode
- Expo CLI (opcional)

### Configuração de Ambiente
```bash
# Instalar dependências
cd Kids/
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Variáveis de Ambiente
```env
# KIDS/.env
REACT_NATIVE_API_URL=http://localhost:3000/api
REACT_NATIVE_MOCAP_URL=../MOCAP/KIDS
REACT_NATIVE_ENV=development
```

### Build Android
```bash
# Desenvolvimento
npx react-native run-android

# Produção
cd android
./gradlew assembleRelease
```

### Build iOS
```bash
# Desenvolvimento
npx react-native run-ios

# Produção
cd ios
xcodebuild -workspace Kids.xcworkspace -scheme Kids -configuration Release
```

### Deploy para Stores
- **Google Play Store**: Upload do APK/AAB
- **Apple App Store**: Upload via Xcode/Transporter

## Aplicação TUTORS (React Native)

### Pré-requisitos
- Node.js 18+
- React Native CLI
- Android Studio / Xcode

### Configuração de Ambiente
```bash
# Instalar dependências
cd Tutors/
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Variáveis de Ambiente
```env
# TUTORS/.env
REACT_NATIVE_API_URL=http://localhost:3000/api
REACT_NATIVE_MOCAP_URL=../MOCAP/TUTORS
REACT_NATIVE_ENV=development
```

### Build e Deploy
- Mesmo processo da aplicação KIDS
- Configurações específicas para TUTORS

## Aplicação PRO (React)

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Configuração de Ambiente
```bash
# Instalar dependências
cd Pro/
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

### Variáveis de Ambiente
```env
# PRO/.env
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_MOCAP_URL=../MOCAP/PRO
REACT_APP_ENV=development
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Build de Desenvolvimento
```bash
npm start
```

### Build de Produção
```bash
npm run build
```

### Deploy

#### Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build
npm run build

# Deploy manual via interface
# ou
netlify deploy --prod --dir=build
```

#### AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload para S3
aws s3 sync build/ s3://your-bucket-name

# Invalidar cache do CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Supabase (Fase 4)

### Configuração
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Inicializar projeto
supabase init

# Configurar variáveis
supabase secrets set SUPABASE_URL=your_url
supabase secrets set SUPABASE_ANON_KEY=your_key
```

### Deploy do Banco
```bash
# Aplicar migrações
supabase db push

# Deploy de funções
supabase functions deploy

# Deploy de políticas
supabase db reset
```

### Configuração de Produção
```env
# Variáveis de produção
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## CI/CD

### GitHub Actions

#### Workflow para KIDS
```yaml
# .github/workflows/kids.yml
name: Deploy KIDS

on:
  push:
    branches: [main]
    paths: ['Kids/**']

jobs:
  build-android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd Kids
          npm install
          cd android
          ./gradlew assembleRelease
```

#### Workflow para PRO
```yaml
# .github/workflows/pro.yml
name: Deploy PRO

on:
  push:
    branches: [main]
    paths: ['Pro/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd Pro
          npm install
          npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./Pro
```

## Monitoramento

### Logs
- **KIDS/TUTORS**: Firebase Crashlytics
- **PRO**: Vercel Analytics / Google Analytics
- **Supabase**: Logs nativos do Supabase

### Métricas
- Performance das aplicações
- Uso de recursos
- Erros e crashes
- Tempo de resposta da API

### Alertas
- Downtime das aplicações
- Erros críticos
- Performance degradada
- Uso excessivo de recursos

## Segurança

### Variáveis de Ambiente
- Nunca commitar arquivos .env
- Usar secrets no CI/CD
- Rotacionar chaves regularmente

### SSL/TLS
- HTTPS obrigatório em produção
- Certificados válidos
- HSTS habilitado

### CORS
```javascript
// Configuração CORS para PRO
const corsOptions = {
  origin: ['https://your-domain.com'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

## Backup e Recuperação

### Supabase
- Backup automático diário
- Backup manual antes de mudanças
- Script de recuperação

### Dados MOCAP
- Versionamento no Git
- Backup local
- Documentação de estrutura

## Troubleshooting

### Problemas Comuns

#### Build Android Falha
```bash
# Limpar cache
cd android
./gradlew clean
cd ..
npx react-native run-android
```

#### Build iOS Falha
```bash
# Limpar cache
cd ios
rm -rf build
pod install
cd ..
npx react-native run-ios
```

#### Deploy PRO Falha
```bash
# Verificar variáveis de ambiente
# Verificar build local
npm run build

# Verificar logs do Vercel
vercel logs
```

### Contatos de Suporte
- **Desenvolvimento**: [Email/Telegram]
- **Infraestrutura**: [Email/Telegram]
- **Supabase**: [Documentação oficial]
