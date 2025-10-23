#!/usr/bin/env node

/**
 * Script para verificar se os favicons foram gerados corretamente
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando favicons do FalaAtípica...\n');

// Arquivos esperados
const expectedFiles = [
  'favicon.ico',
  'favicon.png',
  'apple-touch-icon.png',
  'manifest.json',
  'browserconfig.xml'
];

const publicDir = path.join(__dirname, '../public');
let successCount = 0;
let totalFiles = expectedFiles.length;

console.log('📁 Verificando arquivos em:', publicDir);
console.log('');

// Verificar cada arquivo
expectedFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✅ ${file} - ${sizeKB} KB`);
    successCount++;
  } else {
    console.log(`❌ ${file} - NÃO ENCONTRADO`);
  }
});

console.log('\n📊 Resumo:');
console.log(`✅ ${successCount}/${totalFiles} arquivos encontrados`);

if (successCount === totalFiles) {
  console.log('\n🎉 Todos os favicons estão presentes!');
  console.log('\n💡 Próximos passos:');
  console.log('   1. Teste o site no navegador');
  console.log('   2. Verifique se o favicon aparece na aba');
  console.log('   3. Teste em dispositivos móveis');
  console.log('   4. Verifique o manifest.json no DevTools');
} else {
  console.log('\n⚠️  Alguns arquivos estão faltando.');
  console.log('   Execute o script de geração novamente:');
  console.log('   node scripts/simple-favicon.js');
}

// Verificar se a logo original existe
const logoPath = path.join(publicDir, 'images/falaatipica-logo.png');
if (fs.existsSync(logoPath)) {
  console.log('\n📸 Logo original encontrada:', logoPath);
} else {
  console.log('\n❌ Logo original não encontrada:', logoPath);
}
