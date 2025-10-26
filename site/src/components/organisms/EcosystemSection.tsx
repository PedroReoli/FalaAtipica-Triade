import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { AppCard } from '../molecules/AppCard'
import { Button } from '../atoms/Button'
import { AnimatedSection, StaggeredAnimation } from '../atoms/AnimatedSection'
import Image from 'next/image'
import { Smartphone, Users, Stethoscope, BarChart3 } from 'lucide-react'

export const EcosystemSection: React.FC = () => {
  return (
        <section className="min-h-screen bg-[#f4f6ff] flex items-center">
      <Container maxWidth="xl">
        <div className="space-y-16">
          <AnimatedSection>
            <div className="text-center space-y-6">
              <Heading level={2} color="primary">
                Ecossistema FalaAtípica
              </Heading>
              
              <Heading level={3} color="primary" className="text-2xl font-semibold">
                Três Aplicações, Um Propósito
              </Heading>
            </div>
          </AnimatedSection>
          
          <StaggeredAnimation staggerDelay={0.2}>
            <div className="grid md:grid-cols-3 gap-12">
              <AppCard
                title="KIDS"
                audience="Crianças"
                description="Jogos interativos que associam imagens e sons, estimulando a fala e o reconhecimento."
                color="blue"
                icon={<Smartphone className="w-10 h-10 text-[#1e88e5]" />}
              />
              
              <AppCard
                title="TUTORS"
                audience="Pais e responsáveis"
                description="Relatórios e acompanhamento diário da evolução da criança."
                color="green"
                icon={<Users className="w-10 h-10 text-[#43a047]" />}
              />
              
              <AppCard
                title="PRO"
                audience="Profissionais"
                description="Ferramentas clínicas para terapeutas, escolas e instituições."
                color="yellow"
                icon={<Stethoscope className="w-10 h-10 text-[#fbc02d]" />}
              />
            </div>
          </StaggeredAnimation>
          
          <AnimatedSection delay={0.4}>
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-white border-3 border-[#e53935] rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                  {/* Tag EM BREVE */}
                  <div className="absolute -top-3 -right-3">
                    <span className="bg-[#fbc02d] text-[#054776] text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      EM BREVE
                    </span>
                  </div>
                  
                  {/* Risco diagonal no número 3 */}
                  <div className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-[#e53935] transform rotate-45"></div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <Image
                      src="/images/logos/falaatipica-logo.png"
                      alt="FalaAtípica"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <Heading level={3} className="text-[#e53935] text-xl">
                      INSTITUTION
                    </Heading>
                  </div>
                  
                  <div className="space-y-3">
                    <Text size="base" weight="medium" color="gray">
                      Público: Escolas e clínicas
                    </Text>
                    <Text size="base" weight="normal" color="gray">
                      Gestão de grupos, relatórios e progresso coletivo.
                    </Text>
                  </div>
                  
                  {/* Pop-up de aviso */}
                  <div className="mt-6 p-4 bg-[#fbc02d]/10 border border-[#fbc02d] rounded-lg">
                    <Text size="sm" weight="medium" color="primary" className="text-center">
                      Em breve: 4 aplicações completas!
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.6}>
            <div className="text-center">
              <Button variant="primary" size="lg" href="/aplicacoes">
                Conhecer Todas as Aplicações
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

