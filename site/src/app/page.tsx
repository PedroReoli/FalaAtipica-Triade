'use client'

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Users, 
  Stethoscope, 
  BarChart3, 
  Smartphone, 
  Monitor, 
  Zap, 
  Palette,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Target,
  Heart,
  Shield,
  Lightbulb,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Github
} from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="h-screen bg-[#054776] flex items-start pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
            {/* Conteúdo à esquerda */}
            <div className="text-white">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Dando voz a quem ainda não pode falar
              </h1>
              
              <p className="text-lg lg:text-xl xl:text-2xl mb-6 text-gray-200 leading-relaxed font-light">
                Sistema completo de auxílio para crianças com atraso de fala através de 
                tecnologia educativa e gamificação
              </p>
              
              <div className="flex gap-4">
                <Link
                  href="/apresentacao"
                  className="group bg-[#1e88e5] text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-[#43a047] transition-all duration-300 shadow-2xl flex items-center gap-3"
                >
                  Ver Apresentação Completa
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Imagem à direita */}
            <div className="relative h-full flex items-center justify-center">
              {/* Logo atrás da imagem */}
              <div className="absolute inset-0 flex items-center justify-center">
        <Image
                  src="/images/falaatipica-logo.png"
                  alt="FalaAtípica"
                  width={300}
                  height={300}
                  className="opacity-10"
                />
              </div>
              
              {/* Imagem principal */}
              <div className="relative z-10">
                <div className="w-full h-80 lg:h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-20 h-20 text-[#054776] mx-auto mb-4" />
                    <p className="text-[#054776] text-lg font-semibold">Imagem Hero Placeholder</p>
                    <p className="text-gray-500">Sistema FalaAtípica em ação</p>
                  </div>
                </div>
              </div>
              
              {/* Shapes decorativos */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1e88e5] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#43a047] rounded-full opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção O Problema */}
      <section id="sobre" className="h-screen bg-white flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#054776] mb-4">
              O Problema
            </h2>
            <p className="text-lg lg:text-xl text-[#3c3c3c] max-w-3xl mx-auto">
              Milhares de crianças enfrentam desafios no desenvolvimento da fala
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white border-3 border-[#e53935] rounded-xl p-5 shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-[#e53935]/10 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#e53935]" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-[#e53935]">1 em 31</div>
              <p className="text-sm lg:text-base font-medium text-[#3c3c3c]">crianças está no espectro autista</p>
            </div>
            
            <div className="bg-white border-3 border-[#f44336] rounded-xl p-5 shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-[#f44336]/10 rounded-lg flex items-center justify-center mb-3">
                <Target className="w-5 h-5 text-[#f44336]" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-[#f44336]">25-35%</div>
              <p className="text-sm lg:text-base font-medium text-[#3c3c3c]">não desenvolvem fala funcional</p>
            </div>
            
            <div className="bg-white border-3 border-[#43a047] rounded-xl p-5 shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-[#43a047]/10 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="w-5 h-5 text-[#43a047]" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold mb-2 text-[#43a047]">47%</div>
              <p className="text-sm lg:text-base font-medium text-[#3c3c3c]">alcançam fala funcional com estímulo certo</p>
            </div>
          </div>
          
          {/* Quote */}
          <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-xl p-6 shadow-xl">
            <blockquote className="text-xl lg:text-2xl text-white italic font-light text-center leading-relaxed">
              &ldquo;E se a tecnologia pudesse ajudar a dar voz a essas crianças?&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Seção Nossa Solução */}
      <section id="apps" className="h-screen bg-[#054776] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Nossa Solução
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* FalaAtípica KIDS */}
            <div className="bg-white border-3 border-[#1e88e5] rounded-2xl p-8 shadow-2xl text-center transition-all duration-300">
              <div className="w-full h-40 bg-[#1e88e5]/5 rounded-xl mb-6 flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-[#1e88e5]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1e88e5] mb-6">FalaAtípica KIDS</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#1e88e5] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Crianças (3-12 anos)</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#43a047] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Jogos educativos</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#fbc02d] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Estimular desenvolvimento</span>
                </div>
              </div>
            </div>

            {/* FalaAtípica TUTORS */}
            <div className="bg-white border-3 border-[#43a047] rounded-2xl p-8 shadow-2xl text-center transition-all duration-300">
              <div className="w-full h-40 bg-[#43a047]/5 rounded-xl mb-6 flex items-center justify-center">
                <Users className="w-16 h-16 text-[#43a047]" />
              </div>
              <h3 className="text-2xl font-bold text-[#43a047] mb-6">FalaAtípica TUTORS</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#1e88e5] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Pais/Responsáveis</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#43a047] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Acompanhamento</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#fbc02d] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Monitorar progresso</span>
                </div>
              </div>
            </div>

            {/* FalaAtípica PRO */}
            <div className="bg-white border-3 border-[#fbc02d] rounded-2xl p-8 shadow-2xl text-center transition-all duration-300">
              <div className="w-full h-40 bg-[#fbc02d]/5 rounded-xl mb-6 flex items-center justify-center">
                <Monitor className="w-16 h-16 text-[#fbc02d]" />
              </div>
              <h3 className="text-2xl font-bold text-[#fbc02d] mb-6">FalaAtípica PRO</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#1e88e5] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Fonoaudiólogos</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#43a047] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Análise avançada</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#fbc02d] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#3c3c3c] text-base">Terapia especializada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section className="h-screen bg-white flex items-center justify-center overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[#054776] mb-4">
              Como Funciona
            </h2>
            <p className="text-lg lg:text-xl text-[#3c3c3c] max-w-3xl mx-auto">
              Um ecossistema integrado que conecta crianças, famílias e profissionais
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Linha conectora animada */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#1e88e5] to-[#e53935] transform -translate-y-1/2 hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Etapa 1 - Criança */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1e88e5] to-[#1976d2] rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-[#1e88e5] to-[#1976d2] rounded-full flex items-center justify-center shadow-2xl">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                </div>
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-[#1e88e5] mb-2">01</div>
                  <h3 className="text-xl font-bold text-[#054776] mb-3">Criança</h3>
                  <p className="text-[#3c3c3c] text-sm leading-relaxed">
                    Brinca e aprende através de jogos educativos interativos
                  </p>
                </motion.div>
              </motion.div>

              {/* Etapa 2 - Apps */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#43a047] to-[#388e3c] rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-[#43a047] to-[#388e3c] rounded-full flex items-center justify-center shadow-2xl">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-[#43a047] mb-2">02</div>
                  <h3 className="text-xl font-bold text-[#054776] mb-3">Apps</h3>
                  <p className="text-[#3c3c3c] text-sm leading-relaxed">
                    Sistema integrado coleta dados e monitora progresso
                  </p>
                </motion.div>
              </motion.div>

              {/* Etapa 3 - Progresso */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fbc02d] to-[#f57c00] rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-[#fbc02d] to-[#f57c00] rounded-full flex items-center justify-center shadow-2xl">
                    <BarChart3 className="w-16 h-16 text-white" />
                  </div>
                </div>
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-[#fbc02d] mb-2">03</div>
                  <h3 className="text-xl font-bold text-[#054776] mb-3">Progresso</h3>
                  <p className="text-[#3c3c3c] text-sm leading-relaxed">
                    Dados são analisados e processados com inteligência
                  </p>
                </motion.div>
              </motion.div>

              {/* Etapa 4 - Relatórios */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="relative mb-6 mx-auto w-32 h-32"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e53935] to-[#d32f2f] rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-[#e53935] to-[#d32f2f] rounded-full flex items-center justify-center shadow-2xl">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white rounded-xl p-6 shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl font-bold text-[#e53935] mb-2">04</div>
                  <h3 className="text-xl font-bold text-[#054776] mb-3">Relatórios</h3>
                  <p className="text-[#3c3c3c] text-sm leading-relaxed">
                    Família e profissionais acompanham evolução em tempo real
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Final - CTA */}
      <section className="h-screen bg-gradient-to-br from-[#054776] to-[#1e88e5] flex items-center justify-center relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#43a047] rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#fbc02d] rounded-full blur-3xl opacity-20"></div>
        
        <motion.div 
          className="max-w-5xl mx-auto px-6 text-center relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Juntos, podemos dar voz a quem ainda não pode falar
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-200 mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Um projeto de TCC dedicado a transformar vidas através da tecnologia e inovação
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <p className="text-gray-200">Aplicações Integradas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">4</div>
              <p className="text-gray-200">Jogos Educativos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-gray-200">Dedicação ao Projeto</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo e Descrição */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <Image
                  src="/images/falaatipica-logo.png"
                  alt="FalaAtípica Logo"
                  width={50}
                  height={50}
                  className="mr-3"
                />
                <h3 className="text-2xl font-bold text-[#054776]">FalaAtípica</h3>
              </div>
              <p className="text-[#3c3c3c] text-sm max-w-sm">
                Dando voz a quem ainda não pode falar
              </p>
            </div>

            {/* Contato e Redes Sociais */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <p className="text-[#3c3c3c]/70 text-xs mb-2">Contato</p>
                <a href="mailto:pedrosousa2160@gmail.com" className="w-12 h-12 border-2 border-[#1e88e5] rounded-lg flex items-center justify-center hover:bg-[#1e88e5]/10 transition-all" title="Email: pedrosousa2160@gmail.com">
                  <Mail className="w-6 h-6 text-[#1e88e5]" />
                </a>
              </div>
              
              <div className="w-px h-12 bg-gray-300"></div>
              
              <div className="flex flex-col items-center">
                <p className="text-[#3c3c3c]/70 text-xs mb-2">Redes Sociais</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com/falaatipica" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-[#e53935] rounded-lg flex items-center justify-center hover:bg-[#e53935]/10 transition-all" title="Instagram">
                    <Instagram className="w-6 h-6 text-[#e53935]" />
                  </a>
                  <a href="https://linkedin.com/company/falaatipica" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-[#1e88e5] rounded-lg flex items-center justify-center hover:bg-[#1e88e5]/10 transition-all" title="LinkedIn">
                    <Linkedin className="w-6 h-6 text-[#1e88e5]" />
                  </a>
                  <a href="https://github.com/falaatipica" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border-2 border-[#054776] rounded-lg flex items-center justify-center hover:bg-[#054776]/10 transition-all" title="Github">
                    <Github className="w-6 h-6 text-[#054776]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[#3c3c3c] text-sm">
              © 2025 FalaAtípica - Projeto de TCC. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}