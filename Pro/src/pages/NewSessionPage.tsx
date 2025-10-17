"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Calendar, Clock, User, FileText, Save, ArrowLeft } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"

export const NewSessionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  
  // Receber dados do paciente da navegação (se vier de PatientDetails)
  const preselectedPatient = location.state as { patientId?: string; patientName?: string } | null
  
  const [formData, setFormData] = useState({
    patient: preselectedPatient?.patientId || "",
    patientName: preselectedPatient?.patientName || "",
    date: "",
    time: "",
    duration: "60",
    type: professionalType === "psiquiatra" ? "consulta" : "sessão",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica para salvar sessão
    console.log("Nova sessão:", formData)
    navigate("/dashboard")
  }


  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ArrowLeft size={20} style={{ color: "var(--text-black)" }} />
                  </button>
                  <div>
                    <h1 className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                      Nova {professionalType === "psiquiatra" ? "Consulta" : "Sessão"}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Agende uma nova {professionalType === "psiquiatra" ? "consulta" : "sessão"} com seu paciente
                    </p>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  <Calendar size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Paciente */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-black)" }}>
                    <User size={16} className="inline mr-2" />
                    Paciente
                  </label>
                  {preselectedPatient ? (
                    // Campo bloqueado se veio de PatientDetails
                    <div className="w-full p-3 border-2 rounded-lg bg-gray-100 flex items-center justify-between" style={{ borderColor: roleColor.primary }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: roleColor.primary }}>
                          {formData.patientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <span className="font-medium" style={{ color: "var(--text-black)" }}>
                          {formData.patientName}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                        Selecionado automaticamente
                      </span>
                    </div>
                  ) : (
                    // Select normal se acessar direto /sessions/new
                    <select
                      value={formData.patient}
                      onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selecione um paciente</option>
                      <option value="joao-silva">João Silva</option>
                      <option value="maria-santos">Maria Santos</option>
                      <option value="pedro-costa">Pedro Costa</option>
                      <option value="ana-oliveira">Ana Oliveira</option>
                    </select>
                  )}
                </div>

                {/* Data e Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-black)" }}>
                      <Calendar size={16} className="inline mr-2" />
                      Data
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-black)" }}>
                      <Clock size={16} className="inline mr-2" />
                      Hora
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Duração */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-black)" }}>
                    <Clock size={16} className="inline mr-2" />
                    Duração
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="90">1 hora e 30 minutos</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-black)" }}>
                    <FileText size={16} className="inline mr-2" />
                    Observações
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adicione observações sobre a sessão..."
                  />
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg text-white font-medium transition-colors"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Save size={18} />
                    <span>Agendar {professionalType === "psiquiatra" ? "Consulta" : "Sessão"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

