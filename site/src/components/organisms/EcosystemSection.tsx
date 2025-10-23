import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { AppCard } from '../molecules/AppCard'
import { Smartphone, Users, Stethoscope } from 'lucide-react'

export const EcosystemSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#f4f6ff]">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              O Ecossistema
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O sistema é formado por três aplicações conectadas, cada uma com um papel 
              fundamental no aprendizado e acompanhamento das crianças
            </Text>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AppCard
              title="KIDS"
              audience="Crianças"
              description="Jogos e sons que estimulam a fala de forma divertida."
              color="blue"
              icon={<Smartphone className="w-10 h-10 text-[#1e88e5]" />}
            />
            
            <AppCard
              title="TUTORS"
              audience="Pais e responsáveis"
              description="Acompanham o progresso da criança com relatórios simples e visuais."
              color="green"
              icon={<Users className="w-10 h-10 text-[#43a047]" />}
            />
            
            <AppCard
              title="PRO"
              audience="Profissionais"
              description="Ferramentas completas para terapeutas, escolas e clínicas."
              color="yellow"
              icon={<Stethoscope className="w-10 h-10 text-[#fbc02d]" />}
            />
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border-3 border-[#1e88e5]">
            <Text size="lg" weight="medium" color="primary" className="text-center">
              Em breve, será lançado o módulo INSTITUTION, que permitirá a gestão de grupos escolares 
              e clínicos, integrando profissionais, pais e alunos em uma mesma rede colaborativa.
            </Text>
          </div>
        </div>
      </Container>
    </section>
  )
}

