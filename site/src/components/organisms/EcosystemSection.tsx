"use client"

import type React from "react"
import { Container } from "../atoms/Container"
import { Heading } from "../atoms/Heading"
import { Text } from "../atoms/Text"
import { Button } from "../atoms/Button"
import { motion } from "framer-motion"
import { Smartphone, Users, Stethoscope, BarChart3, Check, Sparkles } from "lucide-react"

export const EcosystemSection: React.FC = () => {
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
    <section className="min-h-screen bg-gradient-to-b from-white to-[#f4f6ff] flex items-center justify-center py-8 md:py-12 lg:py-16">
      <Container maxWidth="xl">
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
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

              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`relative bg-white ${app.borderColor} border-3 rounded-2xl p-6 shadow-lg overflow-hidden`}
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

                    {/* Content */}
                    <div className="relative z-10 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${app.bgColor} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>

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
                      <Text size="sm" color="gray" className="leading-relaxed">
                        {app.description}
                      </Text>

                      {/* Features */}
                      <div className="space-y-1.5">
                        {app.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 ${app.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
                            >
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                            <Text size="xs" color="gray">
                              {feature}
                            </Text>
                          </div>
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

                    </div>
                  </div>
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
