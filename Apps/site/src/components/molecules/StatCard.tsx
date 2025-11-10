"use client"

import React, { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Text } from "../atoms/Text"

interface StatCardProps {
  value: string
  description: string
  color: "blue" | "green" | "red" | "yellow"
  icon?: React.ReactNode
  delay?: number
}

export const StatCard: React.FC<StatCardProps> = ({ value, description, color, icon, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  const colorStyles = {
    blue: "border-[#1e88e5] bg-white/10 backdrop-blur-sm",
    green: "border-[#43a047] bg-white/10 backdrop-blur-sm",
    red: "border-[#e53935] bg-white/10 backdrop-blur-sm",
    yellow: "border-[#fbc02d] bg-white/10 backdrop-blur-sm",
  }

  const textColorStyles = {
    blue: "text-white",
    green: "text-white",
    red: "text-white",
    yellow: "text-white",
  }

  const iconColorStyles = {
    blue: "text-[#1e88e5]",
    green: "text-[#43a047]",
    red: "text-[#e53935]",
    yellow: "text-[#fbc02d]",
  }

  const glowStyles = {
    blue: "hover:shadow-[0_0_30px_rgba(30,136,229,0.3)]",
    green: "hover:shadow-[0_0_30px_rgba(67,160,71,0.3)]",
    red: "hover:shadow-[0_0_30px_rgba(229,57,53,0.3)]",
    yellow: "hover:shadow-[0_0_30px_rgba(251,192,45,0.3)]",
  }

  // Counter animation
  useEffect(() => {
    if (!isInView) return

    const numericValue = Number.parseInt(value.replace(/\D/g, ""))
    if (isNaN(numericValue)) return

    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setCount(numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  const displayValue = value.includes("+")
    ? `${count}+`
    : value.includes("mil")
      ? `${count} mil`
      : value.includes("%")
        ? `${count}%`
        : count.toString()

  return (
    <motion.div
      ref={ref}
      className={`${colorStyles[color]} ${glowStyles[color]} border-3 rounded-xl p-6 shadow-lg transition-all duration-300`}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {icon && (
        <motion.div className="mb-4 flex justify-center" whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
          <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
            <div className={iconColorStyles[color]}>{icon}</div>
          </div>
        </motion.div>
      )}
      <motion.div
        className={`text-4xl md:text-5xl font-bold mb-2 ${textColorStyles[color]} text-center`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
      >
        {isInView ? displayValue : "0"}
      </motion.div>
      <Text size="base" weight="medium" color="white" className="text-center">
        {description}
      </Text>
    </motion.div>
  )
}
