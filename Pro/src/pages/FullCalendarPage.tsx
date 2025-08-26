"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"

interface Appointment {
  id: string
  date: string
  time: string
  patient: string
  type: string
}

export const FullCalendarPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data para compromissos do mês
  const mockAppointments: Appointment[] = [
    { id: "1", date: "2024-01-15", time: "09:00", patient: "João Silva", type: "sessão" },
    { id: "2", date: "2024-01-15", time: "14:30", patient: "Maria Santos", type: "sessão" },
    { id: "3", date: "2024-01-18", time: "10:15", patient: "Pedro Costa", type: "sessão" },
    { id: "4", date: "2024-01-20", time: "16:00", patient: "Ana Oliveira", type: "sessão" },
    { id: "5", date: "2024-01-22", time: "08:30", patient: "Carlos Lima", type: "sessão" },
    { id: "6", date: "2024-01-25", time: "11:45", patient: "Lucia Ferreira", type: "sessão" },
    { id: "7", date: "2024-01-28", time: "13:00", patient: "Roberto Alves", type: "sessão" },
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

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const firstDayOfWeek = firstDay.getDay()

    return { daysInMonth, firstDayOfWeek }
  }

  const getAppointmentsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockAppointments.filter(app => app.date === dateStr)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const { daysInMonth, firstDayOfWeek } = getDaysInMonth(currentDate)
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background-white)" }}>
      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título da Página */}
        <div className="flex items-center space-x-2 mb-8">
          <Calendar size={24} style={{ color: getProfessionalColor() }} />
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
            Agenda Completa
          </h1>
        </div>

        {/* Navegação do Mês */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={previousMonth}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: getProfessionalColor() }}
          >
            <ChevronLeft size={20} />
            <span>Mês Anterior</span>
          </button>
          
          <h2 className="text-2xl font-bold capitalize" style={{ color: "var(--text-black)" }}>
            {getMonthName(currentDate)}
          </h2>
          
          <button
            onClick={nextMonth}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: getProfessionalColor() }}
          >
            <span>Próximo Mês</span>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendário */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Cabeçalho dos dias da semana */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="p-4 text-center font-medium text-sm"
                style={{ color: "var(--text-black)" }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7">
            {/* Dias vazios no início */}
            {Array.from({ length: firstDayOfWeek }, (_, index) => (
              <div key={`empty-${index}`} className="min-h-[120px] border-r border-b border-gray-100"></div>
            ))}

            {/* Dias do mês */}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1
              const appointments = getAppointmentsForDay(day)
              const isToday = new Date().getDate() === day && 
                             new Date().getMonth() === currentDate.getMonth() && 
                             new Date().getFullYear() === currentDate.getFullYear()

              return (
                <div
                  key={day}
                  className={`min-h-[120px] border-r border-b border-gray-100 p-2 ${
                    isToday ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "text-blue-600" : "text-gray-900"
                      }`}
                    >
                      {day}
                    </span>
                    {appointments.length > 0 && (
                      <span
                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: getProfessionalColor() }}
                      >
                        {appointments.length}
                      </span>
                    )}
                  </div>

                  {/* Compromissos do dia */}
                  <div className="space-y-1">
                    {appointments.slice(0, 2).map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100 text-xs"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={8} className="text-gray-500" />
                          <span className="font-medium text-gray-700">
                            {appointment.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={8} className="text-gray-500" />
                          <span className="text-gray-600 truncate">
                            {appointment.patient}
                          </span>
                        </div>
                      </div>
                    ))}
                    {appointments.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{appointments.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Resumo do Mês */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-black)" }}>
            Resumo do Mês
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getProfessionalColor() }}>
                {mockAppointments.length}
              </div>
              <div className="text-sm text-gray-600">Total de Compromissos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getProfessionalColor() }}>
                {new Set(mockAppointments.map(app => app.date)).size}
              </div>
              <div className="text-sm text-gray-600">Dias com Compromissos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getProfessionalColor() }}>
                {new Set(mockAppointments.map(app => app.patient)).size}
              </div>
              <div className="text-sm text-gray-600">Pacientes Únicos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
