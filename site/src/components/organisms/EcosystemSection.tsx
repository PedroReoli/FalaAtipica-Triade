import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { AppCard } from '../molecules/AppCard'
import { Button } from '../atoms/Button'
import Image from 'next/image'
import { Smartphone, Users, Stethoscope, BarChart3 } from 'lucide-react'

export const EcosystemSection: React.FC = () => {
  return (
        <section className="py-20 bg-[#f4f6ff]">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <Heading level={2} color="primary">
              Ecossistema FalaAtípica
            </Heading>
            
            <Heading level={3} color="primary" className="text-2xl font-semibold">
              Três Aplicações, Um Propósito
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto leading-relaxed">
              Três aplicações integradas, cada uma desenvolvida especificamente para seu público-alvo, 
              mas todas conectadas pelo mesmo propósito: dar voz a quem ainda não pode falar.
            </Text>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1"></div>
            <div className="md:col-span-2">
              <div className="bg-white border-3 border-[#e53935] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                {/* Tag EM PLANEJAMENTO */}
                <div className="absolute -top-2 -right-2">
                  <span className="bg-[#fbc02d] text-[#054776] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    EM PLANEJAMENTO
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/images/logos/falaatipica-logo.png"
                    alt="FalaAtípica"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <Heading level={4} className="text-[#e53935] text-lg">
                    INSTITUTION
                  </Heading>
                </div>
                
                <div className="space-y-2">
                  <Text size="sm" weight="medium" color="gray">
                    Público: Escolas e clínicas
                  </Text>
                  <Text size="sm" weight="normal" color="gray">
                    Gestão de grupos, relatórios e progresso coletivo.
                  </Text>
                </div>
              </div>
            </div>
            <div className="md:col-span-1"></div>
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" href="/aplicacoes">
              Conhecer Todas as Aplicações
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

