# Dados Integrados - FalaAtípica

## 📋 Estrutura de Consistência entre Apps

Este documento garante que os dados estejam **interligados corretamente** entre KIDS, TUTORS e PRO.

---

## 🔗 Estrutura de Relacionamentos

### Crianças (KIDS)
| ID | Nome | Idade | Responsável | Tutor ID |
|----|------|-------|-------------|----------|
| `"1"` | João Silva | 8 anos | Carlos Silva | `tutor_001` |
| `"2"` | Maria Santos | 6 anos | Ana Santos | `tutor_002` |
| `"3"` | Pedro Costa | 10 anos | Lucia Costa | `tutor_003` |

### Tutores/Responsáveis (TUTORS)
| ID | Nome | Email | Relacionamento | Crianças IDs | Profissional ID |
|----|------|-------|----------------|--------------|-----------------|
| `tutor_001` | Carlos Silva | carlos@tutors.com | Pai | `["1"]` | `prof_001` |
| `tutor_002` | Ana Santos | ana@tutors.com | Mãe | `["2"]` | `prof_001` |
| `tutor_003` | Lucia Costa | lucia@tutors.com | Mãe | `["3"]` | `prof_002` |

### Profissionais (PRO)
| ID | Nome | Especialidade | Pacientes IDs |
|----|------|---------------|---------------|
| `prof_001` | Dra. Ana Paula Santos | Fonoaudióloga | `["1", "2"]` |
| `prof_002` | Dr. Roberto Alves | Psicólogo Infantil | `["3"]` |

---

## 📂 Mapeamento de Arquivos

### KIDS (`Mockup/KIDS/`)
- ✅ `usuarios.json` - IDs: `"1"`, `"2"`, `"3"`
- ✅ `adivinha.json` - Dados do jogo Adivinha
- ✅ `palavras.json` - Dados do Jogo das Palavras
- ✅ `categorias.json` - Categorias dos jogos

### TUTORS (`Mockup/TUTORS/`)
- ✅ `usuarios.json` - IDs: `tutor_001`, `tutor_002`, `tutor_003`
- ✅ `perfil.json` - Perfil do tutor com criançasIds: `["1"]`
- ✅ `agendas.json` - Agendas com criancaId: `"1"`, `"2"`, `"3"`
- ✅ `relatorios.json` - Relatórios com criancaId: `"1"`, `"2"`, `"3"`
- ✅ `progress.json` - Progresso das crianças
- ✅ `dicas.json` - Dicas para responsáveis
- ✅ `suporte.json` - FAQ e suporte

### PRO (`Mockup/PRO/`)
- ✅ `agendas.json` - Agendas com criancaId e tutorId
- ✅ `pacientes.json` - IDs: `"1"`, `"2"`, `"3"` com tutorId
- ✅ `sessoes.json` - Sessões com pacienteId: `"1"`, `"2"`, `"3"`
- ✅ `relatorios.json` - Relatórios profissionais
- ✅ `profissionais.json` - Dados dos profissionais
- ✅ `medicamentos.json` - Prescrições (quando aplicável)

### SHARED (`Mockup/shared/`)
- ✅ `progress.json` - Progresso compartilhado com userId: `"1"`, `"2"`, `"3"`
- ✅ `sessions.json` - Sessões de jogos compartilhadas

---

## 🎯 Regras de Consistência

### 1. **IDs de Crianças**
- ✅ **SEMPRE** usar `"1"`, `"2"`, `"3"` (string)
- ❌ **NUNCA** usar `"child_001"`, `"crianca_001"`, `"paciente_001"`

### 2. **IDs de Tutores**
- ✅ **SEMPRE** usar `"tutor_001"`, `"tutor_002"`, `"tutor_003"`
- ✅ Formato: `tutor_XXX` (onde XXX é número sequencial com zeros à esquerda)

### 3. **IDs de Profissionais**
- ✅ **SEMPRE** usar `"prof_001"`, `"prof_002"`, etc.
- ✅ Formato: `prof_XXX`

### 4. **Nomes Consistentes**
| ID | Nome CORRETO | ❌ Evitar |
|----|--------------|-----------|
| `"1"` | João Silva | João Pedro, João Costa |
| `"2"` | Maria Santos | Maria Oliveira, Ana Santos |
| `"3"` | Pedro Costa | Carlos Oliveira, Pedro Silva |

### 5. **Relacionamentos**
```
Criança "1" (João Silva)
  ↓
Tutor tutor_001 (Carlos Silva)
  ↓
Profissional prof_001 (Dra. Ana Paula Santos)

Criança "2" (Maria Santos)
  ↓
Tutor tutor_002 (Ana Santos)
  ↓
Profissional prof_001 (Dra. Ana Paula Santos)

Criança "3" (Pedro Costa)
  ↓
Tutor tutor_003 (Lucia Costa)
  ↓
Profissional prof_002 (Dr. Roberto Alves)
```

---

## 🔍 Checklist de Validação

### Ao Criar/Modificar Dados:

#### ✅ Verificar IDs
- [ ] Criança usa ID `"1"`, `"2"` ou `"3"`
- [ ] Tutor usa ID `tutor_XXX`
- [ ] Profissional usa ID `prof_XXX`

#### ✅ Verificar Nomes
- [ ] Nome da criança bate em KIDS, TUTORS e PRO
- [ ] Nome do tutor bate em TUTORS e PRO
- [ ] Nome do profissional é consistente

#### ✅ Verificar Relacionamentos
- [ ] `criancasIds` do tutor contém IDs corretos
- [ ] `tutorId` na criança/paciente aponta para tutor correto
- [ ] `profissionalId` aponta para profissional correto

#### ✅ Verificar Agendas
- [ ] Agenda usa `criancaId` correto (ex: `"1"`)
- [ ] Tutor só vê agendas de suas crianças
- [ ] Profissional vê agendas de seus pacientes

---

## 📊 Exemplo de Consistência - Agenda

### Agenda para João Silva (ID: "1")

**TUTORS** (`Mockup/TUTORS/agendas.json`):
```json
{
  "id": "agenda_001",
  "criancaId": "1",
  "criancaNome": "João Silva",
  "profissionalId": "prof_001",
  "profissionalNome": "Dra. Ana Paula Santos"
}
```

**PRO** (`Mockup/PRO/agendas.json`):
```json
{
  "id": "agenda_001",
  "criancaId": "1",
  "criancaNome": "João Silva",
  "tutorId": "tutor_001",
  "tutorNome": "Carlos Silva",
  "profissionalId": "prof_001"
}
```

**Validação**:
- ✅ `criancaId: "1"` é o mesmo nos 2 apps
- ✅ `tutorId: "tutor_001"` aponta para Carlos Silva
- ✅ Carlos Silva (`tutor_001`) tem `criancasIds: ["1"]`
- ✅ Profissional `prof_001` atende criança `"1"`

---

## 🚨 Erros Comuns a Evitar

### ❌ IDs Inconsistentes
```json
// ERRADO
"criancaId": "child_001"  // ❌
"criancaId": "crianca_001"  // ❌
"criancaId": "paciente_001"  // ❌

// CORRETO
"criancaId": "1"  // ✅
```

### ❌ Nomes Diferentes
```json
// ERRADO - Nomes diferentes para mesma pessoa
// KIDS
{"id": "2", "nome": "Maria Santos"}
// PRO  
{"id": "2", "nome": "Maria Oliveira"}  // ❌

// CORRETO - Mesmo nome em todos os apps
{"id": "2", "nome": "Maria Santos"}  // ✅
```

### ❌ Tutor vendo crianças de outro tutor
```json
// ERRADO
// tutor_001 tem criancasIds: ["1"]
// Mas aparece agenda de criancaId: "2"  // ❌

// CORRETO
// tutor_001 só vê agendas com criancaId: "1"  // ✅
```

---

## 📝 Regra de Ouro

> **Cada criança pertence a UM tutor. Cada tutor acompanha uma ou mais crianças. Cada profissional atende um ou mais pacientes (crianças).**

---

## 🔄 Processo de Atualização

### Ao adicionar nova criança:

1. ✅ Adicionar em `KIDS/usuarios.json` com ID sequencial (`"4"`)
2. ✅ Adicionar em `TUTORS/usuarios.json` o tutor com `criancasIds: ["4"]`
3. ✅ Adicionar em `PRO/pacientes.json` com mesmo ID e `tutorId`
4. ✅ Atualizar agendas, relatórios e progresso conforme necessário
5. ✅ Verificar que todos os nomes são consistentes

---

**Última atualização**: 2025-10-16  
**Versão**: 1.0  
**Status**: ✅ Dados integrados e consistentes

