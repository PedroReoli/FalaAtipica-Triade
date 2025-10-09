"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileText, User, Calendar, Plus, ArrowLeft, Search, Filter } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"

interface Assessment {
  id: string
  patient: string
  date: string
  type: string
  status: "pending" | "completed" | "in_progress"
  score?: number
}

export const AssessmentsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Dados mockados
  const assessments: Assessment[] = [
    {
      id: "1",
      patient: "João Silva",
      date: "2024-01-15",
      type: "Avaliação Inicial",
      status: "completed",
      score: 85,
    },
    {
      id: "2",
      patient: "Maria Santos",
      date: "2024-01-20",
      type: "Avaliação de Progresso",
      status: "in_progress",
    },
    {
      id: "3",
      patient: "Pedro Costa",
      date: "2024-01-25",
      type: "Avaliação Final",
      status: "pending",
    },
    {
      id: "4",
      patient: "Ana Oliveira",
      date: "2024-01-30",
      type: "Avaliação Inicial",
      status: "completed",
      score: 92,
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída"
      case "in_progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      default:
        return "Pendente"
    }
  }

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || assessment.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} style={{ color: "var(--text-black)" }} />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-black)" }}>
                  Avaliações
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gerencie as avaliações dos seus pacientes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/assessments/new")}
                className="flex items-center space-x-2 p-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: roleColor.primary }}
              >
                <Plus size={18} />
                <span>Nova Avaliação</span>
              </button>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: roleColor.primary }}
              >
                <FileText size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendentes</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="completed">Concluídas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Avaliações */}
        <div className="space-y-4">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                      {assessment.patient}
                    </h3>
                    <p className="text-sm text-gray-600">{assessment.type}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{assessment.date}</span>
                      </div>
                      {assessment.score && (
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Pontuação:</span>
                          <span className="text-sm font-semibold" style={{ color: roleColor.primary }}>
                            {assessment.score}/100
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                    {getStatusText(assessment.status)}
                  </span>
                  <button
                    onClick={() => navigate(`/assessments/${assessment.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <FileText size={18} style={{ color: roleColor.primary }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssessments.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma avaliação encontrada</h3>
            <p className="text-sm text-gray-500">Tente ajustar os filtros ou criar uma nova avaliação</p>
          </div>
        )}
      </div>
    </div>
  )
}

