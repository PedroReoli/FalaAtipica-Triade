// Aplicacoes Page
import React from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Smartphone, Users, Stethoscope, Gamepad2, BarChart3, Heart, Star, Shield } from 'lucide-react'

export default function AplicacoesPage() {
  const apps = [
    {
      id: 'kids',
      title: 'KIDS',
      subtitle: 'Para as Crianças',
      description: 'Jogos interativos que associam imagens e sons, estimulando a fala e o reconhecimento.',
      icon: <Smartphone className="w-12 h-12 text-[#1e88e5]" />,
      color: 'blue',
      features: [
        'Jogos educativos adaptados por idade',
        'Feedback positivo e motivador',
        'Interface intuitiva para crianças',
        'Sistema de conquistas e recompensas',
        'Acompanhamento de progresso'
      ],
      audience: 'Crianças de 3 a 12 anos',
      status: 'Em desenvolvimento'
    },
    {
      id: 'tutors',
      title: 'TUTORS',
      subtitle: 'Para Pais e Responsáveis',
      description: 'Relatórios e acompanhamento diário da evolução da criança.',
      icon: <Users className="w-12 h-12 text-[#43a047]" />,
      color: 'green',
      features: [
        'Relatórios visuais de progresso',
        'Dicas para estimulação em casa',
        'Comunicação com profissionais',
        'Histórico de conquistas',
        'Alertas e lembretes'
      ],
      audience: 'Pais e responsáveis',
      status: 'Em desenvolvimento'
    },
    {
      id: 'pro',
      title: 'PRO',
      subtitle: 'Para Profissionais',
      description: 'Ferramentas clínicas para terapeutas, escolas e instituições.',
      icon: <Stethoscope className="w-12 h-12 text-[#fbc02d]" />,
      color: 'yellow',
      features: [
        'Gestão completa de pacientes',
        'Relatórios clínicos detalhados',
        'Agenda e sessões',
        'Análise de progresso',
        'Comunicação com famílias'
      ],
      audience: 'Fonoaudiólogos, psicólogos, pedagogos',
      status: '95% completo'
    },
    {
      id: 'institution',
      title: 'INSTITUTION',
      subtitle: 'Para Instituições',
      description: 'Gestão de grupos escolares e clínicos, relatórios coletivos e progresso institucional.',
      icon: <BarChart3 className="w-12 h-12 text-[#e53935]" />,
      color: 'red',
      features: [
        'Gestão de múltiplos grupos',
        'Relatórios institucionais',
        'Dashboard de impacto',
        'Integração com sistemas existentes',
        'Análise de dados coletivos'
      ],
      audience: 'Escolas, clínicas, instituições',
      status: 'Em planejamento'
    }
  ]

  const getColorStyles = (color: string) => {
    const styles = {
      blue: {
        border: 'border-[#1e88e5]',
        bg: 'bg-[#1e88e5]/5',
        text: 'text-[#1e88e5]',
        button: 'bg-[#1e88e5] hover:bg-[#1565c0]'
      },
      green: {
        border: 'border-[#43a047]',
        bg: 'bg-[#43a047]/5',
        text: 'text-[#43a047]',
        button: 'bg-[#43a047] hover:bg-[#2e7d32]'
      },
      yellow: {
        border: 'border-[#fbc02d]',
        bg: 'bg-[#fbc02d]/5',
        text: 'text-[#fbc02d]',
        button: 'bg-[#fbc02d] hover:bg-[#f9a825]'
      },
      red: {
        border: 'border-[#e53935]',
        bg: 'bg-[#e53935]/5',
        text: 'text-[#e53935]',
        button: 'bg-[#e53935] hover:bg-[#d32f2f]'
      }
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={1} color="white">
              Conheça nosso ecossistema
            </Heading>
            
            <Text size="xl" color="white" weight="light" className="max-w-4xl mx-auto leading-relaxed">
              Quatro aplicações integradas, cada uma desenvolvida especificamente 
              para seu público-alvo, mas todas conectadas pelo mesmo propósito: 
              dar voz a quem ainda não pode falar.
            </Text>
          </div>
        </Container>
      </section>

      {/* Aplicações */}
      <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="space-y-16">
            {apps.map((app, index) => {
              const colorStyles = getColorStyles(app.color)
              
              return (
                <div key={app.id} className={`${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex flex-col md:flex gap-12 items-center`}>
                  {/* Conteúdo */}
                  <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 ${colorStyles.bg} rounded-xl flex items-center justify-center`}>
                          {app.icon}
                        </div>
                        <div>
                          <Heading level={2} color="primary" className="text-3xl">
                            {app.title}
                          </Heading>
                          <Text size="lg" weight="medium" color="gray">
                            {app.subtitle}
                          </Text>
                        </div>
                      </div>
                      
                      <Text size="lg" color="gray" className="leading-relaxed">
                        {app.description}
                      </Text>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Heading level={4} color="primary" className="mb-3">
                          Público-Alvo
                        </Heading>
                        <Text size="base" color="gray">
                          {app.audience}
                        </Text>
                      </div>
                      
                      <div>
                        <Heading level={4} color="primary" className="mb-3">
                          Status
                        </Heading>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorStyles.text} bg-white/50`}>
                          {app.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Heading level={4} color="primary" className="mb-3">
                        Principais Funcionalidades
                      </Heading>
                      <ul className="space-y-2">
                        {app.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 ${colorStyles.text.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`}></div>
                            <Text size="base" color="gray">
                              {feature}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        variant="primary" 
                        size="lg"
                        className={colorStyles.button}
                        href={app.status === 'Em planejamento' ? '/parcerias' : '/parcerias'}
                      >
                        {app.status === 'Em planejamento' ? 'Interesse em Parceria' : 'Solicitar Acesso'}
                      </Button>
                      <Button variant="outline" size="lg">
                        Saiba Mais
                      </Button>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className={`${colorStyles.border} border-3 rounded-2xl p-8 shadow-xl bg-white`}>
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className={`w-24 h-24 ${colorStyles.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                            {app.icon}
                          </div>
                          <Heading level={3} color="primary">
                            {app.title}
                          </Heading>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Text size="sm" weight="medium" color="gray">
                              Desenvolvimento
                            </Text>
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colorStyles.bg.replace('/5', '')} rounded-full transition-all duration-1000`}
                                style={{ 
                                  width: app.status === '95% completo' ? '95%' : 
                                         app.status === 'Em desenvolvimento' ? '60%' : 
                                         app.status === 'Em planejamento' ? '10%' : '0%'
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <Text size="sm" weight="semibold" color="primary">
                                Público
                              </Text>
                              <Text size="sm" color="gray">
                                {app.audience.split(',')[0]}
                              </Text>
                            </div>
                            <div>
                              <Text size="sm" weight="semibold" color="primary">
                                Status
                              </Text>
                              <Text size="sm" color="gray">
                                {app.status}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>


      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={2} color="white">
              Pronto para fazer parte?
            </Heading>
            
            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto leading-relaxed">
              Seja como instituição parceira, profissional interessado ou família 
              que busca apoio, temos uma solução para você.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/parcerias">
                Fazer Parceria
              </Button>
              <Button variant="outline" size="lg" href="/sobre">
                Conhecer Mais
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
