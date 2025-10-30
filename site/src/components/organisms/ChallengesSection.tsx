"use client"

import type React from "react"
import { useRef } from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Users, AlertTriangle, Smartphone, TrendingUp, Heart, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, useInView } from "framer-motion"

export const ChallengesSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const challenges = [
    {
      icon: <Users className="w-6 h-6 text-[#e53935]" />,
      value: "2M",
      title: "Crianças com Atraso de Fala",
      description: "2 milhões de crianças brasileiras têm algum tipo de atraso de fala",
      color: "#e53935",
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-[#e53935]" />,
      value: "30%",
      title: "Famílias Buscam Apoio",
      description: "Apenas 30% das famílias brasileiras buscam apoio profissional nos primeiros sinais",
      color: "#e53935",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#e53935]" />,
      value: "25-35%",
      title: "Sem Fala Funcional",
      description: "25% a 35% das crianças com TEA no Brasil não desenvolvem fala funcional",
      color: "#e53935",
    },
  ]

  const opportunities = [
    {
      icon: <TrendingUp className="w-6 h-6 text-[#43a047]" />,
      value: "47%",
      title: "Comunicação Funcional",
      description: "47% das crianças com atraso severo alcançam comunicação funcional com estímulos adequados",
      color: "#43a047",
    },
    {
      icon: <Heart className="w-6 h-6 text-[#43a047]" />,
      value: "40%",
      title: "Aceleração no Progresso",
      description: "40% de aceleração no progresso usando recursos visuais e tecnológicos",
      color: "#43a047",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#43a047]" />,
      value: "60%",
      title: "Melhora Significativa",
      description: "60% dos pais relatam melhora significativa na fala após acompanhamento contínuo",
      color: "#43a047",
    },
  ]

  const StatCard = ({ stat, index, type }: { stat: any; index: number; type: "challenge" | "opportunity" }) => {
    const isChallenge = type === "challenge"

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
        className={`relative bg-white border-3 rounded-xl p-4 shadow-lg transition-all duration-300 group cursor-pointer ${
          isChallenge ? "border-[#e53935]" : "border-[#43a047]"
        }`}
      >
        {/* Animated background on hover */}
        <motion.div
          className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
            isChallenge ? "bg-[#e53935]" : "bg-[#43a047]"
          }`}
        />

        <div className="relative z-10 text-center space-y-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
              isChallenge ? "bg-[#e53935]/10" : "bg-[#43a047]/10"
            }`}
          >
            {stat.icon}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
            className={`text-3xl font-bold ${isChallenge ? "text-[#e53935]" : "text-[#43a047]"}`}
          >
            {stat.value}
          </motion.div>

          <div className="space-y-1.5">
            <Heading level={4} color="primary" className="text-base">
              {stat.title}
            </Heading>

            <Text size="xs" color="gray" className="leading-relaxed">
              {stat.description}
            </Text>
          </div>

          {/* Animated arrow on hover */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            whileHover={{ opacity: 1, x: isChallenge ? 5 : -5 }}
            className={`flex items-center justify-center space-x-2 pt-2 ${
              isChallenge ? "text-[#e53935]" : "text-[#43a047]"
            }`}
          >
            {isChallenge ? (
              <>
                <Text size="xs" weight="semibold">
                  Transformar
                </Text>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                <Text size="xs" weight="semibold">
                  Alcançar
                </Text>
              </>
            )}
          </motion.div>

          {/* Progress bar animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
            className={`h-1 rounded-full ${isChallenge ? "bg-[#e53935]" : "bg-[#43a047]"}`}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#054776] to-[#1e88e5] flex items-center py-12"
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

          <div className="grid lg:grid-cols-2 gap-12">
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

              <div className="space-y-6">
                {challenges.map((challenge, index) => (
                  <StatCard key={index} stat={challenge} index={index} type="challenge" />
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

              <div className="space-y-6">
                {opportunities.map((opportunity, index) => (
                  <StatCard key={index} stat={opportunity} index={index} type="opportunity" />
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
