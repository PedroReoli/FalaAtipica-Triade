"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Plus, ArrowLeft, Search, Filter, User, Calendar, Download } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"

interface Prescription {
  id: string
  patient: string
  date: string
  medications: string[]
  status: "active" | "expired" | "cancelled"
  validUntil: string
  notes?: string
}

export const PrescriptionsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Dados mockados
  const prescriptions: Prescription[] = [
    {
      id: "1",
      patient: "João Silva",
      date: "2024-01-15",
      medications: ["Fluoxetina 20mg", "Alprazolam 0.5mg"],
      status: "active",
      validUntil: "2024-04-15",
      notes: "Renovar em 3 meses",
    },
    {
      id: "2",
      patient: "Maria Santos",
      date: "2024-01-20",
      medications: ["Sertralina 50mg"],
      status: "active",
      validUntil: "2024-04-20",
    },
    {
      id: "3",
      patient: "Pedro Costa",
      date: "2024-01-10",
      medications: ["Bupropiona 150mg", "Ritalina 10mg"],
      status: "expired",
      validUntil: "2024-02-10",
      notes: "Prescrição vencida",
    },
    {
      id: "4",
      patient: "Ana Oliveira",
      date: "2024-01-25",
      medications: ["Venlafaxina 75mg"],
      status: "cancelled",
      validUntil: "2024-04-25",
      notes: "Cancelada por efeitos colaterais",
    },
  ]


  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativa"
      case "expired":
        return "Vencida"
      case "cancelled":
        return "Cancelada"
      default:
        return "Desconhecido"
    }
  }

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || prescription.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDownload = (prescription: Prescription) => {
    console.log(`Baixando prescrição: ${prescription.id}`)
    // Lógica para download
  }

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
                  Prescrições
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Biblioteca de prescrições e receitas médicas
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/prescriptions/new")}
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
                <BookOpen size={20} className="text-white" />
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
                    placeholder="Buscar prescrições..."
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
                  <option value="active">Ativas</option>
                  <option value="expired">Vencidas</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Prescrições */}
        <div className="space-y-4">
          {filteredPrescriptions.map((prescription) => (
            <div key={prescription.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                      Prescrição #{prescription.id}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{prescription.patient}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{prescription.date}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <strong>Medicações:</strong> {prescription.medications.join(", ")}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Válida até: {prescription.validUntil}
                      </p>
                    </div>
                    {prescription.notes && (
                      <p className="text-xs text-gray-500 mt-1 italic">{prescription.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                    {getStatusText(prescription.status)}
                  </span>
                  {prescription.status === "active" && (
                    <button
                      onClick={() => handleDownload(prescription)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Baixar prescrição"
                    >
                      <Download size={18} style={{ color: roleColor.primary }} />
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/prescriptions/${prescription.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Visualizar prescrição"
                  >
                    <BookOpen size={18} style={{ color: roleColor.primary }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrescriptions.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhuma prescrição encontrada</h3>
            <p className="text-sm text-gray-500">Tente ajustar os filtros ou criar uma nova prescrição</p>
          </div>
        )}
      </div>
    </div>
  )
}

