"use client"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Button } from "@/components/atoms/Button"
import { Award, Brain, Users, Heart } from "lucide-react"

export default function SobrePage() {
  const testimonials = [
    {
      quote: "Uma proposta inovadora e emocionalmente poderosa.",
      author: "Banca Avaliadora UniFOA",
    },
    {
      quote: "Tecnologia que une ciência, empatia e inclusão.",
      author: "Prof. Dr. Especialista em TEA",
    },
    {
      quote: "Um projeto com potencial real de impacto social.",
      author: "Coordenador de Curso",
    },
  ]

  const achievements = [
    { icon: Award, title: "Aprovado com Excelência", desc: "Nota máxima na banca do UniFOA", color: "#1e88e5" },
    { icon: Brain, title: "Case de Inovação", desc: "Reconhecido em tecnologia assistiva", color: "#43a047" },
    { icon: Users, title: "Parcerias em Andamento", desc: "Clínicas e escolas do RJ", color: "#fbc02d" },
    { icon: Award, title: "Expansão Nacional", desc: "Prevista para 2026", color: "#e53935" },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero - Compacto */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <Heading level={1} color="white">
              Quando inovação encontra propósito
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Criado por Pedro Lucas Reis, o FalaAtípica nasceu como um TCC em Sistemas de Informação pelo UniFOA,
              conquistando nota máxima e elogios por unir tecnologia assistiva, design empático e impacto social real.
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Depoimentos - Compacto */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center space-y-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-[#1e88e5]/10 rounded-full flex items-center justify-center mx-auto"
                  >
                    <Heart className="w-6 h-6 text-[#1e88e5]" />
                  </motion.div>

                  <blockquote className="text-base font-medium text-[#054776] italic">"{testimonial.quote}"</blockquote>

                  <Text size="sm" color="gray" weight="medium">
                    {testimonial.author}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Conquistas - Compacto */}
      <section className="py-12 bg-white">
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Heading level={2} color="primary">
              De um TCC à transformação social
            </Heading>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#f4f6ff] border-2 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300"
                style={{ borderColor: achievement.color }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${achievement.color}20` }}
                >
                  <achievement.icon className="w-6 h-6" style={{ color: achievement.color }} />
                </motion.div>

                <Heading level={4} color="primary" className="mb-1 text-base">
                  {achievement.title}
                </Heading>
                <Text size="sm" color="gray">
                  {achievement.desc}
                </Text>
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
              A voz é o primeiro passo para a inclusão
            </Heading>

            <Text size="base" color="white" className="max-w-2xl mx-auto">
              O FalaAtípica não nasceu apenas para ensinar palavras. Ele nasceu para reconectar o mundo das crianças com
              o mundo das possibilidades.
            </Text>

            <Button variant="secondary" size="lg" href="/parcerias">
              Acompanhar o desenvolvimento
            </Button>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
