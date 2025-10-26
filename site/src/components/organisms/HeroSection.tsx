'use client'

import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Model3DViewer } from '../molecules/Model3DViewer'
import { AnimatedSection } from '../atoms/AnimatedSection'

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-white flex items-center py-20">
      <Container maxWidth="xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto à esquerda */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-8">
              <div className="space-y-4">
                <Heading level={1} color="primary" className="leading-tight">
                  E se a tecnologia pudesse ser a ponte para quem ainda não consegue se comunicar?
                </Heading>
                
                <Text size="lg" color="dark" weight="light" className="leading-relaxed">
                  Inspirado por essa reflexão, surgiu o <span className="text-[#054776] font-semibold">FalaAtípica</span> — uma solução tecnológica voltada a <span className="text-[#43a047] font-semibold">crianças com atraso de fala</span>, promovendo a <span className="text-[#1e88e5] font-semibold">expressão verbal</span> de forma <span className="text-[#fbc02d] font-semibold">lúdica, acessível e afetiva</span>.
                </Text>
              </div>
              
            </div>
          </AnimatedSection>
          
          {/* Modelo 3D à direita */}
          <AnimatedSection delay={0.4}>
            <div className="h-[400px] lg:h-[500px]">
              <Model3DViewer />
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}

