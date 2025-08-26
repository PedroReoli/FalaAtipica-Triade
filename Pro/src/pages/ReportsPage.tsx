"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, Download, Calendar, User, ArrowLeft, Search, Filter } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"

interface Report {
  id: string
  title: string
  patient: string
  date: string
  type: string
  status: "ready" | "generating" | "error"
  size?: string
}

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  // Dados mockados
  const reports: Report[] = [
    {
      id: "1",
      title: "Relatório de Progresso - João Silva",
      patient: "João Silva",
      date: "2024-01-15",
      type: "Progresso",
      status: "ready",
      size: "2.3 MB",
    },
    {
      id: "2",
      title: "Avaliação Completa - Maria Santos",
      patient: "Maria Santos",
      date: "2024-01-20",
      type: "Avaliação",
      status: "ready",
      size: "1.8 MB",
    },
    {
      id: "3",
      title: "Relatório Mensal - Janeiro 2024",
      patient: "Todos os Pacientes",
      date: "2024-01-31",
      type: "Mensal",
      status: "generating",
    },
    {
      id: "4",
      title: "Análise de Sessões - Pedro Costa",
      patient: "Pedro Costa",
      date: "2024-01-25",
      type: "Análise",
      status: "ready",
      size: "3.1 MB",
    },
  ]

  const getProfessionalColor = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return "var(--green)"
      case "psicologo":
        return "var(--blue)"
      case "psiquiatra":
        return "var(--red)"
      default:
        return "var(--blue)"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "generating":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Pronto"
      case "generating":
        return "Gerando..."
      case "error":
        return "Erro"
      default:
        return "Desconhecido"
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.patient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || report.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleDownload = (report: Report) => {
    if (report.status === "ready") {
      console.log(`Baixando relatório: ${report.title}`)
      // Lógica para download
    }
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
                  Relatórios
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Visualize e baixe relatórios dos seus pacientes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/reports/generate")}
                className="flex items-center space-x-2 p-3 rounded-lg text-white font-medium transition-colors"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <BarChart3 size={18} />
                <span>Gerar Relatório</span>
              </button>
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <BarChart3 size={20} className="text-white" />
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
                    placeholder="Buscar relatórios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="Progresso">Progresso</option>
                  <option value="Avaliação">Avaliação</option>
                  <option value="Mensal">Mensal</option>
                  <option value="Análise">Análise</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Relatórios */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: getProfessionalColor() }}
                  >
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                      {report.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{report.patient}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{report.date}</span>
                      </div>
                      {report.size && (
                        <span className="text-sm text-gray-500">{report.size}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                  {report.status === "ready" && (
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Baixar relatório"
                    >
                      <Download size={18} style={{ color: getProfessionalColor() }} />
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Visualizar relatório"
                  >
                    <BarChart3 size={18} style={{ color: getProfessionalColor() }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum relatório encontrado</h3>
            <p className="text-sm text-gray-500">Tente ajustar os filtros ou gerar um novo relatório</p>
          </div>
        )}
      </div>
    </div>
  )
}

