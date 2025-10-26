'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useScrollAnimation = (delay = 0) => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Animação de entrada
    gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [delay])

  return ref
}

export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const container = containerRef.current
    const scrollContainer = scrollRef.current

    // Configurar ScrollTrigger para scroll horizontal
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress
        const maxScroll = scrollContainer.scrollWidth - window.innerWidth
        scrollContainer.scrollLeft = progress * maxScroll
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  return { containerRef, scrollRef }
}
