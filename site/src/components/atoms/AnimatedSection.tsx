'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

interface StaggeredAnimationProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export const StaggeredAnimation: React.FC<StaggeredAnimationProps> = ({ 
  children, 
  staggerDelay = 0.2, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const children = element.children

    // Animação escalonada para os filhos
    gsap.fromTo(children, 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: staggerDelay,
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
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
