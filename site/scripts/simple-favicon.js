#!/usr/bin/env node

/**
 * Script simples para copiar a logo como favicon
 * Não requer dependências externas
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Copiando logo do FalaAtípica como favicon...\n');

// Configurações
const LOGO_PATH = path.join(__dirname, '../public/images/falaatipica-logo.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Verificar se a logo existe
if (!fs.existsSync(LOGO_PATH)) {
  console.error('❌ Logo não encontrada em:', LOGO_PATH);
  process.exit(1);
}

// Função para copiar arquivo
function copyFile(source, destination) {
  try {
    fs.copyFileSync(source, destination);
    console.log(`✅ Copiado: ${path.basename(destination)}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao copiar ${path.basename(destination)}:`, error.message);
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
        "src": "/favicon.png",
        "sizes": "any",
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

// Executar cópias
async function main() {
  console.log('📁 Logo encontrada:', LOGO_PATH);
  console.log('📁 Diretório de saída:', OUTPUT_DIR);
  console.log('');
  
  let successCount = 0;
  const tasks = [
    { source: LOGO_PATH, dest: path.join(OUTPUT_DIR, 'favicon.png') },
    { source: LOGO_PATH, dest: path.join(OUTPUT_DIR, 'apple-touch-icon.png') },
    { source: LOGO_PATH, dest: path.join(OUTPUT_DIR, 'favicon.ico') }
  ];
  
  // Copiar arquivos
  for (const task of tasks) {
    if (copyFile(task.source, task.dest)) {
      successCount++;
    }
  }
  
  // Gerar manifest.json
  if (generateManifest()) {
    successCount++;
  }
  
  console.log('\n📊 Resumo:');
  console.log(`✅ ${successCount}/${tasks.length + 1} arquivos processados com sucesso`);
  
  if (successCount === tasks.length + 1) {
    console.log('\n🎉 Favicons copiados com sucesso!');
    console.log('\n📋 Arquivos gerados:');
    console.log('   • favicon.png');
    console.log('   • favicon.ico');
    console.log('   • apple-touch-icon.png');
    console.log('   • manifest.json');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Adicione os links no <head> do HTML');
    console.log('   2. Teste em diferentes dispositivos');
    console.log('   3. Para melhor qualidade, use o script com ImageMagick');
  } else {
    console.log('\n⚠️  Alguns arquivos não foram processados. Verifique os erros acima.');
  }
}

// Executar script
main().catch(console.error);
