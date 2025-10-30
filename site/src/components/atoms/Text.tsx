"use client"

import type React from "react"
import { motion } from "framer-motion"

interface TextProps {
  children: React.ReactNode
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  weight?: "light" | "normal" | "medium" | "semibold" | "bold"
  className?: string
  color?: "primary" | "secondary" | "dark" | "white" | "gray"
  style?: React.CSSProperties
  animate?: boolean
  gradient?: boolean
}

export const Text: React.FC<TextProps> = ({
  children,
  size = "base",
  weight = "normal",
  className = "",
  color = "dark",
  style,
  animate = false,
  gradient = false,
}) => {
  const sizeStyles = {
    xs: "text-xs md:text-sm",
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
  }

  const weightStyles = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }

  const colorStyles = {
    primary: gradient ? "bg-gradient-to-r from-[#1e88e5] to-[#1565c0] bg-clip-text text-transparent" : "text-[#1e88e5]",
    secondary: gradient
      ? "bg-gradient-to-r from-[#1e88e5] to-[#1565c0] bg-clip-text text-transparent"
      : "text-[#1e88e5]",
    dark: "text-[#3c3c3c]",
    white: "text-white",
    gray: "text-gray-600",
  }

  const combinedClassName = `${sizeStyles[size]} ${weightStyles[weight]} ${colorStyles[color]} ${className}`

  if (animate) {
    return (
      <motion.p
        className={combinedClassName}
        style={style}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.p>
    )
  }

  return (
    <p className={combinedClassName} style={style}>
      {children}
    </p>
  )
}
