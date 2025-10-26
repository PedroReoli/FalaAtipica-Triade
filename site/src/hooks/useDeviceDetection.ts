'use client'

import { useState, useEffect } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLowEndDevice: boolean
  pixelRatio: number
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEndDevice: false,
    pixelRatio: 1
  })

  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent)
      const isDesktop = !isMobile && !isTablet
      
      // Detectar dispositivos de baixo desempenho
      const isLowEndDevice = isMobile && (
        // Dispositivos Android com pouca RAM ou processador antigo
        /android.*(?:2\.|3\.|4\.|5\.)/i.test(userAgent) ||
        // iPhones antigos
        /iphone.*os [1-9]_/i.test(userAgent) ||
        // Dispositivos com pouca memória (heurística baseada no user agent)
        /android.*(?:go|lite)/i.test(userAgent)
      )
      
      const pixelRatio = window.devicePixelRatio || 1
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowEndDevice,
        pixelRatio: Math.min(pixelRatio, 2) // Limitar pixel ratio para economizar recursos
      })
    }

    detectDevice()
    
    // Re-detectar em mudanças de orientação
    window.addEventListener('orientationchange', detectDevice)
    window.addEventListener('resize', detectDevice)
    
    return () => {
      window.removeEventListener('orientationchange', detectDevice)
      window.removeEventListener('resize', detectDevice)
    }
  }, [])

  return deviceInfo
}
