"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Pill, Plus, ArrowLeft, Search, Filter, User, Calendar } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"

interface Medication {
  id: string
  name: string
  patient: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  status: "active" | "discontinued" | "completed"
  notes?: string
}

export const MedicationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Dados mockados
  const medications: Medication[] = [
    {
      id: "1",
      name: "Fluoxetina",
      patient: "João Silva",
      dosage: "20mg",
      frequency: "1x ao dia",
      startDate: "2024-01-01",
      status: "active",
      notes: "Tomar pela manhã",
    },
    {
      id: "2",
      name: "Sertralina",
      patient: "Maria Santos",
      dosage: "50mg",
      frequency: "1x ao dia",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "completed",
      notes: "Tratamento concluído com sucesso",
    },
    {
      id: "3",
      name: "Bupropiona",
      patient: "Pedro Costa",
      dosage: "150mg",
      frequency: "2x ao dia",
      startDate: "2024-01-10",
      status: "active",
      notes: "Tomar 8h e 20h",
    },
    {
      id: "4",
      name: "Venlafaxina",
      patient: "Ana Oliveira",
      dosage: "75mg",
      frequency: "1x ao dia",
      startDate: "2024-01-20",
      status: "discontinued",
      notes: "Suspenso devido a efeitos colaterais",
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "discontinued":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "completed":
        return "Concluído"
      case "discontinued":
        return "Suspenso"
      default:
        return "Desconhecido"
    }
  }

  const filteredMedications = medications.filter((medication) => {
    const matchesSearch = medication.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medication.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || medication.status === filterStatus
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
                  Medicações
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gerencie as prescrições e medicações dos seus pacientes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/medications/new")}
                className="flex items-center space-x-2 p-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: roleColor.primary }}
              >
                <Plus size={18} />
                <span>Nova Prescrição</span>
              </button>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: roleColor.primary }}
              >
                <Pill size={20} className="text-white" />
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
                    placeholder="Buscar medicações..."
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
                  <option value="active">Ativos</option>
                  <option value="completed">Concluídos</option>
                  <option value="discontinued">Suspensos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Medicações */}
        <div className="space-y-4">
          {filteredMedications.map((medication) => (
            <div key={medication.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Pill size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                      {medication.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{medication.patient}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-medium" style={{ color: roleColor.primary }}>
                          {medication.dosage}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{medication.frequency}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-xs text-gray-500">
                          Início: {medication.startDate}
                        </span>
                      </div>
                      {medication.endDate && (
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Fim: {medication.endDate}
                          </span>
                        </div>
                      )}
                    </div>
                    {medication.notes && (
                      <p className="text-xs text-gray-500 mt-1 italic">{medication.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(medication.status)}`}>
                    {getStatusText(medication.status)}
                  </span>
                  <button
                    onClick={() => navigate(`/medications/${medication.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Editar medicação"
                  >
                    <Pill size={18} style={{ color: roleColor.primary }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMedications.length === 0 && (
          <div className="text-center py-12">
            <Pill size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma medicação encontrada</h3>
            <p className="text-sm text-gray-500">Tente ajustar os filtros ou criar uma nova prescrição</p>
          </div>
        )}
      </div>
    </div>
  )
}

