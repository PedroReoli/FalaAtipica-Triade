# 🎤 Guia Rápido para Apresentação

## 🎯 **MODO TUNNEL = ZERO PROBLEMAS!**

---

## 📋 **CHECKLIST ANTES DA APRESENTAÇÃO**

### **1 DIA ANTES:**

```bash
# Testar os comandos em casa
npm run api        # Ver se API inicia
npm run kids:t     # Ver se tunnel funciona
npm run tutors:t   # Ver se tunnel funciona
npm run pro        # Ver se Pro abre
```

**✅ Tudo funcionou? Perfeito!**

---

## 🚀 **NO DIA DA APRESENTAÇÃO:**

### **PASSO 1: Preparar o PC**

```bash
# 1. Conectar na WiFi da faculdade (qualquer uma)
# 2. Abrir 4 terminais
# 3. Navegar para a pasta do projeto
cd F:\FalaAtipica-Triade\FalaAtipica-Triade
```

---

### **PASSO 2: Iniciar Tudo**

#### **Terminal 1 - API:**
```bash
npm run api
```
**Aguardar ver:**
```
🚀 API Local - FalaAtípica
🚀 Rodando em: http://localhost:3001
📚 Swagger Docs: http://localhost:3001/api/docs
```

#### **Terminal 2 - Kids (Tunnel):**
```bash
npm run kids:t
```
**Aguardar ver:**
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Using Expo Go
› Press s │ switch to Expo Go
› Press a │ open Android
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
```

**✅ QR Code apareceu? Perfeito!**

#### **Terminal 3 - Tutors (Tunnel):**
```bash
npm run tutors:t
```
**✅ Outro QR Code apareceu? Perfeito!**

#### **Terminal 4 - Pro:**
```bash
npm run pro
```
**✅ Navegador abriu? Perfeito!**

---

### **PASSO 3: Testar nos Celulares**

#### **Kids:**
1. Abrir **Expo Go** no celular
2. Escanear QR code do Kids
3. Aguardar carregar
4. **✅ Login:** `joao@kids.com` / `123456`

#### **Tutors:**
1. Abrir **Expo Go** no outro celular
2. Escanear QR code do Tutors
3. Aguardar carregar
4. **✅ Login:** `carlos@tutors.com` / `123456`

#### **Pro:**
No navegador do PC:
**✅ Login:** `fono@teste.com` / `123456`

---

## 🎮 **ROTEIRO DE DEMONSTRAÇÃO:**

### **1. Introdução (2min):**
```
"FalaAtípica é uma plataforma completa para auxiliar 
crianças com atraso de fala. São 3 aplicações integradas:
- Kids (crianças)
- Tutors (pais/responsáveis)
- Pro (fonoaudiólogos)"
```

---

### **2. Kids - App Infantil (5min):**

**Mostrar:**
1. ✅ Login com validações
2. ✅ Dashboard colorido e amigável
3. ✅ Jogo "Adivinha" funcionando
4. ✅ Feedback positivo (toasts)
5. ✅ Sistema de progresso

**Pontos chave:**
- "Interface pensada para crianças"
- "Cores baseadas em neurociência infantil"
- "Feedback sempre positivo (ABA)"
- "Zero pressão, 100% diversão"

---

### **3. Tutors - App Família (5min):**

**Mostrar:**
1. ✅ Login
2. ✅ Dashboard simplificado
3. ✅ Lista de crianças
4. ✅ Progresso visual
5. ✅ Notificações em tempo real (se API ligada)

**Pontos chave:**
- "Interface simples para pais/responsáveis"
- "Acompanhamento sem jargão técnico"
- "Celebração de conquistas"
- "Conexão com profissionais"

---

### **4. Pro - Sistema Avançado (5min):**

**Mostrar:**
1. ✅ Login com 5 tipos de profissionais
2. ✅ Dashboard completo
3. ✅ Gestão de pacientes
4. ✅ Calendário interativo
5. ✅ Sistema de relatórios
6. ✅ Cores por especialidade

**Pontos chave:**
- "Ferramentas profissionais completas"
- "5 tipos de profissionais suportados"
- "Integração com Kids e Tutors"
- "Relatórios detalhados e Markdown"

---

### **5. Integração (3min):**

**Demonstrar fluxo completo:**
```
1. Criança joga no Kids
   ↓
2. Progresso é salvo na API
   ↓
3. Tutor recebe notificação (tempo real)
   ↓
4. Profissional vê relatório atualizado
```

**Pontos chave:**
- "Tudo sincronizado em tempo real"
- "API local (mas pode ser Supabase)"
- "WebSocket para notificações instantâneas"
- "Fallback automático se API offline"

---

## ⚠️ **SE ALGO DER ERRADO:**

### **Problema 1: QR Code não aparece**
```bash
# Reiniciar com --clear
cd Kids
npx expo start --tunnel --clear
```

### **Problema 2: Celular não conecta**
```bash
# Verificar se Expo Go está instalado
# Verificar se celular tem internet (4G ou WiFi)
```

### **Problema 3: API não inicia**
```bash
cd api
npm install
npm start
```

### **Problema 4: Tudo quebrou!**
**PLANO B: Modo Offline**
```bash
# NÃO iniciar API
npm run kids:t      # Funciona com mockAuthService
npm run tutors:t    # Funciona com MocapService
npm run pro         # Funciona com mockAuthService

# Perde apenas: Tempo real
# Mantém: TODA a funcionalidade!
```

---

## 💡 **DICAS PROFISSIONAIS:**

### **1. Chegar Cedo:**
- Testar WiFi da faculdade 30min antes
- Iniciar tudo e deixar rodando
- Fazer login em todos os apps

### **2. Ter Backup:**
- Gravar vídeo do app funcionando
- Screenshots das telas principais
- Se tudo quebrar → mostrar vídeo

### **3. Ensaiar:**
- Praticar o roteiro 3x
- Cronometrar cada parte
- Decorar logins

### **4. Confiar no Tunnel:**
- Não tente configurar IP manualmente
- Não dependa de mesma rede
- Deixe o tunnel fazer a mágica

---

## 🎯 **CREDENCIAIS DE TESTE:**

### **Kids:**
```
Email: joao@kids.com
Senha: 123456
```

### **Tutors:**
```
Email: carlos@tutors.com
Senha: 123456
```

### **Pro:**
```
Fonoaudiólogo:
Email: fono@teste.com
Senha: 123456

Psicólogo:
Email: psico@teste.com
Senha: 123456
```

---

## ✅ **CHECKLIST FINAL:**

**ANTES:**
- [ ] API funciona (`npm run api`)
- [ ] Kids tunnel funciona (`npm run kids:t`)
- [ ] Tutors tunnel funciona (`npm run tutors:t`)
- [ ] Pro funciona (`npm run pro`)
- [ ] Expo Go instalado nos celulares
- [ ] Celulares com internet (4G/WiFi)
- [ ] Bateria dos celulares >50%

**NO DIA:**
- [ ] Chegar 30min antes
- [ ] Testar WiFi
- [ ] Iniciar tudo
- [ ] Fazer login em todos
- [ ] Testar um jogo
- [ ] Verificar tempo real
- [ ] Respirar fundo

**DURANTE:**
- [ ] Falar com calma
- [ ] Mostrar código se perguntarem
- [ ] Explicar decisões técnicas
- [ ] Enfatizar impacto social
- [ ] Celebrar conquistas

---

## 🎉 **MENSAGEM FINAL:**

**Você construiu algo INCRÍVEL!**

Não é só um TCC. É uma solução real para um problema real. É tecnologia que vai mudar vidas.

**Confie no seu trabalho. Confie no tunnel. Você vai arrasar!**

🚀🚀🚀

---

## 📞 **SUPORTE DE EMERGÊNCIA:**

Se algo der muito errado:
1. **Respirar**
2. **Modo offline** (funciona 100%)
3. **Mostrar vídeo backup**
4. **Explicar que é prova de conceito**
5. **Focar no impacto social**

**Lembre-se:** Apresentação não é sobre código perfeito. É sobre solução que importa.

**BOA SORTE! 🍀**

