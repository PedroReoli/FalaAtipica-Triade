"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  className?: string
  href?: string
  loading?: boolean
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  href,
  loading = false,
  disabled = false,
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id))
    }, 600)

    if (onClick) onClick()
  }

  const baseStyles =
    "relative overflow-hidden inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300"

  const variantStyles = {
    primary: "bg-[#1e88e5] text-white hover:bg-[#1565c0] shadow-lg hover:shadow-xl disabled:bg-gray-400",
    secondary: "bg-[#43a047] text-white hover:bg-[#2e7d32] shadow-lg hover:shadow-xl disabled:bg-gray-400",
    outline:
      "border-3 border-[#1e88e5] text-[#1e88e5] hover:bg-[#1e88e5] hover:text-white disabled:border-gray-400 disabled:text-gray-400",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm sm:text-base",
    md: "px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base",
    lg: "px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg",
  }

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled || loading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`

  const content = (
    <>
      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            animation: "ripple 0.6s ease-out",
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </motion.div>
      )}

      <span className="relative z-10">{children}</span>
    </>
  )

  if (href && !disabled && !loading) {
    return (
      <motion.a
        href={href}
        className={combinedStyles}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      className={combinedStyles}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
    >
      {content}
    </motion.button>
  )
}
