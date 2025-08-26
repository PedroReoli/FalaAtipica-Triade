import React from 'react';
import { 
  Smartphone, 
  Users, 
  Brain, 
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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
  const apps: AppConfig[] = [
    {
      id: 'kids',
      name: 'FalaAtípica KIDS',
      type: 'kids',
      version: '1.2.0',
      status: 'active',
      users: 156,
      lastUpdate: '2024-01-15',
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
      lastUpdate: '2024-01-10',
      description: 'Aplicativo para pais acompanharem o progresso das crianças',
      icon: Users
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} />;
      case 'inactive':
        return <AlertCircle size={16} />;
      case 'maintenance':
        return <AlertCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-bege p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-verde-escuro">Gerenciar Aplicativos</h1>
            <p className="text-gray-600 mt-1">Configure e monitore os apps KIDS e TUTORS</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={20} />
            <span>Novo App</span>
          </button>
        </div>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {apps.map((app) => (
          <div key={app.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-verde-escuro rounded-xl flex items-center justify-center">
                  <app.icon size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{app.name}</h3>
                  <p className="text-sm text-gray-600">{app.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(app.status)}`}>
                  {getStatusIcon(app.status)}
                  <span className="capitalize">{app.status}</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Versão</p>
                <p className="font-semibold text-gray-800">{app.version}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Usuários Ativos</p>
                <p className="font-semibold text-gray-800">{app.users}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Última Atualização</p>
                <p className="font-semibold text-gray-800">{app.lastUpdate}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Tipo</p>
                <p className="font-semibold text-gray-800 capitalize">{app.type}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="btn-secondary flex items-center space-x-2 px-4 py-2">
                  <Eye size={16} />
                  <span>Visualizar</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2 px-4 py-2">
                  <Download size={16} />
                  <span>Download</span>
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-verde-escuro hover:bg-verde-claro rounded-lg transition-colors duration-200">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Apps</p>
              <p className="text-2xl font-bold text-gray-800">{apps.length}</p>
            </div>
            <div className="w-12 h-12 bg-verde-escuro rounded-lg flex items-center justify-center">
              <Smartphone size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Usuários Totais</p>
              <p className="text-2xl font-bold text-gray-800">
                {apps.reduce((sum, app) => sum + app.users, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-verde-medio rounded-lg flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Apps Ativos</p>
              <p className="text-2xl font-bold text-gray-800">
                {apps.filter(app => app.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-verde-claro rounded-lg flex items-center justify-center">
              <CheckCircle size={24} className="text-verde-escuro" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">App KIDS atualizado para versão 1.2.0</p>
              <p className="text-xs text-gray-500">Há 2 dias</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Novo usuário registrado no app TUTORS</p>
              <p className="text-xs text-gray-500">Há 3 dias</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Manutenção programada para app KIDS</p>
              <p className="text-xs text-gray-500">Há 1 semana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
