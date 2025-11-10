// Sistema de Logs - FalaAtípica API
const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logsDir = path.join(__dirname, '../../..', 'Apps', 'logs');
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
    // Validação: verificar se há requisições
    if (!requests || requests.length === 0) {
      return {
        total: 0,
        successful: 0,
        failed: 0,
        successRate: '0.0',
        failureRate: '0.0',
        apps: {},
        avgResponseTime: 0,
        minResponseTime: 0,
        maxResponseTime: 0,
        topEndpoints: [],
        errors: []
      };
    }

    const total = requests.length;
    const successful = requests.filter(r => r.success).length;
    const failed = total - successful;

    const apps = requests.reduce((acc, r) => {
      acc[r.app] = (acc[r.app] || 0) + 1;
      return acc;
    }, {});

    // Converter responseTime de string (ex: "125ms") para número
    const responseTimes = requests.map(r => {
      const timeStr = String(r.responseTime || '0ms');
      return parseInt(timeStr.replace(/[^0-9]/g, ''), 10) || 0;
    });
    
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

  // Função auxiliar para garantir padding correto
  padRight(text, totalLength) {
    const str = String(text);
    const padding = totalLength - str.length;
    return str + ' '.repeat(Math.max(0, padding));
  }

  // Gerar resumo em formato de tabela
  generateTableSummary(timeBlock, stats) {
    const lines = [];
    const tableWidth = 64;
    
    // Cabeçalho
    lines.push("╔════════════════════════════════════════════════════════════════╗");
    
    const headerLine1 = `RESUMO DO BLOCO ${timeBlock.startTime}-${timeBlock.endTime}`;
    const headerPadding1 = Math.floor((tableWidth - headerLine1.length - 2) / 2);
    lines.push(`║${' '.repeat(headerPadding1)}${headerLine1}${' '.repeat(tableWidth - headerLine1.length - headerPadding1 - 2)}║`);
    
    const headerLine2 = `${timeBlock.date} (Semana ${timeBlock.weekNumber})`;
    const headerPadding2 = Math.floor((tableWidth - headerLine2.length - 2) / 2);
    lines.push(`║${' '.repeat(headerPadding2)}${headerLine2}${' '.repeat(tableWidth - headerLine2.length - headerPadding2 - 2)}║`);
    
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Estatísticas gerais
    lines.push(`║ ${this.padRight('Total de Requisições', 31)} │ ${this.padRight(stats.total, 28)} ║`);
    lines.push(`║ ${this.padRight('Sucesso', 31)} │ ${this.padRight(`${stats.successful} (${stats.successRate}%)`, 28)} ║`);
    lines.push(`║ ${this.padRight('Falhas', 31)} │ ${this.padRight(`${stats.failed} (${stats.failureRate}%)`, 28)} ║`);
    
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Apps
    Object.entries(stats.apps).forEach(([app, count]) => {
      const percentage = ((count / stats.total) * 100).toFixed(1);
      const appName = app.toUpperCase();
      const value = `${count} req (${percentage}%)`;
      lines.push(`║ ${this.padRight(appName, 31)} │ ${this.padRight(value, 28)} ║`);
    });
    
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Performance
    lines.push(`║ ${this.padRight('Tempo Médio', 31)} │ ${this.padRight(`${stats.avgResponseTime}ms`, 28)} ║`);
    lines.push(`║ ${this.padRight('Mais Rápido', 31)} │ ${this.padRight(`${stats.minResponseTime}ms`, 28)} ║`);
    lines.push(`║ ${this.padRight('Mais Lento', 31)} │ ${this.padRight(`${stats.maxResponseTime}ms`, 28)} ║`);
    
    lines.push("╠════════════════════════════════════════════════════════════════╣");
    
    // Top Endpoints
    if (stats.topEndpoints.length > 0) {
      stats.topEndpoints.forEach(([endpoint, count], index) => {
        const label = `Top ${index + 1} Endpoint`;
        const shortEndpoint = endpoint.length > 30 ? endpoint.substring(0, 27) + '...' : endpoint;
        const value = `${shortEndpoint} (${count}x)`;
        lines.push(`║ ${this.padRight(label, 31)} │ ${this.padRight(value, 28)} ║`);
      });
      lines.push("╠════════════════════════════════════════════════════════════════╣");
    }
    
    // Erros
    if (stats.errors.length > 0) {
      lines.push(`║ ${this.padRight('Total de Erros', 31)} │ ${this.padRight(stats.errors.length, 28)} ║`);
      stats.errors.forEach((error, index) => {
        if (index < 3) {
          const label = `[${error.timestamp}] ${error.status}`;
          const errorMsg = error.error ? (error.error.length > 28 ? error.error.substring(0, 25) + '...' : error.error) : 'Unknown';
          lines.push(`║ ${this.padRight(label, 31)} │ ${this.padRight(errorMsg, 28)} ║`);
        }
      });
    } else {
      lines.push(`║ ${this.padRight('Erros', 31)} │ ${this.padRight('Nenhum erro registrado', 28)} ║`);
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

