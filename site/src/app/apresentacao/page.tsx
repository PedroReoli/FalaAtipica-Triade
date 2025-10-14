'use client'

import Navbar from '@/components/Navbar'
import PuzzleSection from '@/components/PuzzleShapes'
import { useState, useEffect, useCallback } from 'react'

export default function ApresentacaoPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Capa",
      content: (
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#054776] mb-8">FalaAtípica</h1>
          <h2 className="text-4xl text-[#3c3c3c] mb-4">Dando voz a quem ainda não pode falar</h2>
          <p className="text-2xl text-[#3c3c3c] mb-8">Sistema completo de auxílio para crianças com atraso de fala</p>
          <div className="text-xl text-[#1e88e5]">
            <p>Pedro Sousa</p>
            <p>TCC - Tecnologia em Análise e Desenvolvimento de Sistemas</p>
            <p>Orientador: [Nome do Orientador]</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Problema e Motivação",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">O Problema</h2>
          <div className="grid md:grid-cols-2 gap-8 text-2xl">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-6xl font-bold text-[#e53935] mb-4">1 em 31</div>
              <p className="text-[#3c3c3c]">crianças está no espectro autista</p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-6xl font-bold text-[#e53935] mb-4">25-35%</div>
              <p className="text-[#3c3c3c]">não desenvolvem fala funcional</p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-6xl font-bold text-[#e53935] mb-4">47%</div>
              <p className="text-[#3c3c3c]">alcançam fala funcional com estímulo certo</p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <p className="text-[#3c3c3c] italic text-xl">
                &ldquo;E se a tecnologia pudesse ajudar a dar voz a essas crianças?&rdquo;
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Objetivo do Sistema",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">Objetivo do Sistema</h2>
          <div className="space-y-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Dar voz a quem ainda não pode falar</h3>
              <p className="text-xl text-[#3c3c3c]">
                Ensinar por meio de sons, imagens e interação
              </p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">Conectar crianças, tutores e profissionais</h3>
              <p className="text-xl text-[#3c3c3c]">
                Criar uma rede de apoio integrada
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Arquitetura do Sistema",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">Arquitetura do Sistema</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-[#1e88e5] mb-4">FalaAtípica KIDS</h3>
              <p className="text-[#3c3c3c]">React Native</p>
              <p className="text-[#3c3c3c]">Crianças (3-12 anos)</p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold text-[#43a047] mb-4">FalaAtípica TUTORS</h3>
              <p className="text-[#3c3c3c]">React Native</p>
              <p className="text-[#3c3c3c]">Pais/Responsáveis</p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <div className="text-4xl mb-4">👩‍⚕️</div>
              <h3 className="text-2xl font-bold text-[#fbc02d] mb-4">FalaAtípica PRO</h3>
              <p className="text-[#3c3c3c]">React</p>
              <p className="text-[#3c3c3c]">Fonoaudiólogos</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Demonstração Kids",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">FalaAtípica KIDS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Jogos Educativos</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Adivinha</li>
                <li>• Igual-Diferente</li>
                <li>• Cena Certa</li>
                <li>• Palavras</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">Características</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Interface amigável</li>
                <li>• Gamificação</li>
                <li>• Progresso automático</li>
                <li>• Fallback offline</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Demonstração Tutors",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">FalaAtípica TUTORS</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">Funcionalidades</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Dashboard de progresso</li>
                <li>• Relatórios detalhados</li>
                <li>• Dicas e orientações</li>
                <li>• Suporte técnico</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Benefícios</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Acompanhamento em tempo real</li>
                <li>• Interface intuitiva</li>
                <li>• Dados sincronizados</li>
                <li>• Comunicação com profissionais</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Demonstração Pro",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">FalaAtípica PRO</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#fbc02d] mb-4">Recursos Avançados</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Gestão de pacientes</li>
                <li>• Sessões de terapia</li>
                <li>• Relatórios clínicos</li>
                <li>• Analytics avançado</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#e53935] mb-4">Para Profissionais</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Interface profissional</li>
                <li>• Dados detalhados</li>
                <li>• Integração com tutores</li>
                <li>• Suporte técnico especializado</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "API Local e Sincronização",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">API Local e Sincronização</h2>
          <div className="space-y-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Sistema de Fallback</h3>
              <p className="text-xl text-[#3c3c3c]">
                API online → Dados em tempo real<br/>
                API offline → Dados locais (MOCAP)
              </p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">WebSocket</h3>
              <p className="text-xl text-[#3c3c3c]">
                Sincronização em tempo real entre todos os apps
              </p>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#fbc02d] mb-4">Logs Avançados</h3>
              <p className="text-xl text-[#3c3c3c]">
                Sistema de logging com resumo em tabela
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Resultados e Métricas",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">Resultados e Métricas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">Técnicos</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• 3 aplicações funcionais</li>
                <li>• API local robusta</li>
                <li>• Sistema de fallback</li>
                <li>• Logs detalhados</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Funcionais</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• 4 jogos educativos</li>
                <li>• Relatórios automáticos</li>
                <li>• Interface responsiva</li>
                <li>• Acessibilidade</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 10,
      title: "Próximos Passos",
      content: (
        <div className="text-center">
          <h2 className="text-5xl font-bold text-[#054776] mb-12">Próximos Passos</h2>
          <div className="space-y-8">
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#1e88e5] mb-4">Curto Prazo</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Testes com usuários reais</li>
                <li>• Refinamento da UX</li>
                <li>• Otimizações de performance</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#43a047] mb-4">Médio Prazo</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• Integração com Supabase</li>
                <li>• Deploy em produção</li>
                <li>• Parcerias com clínicas</li>
              </ul>
            </div>
            <div className="bg-[#f4f6ff] p-8 rounded-lg">
              <h3 className="text-3xl font-bold text-[#fbc02d] mb-4">Longo Prazo</h3>
              <ul className="text-xl text-[#3c3c3c] space-y-2">
                <li>• IA para personalização</li>
                <li>• Expansão para outros idiomas</li>
                <li>• Integração com wearables</li>
              </ul>
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

  // Navegação por teclado
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextSlide()
      } else if (event.key === 'ArrowLeft') {
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, nextSlide, prevSlide])

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      <Navbar />
      
      <PuzzleSection className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Controles de Navegação */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="bg-[#1e88e5] text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#054776] transition-colors"
            >
              ← Anterior
            </button>
            
            <div className="text-center">
              <span className="text-2xl font-bold text-[#054776]">
                {currentSlide + 1} / {slides.length}
              </span>
              <p className="text-[#3c3c3c]">{slides[currentSlide].title}</p>
            </div>
            
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-[#1e88e5] text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#054776] transition-colors"
            >
              Próximo →
            </button>
          </div>

          {/* Indicador de Progresso */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div 
              className="bg-[#1e88e5] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>

          {/* Slide Atual */}
          <div className="bg-white rounded-lg shadow-lg p-12 min-h-[600px] flex items-center justify-center">
            {slides[currentSlide].content}
          </div>

          {/* Navegação por Teclado */}
          <div className="text-center mt-8 text-[#3c3c3c]">
            <p>Use as setas ← → do teclado para navegar</p>
          </div>
        </div>
      </PuzzleSection>
    </main>
  )
}
