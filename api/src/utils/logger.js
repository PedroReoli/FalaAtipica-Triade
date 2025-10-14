// Sistema de Logs - FalaAtípica API
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logsDir = path.join(__dirname, '../../..', 'logs');
    this.ensureLogsDirectory();
  }

  // Garantir que a estrutura de pastas existe
  ensureLogsDirectory() {
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  // Calcular número da semana do ano
  getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  // Calcular bloco de 30 minutos
  getTimeBlock(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const blockMinutes = minutes < 30 ? '00' : '30';
    return `${String(hours).padStart(2, '0')}h${blockMinutes}`;
  }

  // Formatar timestamp para HH:MM:SS
  formatTimestamp(date) {
    return date.toTimeString().split(' ')[0];
  }

  // Montar caminho do arquivo de log
  getLogFilePath(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekNumber = this.getWeekNumber(date);
    const timeBlock = this.getTimeBlock(date);

    const monthDir = path.join(this.logsDir, `${year}-${month}`);
    const weekDir = path.join(monthDir, `semana-${weekNumber}`);
    const dayDir = path.join(weekDir, `${year}-${month}-${day}`);

    // Criar diretórios se não existirem
    [monthDir, weekDir, dayDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    return path.join(dayDir, `api-${year}-${month}-${day}-${timeBlock}.json`);
  }

  // Calcular estatísticas do bloco
  calculateStats(requests) {
    const total = requests.length;
    const successful = requests.filter(r => r.success).length;
    const failed = total - successful;

    const apps = requests.reduce((acc, r) => {
      acc[r.app] = (acc[r.app] || 0) + 1;
      return acc;
    }, {});

    const responseTimes = requests.map(r => parseInt(r.responseTime));
    const avgResponseTime = Math.round(responseTimes.reduce((a, b) => a + b, 0) / total);
    const minResponseTime = Math.min(...responseTimes);
    const maxResponseTime = Math.max(...responseTimes);

    const endpoints = requests.reduce((acc, r) => {
      const key = `${r.method} ${r.endpoint}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const topEndpoints = Object.entries(endpoints)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const errors = requests
      .filter(r => !r.success)
      .map(r => ({
        timestamp: r.timestamp,
        method: r.method,
        endpoint: r.endpoint,
        status: r.status,
        error: r.error
      }));

    return {
      total,
      successful,
      failed,
      successRate: ((successful / total) * 100).toFixed(1),
      failureRate: ((failed / total) * 100).toFixed(1),
      apps,
      avgResponseTime,
      minResponseTime,
      maxResponseTime,
      topEndpoints,
      errors
    };
  }

  // Gerar resumo em formato de tabela
  generateTableSummary(timeBlock, stats) {
    const lines = [];
    
    lines.push("╔════════════════════════════════════════════════════════════════╗");
    lines.push(`║           RESUMO DO BLOCO ${timeBlock.startTime}-${timeBlock.endTime}                        ║`);
    lines.push(`║           ${timeBlock.date} (Semana ${timeBlock.weekNumber})                      ║`);
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    lines.push(`║ Total de Requisições            │ ${String(stats.total).padEnd(28)} ║`);
    lines.push(`║ Sucesso                         │ ${String(stats.successful).padEnd(10)} (${stats.successRate}%)${' '.repeat(13)} ║`);
    lines.push(`║ Falhas                          │ ${String(stats.failed).padEnd(10)} (${stats.failureRate}%)${' '.repeat(14)} ║`);
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Apps
    Object.entries(stats.apps).forEach(([app, count]) => {
      const percentage = ((count / stats.total) * 100).toFixed(1);
      const appName = app.toUpperCase().padEnd(27);
      lines.push(`║ ${appName} │ ${count} req (${percentage}%)${' '.repeat(17 - percentage.length - String(count).length)} ║`);
    });
    
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    lines.push(`║ Tempo Médio                     │ ${stats.avgResponseTime}ms${' '.repeat(25 - String(stats.avgResponseTime).length)} ║`);
    lines.push(`║ Mais Rápido                     │ ${stats.minResponseTime}ms${' '.repeat(26 - String(stats.minResponseTime).length)} ║`);
    lines.push(`║ Mais Lento                      │ ${stats.maxResponseTime}ms${' '.repeat(25 - String(stats.maxResponseTime).length)} ║`);
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Top Endpoints
    if (stats.topEndpoints.length > 0) {
      stats.topEndpoints.forEach(([endpoint, count], index) => {
        const shortEndpoint = endpoint.length > 35 ? endpoint.substring(0, 32) + '...' : endpoint;
        lines.push(`║ Top ${index + 1} Endpoint${' '.repeat(20)} │ ${shortEndpoint} (${count}x)${' '.repeat(22 - shortEndpoint.length - String(count).length)} ║`);
      });
      lines.push("╠════════════════════════════════════════════════════════════════╣");
    }
    
    // Erros
    if (stats.errors.length > 0) {
      lines.push(`║ Total de Erros                  │ ${stats.errors.length}${' '.repeat(28 - String(stats.errors.length).length)} ║`);
      stats.errors.forEach((error, index) => {
        if (index < 3) { // Mostrar no máximo 3 erros
          const errorMsg = error.error ? error.error.substring(0, 30) : 'Unknown';
          lines.push(`║ [${error.timestamp}] ${error.status}${' '.repeat(18)} │ ${errorMsg}${' '.repeat(28 - errorMsg.length)} ║`);
        }
      });
    } else {
      lines.push(`║ Erros                           │ Nenhum erro registrado${' '.repeat(6)} ║`);
    }
    
    lines.push("╚════════════════════════════════════════════════════════════════╝");
    
    return lines;
  }

  // Registrar uma requisição
  logRequest(requestData) {
    try {
      const now = new Date();
      const filePath = this.getLogFilePath(now);
      const timeBlock = this.getTimeBlock(now);
      
      // Preparar dados da requisição
      const logEntry = {
        id: 0, // Será atualizado ao ler o arquivo
        timestamp: this.formatTimestamp(now),
        app: requestData.app || 'unknown',
        method: requestData.method || 'GET',
        endpoint: requestData.endpoint || '/',
        status: requestData.status || 200,
        responseTime: requestData.responseTime || '0ms',
        success: requestData.success !== false,
        error: requestData.error || null
      };

      // Ler arquivo existente ou criar novo
      let logData;
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        logData = JSON.parse(fileContent);
        logEntry.id = logData.requests.length + 1;
        logData.requests.push(logEntry);
      } else {
        logEntry.id = 1;
        const [startHour, startMin] = timeBlock.replace('h', ':').split(':');
        const endMin = parseInt(startMin) === 0 ? '29' : '59';
        
        logData = {
          timeBlock: {
            date: now.toISOString().split('T')[0],
            startTime: `${startHour}:${startMin}`,
            endTime: `${startHour}:${endMin}`,
            weekNumber: this.getWeekNumber(now)
          },
          summary: {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            apps: {}
          },
          requests: [logEntry]
        };
      }

      // Atualizar summary
      logData.summary.totalRequests = logData.requests.length;
      logData.summary.successfulRequests = logData.requests.filter(r => r.success).length;
      logData.summary.failedRequests = logData.summary.totalRequests - logData.summary.successfulRequests;
      
      logData.summary.apps = logData.requests.reduce((acc, r) => {
        acc[r.app] = (acc[r.app] || 0) + 1;
        return acc;
      }, {});

      // Gerar estatísticas e resumo em tabela
      const stats = this.calculateStats(logData.requests);
      logData.tableSummary = this.generateTableSummary(logData.timeBlock, stats);

      // Salvar arquivo
      fs.writeFileSync(filePath, JSON.stringify(logData, null, 2), 'utf8');
      
      console.log(`📝 Log registrado: ${filePath}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao registrar log:', error);
      return false;
    }
  }
}

// Exportar instância singleton
const logger = new Logger();

module.exports = logger;

