"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Text } from "./Text"

interface StatCardProps {
  value: string
  title: string
  description: string
  type: "challenge" | "opportunity"
  index: number
  isInView: boolean
}

export const StatCard: React.FC<StatCardProps> = ({ value, title, description, type, index, isInView }) => {
  const isChallenge = type === "challenge"
  const titleColor = isChallenge ? "#e53935" : "#43a047"
  const borderColor = isChallenge ? "border-[#e53935]" : "border-[#43a047]"
  const valueColor = isChallenge ? "text-[#e53935]" : "text-[#43a047]"

  return (
    <motion.div
      initial={{ opacity: 0, x: isChallenge ? -100 : 100, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      className={`relative bg-white border-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[120px] flex flex-col ${borderColor}`}
    >
      <div className="relative z-10 text-left flex-1 flex px-5 py-4">
        <div className="flex items-center gap-5 flex-1">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
            className={`text-4xl md:text-5xl font-bold leading-none flex-shrink-0 ${valueColor}`}
          >
            {value}
          </motion.div>
          <div className="flex-1 flex flex-col justify-center gap-2 min-h-0">
            <h4 className="text-sm font-semibold leading-tight" style={{ color: titleColor }}>
              {title}
            </h4>
            <div className="h-px bg-gray-200 w-full my-0.5"></div>
            <Text size="xs" color="gray" className="leading-relaxed line-clamp-2">
              {description}
            </Text>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
