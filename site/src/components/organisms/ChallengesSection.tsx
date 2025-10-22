import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { StatCard } from '../molecules/StatCard'
import { AlertCircle, TrendingUp, Users, Target } from 'lucide-react'

export const ChallengesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Desafios e Oportunidades
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O FalaAtípica nasce em um contexto urgente e promissor
            </Text>
          </div>
          
          {/* Dados que Revelam o Desafio */}
          <div className="space-y-6">
            <Heading level={3} color="primary" className="text-center">
              Desafios
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                value="2M+"
                description="Crianças no Brasil dentro do TEA"
                color="red"
                icon={<Users className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="60%"
                description="Déficit de fonoaudiólogos especializados"
                color="red"
                icon={<AlertCircle className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="70%"
                description="Famílias sem acesso a ferramentas digitais"
                color="red"
                icon={<Target className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="Maioria"
                description="Escolas públicas sem recursos adaptados"
                color="red"
                icon={<AlertCircle className="w-6 h-6 text-[#e53935]" />}
              />
            </div>
          </div>
          
          {/* Dados que Inspiram Esperança */}
          <div className="space-y-6">
            <Heading level={3} color="secondary" className="text-center">
              Oportunidades
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                value="45%"
                description="Progresso na fala em 6 meses com estímulo"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="80%"
                description="Engajamento com tecnologias assistivas"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="Redução"
                description="Significativa do tempo de intervenção"
                color="green"
                icon={<Target className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="Referência"
                description="Brasil em inclusão digital na educação especial"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}


import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { StatCard } from '../molecules/StatCard'
import { AlertCircle, TrendingUp, Users, Target } from 'lucide-react'

export const ChallengesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Desafios e Oportunidades
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O FalaAtípica nasce em um contexto urgente e promissor
            </Text>
          </div>
          
          {/* Dados que Revelam o Desafio */}
          <div className="space-y-6">
            <Heading level={3} color="primary" className="text-center">
              Desafios
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                value="2M+"
                description="Crianças no Brasil dentro do TEA"
                color="red"
                icon={<Users className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="60%"
                description="Déficit de fonoaudiólogos especializados"
                color="red"
                icon={<AlertCircle className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="70%"
                description="Famílias sem acesso a ferramentas digitais"
                color="red"
                icon={<Target className="w-6 h-6 text-[#e53935]" />}
              />
              
              <StatCard
                value="Maioria"
                description="Escolas públicas sem recursos adaptados"
                color="red"
                icon={<AlertCircle className="w-6 h-6 text-[#e53935]" />}
              />
            </div>
          </div>
          
          {/* Dados que Inspiram Esperança */}
          <div className="space-y-6">
            <Heading level={3} color="secondary" className="text-center">
              Oportunidades
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                value="45%"
                description="Progresso na fala em 6 meses com estímulo"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="80%"
                description="Engajamento com tecnologias assistivas"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="Redução"
                description="Significativa do tempo de intervenção"
                color="green"
                icon={<Target className="w-6 h-6 text-[#43a047]" />}
              />
              
              <StatCard
                value="Referência"
                description="Brasil em inclusão digital na educação especial"
                color="green"
                icon={<TrendingUp className="w-6 h-6 text-[#43a047]" />}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

