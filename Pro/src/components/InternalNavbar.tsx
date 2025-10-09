import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { mockAuthService } from '../services/mockAuthService';
import { Menu, X } from 'lucide-react';

export const InternalNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { professionalData } = useProfessional();
  const roleColor = useRoleColor();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    mockAuthService.logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Home' },
    { path: '/apps', label: 'Apps' },
    { 
      path: '/patients', 
      label: professionalData.type === 'pedagogo' ? 'Alunos' : 'Pacientes' 
    },
    { 
      path: '/sessions', 
      label: professionalData.type === 'psiquiatra' ? 'Consultas' : 'Sessões' 
    },
    { path: '/reports', label: 'Relatórios' },
    { path: '/settings', label: 'Configurações' }
  ];

  return (
    <>
      {/* Navbar Principal */}
      <nav className="h-14 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 relative z-50">
        {/* Mobile: Hambúrguer + Logo + FalaAtípica */}
        <div className="flex items-center space-x-3">
          {/* Hambúrguer Menu - Mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          {/* Logo e Nome */}
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
        </div>

        {/* Desktop: Navegação + Perfil */}
        <div className="hidden lg:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="text-sm font-medium hover:text-blue-600 transition-colors"
              style={{ color: 'var(--text-black)' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop: Perfil */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xs font-medium" style={{ color: 'var(--text-black)' }}>
              {professionalData.name}
            </p>
            <p className="text-xs text-gray-500">{professionalData.license}</p>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium hover:opacity-80 transition-opacity"
            style={{ backgroundColor: roleColor.primary }}
            title="Ver Perfil"
          >
            {professionalData.name.charAt(0)}
          </button>
        </div>

        {/* Mobile: Perfil */}
        <div className="lg:hidden">
          <button
            onClick={() => navigate('/profile')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium hover:opacity-80 transition-opacity"
            style={{ backgroundColor: roleColor.primary }}
            title="Ver Perfil"
          >
            {professionalData.name.charAt(0)}
          </button>
        </div>
      </nav>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeSidebar}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Header da Sidebar */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
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
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Fechar menu"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>


            {/* Navegação */}
            <div className="p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Navegação</h3>
              <div className="space-y-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      closeSidebar();
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center space-x-3"
                    style={{ color: 'var(--text-black)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Perfil */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Perfil</h3>
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => {
                    navigate('/profile');
                    closeSidebar();
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-medium hover:opacity-80 transition-opacity shadow-sm"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  {professionalData.name.charAt(0)}
                </button>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-black)' }}>
                    {professionalData.name}
                  </p>
                  <p className="text-xs text-gray-500">{professionalData.license}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
