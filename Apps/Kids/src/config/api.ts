// Configuração da API
// IMPORTANTE: Trocar 'localhost' pelo IP da sua máquina ao testar no celular
// Execute: ipconfig (Windows) ou ifconfig (Mac/Linux)
// Exemplo: const API_BASE_URL = 'http://192.168.1.100:3001/api';

// Para desenvolvimento no emulador: use localhost
// Para testar no celular físico: use o IP da sua máquina

export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3001/api'  // Emulador
  : 'http://localhost:3001/api'; // Produção (trocar por IP real)

// Para testar no celular, descomente e coloque seu IP:
// export const API_BASE_URL = 'http://192.168.1.100:3001/api';

// ⚠️ CONFIGURAR IP DA FACULDADE AQUI (descobrir com: ipconfig)
// Exemplo: export const API_BASE_URL = 'http://172.16.10.50:3001/api';

export const SOCKET_URL = API_BASE_URL.replace('/api', '');

