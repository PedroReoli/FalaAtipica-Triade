# 📋 TODO - FalaAtípica Triade

**Última Atualização:** 18 de Outubro de 2025

---

## 🔴 **HIPERCRÍTICO - PRIORIDADE MÁXIMA**

### **1. ~~Terminar Função de Sessões no Pro~~** ✅ DESABILITADO
- ~~Sistema de sessões/agenda temporariamente desabilitado~~
- ~~Removido de todas as interfaces (Pro, Tutors, API)~~
- ~~Código preservado em comentários para reativação futura~~

### **2. Testar Configuração de Parceria**
- [ ] Gerar token de parceria
- [ ] Copiar token
- [ ] Claim de token por outro profissional
- [ ] Verificar se parceria é estabelecida
- [ ] Validar exibição de parcerias ativas

---

## 🔴 **CRÍTICO - APRESENTAÇÃO**

### **3. Validar Slides**
- [ ] Validar conteúdo técnico
- [ ] Verificar estrutura e fluxo
- [ ] Conferir dados e estatísticas
- [ ] Testar transições
- [ ] Ajustar tempo de apresentação

---

## 🔧 **ORGANIZAÇÃO - REORGANIZAÇÃO DE PASTAS**

### **4. Mover Pastas para Apps/**
**Objetivo:** Reorganizar estrutura movendo `api/`, `Kids/`, `logs/`, `Mockup/`, `Pro/`, `Tutors/` para `Apps/`

**⚠️ ATENÇÃO:** Após mover, os seguintes arquivos precisam ser atualizados:

- [ ] **`package.json` (root)** - Ajustar scripts `cd api`, `cd ../Kids`, etc. para `cd Apps/api`, `cd Apps/Kids`
- [ ] **`api/services/jsonService.js`** (linha 7) - Mudar `'../../Mockup'` para `'../../Apps/Mockup'`
- [ ] **`Pro/src/services/mockDataService.ts`** (4 ocorrências):
  - [ ] Linha 48: `'../../../Mockup/KIDS/usuarios.json'` → `'../../../Apps/Mockup/KIDS/usuarios.json'`
  - [ ] Linha 74: `'../../../Mockup/KIDS/usuarios.json'` → `'../../../Apps/Mockup/KIDS/usuarios.json'`
  - [ ] Linha 314: `'../../../Mockup/shared/agendas.json'` → `'../../../Apps/Mockup/shared/agendas.json'`
  - [ ] Linha 344: `'../../../Mockup/shared/progress.json'` → `'../../../Apps/Mockup/shared/progress.json'`
- [ ] **`api/src/utils/logger.js`** (linha 7) - Mudar `'../../..', 'logs'` para `'../../..', 'Apps/logs'`

**✅ Arquivos que NÃO precisam ser atualizados:**
- Kids e Tutors usam `mockup-data/` local (dentro de cada app)

**📌 Próximos Passos:**
1. Criar pasta `Apps/` na raiz
2. Mover pastas: `api/`, `Kids/`, `logs/`, `Mockup/`, `Pro/`, `Tutors/` → `Apps/`
3. Atualizar os 4 arquivos listados acima
4. Testar se todos os imports/caminhos funcionam

---

## 📝 **NOTAS**

### **✅ Completado Recentemente:**
- Kids: MVP 100% (jogos validados, API integrada, imagens prontas)
- Tutors: MVP 100% (progresso em tempo real, sistema de notificações)
- Pro: Funcionalidades principais (pacientes, relatórios, documentos, upload com cache)
- API: Integração completa entre os 3 apps
- Documentação: Consolidada e organizada
- Sistema de Upload: Cache em memória implementado
- Dashboard Pro: Layout motivacional e visual
- Sistema de Sessões/Agenda: Desabilitado temporariamente

### **📊 Status Geral:**
- **Kids:** ✅ 100% MVP pronto
- **Tutors:** ✅ 95% MVP pronto (sem agenda por enquanto)
- **Pro:** ⚠️ 85% (falta validar parcerias, agenda desabilitada)
- **API:** ✅ 100% funcional
- **Integração:** ✅ Socket.IO em tempo real funcionando

---

**🎯 Foco:** Validar sistema de parcerias e preparar slides para apresentação!
