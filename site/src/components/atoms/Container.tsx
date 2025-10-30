"use client"

import type React from "react"
import { motion } from "framer-motion"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  animate?: boolean
}

export const Container: React.FC<ContainerProps> = ({ children, className = "", maxWidth = "xl", animate = false }) => {
  const maxWidthStyles = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  }

  const combinedClassName = `${maxWidthStyles[maxWidth]} mx-auto px-6 ${className}`

  if (animate) {
    return (
      <motion.div
        className={combinedClassName}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={combinedClassName}>{children}</div>
}
