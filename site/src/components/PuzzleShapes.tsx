'use client'

interface PuzzleShapesProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'green' | 'red' | 'yellow'
  animation?: 'float' | 'rotate' | 'pulse' | 'none'
  delay?: 1 | 2 | 3 | 4
  opacity?: 'light' | 'medium' | 'strong'
}

export default function PuzzleShapes({
  className = '',
  size = 'md',
  color = 'blue',
  animation = 'none',
  delay = 1,
  opacity = 'medium'
}: PuzzleShapesProps) {
  const getPuzzleClass = () => {
    const colorMap = {
      blue: 'puzzle-1',
      green: 'puzzle-2', 
      red: 'puzzle-3',
      yellow: 'puzzle-4'
    }

    const sizeClass = `puzzle-${size}`
    const animationClass = animation !== 'none' ? `puzzle-animate-${animation}` : ''
    const delayClass = animation !== 'none' ? `puzzle-delay-${delay}` : ''
    const opacityClass = `puzzle-bg-${opacity}`

    return [
      colorMap[color],
      sizeClass,
      animationClass,
      delayClass,
      opacityClass,
      className
    ].filter(Boolean).join(' ')
  }

  return <div className={getPuzzleClass()} />
}

// Componente para background com múltiplos shapes
export function PuzzleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Shapes flutuantes */}
      <PuzzleShapes 
        color="blue" 
        size="lg" 
        animation="float" 
        delay={1}
        opacity="light"
        className="top-10 left-10"
      />
      <PuzzleShapes 
        color="green" 
        size="md" 
        animation="float" 
        delay={2}
        opacity="light"
        className="top-32 right-20"
      />
      <PuzzleShapes 
        color="red" 
        size="sm" 
        animation="float" 
        delay={3}
        opacity="light"
        className="bottom-20 left-32"
      />
      <PuzzleShapes 
        color="yellow" 
        size="lg" 
        animation="float" 
        delay={4}
        opacity="light"
        className="bottom-10 right-10"
      />
      
      {/* Shapes rotativos */}
      <PuzzleShapes 
        color="blue" 
        size="sm" 
        animation="rotate" 
        delay={1}
        opacity="light"
        className="top-1/2 left-1/4"
      />
      <PuzzleShapes 
        color="green" 
        size="md" 
        animation="rotate" 
        delay={2}
        opacity="light"
        className="top-1/3 right-1/3"
      />
    </div>
  )
}

// Componente para seção com shapes decorativos
export function PuzzleSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`relative ${className}`}>
      <PuzzleBackground />
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}
