'use client'

import { useState, useEffect, useRef } from 'react'

export function useIntersectionObserver(
  threshold: number = 0.1,
  rootMargin: string = '0px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        // Marcar como já intersectado para lazy loading
        if (isVisible && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, hasIntersected])

  return {
    elementRef,
    isIntersecting,
    hasIntersected
  }
}
