# Scripts de Geração de Favicon - FalaAtípica

Este diretório contém scripts para gerar favicons a partir da logo do FalaAtípica.

## 📁 Arquivos Disponíveis

### Scripts de Geração
- **`generate-favicon.js`** - Script completo com ImageMagick (melhor qualidade)
- **`simple-favicon.js`** - Script simples sem dependências externas
- **`generate-favicon.bat`** - Script batch para Windows
- **`generate-favicon.ps1`** - Script PowerShell para Windows

## 🚀 Como Usar

### Opção 1: Script Simples (Recomendado)
```bash
# No diretório site/
node scripts/simple-favicon.js
```

### Opção 2: Script com ImageMagick (Melhor Qualidade)
```bash
# Instalar ImageMagick primeiro
# Windows: choco install imagemagick
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Executar script
node scripts/generate-favicon.js
```

### Opção 3: Scripts Windows
```cmd
# Batch
scripts\generate-favicon.bat

# PowerShell
powershell -ExecutionPolicy Bypass -File scripts\generate-favicon.ps1
```

## 📋 Arquivos Gerados

### Script Simples
- `favicon.png` - Logo como favicon
- `favicon.ico` - Logo como favicon ICO
- `apple-touch-icon.png` - Logo para dispositivos Apple
- `manifest.json` - Manifesto da aplicação

### Script com ImageMagick
- `favicon.ico` - Favicon com múltiplos tamanhos
- `favicon-16x16.png` - Favicon 16x16
- `favicon-32x32.png` - Favicon 32x32
- `favicon-48x48.png` - Favicon 48x48
- `favicon-64x64.png` - Favicon 64x64
- `favicon-128x128.png` - Favicon 128x128
- `favicon-256x256.png` - Favicon 256x256
- `favicon-512x512.png` - Favicon 512x512
- `apple-touch-icon.png` - Apple Touch Icon 180x180
- `manifest.json` - Manifesto da aplicação

## 🔧 Configuração

### Pré-requisitos
- **Node.js** (para todos os scripts)
- **ImageMagick** (apenas para script completo)

### Logo de Origem
- **Caminho**: `public/images/falaatipica-logo.png`
- **Formato**: PNG com fundo transparente
- **Recomendado**: Mínimo 512x512 pixels

## 📱 Integração no HTML

Após executar o script, adicione no `<head>` do HTML:

```html
<!-- Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" href="/favicon.ico">

<!-- Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Meta tags -->
<meta name="theme-color" content="#1e88e5">
<meta name="msapplication-TileColor" content="#054776">
```

## 🎯 Próximos Passos

1. **Execute o script** de sua preferência
2. **Verifique os arquivos** gerados em `public/`
3. **Adicione os links** no HTML
4. **Teste em diferentes dispositivos**
5. **Verifique a qualidade** das imagens

## 🐛 Solução de Problemas

### Erro: "Logo não encontrada"
- Verifique se `public/images/falaatipica-logo.png` existe
- Confirme o caminho correto da logo

### Erro: "ImageMagick não encontrado"
- Instale o ImageMagick
- Use o script simples como alternativa

### Erro: "Node.js não encontrado"
- Instale o Node.js
- Verifique se está no PATH

## 📞 Suporte

Para problemas ou dúvidas:
- Verifique os logs de erro
- Confirme os pré-requisitos
- Teste com o script simples primeiro
