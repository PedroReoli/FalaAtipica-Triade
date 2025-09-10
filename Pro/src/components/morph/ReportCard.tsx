import React from 'react';
import { FileText, User, Calendar, Send, Edit, Eye } from 'lucide-react';
import { useProfessionalColors } from '../../hooks/useProfessionalColors';
import type { ProfessionalType } from '../../types';

interface ReportCardProps {
  professionalType: ProfessionalType;
  report: {
    id: string;
    title: string;
    patient: string;
    date: string;
    type: string;
    status: 'draft' | 'completed' | 'sent';
  };
  onView?: () => void;
  onEdit?: () => void;
  onSend?: () => void;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'sent':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'draft':
      return 'Rascunho';
    case 'completed':
      return 'Concluído';
    case 'sent':
      return 'Enviado';
    default:
      return 'Rascunho';
  }
};

export const ReportCard: React.FC<ReportCardProps> = ({
  professionalType,
  report,
  onView,
  onEdit,
  onSend,
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
            <FileText size={16} style={{ color: colors.primary }} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{report.title}</h4>
            <p className="text-sm text-gray-600">{report.type}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}
        >
          {getStatusText(report.status)}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User size={14} />
          <span>{report.patient}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>{new Date(report.date).toLocaleDateString('pt-BR')}</span>
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
        {report.status === 'draft' && (
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: colors.primary }}
          >
            <Edit size={14} />
            <span>Editar</span>
          </button>
        )}
        {report.status === 'completed' && (
          <button
            onClick={onSend}
            className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: colors.secondary }}
          >
            <Send size={14} />
            <span>Enviar</span>
          </button>
        )}
      </div>
    </div>
  );
};
