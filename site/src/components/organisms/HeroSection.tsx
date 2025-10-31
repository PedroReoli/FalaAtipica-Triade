"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Navbar } from "../layout/Navbar"
import { Model3DViewer } from "../molecules/Model3DViewer"
import { motion } from "framer-motion"

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <Navbar />
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
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center relative z-10">
          {/* Texto à esquerda */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
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
          </div>

          {/* Modelo 3D à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]"
          >
            <Model3DViewer />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
