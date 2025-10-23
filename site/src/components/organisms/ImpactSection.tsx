import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Heart } from 'lucide-react'

export const ImpactSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
      <Container maxWidth="lg">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Heading level={2} color="white">
              Impacto Social e Educacional
            </Heading>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              <Text size="xl" color="white" weight="normal" className="leading-relaxed">
                O FalaAtípica representa uma resposta concreta à exclusão comunicacional. 
                Cada tela, som e interação foi desenhada para proporcionar autonomia, empatia 
                e desenvolvimento. A aplicação une profissionais, tutores e crianças em uma rede 
                colaborativa que transforma a fala em aprendizado e o aprendizado em inclusão.
              </Text>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
                <blockquote className="space-y-4">
                  <Text size="xl" color="white" weight="medium" className="italic text-center leading-relaxed">
                    "Falar é muito mais do que emitir sons — é ser compreendido."
                  </Text>
                  <Text size="base" color="white" weight="light" className="text-center">
                    — Pedro Lucas Reis
                  </Text>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

