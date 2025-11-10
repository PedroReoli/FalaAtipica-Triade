# 🔌 Exemplo de Integração da API no PalavrasGameScreen

## 📋 Como Integrar

### 1. Importar os serviços

```typescript
// No topo do arquivo PalavrasGameScreen.tsx
import { useAPIIntegration } from '../hooks/useAPIIntegration';
```

### 2. Usar o hook no componente

```typescript
export const PalavrasGameScreen: React.FC = () => {
  // ... outros hooks

  // Hook de integração com API
  const {
    isAPIAvailable,
    sendProgress,
    emitGameStarted,
    emitGameCompleted,
    emitAchievementUnlocked
  } = useAPIIntegration();

  // ... resto do código
};
```

### 3. Emitir evento quando jogo iniciar

```typescript
const loadPalavra = async () => {
  // ... código existente de carregar palavra

  // ✨ NOVO: Emitir evento de jogo iniciado
  emitGameStarted('palavras', 'Jogo das Palavras');
};
```

### 4. Enviar progresso quando jogo completar

```typescript
const handleComplete = async () => {
  // ... validação existente

  if (isCorrect) {
    // Calcular score
    const score = Math.round((correctCount / totalItems) * 100);

    // ✨ NOVO: Enviar progresso para API
    try {
      const result = await sendProgress({
        userId: currentUser.id,
        gameId: 'palavras',
        level: currentLevel,
        score,
        correctAnswers: correctCount,
        wrongAnswers: wrongCount,
        timeSpent: gameTime, // em segundos
        category: currentCategory
      });

      // Se retornou conquistas, emitir eventos
      if (result?.data?.newAchievements) {
        result.data.newAchievements.forEach(achievement => {
          emitAchievementUnlocked(achievement.id, achievement.title);
        });
      }
    } catch (error) {
      console.log('⚠️ Erro ao enviar progresso, continuando offline');
    }

    // ✨ NOVO: Emitir evento de jogo completado
    emitGameCompleted('palavras', 'Jogo das Palavras', score);

    // ... resto do código de celebração
  }
};
```

### 5. Indicador visual de conexão (opcional)

```typescript
// Adicionar no render, antes do return
const ConnectionIndicator = () => {
  if (!isAPIAvailable) {
    return (
      <View style={styles.offlineIndicator}>
        <Text style={styles.offlineText}>📴 Offline</Text>
      </View>
    );
  }
  return null;
};

// No return
return (
  <SafeAreaView>
    <ConnectionIndicator />
    {/* ... resto da UI */}
  </SafeAreaView>
);
```

### 6. Estilos do indicador (opcional)

```typescript
const styles = StyleSheet.create({
  // ... estilos existentes

  offlineIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    zIndex: 1000
  },
  offlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  }
});
```

---

## 🎯 Fluxo Completo

```
1. Jogo carrega → emitGameStarted('palavras', 'Jogo das Palavras')
   ↓
2. Tutors recebe evento → Mostra "João começou a jogar Jogo das Palavras"
   ↓
3. Criança completa jogo → sendProgress({ ... })
   ↓
4. API salva progresso → Emite progress-updated
   ↓
5. Tutors recebe → Atualiza barra de progresso em tempo real
   ↓
6. emitGameCompleted('palavras', 'Jogo das Palavras', 85)
   ↓
7. Tutors recebe → Toast: "🎉 João completou Jogo das Palavras!"
   ↓
8. Se desbloqueou conquista → emitAchievementUnlocked(...)
   ↓
9. Tutors recebe → Toast: "⭐ João desbloqueou: Primeira Estrela"
```

---

## ✅ Benefícios

1. ✅ **Sincronização em tempo real** - Tutors vê progresso instantaneamente
2. ✅ **Fallback automático** - Se API estiver offline, continua funcionando
3. ✅ **Não intrusivo** - Não quebra funcionalidade existente
4. ✅ **Fácil de testar** - Pode ligar/desligar API a qualquer momento
5. ✅ **Notificações** - Tutors recebe notificações de conquistas

---

## 🧪 Como Testar

### 1. Iniciar API
```bash
cd api/
npm start
```

### 2. Iniciar Kids
```bash
cd Kids/
npm start
```

### 3. Iniciar Tutors (outro terminal)
```bash
cd Tutors/
npm start
```

### 4. Testar fluxo
1. Fazer login no Kids (João Silva)
2. Fazer login no Tutors (Carlos Silva)
3. No Kids: Jogar "Jogo das Palavras"
4. No Tutors: Ver toast em tempo real quando João completar o jogo

---

## ⚠️ Importante

- O hook `useAPIIntegration` detecta automaticamente se API está disponível
- Se API estiver offline, o jogo continua funcionando normalmente
- Progresso só é sincronizado se API estiver online
- WebSocket reconecta automaticamente se cair

---

**Status:** Pronto para integração!

