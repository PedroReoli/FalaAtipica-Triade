# Guia de Uso - Otimizações Three.js

## 🎯 Como Usar as Otimizações

### 1. Detecção de Dispositivo
```typescript
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

function MyComponent() {
  const { isMobile, isLowEndDevice, pixelRatio } = useDeviceDetection()
  
  // Usar informações do dispositivo para otimizações
  if (isLowEndDevice) {
    // Configurações de baixo desempenho
  }
}
```

### 2. Configurações Three.js Otimizadas
```typescript
import { useThreeJSOptimization } from '@/hooks/useThreeJSOptimization'

function My3DComponent() {
  const config = useThreeJSOptimization()
  
  // Usar configurações otimizadas
  const renderer = new THREE.WebGLRenderer({
    antialias: config.antialias,
    pixelRatio: config.pixelRatio
  })
}
```

### 3. Controle de Performance
```typescript
import { usePerformanceController } from '@/hooks/usePerformanceController'

function MyAnimatedComponent() {
  const controller = usePerformanceController(30) // 30 FPS
  
  useEffect(() => {
    const animate = () => {
      // Sua lógica de animação
    }
    
    controller.startAnimation(animate)
    
    return () => controller.stopAnimation()
  }, [])
}
```

### 4. Lazy Loading
```typescript
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function MyLazyComponent() {
  const { elementRef, hasIntersected } = useIntersectionObserver()
  
  if (!hasIntersected) {
    return <div ref={elementRef}>Carregando...</div>
  }
  
  return <div ref={elementRef}>Conteúdo carregado!</div>
}
```

## 🔧 Exemplo Completo

```typescript
'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThreeJSOptimization } from '@/hooks/useThreeJSOptimization'
import { usePerformanceController } from '@/hooks/usePerformanceController'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Optimized3DComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const config = useThreeJSOptimization()
  const controller = usePerformanceController(config.maxFPS)
  const { elementRef, hasIntersected, isIntersecting } = useIntersectionObserver()
  
  useEffect(() => {
    if (!hasIntersected) return
    
    // Inicializar Three.js com configurações otimizadas
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      antialias: config.antialias,
      pixelRatio: config.pixelRatio
    })
    
    // Configurar sombras apenas se habilitado
    if (config.enableShadows) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = config.shadowMapType
    }
    
    // Animação otimizada
    const animate = () => {
      if (isIntersecting) {
        // Sua lógica de animação aqui
      }
      renderer.render(scene, camera)
    }
    
    controller.startAnimation(animate)
    
    return () => {
      controller.stopAnimation()
      renderer.dispose()
    }
  }, [hasIntersected, config, controller, isIntersecting])
  
  if (!hasIntersected) {
    return <div ref={elementRef}>Carregando...</div>
  }
  
  return <div ref={elementRef} className="w-full h-full" />
}
```

## 📊 Configurações por Dispositivo

| Dispositivo | Pixel Ratio | Antialias | Sombras | FPS | Animação |
|-------------|-------------|-----------|---------|-----|----------|
| Baixo Desempenho | 1 | ❌ | ❌ | 30 | 0.002 |
| Mobile | 1.5 | ❌ | ❌ | 45 | 0.003 |
| Tablet | 2 | ✅ | ✅ | 60 | 0.004 |
| Desktop | Nativo | ✅ | ✅ | 60 | 0.005 |

## 🎯 Boas Práticas

1. **Sempre usar** os hooks de otimização
2. **Implementar lazy loading** para componentes pesados
3. **Controlar FPS** baseado no dispositivo
4. **Pausar animações** quando não visíveis
5. **Limpar recursos** adequadamente
6. **Testar em dispositivos reais**

## ⚠️ Cuidados Importantes

- **Não usar** configurações fixas para todos os dispositivos
- **Sempre implementar** estados de loading e erro
- **Limpar recursos** Three.js adequadamente
- **Testar performance** em dispositivos antigos
- **Monitorar uso de memória** em aplicações longas
