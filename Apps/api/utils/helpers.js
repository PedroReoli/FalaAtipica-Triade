// Funções auxiliares

// Gerar ID único
function generateId(prefix = '') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}${prefix ? '_' : ''}${timestamp}_${random}`;
}

// Resposta de sucesso padronizada
function successResponse(data, message = null) {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  };
}

// Resposta de erro padronizada
function errorResponse(code, message, details = null) {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: new Date().toISOString()
  };
}

// Validar email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Calcular progresso geral
function calculateOverallProgress(progressArray) {
  if (!progressArray || progressArray.length === 0) return 0;
  
  const total = progressArray.reduce((sum, item) => sum + (item.score || 0), 0);
  return Math.round(total / progressArray.length);
}

// Formatar tempo (segundos para MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Agrupar por categoria
function groupByCategory(items, categoryKey = 'category') {
  return items.reduce((acc, item) => {
    const category = item[categoryKey] || 'outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
}

// Pegar últimos N itens
function getLatest(items, count = 10) {
  return items
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, count);
}

module.exports = {
  generateId,
  successResponse,
  errorResponse,
  isValidEmail,
  calculateOverallProgress,
  formatTime,
  groupByCategory,
  getLatest
};

