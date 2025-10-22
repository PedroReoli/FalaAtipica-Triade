import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Lightbulb, TrendingUp, Gamepad2, Zap, BookOpen } from 'lucide-react'

export const MethodologySection: React.FC = () => {
  const methodologies = [
    {
      icon: <Lightbulb className="w-8 h-8 text-[#1e88e5]" />,
      title: 'Design Thinking',
      description: 'Centramento no usuário (criança e tutor)'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#43a047]" />,
      title: 'Growth Hacking',
      description: 'Expansão e engajamento social'
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-[#fbc02d]" />,
      title: 'Gamificação',
      description: 'Ferramenta de estímulo e progresso'
    },
    {
      icon: <Zap className="w-8 h-8 text-[#e53935]" />,
      title: 'Metodologias Ágeis',
      description: 'Desenvolvimento contínuo e iterativo'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#1e88e5]" />,
      title: 'Base Pedagógica',
      description: 'Feedback de fonoaudiólogos e pedagogos'
    }
  ]
  
  return (
    <section className="py-20 bg-[#f4f6ff]">
      <Container maxWidth="lg">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Metodologia e Fundamentação
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O projeto se apoia em uma combinação de práticas modernas e evidências científicas
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologies.map((method, index) => (
              <div
                key={index}
                className="bg-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1e88e5]/10 rounded-lg flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#054776] mb-2">
                      {method.title}
                    </h4>
                    <Text size="sm" color="gray">
                      {method.description}
                    </Text>
                  </div>
                </div>
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
import { Lightbulb, TrendingUp, Gamepad2, Zap, BookOpen } from 'lucide-react'

export const MethodologySection: React.FC = () => {
  const methodologies = [
    {
      icon: <Lightbulb className="w-8 h-8 text-[#1e88e5]" />,
      title: 'Design Thinking',
      description: 'Centramento no usuário (criança e tutor)'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#43a047]" />,
      title: 'Growth Hacking',
      description: 'Expansão e engajamento social'
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-[#fbc02d]" />,
      title: 'Gamificação',
      description: 'Ferramenta de estímulo e progresso'
    },
    {
      icon: <Zap className="w-8 h-8 text-[#e53935]" />,
      title: 'Metodologias Ágeis',
      description: 'Desenvolvimento contínuo e iterativo'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#1e88e5]" />,
      title: 'Base Pedagógica',
      description: 'Feedback de fonoaudiólogos e pedagogos'
    }
  ]
  
  return (
    <section className="py-20 bg-[#f4f6ff]">
      <Container maxWidth="lg">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              Metodologia e Fundamentação
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O projeto se apoia em uma combinação de práticas modernas e evidências científicas
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologies.map((method, index) => (
              <div
                key={index}
                className="bg-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1e88e5]/10 rounded-lg flex items-center justify-center">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-[#054776] mb-2">
                      {method.title}
                    </h4>
                    <Text size="sm" color="gray">
                      {method.description}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

