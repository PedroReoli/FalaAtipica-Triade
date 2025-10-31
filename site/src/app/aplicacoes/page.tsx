"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button"
import { Navbar } from "@/components/layout/Navbar"
import { Smartphone, Users, Stethoscope, BarChart3 } from "lucide-react"

export default function AplicacoesPage() {
  const apps = [
    {
      id: "kids",
      title: "KIDS",
      subtitle: "Para as Crianças",
      description: "Jogos interativos que associam imagens e sons, estimulando a fala e o reconhecimento.",
      icon: Smartphone,
      color: "#1e88e5",
      features: [
        "Jogos educativos adaptados por idade",
        "Feedback positivo e motivador",
        "Interface intuitiva para crianças",
        "Sistema de conquistas e recompensas",
      ],
      audience: "Crianças de 3 a 12 anos",
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
      features: [
        "Relatórios visuais de progresso",
        "Dicas para estimulação em casa",
        "Comunicação com profissionais",
        "Histórico de conquistas",
      ],
      audience: "Pais e responsáveis",
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
      features: [
        "Gestão completa de pacientes",
        "Relatórios clínicos detalhados",
        "Agenda e sessões",
        "Análise de progresso",
      ],
      audience: "Fonoaudiólogos, psicólogos, pedagogos",
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
      features: [
        "Gestão de múltiplos grupos",
        "Relatórios institucionais",
        "Dashboard de impacto",
        "Análise de dados coletivos",
      ],
      audience: "Escolas, clínicas, instituições",
      status: "Em planejamento",
      progress: 10,
    },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero - Compacto */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5] relative">
        <Navbar />
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <Heading level={1} color="white">
              Conheça nosso ecossistema
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Quatro aplicações integradas, cada uma desenvolvida especificamente para seu público-alvo, mas todas
              conectadas pelo mesmo propósito: dar voz a quem ainda não pode falar.
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Aplicações - Compacto */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="grid md:grid-cols-2 gap-6">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-white border-2 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                style={{ borderColor: app.color }}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${app.color}20` }}
                    >
                      <app.icon className="w-7 h-7" style={{ color: app.color }} />
                    </motion.div>
                    <div>
                      <Heading level={3} color="primary" className="text-xl">
                        {app.title}
                      </Heading>
                      <Text size="sm" weight="medium" color="gray">
                        {app.subtitle}
                      </Text>
                    </div>
                  </div>

                  <Text size="sm" color="gray">
                    {app.description}
                  </Text>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <Text size="xs" weight="medium" color="gray">
                        Desenvolvimento
                      </Text>
                      <Text size="xs" weight="semibold" style={{ color: app.color }}>
                        {app.progress}%
                      </Text>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${app.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: app.color }}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1.5">
                    {app.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: app.color }}
                        />
                        <Text size="sm" color="gray">
                          {feature}
                        </Text>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="primary"
                    size="md"
                    href="/parcerias"
                    className="w-full"
                    style={{ backgroundColor: app.color }}
                  >
                    {app.status === "Em planejamento" ? "Interesse em Parceria" : "Solicitar Acesso"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA - Compacto */}
      <section className="py-12 bg-gradient-to-r from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="white">
              Pronto para fazer parte?
            </Heading>

            <Text size="base" color="white" className="max-w-2xl mx-auto">
              Seja como instituição parceira, profissional interessado ou família que busca apoio, temos uma solução
              para você.
            </Text>

            <Button variant="secondary" size="lg" href="/parcerias">
              Fazer Parceria
            </Button>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
