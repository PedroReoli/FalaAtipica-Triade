"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button"
import { Calendar, Lightbulb, CheckCircle, Code, Award, Rocket } from "lucide-react"

export default function TimelinePage() {
  const timeline = [
    {
      date: "Junho 2024",
      title: "A Ideia Nasce",
      description:
        "Pedro Lucas Reis teve a ideia inicial do FalaAtípica durante seus estudos em Sistemas de Informação, identificando a necessidade de uma solução tecnológica para auxiliar crianças com atraso de fala.",
      icon: Lightbulb,
      category: "Concepção",
      color: "#fbc02d",
      status: "completed",
    },
    {
      date: "Agosto 2024",
      title: "Aprovação pela Banca",
      description:
        "O projeto foi aprovado pela banca avaliadora do UniFOA para seguir como Trabalho de Conclusão de Curso, recebendo elogios pela inovação e potencial de impacto social.",
      icon: CheckCircle,
      category: "Aprovação",
      color: "#43a047",
      status: "completed",
    },
    {
      date: "Agosto 2024 - Maio 2025",
      title: "Desenvolvimento Intensivo (MVP)",
      description:
        'Período de criação da aplicação MVP, desenvolvimento da documentação técnica e aprovação no Congresso "Tudo é Ciência", consolidando a base científica do projeto.',
      icon: Code,
      category: "Desenvolvimento",
      color: "#1e88e5",
      status: "completed",
    },
    {
      date: "Junho 2025",
      title: "Apresentação na Banca - Sucesso Total",
      description:
        "Apresentação do projeto para a banca avaliadora do UniFOA, conquistando nota máxima e elogios unânimes. O projeto foi aprovado com excelência.",
      icon: Award,
      category: "Aprovação",
      color: "#43a047",
      status: "completed",
    },
    {
      date: "Julho 2025 - Atual",
      title: "Desenvolvimento da Versão Beta",
      description:
        "Fase atual de desenvolvimento da versão beta do FalaAtípica, com foco em melhorias de UX/UI, testes com usuários reais e preparação para lançamento.",
      icon: Rocket,
      category: "Beta",
      color: "#1e88e5",
      status: "in-progress",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section - Compacto */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <Heading level={1} color="white">
              Timeline do Projeto
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Acompanhe a evolução do FalaAtípica desde a concepção até a transformação social
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Timeline - Compacta */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="relative">
            {/* Linha vertical */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1e88e5] to-[#43a047]"></div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Ícone */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 flex-shrink-0 w-16 h-16 bg-white border-4 border-[#1e88e5] rounded-full flex items-center justify-center shadow-lg"
                    style={{ borderColor: item.color }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: item.color }} />
                  </motion.div>

                  {/* Conteúdo */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-white border-2 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                    style={{ borderColor: item.color }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#1e88e5]" />
                        <Text size="sm" weight="semibold" color="primary">
                          {item.date}
                        </Text>
                      </div>

                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <Heading level={3} color="primary" className="text-lg mb-2">
                      {item.title}
                    </Heading>

                    <Text size="sm" color="gray">
                      {item.description}
                    </Text>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA - Compacto */}
      <section className="py-12 bg-gradient-to-r from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="white">
              Faça parte desta jornada
            </Heading>

            <Text size="base" color="white" className="max-w-2xl mx-auto">
              Junte-se a nós nesta missão de transformar vidas através da tecnologia e inclusão.
            </Text>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" size="lg" href="/parcerias">
                Fazer Parceria
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
