"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Model3DViewer() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
        animate={
          isVisible
            ? {
                opacity: 1,
                scale: 1,
                rotateY: 0,
              }
            : {}
        }
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              rotateZ: 5,
            }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/logos/falaatipica-logo.png"
              alt="FalaAtípica Logo"
              width={600}
              height={600}
              className="w-full h-auto max-w-[400px] md:max-w-[500px] lg:max-w-[600px] drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
