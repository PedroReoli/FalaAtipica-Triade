import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfessional } from '../contexts/ProfessionalContext';
import { ProfessionalTypeSelector } from './common/ProfessionalTypeSelector';
import { mockAuthService } from '../services/mockAuthService';

export const InternalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { professionalData } = useProfessional();

  const getProfessionalColor = () => {
    switch (professionalData.type) {
      case 'fonoaudiologo':
        return 'var(--green)';
      case 'psicologo':
        return 'var(--blue)';
      case 'psiquiatra':
        return 'var(--red)';
      case 'pedagogo':
        return 'var(--yellow)';
      case 'psicopedagogo':
        return 'var(--purple)';
      default:
        return 'var(--blue)';
    }
  };

  const handleLogout = () => {
    mockAuthService.logout();
    navigate('/login');
  };

  return (
    <nav className="h-14 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4">
      {/* Logo e Seletor */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/assets/logo/falaatipica-logo.png" 
            alt="FalaAtípica" 
            className="w-8 h-8"
          />
          <span 
            className="text-lg font-bold"
            style={{ color: 'var(--blue)' }}
          >
            FalaAtípica
          </span>
        </div>
        
        {/* Seletor de Tipo de Profissional */}
        <ProfessionalTypeSelector />
      </div>

      {/* Navegação */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          Home
        </button>
        <button
          onClick={() => navigate('/apps')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          Apps
        </button>
        <button
          onClick={() => navigate('/patients')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          {professionalData.type === 'pedagogo' ? 'Alunos' : 'Pacientes'}
        </button>
        <button
          onClick={() => navigate('/sessions')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          {professionalData.type === 'psiquiatra' ? 'Consultas' : 'Sessões'}
        </button>
        <button
          onClick={() => navigate('/reports')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          Relatórios
        </button>
        <button
          onClick={() => navigate('/settings')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          Configurações
        </button>
      </div>

      {/* Perfil */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-xs font-medium" style={{ color: 'var(--text-black)' }}>
            {professionalData.name}
          </p>
          <p className="text-xs text-gray-500">{professionalData.license}</p>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium hover:opacity-80 transition-opacity"
          style={{ backgroundColor: getProfessionalColor() }}
          title="Ver Perfil"
        >
          {professionalData.name.charAt(0)}
        </button>
      </div>
    </nav>
  );
};
