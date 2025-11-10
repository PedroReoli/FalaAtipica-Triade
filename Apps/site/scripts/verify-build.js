/**
 * Script para verificar se o build está completo antes do deploy
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

console.log('🔍 Verificando build...\n');

// Verificar se a pasta out existe
if (!fs.existsSync(outDir)) {
  console.error('❌ Pasta "out" não encontrada!');
  console.log('💡 Execute: npm run build');
  process.exit(1);
}

console.log('✅ Pasta "out" encontrada\n');

// Verificar arquivos críticos
const criticalFiles = [
  'index.html',
  '404.html',
  '_next/static/chunks',
  'images',
];

let allOk = true;

criticalFiles.forEach(file => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ ${file} - NÃO ENCONTRADO!`);
    allOk = false;
  }
});

// Verificar se há arquivos JavaScript na pasta _next
const nextChunksPath = path.join(outDir, '_next', 'static', 'chunks');
if (fs.existsSync(nextChunksPath)) {
  const chunks = fs.readdirSync(nextChunksPath);
  console.log(`\n📦 Arquivos JavaScript encontrados: ${chunks.length}`);
  if (chunks.length === 0) {
    console.error('❌ Nenhum arquivo JavaScript encontrado em _next/static/chunks/');
    allOk = false;
  }
} else {
  console.error('\n❌ Pasta _next/static/chunks não encontrada!');
  console.error('⚠️  Isso causará erros 404 no site!');
  allOk = false;
}

console.log('\n' + '='.repeat(50));

if (allOk) {
  console.log('✅ Build verificado com sucesso!');
  console.log('📤 Pronto para fazer upload via FTP');
  console.log('\n💡 Lembre-se de enviar TODA a pasta "out" incluindo "_next"');
} else {
  console.error('❌ Build incompleto! Corrija os problemas acima.');
  process.exit(1);
}

