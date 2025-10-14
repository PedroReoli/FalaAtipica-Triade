// Configurações de ambiente
module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  JSON_PATH: process.env.JSON_PATH || '../Mockup',
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug'
};

