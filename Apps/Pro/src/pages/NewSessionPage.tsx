"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Calendar, Clock, User, FileText, Save, ArrowLeft } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"
import { useToast } from "../hooks/useToast"

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api' // DESABILITADO - Sistema de agenda

export const NewSessionPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { professionalType } = useProfessional() // professionalData removido
  const roleColor = useRoleColor()
  const { error: showError } = useToast() // success removido
  
  // Receber dados do paciente da navegação (se vier de PatientDetails)
  const preselectedPatient = location.state as { patientId?: string; patientName?: string } | null
  
  const [formData, setFormData] = useState({
    patient: preselectedPatient?.patientId || "",
    patientName: preselectedPatient?.patientName || "",
    date: "",
    time: "09:00", // Horário padrão inicial
    duration: "60",
    type: professionalType === "psiquiatra" ? "consulta" : "sessão",
    notes: "",
  })
  // const [isSubmitting, setIsSubmitting] = useState(false) // DESABILITADO - Sistema de agenda
  const [selectedHour, setSelectedHour] = useState("09")
  const [selectedMinute, setSelectedMinute] = useState("00")

  // DESABILITADO - Sistema de agenda
  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validações
    if (!formData.patient || !formData.date || !formData.time) {
      showError('Preencha todos os campos obrigatórios')
      return
    }

    setIsSubmitting(true)

    try {
      const professionalId = professionalData?.id || 'prof_001'
      const professionalName = professionalData?.name || 'Profissional'
      
      // Buscar informações do paciente para pegar o tutorId
      let tutorId = 'tutor_001'; // Padrão
      let tutorNome = '';
      let tutorEmail = '';
      let tutorTelefone = '';
      
      try {
        const patientResponse = await fetch(`${API_BASE_URL}/pro/patient/${formData.patient}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          if (patientData.success && patientData.data.patient.tutor) {
            tutorNome = patientData.data.patient.tutor.nome || '';
            tutorEmail = patientData.data.patient.tutor.email || '';
            tutorTelefone = patientData.data.patient.tutor.telefone || '';
          }
        }
      } catch (error) {
        console.warn('⚠️ Não foi possível carregar dados do tutor');
      }
      
      // Criar agenda com status pendente (tutor precisa confirmar)
      const agendaData = {
        criancaId: formData.patient,
        criancaNome: formData.patientName,
        tutorId: tutorId,
        tutorNome: tutorNome,
        tutorEmail: tutorEmail,
        tutorTelefone: tutorTelefone,
        profissionalId: professionalId,
        profissionalNome: professionalName,
        profissionalEspecialidade: professionalData?.specialty || 'Fonoaudiólogo',
        data: formData.date,
        horario: formData.time,
        duracao: parseInt(formData.duration),
        tipo: formData.type === 'consulta' ? 'Consulta Presencial' : 'Sessão Terapêutica',
        observacoes: formData.notes || '',
        local: 'Clínica FalaAtípica',
      }

      console.log('📝 [NEW SESSION] Criando agenda:', agendaData);

      // Tentar API
      const response = await fetch(`${API_BASE_URL}/pro/agenda`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agendaData),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          console.log('✅ [NEW SESSION] Agenda criada com sucesso');
          success('Sessão agendada com sucesso! O tutor receberá uma notificação.')
          setTimeout(() => navigate('/sessions'), 1500)
          return
        }
      }
      
      throw new Error('Resposta da API não foi bem-sucedida');
    } catch (error) {
      console.error('❌ [NEW SESSION] Erro ao criar sessão:', error)
      showError('Erro ao agendar sessão. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }
  */

  // Função simplificada - sem agenda por enquanto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    showError('Sistema de agenda temporariamente desabilitado')
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
                      Horário
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Seletor de Hora */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Hora</label>
                        <select
                          value={selectedHour}
                          onChange={(e) => {
                            setSelectedHour(e.target.value);
                            setFormData({ ...formData, time: `${e.target.value}:${selectedMinute}` });
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold"
                          required
                        >
                          {Array.from({ length: 14 }, (_, i) => i + 7).map((hour) => (
                            <option key={hour} value={hour.toString().padStart(2, '0')}>
                              {hour.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Seletor de Minuto */}
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Minuto</label>
                        <select
                          value={selectedMinute}
                          onChange={(e) => {
                            setSelectedMinute(e.target.value);
                            setFormData({ ...formData, time: `${selectedHour}:${e.target.value}` });
                          }}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold"
                          required
                        >
                          {['00', '15', '30', '45'].map((minute) => (
                            <option key={minute} value={minute}>
                              {minute}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Horário selecionado: <span className="font-bold" style={{ color: roleColor.primary }}>{selectedHour}:{selectedMinute}</span>
                    </p>
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
                    disabled={true} // DESABILITADO - Sistema de agenda
                    className="flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Save size={18} />
                    <span>Sistema Desabilitado</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    disabled={false}
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
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

