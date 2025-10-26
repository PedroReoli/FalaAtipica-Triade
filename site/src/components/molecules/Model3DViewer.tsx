'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Model3DViewer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animação de surgimento após um pequeno delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`
          transition-all duration-1000 ease-out transform
          ${isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-75 translate-y-8'
          }
        `}
      >
        <Image
          src="/images/logos/falaatipica-logo.png"
          alt="FalaAtípica Logo"
          width={600}
          height={600}
          className="w-full h-auto max-w-[400px] md:max-w-[500px] lg:max-w-[600px] drop-shadow-lg"
          priority
        />
      </div>
    </div>
  )
}