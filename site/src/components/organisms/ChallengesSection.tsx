"use client"

import type React from "react"
import { useRef } from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { StatCard } from "../atoms/StatCard"
import { AlertTriangle, TrendingUp } from "lucide-react"
import { motion, useInView } from "framer-motion"

export const ChallengesSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const challenges = [
    {
      value: "2M",
      title: "Crianças com Atraso de Fala",
      description: "2 milhões de crianças brasileiras têm algum tipo de atraso de fala",
      color: "#e53935",
    },
    {
      value: "30%",
      title: "Famílias Buscam Apoio",
      description: "Apenas 30% das famílias brasileiras buscam apoio profissional nos primeiros sinais",
      color: "#e53935",
    },
    {
      value: "30%",
      title: "Sem Fala Funcional",
      description: "Em média 30% das crianças com TEA no Brasil não desenvolvem fala funcional",
      color: "#e53935",
    },
  ]

  const opportunities = [
    {
      value: "47%",
      title: "Comunicação Funcional",
      description: "47% das crianças com atraso severo alcançam comunicação funcional com estímulos adequados",
      color: "#43a047",
    },
    {
      value: "40%",
      title: "Aceleração no Progresso",
      description: "40% de aceleração no progresso usando recursos visuais e tecnológicos",
      color: "#43a047",
    },
    {
      value: "60%",
      title: "Melhora Significativa",
      description: "60% dos pais relatam melhora significativa na fala após acompanhamento contínuo",
      color: "#43a047",
    },
  ]


  return (
    <section
      ref={ref}
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#054776] to-[#1e88e5] flex items-center justify-center py-12 md:py-16 lg:py-20"
    >
      {/* Animated background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <Container maxWidth="xl">
        <div className="space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="white">
              Os números que nos movem
            </Heading>

            <Text size="lg" color="white" className="max-w-3xl mx-auto leading-relaxed">
              O FalaAtípica nasce em um contexto urgente e promissor. Veja os desafios que enfrentamos e as
              oportunidades que podemos alcançar juntos.
            </Text>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coluna de Desafios */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-center lg:text-left"
              >
                <div className="inline-flex items-center space-x-3 bg-[#e53935]/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#e53935]/30 mb-4">
                  <AlertTriangle className="w-5 h-5 text-white" />
                  <Heading level={3} color="white" className="text-xl">
                    Desafios
                  </Heading>
                </div>
                <Text size="base" color="white" className="opacity-90 mt-2">
                  A realidade que precisamos transformar
                </Text>
              </motion.div>

              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <StatCard
                    key={index}
                    value={challenge.value}
                    title={challenge.title}
                    description={challenge.description}
                    type="challenge"
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>

            {/* Coluna de Oportunidades */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-center lg:text-right"
              >
                <div className="inline-flex items-center space-x-3 bg-[#43a047]/20 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#43a047]/30 mb-4">
                  <Heading level={3} color="white" className="text-xl">
                    Oportunidades
                  </Heading>
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <Text size="base" color="white" className="opacity-90 mt-2">
                  O potencial que podemos alcançar juntos
                </Text>
              </motion.div>

              <div className="space-y-4">
                {opportunities.map((opportunity, index) => (
                  <StatCard
                    key={index}
                    value={opportunity.value}
                    title={opportunity.title}
                    description={opportunity.description}
                    type="opportunity"
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <Heading level={3} color="white" className="mb-4">
              Transformando desafios em oportunidades
            </Heading>
            <Text size="base" color="white" className="max-w-2xl mx-auto opacity-90">
              O FalaAtípica é a ponte entre a realidade atual e o futuro que queremos construir para milhares de
              crianças brasileiras.
            </Text>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
