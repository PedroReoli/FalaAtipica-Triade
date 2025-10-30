"use client"

import type React from "react"
import { useRef } from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Users, AlertTriangle, Smartphone, TrendingUp, Heart, Clock } from "lucide-react"
import { motion, useInView } from "framer-motion"

export const ChallengesSection: React.FC = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const challenges = [
    {
      icon: <Users className="w-8 h-8 text-[#e53935]" />,
      value: "2M",
      title: "Crianças com Atraso de Fala",
      description: "2 milhões de crianças brasileiras têm algum tipo de atraso de fala",
      color: "#e53935",
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-[#e53935]" />,
      value: "30%",
      title: "Famílias Buscam Apoio",
      description: "Apenas 30% das famílias brasileiras buscam apoio profissional nos primeiros sinais",
      color: "#e53935",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#e53935]" />,
      value: "25-35%",
      title: "Sem Fala Funcional",
      description: "25% a 35% das crianças com TEA no Brasil não desenvolvem fala funcional",
      color: "#e53935",
    },
  ]

  const opportunities = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#43a047]" />,
      value: "47%",
      title: "Comunicação Funcional",
      description: "47% das crianças com atraso severo alcançam comunicação funcional com estímulos adequados",
      color: "#43a047",
    },
    {
      icon: <Heart className="w-8 h-8 text-[#43a047]" />,
      value: "40%",
      title: "Aceleração no Progresso",
      description: "40% de aceleração no progresso usando recursos visuais e tecnológicos",
      color: "#43a047",
    },
    {
      icon: <Clock className="w-8 h-8 text-[#43a047]" />,
      value: "60%",
      title: "Melhora Significativa",
      description: "60% dos pais relatam melhora significativa na fala após acompanhamento contínuo",
      color: "#43a047",
    },
  ]

  const StatCard = ({ stat, index, type }: { stat: any; index: number; type: "challenge" | "opportunity" }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
      }}
      whileHover={{
        scale: 1.05,
        y: -15,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      className={`bg-white border-3 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer ${
        type === "challenge" ? "border-[#e53935]" : "border-[#43a047]"
      }`}
      style={{ perspective: 1000 }}
    >
      <div className="text-center space-y-4">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto ${
            type === "challenge" ? "bg-[#e53935]/10" : "bg-[#43a047]/10"
          }`}
        >
          {stat.icon}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
          className={`text-5xl font-bold ${type === "challenge" ? "text-[#e53935]" : "text-[#43a047]"}`}
        >
          {stat.value}
        </motion.div>

        <div className="space-y-2">
          <Heading level={4} color="primary" className="text-lg group-hover:scale-105 transition-transform">
            {stat.title}
          </Heading>

          <Text size="sm" color="gray" className="leading-relaxed">
            {stat.description}
          </Text>
        </div>

        {/* Progress bar animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.5, duration: 0.8 }}
          className={`h-1 rounded-full ${type === "challenge" ? "bg-[#e53935]" : "bg-[#43a047]"}`}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  )

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#054776] to-[#1e88e5] flex items-center py-20">
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
        <div className="space-y-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-block bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20 mb-4"
            >
              <span className="text-white font-semibold">📊 Dados que Inspiram Ação</span>
            </motion.div>

            <Heading level={2} color="white">
              Os números que nos movem
            </Heading>

            <Text size="lg" color="white" className="max-w-3xl mx-auto">
              O FalaAtípica nasce em um contexto urgente e promissor
            </Text>
          </motion.div>

          {/* Desafios */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <Heading level={3} color="white" className="text-center text-2xl mb-2">
                ⚠️ Desafios
              </Heading>
              <Text size="base" color="white" className="text-center opacity-80">
                A realidade que precisamos transformar
              </Text>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <StatCard key={index} stat={challenge} index={index} type="challenge" />
              ))}
            </div>
          </div>

          {/* Oportunidades */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Heading level={3} color="white" className="text-center text-2xl mb-2">
                ✨ Oportunidades
              </Heading>
              <Text size="base" color="white" className="text-center opacity-80">
                O potencial que podemos alcançar juntos
              </Text>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity, index) => (
                <StatCard key={index} stat={opportunity} index={index} type="opportunity" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
