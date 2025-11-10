import React from 'react';
import { User, Mic, Heart, Pill, BookOpen, Brain } from 'lucide-react';
import { getRoleColor } from '../../hooks/useRoleColor';
import type { ProfessionalType } from '../../types';

interface ProfessionalCardProps {
  professionalType: ProfessionalType;
  data: {
    name: string;
    specialty: string;
    patients: number;
    sessions: number;
  };
  onClick?: () => void;
  className?: string;
}

const getProfessionalIcon = (professionalType: ProfessionalType) => {
  switch (professionalType) {
    case 'fonoaudiologo':
      return Mic;
    case 'psicologo':
      return Heart;
    case 'psiquiatra':
      return Pill;
    case 'pedagogo':
      return BookOpen;
    case 'psicopedagogo':
      return Brain;
    default:
      return User;
  }
};

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professionalType,
  data,
  onClick,
  className = ''
}) => {
  const roleColor = getRoleColor(professionalType);
  const Icon = getProfessionalIcon(professionalType);

  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer
        border-2 border-transparent hover:border-opacity-50
        ${className}
      `}
      style={{
        '--professional-color': roleColor.primary,
        '--professional-secondary': roleColor.secondary,
        '--professional-light': roleColor.light,
        '--professional-dark': roleColor.dark,
        borderColor: roleColor.primary
      } as React.CSSProperties}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: roleColor.light }}
        >
          <Icon size={24} style={{ color: roleColor.primary }} />
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
            {data.name}
          </h3>
          <p className="text-sm text-gray-600">{data.specialty}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: roleColor.primary }}>
            {data.patients}
          </div>
          <div className="text-sm text-gray-600">
            {professionalType === 'pedagogo' ? 'Alunos' : 'Pacientes'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: roleColor.primary }}>
            {data.sessions}
          </div>
          <div className="text-sm text-gray-600">
            {professionalType === 'psiquiatra' ? 'Consultas' : 'Sessões'}
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-200"
        style={{ backgroundColor: roleColor.primary }}
      />
    </div>
  );
};
