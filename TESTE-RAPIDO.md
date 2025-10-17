# ⚡ TESTE RÁPIDO - 5 Minutos

## 🚀 **INÍCIO RÁPIDO**

### **1. Iniciar Tudo (3 Terminais)**

```bash
# Terminal 1 - API
cd api
npm start

# Terminal 2 - Kids
cd Kids
npm start

# Terminal 3 - Tutors
cd Tutors
npm start
```

---

## 🎯 **TESTE PRINCIPAL: Lembretes**

### **NO KIDS:**

1. **Login:** `joao@kids.com` / `123456`

2. **Ver sino 🔔 no canto superior direito**
   - Badge vermelho com **"3"** deve aparecer

3. **Clicar no sino**
   - Ver 3 lembretes:
     - 🎯 Praticar sons da letra R (VERMELHO)
     - 📅 Consulta amanhã! (AMARELO)
     - 🎮 Jogue Igual-Diferente (AZUL)

4. **Clicar "Marcar como lido"** no primeiro
   - Badge muda para **"2"**
   - Lembrete some

5. **Clicar em "Lidos (2)"**
   - Ver lembrete que você marcou

✅ **FUNCIONOU!**

---

## 🔥 **TESTE BÔNUS: Tempo Real**

### **1. NO TUTORS:**
- **Login:** `carlos@tutors.com` / `123456`
- Ver dashboard com 2 crianças

### **2. NO KIDS:**
- Jogar qualquer jogo
- Completar

### **3. OBSERVAR TUTORS:**
- Toast verde aparece: 🎉 **"João Silva completou [jogo]!"**

✅ **FUNCIONOU!**

---

## 📊 **O QUE VERIFICAR**

### **Console da API deve mostrar:**
```
✅ Lembretes buscados: 3 não lidos, 1 lidos para criança 1
🎮 Progresso salvo: João Silva - palavras - 100%
📡 Eventos emitidos: progress-updated, child-game-completed, patient-game-completed
```

### **Kids deve ter:**
- ✅ Badge com número correto
- ✅ Lembretes aparecem
- ✅ Marcar como lido funciona

### **Tutors deve ter:**
- ✅ Toast de notificação aparece
- ✅ Progresso atualiza
- ✅ Agendas aparecem

---

## 🐛 **PROBLEMAS?**

### **Badge não aparece?**
```bash
# Verificar se arquivo existe:
ls Kids/mockup-data/reminders.json

# Se não existir:
copy Mockup/shared/reminders.json Kids/mockup-data/reminders.json
```

### **Toast não aparece?**
- Reiniciar Kids e Tutors
- Verificar se API está rodando

### **Erros no console?**
- Ver arquivo: `docs/GUIA-DE-TESTES-MANUAL.md` (guia completo)
- Ver arquivo: `docs/api/VERIFICACAO-FALLBACK-LOGS.md` (debug)

---

## 📚 **DOCUMENTAÇÃO COMPLETA**

- **Guia Passo a Passo:** `docs/GUIA-DE-TESTES-MANUAL.md` (40 min)
- **Análise de Dados:** `docs/api/ANALISE-COMPARTILHAMENTO-DADOS.md`
- **Verificação Fallback:** `docs/api/VERIFICACAO-FALLBACK-LOGS.md`
- **Progresso:** `docs/api/PROGRESSO-IMPLEMENTACAO.md`

---

## ✅ **TUDO FUNCIONANDO?**

Se seguiu os passos e viu:
- ✅ Badge com "3"
- ✅ 3 lembretes coloridos
- ✅ Toast no Tutors

**🎉 PARABÉNS! SISTEMA 100% FUNCIONAL! 🚀**

---

**Próximo:** Use o `docs/GUIA-DE-TESTES-MANUAL.md` para testar TODAS as funcionalidades!


