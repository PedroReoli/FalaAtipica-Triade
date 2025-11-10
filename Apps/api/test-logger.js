// Teste rápido do sistema de logs
const logger = require('./src/utils/logger');

console.log('🧪 Testando Sistema de Logs...\n');

// Teste 1: Log simples
console.log('✅ Teste 1: Registrando requisição simples');
logger.logRequest({
  app: 'kids',
  method: 'POST',
  endpoint: '/api/auth/login',
  status: 200,
  responseTime: '125ms',
  success: true,
  error: null
});

// Teste 2: Log com erro
console.log('✅ Teste 2: Registrando requisição com erro');
logger.logRequest({
  app: 'pro',
  method: 'POST',
  endpoint: '/api/pro/patients',
  status: 500,
  responseTime: '1200ms',
  success: false,
  error: 'Database timeout'
});

// Teste 3: Mais algumas requisições no mesmo bloco
console.log('✅ Teste 3: Registrando mais requisições no mesmo bloco');
logger.logRequest({
  app: 'tutors',
  method: 'GET',
  endpoint: '/api/tutors/children',
  status: 200,
  responseTime: '156ms',
  success: true
});

logger.logRequest({
  app: 'kids',
  method: 'GET',
  endpoint: '/api/kids/games',
  status: 200,
  responseTime: '89ms',
  success: true
});

console.log('\n✅ Testes concluídos!');
console.log('\n📊 Verifique o arquivo de log gerado em: logs/YYYY-MM/semana-XX/YYYY-MM-DD/');

