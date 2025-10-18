# 🎨 Imagens Necessárias - FalaAtípica Triade

**Última Atualização:** 17 de Outubro de 2025

---

## 📱 **KIDS APP - Imagens dos Jogos**

### **1. Jogo: Adivinha** ✅ COMPLETO

**Pasta:** `Kids/src/assets/images/adivinha/`

| Categoria | Nome do Arquivo  | Descrição           | Status    | Tamanho |
| --------- | ---------------- | --------------------- | --------- | --------- |
| Animais   | `cachorro.png` | Cachorro marrom      | ✅ Existe | 500x500px |
| Animais   | `gato.png`     | Gato laranja         | ✅ Existe | 500x500px |
| Animais   | `passaro.png`  | Pássaro colorido    | ✅ Existe | 500x500px |
| Frutas    | `banana.png`   | Banana amarela       | ✅ Existe | 500x500px |
| Frutas    | `maca.png`     | Maçã vermelha       | ✅ Existe | 500x500px |
| Objetos   | `bola.png`     | Bola de futebol      | ✅ Existe | 500x500px |
| Objetos   | `livro.png`    | Livro vermelho       | ✅ Existe | 500x500px |

**Características:**
- Formato: PNG com fundo transparente
- Tamanho: **500x500px** (todas!)
- Estilo: Ilustrações coloridas, infantis, sem texto
- Cores: Vibrantes e contrastantes

**Funcionamento do jogo:**
- Total: **14 rodadas** (7 imagens × 2)
- Embaralha aleatoriamente as imagens
- **NÃO repete a mesma imagem em sequência**
- Exibição: 220x220px com borda azul
- Pergunta: "O que é isso?"

---

### **2. Jogo: Igual-Diferente** ✅ REFATORADO - ⏳ GERAR IMAGENS

⚠️ **ATENÇÃO - MUDANÇA CRÍTICA PLANEJADA:** Ver `TODO.md` → "PRIORIDADE CRÍTICA"
✅ **LÓGICA ATUALIZADA!** Agora compara objetos SEMELHANTES!

**Como funciona:** Aparecem 2 itens lado a lado (variações do MESMO objeto), criança decide se são IGUAIS ou DIFERENTES

**🎯 Nova Lógica Implementada:**
- Compara objetos SEMELHANTES: `objeto.png` vs `objeto2.png`
- Exemplo: Duas flores (uma amarela, uma vermelha)
- Exemplo: Duas casas (telhados diferentes)
- **Objetivo Pedagógico:** Ajudar crianças a identificar semelhanças e diferenças sutis

**Pasta:** `Kids/src/assets/images/igual-diferente/` (todas as imagens na mesma pasta)

**⚠️ PADRÃO OBRIGATÓRIO DE NOMENCLATURA:**
- Sempre `objeto.png` e `objeto2.png` (com "2" no final)
- Tamanho: **500x500px** (padrão do projeto)
- Formato: PNG com fundo transparente

#### **NÍVEL 1 - Diferenças Grandes (4 pares = 7 imagens)**

| # | Nome do Arquivo | Descrição EXATA | Status |
|---|----------------|-----------------|--------|
| 1 | `flor.png` | Flor amarela com 5 pétalas, caule verde | ⏳ Gerar |
| 2 | `flor2.png` | Flor vermelha com 5 pétalas, caule verde (MESMA flor, cor diferente) | ⏳ Gerar |
| 3 | `casa.png` | Casa branca com telhado triangular vermelho, porta azul | ⏳ Gerar |
| 4 | `casa2.png` | Casa branca com telhado plano azul, porta azul (MESMA casa, telhado diferente) | ⏳ Gerar |
| 5 | `carro.png` | Carro azul sedan, 4 portas | ⏳ Gerar |
| 6 | `carro2.png` | Carro vermelho sedan, 4 portas (MESMO carro, cor diferente) | ⏳ Gerar |
| 7 | `cachorro.png` | Cachorro marrom sentado (imagem repetida = IGUAL) | ⏳ Gerar |

---

#### **NÍVEL 2 - Diferenças Médias (4 pares = 7 imagens)**

| # | Nome do Arquivo | Descrição EXATA | Status |
|---|----------------|-----------------|--------|
| 8 | `arvore.png` | Árvore verde com MUITAS folhas, copa cheia | ⏳ Gerar |
| 9 | `arvore2.png` | Árvore verde com POUCAS folhas, copa rala (MESMA árvore, menos folhas) | ⏳ Gerar |
| 10 | `bicicleta.png` | Bicicleta vermelha SEM cesta | ⏳ Gerar |
| 11 | `bicicleta2.png` | Bicicleta vermelha COM cesta na frente (MESMA bike, cesta adicionada) | ⏳ Gerar |
| 12 | `passaro.png` | Pássaro azul com asas abertas | ⏳ Gerar |
| 13 | `passaro2.png` | Pássaro amarelo com asas abertas (MESMO formato, cor diferente) | ⏳ Gerar |
| 14 | `bola.png` | Bola de futebol (imagem repetida = IGUAL) | ⏳ Gerar |

---

#### **NÍVEL 3 - Diferenças Sutis (4 pares = 7 imagens)**

| # | Nome do Arquivo | Descrição EXATA | Status |
|---|----------------|-----------------|--------|
| 15 | `borboleta.png` | Borboleta com padrão de BOLINHAS nas asas | ⏳ Gerar |
| 16 | `borboleta2.png` | Borboleta com padrão de LISTRAS nas asas (MESMA borboleta, padrão diferente) | ⏳ Gerar |
| 17 | `estrela.png` | Estrela de 5 pontas amarela | ⏳ Gerar |
| 18 | `estrela2.png` | Estrela de 6 pontas amarela (MESMA estrela, uma ponta a mais) | ⏳ Gerar |
| 19 | `gato.png` | Gato laranja com cauda PARA CIMA | ⏳ Gerar |
| 20 | `gato2.png` | Gato laranja com cauda PARA BAIXO (MESMO gato, cauda diferente) | ⏳ Gerar |
| 21 | `livro.png` | Livro fechado azul (imagem repetida = IGUAL) | ⏳ Gerar |

---

**Características das Imagens:**
- Formato: PNG com fundo transparente
- Tamanho: **500x500px** (TODAS!)
- Estilo: Ilustrações infantis, flat design, OBJETO ISOLADO
- Cores: Vibrantes e claras (paleta do projeto: #1e88e5, #43a047, #e53935, #fbc02d)
- **CRÍTICO:** Pares "diferentes" devem ser SEMELHANTES (mesmo objeto, pequenas variações)
- **CRÍTICO:** Pares "iguais" usam a MESMA imagem 2 vezes (sem "2")
- **Exibição no app:** 160x160px (escala automaticamente de 500x500px)

**Total:** ⏳ **21 imagens únicas** para gerar

**🎯 Estratégia de Variação:**
- **Nível 1:** Cores diferentes, formas grandes diferentes (muito óbvio)
- **Nível 2:** Acessórios adicionados/removidos, quantidade de elementos (médio)
- **Nível 3:** Detalhes mínimos - padrões, posições, pequenas diferenças (difícil)

---

### **3. Jogo: Cena Certa** ⏳ FALTA GERAR

**Como funciona:** 
- Mostra uma IMAGEM (cena completa)
- Apresenta 3 FRASES como opções
- Criança escolhe qual frase descreve corretamente a cena

**Exemplo:** 
- IMAGEM: Menino chutando uma bola azul
- FRASE CERTA: "O menino chuta a bola."
- FRASES ERRADAS: "A bola chuta o menino." / "O menino pega a bola."

**Pasta:** `Kids/src/assets/images/cena-certa/` (todas as imagens na mesma pasta)

#### **NÍVEL 1 - Relações Espaciais (3 imagens)**

| # | Nome do Arquivo | Descrição EXATA da Cena | Frase Certa | Status |
|---|----------------|------------------------|-------------|--------|
| 1 | `gato_sobre_caixa.png` | Gato laranja sentado SOBRE uma caixa marrom | "O gato está sobre a caixa." | ✅ Existe |
| 2 | `cachorro_embaixo_mesa.png` | Cachorro marrom deitado EMBAIXO de uma mesa de madeira | "O cachorro está embaixo da mesa." | ✅ Existe |
| 3 | `menino_ao_lado_arvore.png` | Menino de pé AO LADO de uma árvore verde | "O menino está ao lado da árvore." | ✅ Existe |

#### **NÍVEL 2 - Ações Simples (4 imagens)**

| # | Nome do Arquivo | Descrição EXATA da Cena | Frase Certa | Status |
|---|----------------|------------------------|-------------|--------|
| 4 | `menina_empurra_carrinho.png` | Menina EMPURRANDO um carrinho de brinquedo amarelo | "A menina empurra o carrinho." | ✅ Existe |
| 5 | `menino_chuta_bola.png` | Menino CHUTANDO uma bola azul (perna levantada) | "O menino chuta a bola." | ✅ Existe |
| 6 | `cachorro_corre_parque.png` | Cachorro CORRENDO no parque (árvores ao fundo, grama verde) | "O cachorro corre no parque." | ✅ Existe |
| 7 | `menina_pula_corda.png` | Menina PULANDO corda (corda em movimento, pés no ar) | "A menina pula corda." | ✅ Existe |

#### **NÍVEL 3 - Ações com Objeto Indireto (4 imagens)**

| # | Nome do Arquivo | Descrição EXATA da Cena | Frase Certa | Status |
|---|----------------|------------------------|-------------|--------|
| 8 | `menino_da_maca_professora.png` | Menino ENTREGANDO maçã vermelha PARA professora (ela recebendo) | "O menino dá uma maçã para a professora." | ✅ Existe |
| 9 | `menina_mostra_desenho_mae.png` | Menina MOSTRANDO desenho colorido PARA mãe (mãe olhando) | "A menina mostra o desenho para a mãe." | ✅ Existe |
| 10 | `pai_le_livro_crianca.png` | Pai LENDO livro PARA criança (sentados juntos, criança ouvindo) | "O pai lê um livro para a criança." | ✅ Existe |
| 11 | `avo_entrega_presente_neto.png` | Avó ENTREGANDO presente embrulhado PARA neto (neto feliz) | "A avó entrega um presente para o neto." | ✅ Existe |

**Características:**
- Formato: PNG com fundo transparente
- Tamanho: **500x500px** (todas! mesmo padrão)
- Estilo: Ilustrações infantis, flat design, CENAS COMPLETAS
- Cores: Vibrantes e claras
- **IMPORTANTE:** Deve mostrar AÇÃO acontecendo (verbos: chutando, empurrando, correndo, etc)
- **CRÍTICO:** A cena deve ser CLARA para a criança identificar QUEM faz, O QUE faz, PARA QUEM

**Total:** ✅ 11 imagens (cenas completas) - TODAS GERADAS!  
**Nota:** Removida "bola_dentro_cesta.png" a pedido do usuário

---

### **4. Jogo: Palavras (Forme a Palavra)**

**Descrição:** Jogo progressivo de formação de palavras com 3 níveis de dificuldade por categoria.

**Mecânica:**
- **Nível 1:** Juntar sílabas (ex: GA + TO = GATO)
- **Nível 2:** Completar letras faltando (ex: V_CA = VACA)
- **Nível 3:** Ordenar letras embaralhadas (ex: RROCAHCO = CACHORRO)

**Pasta:** `Kids/src/assets/images/palavras/` (organizadas em subpastas: `animais/`, `alimentos/`, `objetos/`)

---

#### **CATEGORIA: ANIMAIS (12 imagens)**

**Subpasta:** `animais/`

| # | Nome do Arquivo | Palavra | Nível | Status | Pode Reusar? |
|---|----------------|---------|-------|--------|-------------|
| 1 | `gato.png` | GATO | 1 - Sílabas | ⏳ Gerar | ✅ Sim - `adivinha/gato.png` |
| 2 | `pato.png` | PATO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 3 | `sapo.png` | SAPO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 4 | `urso.png` | URSO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 5 | `peixe.png` | PEIXE | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 6 | `vaca.png` | VACA | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 7 | `porco.png` | PORCO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 8 | `cavalo.png` | CAVALO | 2 - Completar | ⏳ Gerar | ✅ Sim - `igual-diferente/cavalo.png` |
| 9 | `macaco.png` | MACACO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 10 | `cachorro.png` | CACHORRO | 3 - Ordenar | ⏳ Gerar | ✅ Sim - `adivinha/cachorro.png` |
| 11 | `coelho.png` | COELHO | 3 - Ordenar | ⏳ Gerar | ❌ Nova |
| 12 | `elefante.png` | ELEFANTE | 3 - Ordenar | ⏳ Gerar | ✅ Sim - `igual-diferente/elefante.png` |

---

#### **CATEGORIA: ALIMENTOS (12 imagens)**

**Subpasta:** `alimentos/`

| # | Nome do Arquivo | Palavra | Nível | Status | Pode Reusar? |
|---|----------------|---------|-------|--------|-------------|
| 13 | `pao.png` | PÃO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 14 | `ovo.png` | OVO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 15 | `uva.png` | UVA | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 16 | `mel.png` | MEL | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 17 | `queijo.png` | QUEIJO | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 18 | `bolo.png` | BOLO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 19 | `suco.png` | SUCO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 20 | `leite.png` | LEITE | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 21 | `arroz.png` | ARROZ | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 22 | `sorvete.png` | SORVETE | 3 - Ordenar | ⏳ Gerar | ❌ Nova |
| 23 | `laranja.png` | LARANJA | 3 - Ordenar | ⏳ Gerar | ❌ Nova |
| 24 | `banana.png` | BANANA | 3 - Ordenar | ⏳ Gerar | ✅ Sim - `adivinha/banana.png` |

---

#### **CATEGORIA: OBJETOS (12 imagens)**

**Subpasta:** `objetos/`

| # | Nome do Arquivo | Palavra | Nível | Status | Pode Reusar? |
|---|----------------|---------|-------|--------|-------------|
| 25 | `bola.png` | BOLA | 1 - Sílabas | ⏳ Gerar | ✅ Sim - `adivinha/bola.png` |
| 26 | `mesa.png` | MESA | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 27 | `cama.png` | CAMA | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 28 | `sofa.png` | SOFÁ | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 29 | `luva.png` | LUVA | 1 - Sílabas | ⏳ Gerar | ❌ Nova |
| 30 | `casa.png` | CASA | 2 - Completar | ⏳ Gerar | ✅ Sim - `igual-diferente/casa.png` |
| 31 | `carro.png` | CARRO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 32 | `livro.png` | LIVRO | 2 - Completar | ⏳ Gerar | ✅ Sim - `adivinha/livro.png` |
| 33 | `caderno.png` | CADERNO | 2 - Completar | ⏳ Gerar | ❌ Nova |
| 34 | `cadeira.png` | CADEIRA | 3 - Ordenar | ⏳ Gerar | ❌ Nova |
| 35 | `lampada.png` | LÂMPADA | 3 - Ordenar | ⏳ Gerar | ❌ Nova |
| 36 | `janela.png` | JANELA | 3 - Ordenar | ⏳ Gerar | ❌ Nova |

---

**Características das Imagens:**
- Formato: PNG com fundo transparente
- Tamanho: **500x500px** (mesmo padrão dos outros jogos!)
- Estilo: Ilustrações infantis, flat design, **OBJETO/ANIMAL/ALIMENTO ISOLADO**
- Cores: Vibrantes e claras (usar paleta do projeto: #1e88e5, #43a047, #e53935, #fbc02d)
- **IMPORTANTE:** Imagens SIMPLES e DIRETAS - apenas o objeto principal, sem cenário
- **CRÍTICO:** Deve ser facilmente reconhecível pela criança e CLARA para associar à palavra

---

**📊 Resumo de Produção:**

| Categoria | Total | Podem Reusar | Novas a Gerar | % Reuso |
|-----------|-------|--------------|---------------|---------|
| **Animais** | 12 | 4 | 8 | 33% |
| **Alimentos** | 12 | 1 | 11 | 8% |
| **Objetos** | 12 | 3 | 9 | 25% |
| **TOTAL** | **36** | **8** | **28** | **22%** |

**🎯 AÇÃO NECESSÁRIA:**
- ✅ **Reusar 8 imagens** existentes (copiar para as pastas corretas)
- ⏳ **Gerar 28 novas imagens** (seguindo o padrão 500x500px)

---

## 🏢 **TUTORS APP - Ícones e Imagens**

### **Ícones da Interface**

**Nota:** Usando Lucide Icons (não precisa gerar)

### **Imagens de Placeholders - nao precisodessas imagens,tire dessa lista**

| Nome do Arquivo              | Descrição                                 | Status         | Tamanho   |
| ---------------------------- | ------------------------------------------- | -------------- | --------- |
| `avatar-crianca.png`       | Avatar padrão para criança                | ⏳ Necessário | 200x200px |
| `empty-state-progress.png` | Ilustração para estado vazio de progresso | ⏳ Necessário | 400x400px |
| `empty-state-agenda.png`   | Ilustração para estado vazio de agenda    | ⏳ Necessário | 400x400px |

**Características:**

- Formato: PNG com fundo transparente
- Estilo: Ilustrações modernas, flat design
- Cores: Paleta do app (#1e88e5, #43a047, #e53935, #fbc02d)

---

## 💼 **PRO APP - Ícones e Imagens**

### **Ícones da Interface**

**Nota:** Usando Lucide React (não precisa gerar)

### **Imagens de Placeholders - nao preciso dessas imagens tambem , tire da lista**

| Nome do Arquivo                  | Descrição                                 | Status         | Tamanho   |
| -------------------------------- | ------------------------------------------- | -------------- | --------- |
| `avatar-paciente.png`          | Avatar padrão para paciente                | ⏳ Necessário | 200x200px |
| `avatar-profissional.png`      | Avatar padrão para profissional            | ⏳ Necessário | 200x200px |
| `empty-state-patients.png`     | Ilustração para estado vazio de pacientes | ⏳ Necessário | 400x400px |
| `empty-state-sessions.png`     | Ilustração para estado vazio de sessões  | ⏳ Necessário | 400x400px |
| `empty-state-partnerships.png` | Ilustração para estado vazio de parcerias | ⏳ Necessário | 400x400px |

**Características:**

- Formato: PNG com fundo transparente
- Estilo: Ilustrações profissionais, clean
- Cores: Neutras com accent colors da role (fono, psico, etc)

---

## 🌐 **SITE INSTITUCIONAL - NAO vamos emxer nele agora** 

### **Logo e Branding**

| Nome do Arquivo                 | Descrição           | Status         | Tamanho    |
| ------------------------------- | --------------------- | -------------- | ---------- |
| `falaatipica-logo.png`        | Logo principal        | ✅ Existe      | 512x512px  |
| `falaatipica-logo-letras.png` | Logo com texto        | ✅ Existe      | 1200x400px |
| `favicon.ico`                 | Favicon 16x16 e 32x32 | ⏳ Necessário | 32x32px    |

### **Hero Section**

| Nome do Arquivo     | Descrição                           | Status         | Tamanho   |
| ------------------- | ------------------------------------- | -------------- | --------- |
| `hero-kids.png`   | Ilustração criança jogando         | ⏳ Necessário | 800x600px |
| `hero-tutors.png` | Ilustração pai/mãe acompanhando    | ⏳ Necessário | 800x600px |
| `hero-pro.png`    | Ilustração profissional trabalhando | ⏳ Necessário | 800x600px |

**Características:**

- Formato: PNG ou SVG
- Estilo: Moderno, flat design, ilustrações isométricas
- Cores: Paleta do app
- Background: Transparente ou gradiente sutil

### **Screenshots dos Apps**

| Nome do Arquivo                    | Descrição              | Status         | Tamanho     |
| ---------------------------------- | ------------------------ | -------------- | ----------- |
| `screenshot-kids-dashboard.png`  | Tela inicial Kids        | ⏳ Necessário | 1080x1920px |
| `screenshot-kids-game.png`       | Tela de jogo Kids        | ⏳ Necessário | 1080x1920px |
| `screenshot-tutors-progress.png` | Tela de progresso Tutors | ⏳ Necessário | 1080x1920px |
| `screenshot-pro-dashboard.png`   | Dashboard Pro            | ⏳ Necessário | 1920x1080px |
| `screenshot-pro-patient.png`     | Detalhes do paciente Pro | ⏳ Necessário | 1920x1080px |

**Como Gerar:**

- Rodar os apps e fazer screenshots reais
- Ou usar mockups de dispositivos (ex: MockuPhone, Figma)

---

## 🎨 **Especificações Gerais**

### **Paleta de Cores Oficial**

```
Azul:    #1e88e5
Verde:   #43a047
Vermelho: #e53935
Amarelo:  #fbc02d
Fundo Azul: #054776
Fundo Branco: #f4f6ff
Texto Preto: #3c3c3c
Texto Branco: #FFFFFF
```

### **Fontes**

- **Kids:** Sans-serif arredondada, bold
- **Tutors:** Sans-serif moderna
- **Pro:** Sans-serif profissional (Inter, Roboto)

### **Estilo Visual**

- **Kids:** Ilustrações coloridas, cartoonescas, divertidas
- **Tutors:** Ilustrações amigáveis, modernas, acessíveis
- **Pro:** Ilustrações limpas, profissionais, minimalistas

---

## 🛠️ **Ferramentas Recomendadas**

### **Para Ilustrações**

- **Figma** - Design e ilustrações vetoriais
- **Adobe Illustrator** - Ilustrações profissionais
- **Canva** - Ilustrações simples e rápidas
- **MidJourney / DALL-E** - IA para gerar ilustrações

### **Para Screenshots**

- **MockuPhone** - Mockups de dispositivos
- **Figma** - Frames de dispositivos
- **Screely** - Screenshots com fundo bonito

### **Para Otimização**

- **TinyPNG** - Comprimir PNGs
- **SVGOMG** - Otimizar SVGs
- **ImageOptim** - Otimização em lote

---

## 📋 **Checklist de Prioridade**

### 🔴 **Urgente (Para Apresentação)**

- [ ] Screenshots dos 3 apps (5 screenshots)
- [ ] Hero images do site (3 ilustrações)
- [ ] Avatar placeholders (3 avatares)
- [ ] Favicon do site

### 🟡 **Importante (Para Deploy)**

- [ ] Empty states (6 ilustrações)
- [ ] Imagens adicionais dos jogos (20 imagens)
- [ ] Logo variations (dark/light)

### 🟢 **Desejável (Futuro)**

- [ ] Animações Lottie
- [ ] Vídeos demonstrativos
- [ ] GIFs de loading

---

## 💡 **Dicas para Geração com IA**

### **Prompts para MidJourney/DALL-E**

#### **Kids App - Jogo Adivinha (Gato)**

```
Cute cartoon illustration of a cat, children's book style, 
bright colors (#1e88e5, #43a047, #fbc02d), 
simple shapes, transparent background, 
friendly expression, educational game asset, 
vector style, flat design, no text --ar 1:1
```

#### **Hero Section - Kids**

```
Isometric illustration of a happy child playing 
educational games on tablet, bright colors, 
modern flat design, transparent background, 
cartoon style, cheerful atmosphere --ar 4:3
```

#### **Empty State - Progress**

```
Minimal illustration of empty progress chart, 
friendly and encouraging, modern flat design, 
blue (#1e88e5) accent, transparent background, 
simple shapes, educational theme --ar 1:1
```

---

**📝 Nota:** Sempre revisar as imagens geradas para garantir que estão de acordo com o estilo visual do projeto e são apropriadas para crianças (no caso do Kids app).
