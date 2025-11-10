# 🎮 Imagens do Jogo: PALAVRAS

## 📁 Estrutura de Pastas

```
palavras/
├── animais/          # Categoria Animais
│   ├── gato.png
│   ├── pato.png
│   ├── cachorro.png
│   └── ...
├── alimentos/        # Categoria Alimentos
│   ├── pao.png
│   ├── bolo.png
│   ├── suco.png
│   └── ...
├── objetos/          # Categoria Objetos
│   ├── bola.png
│   ├── casa.png
│   ├── carro.png
│   └── ...
└── README.md
```

## 🎯 Propósito

O jogo **Palavras** mostra uma **imagem** de um objeto e a criança deve formar a palavra correspondente usando sílabas, completando letras ou ordenando letras.

## 📊 Especificações das Imagens

### **Todas as Imagens:**
- **Tamanho**: 200x200px
- **Formato**: PNG com fundo transparente
- **Estilo**: Simples, flat design colorido
- **Foco**: Objeto único, centralizado
- **Detalhes**: Claros e reconhecíveis

## 📝 Lista de Imagens Necessárias

### **ANIMAIS (13 imagens):**

#### **Nível 1 (Sílabas - 5 imagens):**
- gato.png
- pato.png
- sapo.png
- urso.png
- peixe.png

#### **Nível 2 (Completar - 4 imagens):**
- vaca.png
- porco.png
- cavalo.png
- macaco.png

#### **Nível 3 (Ordenar - 4 imagens):**
- cachorro.png
- coelho.png
- elefante.png
- borboleta.png

### **ALIMENTOS (13 imagens):**

#### **Nível 1 (Sílabas - 5 imagens):**
- pao.png (pãozinho)
- ovo.png
- uva.png (cacho)
- mel.png (pote)
- queijo.png (fatia)

#### **Nível 2 (Completar - 4 imagens):**
- bolo.png
- suco.png (copo com canudo)
- leite.png (copo)
- arroz.png (prato)

#### **Nível 3 (Ordenar - 4 imagens):**
- sorvete.png (casquinha)
- laranja.png
- banana.png
- chocolate.png (barra)

### **OBJETOS (13 imagens):**

#### **Nível 1 (Sílabas - 5 imagens):**
- bola.png
- mesa.png
- cama.png
- sofa.png
- luva.png

#### **Nível 2 (Completar - 4 imagens):**
- casa.png
- carro.png
- livro.png
- caderno.png

#### **Nível 3 (Ordenar - 4 imagens):**
- cadeira.png
- lampada.png
- janela.png
- bicicleta.png

## 🎨 Estilo Visual por Categoria

### **Animais:**
- Estilo: Cartoon amigável
- Cores: Variadas e realistas (gato laranja, sapo verde, etc.)
- Pose: Frontal ou 3/4, expressão neutra/amigável

### **Alimentos:**
- Estilo: Flat design apetitoso
- Cores: Vibrantes e apetitosas
- Apresentação: Inteiro ou porção individual

### **Objetos:**
- Estilo: Flat design simples
- Cores: Variadas mas reconhecíveis
- Ângulo: Visão clara do objeto

## 🎨 Exemplo de Uso

```typescript
// No código:
import gatoImage from './palavras/animais/gato.png';
import boloImage from './palavras/alimentos/bolo.png';
import casaImage from './palavras/objetos/casa.png';

// No jogo:
<Image source={gatoImage} style={styles.wordImage} />
// Criança forma: GA-TO

<Image source={boloImage} style={styles.wordImage} />
// Criança completa: BO_O (L)

<Image source={casaImage} style={styles.wordImage} />
// Criança ordena: C-A-S-A
```

## 📋 Checklist

- [ ] Criar subpastas por categoria
- [ ] Gerar 13 imagens de Animais
- [ ] Gerar 13 imagens de Alimentos
- [ ] Gerar 13 imagens de Objetos
- [ ] Validar clareza e reconhecimento
- [ ] Testar correspondência imagem-palavra
- [ ] Testar no app

---

**Total de Imagens**: 39 imagens (13 por categoria)

## 💡 Dicas para Geração de Imagens (IA)

### **Prompt Base:**
```
Create a simple, clean icon/illustration for children's educational app.
Object: [nome do objeto]
Style: Flat design, colorful, single object centered
Background: Transparent
Size: 200x200px
Details: Clear, recognizable, child-friendly
No text in image.
```

### **Exemplos Específicos:**

#### **Animal (GATO):**
```
Create a simple, clean cat illustration for children.
Style: Cute cartoon, flat design, orange/ginger cat
Pose: Sitting, facing forward, friendly expression
Background: Transparent
Size: 200x200px
No text in image.
```

#### **Alimento (BOLO):**
```
Create a simple, clean cake illustration for children.
Style: Flat design, colorful birthday cake with frosting
Layers: 2 layers, pink frosting, cherry on top
Background: Transparent
Size: 200x200px
No text in image.
```

#### **Objeto (CASA):**
```
Create a simple, clean house illustration for children.
Style: Flat design, red roof, white walls, blue door
View: Front view, simple details (windows, door, roof)
Background: Transparent
Size: 200x200px
No text in image.
```

## ⚠️ IMPORTANTE

**Consistência de Dados:**
- As imagens devem corresponder **EXATAMENTE** às palavras no arquivo `Kids/mockup-data/palavras.json`
- Exemplo: Se o JSON tem `"imagem": "gato.png"`, a imagem deve se chamar **exatamente** `gato.png`
- Verificar se todas as 39 palavras do JSON têm imagens correspondentes



