"use client"

import type React from "react"
import { useState } from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Button } from "../atoms/Button"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, Users, Stethoscope, BarChart3, ArrowRight, Check, Sparkles } from "lucide-react"

export const EcosystemSection: React.FC = () => {
  const [activeApp, setActiveApp] = useState<number | null>(null)

  const apps = [
    {
      id: "kids",
      title: "KIDS",
      subtitle: "Para as Crianças",
      description: "Jogos interativos que associam imagens e sons, estimulando a fala e o reconhecimento.",
      icon: Smartphone,
      color: "#1e88e5",
      bgColor: "bg-[#1e88e5]",
      borderColor: "border-[#1e88e5]",
      features: [
        "Jogos educativos adaptados",
        "Feedback positivo e motivador",
        "Interface intuitiva",
        "Sistema de conquistas",
      ],
      status: "Em desenvolvimento",
      progress: 60,
    },
    {
      id: "tutors",
      title: "TUTORS",
      subtitle: "Para Pais e Responsáveis",
      description: "Relatórios e acompanhamento diário da evolução da criança.",
      icon: Users,
      color: "#43a047",
      bgColor: "bg-[#43a047]",
      borderColor: "border-[#43a047]",
      features: [
        "Relatórios visuais de progresso",
        "Dicas para estimulação",
        "Comunicação com profissionais",
        "Histórico de conquistas",
      ],
      status: "Em desenvolvimento",
      progress: 60,
    },
    {
      id: "pro",
      title: "PRO",
      subtitle: "Para Profissionais",
      description: "Ferramentas clínicas para terapeutas, escolas e instituições.",
      icon: Stethoscope,
      color: "#fbc02d",
      bgColor: "bg-[#fbc02d]",
      borderColor: "border-[#fbc02d]",
      features: [
        "Gestão completa de pacientes",
        "Relatórios clínicos detalhados",
        "Agenda e sessões",
        "Análise de progresso",
      ],
      status: "95% completo",
      progress: 95,
    },
    {
      id: "institution",
      title: "INSTITUTION",
      subtitle: "Para Instituições",
      description: "Gestão de grupos escolares e clínicos, relatórios coletivos e progresso institucional.",
      icon: BarChart3,
      color: "#e53935",
      bgColor: "bg-[#e53935]",
      borderColor: "border-[#e53935]",
      features: [
        "Gestão de múltiplos grupos",
        "Relatórios institucionais",
        "Dashboard de impacto",
        "Análise de dados coletivos",
      ],
      status: "Em breve",
      progress: 10,
      comingSoon: true,
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#1e88e5]/10 rounded-full">
              <Sparkles className="w-5 h-5 text-[#1e88e5]" />
              <Text size="sm" weight="semibold" color="primary">
                Ecossistema Integrado
              </Text>
            </div>

            <Heading level={2} color="primary">
              Quatro Aplicações, Um Propósito
            </Heading>

            <Text size="lg" color="gray" className="max-w-3xl mx-auto leading-relaxed">
              Cada aplicação foi desenvolvida especificamente para seu público-alvo, mas todas conectadas pelo mesmo
              objetivo: dar voz a quem ainda não pode falar.
            </Text>
          </motion.div>

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {apps.map((app, index) => {
              const Icon = app.icon
              const isActive = activeApp === index

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setActiveApp(index)}
                  onHoverEnd={() => setActiveApp(null)}
                  className="relative"
                >
                  <motion.div
                    className={`relative bg-white ${app.borderColor} border-3 rounded-2xl p-8 shadow-lg overflow-hidden cursor-pointer`}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Coming Soon Badge */}
                    {app.comingSoon && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 z-10"
                      >
                        <span className="bg-[#fbc02d] text-[#054776] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                          EM BREVE
                        </span>
                      </motion.div>
                    )}

                    {/* Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 ${app.bgColor} opacity-0`}
                      animate={{ opacity: isActive ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <motion.div
                            className={`w-16 h-16 ${app.bgColor} rounded-xl flex items-center justify-center`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </motion.div>

                          <div>
                            <Heading level={3} color="primary" className="text-2xl">
                              {app.title}
                            </Heading>
                            <Text size="sm" weight="medium" color="gray">
                              {app.subtitle}
                            </Text>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <Text size="base" color="gray" className="leading-relaxed">
                        {app.description}
                      </Text>

                      {/* Features */}
                      <div className="space-y-2">
                        {app.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div
                              className={`w-5 h-5 ${app.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                            >
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <Text size="sm" color="gray">
                              {feature}
                            </Text>
                          </motion.div>
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Text size="sm" weight="semibold" color="primary">
                            {app.status}
                          </Text>
                          <Text size="sm" weight="semibold" style={{ color: app.color }}>
                            {app.progress}%
                          </Text>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${app.bgColor} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${app.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center space-x-2"
                            style={{ color: app.color }}
                          >
                            <Text size="sm" weight="semibold">
                              Saiba mais
                            </Text>
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Button variant="primary" size="lg" href="/aplicacoes">
              Explorar Todas as Aplicações
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
