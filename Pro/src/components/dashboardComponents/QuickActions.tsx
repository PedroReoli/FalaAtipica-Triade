"use client"

import type React from "react"
import type { LucideIcon } from "lucide-react"

interface QuickAction {
  title: string
  description: string
  icon: LucideIcon
  color: string
  onClick: () => void
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 w-full"
            style={{ border: `2px solid ${action.color}` }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: action.color }}
              >
                <action.icon size={22} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-black)" }}>
                  {action.title}
                </h3>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
