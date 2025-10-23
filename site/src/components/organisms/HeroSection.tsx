'use client'

import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Model3DViewer } from '../molecules/Model3DViewer'

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex items-center py-20">
      <Container maxWidth="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto à esquerda */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Heading level={1} color="primary" className="leading-tight">
                E se a tecnologia pudesse dar voz a quem ainda não consegue se expressar?
              </Heading>
              
              <Text size="lg" color="dark" weight="light" className="leading-relaxed">
                Essa pergunta inspirou o nascimento do FalaAtípica, um ecossistema de aplicativos 
                criado para ajudar crianças com atraso de fala a se comunicarem de forma lúdica, 
                acessível e acolhedora.
              </Text>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/apresentacao">
                Ver Apresentação
              </Button>
              <Button variant="secondary" size="lg" href="#sobre">
                Conhecer Mais
              </Button>
            </div>
          </div>
          
          {/* Modelo 3D à direita */}
          <div className="h-[400px] lg:h-[500px]">
            <Model3DViewer />
          </div>
        </div>
      </Container>
    </section>
  )
}

