"use client"

import type React from "react"
import { Calendar, Clock, User, CalendarDays } from "lucide-react"

interface Appointment {
  id: string
  time: string
  patient: string
  type: string
}

interface WeeklyScheduleProps {
  appointments: Appointment[]
  professionalType: string
  color: string
  onViewFullCalendar?: () => void
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ appointments, color, onViewFullCalendar }) => {
  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const currentDate = new Date()
  const currentDay = currentDate.getDay()

  const getDayAppointments = (dayIndex: number) => {
    // Simular compromissos baseados no dia da semana
    return appointments.filter((_, index) => index % 7 === dayIndex).slice(0, 3)
  }

  const getCurrentDayName = (dayIndex: number) => {
    const today = new Date().getDay()
    return dayIndex === today ? "Hoje" : daysOfWeek[dayIndex]
  }

  return (
    <div className="weekly-schedule" style={{ borderColor: color }}>
      <div className="flex items-center space-x-2 mb-4">
        <Calendar size={20} style={{ color }} />
        <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
          Agenda Semanal
        </h3>
      </div>

      {/* Desktop: Grid 7 colunas */}
      <div className="hidden lg:grid weekly-grid">
        {daysOfWeek.map((day, index) => {
          const dayAppointments = getDayAppointments(index)
          const isToday = index === currentDay

          return (
            <div key={day} className="flex flex-col">
              <div
                className={`text-center py-2 px-1 rounded-t-lg text-xs font-medium ${
                  isToday ? "text-white" : "text-gray-600"
                }`}
                style={{
                  backgroundColor: isToday ? color : "transparent",
                }}
              >
                {getCurrentDayName(index)}
              </div>

              <div className="flex-1 bg-gray-50 rounded-b-lg p-2 min-h-[200px]">
                {dayAppointments.length > 0 ? (
                  <div className="space-y-2">
                    {dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={10} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={10} className="text-gray-500" />
                          <span className="text-xs text-gray-600 truncate">{appointment.patient}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xs text-gray-400">Livre</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: Layout Vertical */}
      <div className="lg:hidden space-y-4">
        {/* Segunda e Terça */}
        <div className="grid grid-cols-2 gap-3">
          {[0, 1].map((index) => {
            const dayAppointments = getDayAppointments(index)
            const isToday = index === currentDay
            const dayName = daysOfWeek[index]

            return (
              <div key={dayName} className="bg-gray-50 rounded-lg p-3">
                <div
                  className={`text-center py-2 px-2 rounded-lg text-sm font-medium mb-3 ${
                    isToday ? "text-white" : "text-gray-600"
                  }`}
                  style={{
                    backgroundColor: isToday ? color : "#f3f4f6",
                  }}
                >
                  {getCurrentDayName(index)}
                </div>

                <div className="space-y-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={10} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={10} className="text-gray-500" />
                          <span className="text-xs text-gray-600 truncate">{appointment.patient}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-xs text-gray-400">Livre</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Quarta e Quinta */}
        <div className="grid grid-cols-2 gap-3">
          {[2, 3].map((index) => {
            const dayAppointments = getDayAppointments(index)
            const isToday = index === currentDay
            const dayName = daysOfWeek[index]

            return (
              <div key={dayName} className="bg-gray-50 rounded-lg p-3">
                <div
                  className={`text-center py-2 px-2 rounded-lg text-sm font-medium mb-3 ${
                    isToday ? "text-white" : "text-gray-600"
                  }`}
                  style={{
                    backgroundColor: isToday ? color : "#f3f4f6",
                  }}
                >
                  {getCurrentDayName(index)}
                </div>

                <div className="space-y-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={10} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={10} className="text-gray-500" />
                          <span className="text-xs text-gray-600 truncate">{appointment.patient}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-xs text-gray-400">Livre</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Sexta e Sábado */}
        <div className="grid grid-cols-2 gap-3">
          {[4, 5].map((index) => {
            const dayAppointments = getDayAppointments(index)
            const isToday = index === currentDay
            const dayName = daysOfWeek[index]

            return (
              <div key={dayName} className="bg-gray-50 rounded-lg p-3">
                <div
                  className={`text-center py-2 px-2 rounded-lg text-sm font-medium mb-3 ${
                    isToday ? "text-white" : "text-gray-600"
                  }`}
                  style={{
                    backgroundColor: isToday ? color : "#f3f4f6",
                  }}
                >
                  {getCurrentDayName(index)}
                </div>

                <div className="space-y-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={10} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={10} className="text-gray-500" />
                          <span className="text-xs text-gray-600 truncate">{appointment.patient}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-xs text-gray-400">Livre</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Domingo - Sozinho */}
        <div className="grid grid-cols-1">
          {(() => {
            const index = 6 // Domingo
            const dayAppointments = getDayAppointments(index)
            const isToday = index === currentDay

            return (
              <div className="bg-gray-50 rounded-lg p-3">
                <div
                  className={`text-center py-2 px-2 rounded-lg text-sm font-medium mb-3 ${
                    isToday ? "text-white" : "text-gray-600"
                  }`}
                  style={{
                    backgroundColor: isToday ? color : "#f3f4f6",
                  }}
                >
                  {getCurrentDayName(index)}
                </div>

                <div className="space-y-2">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-md p-2 shadow-sm border border-gray-100"
                      >
                        <div className="flex items-center space-x-1 mb-1">
                          <Clock size={10} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={10} className="text-gray-500" />
                          <span className="text-xs text-gray-600 truncate">{appointment.patient}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2">
                      <span className="text-xs text-gray-400">Livre</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })()}
        </div>
      </div>

             <div className="pt-4 border-t border-gray-200">
         <div className="flex items-center justify-between">
           <div>
             <span className="text-sm text-gray-600">Total de compromissos:</span>
             <span className="text-sm font-semibold ml-2" style={{ color }}>
               {appointments.length}
             </span>
           </div>
           {onViewFullCalendar && (
             <button
               onClick={onViewFullCalendar}
               className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
               style={{ color }}
             >
               <CalendarDays size={16} />
               <span>Ver Agenda Completa</span>
             </button>
           )}
         </div>
       </div>
    </div>
  )
}
