'use client'

import { useRef, useCallback } from 'react'

export interface PerformanceController {
  startAnimation: (callback: () => void) => void
  stopAnimation: () => void
  pauseAnimation: () => void
  resumeAnimation: () => void
  isAnimating: boolean
  isPaused: boolean
}

export function usePerformanceController(maxFPS: number = 60): PerformanceController {
  const animationIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const isAnimatingRef = useRef<boolean>(false)
  const isPausedRef = useRef<boolean>(false)
  const frameInterval = 1000 / maxFPS

  const startAnimation = useCallback((callback: () => void) => {
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    isPausedRef.current = false

    const animate = (currentTime: number) => {
      if (!isAnimatingRef.current) return

      if (isPausedRef.current) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastTimeRef.current

      if (deltaTime >= frameInterval) {
        callback()
        lastTimeRef.current = currentTime - (deltaTime % frameInterval)
      }

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)
  }, [frameInterval])

  const stopAnimation = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
    isAnimatingRef.current = false
    isPausedRef.current = false
  }, [])

  const pauseAnimation = useCallback(() => {
    isPausedRef.current = true
  }, [])

  const resumeAnimation = useCallback(() => {
    isPausedRef.current = false
  }, [])

  return {
    startAnimation,
    stopAnimation,
    pauseAnimation,
    resumeAnimation,
    isAnimating: isAnimatingRef.current,
    isPaused: isPausedRef.current
  }
}
