# 📊 Sistema de Logs - FalaAtípica API

Este diretório armazena os logs de todas as requisições feitas à API do FalaAtípica.

## 📁 Estrutura de Pastas

```
logs/
├── 2025-10/                                    # Mês
│   ├── semana-41/                              # Semana do ano
│   │   ├── 2025-10-14/                         # Dia
│   │   │   ├── api-2025-10-14-12h00.json      # 12:00-12:29 (bloco de 30min)
│   │   │   ├── api-2025-10-14-12h30.json      # 12:30-12:59 (bloco de 30min)
│   │   │   └── api-2025-10-14-13h00.json      # 13:00-13:29 (bloco de 30min)
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

## ⏰ Blocos de Tempo (30 minutos)

Cada arquivo representa um bloco de 30 minutos:

| Bloco | Horário |
|-------|---------|
| `00h00` | 00:00-00:29 |
| `00h30` | 00:30-00:59 |
| `01h00` | 01:00-01:29 |
| `01h30` | 01:30-01:59 |
| ... | ... |
| `23h30` | 23:30-23:59 |

## 📄 Formato do Arquivo JSON

Cada arquivo de log contém:

```json
{
  "timeBlock": {
    "date": "2025-10-14",
    "startTime": "12:00",
    "endTime": "12:29",
    "weekNumber": 41
  },
  "summary": {
    "totalRequests": 8,
    "successfulRequests": 7,
    "failedRequests": 1,
    "apps": {
      "kids": 3,
      "tutors": 2,
      "pro": 3
    }
  },
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
  ],
  "tableSummary": [
    "╔════════════════════════════════════════════════════════════════╗",
    "║           RESUMO DO BLOCO 12:00-12:29                        ║",
    "║           2025-10-14 (Semana 41)                             ║",
    "╠════════════════════════════════════════════════════════════════╣",
    "║ Total de Requisições            │ 8                          ║",
    "║ Sucesso                         │ 7          (87.5%)         ║",
    "║ Falhas                          │ 1          (12.5%)          ║",
    "╠════════════════════════════════════════════════════════════════╣",
    "║ KIDS                            │ 3 req (37.5%)              ║",
    "║ TUTORS                          │ 2 req (25%)                ║",
    "║ PRO                             │ 3 req (37.5%)              ║",
    "╠════════════════════════════════════════════════════════════════╣",
    "║ Tempo Médio                     │ 387ms                      ║",
    "║ Mais Rápido                     │ 89ms                       ║",
    "║ Mais Lento                      │ 1200ms                     ║",
    "╠════════════════════════════════════════════════════════════════╣",
    "║ Top 1 Endpoint                  │ POST /api/auth/login (3x)  ║",
    "║ Top 2 Endpoint                  │ POST /api/kids/progress    ║",
    "╠════════════════════════════════════════════════════════════════╣",
    "║ Total de Erros                  │ 1                          ║",
    "║ [12:20:33] 500                  │ Database timeout           ║",
    "╚════════════════════════════════════════════════════════════════╝"
  ]
}
```

## 🔍 Informações Registradas

Cada requisição registra:

- **timestamp**: Horário exato (HH:MM:SS)
- **app**: Aplicação que fez a requisição (kids, tutors, pro)
- **method**: Método HTTP (GET, POST, PUT, DELETE)
- **endpoint**: Rota acessada
- **status**: Código de status HTTP
- **responseTime**: Tempo de resposta em ms
- **success**: Se a requisição foi bem-sucedida
- **error**: Mensagem de erro (se houver)

## 📊 Resumo em Tabela

No final de cada arquivo JSON, há um **tableSummary** com:

✅ Estatísticas gerais (total, sucesso, falhas)  
✅ Distribuição por aplicação (KIDS, TUTORS, PRO)  
✅ Performance (tempo médio, mínimo, máximo)  
✅ Top 3 endpoints mais acessados  
✅ Lista de erros (se houver)

## 🛠️ Como Funciona

1. Middleware intercepta todas as requisições
2. Identifica a aplicação (Kids, Tutors ou Pro)
3. Calcula o bloco de 30 minutos atual
4. Cria/atualiza o arquivo de log correspondente
5. Adiciona a requisição ao array
6. Recalcula as estatísticas
7. Regenera o resumo em tabela

## 🗑️ Manutenção

Os logs são mantidos indefinidamente. Para limpar logs antigos:

```bash
# Deletar logs com mais de 30 dias
find logs/ -type f -mtime +30 -delete

# Deletar logs de um mês específico
rm -rf logs/2025-10/
```

## 📝 Exemplo de Uso

Para visualizar o resumo de um bloco específico:

```bash
# Ver resumo do bloco 12:00-12:29 do dia 14/10/2025
cat logs/2025-10/semana-41/2025-10-14/api-2025-10-14-12h00.json | jq -r '.tableSummary[]'
```

Resultado:
```
╔════════════════════════════════════════════════════════════════╗
║           RESUMO DO BLOCO 12:00-12:29                        ║
║           2025-10-14 (Semana 41)                             ║
╠════════════════════════════════════════════════════════════════╣
...
```

---

**Última Atualização:** 14 de Outubro de 2025

