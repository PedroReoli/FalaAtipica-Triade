'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Coffee } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNavLinks, setShowNavLinks] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const aboutSection = document.getElementById('sobre')
      
      if (aboutSection) {
        const aboutBottom = aboutSection.offsetTop + aboutSection.offsetHeight
        
        // Fica sólida quando começar o scroll APÓS a seção About (seção 2)
        // Considerando o buffer adicional do ScrollTrigger (3x a largura)
        const bufferAfterAbout = window.innerWidth * 3
        setIsScrolled(scrollPosition > aboutBottom + bufferAfterAbout)
        
        // Links aparecem APÓS a primeira seção (hero)
        setShowNavLinks(scrollPosition > 100)
      } else {
        // Fallback: só fica sólida após muito scroll
        setIsScrolled(scrollPosition > 2000)
        setShowNavLinks(scrollPosition > 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/sobre', label: 'Sobre' },
    { href: '/parcerias', label: 'Parcerias' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/aplicacoes', label: 'Aplicações' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white shadow-lg border-b-2 border-[#1e88e5]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logos/falaatipica-logo.png"
              alt="FalaAtípica"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#054776]' : 'text-white'
            }`}>
              FalaAtípica
            </span>
          </Link>

          {/* Desktop Navigation - Centralizado */}
          <div className={`hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
            showNavLinks ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg font-medium transition-colors duration-300 hover:text-[#1e88e5] ${
                  isScrolled ? 'text-[#3c3c3c]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botão da Direita */}
          <div className="hidden md:flex items-center">
            <a
              href="https://ko-fi.com/pedroreoli"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'bg-[#fbc02d] text-[#054776] border-[#fbc02d] hover:bg-[#f9a825]' 
                  : 'bg-[#fbc02d] text-[#054776] border-[#fbc02d] hover:bg-[#f9a825]'
              }`}
            >
              <Coffee className="w-5 h-5" />
              <span className="text-lg font-medium">Contribua para o projeto</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled ? 'text-[#3c3c3c]' : 'text-white'
            } ${showNavLinks ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* Links de Navegação */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#3c3c3c] text-lg font-medium hover:text-[#1e88e5] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Botão Mobile */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="https://ko-fi.com/pedroreoli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#fbc02d] text-[#054776] border-2 border-[#fbc02d] hover:bg-[#f9a825] transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Coffee className="w-5 h-5" />
                  <span className="text-lg font-medium">Contribua para o projeto</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
