import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Award, Brain, Trophy, MessageCircle, Rocket } from 'lucide-react'

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="w-10 h-10 text-[#fbc02d]" />,
      title: 'Aprovado com excelência',
      description: 'Na banca do UniFOA'
    },
    {
      icon: <Brain className="w-10 h-10 text-[#1e88e5]" />,
      title: 'Reconhecido pela inovação social',
      description: 'No campo da tecnologia assistiva'
    },
    {
      icon: <Trophy className="w-10 h-10 text-[#43a047]" />,
      title: 'Apresentado como case de inclusão',
      description: 'No ambiente acadêmico'
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-[#e53935]" />,
      title: 'Em negociação com parceiros',
      description: 'Clínicas e escolas do Estado do Rio de Janeiro'
    },
    {
      icon: <Rocket className="w-10 h-10 text-[#1e88e5]" />,
      title: 'Expansão planejada',
      description: 'Para todo o território nacional em 2026'
    }
  ]
  
  return (
    <section className="py-20 bg-white">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Conquistas e Reconhecimento
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              Um projeto que conquistou reconhecimento e está pronto para transformar vidas
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  {achievement.icon}
                </div>
                
                <h4 className="text-base font-bold text-[#054776] mb-2">
                  {achievement.title}
                </h4>
                
                <Text size="sm" color="gray" className="leading-relaxed">
                  {achievement.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Award, Brain, Trophy, MessageCircle, Rocket } from 'lucide-react'

export const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      icon: <Award className="w-10 h-10 text-[#fbc02d]" />,
      title: 'Aprovado com excelência',
      description: 'Na banca do UniFOA'
    },
    {
      icon: <Brain className="w-10 h-10 text-[#1e88e5]" />,
      title: 'Reconhecido pela inovação social',
      description: 'No campo da tecnologia assistiva'
    },
    {
      icon: <Trophy className="w-10 h-10 text-[#43a047]" />,
      title: 'Apresentado como case de inclusão',
      description: 'No ambiente acadêmico'
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-[#e53935]" />,
      title: 'Em negociação com parceiros',
      description: 'Clínicas e escolas do Estado do Rio de Janeiro'
    },
    {
      icon: <Rocket className="w-10 h-10 text-[#1e88e5]" />,
      title: 'Expansão planejada',
      description: 'Para todo o território nacional em 2026'
    }
  ]
  
  return (
    <section className="py-20 bg-white">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Conquistas e Reconhecimento
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              Um projeto que conquistou reconhecimento e está pronto para transformar vidas
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  {achievement.icon}
                </div>
                
                <h4 className="text-base font-bold text-[#054776] mb-2">
                  {achievement.title}
                </h4>
                
                <Text size="sm" color="gray" className="leading-relaxed">
                  {achievement.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

