import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { mockAuthService } from '../services/mockAuthService';
import { 
  Home, 
  Smartphone, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut
} from 'lucide-react';

export const DesktopSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { professionalData } = useProfessional();
  const roleColor = useRoleColor();

  const handleLogout = () => {
    mockAuthService.logout();
    navigate('/login');
  };

  const navigationItems = [
    { 
      path: '/dashboard', 
      label: 'Home', 
      icon: Home 
    },
    { 
      path: '/apps', 
      label: 'Apps', 
      icon: Smartphone 
    },
    { 
      path: '/patients', 
      label: professionalData.type === 'pedagogo' ? 'Alunos' : 'Pacientes',
      icon: Users 
    },
    { 
      path: '/sessions', 
      label: professionalData.type === 'psiquiatra' ? 'Consultas' : 'Sessões',
      icon: Calendar 
    },
    { 
      path: '/reports', 
      label: 'Relatórios', 
      icon: FileText 
    },
    { 
      path: '/settings', 
      label: 'Configurações', 
      icon: Settings 
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50">
      {/* Sidebar */}
      <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
        {/* Header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-200">
          <img 
            src="/assets/logo/falaatipica-logo.png" 
            alt="FalaAtípica" 
            className="w-8 h-8"
          />
          <span 
            className="ml-3 text-lg font-bold"
            style={{ color: roleColor.primary }}
          >
            FalaAtípica
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-white shadow-sm'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: active ? roleColor.primary : 'transparent'
                }}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <button
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium hover:opacity-80 transition-opacity shadow-sm"
              style={{ backgroundColor: roleColor.primary }}
            >
              {professionalData.name.charAt(0)}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {professionalData.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {professionalData.license}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};
