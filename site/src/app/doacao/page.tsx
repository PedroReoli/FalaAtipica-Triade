import React from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Heart, Share2, Coffee, Users, Target, Lightbulb } from 'lucide-react'
import Image from 'next/image'

export default function DoacaoPage() {
  const supportOptions = [
    {
      icon: Coffee,
      title: "Apoio Financeiro",
      description: "Qualquer valor é bem-vindo e faz a diferença no desenvolvimento do projeto.",
      color: "text-[#fbc02d]",
      bgColor: "bg-[#fbc02d]/10",
      borderColor: "border-[#fbc02d]"
    },
    {
      icon: Share2,
      title: "Divulgação",
      description: "Compartilhe o projeto nas redes sociais e ajude a espalhar a causa.",
      color: "text-[#1e88e5]",
      bgColor: "bg-[#1e88e5]/10",
      borderColor: "border-[#1e88e5]"
    },
    {
      icon: Users,
      title: "Parcerias",
      description: "Conecte-nos com clínicas, escolas e profissionais da área.",
      color: "text-[#43a047]",
      bgColor: "bg-[#43a047]/10",
      borderColor: "border-[#43a047]"
    }
  ]

  const challenges = [
    {
      icon: Target,
      title: "Desenvolvimento Solo",
      description: "Todo o projeto é desenvolvido por um único desenvolvedor, exigindo dedicação total e investimento próprio."
    },
    {
      icon: Lightbulb,
      title: "Inovação Contínua",
      description: "Cada funcionalidade é pensada e desenvolvida do zero, buscando sempre a melhor experiência para as crianças."
    }
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Heading level={1} color="white" className="text-4xl md:text-5xl">
                Contribua para o FalaAtípica
              </Heading>
              
              <Text size="xl" color="white" weight="normal" className="max-w-3xl mx-auto leading-relaxed">
                Desenvolver um projeto de <span className="font-bold text-[#fbc02d]">impacto social</span> sozinho é um 
                <span className="font-bold text-[#fbc02d]"> desafio imenso</span>. Cada apoio, seja financeiro, 
                de divulgação ou parceria, é <span className="font-bold text-[#fbc02d]">fundamental</span> para 
                tornar este sonho realidade.
              </Text>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg" 
                href="https://ko-fi.com/pedroreoli"
                target="_blank"
                className="bg-[#fbc02d] text-[#054776] border-[#fbc02d] hover:bg-[#f9a825] hover:border-[#f9a825]"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Apoiar Financeiramente
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                href="/parcerias"
                className="border-2 border-white text-white hover:bg-white hover:text-[#054776]"
              >
                <Users className="w-5 h-5 mr-2" />
                Tornar-se Parceiro
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Desafios Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <Heading level={2} color="primary">
                O Desafio do Desenvolvimento Solo
              </Heading>
              
              <Text size="lg" color="primary" weight="normal" className="max-w-2xl mx-auto">
                Criar um sistema completo de auxílio para crianças com atraso de fala 
                <span className="font-bold text-[#43a047]"> não é tarefa fácil</span>. 
                Cada linha de código, cada decisão de design e cada funcionalidade 
                é resultado de <span className="font-bold text-[#43a047]">muito estudo, 
                dedicação e investimento próprio</span>.
              </Text>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-[#f4f6ff] border-2 border-[#054776]/20 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-[#054776]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <challenge.icon className="w-8 h-8 text-[#054776]" />
                  </div>
                  
                  <Heading level={3} color="primary" className="mb-4">
                    {challenge.title}
                  </Heading>
                  
                  <Text size="base" color="primary" weight="normal">
                    {challenge.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Formas de Apoio */}
      <section className="py-16 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="text-center space-y-12">
            <div className="space-y-4">
              <Heading level={2} color="primary">
                Como Você Pode Ajudar
              </Heading>
              
              <Text size="lg" color="primary" weight="normal" className="max-w-2xl mx-auto">
                Existem várias formas de <span className="font-bold text-[#43a047]">apoiar o projeto</span>. 
                Cada contribuição, por menor que seja, é <span className="font-bold text-[#43a047]">extremamente valiosa</span> 
                e nos aproxima do objetivo de ajudar mais crianças.
              </Text>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className={`bg-white border-2 ${option.borderColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <option.icon className={`w-8 h-8 ${option.color}`} />
                  </div>
                  
                  <Heading level={3} color="primary" className="mb-4">
                    {option.title}
                  </Heading>
                  
                  <Text size="base" color="primary" weight="normal" className="leading-relaxed">
                    {option.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Impacto Section */}
      <section className="py-16 bg-white">
        <Container maxWidth="lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Heading level={2} color="primary">
                O Impacto do Seu Apoio
              </Heading>
              
              <div className="space-y-4">
                <Text size="lg" color="primary" weight="normal" className="leading-relaxed">
                  Com seu apoio, podemos:
                </Text>
                
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                    <Text size="base" color="primary" weight="normal">
                      <span className="font-bold text-[#43a047]">Acelerar o desenvolvimento</span> das aplicações
                    </Text>
                  </li>
                  
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                    <Text size="base" color="primary" weight="normal">
                      <span className="font-bold text-[#43a047]">Melhorar a qualidade</span> dos jogos e funcionalidades
                    </Text>
                  </li>
                  
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                    <Text size="base" color="primary" weight="normal">
                      <span className="font-bold text-[#43a047]">Investir em recursos</span> para acessibilidade
                    </Text>
                  </li>
                  
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                    <Text size="base" color="primary" weight="normal">
                      <span className="font-bold text-[#43a047]">Apoiar mais famílias</span> e profissionais
                    </Text>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/images/logos/falaatipica-logo.png"
                alt="FalaAtípica Logo"
                width={400}
                height={300}
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Heading level={2} color="white">
                Juntos, Podemos Fazer a Diferença
              </Heading>
              
              <Text size="lg" color="white" weight="normal" className="max-w-2xl mx-auto">
                Cada criança que conseguir se comunicar melhor é uma <span className="font-bold text-[#fbc02d]">vitória</span>. 
                Seu apoio é <span className="font-bold text-[#fbc02d]">fundamental</span> para tornar isso possível.
              </Text>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg" 
                href="https://ko-fi.com/pedroreoli"
                target="_blank"
                className="bg-[#fbc02d] text-[#054776] border-[#fbc02d] hover:bg-[#f9a825] hover:border-[#f9a825]"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Apoiar Agora
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                href="/parcerias"
                className="border-2 border-white text-white hover:bg-white hover:text-[#054776]"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar Projeto
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
