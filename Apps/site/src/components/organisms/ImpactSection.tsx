"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { motion } from "framer-motion"
import { Users, Heart, TrendingUp, Award } from "lucide-react"

export const ImpactSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: "1 em cada 5",
      label: "crianças tem atraso de fala",
      description: "Segundo estudos recentes",
      color: "#1e88e5",
      bgColor: "bg-[#1e88e5]",
    },
    {
      icon: Heart,
      value: "70%",
      label: "das famílias não têm acesso",
      description: "A fonoaudiólogos especializados",
      color: "#e53935",
      bgColor: "bg-[#e53935]",
    },
    {
      icon: TrendingUp,
      value: "3x mais rápido",
      label: "desenvolvimento com intervenção precoce",
      description: "Comparado a tratamento tardio",
      color: "#43a047",
      bgColor: "bg-[#43a047]",
    },
    {
      icon: Award,
      value: "95%",
      label: "de sucesso com gamificação",
      description: "Em estudos de engajamento infantil",
      color: "#fbc02d",
      bgColor: "bg-[#fbc02d]",
    },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f4f6ff] to-white flex items-center justify-center py-12 md:py-16 lg:py-20">
      <Container maxWidth="xl">
        <div className="space-y-10 md:space-y-12 lg:space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="primary">
              O Impacto Real dos Números
            </Heading>

            <Text size="lg" color="gray" className="max-w-3xl mx-auto leading-relaxed">
              Dados que mostram a urgência e o potencial transformador do FalaAtípica na vida de milhares de crianças e
              famílias brasileiras.
            </Text>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="bg-white border-3 border-[#1e88e5] rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full">
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 ${stat.bgColor} opacity-0 rounded-2xl`}
                      whileHover={{ opacity: 0.05 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <div className="space-y-2">
                        <motion.div
                          initial={{ scale: 1 }}
                          whileInView={{ scale: [1, 1.1, 1] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        >
                          <Heading level={3} style={{ color: stat.color }} className="text-4xl">
                            {stat.value}
                          </Heading>
                        </motion.div>

                        <Text size="base" weight="semibold" color="primary">
                          {stat.label}
                        </Text>

                        <Text size="sm" color="gray" className="leading-relaxed">
                          {stat.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-2xl p-8 text-center shadow-xl"
          >
            <Heading level={3} color="white" className="mb-4">
              Cada número representa uma vida que pode ser transformada
            </Heading>
            <Text size="base" color="white" weight="light" className="max-w-2xl mx-auto">
              O FalaAtípica não é apenas tecnologia. É esperança, é inclusão, é dar voz a quem ainda não pode falar por
              si mesmo.
            </Text>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
