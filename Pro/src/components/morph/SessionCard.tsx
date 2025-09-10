import React from 'react';
import { Calendar, Clock, User, Edit, Eye } from 'lucide-react';
import { useProfessionalColors } from '../../hooks/useProfessionalColors';
import type { ProfessionalType } from '../../types';

interface SessionCardProps {
  professionalType: ProfessionalType;
  session: {
    id: string;
    patient: string;
    date: string;
    duration: number;
    status: 'completed' | 'pending' | 'cancelled';
    type: string;
  };
  onEdit?: () => void;
  onView?: () => void;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Concluída';
    case 'pending':
      return 'Pendente';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};

export const SessionCard: React.FC<SessionCardProps> = ({
  professionalType,
  session,
  onEdit,
  onView,
  className = ''
}) => {
  const colors = useProfessionalColors(professionalType);

  return (
    <div
      className={`
        bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200
        border-2 border-transparent hover:border-opacity-50
        ${className}
      `}
      style={{
        '--professional-color': colors.primary,
        borderColor: colors.primary
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: colors.light }}
          >
            <Calendar size={16} style={{ color: colors.primary }} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{session.patient}</h4>
            <p className="text-sm text-gray-600">{session.type}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}
        >
          {getStatusText(session.status)}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>{new Date(session.date).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock size={14} />
          <span>{session.duration} minutos</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200"
          style={{
            backgroundColor: colors.light,
            color: colors.primary
          }}
        >
          <Eye size={14} />
          <span>Ver</span>
        </button>
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition-colors duration-200"
          style={{ backgroundColor: colors.primary }}
        >
          <Edit size={14} />
          <span>Editar</span>
        </button>
      </div>
    </div>
  );
};
