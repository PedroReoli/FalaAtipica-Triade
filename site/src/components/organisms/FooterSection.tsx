import React from 'react'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import Image from 'next/image'
import { MapPin, User, Calendar, Link as LinkIcon } from 'lucide-react'

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t-4 border-[#1e88e5]">
      <Container maxWidth="xl">
        <div className="space-y-8">
          {/* Logo e Info Principal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/falaatipica-logo.png"
                alt="FalaAtípica"
                width={60}
                height={60}
              />
              <div>
                <h3 className="text-2xl font-bold text-[#054776]">FalaAtípica</h3>
                <Text size="sm" color="gray">
                  A voz que conecta mundos
                </Text>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start space-y-2">
                <MapPin className="w-5 h-5 text-[#1e88e5]" />
                <Text size="sm" weight="semibold" color="primary">
                  Desenvolvido no UniFOA
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <User className="w-5 h-5 text-[#43a047]" />
                <Text size="sm" weight="semibold" color="primary">
                  Autor: Pedro Lucas Reis
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <Calendar className="w-5 h-5 text-[#fbc02d]" />
                <Text size="sm" weight="semibold" color="primary">
                  Apresentado em: 2025
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <LinkIcon className="w-5 h-5 text-[#e53935]" />
                <Text size="sm" weight="semibold" color="primary">
                  Versão Institucional: Em desenvolvimento
                </Text>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200 text-center">
            <Text size="sm" color="gray">
              © 2025 FalaAtípica - Projeto de TCC UniFOA. Todos os direitos reservados.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import Image from 'next/image'
import { MapPin, User, Calendar, Link as LinkIcon } from 'lucide-react'

export const FooterSection: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t-4 border-[#1e88e5]">
      <Container maxWidth="xl">
        <div className="space-y-8">
          {/* Logo e Info Principal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/falaatipica-logo.png"
                alt="FalaAtípica"
                width={60}
                height={60}
              />
              <div>
                <h3 className="text-2xl font-bold text-[#054776]">FalaAtípica</h3>
                <Text size="sm" color="gray">
                  A voz que conecta mundos
                </Text>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start space-y-2">
                <MapPin className="w-5 h-5 text-[#1e88e5]" />
                <Text size="sm" weight="semibold" color="primary">
                  Desenvolvido no UniFOA
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <User className="w-5 h-5 text-[#43a047]" />
                <Text size="sm" weight="semibold" color="primary">
                  Autor: Pedro Lucas Reis
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <Calendar className="w-5 h-5 text-[#fbc02d]" />
                <Text size="sm" weight="semibold" color="primary">
                  Apresentado em: 2025
                </Text>
              </div>
              
              <div className="flex flex-col items-center md:items-start space-y-2">
                <LinkIcon className="w-5 h-5 text-[#e53935]" />
                <Text size="sm" weight="semibold" color="primary">
                  Versão Institucional: Em desenvolvimento
                </Text>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200 text-center">
            <Text size="sm" color="gray">
              © 2025 FalaAtípica - Projeto de TCC UniFOA. Todos os direitos reservados.
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

