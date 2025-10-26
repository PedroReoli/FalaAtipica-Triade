'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Container } from '../atoms/Container'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const AboutSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      id: 0,
      type: 'text-only',
      title: 'Quando inovação encontra propósito',
      subtitle: 'Reconhecimento Acadêmico',
      content: 'Criado por Pedro Lucas Reis, o FalaAtípica nasceu como um Trabalho de Conclusão de Curso em Sistemas de Informação pelo UniFOA, conquistando nota máxima e elogios da banca por unir tecnologia assistiva, design empático e impacto social real.',
      additionalText: 'Hoje, o projeto desperta o interesse de clínicas e escolas referência em Volta Redonda, que aguardam ansiosamente seu lançamento.',
      highlight: 'Pedro Lucas Reis'
    },
    {
      id: 1,
      type: 'image-text',
      image: '/images/content/TCC-img1.png',
      imagePosition: 'left',
      title: 'Avaliação da Banca',
      content: 'Uma proposta inovadora e emocionalmente poderosa que demonstra como a tecnologia pode ser uma ferramenta de inclusão e desenvolvimento.',
      author: 'Banca Avaliadora UniFOA'
    },
    {
      id: 2,
      type: 'image-text',
      image: '/images/content/TCC-img2.png',
      imagePosition: 'right',
      title: 'Reconhecimento Científico',
      content: 'Tecnologia que une ciência, empatia e inclusão, criando soluções reais para desafios sociais complexos.',
      author: 'Prof. Dr. Especialista em TEA'
    }
  ]

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const container = containerRef.current
    const sections = scrollRef.current.children

    console.log('Configurando ScrollTrigger...')
    console.log('Container:', container)
    console.log('Sections:', sections)

    // Usar xPercent em vez de scrollLeft
        gsap.to(sections, {
          xPercent: -100 * (slides.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            end: () => `+=${container.offsetWidth * 3}`, // Buffer aumentado para 3x
            onUpdate: (self) => {
              const progress = self.progress
              const slideIndex = Math.round(progress * (slides.length - 1))
              setCurrentSlide(slideIndex)
            }
          }
        })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [])

  const goToSlide = (index: number) => {
    if (!scrollRef.current) return
    
    const sections = scrollRef.current.children
    const progress = index / (slides.length - 1)
    
    gsap.to(sections, {
      xPercent: -100 * (slides.length - 1) * progress,
      duration: 0.8,
      ease: "power2.out"
    })
    
    setCurrentSlide(index)
  }

  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-[#054776] to-[#1e88e5] min-h-screen">
      <div ref={containerRef} className="relative overflow-hidden">
        {/* Scroll Horizontal Container */}
        <div 
          ref={scrollRef}
          className="flex"
          style={{ width: `${slides.length * 100}vw` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="w-screen flex-shrink-0 flex items-center justify-center min-h-screen"
            >
              <Container maxWidth="xl">
                {slide.type === 'text-only' ? (
                  // Primeira slide - Só texto
                  <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <Heading level={2} color="white" className="mb-8">
                      {slide.title}
                    </Heading>
                    
                    
                    <div className="space-y-6">
                      <Text size="xl" color="white" weight="light" className="leading-relaxed">
                        Idealizado por <span className="text-[#fbc02d] font-semibold">Pedro Lucas Reis</span>, o <span className="text-[#fbc02d] font-semibold">FalaAtípica</span> nasceu como um{' '}
                        <span className="text-[#43a047] font-semibold">Trabalho de Conclusão de Curso</span>{' '}
                        em <span className="text-[#43a047] font-semibold">Sistemas de Informação</span> pelo <span className="text-[#43a047] font-semibold">UniFOA</span>, obtendo{' '}
                        <span className="text-[#fbc02d] font-semibold">prestígio máximo</span>{' '}
                        e reconhecimento da banca examinadora por integrar com excelência{' '}
                        <span className="text-[#1e88e5] font-semibold">tecnologia assistiva</span>,{' '}
                        <span className="text-[#43a047] font-semibold">design empático</span>{' '}
                        e <span className="text-[#43a047] font-semibold">impacto social concreto</span>.
                      </Text>
                      
                      <Text size="lg" color="white" weight="light" className="leading-relaxed">
                        O projeto tem despertado o interesse de{' '}
                        <span className="text-[#fbc02d] font-semibold">clínicas</span> e{' '}
                        <span className="text-[#fbc02d] font-semibold">instituições de ensino</span> de referência em{' '}
                        <span className="text-[#fbc02d] font-semibold">todo o estado do Rio de Janeiro</span>, que aguardam com grande expectativa seu lançamento para aplicação em contextos{' '}
                        <span className="text-[#43a047] font-semibold">educacionais</span> e{' '}
                        <span className="text-[#43a047] font-semibold">terapêuticos</span>.
                      </Text>
                      
                    </div>
                  </div>
                    ) : (
                      // Demais slides - Imagem centralizada + Texto embaixo
                      <div className="space-y-12">
                        {/* Imagem Centralizada */}
                        <div className="flex justify-center">
                          <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl">
                            <Image
                              src={slide.image!}
                              alt={`Reconhecimento ${index + 1}`}
                              width={2000}
                              height={1200}
                              className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        </div>
                        
                        {/* Texto Embaixo */}
                        <div className="max-w-4xl mx-auto">
                          <div className="bg-white/10 backdrop-blur-sm border-3 border-white/30 rounded-3xl p-12 shadow-lg">
                            <blockquote className="text-2xl font-medium text-white italic leading-relaxed mb-8 text-center">
                              "{slide.content}"
                            </blockquote>
                            
                            <div className="flex items-center justify-center">
                              <Text size="xl" color="white" weight="medium">
                                — {slide.author}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                )}
              </Container>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-[#fbc02d] scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Navegação Manual */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <button
            onClick={() => goToSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
          <button
            onClick={() => goToSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  )
}