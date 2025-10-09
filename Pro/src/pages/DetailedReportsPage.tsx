"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  BarChart3, 
  Download, 
  Calendar, 
  User, 
  TrendingUp, 
  FileText, 
  PieChart,
  LineChart,
  Users,
  Target,
  Activity,
  Eye
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts"

interface Patient {
  id: string
  name: string
  age: number
  sessions: number
  progress: number
  lastSession: string
}

interface Report {
  id: string
  title: string
  patient: string
  date: string
  type: string
  status: "ready" | "generating" | "error"
  size?: string
}

export const DetailedReportsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  const [selectedPatient, setSelectedPatient] = useState<string>("all")
  const [reportType, setReportType] = useState<string>("general")

  // Dados mockados para pacientes
  const patients: Patient[] = [
    { id: "1", name: "João Silva", age: 8, sessions: 24, progress: 78, lastSession: "2024-01-15" },
    { id: "2", name: "Maria Santos", age: 6, sessions: 18, progress: 65, lastSession: "2024-01-18" },
    { id: "3", name: "Pedro Costa", age: 9, sessions: 32, progress: 85, lastSession: "2024-01-20" },
    { id: "4", name: "Ana Oliveira", age: 7, sessions: 15, progress: 45, lastSession: "2024-01-22" },
    { id: "5", name: "Carlos Lima", age: 10, sessions: 28, progress: 72, lastSession: "2024-01-25" },
  ]

  // Dados mockados para relatórios
  const reports: Report[] = [
    { id: "1", title: "Relatório Geral - Janeiro 2024", patient: "Todos", date: "2024-01-31", type: "Geral", status: "ready", size: "5.2 MB" },
    { id: "2", title: "Progresso Individual - João Silva", patient: "João Silva", date: "2024-01-15", type: "Individual", status: "ready", size: "2.3 MB" },
    { id: "3", title: "Análise de Sessões - Maria Santos", patient: "Maria Santos", date: "2024-01-18", type: "Análise", status: "ready", size: "1.8 MB" },
    { id: "4", title: "Relatório Mensal - Dezembro 2023", patient: "Todos", date: "2023-12-31", type: "Mensal", status: "ready", size: "4.1 MB" },
  ]

  // Dados para gráficos
  const progressData = [
    { name: "Jan", progress: 65 },
    { name: "Fev", progress: 72 },
    { name: "Mar", progress: 68 },
    { name: "Abr", progress: 75 },
    { name: "Mai", progress: 80 },
    { name: "Jun", progress: 85 },
  ]

  const sessionsData = [
    { month: "Jan", sessions: 45 },
    { month: "Fev", sessions: 52 },
    { month: "Mar", sessions: 48 },
    { month: "Abr", sessions: 58 },
    { month: "Mai", sessions: 62 },
    { month: "Jun", sessions: 55 },
  ]

  const patientProgressData = [
    { name: "João Silva", progress: 78 },
    { name: "Maria Santos", progress: 65 },
    { name: "Pedro Costa", progress: 85 },
    { name: "Ana Oliveira", progress: 45 },
    { name: "Carlos Lima", progress: 72 },
  ]


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

  const filteredReports = reports.filter(report => {
    if (selectedPatient !== "all" && report.patient !== selectedPatient) return false
    if (reportType !== "all" && report.type !== reportType) return false
    return true
  })

  const selectedPatientData = patients.find(p => p.id === selectedPatient)

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background-white)" }}>
      {/* Conteúdo */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">


        {/* Filtros */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4" style={{ border: `2px solid ${roleColor.primary}` }}>
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-black)" }}>
                Paciente
              </label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Pacientes</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-black)" }}>
                Tipo de Relatório
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os Tipos</option>
                <option value="Geral">Relatórios Gerais</option>
                <option value="Individual">Relatórios Individuais</option>
                <option value="Mensal">Relatórios Mensais</option>
                <option value="Análise">Análises Detalhadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Pacientes</p>
                <p className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                  {patients.length}
                </p>
              </div>
              <Users size={20} style={{ color: roleColor.primary }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessões Realizadas</p>
                <p className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                  {patients.reduce((sum, p) => sum + p.sessions, 0)}
                </p>
              </div>
              <Calendar size={20} style={{ color: roleColor.primary }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progresso Médio</p>
                <p className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                  {Math.round(patients.reduce((sum, p) => sum + p.progress, 0) / patients.length)}%
                </p>
              </div>
              <Target size={20} style={{ color: roleColor.primary }} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Relatórios Gerados</p>
                <p className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                  {reports.length}
                </p>
              </div>
              <FileText size={20} style={{ color: roleColor.primary }} />
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Progresso Geral */}
          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-black)" }}>
              Progresso Geral
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke={roleColor.primary}
                    strokeWidth={3}
                    dot={{ fill: roleColor.primary, strokeWidth: 2, r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sessões por Mês */}
          <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-black)" }}>
              Sessões por Mês
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="sessions" fill={roleColor.primary} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Progresso por Paciente */}
        {selectedPatient === "all" && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4" style={{ border: `2px solid ${roleColor.primary}` }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-black)" }}>
              Progresso por Paciente
            </h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                                 <BarChart data={patientProgressData} layout="horizontal" margin={{ left: 120, right: 20, top: 20, bottom: 20 }}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                   <XAxis 
                     type="number" 
                     stroke="#666" 
                     fontSize={12}
                     domain={[0, 100]}
                     tickFormatter={(value) => `${value}%`}
                     ticks={[0, 20, 40, 60, 80, 100]}
                   />
                   <YAxis 
                     dataKey="name" 
                     type="category" 
                     stroke="#666" 
                     fontSize={12} 
                     width={120}
                     tick={{ fontSize: 11 }}
                   />
                   <Tooltip
                     contentStyle={{
                       backgroundColor: "white",
                       border: "1px solid #e0e0e0",
                       borderRadius: "8px",
                     }}
                     formatter={(value: any) => [`${value}%`, 'Progresso']}
                     labelFormatter={(label) => `Paciente: ${label}`}
                   />
                   <Bar 
                     dataKey="progress" 
                     fill={roleColor.primary} 
                     radius={[0, 4, 4, 0]}
                     barSize={20}
                   />
                 </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Lista de Relatórios */}
        <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
              Relatórios Disponíveis
            </h3>
            <button
              className="px-3 py-2 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: roleColor.primary }}
            >
              Gerar Novo Relatório
            </button>
          </div>

          <div className="space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <FileText size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm" style={{ color: "var(--text-black)" }}>
                      {report.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {report.patient} • {report.date} • {report.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                  {report.size && (
                    <span className="text-xs text-gray-500">{report.size}</span>
                  )}
                  <div className="flex space-x-1">
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: roleColor.primary }}
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: roleColor.primary }}
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
