import React from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <Container maxWidth="lg">
        <div className="space-y-12">
          {/* Origem e Reconhecimento */}
          <div className="space-y-6 text-center">
            <Heading level={2} color="primary">
              Origem e Reconhecimento
            </Heading>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <Text size="lg" weight="normal" className="leading-relaxed">
                Desenvolvido por Pedro Lucas Reis, o projeto foi apresentado no UniFOA e aplaudido 
                pela banca avaliadora por unir inovação, inclusão e impacto social.
              </Text>
              
              <Text size="lg" weight="normal" className="leading-relaxed">
                Hoje, o FalaAtípica é aguardado por clínicas e escolas referência no Estado do Rio de Janeiro, 
                que reconhecem seu potencial transformador.
              </Text>
            </div>
          </div>
          
          {/* Metodologia e Impacto */}
          <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-2xl p-10 shadow-2xl">
            <div className="space-y-4 text-center">
              <Heading level={3} color="white">
                Metodologia e Impacto
              </Heading>
              
              <div className="space-y-3 max-w-3xl mx-auto">
                <Text size="base" color="white" weight="normal" className="leading-relaxed">
                  O projeto combina Design Thinking, Gamificação, Metodologias Ativas e Growth Hacking 
                  para gerar engajamento real e mensurável. Cada interação é um passo em direção à fala, 
                  à autonomia e à inclusão.
                </Text>
                
                <Text size="lg" color="white" weight="semibold" className="italic">
                  "Falar é muito mais do que emitir sons — é ser compreendido."
                  <br />— Pedro Lucas Reis
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

