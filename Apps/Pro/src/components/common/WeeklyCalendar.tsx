import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

interface Appointment {
  id: string;
  time: string;
  patient: string;
  type: string;
  status: 'confirmed' | 'pending' | 'completed';
}

interface WeeklyCalendarProps {
  appointments: Appointment[];
  professionalType: string;
  color: string;
}

const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  appointments,
  professionalType,
  color
}) => {
  const getAppointmentsForDay = (day: string) => {
    return appointments.filter(app => {
      // Simular distribuição dos compromissos pelos dias
      const dayIndex = daysOfWeek.indexOf(day);
      return app.id.includes(dayIndex.toString());
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-black)' }}>
          Calendário da Semana
        </h3>
        <div className="flex items-center space-x-2">
          <Calendar size={16} style={{ color: color }} />
          <span className="text-xs text-gray-600">Esta semana</span>
        </div>
      </div>

      {/* Dias da semana em horizontal */}
      <div className="grid grid-cols-7 gap-3">
        {daysOfWeek.map((day) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isToday = day === 'Qua'; // Simular que hoje é quarta-feira
          
          return (
            <div key={day} className="min-h-[140px] flex flex-col">
              {/* Cabeçalho do dia */}
              <div className="text-center mb-3">
                <div 
                  className={`text-sm font-semibold rounded-lg px-3 py-2 ${
                    isToday ? 'text-white shadow-md' : 'text-gray-700 bg-gray-50'
                  }`}
                  style={{ 
                    backgroundColor: isToday ? color : 'transparent'
                  }}
                >
                  {day}
                </div>
              </div>
              
              {/* Compromissos do dia */}
              <div className="flex-1 space-y-2">
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
                      className="p-2 rounded-lg border border-gray-200 bg-gray-50 text-xs shadow-sm"
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock size={10} style={{ color: color }} />
                        <span className="font-semibold text-gray-800">{appointment.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={10} style={{ color: color }} />
                        <span className="truncate font-medium text-gray-700">{appointment.patient}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-xs text-gray-400 italic text-center">
                      Livre
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total da semana:</span>
          <span className="text-sm font-semibold" style={{ color: color }}>
            {appointments.length} {professionalType === 'psiquiatra' ? 'consultas' : 'sessões'}
          </span>
        </div>
      </div>
    </div>
  );
};
