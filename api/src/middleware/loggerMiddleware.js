// Middleware de Logging para Express
const logger = require('../utils/logger');

// Middleware para registrar todas as requisições
const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Identificar qual app está fazendo a requisição
  const identifyApp = () => {
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers['referer'] || '';
    const appType = req.body?.appType || req.query?.appType;
    
    if (appType) return appType.toLowerCase();
    if (userAgent.includes('Kids')) return 'kids';
    if (userAgent.includes('Tutors')) return 'tutors';
    if (userAgent.includes('Pro')) return 'pro';
    if (referer.includes('kids')) return 'kids';
    if (referer.includes('tutors')) return 'tutors';
    if (referer.includes('pro')) return 'pro';
    
    return 'unknown';
  };

  // Interceptar o método send para capturar a resposta
  const originalSend = res.send;
  res.send = function (data) {
    const responseTime = Date.now() - startTime;
    
    // Registrar log
    logger.logRequest({
      app: identifyApp(),
      method: req.method,
      endpoint: req.originalUrl || req.url,
      status: res.statusCode,
      responseTime: `${responseTime}ms`,
      success: res.statusCode >= 200 && res.statusCode < 400,
      error: res.statusCode >= 400 ? `HTTP ${res.statusCode}` : null
    });
    
    // Chamar o send original
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = loggerMiddleware;

