import React from 'react'

interface TextProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
  color?: 'primary' | 'secondary' | 'dark' | 'white' | 'gray'
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  className = '',
  color = 'dark'
}) => {
  const sizeStyles = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl'
  }
  
  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
  
  const colorStyles = {
    primary: 'text-[#1e88e5]',
    secondary: 'text-[#1e88e5]',
    dark: 'text-[#3c3c3c]',
    white: 'text-white',
    gray: 'text-gray-600'
  }
  
  return (
    <p className={`${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${className}`}>
      {children}
    </p>
  )
}


interface TextProps {
  children: React.ReactNode
  size?: 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  className?: string
  color?: 'primary' | 'secondary' | 'dark' | 'white' | 'gray'
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  className = '',
  color = 'dark'
}) => {
  const sizeStyles = {
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl'
  }
  
  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }
  
  const colorStyles = {
    primary: 'text-[#1e88e5]',
    secondary: 'text-[#1e88e5]',
    dark: 'text-[#3c3c3c]',
    white: 'text-white',
    gray: 'text-gray-600'
  }
  
  return (
    <p className={`${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${className}`}>
      {children}
    </p>
  )
}

