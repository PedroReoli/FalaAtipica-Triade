"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { JSX } from "react/jsx-runtime" // Import JSX to fix the undeclared variable error

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
  color?: "primary" | "secondary" | "dark" | "white"
  style?: React.CSSProperties
  animate?: boolean
  underline?: boolean
  gradient?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = "",
  color = "dark",
  style,
  animate = false,
  underline = false,
  gradient = false,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  const colorStyles = {
    primary: gradient ? "bg-gradient-to-r from-[#1e88e5] to-[#1565c0] bg-clip-text text-transparent" : "text-[#1e88e5]",
    secondary: gradient
      ? "bg-gradient-to-r from-[#1e88e5] to-[#1565c0] bg-clip-text text-transparent"
      : "text-[#1e88e5]",
    dark: "text-[#3c3c3c]",
    white: "text-white",
  }

  const levelStyles = {
    1: "text-4xl md:text-5xl lg:text-6xl font-bold",
    2: "text-3xl md:text-4xl lg:text-5xl font-bold",
    3: "text-2xl md:text-3xl lg:text-4xl font-semibold",
    4: "text-xl md:text-2xl lg:text-3xl font-semibold",
    5: "text-lg md:text-xl lg:text-2xl font-medium",
    6: "text-base md:text-lg lg:text-xl font-medium",
  }

  const combinedClassName = `${levelStyles[level]} ${colorStyles[color]} ${underline ? "relative inline-block" : ""} ${className}`

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Tag className={combinedClassName} style={style}>
          {children}
          {underline && (
            <motion.span
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#1e88e5] to-[#1565c0] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          )}
        </Tag>
      </motion.div>
    )
  }

  return (
    <Tag className={combinedClassName} style={style}>
      {children}
      {underline && (
        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e88e5] to-[#1565c0] rounded-full" />
      )}
    </Tag>
  )
}
