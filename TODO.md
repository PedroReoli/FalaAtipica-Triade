# 📋 TODO - FalaAtípica Triade

## 🔧 **ORGANIZAÇÃO - REORGANIZAÇÃO DE PASTAS**

### **4. Reorganização em `Apps/`**
**Status:** Estrutura movida com sucesso para `Apps/`

**Ajustes concluídos:**

- [x] `package.json` (root) – scripts atualizados para `cd Apps/...`
- [x] `.gitignore` – ignorar `Apps/*/node_modules`
- [ ] Revisar imports que apontam para `Mockup/` direto (ex.: `Apps/api/services/jsonService.js`, `Apps/Pro/src/services/mockDataService.ts`)
- [ ] Atualizar documentação (`README.md`, `docs/`) com novo layout
- [ ] Validar serviços que usam `logs/` (ex.: `Apps/api/src/utils/logger.js`)

**📌 Próximos Passos:**
1. Conferir se todos os imports para `Mockup/` funcionam após build
2. Rodar `npm run api` e testar rotas
3. Rodar `npm run pro` e validar carregamento dos dados
4. Atualizar documentação restante com o novo caminho `Apps/`

---

### **📊 Status Geral:**
- **Kids:** ✅ 100% MVP pronto
- **Tutors:** ✅ 95% MVP pronto (sem agenda por enquanto)
- **Pro:** ⚠️ 85% (falta validar parcerias, agenda desabilitada)
- **API:** ✅ 100% funcional
- **Integração:** ✅ Socket.IO em tempo real funcionando

---