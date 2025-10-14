# 📱 Como Usar API com Celular

## 🔍 **PROBLEMA: "API offline" mesmo estando online**

Quando você testa no **celular físico**, o `localhost` não funciona porque:

```
PC: localhost = 127.0.0.1 (próprio PC)
Celular: localhost = 127.0.0.1 (próprio celular!)
```

**Celular não consegue acessar `localhost` do PC!**

---

## ✅ **SOLUÇÕES:**

### **OPÇÃO 1: Usar Emulador (MAIS FÁCIL)**

**Emulador = localhost funciona!**

```bash
npm run kids     # Escolher "a" para Android emulator
npm run tutors   # Escolher "a" para Android emulator
```

**Vantagens:**
- ✅ `localhost` funciona direto
- ✅ Zero configuração
- ✅ Perfeito para desenvolvimento

---

### **OPÇÃO 2: Usar Tunnel (MELHOR PARA APRESENTAÇÃO)**

**Tunnel = funciona em qualquer rede!**

```bash
npm run kids:t    # Tunnel automático
npm run tutors:t  # Tunnel automático
```

**Vantagens:**
- ✅ Funciona no celular físico
- ✅ Não precisa descobrir IP
- ✅ Funciona em 4G
- ✅ Atravessa firewall

**MAS:** API também precisa estar acessível!

---

### **OPÇÃO 3: Configurar IP Manualmente (Celular Físico)**

#### **Passo 1: Descobrir IP do PC**

**Windows:**
```bash
ipconfig
```

Procurar por:
```
Adaptador de Rede sem Fio Wi-Fi:
   IPv4 Address: 192.168.1.100
```

**Mac/Linux:**
```bash
ifconfig
```

#### **Passo 2: Atualizar Configuração**

**Kids/src/config/api.ts:**
```typescript
export const API_BASE_URL = 'http://192.168.1.100:3001/api';
//                           ^^^^^^^^^^^^^^^ SEU IP AQUI
```

**Tutors/src/config/api.ts:**
```typescript
export const API_BASE_URL = 'http://192.168.1.100:3001/api';
//                           ^^^^^^^^^^^^^^^ SEU IP AQUI
```

**Pro/src/config/api.ts:**
```typescript
export const API_BASE_URL = 'http://192.168.1.100:3001/api';
//                           ^^^^^^^^^^^^^^^ SEU IP AQUI
```

#### **Passo 3: Reiniciar Apps**

```bash
# Parar tudo (Ctrl+C)
# Iniciar novamente
npm run api
npm run kids
npm run tutors
npm run pro
```

**Vantagens:**
- ✅ Funciona no celular físico
- ✅ API funciona 100%

**Desvantagens:**
- ❌ IP pode mudar
- ❌ Celular PRECISA estar na mesma WiFi
- ❌ Configuração manual

---

## 🎯 **QUAL USAR?**

### **Desenvolvimento em Casa:**
```bash
# Usar EMULADOR
npm run api
npm run kids     # "a" para emulator
npm run tutors   # "a" para emulator
npm run pro

✅ localhost funciona
✅ API funciona 100%
✅ Zero configuração
```

### **Testar no Celular Físico:**
```bash
# OPÇÃO A: Tunnel (mais fácil)
npm run api
npm run kids:t    # Tunnel
npm run tutors:t  # Tunnel

⚠️ API em localhost (pode não funcionar)
✅ Apps funcionam via tunnel

# OPÇÃO B: IP Manual (melhor para API)
# 1. Descobrir IP: ipconfig
# 2. Atualizar config/api.ts nos 3 apps
# 3. Reiniciar tudo

✅ API funciona 100%
✅ Apps funcionam 100%
❌ Configuração manual
```

### **Apresentação na Faculdade:**
```bash
# Usar TUNNEL
npm run api         # PC na WiFi faculdade
npm run kids:t      # Celular em 4G (funciona!)
npm run tutors:t    # Celular em 4G (funciona!)
npm run pro

✅ Celular não precisa mesma WiFi
✅ Funciona em 4G
✅ Atravessa firewall
⚠️ API pode precisar de ajuste
```

---

## 📊 **COMPARAÇÃO:**

| Método | API Funciona? | Config? | Celular WiFi? | Apresentação? |
|--------|---------------|---------|---------------|---------------|
| **Emulador** | ✅ 100% | ✅ Zero | N/A | ⚠️ No PC apenas |
| **Tunnel** | ⚠️ Depende | ✅ Zero | ❌ Não precisa | ✅ Perfeito |
| **IP Manual** | ✅ 100% | ❌ Manual | ✅ Precisa | ⚠️ Arriscado |

---

## 💡 **RECOMENDAÇÃO:**

### **Para Desenvolvimento:**
# **USE EMULADOR!**
```bash
npm run api
npm run kids     # "a" para emulator
npm run tutors   # "a" para emulator
npm run pro
```

### **Para Apresentação:**
# **USE TUNNEL + MODO OFFLINE!**
```bash
# Apps em tunnel (celular)
npm run kids:t
npm run tutors:t

# Se API não funcionar = OK!
# Apps funcionam com mockAuthService
# Perde apenas: tempo real
# Mantém: TODA funcionalidade
```

---

## ✅ **STATUS ATUAL:**

- ✅ Configs centralizadas (`config/api.ts`)
- ✅ Kids usa `API_BASE_URL`
- ✅ Tutors usa `API_BASE_URL`
- ✅ Pro usa `API_BASE_URL`
- ✅ Fallback automático funciona
- ✅ Tunnel scripts prontos

**Para testar API com celular:**
1. Descobrir IP (`ipconfig`)
2. Editar `Kids/src/config/api.ts`
3. Editar `Tutors/src/config/api.ts`
4. Editar `Pro/src/config/api.ts`
5. Reiniciar apps

**Ou simplesmente:**
```bash
npm run kids:t    # Tunnel = zero config!
```

🚀

