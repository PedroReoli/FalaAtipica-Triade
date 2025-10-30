"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Model3DViewer } from "../molecules/Model3DViewer"
import { motion } from "framer-motion"
import { Sparkles, Heart, Zap } from "lucide-react"

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex items-center py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#1e88e5] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#43a047] rounded-full blur-3xl" />
      </motion.div>

      <Container maxWidth="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Texto à esquerda */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-[#1e88e5]/10 px-4 py-2 rounded-full"
              >
                <Sparkles className="w-5 h-5 text-[#1e88e5]" />
                <span className="text-[#054776] font-semibold">Tecnologia Assistiva Inovadora</span>
              </motion.div>

              <Heading level={1} color="primary" className="leading-tight">
                E se a tecnologia pudesse ser a ponte para quem ainda não consegue se comunicar?
              </Heading>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Text size="lg" color="dark" weight="light" className="leading-relaxed">
                  Inspirado por essa reflexão, surgiu o{" "}
                  <span className="text-[#054776] font-semibold">FalaAtípica</span> — uma solução tecnológica voltada a{" "}
                  <span className="text-[#43a047] font-semibold">crianças com atraso de fala</span>, promovendo a{" "}
                  <span className="text-[#1e88e5] font-semibold">expressão verbal</span> de forma{" "}
                  <span className="text-[#fbc02d] font-semibold">lúdica, acessível e afetiva</span>.
                </Text>
              </motion.div>
            </motion.div>

            {/* Stats badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#1e88e5]/10 to-[#1e88e5]/5 px-4 py-3 rounded-xl border-2 border-[#1e88e5]/20"
              >
                <Heart className="w-5 h-5 text-[#e53935]" />
                <div>
                  <div className="text-2xl font-bold text-[#054776]">2M+</div>
                  <div className="text-xs text-gray-600">Crianças impactadas</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-[#43a047]/10 to-[#43a047]/5 px-4 py-3 rounded-xl border-2 border-[#43a047]/20"
              >
                <Zap className="w-5 h-5 text-[#fbc02d]" />
                <div>
                  <div className="text-2xl font-bold text-[#054776]">47%</div>
                  <div className="text-xs text-gray-600">Melhora comprovada</div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Modelo 3D à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="h-[400px] lg:h-[500px]"
          >
            <Model3DViewer />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
