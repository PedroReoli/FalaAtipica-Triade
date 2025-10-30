"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Award, Brain, Trophy, MessageCircle, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export const AchievementsSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const achievements = [
    {
      icon: <Award className="w-10 h-10 text-[#fbc02d]" />,
      title: "Aprovado com excelência",
      description: "Na banca do UniFOA",
      color: "#fbc02d",
    },
    {
      icon: <Brain className="w-10 h-10 text-[#1e88e5]" />,
      title: "Reconhecido pela inovação social",
      description: "No campo da tecnologia assistiva",
      color: "#1e88e5",
    },
    {
      icon: <Trophy className="w-10 h-10 text-[#43a047]" />,
      title: "Apresentado como case de inclusão",
      description: "No ambiente acadêmico",
      color: "#43a047",
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-[#e53935]" />,
      title: "Em negociação com parceiros",
      description: "Clínicas e escolas de Volta Redonda e região",
      color: "#e53935",
    },
    {
      icon: <Rocket className="w-10 h-10 text-[#1e88e5]" />,
      title: "Expansão planejada",
      description: "Para todo o território nacional em 2026",
      color: "#1e88e5",
    },
  ]

  return (
    <section ref={ref} className="min-h-screen bg-[#f4f6ff] flex items-center py-20 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Trophy className="w-[600px] h-[600px] text-[#1e88e5]" />
      </motion.div>

      <Container maxWidth="xl">
        <div className="space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white px-6 py-2 rounded-full font-semibold text-sm mb-4">
                🏆 Reconhecimento e Conquistas
              </div>
            </motion.div>

            <Heading level={2} color="primary">
              De um TCC à transformação social
            </Heading>

            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              Um projeto que conquistou reconhecimento e está pronto para transformar vidas
            </Text>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="bg-gradient-to-br from-white to-[#f4f6ff] border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl"
                  style={{ borderColor: achievement.color, borderWidth: 2 }}
                >
                  {achievement.icon}
                </motion.div>

                <h4 className="text-base font-bold text-[#054776] mb-2 group-hover:text-[#1e88e5] transition-colors">
                  {achievement.title}
                </h4>

                <Text size="sm" color="gray" className="leading-relaxed">
                  {achievement.description}
                </Text>

                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="h-1 rounded-full mt-4 mx-auto"
                  style={{ backgroundColor: achievement.color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
