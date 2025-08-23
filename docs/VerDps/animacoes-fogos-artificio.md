# 🎆 Animações de Fogos de Artifício - React Native

## **📋 Contexto**
Implementação de animações de fogos de artifício para feedback visual quando a criança acerta no jogo "Adivinha" do FalaAtípica.

## **🎯 Objetivo**
Criar uma experiência visual gratificante e motivadora para as crianças quando acertam as respostas.

---

## **🔧 Opções de Implementação**

### **1. Lottie Animation (Recomendado)**

#### **Instalação:**
```bash
npm install lottie-react-native
```

#### **Vantagens:**
- ✅ Animações profissionais pré-feitas
- ✅ Arquivos JSON leves
- ✅ Controle total sobre timing
- ✅ Fundo transparente nativo
- ✅ Fácil implementação

#### **Implementação:**
```typescript
import LottieView from 'lottie-react-native';

// No componente
<LottieView
  source={require('../assets/fireworks.json')}
  autoPlay
  loop={false}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  }}
/>
```

### **2. React Native Reanimated (Custom)**

#### **Instalação:**
```bash
npm install react-native-reanimated
```

#### **Implementação Customizada:**
```typescript
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming 
} from 'react-native-reanimated';

// Partículas animadas
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: useSharedValue(0),
  y: useSharedValue(0),
  scale: useSharedValue(0),
  opacity: useSharedValue(1),
}));
```

### **3. Expo Particle System (Avançado)**

#### **Instalação:**
```bash
npx expo install expo-gl expo-gl-cpp
```

#### **Características:**
- 🚀 Máxima performance
- 🎮 Sistema de partículas WebGL
- ⚠️ Implementação complexa

---

## **🏗️ Estrutura de Implementação**

### **Componente Fireworks:**
```typescript
interface FireworksProps {
  visible: boolean;
  onAnimationComplete: () => void;
}

const Fireworks: React.FC<FireworksProps> = ({ visible, onAnimationComplete }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../assets/fireworks.json')}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationComplete}
        style={styles.animation}
      />
    </View>
  );
};
```

### **Integração no AdivinhaScreen:**
```typescript
const [showFireworks, setShowFireworks] = useState(false);

const handleCorrectAnswer = () => {
  setShowFireworks(true);
  // Reset após animação
  setTimeout(() => {
    setShowFireworks(false);
  }, 3000);
};

return (
  <SafeAreaView style={styles.container}>
    {/* Conteúdo existente do jogo */}
    
    <Fireworks 
      visible={showFireworks}
      onAnimationComplete={() => setShowFireworks(false)}
    />
  </SafeAreaView>
);
```

### **Estilos CSS:**
```typescript
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});
```

---

## **🎨 Recursos de Animações**

### **Sites Gratuitos:**
- **LottieFiles**: https://lottiefiles.com/search?q=fireworks
- **IconScout**: https://iconscout.com/lotties/fireworks
- **GIPHY**: https://giphy.com/search/fireworks

### **Estrutura JSON Lottie:**
```json
{
  "v": "5.5.7",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 400,
  "h": 400,
  "nm": "Fireworks",
  "ddd": 0,
  "assets": [],
  "layers": [
    // Partículas de fogos
  ]
}
```

---

## **⚡ Performance e Otimizações**

### **Comparação de Performance:**
| Método | Performance | Complexidade | Controle |
|--------|-------------|--------------|----------|
| **Lottie** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Reanimated** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Expo GL** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

### **Otimizações Recomendadas:**
- **Lottie**: Melhor performance, arquivos pequenos
- **Reanimated**: Mais controle, mas mais código
- **Expo GL**: Máxima performance, mas complexo

---

## **🎯 Recomendação Final**

### **Para o FalaAtípica:**
**Use Lottie** - é a solução mais prática e profissional para o caso de uso.

### **Justificativa:**
- ✅ Implementação rápida
- ✅ Animações profissionais
- ✅ Baixo impacto na performance
- ✅ Fácil manutenção
- ✅ Compatível com Expo

---

## **📝 Próximos Passos**

1. **Instalar dependência**: `npm install lottie-react-native`
2. **Baixar animação**: Escolher animação de fogos no LottieFiles
3. **Criar componente**: Implementar `Fireworks.tsx`
4. **Integrar no jogo**: Adicionar ao `AdivinhaScreen.tsx`
5. **Testar**: Verificar performance e timing

---

## **🔗 Links Úteis**

- [Lottie React Native Docs](https://github.com/lottie-react-native/lottie-react-native)
- [LottieFiles - Fireworks](https://lottiefiles.com/search?q=fireworks)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Expo GL](https://docs.expo.dev/versions/latest/sdk/gl/)

---

*Documentação criada em: 23/08/2025*
*Projeto: FalaAtípica - Jogo Adivinha*
