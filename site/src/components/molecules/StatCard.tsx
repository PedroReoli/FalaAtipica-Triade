import React from 'react'
import { Text } from '../atoms/Text'

interface StatCardProps {
  value: string
  description: string
  color: 'blue' | 'green' | 'red' | 'yellow'
  icon?: React.ReactNode
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  description,
  color,
  icon
}) => {
  const colorStyles = {
    blue: 'border-[#1e88e5] bg-white/10 backdrop-blur-sm',
    green: 'border-[#43a047] bg-white/10 backdrop-blur-sm',
    red: 'border-[#e53935] bg-white/10 backdrop-blur-sm',
    yellow: 'border-[#fbc02d] bg-white/10 backdrop-blur-sm'
  }
  
  const textColorStyles = {
    blue: 'text-white',
    green: 'text-white',
    red: 'text-white',
    yellow: 'text-white'
  }
  
  const iconColorStyles = {
    blue: 'text-[#1e88e5]',
    green: 'text-[#43a047]',
    red: 'text-[#e53935]',
    yellow: 'text-[#fbc02d]'
  }
  
  return (
    <div className={`${colorStyles[color]} border-3 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className={`w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center`}>
            <div className={iconColorStyles[color]}>
              {icon}
            </div>
          </div>
        </div>
      )}
      <div className={`text-4xl md:text-5xl font-bold mb-2 ${textColorStyles[color]} text-center`}>
        {value}
      </div>
      <Text size="base" weight="medium" color="white" className="text-center">
        {description}
      </Text>
    </div>
  )
}

