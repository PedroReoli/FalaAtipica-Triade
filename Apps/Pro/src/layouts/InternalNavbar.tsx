import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { ProfessionalTypeSelector } from '../components/common/ProfessionalTypeSelector';
import { mockAuthService } from '../services/mockAuthService';

export const InternalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { professionalData } = useProfessional();
  const roleColor = useRoleColor();

  const handleLogout = () => {
    mockAuthService.logout();
    navigate('/login');
  };

         return (
         <nav className="h-24 bg-white shadow-sm flex items-center justify-between px-4" style={{ borderBottom: `4px solid ${roleColor.primary}` }}>
      {/* Logo e Seletor */}
      <div className="flex items-center space-x-4">
                     <div className="flex items-center space-x-2">
               <img
                 src="/assets/logo/falaatipica-logo.png"
                 alt="FalaAtípica"
                 className="w-12 h-12"
               />
               <span
                 className="text-xl font-bold"
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
          onClick={() => navigate('/reports')}
          className="text-sm font-medium hover:text-blue-600 transition-colors"
          style={{ color: 'var(--text-black)' }}
        >
          Relatórios
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
          onClick={handleLogout}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium"
          style={{ backgroundColor: roleColor.primary }}
        >
          {professionalData.name.charAt(0)}
        </button>
      </div>
    </nav>
  );
};



