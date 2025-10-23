import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import Image from 'next/image'

interface AppCardProps {
  title: string
  audience: string
  description: string
  color: 'blue' | 'green' | 'yellow'
  icon: React.ReactNode
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  audience,
  description,
  color,
  icon
}) => {
  const colorStyles = {
    blue: 'border-[#1e88e5]',
    green: 'border-[#43a047]',
    yellow: 'border-[#fbc02d]'
  }
  
  const bgColorStyles = {
    blue: 'bg-[#1e88e5]/10',
    green: 'bg-[#43a047]/10',
    yellow: 'bg-[#fbc02d]/10'
  }
  
  const textColorStyles = {
    blue: 'text-[#1e88e5]',
    green: 'text-[#43a047]',
    yellow: 'text-[#fbc02d]'
  }
  
  return (
    <div className={`bg-white ${colorStyles[color]} border-3 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center space-x-3 mb-4">
        <Image
          src="/images/logos/falaatipica-logo.png"
          alt="FalaAtípica"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <Heading level={4} className={`${textColorStyles[color]} text-lg`}>
          {title}
        </Heading>
      </div>
      
      <div className="space-y-2">
        <Text size="sm" weight="medium" color="gray">
          Público: {audience}
        </Text>
        <Text size="sm" weight="normal" color="gray">
          {description}
        </Text>
      </div>
    </div>
  )
}

