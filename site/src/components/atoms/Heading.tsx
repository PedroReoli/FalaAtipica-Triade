import React from 'react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'dark' | 'white'
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  color = 'dark'
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const colorStyles = {
    primary: 'text-[#1e88e5]',
    secondary: 'text-[#1e88e5]',
    dark: 'text-[#3c3c3c]',
    white: 'text-white'
  }
  
  const levelStyles = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg md:text-xl lg:text-2xl font-medium',
    6: 'text-base md:text-lg lg:text-xl font-medium'
  }
  
  return (
    <Tag className={`${levelStyles[level]} ${colorStyles[color]} ${className}`}>
      {children}
    </Tag>
  )
}


interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'dark' | 'white'
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = '',
  color = 'dark'
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const colorStyles = {
    primary: 'text-[#1e88e5]',
    secondary: 'text-[#1e88e5]',
    dark: 'text-[#3c3c3c]',
    white: 'text-white'
  }
  
  const levelStyles = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
    4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
    5: 'text-lg md:text-xl lg:text-2xl font-medium',
    6: 'text-base md:text-lg lg:text-xl font-medium'
  }
  
  return (
    <Tag className={`${levelStyles[level]} ${colorStyles[color]} ${className}`}>
      {children}
    </Tag>
  )
}

