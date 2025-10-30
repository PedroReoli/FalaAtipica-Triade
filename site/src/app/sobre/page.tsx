// Sobre Page
import React from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Award, Brain, Users, Heart } from 'lucide-react'
import Image from 'next/image'

export default function SobrePage() {
  const testimonials = [
    {
      quote: "Uma proposta inovadora e emocionalmente poderosa.",
      author: "Banca Avaliadora UniFOA"
    },
    {
      quote: "Tecnologia que une ciência, empatia e inclusão.",
      author: "Prof. Dr. Especialista em TEA"
    },
    {
      quote: "Um projeto com potencial real de impacto social.",
      author: "Coordenador de Curso"
    }
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={1} color="white">
              Quando inovação encontra propósito
            </Heading>
            
            <Text size="xl" color="white" weight="light" className="max-w-4xl mx-auto leading-relaxed">
              Criado por Pedro Lucas Reis, o FalaAtípica nasceu como um Trabalho de Conclusão de Curso 
              em Sistemas de Informação pelo UniFOA, conquistando nota máxima e elogios da banca por 
              unir tecnologia assistiva, design empático e impacto social real.
            </Text>
          </div>
        </Container>
      </section>

      {/* Origem e Reconhecimento */}
      <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="space-y-12">
            <div className="text-center space-y-6">
              <Heading level={2} color="primary">
                Origem e Reconhecimento
              </Heading>
              
              <Text size="lg" color="gray" className="max-w-3xl mx-auto leading-relaxed">
                Hoje, o projeto desperta o interesse de clínicas e escolas referência em Volta Redonda, 
                que aguardam ansiosamente seu lançamento.
              </Text>
            </div>

            {/* Cards de Depoimentos */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#1e88e5] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#1e88e5]/10 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="w-8 h-8 text-[#1e88e5]" />
                    </div>
                    
                    <blockquote className="text-lg font-medium text-[#054776] italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <Text size="sm" color="gray" weight="medium">
                      — {testimonial.author}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Conquistas */}
      <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Heading level={2} color="primary">
                De um TCC à transformação social
              </Heading>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#1e88e5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#1e88e5]" />
                </div>
                <Heading level={4} color="primary" className="mb-2">
                  Aprovado com Excelência
                </Heading>
                <Text size="sm" color="gray">
                  Nota máxima na banca do UniFOA
                </Text>
              </div>

              <div className="bg-white border-3 border-[#43a047] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#43a047]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-[#43a047]" />
                </div>
                <Heading level={4} color="secondary" className="mb-2">
                  Case de Inovação
                </Heading>
                <Text size="sm" color="gray">
                  Reconhecido em tecnologia assistiva
                </Text>
              </div>

              <div className="bg-white border-3 border-[#fbc02d] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#fbc02d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#fbc02d]" />
                </div>
                <Heading level={4} color="primary" className="mb-2">
                  Parcerias em Andamento
                </Heading>
                <Text size="sm" color="gray">
                  Clínicas e escolas do RJ
                </Text>
              </div>

              <div className="bg-white border-3 border-[#e53935] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#e53935]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#e53935]" />
                </div>
                <Heading level={4} color="primary" className="mb-2">
                  Expansão Nacional
                </Heading>
                <Text size="sm" color="gray">
                  Prevista para 2026
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={2} color="white">
              A voz é o primeiro passo para a inclusão
            </Heading>
            
            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto leading-relaxed">
              O FalaAtípica não nasceu apenas para ensinar palavras. Ele nasceu para reconectar 
              o mundo das crianças com o mundo das possibilidades.
            </Text>
            
            <div className="space-y-4">
              <Button variant="secondary" size="lg" href="/parcerias">
                Acompanhar o desenvolvimento do projeto
              </Button>
              
              <Text size="sm" color="white" className="italic">
                Junte-se às clínicas, escolas e famílias que acreditam que toda voz merece ser ouvida.
              </Text>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
