import React from 'react';
import { 
  Brain, 
  Mail
} from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';

interface AppConfig {
  id: string;
  name: string;
  type: 'kids' | 'tutors';
  version: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  lastUpdate: string;
  description: string;
  icon: React.ComponentType<any>;
}

export const AppsManagementPage: React.FC = () => {
  const { professionalType } = useProfessional();
  const roleColor = useRoleColor();

  const handleRequestLicense = () => {
    const email = 'pedrosousa2160@gmail.com';
    const subject = 'Solicitação de Licença - FalaAtípica';
    const body = 'Olá,\n\nGostaria de solicitar uma licença para os aplicativos FalaAtípica KIDS e TUTORS.\n\nAtenciosamente,';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  const apps: AppConfig[] = [
    {
      id: 'kids',
      name: 'FalaAtípica KIDS',
      type: 'kids',
      version: '1.2.0',
      status: 'active',
      users: 156,
      lastUpdate: '2025-10-09',
      description: 'Aplicativo para crianças com jogos e atividades educativas',
      icon: Brain
    },
    {
      id: 'tutors',
      name: 'FalaAtípica TUTORS',
      type: 'tutors',
      version: '1.1.5',
      status: 'active',
      users: 89,
      lastUpdate: '2025-10-10',
      description: 'Aplicativo para pais acompanharem o progresso das crianças',
      icon: Brain
    }
  ];


  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>Aplicações da Empresa</h1>
                <p className="text-gray-600 mt-1">Acompanhe as atualizações dos apps KIDS e TUTORS</p>
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {apps.map((app) => (
                <div key={app.id} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: roleColor.primary }}>
                        <app.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>{app.name}</h3>
                        <p className="text-sm text-gray-600">{app.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-600">Versão</p>
                      <p className="font-semibold" style={{ color: "var(--text-black)" }}>{app.version}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-600">Usuários Ativos</p>
                      <p className="font-semibold" style={{ color: "var(--text-black)" }}>{app.users}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-600">Última Atualização</p>
                      <p className="font-semibold" style={{ color: "var(--text-black)" }}>{app.lastUpdate}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-600">Tipo</p>
                      <p className="font-semibold" style={{ color: "var(--text-black)" }}>{app.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button 
                      onClick={handleRequestLicense}
                      className="px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center space-x-2 transition-colors hover:opacity-90" 
                      style={{ backgroundColor: roleColor.primary }}
                    >
                      <Mail size={16} />
                      <span>Solicitar Licença</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Recent Activity */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-black)" }}>Atividades Recentes</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">App KIDS atualizado para versão 1.2.0</p>
                    <p className="text-xs text-gray-500">Há 2 dias</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Novo usuário registrado no app TUTORS</p>
                    <p className="text-xs text-gray-500">Há 3 dias</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Manutenção programada para app KIDS</p>
                    <p className="text-xs text-gray-500">Há 1 semana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
