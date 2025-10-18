# 🎨 Relatório de Imagens - FalaAtípica Kids App

**Última Atualização:** 18 de Outubro de 2025

Este documento descreve todas as imagens utilizadas nos jogos do Kids App, incluindo quantidade, localização, especificações técnicas e como são usadas.

---

## 📊 **RESUMO GERAL**

| Jogo | Total de Imagens | Pasta | Status |
|------|------------------|-------|--------|
| **Adivinha** | 6 | `Kids/src/assets/images/adivinha/` | ✅ Completo |
| **Igual-Diferente** | 12 | `Kids/src/assets/images/igual-diferente/` | ✅ Completo |
| **Cena Certa** | 11 | `Kids/src/assets/images/cena-certa/` | ✅ Completo |
| **Palavras** | 16 | `Kids/src/assets/images/palavras/` | ✅ Completo |
| **TOTAL** | **45** | - | ✅ **100%** |

---

## 🎮 **JOGO 1: ADIVINHA**

### **📍 Localização**
`Kids/src/assets/images/adivinha/`

### **📊 Quantidade**
**6 imagens** (500x500px, PNG com transparência)

### **🎯 Como Funciona**
- Criança vê uma imagem
- Escolhe entre 4 alternativas qual é a resposta correta
- Pergunta: "O que é isso?"
- 12 rodadas (cada imagem aparece 2×)
- Não repete a mesma imagem consecutivamente

### **📂 Imagens Utilizadas**

| # | Arquivo | Categoria | Descrição | Exibição |
|---|---------|-----------|-----------|----------|
| 1 | `cachorro.png` | Animais | Cachorro marrom em pé | 220x220px |
| 2 | `gato.png` | Animais | Gato laranja sentado | 220x220px |
| 3 | `passaro.png` | Animais | Pássaro azul colorido | 220x220px |
| 4 | `banana.png` | Frutas | Banana amarela | 220x220px |
| 5 | `maca.png` | Frutas | Maçã vermelha brilhante | 220x220px |
| 6 | `bola.png` | Objetos | Bola de futebol branca e preta | 220x220px |

**📝 Notas:**
- Removido: `livro.png` (para evitar confusão)
- Estilo: Flat design, cores vibrantes
- Todas as imagens têm fundo transparente

---

## 🎮 **JOGO 2: IGUAL-DIFERENTE**

### **📍 Localização**
```
Kids/src/assets/images/igual-diferente/
├── (base)
└── realistas/ (subpasta)
```

### **📊 Quantidade**
**12 imagens** (500x500px, PNG com transparência)
- 4 objetos
- 3 variações por objeto

### **🎯 Como Funciona**
- Criança vê 2 imagens lado a lado
- Decide se são IGUAIS (mesmo objeto, variações diferentes) ou DIFERENTES (objetos distintos)
- 55% de chance para pares IGUAIS
- 45% de chance para pares DIFERENTES
- Embaralha todas as 12 imagens aleatoriamente
- Não compara imagem exatamente igual consigo mesma

### **📂 Estrutura de Imagens**

#### **Objeto 1: Casa**
| # | Arquivo | Pasta | Descrição |
|---|---------|-------|-----------|
| 1 | `casa.png` | Base | Casa simples, telhado vermelho |
| 2 | `casa2.png` | realistas/ | Casa com jardim |
| 3 | `casa3.png` | realistas/ | Casa moderna azul |

#### **Objeto 2: Árvore**
| # | Arquivo | Pasta | Descrição |
|---|---------|-------|-----------|
| 4 | `arvore-verde.png` | Base | Árvore verde estilizada |
| 5 | `arvore2.png` | realistas/ | Árvore com copa densa |
| 6 | `arvore3.png` | realistas/ | Árvore outono (folhas amarelas) |

#### **Objeto 3: Bicicleta**
| # | Arquivo | Pasta | Descrição |
|---|---------|-------|-----------|
| 7 | `bicicleta_vermelha.png` | Base | Bicicleta vermelha infantil |
| 8 | `bicicleta2.png` | realistas/ | Bicicleta azul com cesta |
| 9 | `bicicleta3.png` | realistas/ | Bicicleta roxa de corrida |

#### **Objeto 4: Borboleta**
| # | Arquivo | Pasta | Descrição |
|---|---------|-------|-----------|
| 10 | `borboleta.png` | Base | Borboleta laranja e preta |
| 11 | `borboleta2.png` | realistas/ | Borboleta azul detalhada |
| 12 | `borboleta3.png` | realistas/ | Borboleta roxa com padrões |

**📝 Exemplos de Comparação:**
- **IGUAIS:** `casa.png` ↔ `casa2.png` ✅ (mesmo objeto, variações)
- **IGUAIS:** `bicicleta_vermelha.png` ↔ `bicicleta3.png` ✅
- **DIFERENTES:** `arvore-verde.png` ↔ `borboleta2.png` ✅ (objetos distintos)
- **NUNCA:** `casa.png` ↔ `casa.png` ❌ (mesma imagem exata)

**📝 Notas:**
- Exibição: 160x160px por imagem
- Removido: `flor.png` e variações (para evitar confusão)
- Sistema de níveis visuais: REMOVIDO

---

## 🎮 **JOGO 3: CENA CERTA**

### **📍 Localização**
`Kids/src/assets/images/cena-certa/`

### **📊 Quantidade**
**11 imagens** (500x500px, PNG com transparência)

### **🎯 Como Funciona**
- Criança vê uma imagem (cena completa)
- Escolhe entre 3 frases qual descreve corretamente a cena
- Pergunta: "Qual frase combina com a cena?"
- Sistema de níveis internos (não exibido visualmente)

### **📂 Imagens e Respostas Corretas**

#### **Categoria: Relações Espaciais**

| # | Arquivo | Resposta Correta | Respostas Erradas | Descrição da Cena |
|---|---------|------------------|-------------------|-------------------|
| 1 | `gato_sobre_caixa.png` | "O gato está sobre a caixa." | • "O gato está escondido."<br>• "Não há gato na imagem." | Gato laranja sentado em cima de uma caixa marrom |
| 2 | `cachorro_embaixo_mesa.png` | "O cachorro está embaixo da mesa." | • "O cachorro está sobre a mesa."<br>• "A mesa está embaixo do cachorro." | Cachorro marrom deitado sob uma mesa de madeira |
| 3 | `menino_ao_lado_arvore.png` | "O menino está ao lado da árvore." | • "O menino está atrás da árvore."<br>• "O menino está longe da árvore." | Menino de pé ao lado de uma árvore verde grande |

#### **Categoria: Ações Simples**

| # | Arquivo | Resposta Correta | Respostas Erradas | Descrição da Cena |
|---|---------|------------------|-------------------|-------------------|
| 4 | `menina_empurra_carrinho.png` | "A menina empurra o carrinho." | • "O carrinho empurra a menina."<br>• "A menina está puxando o carrinho." | Menina empurrando um carrinho de brinquedo amarelo |
| 5 | `menino_chuta_bola.png` | "O menino chuta a bola." | • "O menino caiu no chão."<br>• "O menino pega a bola." | Menino chutando uma bola azul (perna levantada) |
| 6 | `cachorro_corre_parque.png` | "O cachorro corre no parque." | • "O cachorro está brincando de bola."<br>• "O cachorro dorme no parque." | Cachorro correndo em parque com árvores ao fundo |
| 7 | `menina_pula_corda.png` | "A menina pula corda." | • "A menina está correndo."<br>• "A menina está deitada." | Menina pulando corda (pés no ar, corda em movimento) |

#### **Categoria: Ações com Objeto Indireto**

| # | Arquivo | Resposta Correta | Respostas Erradas | Descrição da Cena |
|---|---------|------------------|-------------------|-------------------|
| 8 | `menino_da_maca_professora.png` | "O menino dá uma maçã para a professora." | • "A professora está ensinando."<br>• "O menino está chorando." | Menino entregando maçã vermelha para professora |
| 9 | `menina_mostra_desenho_mae.png` | "A menina mostra o desenho para a mãe." | • "A mãe está brigando com a menina."<br>• "A menina rasga o desenho da mãe." | Menina mostrando desenho colorido para a mãe |
| 10 | `pai_le_livro_crianca.png` | "O pai lê um livro para a criança." | • "A criança dorme com o pai."<br>• "A criança está comendo." | Pai e criança sentados juntos, pai lendo livro |
| 11 | `avo_entrega_presente_neto.png` | "A avó entrega um presente para o neto." | • "A avó está cozinhando para o neto."<br>• "O neto está jogando bola com a avó." | Avó entregando presente embrulhado para neto feliz |

**📝 Notas:**
- Exibição: 220x220px
- Removido: `bola_dentro_cesta.png` (a pedido do usuário)
- Marcadores visuais de nível: **REMOVIDOS**
- Níveis mantidos apenas na lógica interna para estatísticas

---

## 🎮 **JOGO 4: PALAVRAS (FORME A PALAVRA)**

### **📍 Localização**
`Kids/src/assets/images/palavras/` (todas na mesma pasta)

### **📊 Quantidade**
**16 imagens** (500x500px, PNG com transparência)

### **🎯 Como Funciona**
- 3 níveis de dificuldade:
- **Nível 1:** Juntar sílabas (ex: GA + TO = GATO)
  - **Nível 2:** Completar letras (ex: C_V_LO = CAVALO)
  - **Nível 3:** Ordenar letras (ex: RROCAHCO = CACHORRO)
- 6 palavras por sessão (selecionadas aleatoriamente)
- Criança vê a imagem e forma a palavra

### **📂 Imagens Utilizadas**

#### **Categoria: Animais (9 imagens)**

| # | Arquivo | Palavra | Nível | Tipo de Exercício |
|---|---------|---------|-------|-------------------|
| 1 | `gato.png` | GATO | 1 | Juntar sílabas: GA + TO |
| 2 | `pato.png` | PATO | 1 | Juntar sílabas: PA + TO |
| 3 | `sapo.png` | SAPO | 1 | Juntar sílabas: SA + PO |
| 4 | `urso.png` | URSO | 1 | Juntar sílabas: UR + SO |
| 5 | `cavalo.png` | CAVALO | 2 | Completar: C A V A _L_ O |
| 6 | `macaco.png` | MACACO | 2 | Completar: M A _C_ A _C_ O |
| 7 | `cachorro.png` | CACHORRO | 3 | Ordenar: C A C H O R R O |
| 8 | `coelho.png` | COELHO | 3 | Ordenar: C O E L H O |
| 9 | `elefante.png` | ELEFANTE | 3 | Ordenar: E L E F A N T E |

#### **Categoria: Alimentos (4 imagens)**

| # | Arquivo | Palavra | Nível | Tipo de Exercício |
|---|---------|---------|-------|-------------------|
| 10 | `ovo.png` | OVO | 1 | Juntar sílabas: O + VO |
| 11 | `uva.png` | UVA | 1 | Juntar sílabas: U + VA |
| 12 | `arroz.png` | ARROZ | 2 | Completar: A _R_ _R_ O Z |
| 13 | `sorvete.png` | SORVETE | 3 | Ordenar: S O R V E T E |

#### **Categoria: Objetos (3 imagens)**

| # | Arquivo | Palavra | Nível | Tipo de Exercício |
|---|---------|---------|-------|-------------------|
| 14 | `mesa.png` | MESA | 1 | Juntar sílabas: ME + SA |
| 15 | `cama.png` | CAMA | 1 | Juntar sílabas: CA + MA |
| 16 | `sofa.png` | SOFÁ | 1 | Juntar sílabas: SO + FÁ |

**📝 Notas:**
- Exibição: 180x180px
- Palavras removidas do jogo (para simplificar): peixe, vaca, porco, pão, mel, queijo, bolo, suco, leite, laranja, banana, bola, casa, luva, carro, livro, caderno, cadeira, lâmpada, janela
- Total de palavras por categoria priorizou clareza e simplicidade

---

## 🎨 **ESPECIFICAÇÕES TÉCNICAS**

### **Padrão de Todas as Imagens**

| Propriedade | Valor |
|-------------|-------|
| **Formato** | PNG |
| **Transparência** | Sim (fundo transparente) |
| **Dimensões originais** | 500x500px |
| **Estilo** | Flat design, ilustrações infantis |
| **Cores** | Paleta do projeto (#1e88e5, #43a047, #e53935, #fbc02d) |
| **Peso médio** | 50-150 KB por imagem |

### **Dimensões de Exibição no App**

| Jogo | Tamanho de Exibição | Proporção |
|------|---------------------|-----------|
| **Adivinha** | 220x220px | Escala de 500x500px |
| **Igual-Diferente** | 160x160px | Escala de 500x500px |
| **Cena Certa** | 220x220px | Escala de 500x500px |
| **Palavras** | 180x180px | Escala de 500x500px |

### **Carregamento**

Todas as imagens são carregadas via `require()` no React Native para melhor performance:

```typescript
// Exemplo de carregamento
const IMAGES = {
  'gato.png': require('../assets/images/adivinha/gato.png'),
  'cachorro.png': require('../assets/images/adivinha/cachorro.png'),
  // ...
};
```

---

## 📈 **ESTATÍSTICAS**

### **Por Jogo**

| Jogo | Imagens | % do Total | Categorias |
|------|---------|------------|------------|
| **Palavras** | 16 | 35.6% | Animais (9), Alimentos (4), Objetos (3) |
| **Igual-Diferente** | 12 | 26.7% | 4 objetos × 3 variações |
| **Cena Certa** | 11 | 24.4% | Relações (3), Ações (4), Indireto (4) |
| **Adivinha** | 6 | 13.3% | Animais (3), Frutas (2), Objetos (1) |
| **TOTAL** | **45** | **100%** | - |

### **Por Categoria Geral**

| Categoria | Total de Imagens | Jogos |
|-----------|------------------|-------|
| **Animais** | 12 | Adivinha (3), Palavras (9) |
| **Objetos/Coisas** | 12 | Igual-Diferente (12) |
| **Cenas/Ações** | 11 | Cena Certa (11) |
| **Alimentos** | 6 | Adivinha (2), Palavras (4) |
| **Objetos Diversos** | 4 | Adivinha (1), Palavras (3) |

---

## ✅ **STATUS DO PROJETO**

| Item | Status | Observações |
|------|--------|-------------|
| Imagens Adivinha | ✅ 100% | 6/6 completas |
| Imagens Igual-Diferente | ✅ 100% | 12/12 completas |
| Imagens Cena Certa | ✅ 100% | 11/11 completas |
| Imagens Palavras | ✅ 100% | 16/16 completas |
| Testes de carregamento | ✅ Aprovado | Todas carregam corretamente |
| Otimização de tamanho | ✅ Aprovado | Média 50-150 KB |
| Responsividade | ✅ Aprovado | Escala bem em todos os dispositivos |

---

**🎉 PROJETO 100% COMPLETO - TODAS AS 45 IMAGENS IMPLEMENTADAS!**

**📝 Última Revisão:** 18 de Outubro de 2025
