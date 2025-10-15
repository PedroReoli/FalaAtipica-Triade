'use client'

import { useState, useEffect, useCallback } from 'react'
import { Brain, Users, Stethoscope, Smartphone, Monitor, Heart, Palette, Lightbulb, Target } from 'lucide-react'

export default function ApresentacaoPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const slides = [
    {
      id: 1,
      title: "Capa",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-12 px-16">
          <div className="space-y-8">
            <h1 className="text-8xl lg:text-9xl font-bold text-[#054776] mb-8">FalaAtípica</h1>
            <div className="w-32 h-2 bg-gradient-to-r from-[#1e88e5] to-[#43a047] mx-auto rounded-full"></div>
          </div>
          
          <h2 className="text-5xl lg:text-6xl text-[#3c3c3c] font-light leading-tight max-w-5xl">
            Dando voz a quem ainda não pode falar
          </h2>
          
          <p className="text-3xl lg:text-4xl text-[#3c3c3c]/70 max-w-4xl font-light">
            Sistema completo de auxílio para crianças com atraso de fala
          </p>
          
          <div className="text-2xl lg:text-3xl text-[#1e88e5] space-y-4 pt-12">
            <p className="font-semibold">Pedro Sousa</p>
            <p className="text-[#3c3c3c]/80">TCC - Tecnologia em Análise e Desenvolvimento de Sistemas</p>
            <p className="text-[#3c3c3c]/80">Orientador: [Nome do Orientador]</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Problema e Motivação",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-16 px-16">
          <div className="w-full max-w-6xl space-y-10">
            <div className="flex items-center gap-8 bg-white/90 border-l-8 border-[#e53935] p-10 rounded-2xl shadow-2xl backdrop-blur">
              <Target className="w-20 h-20 text-[#e53935] flex-shrink-0" />
              <div className="text-left">
                <div className="text-6xl lg:text-7xl font-bold text-[#e53935] mb-3">1 em 31</div>
                <p className="text-3xl text-[#3c3c3c]">crianças está no espectro autista</p>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-white/90 border-l-8 border-[#e53935] p-10 rounded-2xl shadow-2xl backdrop-blur">
              <Users className="w-20 h-20 text-[#e53935] flex-shrink-0" />
              <div className="text-left">
                <div className="text-6xl lg:text-7xl font-bold text-[#e53935] mb-3">25% a 35%</div>
                <p className="text-3xl text-[#3c3c3c]">não desenvolvem fala funcional</p>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-white/90 border-l-8 border-[#43a047] p-10 rounded-2xl shadow-2xl backdrop-blur">
              <Heart className="w-20 h-20 text-[#43a047] flex-shrink-0" />
              <div className="text-left">
                <div className="text-6xl lg:text-7xl font-bold text-[#43a047] mb-3">47%</div>
                <p className="text-3xl text-[#3c3c3c]">alcançam fala funcional com estímulo certo</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] p-12 rounded-3xl shadow-2xl max-w-5xl">
            <p className="text-4xl lg:text-5xl text-white italic font-light text-center leading-relaxed">
              &ldquo;E se a tecnologia pudesse ajudar a dar voz a essas crianças?&rdquo;
            </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Objetivo do Sistema",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-20 px-16">
          <h2 className="text-7xl lg:text-8xl font-bold text-[#054776] text-center">Objetivo do Sistema</h2>
          
          <div className="w-full max-w-6xl space-y-12">
            <div className="flex items-center gap-8 bg-gradient-to-r from-[#1e88e5] to-[#1976d2] p-12 rounded-3xl shadow-2xl">
              <Brain className="w-24 h-24 text-white flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-4xl lg:text-5xl font-bold text-white">Dar voz a quem ainda não pode falar</h3>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-gradient-to-r from-[#43a047] to-[#388e3c] p-12 rounded-3xl shadow-2xl">
              <Lightbulb className="w-24 h-24 text-white flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-4xl lg:text-5xl font-bold text-white">Ensinar por meio de sons, imagens e interação</h3>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-gradient-to-r from-[#fbc02d] to-[#f57c00] p-12 rounded-3xl shadow-2xl">
              <Users className="w-24 h-24 text-white flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-4xl lg:text-5xl font-bold text-white">Conectar crianças, tutores e profissionais</h3>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Público-alvo e Aplicações",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-20 px-16">
          <h2 className="text-7xl lg:text-8xl font-bold text-[#054776] text-center">Público-alvo e Aplicações</h2>
          
          <div className="grid grid-cols-3 gap-12 w-full max-w-7xl">
            <div className="bg-white border-4 border-[#1e88e5] rounded-3xl p-14 text-center shadow-2xl transform hover:scale-105 transition-all">
              <div className="bg-[#1e88e5]/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Smartphone className="w-20 h-20 text-[#1e88e5]" />
              </div>
              <h3 className="text-5xl font-bold text-[#1e88e5] mb-6">KIDS</h3>
              <p className="text-3xl text-[#3c3c3c] font-semibold">Aprender brincando</p>
            </div>

            <div className="bg-white border-4 border-[#43a047] rounded-3xl p-14 text-center shadow-2xl transform hover:scale-105 transition-all">
              <div className="bg-[#43a047]/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-20 h-20 text-[#43a047]" />
              </div>
              <h3 className="text-5xl font-bold text-[#43a047] mb-6">TUTORS</h3>
              <p className="text-3xl text-[#3c3c3c] font-semibold">Acompanhar e incentivar</p>
            </div>

            <div className="bg-white border-4 border-[#fbc02d] rounded-3xl p-14 text-center shadow-2xl transform hover:scale-105 transition-all">
              <div className="bg-[#fbc02d]/10 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                <Stethoscope className="w-20 h-20 text-[#fbc02d]" />
              </div>
              <h3 className="text-5xl font-bold text-[#fbc02d] mb-6">PRO</h3>
              <p className="text-3xl text-[#3c3c3c] font-semibold">Avaliar e orientar</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Arquitetura Geral",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-20 px-16">
          <h2 className="text-7xl lg:text-8xl font-bold text-[#054776] text-center">Arquitetura Geral</h2>
          
          <div className="w-full max-w-6xl space-y-12">
            <div className="bg-gradient-to-r from-[#1e88e5] to-[#1976d2] p-12 rounded-3xl shadow-2xl">
              <h3 className="text-5xl font-bold text-white text-center">Três aplicações, um ecossistema</h3>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="bg-white border-4 border-[#43a047] rounded-2xl p-10">
                <div className="flex items-center gap-6 mb-6">
                  <Monitor className="w-20 h-20 text-[#43a047]" />
                  <h4 className="text-4xl font-bold text-[#43a047]">Web (PRO)</h4>
                </div>
                <p className="text-2xl text-[#3c3c3c] mb-2">React com TypeScript</p>
                <p className="text-2xl text-[#3c3c3c]">Profissionais de saúde</p>
              </div>

              <div className="bg-white border-4 border-[#1e88e5] rounded-2xl p-10">
                <div className="flex items-center gap-6 mb-6">
                  <Smartphone className="w-20 h-20 text-[#1e88e5]" />
                  <h4 className="text-4xl font-bold text-[#1e88e5]">Mobile</h4>
                </div>
                <p className="text-2xl text-[#3c3c3c] mb-2">React Native</p>
                <p className="text-2xl text-[#3c3c3c]">KIDS e TUTORS</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#fbc02d] to-[#f57c00] p-12 rounded-3xl shadow-2xl">
              <p className="text-4xl lg:text-5xl font-bold text-white text-center leading-relaxed">
                Tudo conectado por dados e interação
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Design e Identidade Visual",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-16 px-16">
          <h2 className="text-7xl lg:text-8xl font-bold text-[#054776] text-center">Design e Identidade Visual</h2>
          
          <div className="w-full max-w-6xl space-y-12">
            <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] p-10 rounded-3xl shadow-2xl">
              <h3 className="text-5xl font-bold text-white text-center">Paleta inclusiva e acessível</h3>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="bg-white border-l-8 border-[#1e88e5] p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-[#1e88e5] rounded-2xl shadow-lg"></div>
                  <div>
                    <h4 className="text-4xl font-bold text-[#1e88e5] mb-2">Azul</h4>
                    <p className="text-2xl text-[#3c3c3c]">Confiança e calma</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-8 border-[#43a047] p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-[#43a047] rounded-2xl shadow-lg"></div>
                  <div>
                    <h4 className="text-4xl font-bold text-[#43a047] mb-2">Verde</h4>
                    <p className="text-2xl text-[#3c3c3c]">Crescimento e fala</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-8 border-[#e53935] p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-[#e53935] rounded-2xl shadow-lg"></div>
                  <div>
                    <h4 className="text-4xl font-bold text-[#e53935] mb-2">Vermelho</h4>
                    <p className="text-2xl text-[#3c3c3c]">Atenção e cuidado</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border-l-8 border-[#fbc02d] p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-[#fbc02d] rounded-2xl shadow-lg"></div>
                  <div>
                    <h4 className="text-4xl font-bold text-[#fbc02d] mb-2">Amarelo</h4>
                    <p className="text-2xl text-[#3c3c3c]">Criatividade e aprendizado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-[#054776] p-10 rounded-3xl shadow-2xl">
              <div className="flex items-center justify-center gap-6">
                <Palette className="w-16 h-16 text-[#054776]" />
                <p className="text-3xl lg:text-4xl font-bold text-[#3c3c3c] text-center">
                  Design limpo, intuitivo e humano
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Conclusão e Impacto Social",
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-20 px-16">
          <h2 className="text-7xl lg:text-8xl font-bold text-[#054776] text-center mb-8">Conclusão e Impacto Social</h2>
          
          <div className="w-full max-w-6xl space-y-12">
            <div className="bg-gradient-to-r from-[#1e88e5] to-[#1976d2] p-14 rounded-3xl shadow-2xl">
              <h3 className="text-5xl lg:text-6xl font-bold text-white text-center leading-relaxed">
                Tecnologia que dá voz a quem não fala
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-10">
              <div className="bg-white border-4 border-[#1e88e5] p-10 rounded-2xl text-center shadow-2xl">
                <Heart className="w-24 h-24 text-[#1e88e5] mx-auto mb-6" />
                <p className="text-2xl lg:text-3xl font-bold text-[#3c3c3c] leading-tight">Crianças aprendem brincando</p>
              </div>

              <div className="bg-white border-4 border-[#43a047] p-10 rounded-2xl text-center shadow-2xl">
                <Users className="w-24 h-24 text-[#43a047] mx-auto mb-6" />
                <p className="text-2xl lg:text-3xl font-bold text-[#3c3c3c] leading-tight">Famílias acompanham com esperança</p>
              </div>

              <div className="bg-white border-4 border-[#fbc02d] p-10 rounded-2xl text-center shadow-2xl">
                <Stethoscope className="w-24 h-24 text-[#fbc02d] mx-auto mb-6" />
                <p className="text-2xl lg:text-3xl font-bold text-[#3c3c3c] leading-tight">Profissionais cuidam com precisão</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#43a047] to-[#388e3c] p-14 rounded-3xl shadow-2xl">
              <p className="text-5xl lg:text-6xl font-bold text-white text-center leading-relaxed">
                Inclusão, empatia e inovação em um só sistema
              </p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }, [currentSlide, slides.length])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }, [currentSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen()
      } else if (event.key === 'Escape') {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextSlide, prevSlide, toggleFullscreen])

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#f4f6ff] flex flex-col">
      {/* Slide Container */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full h-full max-w-7xl">
          {/* Slide Content */}
          <div className="h-full flex items-center justify-center">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Footer - Indicador Discreto */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-4 bg-gradient-to-t from-black/5 to-transparent">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Contador de Slides */}
          <div className="text-[#3c3c3c]/60 text-sm font-medium">
            {currentSlide + 1} / {slides.length}
          </div>
          
          {/* Indicador de Progresso */}
          <div className="flex-1 mx-8 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#1e88e5] to-[#43a047] transition-all duration-300 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          
          {/* Dica de Navegação */}
          <div className="text-[#3c3c3c]/60 text-sm font-medium">
            Use ← → para navegar
          </div>
        </div>
      </div>
    </main>
  )
}
