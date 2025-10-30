"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import Image from "next/image"

interface AppCardProps {
  title: string
  audience: string
  description: string
  color: "blue" | "green" | "yellow"
  icon: React.ReactNode
  delay?: number
}

export const AppCard: React.FC<AppCardProps> = ({ title, audience, description, color, icon, delay = 0 }) => {
  const colorStyles = {
    blue: "border-[#1e88e5]",
    green: "border-[#43a047]",
    yellow: "border-[#fbc02d]",
  }

  const bgColorStyles = {
    blue: "bg-[#1e88e5]/10",
    green: "bg-[#43a047]/10",
    yellow: "bg-[#fbc02d]/10",
  }

  const textColorStyles = {
    blue: "text-[#1e88e5]",
    green: "text-[#43a047]",
    yellow: "text-[#fbc02d]",
  }

  const glowStyles = {
    blue: "hover:shadow-[0_0_30px_rgba(30,136,229,0.2)]",
    green: "hover:shadow-[0_0_30px_rgba(67,160,71,0.2)]",
    yellow: "hover:shadow-[0_0_30px_rgba(251,192,45,0.2)]",
  }

  return (
    <motion.div
      className={`bg-white ${colorStyles[color]} ${glowStyles[color]} border-3 rounded-xl p-6 shadow-lg transition-all duration-300 group`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div className="flex items-center space-x-3 mb-4" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
          <Image
            src="/images/logos/falaatipica-logo.png"
            alt="FalaAtípica"
            width={32}
            height={32}
            className="rounded-lg"
          />
        </motion.div>
        <Heading level={4} className={`${textColorStyles[color]} text-lg`}>
          {title}
        </Heading>
      </motion.div>

      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          <Text size="sm" weight="medium" color="gray">
            Público: {audience}
          </Text>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <Text size="sm" weight="normal" color="gray">
            {description}
          </Text>
        </motion.div>
      </div>

      {/* Decorative gradient on hover */}
      <motion.div
        className={`absolute inset-0 ${bgColorStyles[color]} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
        style={{ transform: "translateZ(-10px)" }}
      />
    </motion.div>
  )
}
