#!/usr/bin/env node

/**
 * Script para gerar favicon a partir da logo do FalaAtípica
 * Converte a logo PNG para diferentes tamanhos de favicon
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const LOGO_PATH = path.join(__dirname, '../public/images/falaatipica-logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public');
const FAVICON_SIZES = [16, 32, 48, 64, 128, 256, 512];

console.log('🎨 Gerando favicons do FalaAtípica...\n');

// Verificar se a logo existe
if (!fs.existsSync(LOGO_PATH)) {
  console.error('❌ Logo não encontrada em:', LOGO_PATH);
  process.exit(1);
}

// Verificar se o ImageMagick está instalado
try {
  execSync('magick -version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ ImageMagick não encontrado. Instale com:');
  console.error('   Windows: choco install imagemagick');
  console.error('   macOS: brew install imagemagick');
  console.error('   Linux: sudo apt-get install imagemagick');
  process.exit(1);
}

// Função para gerar favicon em tamanho específico
function generateFavicon(size) {
  const outputPath = path.join(OUTPUT_DIR, `favicon-${size}x${size}.png`);
  
  try {
    execSync(`magick "${LOGO_PATH}" -resize ${size}x${size} -background transparent "${outputPath}"`, { stdio: 'pipe' });
    console.log(`✅ Favicon ${size}x${size} gerado: favicon-${size}x${size}.png`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar favicon ${size}x${size}:`, error.message);
    return false;
  }
}

// Função para gerar favicon.ico (múltiplos tamanhos)
function generateFaviconIco() {
  const icoPath = path.join(OUTPUT_DIR, 'favicon.ico');
  
  try {
    // Gerar favicon.ico com múltiplos tamanhos
    const sizes = [16, 32, 48, 64];
    const tempFiles = sizes.map(size => {
      const tempPath = path.join(OUTPUT_DIR, `temp-${size}.png`);
      execSync(`magick "${LOGO_PATH}" -resize ${size}x${size} -background transparent "${tempPath}"`, { stdio: 'pipe' });
      return tempPath;
    });
    
    // Combinar em um único .ico
    execSync(`magick ${tempFiles.join(' ')} "${icoPath}"`, { stdio: 'pipe' });
    
    // Limpar arquivos temporários
    tempFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });
    
    console.log('✅ favicon.ico gerado com múltiplos tamanhos');
    return true;
  } catch (error) {
    console.error('❌ Erro ao gerar favicon.ico:', error.message);
    return false;
  }
}

// Função para gerar apple-touch-icon
function generateAppleTouchIcon() {
  const outputPath = path.join(OUTPUT_DIR, 'apple-touch-icon.png');
  
  try {
    execSync(`magick "${LOGO_PATH}" -resize 180x180 -background white -gravity center -extent 180x180 "${outputPath}"`, { stdio: 'pipe' });
    console.log('✅ Apple Touch Icon gerado: apple-touch-icon.png');
    return true;
  } catch (error) {
    console.error('❌ Erro ao gerar Apple Touch Icon:', error.message);
    return false;
  }
}

// Função para gerar manifest.json
function generateManifest() {
  const manifest = {
    "name": "FalaAtípica",
    "short_name": "FalaAtípica",
    "description": "Sistema completo de auxílio para crianças com atraso de fala",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#054776",
    "theme_color": "#1e88e5",
    "icons": [
      {
        "src": "/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/favicon-48x48.png",
        "sizes": "48x48",
        "type": "image/png"
      },
      {
        "src": "/favicon-64x64.png",
        "sizes": "64x64",
        "type": "image/png"
      },
      {
        "src": "/favicon-128x128.png",
        "sizes": "128x128",
        "type": "image/png"
      },
      {
        "src": "/favicon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/favicon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      }
    ]
  };
  
  try {
    fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
    console.log('✅ manifest.json gerado');
    return true;
  } catch (error) {
    console.error('❌ Erro ao gerar manifest.json:', error.message);
    return false;
  }
}

// Executar geração
async function main() {
  console.log('📁 Logo encontrada:', LOGO_PATH);
  console.log('📁 Diretório de saída:', OUTPUT_DIR);
  console.log('');
  
  let successCount = 0;
  let totalTasks = FAVICON_SIZES.length + 3; // favicons + ico + apple + manifest
  
  // Gerar favicons em diferentes tamanhos
  for (const size of FAVICON_SIZES) {
    if (generateFavicon(size)) {
      successCount++;
    }
  }
  
  // Gerar favicon.ico
  if (generateFaviconIco()) {
    successCount++;
  }
  
  // Gerar Apple Touch Icon
  if (generateAppleTouchIcon()) {
    successCount++;
  }
  
  // Gerar manifest.json
  if (generateManifest()) {
    successCount++;
  }
  
  console.log('\n📊 Resumo:');
  console.log(`✅ ${successCount}/${totalTasks} arquivos gerados com sucesso`);
  
  if (successCount === totalTasks) {
    console.log('\n🎉 Todos os favicons foram gerados com sucesso!');
    console.log('\n📋 Arquivos gerados:');
    console.log('   • favicon.ico (múltiplos tamanhos)');
    console.log('   • favicon-16x16.png');
    console.log('   • favicon-32x32.png');
    console.log('   • favicon-48x48.png');
    console.log('   • favicon-64x64.png');
    console.log('   • favicon-128x128.png');
    console.log('   • favicon-256x256.png');
    console.log('   • favicon-512x512.png');
    console.log('   • apple-touch-icon.png');
    console.log('   • manifest.json');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Adicione os links no <head> do HTML');
    console.log('   2. Teste em diferentes dispositivos');
    console.log('   3. Verifique a qualidade das imagens');
  } else {
    console.log('\n⚠️  Alguns arquivos não foram gerados. Verifique os erros acima.');
  }
}

// Executar script
main().catch(console.error);
