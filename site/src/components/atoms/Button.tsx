import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  className?: string
  href?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  href
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95'
  
  const variantStyles = {
    primary: 'bg-[#1e88e5] text-white hover:bg-[#1565c0] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#43a047] text-white hover:bg-[#2e7d32] shadow-lg hover:shadow-xl',
    outline: 'border-3 border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white'
  }
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm sm:text-base',
    md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base',
    lg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg'
  }
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  
  if (href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    )
  }
  
  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  )
}
