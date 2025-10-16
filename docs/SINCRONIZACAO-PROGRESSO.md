# Sincronização de Progresso - KIDS → TUTORS

## 🔄 Fluxo Completo de Sincronização

### 1️⃣ **Criança Joga no KIDS**

```typescript
// PalavrasGameScreen.tsx
const finishGame = async () => {
  // Calcular estatísticas
  const acertos = respostas.filter(r => r.correto).length;
  const percentual = Math.round((acertos / totalPalavras) * 100);
  const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
  
  // ✅ Enviar para API
  await sendProgress({
    userId: currentUser.id,        // "1" (João Silva)
    gameId: 'palavras',            // Identificador do jogo
    score: percentual,             // 85%
    correctAnswers: acertos,       // 7
    wrongAnswers: erros,           // 3
    timeSpent,                     // 120 segundos
    category: 'animais'            // Categoria jogada
  });
};
```

**Jogos que enviam progresso**:
- ✅ Jogo das Palavras (`gameId: 'palavras'`)
- ✅ Adivinha (`gameId: 'adivinha'`)
- ✅ Cena Certa (`gameId: 'cena-certa'`)
- ✅ Igual-Diferente (`gameId: 'igual-diferente'`)

---

### 2️⃣ **API Recebe e Salva**

```javascript
// api/routes/kids.js
router.post('/progress', async (req, res) => {
  // Criar objeto de progresso
  const progressData = {
    id: 'progress_1760408329906_2iw415m',
    userId: '1',
    gameId: 'palavras',
    score: 85,
    correctAnswers: 7,
    wrongAnswers: 3,
    timeSpent: 120,
    category: 'animais',
    timestamp: '2025-10-16T15:30:00Z'
  };
  
  // ✅ Salvar em shared/progress.json
  progressFile.progress.push(progressData);
  await jsonService.writeJSON('shared/progress.json', progressFile);
  
  // ✅ Emitir evento WebSocket
  io.emit('progress-updated', {
    userId: '1',
    childName: 'João Silva',
    gameId: 'palavras',
    score: 85
  });
});
```

**Arquivo gerado**: `Mockup/shared/progress.json`

---

### 3️⃣ **TUTORS Busca Progresso**

```typescript
// Tutors/src/screens/ProgressScreen.tsx
const loadProgressData = async () => {
  const childId = currentUser.criancasIds[0]; // "1"
  
  // ✅ Buscar da API
  const response = await fetch(
    `${API_BASE_URL}/tutors/progress/${childId}`,
    { method: 'GET' }
  );
  
  const data = await response.json();
  // data.data.porJogo = [
  //   { gameId: 'palavras', jogos: [...], mediaScore: 85 },
  //   { gameId: 'adivinha', jogos: [...], mediaScore: 90 }
  // ]
};
```

**Rota da API**: `GET /api/tutors/progress/:childId`

---

### 4️⃣ **API do TUTORS Processa Dados**

```javascript
// api/routes/tutors.js
router.get('/progress/:childId', async (req, res) => {
  // ✅ Ler shared/progress.json
  const progressFile = await jsonService.readJSON('shared/progress.json');
  const progressoCrianca = progressFile.progress?.filter(
    p => p.userId === childId
  );
  
  // ✅ Agrupar por jogo
  const porJogo = progressoCrianca.reduce((acc, p) => {
    if (!acc[p.gameId]) {
      acc[p.gameId] = {
        gameId: p.gameId,
        gameName: getGameName(p.gameId),
        jogos: [],
        mediaScore: 0
      };
    }
    acc[p.gameId].jogos.push(p);
    return acc;
  }, {});
  
  // ✅ Calcular média por jogo
  Object.values(porJogo).forEach(game => {
    game.mediaScore = Math.round(
      game.jogos.reduce((sum, j) => sum + j.score, 0) / game.jogos.length
    );
  });
  
  res.json(successResponse({
    porJogo: Object.values(porJogo),
    progressoGeral: calculateOverallProgress(progressoCrianca),
    estatisticas: { ... }
  }));
});
```

---

### 5️⃣ **TUTORS Exibe na Tela**

```typescript
// ProgressScreen.tsx
<View style={styles.gameCard}>
  {/* Igual-Diferente */}
  <Text>Média: 82%</Text>
  <Text>Sessões: 15</Text>
  <Text>Melhor: 95%</Text>
  <Text>Tempo: 25min</Text>
</View>

<View style={styles.gameCard}>
  {/* Jogo das Palavras */}
  <Text>Média: 85%</Text>
  <Text>Sessões: 20</Text>
  <Text>Melhor: 100%</Text>
  <Text>Tempo: 35min</Text>
</View>
```

---

## 📊 Fluxo Visual

```
┌─────────────────────────────────────────────────────────┐
│                      KIDS APP                           │
│  Criança joga "Palavras" → Acerta 7/10 → Score: 70%   │
└─────────────────────────────────────────────────────────┘
                          ↓
                  sendProgress()
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API (Node.js)                         │
│  POST /api/kids/progress                                │
│  → Salva em shared/progress.json                        │
│  → Emite WebSocket 'progress-updated'                   │
└─────────────────────────────────────────────────────────┘
                          ↓
                shared/progress.json
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   API (Node.js)                         │
│  GET /api/tutors/progress/:childId                      │
│  → Lê shared/progress.json                              │
│  → Filtra por userId                                    │
│  → Agrupa por gameId                                    │
│  → Calcula médias                                       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    TUTORS APP                           │
│  ProgressScreen exibe:                                  │
│  • Jogo das Palavras: 70% média                        │
│  • 1 sessão jogada                                      │
│  • Última vez: Há 5 minutos                            │
└─────────────────────────────────────────────────────────┘
```

---

## 🔗 Sincronização em Tempo Real

### WebSocket (Opcional - quando API está online)

```javascript
// API emite evento
io.emit('progress-updated', {
  userId: '1',
  childName: 'João Silva',
  gameId: 'palavras',
  score: 70,
  timestamp: '2025-10-16T15:30:00Z'
});

// TUTORS escuta evento (se WebSocket conectado)
socketService.on('progress-updated', (data) => {
  console.log('📊 Progresso atualizado:', data);
  // Atualizar UI em tempo real
  updateChildProgress(data.userId, data.score);
});
```

---

## 📁 Arquivos Envolvidos

### KIDS
- ✅ `Kids/src/screens/PalavrasGameScreen.tsx` - Envia progresso
- ✅ `Kids/src/screens/GuessGameScreen.tsx` - Envia progresso
- ✅ `Kids/src/screens/CenaCertaScreen.tsx` - Envia progresso
- ✅ `Kids/src/screens/IgualDiferenteScreen.tsx` - Envia progresso
- ✅ `Kids/src/hooks/useAPIIntegration.ts` - Hook de integração
- ✅ `Kids/src/services/apiService.ts` - Serviço de API

### API
- ✅ `api/routes/kids.js` - POST /progress (salva)
- ✅ `api/routes/tutors.js` - GET /progress/:childId (lê)
- ✅ `api/services/jsonService.js` - Lê/escreve JSONs

### TUTORS
- ✅ `Tutors/src/screens/ProgressScreen.tsx` - Exibe progresso
- ✅ `Tutors/src/services/apiService.ts` - Busca da API

### Dados Compartilhados
- ✅ `Mockup/shared/progress.json` - Dados centralizados

---

## ✅ Validação da Sincronização

### Teste Manual:

```
1. Abra KIDS APP
2. Faça login como João Silva (joao@kids.com / 123456)
3. Jogue "Jogo das Palavras" categoria Animais
4. Complete com 7/10 acertos (70%)
5. Jogo envia: POST /api/kids/progress
6. API salva em: shared/progress.json
7. Abra TUTORS APP
8. Faça login como Carlos Silva (carlos@tutors.com / 123456)
9. Entre em "Progresso"
10. API busca: GET /api/tutors/progress/1
11. Tutors exibe: "Jogo das Palavras: 70% média"
```

**Status**: ✅ **SINCRONIZANDO CORRETAMENTE**

---

## 🚀 Fallback (Modo Offline)

### Se API está offline:

**KIDS**:
```typescript
try {
  await sendProgress(data);  // Tenta API
  console.log('✅ Progresso salvo na API');
} catch {
  console.log('⚠️ API offline - jogo continua');
  // Jogo funciona normalmente, mas sem sincronização
}
```

**TUTORS**:
```typescript
try {
  const apiData = await fetch('/api/tutors/progress/:childId');
  setProgressData(formatAPIData(apiData));
} catch {
  console.log('⚠️ API offline - usando dados mockados');
  setProgressData(getMockProgressData());
}
```

---

## 📊 Estrutura de Dados

### shared/progress.json (Exemplo Real):
```json
{
  "progress": [
    {
      "id": "progress_1760408329906_2iw415m",
      "userId": "1",
      "gameId": "palavras",
      "level": 1,
      "score": 100,
      "correctAnswers": 7,
      "wrongAnswers": 0,
      "timeSpent": 111,
      "category": "animais",
      "timestamp": "2025-10-14T02:18:49.906Z"
    }
  ]
}
```

### Retorno API Tutors:
```json
{
  "success": true,
  "data": {
    "childId": "1",
    "childName": "João Silva",
    "progressoGeral": 75,
    "porJogo": [
      {
        "gameId": "palavras",
        "gameName": "Jogo das Palavras",
        "jogos": [...],
        "mediaScore": 85
      }
    ],
    "estatisticas": {
      "totalJogos": 20,
      "tempoTotal": 35,
      "mediaGeral": 79
    }
  }
}
```

---

## 🎯 Conclusão

✅ **Sincronização está funcionando 100%**
- KIDS envia progresso via API
- API salva em arquivo compartilhado
- TUTORS lê dados do arquivo compartilhado
- WebSocket notifica em tempo real (opcional)

**Status**: ✅ APROVADO  
**Última verificação**: 2025-10-16  
**Versão**: 1.0

