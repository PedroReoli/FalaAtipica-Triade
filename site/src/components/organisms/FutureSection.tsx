"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Button } from "../atoms/Button"
import { motion } from "framer-motion"
import { Rocket, Building2, BarChart3, FileCheck, ArrowRight } from "lucide-react"

export const FutureSection: React.FC = () => {
  const nextSteps = [
    {
      icon: Rocket,
      title: "Lançamento público",
      description: "Dos módulos KIDS, TUTORS e PRO",
      color: "#1e88e5",
      bgColor: "bg-[#1e88e5]",
    },
    {
      icon: Building2,
      title: "Parcerias estratégicas",
      description: "Com escolas inclusivas e clínicas multidisciplinares",
      color: "#43a047",
      bgColor: "bg-[#43a047]",
    },
    {
      icon: BarChart3,
      title: "Versão institucional",
      description: "Com dashboards de impacto coletivo",
      color: "#fbc02d",
      bgColor: "bg-[#fbc02d]",
    },
    {
      icon: FileCheck,
      title: "Registro no INPI",
      description: "Completo da marca e do software",
      color: "#e53935",
      bgColor: "bg-[#e53935]",
    },
  ]

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#f4f6ff] flex items-center py-20">
      <Container maxWidth="xl">
        <div className="space-y-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="primary">
              O Futuro do FalaAtípica
            </Heading>

            <Text size="lg" color="gray" className="max-w-3xl mx-auto leading-relaxed">
              Nossa jornada está apenas começando. Veja os próximos passos para transformar ainda mais vidas através da
              tecnologia assistiva.
            </Text>
          </motion.div>

          {/* Next Steps Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="bg-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    {/* Animated Background */}
                    <motion.div
                      className={`absolute inset-0 ${step.bgColor} opacity-0 rounded-xl`}
                      whileHover={{ opacity: 0.05 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      <motion.div
                        className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto`}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <Heading level={4} color="primary" className="text-center">
                        {step.title}
                      </Heading>

                      <Text size="sm" color="gray" className="text-center leading-relaxed">
                        {step.description}
                      </Text>

                      {/* Hover Arrow */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="flex items-center justify-center space-x-2 pt-2"
                        style={{ color: step.color }}
                      >
                        <Text size="xs" weight="semibold">
                          Em breve
                        </Text>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-2xl p-12 shadow-2xl text-center space-y-6"
          >
            <Heading level={3} color="white">
              A voz é o primeiro passo para a inclusão
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto leading-relaxed">
              O FalaAtípica não nasceu apenas para ensinar palavras. Ele nasceu para reconectar o mundo das crianças com
              o mundo das possibilidades.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="secondary" size="lg" href="/parcerias">
                  Fazer Parceria
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" href="/timeline">
                  Acompanhar Novidades
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
