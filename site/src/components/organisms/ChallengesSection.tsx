import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Users, AlertTriangle, Smartphone, GraduationCap, TrendingUp, Heart, Clock, Award } from 'lucide-react'

export const ChallengesSection: React.FC = () => {
  const challenges = [
    {
      icon: <Users className="w-8 h-8 text-[#e53935]" />,
      value: "2M",
      title: "Crianças com Atraso de Fala",
      description: "2 milhões de crianças brasileiras têm algum tipo de atraso de fala",
      color: "red"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-[#e53935]" />,
      value: "30%",
      title: "Famílias Buscam Apoio",
      description: "Apenas 30% das famílias brasileiras buscam apoio profissional nos primeiros sinais",
      color: "red"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-[#e53935]" />,
      value: "25-35%",
      title: "Sem Fala Funcional",
      description: "25% a 35% das crianças com TEA no Brasil não desenvolvem fala funcional",
      color: "red"
    }
  ]

  const opportunities = [
    {
      icon: <TrendingUp className="w-8 h-8 text-[#43a047]" />,
      value: "47%",
      title: "Comunicação Funcional",
      description: "47% das crianças com atraso severo alcançam comunicação funcional com estímulos adequados",
      color: "green"
    },
    {
      icon: <Heart className="w-8 h-8 text-[#43a047]" />,
      value: "40%",
      title: "Aceleração no Progresso",
      description: "40% de aceleração no progresso usando recursos visuais e tecnológicos",
      color: "green"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#43a047]" />,
      value: "60%",
      title: "Melhora Significativa",
      description: "60% dos pais relatam melhora significativa na fala após acompanhamento contínuo",
      color: "green"
    }
  ]

  return (
    <section className="py-20 bg-[#054776]">
      <Container maxWidth="xl">
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <Heading level={2} color="white">
              Os números que nos movem
            </Heading>
            
            <Text size="lg" color="white" className="max-w-3xl mx-auto">
              O FalaAtípica nasce em um contexto urgente e promissor
            </Text>
          </div>
          
          {/* Desafios */}
          <div className="space-y-8">
            <Heading level={3} color="white" className="text-center text-2xl">
              Desafios
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="bg-white border-3 border-[#e53935] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#e53935]/10 rounded-xl flex items-center justify-center mx-auto">
                      {challenge.icon}
                    </div>
                    
                    <div className="text-4xl font-bold text-[#e53935]">
                      {challenge.value}
                    </div>
                    
                    <div className="space-y-2">
                      <Heading level={4} color="primary" className="text-lg">
                        {challenge.title}
                      </Heading>
                      
                      <Text size="sm" color="gray" className="leading-relaxed">
                        {challenge.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Oportunidades */}
          <div className="space-y-8">
            <Heading level={3} color="white" className="text-center text-2xl">
              Oportunidades
            </Heading>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity, index) => (
                <div
                  key={index}
                  className="bg-white border-3 border-[#43a047] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#43a047]/10 rounded-xl flex items-center justify-center mx-auto">
                      {opportunity.icon}
                    </div>
                    
                    <div className="text-4xl font-bold text-[#43a047]">
                      {opportunity.value}
                    </div>
                    
                    <div className="space-y-2">
                      <Heading level={4} color="secondary" className="text-lg">
                        {opportunity.title}
                      </Heading>
                      
                      <Text size="sm" color="gray" className="leading-relaxed">
                        {opportunity.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

