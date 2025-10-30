// Timeline Page
import React from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Calendar, Lightbulb, CheckCircle, Code, Presentation, Rocket, Star, Award } from 'lucide-react'

export default function TimelinePage() {
  const timeline = [
    {
      date: 'Junho 2024',
      title: 'A Ideia Nasce',
      description: 'Pedro Lucas Reis teve a ideia inicial do FalaAtípica durante seus estudos em Sistemas de Informação, identificando a necessidade de uma solução tecnológica para auxiliar crianças com atraso de fala.',
      icon: <Lightbulb className="w-8 h-8 text-[#fbc02d]" />,
      category: 'Concepção',
      color: 'yellow',
      status: 'completed'
    },
    {
      date: 'Agosto 2024',
      title: 'Aprovação pela Banca',
      description: 'O projeto foi aprovado pela banca avaliadora do UniFOA para seguir como Trabalho de Conclusão de Curso, recebendo elogios pela inovação e potencial de impacto social.',
      icon: <CheckCircle className="w-8 h-8 text-[#43a047]" />,
      category: 'Aprovação',
      color: 'green',
      status: 'completed'
    },
        {
          date: 'Agosto 2024 - Maio 2025',
          title: 'Desenvolvimento Intensivo (MVP)',
          description: 'Período de criação da aplicação MVP, desenvolvimento da documentação técnica e aprovação no Congresso "Tudo é Ciência", consolidando a base científica do projeto. O MVP foi concluído com sucesso.',
          icon: <Code className="w-8 h-8 text-[#1e88e5]" />,
          category: 'Desenvolvimento',
          color: 'blue',
          status: 'completed'
        },
        {
          date: 'Junho 2025',
          title: 'Apresentação na Banca - Sucesso Total',
          description: 'Apresentação do projeto para a banca avaliadora do UniFOA, conquistando nota máxima e elogios unânimes. O projeto foi aprovado com excelência, destacando-se pela inovação e potencial de impacto social.',
          icon: <Award className="w-8 h-8 text-[#43a047]" />,
          category: 'Aprovação',
          color: 'green',
          status: 'completed'
        },
        {
          date: 'Julho 2025 - Atual',
          title: 'Desenvolvimento da Versão Beta',
          description: 'Fase atual de desenvolvimento da versão beta do FalaAtípica, com foco em melhorias de UX/UI, testes com usuários reais e preparação para lançamento.',
          icon: <Rocket className="w-8 h-8 text-[#1e88e5]" />,
          category: 'Beta',
          color: 'blue',
          status: 'in-progress'
        }
  ]

  const getColorStyles = (color: string) => {
    const styles = {
      blue: 'border-[#1e88e5] bg-[#1e88e5]/5',
      green: 'border-[#43a047] bg-[#43a047]/5',
      red: 'border-[#e53935] bg-[#e53935]/5',
      yellow: 'border-[#fbc02d] bg-[#fbc02d]/5'
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  const getTextColor = (color: string) => {
    const colors = {
      blue: 'text-[#1e88e5]',
      green: 'text-[#43a047]',
      red: 'text-[#e53935]',
      yellow: 'text-[#fbc02d]'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#43a047]" />
      case 'in-progress':
        return <Rocket className="w-5 h-5 text-[#1e88e5]" />
      case 'upcoming':
        return <Calendar className="w-5 h-5 text-[#fbc02d]" />
      default:
        return <Calendar className="w-5 h-5 text-[#1e88e5]" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in-progress':
        return 'Em Andamento'
      case 'upcoming':
        return 'Próximo'
      default:
        return 'Planejado'
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={1} color="white">
              Timeline do Projeto
            </Heading>
            
            <Text size="xl" color="white" weight="light" className="max-w-4xl mx-auto leading-relaxed">
              Acompanhe a evolução do FalaAtípica desde a concepção da ideia até a transformação social
            </Text>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Heading level={2} color="primary">
                Nossa Jornada
              </Heading>
              <Text size="lg" color="gray" className="max-w-3xl mx-auto">
                Cada marco representa um passo em direção à inclusão e ao desenvolvimento da fala
              </Text>
            </div>

            <div className="relative">
              {/* Linha vertical da timeline */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#1e88e5] to-[#43a047] rounded-full"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Ponto da timeline */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white border-4 border-[#1e88e5] rounded-full flex items-center justify-center shadow-lg">
                      {item.icon}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="ml-8 flex-1">
                      <div className={`${getColorStyles(item.color)} border-3 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-[#1e88e5]" />
                            <Text size="sm" weight="semibold" color="primary">
                              {item.date}
                            </Text>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(item.status)}
                            <Text size="sm" weight="medium" color="gray">
                              {getStatusText(item.status)}
                            </Text>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTextColor(item.color)} bg-white/50`}>
                              {item.category}
                            </span>
                          </div>
                          
                          <Heading level={3} color="primary" className="text-xl">
                            {item.title}
                          </Heading>
                          
                          <Text size="base" color="gray" className="leading-relaxed">
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

          {/* Próximos Passos */}
          <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Heading level={2} color="primary">
                O que vem por aí?
              </Heading>
              <Text size="lg" color="gray" className="max-w-3xl mx-auto">
                Nossa visão para os próximos passos do projeto
              </Text>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#1e88e5] rounded-xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-8 h-8 text-[#1e88e5]" />
                    <Heading level={3} color="primary">
                      Próximos Marcos
                    </Heading>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#1e88e5] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Lançamento da versão beta
                      </Text>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#1e88e5] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Parcerias com clínicas e escolas
                      </Text>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#1e88e5] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Expansão para outras regiões
                      </Text>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#43a047] rounded-xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-8 h-8 text-[#43a047]" />
                    <Heading level={3} color="secondary">
                      Impacto Esperado
                    </Heading>
                  </div>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Milhares de crianças beneficiadas
                      </Text>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Referência em tecnologia assistiva
                      </Text>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#43a047] rounded-full mt-2 flex-shrink-0"></div>
                      <Text size="base" color="gray">
                        Transformação social real
                      </Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={2} color="white">
              Faça parte desta jornada
            </Heading>
            
            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto leading-relaxed">
              Junte-se a nós nesta missão de transformar vidas através da tecnologia e inclusão.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/parcerias">
                Fazer Parceria
              </Button>
              <Button variant="outline" size="lg" href="/parcerias">
                Fazer Parceria
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
