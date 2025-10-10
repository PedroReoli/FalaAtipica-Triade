# 🧠 Jogo das Palavras - Especificação Completa

## 📋 Estado Atual (O que existe)

### ✅ Implementado
- `CategoriesScreen.tsx` - Grid de 4 categorias (Comidas, Objetos, Animais, Pessoas)
- `CategoryItemsScreen.tsx` - Lista de itens da categoria
- Navegação entre telas
- Visual básico com cards coloridos

### ❌ NÃO Implementado
- **Lógica do jogo** (não existe ainda!)
- Mecânica de arrastar letras
- Validação de palavras
- Sistema de pontuação
- Feedback ABA

---

## 🎯 PROPOSTA DE REDESIGN COMPLETO

### Nome do Jogo: **Forme a Palavra**

*"Monte as letras e descubra a palavra!"*

---

## 🧩 Estrutura do Jogo (Nova Proposta)

### Fluxo do Jogo

1. **Seleção de Categoria** (mantém tela atual)
   - 4 categorias: Animais, Objetos, Alimentos, Pessoas
   
2. **Tela do Jogo** (NOVA - substituir CategoryItemsScreen)
   - Mostra imagem do objeto/animal
   - Mostra palavra embaralhada ou letras separadas
   - Criança precisa formar a palavra correta

---

## 🎮 Mecânica Proposta (3 Modos Possíveis)

### **MODO 1: Ordenar Letras** (Mais Simples)

**Como funciona:**
- Mostra imagem (ex: cachorro)
- Mostra letras embaralhadas: `O R C H A R O C`
- Criança arrasta letras na ordem certa
- Área de formação: `[ ][ ][ ][ ][ ][ ][ ][ ]`
- Quando completa: valida se está correto

**Exemplo:**
```
┌─────────────────┐
│   🐕 Imagem     │
└─────────────────┘

Forme a palavra:
┌─┬─┬─┬─┬─┬─┬─┬─┐
│C│A│C│H│O│R│R│O│  ← Área de formação (vazia)
└─┴─┴─┴─┴─┴─┴─┴─┘

Letras disponíveis (embaralhadas):
[O] [R] [C] [H] [A] [R] [O] [C]
```

---

### **MODO 2: Completar Palavra** (Médio)

**Como funciona:**
- Mostra imagem + palavra incompleta
- Criança escolhe letra que falta
- Múltiplas lacunas possíveis

**Exemplo:**
```
┌─────────────────┐
│   🐕 Imagem     │
└─────────────────┘

Complete:
C A _ H O _ R O

Escolha: [C] [R] [T] [L]
```

---

### **MODO 3: Sílabas** (Mais Avançado)

**Como funciona:**
- Mostra imagem
- Mostra sílabas embaralhadas
- Criança monta palavra com sílabas

**Exemplo:**
```
┌─────────────────┐
│   🐕 Imagem     │
└─────────────────┘

Monte a palavra:
┌────┬────┬────┬────┐
│    │    │    │    │  ← Área de formação
└────┴────┴────┴────┘

Sílabas:
[CA] [RO] [CHOR] (embaralhadas)
Resposta: CA-CHOR-RO
```

---

## 💡 Recomendação Final

### **MODO HÍBRIDO - O Melhor dos 3 Mundos**

**Estrutura por Níveis:**

#### **Nível 1** (3-5 anos): Sílabas Simples
- Palavras curtas (2-3 sílabas)
- Sílabas grandes e coloridas
- Ex: GA-TO, BO-LA, SO-L

```
Imagem: Gato
Sílabas: [TO] [GA]
Resposta: GA-TO
```

#### **Nível 2** (6-8 anos): Completar Letras
- Palavras médias (4-6 letras)
- 1-2 letras faltando
- Ex: C_SA, GA_O, B_LA

```
Imagem: Casa
Palavra: C _ S A
Opções: [A] [E] [I] [O]
Resposta: CASA
```

#### **Nível 3** (9-12 anos): Ordenar Letras
- Palavras mais complexas
- Todas as letras embaralhadas
- Ex: CACHORRO, BORBOLETA

```
Imagem: Cachorro
Letras: [O][R][C][H][A][R][O][C]
Área: [ ][ ][ ][ ][ ][ ][ ][ ]
Resposta: CACHORRO
```

---

## 🎨 Interface Visual Proposta

### Layout da Tela de Jogo

```
┌─────────────────────────────────┐
│  Header: "Forme a Palavra"      │
├─────────────────────────────────┤
│                                 │
│  Rodada 3/10      ✨ 15 pontos │
│                                 │
│  ┌─────────────────────┐       │
│  │                     │       │
│  │   🐕 [Imagem]       │       │
│  │                     │       │
│  └─────────────────────┘       │
│                                 │
│  Nível: [●●○]  Palavra: ?????  │
│                                 │
│  ┌─┬─┬─┬─┬─┬─┬─┬─┐            │
│  │ │ │ │ │ │ │ │ │ ← Formação│
│  └─┴─┴─┴─┴─┴─┴─┴─┘            │
│                                 │
│  Letras/Sílabas:                │
│  [GA] [TO] [CA] [RO]            │
│                                 │
│  [Limpar] [Confirmar]           │
│                                 │
├─────────────────────────────────┤
│  BottomNavigation               │
└─────────────────────────────────┘
```

---

## 🧠 Sistema ABA Aplicado

### Reforço Positivo (Quando acerta)
- ⭐ Estrelas caindo
- 🎉 "Isso! Muito bem!"
- ✨ Brilho na palavra formada
- 🔊 Som de acerto (opcional)
- +10 pontos

### Prompting (Quando erra ou fica inativo)
1. **Após 1º erro**: Destacar primeira letra correta
2. **Após 2º erro**: Mostrar 50% da palavra
3. **Após 8s inativo**: Piscar na letra correta

### Fading (Redução de Ajuda)
- Após 3 acertos seguidos → sem prompts
- Criança mostra domínio → liberdade total

### Modelagem (Progressão)
- Nível 1: 2 sílabas (GA-TO)
- Nível 2: 3 sílabas com letra faltando (C_SA)
- Nível 3: Palavra completa embaralhada

---

## 📊 Dados para TUTORS/PRO

### Métricas Coletadas
- **Por palavra**: tempo, tentativas, erros
- **Por categoria**: % acerto, tempo médio
- **Por nível**: domínio de complexidade
- **Padrões**: trocas de letras comuns (R/L, P/B)
- **Prompts**: quantos e quando

### Relatório Gerado
```json
{
  "sessao_id": "12345",
  "data": "2025-10-09",
  "categoria": "animais",
  "palavras_jogadas": 10,
  "acertos": 8,
  "tempo_medio": 15,
  "erros_comuns": ["R/L", "CH/X"],
  "nivel_dominado": 2,
  "prompts_usados": 3
}
```

---

## 🎨 Dados Mockados Necessários

### Estrutura JSON (`palavras.json`)

```json
{
  "categorias": {
    "animais": {
      "nivel1": [
        {
          "id": "gato",
          "palavra": "GATO",
          "silabas": ["GA", "TO"],
          "imagem": "gato.png",
          "dificuldade": 1
        },
        {
          "id": "cao",
          "palavra": "CÃO",
          "silabas": ["CÃO"],
          "imagem": "cachorro.png",
          "dificuldade": 1
        }
      ],
      "nivel2": [
        {
          "id": "cachorro",
          "palavra": "CACHORRO",
          "silabas": ["CA", "CHOR", "RO"],
          "imagem": "cachorro.png",
          "dificuldade": 2,
          "letrasOcultas": [1, 5]
        }
      ],
      "nivel3": [
        {
          "id": "borboleta",
          "palavra": "BORBOLETA",
          "silabas": ["BOR", "BO", "LE", "TA"],
          "imagem": "borboleta.png",
          "dificuldade": 3
        }
      ]
    },
    "alimentos": { ... },
    "objetos": { ... },
    "pessoas": { ... }
  }
}
```

---

## 🎯 Imagens Necessárias

### Por Categoria (Total ~40 imagens)

**Animais** (10):
- Gato, Cachorro, Pássaro, Peixe, Vaca, Galinha, Cavalo, Porco, Coelho, Borboleta

**Alimentos** (10):
- Arroz, Feijão, Pão, Leite, Banana, Maçã, Bolo, Suco, Ovo, Queijo

**Objetos** (10):
- Casa, Carro, Bola, Mesa, Cadeira, Copo, Prato, Livro, Lápis, Mochila

**Pessoas** (10):
- Pai, Mãe, Avô, Avó, Tio, Tia, Irmão, Irmã, Professor, Médico

**Estilo**: Mesmo dos outros jogos (flat, colorido, amigável)

---

## 🚀 Implementação Técnica

### Componentes Necessários
1. **DraggableLetterBox** - Letra/sílaba arrastável
2. **DropZone** - Área onde soltar
3. **WordFormation** - Container de formação
4. **ValidationFeedback** - Feedback de acerto/erro

### Estados do Jogo
```typescript
- currentWord: Palavra atual
- userAnswer: Letras na ordem que usuário colocou
- availableLetters: Letras ainda disponíveis
- score: Pontuação
- hints: Contador de dicas usadas
- timeStarted: Tempo de início
```

### Validação
```typescript
function validateWord(userAnswer, correctWord) {
  if (userAnswer === correctWord) {
    return { correct: true, feedback: "Perfeito!" }
  }
  
  // Análise de erro
  const errors = findDifferences(userAnswer, correctWord)
  return { correct: false, errors, hint: getHint(errors) }
}
```

---

## 📝 Checklist de Implementação

### Arquivos a Criar
- [ ] `Kids/mockup-data/palavras.json` - Dados completos
- [ ] `Kids/src/services/palavrasService.ts` - Lógica de dados
- [ ] `Kids/src/screens/PalavrasGameScreen.tsx` - Jogo principal
- [ ] `Kids/src/components/games/DraggableLetter.tsx` - Letra arrastável
- [ ] `Kids/src/components/games/WordFormationArea.tsx` - Área de formação
- [ ] `docs/kids/prompts-palavras.md` - Imagens para IA

### Arquivos a Modificar
- [ ] `CategoryItemsScreen.tsx` - Navegar para jogo ao selecionar item
- [ ] `CategoriesScreen.tsx` - Atualizar visual

### Libs Necessárias
- [ ] `react-native-gesture-handler` - Para drag & drop
- [ ] `react-native-reanimated` - Animações suaves

---

## 🎨 Visual Proposto

### Cores por Categoria
- 🦁 **Animais**: Verde `#43a047`
- 🍎 **Alimentos**: Amarelo `#fbc02d`
- 🏠 **Objetos**: Azul `#1e88e5`
- 👨 **Pessoas**: Vermelho `#e53935`

### Elementos Visuais
- **Letras**: Cards grandes (48x48), coloridos, com sombra
- **Área de formação**: Boxes vazios com bordas tracejadas
- **Feedback**: Animação de celebração estilo confete

---

## ⚙️ Configurações do Jogo

```json
{
  "palavrasPorSessao": 10,
  "tempoMaximoPorPalavra": 60,
  "tentativasMaximas": 3,
  "mostrarDicaApos": 2,
  "pontosPorAcerto": 10,
  "bonusSemDica": 5,
  "nivelInicial": 1
}
```

---

## 🎯 Níveis de Dificuldade

### Nível 1 (3-5 anos)
- **Palavras**: 2-3 letras (GA-TO, BO-LA, CÃO)
- **Modo**: Sílabas grandes
- **Quantidade**: 2 sílabas máximo

### Nível 2 (6-8 anos)
- **Palavras**: 4-6 letras (CASA, GATO, BOLA)
- **Modo**: Completar letra faltando
- **Quantidade**: 1-2 letras ocultas

### Nível 3 (9-12 anos)
- **Palavras**: 7+ letras (CACHORRO, BORBOLETA)
- **Modo**: Ordenar todas as letras
- **Quantidade**: Palavra completa embaralhada

---

## 🎨 Sistema de Recompensas

### Por Acerto
- ⭐ +10 pontos
- ✨ Estrela dourada
- 🎉 "Muito bem!"
- 💎 Sem dica? +5 pontos bonus

### Por Erro
- 💡 Dica visual (primeira letra)
- 😊 "Tente de novo!"
- 👀 Destaque na imagem

### Conquistas
- 🏆 5 palavras seguidas = "Mestre das Letras"
- 🌟 Sessão sem erros = "Perfeito!"
- ⚡ Tempo < 10s = "Rápido!"

---

## 📚 Palavras Sugeridas (Por Categoria)

### Animais (15 palavras)
**Nível 1**: GATO, PATO, RATO, CÃO, BOI
**Nível 2**: VACA, PORCO, CAVALO, GALINHA
**Nível 3**: CACHORRO, BORBOLETA, ELEFANTE, TARTARUGA

### Alimentos (15 palavras)
**Nível 1**: PÃO, OVO, SAL, CHÁ, UVA
**Nível 2**: ARROZ, FEIJÃO, LEITE, SUCO
**Nível 3**: CHOCOLATE, MACARRÃO, SORVETE

### Objetos (15 palavras)
**Nível 1**: BOLA, MESA, CAMA, SOFÁ
**Nível 2**: CASA, CARRO, LIVRO, LÁPIS
**Nível 3**: CADEIRA, TELEFONE, BICICLETA

### Pessoas (15 palavras)
**Nível 1**: PAI, MÃE, AVÔ, AVÓ, TIO, TIA
**Nível 2**: IRMÃO, IRMÃ, PRIMO, AMIGO
**Nível 3**: PROFESSOR, MÉDICO, DENTISTA

---

## 🔧 Implementação Técnica

### Drag and Drop

```typescript
// Usando react-native-gesture-handler
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const DraggableLetter = ({ letter, onDrop }) => {
  const handleGesture = (event) => {
    // Lógica de arrastar
    if (event.nativeEvent.state === State.END) {
      onDrop(letter, event.nativeEvent);
    }
  };
  
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View style={letterStyle}>
        <Text>{letter}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
```

### Validação

```typescript
function validateWord(formed: string[], correct: string): boolean {
  const formedWord = formed.join('');
  return formedWord.toUpperCase() === correct.toUpperCase();
}

function getHint(correct: string, current: string[]): string {
  // Retorna primeira letra correta faltando
  for (let i = 0; i < correct.length; i++) {
    if (current[i] !== correct[i]) {
      return correct[i];
    }
  }
  return '';
}
```

---

## 🎯 Decisão Necessária

**Qual modo você prefere implementar?**

1. **Modo 1 - Ordenar Letras** (complexo, drag & drop)
2. **Modo 2 - Completar** (simples, tocar na letra)
3. **Modo 3 - Sílabas** (intermediário, drag & drop)
4. **Modo Híbrido** (3 níveis diferentes, mais trabalho)

---

## 📦 Estimativa de Trabalho

### Modo Simples (Completar)
- **Tempo**: 3-4 horas
- **Complexidade**: Baixa
- **Libs extras**: Nenhuma
- **Imagens**: ~40

### Modo Complexo (Drag & Drop)
- **Tempo**: 8-10 horas
- **Complexidade**: Alta
- **Libs extras**: gesture-handler, reanimated
- **Imagens**: ~40

### Modo Híbrido
- **Tempo**: 12-15 horas
- **Complexidade**: Muito Alta
- **Libs extras**: gesture-handler, reanimated
- **Imagens**: ~40

---

## 💬 AGUARDANDO SUA DECISÃO

**Me diga:**
1. Qual modo você quer? (Simples/Complexo/Híbrido)
2. Qual mecânica faz mais sentido pedagogicamente?
3. Quer focar em qual faixa etária principal?

**Estou pronto para implementar do jeito que você escolher!** 🚀


