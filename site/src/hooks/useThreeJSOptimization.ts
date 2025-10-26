'use client'

import { useDeviceDetection, DeviceInfo } from './useDeviceDetection'

export interface ThreeJSOptimizationConfig {
  pixelRatio: number
  antialias: boolean
  shadowMapEnabled: boolean
  shadowMapType: 'PCFSoftShadowMap' | 'PCFShadowMap' | 'BasicShadowMap'
  maxFPS: number
  animationSpeed: number
  modelScale: number
  enableLights: boolean
  enableShadows: boolean
  enablePostProcessing: boolean
}

export function useThreeJSOptimization(): ThreeJSOptimizationConfig {
  const deviceInfo = useDeviceDetection()

  const getOptimizedConfig = (device: DeviceInfo): ThreeJSOptimizationConfig => {
    if (device.isLowEndDevice) {
      // Configuração para dispositivos de baixo desempenho
      return {
        pixelRatio: 1,
        antialias: false,
        shadowMapEnabled: false,
        shadowMapType: 'BasicShadowMap',
        maxFPS: 30,
        animationSpeed: 0.002,
        modelScale: 2,
        enableLights: true,
        enableShadows: false,
        enablePostProcessing: false
      }
    } else if (device.isMobile) {
      // Configuração para dispositivos móveis
      return {
        pixelRatio: Math.min(device.pixelRatio, 1.5),
        antialias: false,
        shadowMapEnabled: false,
        shadowMapType: 'BasicShadowMap',
        maxFPS: 45,
        animationSpeed: 0.003,
        modelScale: 2.5,
        enableLights: true,
        enableShadows: false,
        enablePostProcessing: false
      }
    } else if (device.isTablet) {
      // Configuração para tablets
      return {
        pixelRatio: Math.min(device.pixelRatio, 2),
        antialias: true,
        shadowMapEnabled: true,
        shadowMapType: 'PCFSoftShadowMap',
        maxFPS: 60,
        animationSpeed: 0.004,
        modelScale: 3,
        enableLights: true,
        enableShadows: true,
        enablePostProcessing: false
      }
    } else {
      // Configuração para desktop
      return {
        pixelRatio: device.pixelRatio,
        antialias: true,
        shadowMapEnabled: true,
        shadowMapType: 'PCFSoftShadowMap',
        maxFPS: 60,
        animationSpeed: 0.005,
        modelScale: 3,
        enableLights: true,
        enableShadows: true,
        enablePostProcessing: true
      }
    }
  }

  return getOptimizedConfig(deviceInfo)
}
