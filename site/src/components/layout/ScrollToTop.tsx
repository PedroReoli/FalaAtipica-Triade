"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Detectar quando a navbar sai da visão (navbar tem altura de aproximadamente 80px - h-20)
  useEffect(() => {
    const handleScroll = () => {
      // Navbar altura é h-20 = 5rem = 80px
      const navbarHeight = 80
      setIsVisible(window.scrollY > navbarHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white shadow-lg hover:shadow-xl transition-all duration-300 items-center justify-center group"
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Voltar ao topo"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="w-6 h-6 group-hover:text-white" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
