import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';
import { getRoleColor } from '../../hooks/useRoleColor';
import type { ProfessionalType } from '../../types';

interface AlertCardProps {
  professionalType: ProfessionalType;
  alert: {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    date: string;
  };
  onDismiss?: () => void;
  onAction?: () => void;
  className?: string;
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'info':
      return Info;
    case 'warning':
      return AlertCircle;
    case 'error':
      return XCircle;
    case 'success':
      return CheckCircle;
    default:
      return Info;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const AlertCard: React.FC<AlertCardProps> = ({
  professionalType,
  alert,
  onDismiss,
  onAction,
  className = ''
}) => {
  const roleColor = getRoleColor(professionalType);
  const Icon = getAlertIcon(alert.type);

  return (
    <div
      className={`
        bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200
        border-2 border-transparent hover:border-opacity-50
        ${className}
      `}
      style={{
        '--professional-color': roleColor.primary,
        borderColor: roleColor.primary
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: roleColor.light }}
          >
            <Icon size={16} style={{ color: roleColor.primary }} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{alert.title}</h4>
            <p className="text-sm text-gray-600">{new Date(alert.date).toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${getPriorityColor(alert.priority)}`}
            title={`Prioridade ${alert.priority}`}
          />
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-4">
        <p className="text-sm text-gray-700">{alert.message}</p>
      </div>

      {/* Actions */}
      {onAction && (
        <div className="flex justify-end">
          <button
            onClick={onAction}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors duration-200"
            style={{ backgroundColor: roleColor.primary }}
          >
            Ver Detalhes
          </button>
        </div>
      )}
    </div>
  );
};
