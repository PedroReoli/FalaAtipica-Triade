# 📊 Sistema de Logs - FalaAtípica API

## 🎯 Visão Geral

Sistema avançado de logging que registra automaticamente **todas as requisições** feitas à API do FalaAtípica, organizadas por mês, semana, dia e blocos de 30 minutos.

---

## 📁 Estrutura de Arquivos

```
logs/
├── 2025-10/                                    # Mês
│   ├── semana-41/                              # Semana do ano
│   │   ├── 2025-10-14/                         # Dia
│   │   │   ├── api-2025-10-14-12h00.json      # 12:00-12:29
│   │   │   ├── api-2025-10-14-12h30.json      # 12:30-12:59
│   │   │   └── api-2025-10-14-13h00.json      # 13:00-13:29
│   │   └── 2025-10-15/
│   │       └── api-2025-10-15-09h00.json
│   └── semana-42/
│       └── 2025-10-21/
│           └── api-2025-10-21-14h00.json
└── 2025-11/
    └── semana-44/
        └── 2025-11-01/
            └── api-2025-11-01-10h00.json
```

---

## ⏰ Blocos de Tempo

Cada arquivo representa um **bloco de 30 minutos**:

| Arquivo | Período |
|---------|---------|
| `00h00` | 00:00 - 00:29 |
| `00h30` | 00:30 - 00:59 |
| `01h00` | 01:00 - 01:29 |
| `01h30` | 01:30 - 01:59 |
| ... | ... |
| `23h00` | 23:00 - 23:29 |
| `23h30` | 23:30 - 23:59 |

**Exemplo:** Se uma requisição chega às **12:23:45**, ela é registrada no arquivo `api-2025-10-14-12h00.json`.

---

## 📄 Formato do Arquivo JSON

Cada arquivo de log contém:

### 1. **timeBlock** - Informações do bloco

```json
"timeBlock": {
  "date": "2025-10-14",
  "startTime": "12:00",
  "endTime": "12:29",
  "weekNumber": 41
}
```

### 2. **summary** - Resumo estatístico

```json
"summary": {
  "totalRequests": 8,
  "successfulRequests": 7,
  "failedRequests": 1,
  "apps": {
    "kids": 3,
    "tutors": 2,
    "pro": 3
  }
}
```

### 3. **requests** - Array de requisições

```json
"requests": [
  {
    "id": 1,
    "timestamp": "12:05:23",
    "app": "kids",
    "method": "POST",
    "endpoint": "/api/auth/login",
    "status": 200,
    "responseTime": "125ms",
    "success": true,
    "error": null
  }
]
```

### 4. **tableSummary** - Resumo visual em tabela

```json
"tableSummary": [
  "╔════════════════════════════════════════════════════════════════╗",
  "║           RESUMO DO BLOCO 12:00-12:29                        ║",
  "║           2025-10-14 (Semana 41)                             ║",
  "╠════════════════════════════════════════════════════════════════╣",
  "║ Total de Requisições            │ 8                            ║",
  "║ Sucesso                         │ 7          (87.5%)           ║",
  "║ Falhas                          │ 1          (12.5%)            ║",
  "..."
]
```

---

## 🔍 Informações Registradas

Para cada requisição, registramos:

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| `id` | Número sequencial no bloco | `1`, `2`, `3` |
| `timestamp` | Horário exato (HH:MM:SS) | `"12:05:23"` |
| `app` | Aplicação que fez a requisição | `"kids"`, `"tutors"`, `"pro"` |
| `method` | Método HTTP | `"GET"`, `"POST"`, `"PUT"`, `"DELETE"` |
| `endpoint` | Rota acessada | `"/api/auth/login"` |
| `status` | Código de status HTTP | `200`, `404`, `500` |
| `responseTime` | Tempo de resposta | `"125ms"` |
| `success` | Se foi bem-sucedido | `true`, `false` |
| `error` | Mensagem de erro (se houver) | `"HTTP 500"`, `null` |

---

## 📊 Resumo em Tabela

No final de cada arquivo JSON, há um **tableSummary** com estatísticas visuais:

### Seções da Tabela:

1. **Cabeçalho** - Data, horário e semana
2. **Estatísticas Gerais** - Total, sucesso, falhas
3. **Distribuição por App** - KIDS, TUTORS, PRO
4. **Performance** - Tempo médio, mínimo, máximo
5. **Top Endpoints** - 3 rotas mais acessadas
6. **Erros** - Lista de erros registrados

### Exemplo:

```
╔════════════════════════════════════════════════════════════════╗
║           RESUMO DO BLOCO 12:00-12:29                        ║
║           2025-10-14 (Semana 41)                             ║
╠════════════════════════════════════════════════════════════════╣
║ Total de Requisições            │ 8                            ║
║ Sucesso                         │ 7          (87.5%)           ║
║ Falhas                          │ 1          (12.5%)            ║
╠════════════════════════════════════════════════════════════════╣
║ KIDS                            │ 3 req (37.5%)                ║
║ TUTORS                          │ 2 req (25.0%)                ║
║ PRO                             │ 3 req (37.5%)                ║
╠════════════════════════════════════════════════════════════════╣
║ Tempo Médio                     │ 387ms                        ║
║ Mais Rápido                     │ 89ms                         ║
║ Mais Lento                      │ 1200ms                       ║
╠════════════════════════════════════════════════════════════════╣
║ Top 1 Endpoint                  │ POST /api/auth/login (3x)    ║
║ Top 2 Endpoint                  │ POST /api/kids/progress (2x) ║
║ Top 3 Endpoint                  │ GET /api/tutors/children (1x)║
╠════════════════════════════════════════════════════════════════╣
║ Total de Erros                  │ 1                            ║
║ [12:20:33] 500                  │ Database timeout             ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 🛠️ Como Funciona

### Fluxo de Logging:

1. **Middleware intercepta** todas as requisições HTTP
2. **Identifica a aplicação** (Kids, Tutors ou Pro) via:
   - Header `appType`
   - User-Agent
   - Referer
3. **Calcula o bloco** de 30 minutos atual
4. **Monta o caminho** do arquivo: `logs/YYYY-MM/semana-XX/YYYY-MM-DD/api-YYYY-MM-DD-HHhMM.json`
5. **Lê o arquivo** (se existir) ou cria novo
6. **Adiciona a requisição** ao array
7. **Recalcula estatísticas** (total, sucesso, falhas, etc.)
8. **Regenera o resumo** em formato de tabela
9. **Salva o arquivo** atualizado

### Código Responsável:

- **`api/src/utils/logger.js`** - Lógica de logging
- **`api/src/middleware/loggerMiddleware.js`** - Middleware Express
- **`api/server.js`** - Integração no servidor

---

## 📝 Visualizar Logs

### Via Terminal (Linux/Mac):

```bash
# Ver resumo do bloco 12:00-12:29 do dia 14/10/2025
cat logs/2025-10/semana-41/2025-10-14/api-2025-10-14-12h00.json | jq -r '.tableSummary[]'
```

### Via Terminal (Windows PowerShell):

```powershell
# Ver resumo do bloco 12:00-12:29 do dia 14/10/2025
Get-Content logs\2025-10\semana-41\2025-10-14\api-2025-10-14-12h00.json | ConvertFrom-Json | Select-Object -ExpandProperty tableSummary
```

### Via Node.js:

```javascript
const fs = require('fs');
const logFile = 'logs/2025-10/semana-41/2025-10-14/api-2025-10-14-12h00.json';
const log = JSON.parse(fs.readFileSync(logFile, 'utf8'));
console.log(log.tableSummary.join('\n'));
```

---

## 🗑️ Manutenção de Logs

### Limpar Logs Antigos:

```bash
# Deletar logs com mais de 30 dias (Linux/Mac)
find logs/ -type f -mtime +30 -delete

# Deletar logs de um mês específico
rm -rf logs/2025-10/
```

### Arquivar Logs:

```bash
# Comprimir logs de Outubro/2025
tar -czf logs-2025-10.tar.gz logs/2025-10/
```

---

## 📈 Análise de Dados

### Exemplos de Análises Possíveis:

1. **Horários de pico** - Identificar blocos com mais requisições
2. **Apps mais usados** - KIDS vs TUTORS vs PRO
3. **Performance** - Tempo médio de resposta por endpoint
4. **Taxa de erro** - % de requisições com falha
5. **Endpoints populares** - Rotas mais acessadas

### Script de Análise (exemplo):

```javascript
const fs = require('fs');
const path = require('path');

// Ler todos os logs de um dia
const dayDir = 'logs/2025-10/semana-41/2025-10-14';
const files = fs.readdirSync(dayDir);

let totalRequests = 0;
let totalErrors = 0;

files.forEach(file => {
  const log = JSON.parse(fs.readFileSync(path.join(dayDir, file), 'utf8'));
  totalRequests += log.summary.totalRequests;
  totalErrors += log.summary.failedRequests;
});

console.log(`Total do dia: ${totalRequests} requisições`);
console.log(`Taxa de erro: ${((totalErrors / totalRequests) * 100).toFixed(2)}%`);
```

---

## ⚙️ Configurações

### Alterar Intervalo de Blocos:

Atualmente configurado para **30 minutos**. Para alterar, edite `api/src/utils/logger.js`:

```javascript
// Bloco de 30 minutos (padrão)
getTimeBlock(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const blockMinutes = minutes < 30 ? '00' : '30';
  return `${String(hours).padStart(2, '0')}h${blockMinutes}`;
}

// Para blocos de 15 minutos:
getTimeBlock(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const blockMinutes = Math.floor(minutes / 15) * 15;
  return `${String(hours).padStart(2, '0')}h${String(blockMinutes).padStart(2, '0')}`;
}
```

---

## 🔒 Segurança

- ❌ **Senhas NÃO são registradas** nos logs
- ❌ **Tokens de autenticação NÃO são registrados**
- ✅ **Apenas metadados** (método, endpoint, status, tempo)
- ✅ **Logs ficam APENAS localmente** (não são enviados)

---

## ✅ Checklist de Implementação

- [X] Criar pasta `logs/`
- [X] Implementar `logger.js` (lógica de logging)
- [X] Implementar `loggerMiddleware.js` (middleware Express)
- [X] Integrar no `server.js`
- [X] Criar `.gitignore` para logs
- [X] Documentar sistema de logs
- [X] Criar exemplo de log

---

**Última Atualização:** 14 de Outubro de 2025  
**Versão:** 1.0.0

