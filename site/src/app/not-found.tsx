"use client"

import type React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Navbar } from "@/components/layout/Navbar"
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5] relative">
        <Navbar />
      </section>

      {/* Conteúdo 404 */}
      <section className="py-16 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Ícone e Número 404 */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-[#e53935] flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-[#e53935]" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-[#e53935] text-white rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg"
                >
                  404
                </motion.div>
              </div>
            </motion.div>

            {/* Título e Descrição */}
            <div className="space-y-4">
              <Heading level={1} color="primary" className="text-4xl md:text-5xl">
                Página Não Encontrada
              </Heading>
              <Text size="lg" color="gray" className="max-w-2xl mx-auto">
                Ops! A página que você está procurando não existe ou foi movida para outro endereço.
              </Text>
            </div>

            {/* Links de Navegação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-[#1e88e5] text-white rounded-lg border-2 border-[#1e88e5] hover:bg-[#1976d2] hover:border-[#1976d2] transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                <Home className="w-5 h-5" />
                Voltar para Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 px-6 py-3 bg-white text-[#1e88e5] rounded-lg border-2 border-[#1e88e5] hover:bg-[#1e88e5] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
            </motion.div>

            {/* Links Úteis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-8"
            >
              <Text size="sm" color="gray" weight="medium" className="mb-4">
                Ou explore nossas páginas principais:
              </Text>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/sobre"
                  className="px-4 py-2 bg-white border-2 border-[#1e88e5] text-[#1e88e5] rounded-lg hover:bg-[#1e88e5] hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Sobre
                </Link>
                <Link
                  href="/aplicacoes"
                  className="px-4 py-2 bg-white border-2 border-[#43a047] text-[#43a047] rounded-lg hover:bg-[#43a047] hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Aplicações
                </Link>
                <Link
                  href="/usabilidade"
                  className="px-4 py-2 bg-white border-2 border-[#fbc02d] text-[#fbc02d] rounded-lg hover:bg-[#fbc02d] hover:text-[#054776] transition-all duration-300 text-sm font-medium"
                >
                  Usabilidade
                </Link>
                <Link
                  href="/parcerias"
                  className="px-4 py-2 bg-white border-2 border-[#e53935] text-[#e53935] rounded-lg hover:bg-[#e53935] hover:text-white transition-all duration-300 text-sm font-medium"
                >
                  Parcerias
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}

