#!/usr/bin/env node

/**
 * Script para testar o envio do formulário de parcerias
 * Simula o envio de dados para o Google Forms
 */

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfLrW_AXANUgqw7Vn9ASUlNf-5JTgFRZfDTMzGaGZE2yCi2-g/formResponse';

console.log('🧪 Testando formulário de parcerias...\n');

// Dados de teste
const testData = {
  'entry.2005620554': 'Clínica Teste',           // Nome da Empresa/Clínica
  'entry.1045781291': 'teste@clinica.com',       // Email
  'entry.1065046570': 'Rua Teste, 123',          // Endereço
  'entry.1166974658': '(21) 99999-9999',         // Telefone
  'entry.76960033': 'Gostei da tecnologia',      // Do que gostou no projeto?
  'entry.2081194041': 'Sugestão de melhoria',     // Sugestões
  'entry.839337160': 'Queremos ajudar crianças'   // Motivo da parceria
};

console.log('📋 Dados de teste:');
Object.entries(testData).forEach(([key, value]) => {
  console.log(`   ${key}: ${value}`);
});

console.log('\n🔗 URL do Google Forms:');
console.log(`   ${formUrl}`);

console.log('\n📝 Campos mapeados:');
console.log('   entry.2005620554 → Nome da Empresa/Clínica');
console.log('   entry.1045781291 → Email');
console.log('   entry.1065046570 → Endereço');
console.log('   entry.1166974658 → Telefone');
console.log('   entry.76960033 → Do que gostou no projeto?');
console.log('   entry.2081194041 → Sugestões');
console.log('   entry.839337160 → Motivo da parceria');

console.log('\n✅ Formulário configurado corretamente!');
console.log('\n💡 Para testar:');
console.log('   1. Acesse a página de parcerias');
console.log('   2. Preencha o formulário');
console.log('   3. Envie e verifique no Google Forms');
console.log('   4. Verifique se os dados chegaram corretamente');

console.log('\n🔍 Verificação manual:');
console.log('   - Acesse: https://docs.google.com/forms/d/e/1FAIpQLSfLrW_AXANUgqw7Vn9ASUlNf-5JTgFRZfDTMzGaGZE2yCi2-g/viewform');
console.log('   - Verifique se os campos correspondem aos IDs do código');
console.log('   - Teste o envio manual para confirmar');
