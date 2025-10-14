import Navbar from '@/components/Navbar'
import PuzzleSection from '@/components/PuzzleShapes'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      <Navbar />
      
      {/* Hero Section */}
      <PuzzleSection className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
        <Image
              src="/images/falaatipica-logo-letras.png"
              alt="FalaAtípica"
              width={400}
              height={120}
              className="mx-auto mb-8"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#054776] mb-6">
            Dando voz a quem ainda não pode falar
          </h1>
          
          <p className="text-xl md:text-2xl text-[#3c3c3c] mb-8 max-w-4xl mx-auto">
            Sistema completo de auxílio para crianças com atraso de fala através de 
            tecnologia educativa e gamificação
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apresentacao"
              className="bg-[#1e88e5] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#054776] transition-colors duration-200"
            >
              Ver Apresentação Completa
            </Link>
            <Link
              href="#apps"
              className="border-2 border-[#1e88e5] text-[#1e88e5] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1e88e5] hover:text-white transition-colors duration-200"
            >
              Conhecer Apps
            </Link>
          </div>
        </div>
      </PuzzleSection>

      {/* Seção O Problema */}
      <section id="sobre" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#054776] mb-12">
            O Problema
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-[#f4f6ff] rounded-lg">
              <div className="text-4xl font-bold text-[#e53935] mb-2">1 em 31</div>
              <p className="text-[#3c3c3c]">crianças está no espectro autista</p>
            </div>
            
            <div className="text-center p-6 bg-[#f4f6ff] rounded-lg">
              <div className="text-4xl font-bold text-[#e53935] mb-2">25-35%</div>
              <p className="text-[#3c3c3c]">não desenvolvem fala funcional</p>
            </div>
            
            <div className="text-center p-6 bg-[#f4f6ff] rounded-lg">
              <div className="text-4xl font-bold text-[#43a047] mb-2">47%</div>
              <p className="text-[#3c3c3c]">alcançam fala funcional com estímulo certo</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-2xl text-[#3c3c3c] italic">
              &ldquo;E se a tecnologia pudesse ajudar a dar voz a essas crianças?&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Seção Nossa Solução */}
      <section id="apps" className="py-20 px-4 bg-[#f4f6ff]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#054776] mb-12">
            Nossa Solução
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* FalaAtípica KIDS */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#1e88e5] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">K</span>
              </div>
              <h3 className="text-2xl font-bold text-[#054776] mb-4">FalaAtípica KIDS</h3>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Público:</strong> Crianças (3-12 anos)
              </p>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Foco:</strong> Jogos educativos
              </p>
              <p className="text-[#3c3c3c]">
                <strong>Objetivo:</strong> Estimular desenvolvimento da fala
              </p>
            </div>

            {/* FalaAtípica TUTORS */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#43a047] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-2xl font-bold text-[#054776] mb-4">FalaAtípica TUTORS</h3>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Público:</strong> Pais/Responsáveis
              </p>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Foco:</strong> Acompanhamento e relatórios
              </p>
              <p className="text-[#3c3c3c]">
                <strong>Objetivo:</strong> Monitorar progresso
              </p>
            </div>

            {/* FalaAtípica PRO */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#fbc02d] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <h3 className="text-2xl font-bold text-[#054776] mb-4">FalaAtípica PRO</h3>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Público:</strong> Fonoaudiólogos
              </p>
              <p className="text-[#3c3c3c] mb-4">
                <strong>Foco:</strong> Análise avançada
              </p>
              <p className="text-[#3c3c3c]">
                <strong>Objetivo:</strong> Terapia especializada
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#054776] mb-12">
            Como Funciona
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#1e88e5] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">👶</span>
              </div>
              <p className="text-[#3c3c3c] font-semibold">Criança</p>
            </div>
            
            <div className="text-[#1e88e5] text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#43a047] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📱</span>
              </div>
              <p className="text-[#3c3c3c] font-semibold">Apps</p>
            </div>
            
            <div className="text-[#1e88e5] text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#fbc02d] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📊</span>
              </div>
              <p className="text-[#3c3c3c] font-semibold">Progresso</p>
            </div>
            
            <div className="text-[#1e88e5] text-2xl">→</div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#e53935] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">📋</span>
              </div>
              <p className="text-[#3c3c3c] font-semibold">Relatórios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Tecnologias */}
      <section className="py-20 px-4 bg-[#f4f6ff]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#054776] mb-12">
            Tecnologias Utilizadas
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-2">⚛️</div>
              <p className="text-[#3c3c3c] font-semibold">React</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-2">📱</div>
              <p className="text-[#3c3c3c] font-semibold">React Native</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-2">🚀</div>
              <p className="text-[#3c3c3c] font-semibold">Next.js</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl mb-2">🎨</div>
              <p className="text-[#3c3c3c] font-semibold">Tailwind CSS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#054776] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <Image
              src="/images/falaatipica-logo.png"
              alt="FalaAtípica Logo"
              width={60}
              height={60}
              className="mx-auto mb-4"
            />
            <h3 className="text-2xl font-bold">FalaAtípica</h3>
          </div>
          
          <p className="text-lg mb-8">
            Dando voz a quem ainda não pode falar
          </p>
          
          <div className="flex justify-center space-x-8">
            <Link href="/" className="hover:text-[#1e88e5] transition-colors">
              Home
            </Link>
            <Link href="#sobre" className="hover:text-[#1e88e5] transition-colors">
              Sobre
            </Link>
            <Link href="#apps" className="hover:text-[#1e88e5] transition-colors">
              Apps
            </Link>
            <Link href="/apresentacao" className="hover:text-[#1e88e5] transition-colors">
              Apresentação
            </Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-[#1e88e5]">
            <p className="text-sm text-gray-300">
              © 2025 FalaAtípica. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}