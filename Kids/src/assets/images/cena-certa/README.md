# 🎮 Imagens do Jogo: CENA CERTA

## 📁 Estrutura de Pastas

```
cena-certa/
├── nivel1/           # Relações espaciais simples
│   ├── gato_sobre_caixa.png
│   ├── bola_embaixo_mesa.png
│   └── ...
├── nivel2/           # Ações simples
│   ├── menina_empurra_carrinho.png
│   ├── menino_pula_corda.png
│   └── ...
├── nivel3/           # Ações complexas (sujeito-verbo-objeto)
│   ├── menino_da_maca_professora.png
│   ├── menina_recebe_presente_mae.png
│   └── ...
└── README.md
```

## 🎯 Propósito

O jogo **Cena Certa** mostra uma **cena ilustrada** e a criança deve escolher a frase que melhor descreve o que está acontecendo.

## 📊 Especificações das Imagens

### **Todas as Cenas:**
- **Tamanho**: 400x300px (horizontal)
- **Formato**: PNG ou JPG
- **Estilo**: Flat design, colorido, amigável
- **Elementos**: Poucos elementos, cena clara
- **Personagens**: 1-2 personagens ou objetos
- **Fundo**: Simples, não distrair da ação principal

## 📝 Lista de Imagens Necessárias

### **Nível 1 (Relações Espaciais - 4 cenas):**

#### **1. gato_sobre_caixa.png**
- Gato sentado **em cima** de uma caixa
- Fundo simples
- Foco no gato e na caixa

#### **2. bola_embaixo_mesa.png**
- Bola **embaixo** de uma mesa
- Mesa simples, 4 pernas
- Bola vermelha ou azul

#### **3. livro_dentro_mochila.png**
- Livro **dentro** de uma mochila aberta
- Mochila em vista frontal
- Livro parcialmente visível

#### **4. cachorro_ao_lado_arvore.png**
- Cachorro **ao lado** de uma árvore
- Árvore verde simples
- Cachorro sentado

### **Nível 2 (Ações Simples - 4 cenas):**

#### **1. menina_empurra_carrinho.png**
- Menina **empurrando** um carrinho de brinquedo
- Direção: esquerda para direita
- Menina com mãos no carrinho

#### **2. menino_pula_corda.png**
- Menino **pulando** corda
- Corda em movimento (arco)
- Menino no ar

#### **3. crianca_come_maca.png**
- Criança **comendo** uma maçã
- Maçã próxima à boca
- Expressão feliz

#### **4. menina_desenha_papel.png**
- Menina **desenhando** em um papel
- Lápis na mão
- Papel com rabiscos simples

### **Nível 3 (Ações Complexas - 4 cenas):**

#### **1. menino_da_maca_professora.png**
- Menino **dando** uma maçã **para** a professora
- Menino estendendo a maçã
- Professora recebendo (mãos abertas)
- Direção clara: menino → professora

#### **2. menina_recebe_presente_mae.png**
- Menina **recebendo** presente **da** mãe
- Mãe entregando caixa embrulhada
- Menina com mãos estendidas
- Expressões felizes

#### **3. pai_le_livro_filho.png**
- Pai **lendo** livro **para** o filho
- Pai segurando livro aberto
- Filho olhando para o livro
- Sentados juntos

#### **4. avó_serve_suco_neto.png**
- Avó **servindo** suco **para** o neto
- Avó com jarra/copo
- Neto com copo vazio ou recebendo
- Mesa visível

## 🎨 Paleta de Cores Sugerida

- **Personagens**: Tons de pele variados, roupas coloridas
- **Objetos**: Cores primárias vibrantes (vermelho, azul, verde, amarelo)
- **Fundo**: Tons claros e neutros (#F0F0F0, #E8F5E8, #FFF9E6)

## 🎨 Exemplo de Uso

```typescript
// No código:
import cenaGato from './cena-certa/nivel1/gato_sobre_caixa.png';

<Image source={cenaGato} style={styles.sceneImage} />

// Frases (no JSON):
{
  "fraseCorreta": "O gato está sobre a caixa.",
  "frasesAlternativas": [
    "A caixa está sobre o gato.",
    "O gato está atrás da caixa."
  ]
}
```

## 📋 Checklist

- [ ] Criar subpastas por nível
- [ ] Gerar 4 cenas do Nível 1
- [ ] Gerar 4 cenas do Nível 2
- [ ] Gerar 4 cenas do Nível 3
- [ ] Validar clareza das ações/posições
- [ ] Testar se as frases correspondem às cenas
- [ ] Testar no app

---

**Total de Imagens**: 12 cenas (4 por nível)

## 💡 Dicas para Geração de Imagens (IA)

### **Prompt Base:**
```
Create a simple, colorful flat design illustration for children.
Scene: [descrição da cena]
Style: Friendly, clean, minimal background, focus on main action
Colors: Vibrant primary colors
Characters: Diverse, simple cartoon style
No text in image.
```

### **Exemplo Completo:**
```
Create a simple, colorful flat design illustration for children.
Scene: A cat sitting on top of a box
Style: Friendly, clean, minimal background, focus on the cat and box
Colors: Orange cat, brown box, light blue background
Characters: Cute cartoon cat
No text in image.
Image size: 400x300px
```


