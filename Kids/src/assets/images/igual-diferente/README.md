# 🎮 Imagens do Jogo: IGUAL-DIFERENTE

## 📁 Estrutura de Pastas

```
igual-diferente/
├── nivel1/           # Diferenças grandes
│   ├── cachorro.png
│   ├── gato.png
│   ├── casa.png
│   └── ...
├── nivel2/           # Diferenças médias
│   ├── bolo_chocolate.png
│   ├── bolo_morango.png
│   ├── arvore_verde.png
│   └── ...
├── nivel3/           # Diferenças sutis
│   ├── cadeira_esquerda.png
│   ├── cadeira_direita.png
│   ├── bicicleta_vermelha.png
│   └── ...
└── README.md
```

## 🎯 Propósito

O jogo **Igual-Diferente** compara 2 itens (palavras, imagens ou misto) e a criança deve decidir se são iguais ou diferentes.

## 📊 Tipos de Comparação

### **1. Palavra × Palavra** 📝
- Exibido como texto (sem imagem)
- Exemplos: `GATO` × `PATO`, `BOLA` × `BOLA`

### **2. Imagem × Imagem** 🖼️
- Requer imagens
- Exemplos: `cachorro.png` × `gato.png`, `casa.png` × `casa.png`

### **3. Imagem × Palavra** 🎨📝
- Combina imagem e texto
- Exemplos: `bola.png` × `BOLA`, `gato.png` × `PATO`

## 📊 Especificações das Imagens

### **Todas as Imagens:**
- **Tamanho**: 150x150px
- **Formato**: PNG com fundo transparente
- **Estilo**: Simples, flat design ou realista
- **Cores**: Vibrantes e claras

## 📝 Lista de Imagens Necessárias

### **Nível 1 (Diferenças Grandes):**
- cachorro.png
- gato.png
- casa.png
- bola.png

### **Nível 2 (Diferenças Médias):**
- bolo_chocolate.png (bolo com cobertura marrom)
- bolo_morango.png (bolo com cobertura rosa)
- arvore_verde.png
- cavalo.png
- flor.png

### **Nível 3 (Diferenças Sutis):**
- cadeira_esquerda.png (cadeira virada para esquerda)
- cadeira_direita.png (cadeira virada para direita - espelhada)
- bicicleta_vermelha.png
- elefante.png
- borboleta.png
- formiga.png

## 🎨 Exemplo de Uso

```typescript
// No código:
import cachorro from './igual-diferente/nivel1/cachorro.png';
import gato from './igual-diferente/nivel1/gato.png';

// Comparação imagem-imagem:
<Image source={cachorro} style={styles.comparisonImage} />
<Image source={gato} style={styles.comparisonImage} />

// Comparação imagem-palavra:
<Image source={cachorro} style={styles.comparisonImage} />
<Text style={styles.comparisonText}>CACHORRO</Text>
```

## 📋 Checklist

- [ ] Criar subpastas por nível
- [ ] Gerar imagens do Nível 1 (4 imagens)
- [ ] Gerar imagens do Nível 2 (5 imagens)
- [ ] Gerar imagens do Nível 3 (6 imagens)
- [ ] Validar pares iguais/diferentes
- [ ] Testar no app

---

**Total de Imagens**: ~15 imagens únicas



