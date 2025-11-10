# 🔌 Exemplo de Integração da API no Pro App

## 📋 Como Integrar

### 1. Instalar Dependência

```bash
cd Pro/
npm install socket.io-client
```

### 2. Integrar no DashboardPage

```typescript
// Pro/src/pages/DashboardPage.tsx
import { useAPIIntegration } from '../hooks/useAPIIntegration';
import { socketService } from '../services/socketService';
import { useProfessionalContext } from '../contexts/ProfessionalContext';
import { useToast } from '../hooks/useToast';

export const DashboardPage: React.FC = () => {
  const { professionalId, professionalName } = useProfessionalContext();
  const toast = useToast();
  
  // Hook de integração com API
  const {
    isAPIAvailable,
    getPatients,
    createSession
  } = useAPIIntegration(professionalId, professionalName);

  useEffect(() => {
    // Carregar pacientes
    loadPatients();
    
    // Setup WebSocket listeners
    setupWebSocket();

    return () => {
      // Cleanup
      socketService.off('patient-game-completed');
      socketService.off('progress-updated');
    };
  }, []);

  const setupWebSocket = () => {
    // Escutar quando paciente completar jogo
    socketService.on('patient-game-completed', (data: any) => {
      toast.success(`🎮 ${data.userName} completou ${data.gameName} - ${data.score}%`);
      
      // Atualizar dados do paciente
      updatePatientProgress(data.userId, data.score);
    });

    // Escutar progresso atualizado
    socketService.on('progress-updated', (data: any) => {
      console.log('📊 Progresso atualizado:', data);
      // Atualizar gráficos
      updateCharts(data);
    });

    // Escutar paciente online/offline
    socketService.on('user-online', (data: any) => {
      if (data.userType === 'kid') {
        setPatientStatus(data.userId, 'online');
        toast.info(`🟢 ${data.userName} está online`);
      }
    });

    socketService.on('user-offline', (data: any) => {
      if (data.userType === 'kid') {
        setPatientStatus(data.userId, 'offline');
      }
    });
  };

  const loadPatients = async () => {
    try {
      // Tentar carregar da API
      const data = await getPatients(professionalId, mockPatientsData);
      
      if (data) {
        setPatients(data.patients || data);
      }
    } catch (error) {
      // Fallback para dados mockados
      setPatients(mockPatientsData);
    }
  };

  const handleCreateSession = async (sessionData: any) => {
    try {
      const result = await createSession(sessionData, () => {
        toast.success('Sessão criada com sucesso!');
        loadPatients(); // Recarregar
      });
      
      if (result) {
        console.log('✅ Sessão criada:', result.sessionId);
      }
    } catch (error) {
      toast.error('Erro ao criar sessão');
    }
  };

  // ... resto do código
};
```

---

## 🔄 Fluxo Completo - Pro Recebendo Atualizações

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. KIDS APP (João Silva joga)                                    │
└──────────────────────────────────────────────────────────────────┘
   ↓
   João completa "Jogo das Palavras" (80%)
   ↓
   sendProgress({ userId: '1', gameId: 'palavras', score: 80 })

┌──────────────────────────────────────────────────────────────────┐
│ 2. API LOCAL                                                      │
└──────────────────────────────────────────────────────────────────┘
   ↓
   POST /api/kids/progress
   ↓
   Salva em Mockup/shared/progress.json
   ↓
   Emite eventos WebSocket:
   - io.to('tutors').emit('child-game-completed', {...})
   - io.to('professionals').emit('patient-game-completed', {...})

┌──────────────────────────────────────────────────────────────────┐
│ 3. PRO APP (Dra. Maria Silva) - INSTANTÂNEO                      │
└──────────────────────────────────────────────────────────────────┘
   ↓
   Recebe: patient-game-completed
   {
     userId: '1',
     userName: 'João Silva',
     gameId: 'palavras',
     gameName: 'Jogo das Palavras',
     score: 80
   }
   ↓
   🎮 Toast: "João Silva completou Jogo das Palavras - 80%"
   ↓
   Recebe: progress-updated
   ↓
   📊 Atualiza dashboard
   ↓
   📈 Atualiza gráfico de progresso
   ↓
   💾 Salva no histórico de atividades
```

---

## 🎯 Integrações Específicas

### **1. DashboardPage - Monitoramento em Tempo Real**

```typescript
// Ver quando pacientes estão jogando
socketService.on('patient-game-started', (data) => {
  // Adicionar badge "🎮 Jogando agora"
  updatePatientStatus(data.userId, 'playing');
});

socketService.on('patient-game-completed', (data) => {
  // Remover badge
  updatePatientStatus(data.userId, 'idle');
  
  // Atualizar progresso
  updatePatientProgress(data.userId, data.score);
  
  // Notificação
  toast.success(`${data.userName} completou ${data.gameName}!`);
});
```

### **2. PatientsPage - Lista Atualizada**

```typescript
const loadPatients = async () => {
  try {
    const data = await getPatients(professionalId);
    setPatients(data.patients);
  } catch (error) {
    // Fallback para mockAuthService
    const mockData = await mockAuthService.getPatients();
    setPatients(mockData);
  }
};

// Escutar atualizações
socketService.on('progress-updated', (data) => {
  // Atualizar paciente específico na lista
  setPatients(prev => prev.map(patient => 
    patient.id === data.userId 
      ? { ...patient, progressoGeral: data.score }
      : patient
  ));
});
```

### **3. NewSessionPage - Criação com Notificação**

```typescript
const handleSubmit = async (formData) => {
  const sessionData = {
    patientId: formData.patientId,
    profissionalId: professionalId,
    tipo: formData.tipo,
    observacoes: formData.observacoes,
    atividades: formData.atividades
  };

  // Criar sessão via API
  const result = await createSession(sessionData, () => {
    toast.success('Sessão criada com sucesso!');
    navigate('/sessions');
  });

  // WebSocket automaticamente notificará o tutor!
  // Tutor recebe: session-created
};
```

---

## 📊 Indicadores Visuais

### **1. Status da API**

```typescript
// Adicionar no header
const APIStatus = () => {
  const { isAPIAvailable } = useAPIIntegration();

  return (
    <div className={`api-status ${isAPIAvailable ? 'online' : 'offline'}`}>
      {isAPIAvailable ? (
        <>
          <span className="dot online"></span>
          <span>API Online</span>
        </>
      ) : (
        <>
          <span className="dot offline"></span>
          <span>Modo Local</span>
        </>
      )}
    </div>
  );
};
```

### **2. Badge "Jogando Agora"**

```typescript
// Nos cards de pacientes
{patientStatus === 'playing' && (
  <div className="badge playing">
    🎮 Jogando agora
  </div>
)}
```

### **3. Indicador de Presença**

```typescript
// Mostrar se paciente está online
{patientOnline ? (
  <span className="presence online">🟢 Online</span>
) : (
  <span className="presence offline">⚪ Offline</span>
)}
```

---

## 🧪 Como Testar

### **1. Iniciar API**
```bash
npm run api
```

### **2. Iniciar Pro**
```bash
cd Pro/
npm run dev
```

### **3. Fazer Login**
- Email: `fono@teste.com`
- Tipo: Fonoaudiólogo

### **4. Ver Dashboard**
- Lista de pacientes carregada da API
- Status "API Online" no header

### **5. Abrir Kids em outro dispositivo**
- Jogar um jogo
- Completar

### **6. Voltar ao Pro**
- Ver toast: "🎮 João Silva completou Jogo das Palavras - 85%"
- Ver dashboard atualizado automaticamente

---

## ✅ Benefícios para o Pro

1. ✅ **Monitoramento em tempo real** dos pacientes
2. ✅ **Notificações instantâneas** quando jogam
3. ✅ **Dashboard sempre atualizado** (sem refresh)
4. ✅ **Presença online/offline** dos pacientes
5. ✅ **Sessões notificam tutores** automaticamente
6. ✅ **Fallback automático** se API cair
7. ✅ **Zero risco** - sempre funciona

---

## 🎯 Eventos Específicos do Pro

### **Eventos que o Pro RECEBE:**

```typescript
// Paciente iniciou jogo
socketService.on('patient-game-started', (data) => {
  // data = { userId, userName, gameId, gameName, timestamp }
  console.log(`${data.userName} começou a jogar ${data.gameName}`);
});

// Paciente completou jogo
socketService.on('patient-game-completed', (data) => {
  // data = { userId, userName, gameId, gameName, score, timestamp }
  toast.success(`${data.userName} completou ${data.gameName} - ${data.score}%`);
});

// Progresso atualizado
socketService.on('progress-updated', (data) => {
  // data = { userId, childName, gameId, score, timestamp }
  updateDashboard(data);
});

// Paciente online/offline
socketService.on('user-online', (data) => {
  if (data.userType === 'kid') {
    setPatientPresence(data.userId, 'online');
  }
});

socketService.on('user-offline', (data) => {
  if (data.userType === 'kid') {
    setPatientPresence(data.userId, 'offline');
  }
});
```

---

## 🔒 **GARANTIA DE FUNCIONAMENTO (APRESENTAÇÃO):**

### **Se API estiver ONLINE:**
```
✅ Pro carrega pacientes da API
✅ Pro recebe notificações em tempo real
✅ Dashboard atualiza automaticamente
✅ Gráficos atualizam com novos dados
✅ "Efeito WOW" na apresentação! 🎉
```

### **Se API estiver OFFLINE:**
```
✅ Pro carrega pacientes do mockAuthService (local)
✅ Dashboard funciona normalmente
✅ Todas as telas funcionam
❌ Não recebe notificações em tempo real (mas isso é ok!)
✅ Apresentação continua perfeita! ✅
```

---

**Status:** Pronto para integração!  
**Segurança:** 100% garantida com fallback automático

