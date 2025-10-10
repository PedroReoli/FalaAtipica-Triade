# ⚠️ VALIDAÇÃO PENDENTE - Jogo das Palavras

## 🎯 **STATUS ATUAL:**
- ✅ **Bugs críticos CORRIGIDOS**
- ✅ **Dados VALIDADOS** (39 palavras)
- ⚠️ **FALTA: Validação funcional completa**

---

## 📋 **CHECKLIST DE VALIDAÇÃO**

### **1. Testar Tipo "SÍLABAS" (15 palavras)**

#### **Animais (5 palavras)**
- [ ] GATO (GA, TO)
- [ ] PATO (PA, TO)
- [ ] SAPO (SA, PO)
- [ ] URSO (UR, SO)
- [ ] PEIXE (PEI, XE)

#### **Alimentos (5 palavras)**
- [ ] PÃO (PÃO)
- [ ] OVO (O, VO)
- [ ] UVA (U, VA)
- [ ] MEL (MEL)
- [ ] QUEIJO (QUEI, JO)

#### **Objetos (5 palavras)**
- [ ] BOLA (BO, LA)
- [ ] MESA (ME, SA)
- [ ] CAMA (CA, MA)
- [ ] SOFÁ (SO, FÁ)
- [ ] LUVA (LU, VA)

**Testes para cada palavra:**
- [ ] Sílabas aparecem embaralhadas?
- [ ] Ao clicar, sílaba vai para o próximo slot?
- [ ] Ao completar, valida automaticamente?
- [ ] Toast de sucesso/erro aparece?
- [ ] Animação funciona?
- [ ] Avança para próxima palavra?

---

### **2. Testar Tipo "COMPLETAR" (12 palavras)**

#### **Animais (4 palavras)**
- [ ] VACA (V_CA, lacuna [1], opções [A, E, I, O])
- [ ] PORCO (P_RCO, lacuna [2], opções [R, L, T, N])
- [ ] CAVALO (CAVA_O, lacuna [4], opções [L, R, N, M])
- [ ] MACACO (MA_A_O, lacunas [2, 4], opções [C, K, Q, G])

#### **Alimentos (4 palavras)**
- [ ] BOLO (BO_O, lacuna [2], opções [L, R, T, N])
- [ ] SUCO (S_CO, lacuna [1], opções [U, O, A, E])
- [ ] LEITE (LEI_E, lacuna [3], opções [T, C, P, D])
- [ ] ARROZ (A__OZ, lacunas [1, 2], opções [R, L, N, M])

#### **Objetos (4 palavras)**
- [ ] CASA (_ASA, lacuna [0], opções [C, G, K, Q])
- [ ] CARRO (CA__O, lacunas [2, 3], opções [R, L, T, N])
- [ ] LIVRO (LIV_O, lacuna [3], opções [R, L, N, M])
- [ ] CADERNO (CADE_NO, lacuna [4], opções [R, L, T, D])

**Testes para cada palavra:**
- [ ] Palavra parcial aparece corretamente?
- [ ] Lacunas aparecem como slots vazios?
- [ ] Opções aparecem embaralhadas?
- [ ] Ao clicar, letra preenche próximo slot vazio?
- [ ] Com 1 lacuna: valida ao preencher 1 slot?
- [ ] Com 2 lacunas: valida ao preencher 2 slots?
- [ ] Toast de sucesso/erro aparece?
- [ ] Letra ERRADA volta para as opções?
- [ ] Letra CERTA permanece no slot?
- [ ] Avança para próxima palavra?

---

### **3. Testar Tipo "ORDENAR" (9 palavras)**

#### **Animais (3 palavras)**
- [ ] CACHORRO (8 letras: C, A, C, H, O, R, R, O)
- [ ] COELHO (6 letras: C, O, E, L, H, O)
- [ ] ELEFANTE (8 letras: E, L, E, F, A, N, T, E)

#### **Alimentos (3 palavras)**
- [ ] SORVETE (7 letras: S, O, R, V, E, T, E)
- [ ] LARANJA (7 letras: L, A, R, A, N, J, A)
- [ ] BANANA (6 letras: B, A, N, A, N, A)

#### **Objetos (3 palavras)**
- [ ] CADEIRA (7 letras: C, A, D, E, I, R, A)
- [ ] LAMPADA (7 letras: L, A, M, P, A, D, A)
- [ ] JANELA (6 letras: J, A, N, E, L, A)

**Testes para cada palavra:**
- [ ] Letras aparecem embaralhadas?
- [ ] Ao clicar, letra vai para o próximo slot?
- [ ] Letras repetidas funcionam? (ex: CACHORRO tem 2 Rs)
- [ ] Ao completar todos os slots, valida automaticamente?
- [ ] Toast de sucesso/erro aparece?
- [ ] Ordem ERRADA mostra feedback de erro?
- [ ] Ao errar, limpa todos os slots?
- [ ] Avança para próxima palavra?

---

### **4. Testar Cenários de Erro e Retry**

#### **Tentativas e Feedback**
- [ ] Errar 1x → Toast de erro → Limpa → Permite retry
- [ ] Errar 2x → Toast de erro → Limpa → Permite retry
- [ ] Errar 3x → Toast de erro → Avança para próxima palavra (sem mais tentativas)
- [ ] Acertar após 1 erro → Funciona normalmente
- [ ] Acertar após 2 erros → Funciona normalmente

#### **Remover Itens (Clique no Slot Preenchido)**
- [ ] Sílabas: Clique no slot → Sílaba volta → Outros slots reorganizam
- [ ] Completar: Clique no slot → Letra volta → Slot fica vazio
- [ ] Ordenar: Clique no slot → Letra volta → Outros slots reorganizam

#### **Sistema de Prompting (Dicas)**
- [ ] Após 8s de inatividade → Dica visual (borda verde pulsante)
- [ ] Após 2 acertos seguidos → Dicas param (fading)
- [ ] Ao clicar em qualquer item → Timer reinicia

---

### **5. Testar Progressão e Pontuação**

#### **Fluxo Completo**
- [ ] Iniciar jogo → 8 palavras aleatórias
- [ ] Acertar palavra → +10 pontos → Avança
- [ ] Acertar sem dica → +5 pontos bônus
- [ ] Completar as 8 palavras → Tela de resultado
- [ ] Tela de resultado mostra:
  - [ ] Pontuação total
  - [ ] Quantidade de acertos
  - [ ] Percentual de acertos
  - [ ] Mensagem de parabéns
  - [ ] Botão "Jogar Novamente"

#### **Sessões Múltiplas**
- [ ] Jogar novamente → Novas 8 palavras aleatórias
- [ ] Palavras não repetem na mesma sessão?
- [ ] Variedade de tipos (sílabas, completar, ordenar)

---

### **6. Testar UX e Feedback Visual**

#### **Animações**
- [ ] Ao acertar: Estrela + Sparkles + Confete
- [ ] Ao errar: Vibração suave (se implementado)
- [ ] Toast centralizado e legível
- [ ] Transições suaves entre palavras

#### **Layout e Responsividade**
- [ ] Imagem da palavra visível e proporcional
- [ ] Slots de formação bem espaçados
- [ ] Opções clicáveis fáceis de tocar (>44px)
- [ ] Texto legível em todas as resoluções
- [ ] Botão "Home" no header funciona

#### **Estados Visuais**
- [ ] Item normal: estilo padrão
- [ ] Item clicado: feedback visual (scale 0.95, opacity 0.7)
- [ ] Item na formação: desaparece das opções
- [ ] Slot vazio: visível e distinto
- [ ] Slot preenchido: mostra letra/sílaba + botão remover (X)

---

## 🐛 **BUGS PARA REPORTAR (Se Encontrados):**

### **Críticos (Travam o Jogo)**
- [ ] Palavra que não valida (fica parado)
- [ ] Palavra que não avança (loop infinito)
- [ ] Crash/erro no console
- [ ] Impossível remover item do slot

### **Médios (Atrapalham UX)**
- [ ] Toast não aparece
- [ ] Animação não funciona
- [ ] Pontuação errada
- [ ] Palavra repetida na mesma sessão
- [ ] Letras embaralhadas de forma idêntica à resposta

### **Menores (Polimento)**
- [ ] Layout desalinhado
- [ ] Cores inconsistentes
- [ ] Texto muito pequeno/grande
- [ ] Transições bruscas

---

## ✅ **CRITÉRIOS DE ACEITE FINAL:**

### **Para considerar 100% pronto:**
- ✅ Todas as 39 palavras testadas e funcionando
- ✅ Todos os 3 tipos (sílabas, completar, ordenar) funcionam
- ✅ Sistema de tentativas funciona (3 tentativas por palavra)
- ✅ Toast de feedback aparece sempre
- ✅ Animações funcionam
- ✅ Progressão entre palavras fluida
- ✅ Pontuação correta
- ✅ Tela de resultado funcional
- ✅ Nenhum bug crítico encontrado
- ✅ UX satisfatória para crianças

---

## 📝 **COMO REPORTAR PROBLEMAS:**

Ao encontrar um bug, anotar:
1. **Palavra**: Qual palavra estava jogando?
2. **Tipo**: Sílabas, Completar ou Ordenar?
3. **Ação**: O que você fez? (ex: cliquei em "GA")
4. **Esperado**: O que deveria acontecer?
5. **Real**: O que aconteceu?
6. **Reproduzível**: Acontece sempre ou às vezes?

**Exemplo:**
```
Palavra: VACA
Tipo: Completar
Ação: Cliquei na letra "A"
Esperado: Letra "A" preenche o slot vazio e valida automaticamente
Real: Letra "A" voltou para as opções, nenhum feedback
Reproduzível: Sempre
```

---

**Data**: 2025-01-10  
**Status**: ⚠️ **AGUARDANDO VALIDAÇÃO COMPLETA**  
**Responsável**: Usuário (testes manuais)  
**Versão**: 2.1.0-BETA

