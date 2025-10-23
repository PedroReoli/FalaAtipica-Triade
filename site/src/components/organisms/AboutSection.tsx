import React, { useState, useEffect } from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Heart, Quote } from 'lucide-react'
import Image from 'next/image'

export const AboutSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const testimonials = [
    {
      quote: "Uma proposta inovadora e emocionalmente poderosa.",
      author: "Banca Avaliadora UniFOA"
    },
    {
      quote: "Tecnologia que une ciência, empatia e inclusão.",
      author: "Prof. Dr. Especialista em TEA"
    },
    {
      quote: "Um projeto com potencial real de impacto social.",
      author: "Coordenador de Curso"
    }
  ]

  const images = [
    {
      src: "/images/content/TCC-img1.png",
      alt: "TCC FalaAtípica - Imagem 1",
      objectPosition: "right center",
      scale: "scale-90"
    },
    {
      src: "/images/content/TCC-img2.png",
      alt: "TCC FalaAtípica - Imagem 2",
      objectPosition: "center center",
      scale: "scale-90"
    }
  ]

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section id="sobre" className="py-20 bg-[#054776]">
      <Container maxWidth="xl">
        <div className="space-y-16">
          {/* Título Principal */}
          <div className="space-y-6 text-center">
            <Heading level={2} color="white">
              Quando inovação encontra propósito
            </Heading>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <Text size="lg" color="white" weight="normal" className="leading-relaxed">
                Criado por <span className="font-bold text-[#fbc02d]">Pedro Lucas Reis</span>, o FalaAtípica nasceu como um 
                <span className="font-bold text-[#fbc02d]"> Trabalho de Conclusão de Curso</span> em Sistemas de Informação pelo UniFOA, 
                conquistando <span className="font-bold text-[#fbc02d]">nota máxima</span> e elogios da banca por 
                unir <span className="font-bold text-[#fbc02d]">tecnologia assistiva</span>, design empático e 
                <span className="font-bold text-[#fbc02d]"> impacto social real</span>.
              </Text>
              
              <Text size="lg" color="white" weight="normal" className="leading-relaxed">
                Hoje, o projeto desperta o interesse de <span className="font-bold text-[#fbc02d]">clínicas e escolas</span> 
                referência em Volta Redonda, que aguardam ansiosamente seu lançamento.
              </Text>
            </div>
          </div>
          
          {/* Layout com Depoimentos e Imagem */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Depoimentos à Esquerda */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <Heading level={3} color="white" className="mb-6">
                  Reconhecimento Acadêmico
                </Heading>
              </div>
              
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border-3 border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-[#1e88e5]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-[#1e88e5]" />
                      </div>
                      
                      <div className="flex-1">
                        <blockquote className="text-base font-medium text-white italic leading-relaxed mb-3">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <Text size="sm" color="white" weight="medium">
                          — {testimonial.author}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Imagem à Direita */}
            <div className="space-y-6">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    key={currentImageIndex}
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    width={1000}
                    height={600}
                    className={`w-full h-[600px] object-cover rounded-2xl transition-all duration-500 hover:scale-105 ${images[currentImageIndex].scale}`}
                    style={{ objectPosition: images[currentImageIndex].objectPosition }}
                  />
                  
                  {/* Indicadores */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Text size="sm" color="white" weight="light" className="italic">
                  Documentação técnica e apresentação do projeto
                </Text>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center">
            <Button variant="primary" size="lg" href="/doacao">
              Contribua para o projeto
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

