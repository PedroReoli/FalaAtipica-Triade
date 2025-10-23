import React from 'react'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, User, Calendar, Mail, Phone, Heart, Star } from 'lucide-react'

export const FooterSection: React.FC = () => {
  const quickLinks = [
    { href: '/sobre', label: 'Sobre' },
    { href: '/parcerias', label: 'Parcerias' },
    { href: '/timeline', label: 'Timeline' },
    { href: '/aplicacoes', label: 'Aplicações' }
  ]

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, text: 'Volta Redonda, RJ' }
  ]

  return (
    <footer className="bg-gradient-to-br from-[#054776] to-[#1e88e5] text-white">
      <Container maxWidth="xl">
        <div className="py-16 space-y-12">
          {/* Conteúdo Principal */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo e Descrição */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/logos/falaatipica-logo.png"
                  alt="FalaAtípica"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="text-3xl font-bold text-white">FalaAtípica</h3>
                  <Text size="base" color="white" weight="light">
                    A voz que conecta mundos
                  </Text>
                </div>
              </div>
              
              <Text size="base" color="white" weight="light" className="leading-relaxed max-w-md">
                Sistema completo de auxílio para crianças com atraso de fala através de 
                tecnologia educativa e gamificação.
              </Text>
              
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#fbc02d]" />
                <Text size="sm" color="white" weight="medium">
                  TCC com excelência no UniFOA
                </Text>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Navegação</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Contato</h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="text-white/80">
                      {info.icon}
                    </div>
                    <Text size="sm" color="white" weight="light">
                      {info.text}
                    </Text>
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <Button variant="secondary" size="sm" href="/parcerias">
                  Fazer Parceria
                </Button>
              </div>
            </div>
          </div>

          {/* Informações do Projeto */}
          <div className="bg-white/10 rounded-2xl p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <User className="w-8 h-8 text-white mx-auto" />
                <Text size="sm" weight="semibold" color="white">
                  Autor: Pedro Lucas Reis
                </Text>
                <Text size="sm" color="white" weight="light">
                  Sistemas de Informação - UniFOA
                </Text>
              </div>
              
              <div className="space-y-2">
                <Calendar className="w-8 h-8 text-white mx-auto" />
                <Text size="sm" weight="semibold" color="white">
                  Apresentado em 2025
                </Text>
                <Text size="sm" color="white" weight="light">
                  TCC com excelência
                </Text>
              </div>
              
              <div className="space-y-2">
                <Heart className="w-8 h-8 text-white mx-auto" />
                <Text size="sm" weight="semibold" color="white">
                  Impacto Social
                </Text>
                <Text size="sm" color="white" weight="light">
                  Tecnologia assistiva inclusiva
                </Text>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-white/20 text-center">
            <Text size="sm" color="white" weight="light">
              © 2025 FalaAtípica - Projeto de TCC UniFOA. Todos os direitos reservados.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

