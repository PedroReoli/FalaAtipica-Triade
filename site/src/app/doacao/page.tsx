"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button"
import { Coffee, Share2, Users } from "lucide-react"

export default function DoacaoPage() {
  const supportOptions = [
    {
      icon: Coffee,
      title: "Apoio Financeiro",
      description: "Qualquer valor é bem-vindo e faz a diferença no desenvolvimento do projeto.",
      color: "#fbc02d",
    },
    {
      icon: Share2,
      title: "Divulgação",
      description: "Compartilhe o projeto nas redes sociais e ajude a espalhar a causa.",
      color: "#1e88e5",
    },
    {
      icon: Users,
      title: "Parcerias",
      description: "Conecte-nos com clínicas, escolas e profissionais da área.",
      color: "#43a047",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero - Compacto */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <Heading level={1} color="white">
              Contribua para o FalaAtípica
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Desenvolver um projeto de impacto social sozinho é um desafio imenso. Cada apoio, seja financeiro, de
              divulgação ou parceria, é fundamental para tornar este sonho realidade.
            </Text>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://ko-fi.com/pedroreoli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-[#fbc02d] text-[#054776] hover:bg-[#f9a825] transition-all duration-300"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Apoiar Financeiramente
              </a>

              <Button variant="secondary" size="lg" href="/parcerias">
                <Users className="w-5 h-5 mr-2" />
                Tornar-se Parceiro
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Formas de Apoio - Compacto */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Heading level={2} color="primary">
              Como Você Pode Ajudar
            </Heading>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300"
                style={{ borderColor: option.color }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${option.color}20` }}
                >
                  <option.icon className="w-6 h-6" style={{ color: option.color }} />
                </motion.div>

                <Heading level={4} color="primary" className="mb-2 text-base">
                  {option.title}
                </Heading>

                <Text size="sm" color="gray">
                  {option.description}
                </Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA - Compacto */}
      <section className="py-12 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <Heading level={2} color="white">
              Juntos, Podemos Fazer a Diferença
            </Heading>

            <Text size="base" color="white" className="max-w-2xl mx-auto">
              Cada criança que conseguir se comunicar melhor é uma vitória. Seu apoio é fundamental para tornar isso
              possível.
            </Text>

            <a
              href="https://ko-fi.com/pedroreoli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-[#fbc02d] text-[#054776] hover:bg-[#f9a825] transition-all duration-300"
            >
              <Coffee className="w-5 h-5 mr-2" />
              Apoiar Agora
            </a>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
