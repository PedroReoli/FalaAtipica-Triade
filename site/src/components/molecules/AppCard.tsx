import React from 'react'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'

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
    <div className={`bg-white ${colorStyles[color]} border-3 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
      <div className={`${bgColorStyles[color]} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
        {icon}
      </div>
      
      <Heading level={3} className={`${textColorStyles[color]} mb-4 text-center`}>
        {title}
      </Heading>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <div className={`w-2 h-2 rounded-full ${bgColorStyles[color]} mt-2 mr-3`}></div>
          <Text size="base" weight="medium">
            Público: {audience}
          </Text>
        </div>
        <div className="flex items-start">
          <div className={`w-2 h-2 rounded-full ${bgColorStyles[color]} mt-2 mr-3`}></div>
          <Text size="base" weight="normal">
            {description}
          </Text>
        </div>
      </div>
    </div>
  )
}

