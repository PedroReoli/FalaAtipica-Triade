"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

interface DataStat {
  title: string
  value: string
  icon: LucideIcon
  color: string
  change?: string
}

interface DataSummaryProps {
  stats: DataStat[]
  color: string
}

export const DataSummary: React.FC<DataSummaryProps> = ({ stats, color }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm h-full min-h-[400px]" style={{ border: `2px solid ${color}` }}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-black)" }}>
        Resumo
      </h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: stat.color }}
              >
                <stat.icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                {stat.change && <p className="text-xs text-green-600 font-medium mt-1">{stat.change}</p>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold" style={{ color: "var(--text-black)" }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
