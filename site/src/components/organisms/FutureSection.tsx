import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Rocket, Building2, BarChart3, FileCheck } from 'lucide-react'

export const FutureSection: React.FC = () => {
  const nextSteps = [
    {
      icon: <Rocket className="w-8 h-8 text-[#1e88e5]" />,
      title: 'Lançamento público',
      description: 'Dos módulos KIDS, TUTORS e PRO'
    },
    {
      icon: <Building2 className="w-8 h-8 text-[#43a047]" />,
      title: 'Parcerias estratégicas',
      description: 'Com escolas inclusivas e clínicas multidisciplinares'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#fbc02d]" />,
      title: 'Versão institucional',
      description: 'Com dashboards de impacto coletivo'
    },
    {
      icon: <FileCheck className="w-8 h-8 text-[#e53935]" />,
      title: 'Registro no INPI',
      description: 'Completo da marca e do software'
    }
  ]
  
  return (
        <section className="min-h-screen bg-[#f4f6ff] flex items-center py-20">
      <Container maxWidth="xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <Heading level={2} color="primary">
              A voz é o primeiro passo para a inclusão
            </Heading>
            
            <Text size="lg" color="gray" className="max-w-3xl mx-auto">
              O FalaAtípica não nasceu apenas para ensinar palavras. Ele nasceu para reconectar 
              o mundo das crianças com o mundo das possibilidades.
            </Text>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white border-3 border-[#1e88e5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-[#1e88e5]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                
                <h4 className="text-lg font-bold text-[#054776] mb-2 text-center">
                  {step.title}
                </h4>
                
                <Text size="sm" color="gray" className="text-center leading-relaxed">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
          
          {/* CTA Final */}
          <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-2xl p-12 shadow-2xl text-center space-y-6">
            <Heading level={3} color="white">
              Acompanhar o desenvolvimento do projeto
            </Heading>
            
            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto leading-relaxed">
              Junte-se às clínicas, escolas e famílias que acreditam que toda voz merece ser ouvida.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/parcerias">
                Fazer Parceria
              </Button>
              <Button variant="outline" size="lg" href="/timeline">
                Acompanhar Novidades
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

