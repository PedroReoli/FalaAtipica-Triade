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
    blue: 'border-[#1e88e5] bg-[#1e88e5]/5',
    green: 'border-[#43a047] bg-[#43a047]/5',
    red: 'border-[#e53935] bg-[#e53935]/5',
    yellow: 'border-[#fbc02d] bg-[#fbc02d]/5'
  }
  
  const textColorStyles = {
    blue: 'text-[#1e88e5]',
    green: 'text-[#43a047]',
    red: 'text-[#e53935]',
    yellow: 'text-[#fbc02d]'
  }
  
  return (
    <div className={`${colorStyles[color]} border-3 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className={`w-12 h-12 rounded-lg ${colorStyles[color]} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      )}
      <div className={`text-4xl md:text-5xl font-bold mb-2 ${textColorStyles[color]} text-center`}>
        {value}
      </div>
      <Text size="base" weight="medium" className="text-center">
        {description}
      </Text>
    </div>
  )
}

