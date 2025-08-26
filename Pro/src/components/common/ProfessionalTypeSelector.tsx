"use client"

import type React from "react"
import { useProfessional } from "../../contexts/ProfessionalContext"
import { Brain, Heart, Pill } from "lucide-react"

export const ProfessionalTypeSelector: React.FC = () => {
  const { professionalType, setProfessionalType } = useProfessional()

  const professionalTypes = [
    {
      type: "fonoaudiologo",
      label: "Fono",
      icon: Brain,
      color: "var(--green)",
    },
    {
      type: "psicologo",
      label: "Psico",
      icon: Heart,
      color: "var(--blue)",
    },
    {
      type: "psiquiatra",
      label: "Psiqui",
      icon: Pill,
      color: "var(--red)",
    },
  ]

  const currentProfessional = professionalTypes.find((p) => p.type === professionalType)

  return (
    <div className="flex items-center space-x-1">
      {professionalTypes.map((prof) => (
        <button
          key={prof.type}
          onClick={() => setProfessionalType(prof.type)}
          className={`flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
            professionalType === prof.type
              ? "text-white shadow-sm"
              : "hover:bg-gray-100"
          }`}
          style={{
            backgroundColor: professionalType === prof.type ? prof.color : "transparent",
            color: professionalType === prof.type ? "var(--text-white)" : "var(--text-black)",
          }}
        >
          <prof.icon size={12} />
          <span>{prof.label}</span>
        </button>
      ))}
    </div>
  )
}
