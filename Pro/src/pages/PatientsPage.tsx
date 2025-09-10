import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, User, Calendar, Phone, Mail } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import { ProfessionalCard } from '../components/morph';
import type { ProfessionalType } from '../types';

interface Patient {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  lastSession: string;
  nextSession: string;
  status: 'active' | 'inactive' | 'pending';
  professionalType: ProfessionalType;
}

export const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { professionalType } = useProfessional();
  const colors = useProfessionalColors(professionalType);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Dados mockados
  const patients: Patient[] = [
    {
      id: '1',
      name: 'João Silva',
      age: 8,
      email: 'joao.silva@email.com',
      phone: '(11) 99999-9999',
      lastSession: '2024-01-15',
      nextSession: '2024-01-22',
      status: 'active',
      professionalType: professionalType
    },
    {
      id: '2',
      name: 'Maria Santos',
      age: 10,
      email: 'maria.santos@email.com',
      phone: '(11) 88888-8888',
      lastSession: '2024-01-10',
      nextSession: '2024-01-24',
      status: 'active',
      professionalType: professionalType
    },
    {
      id: '3',
      name: 'Pedro Costa',
      age: 7,
      email: 'pedro.costa@email.com',
      phone: '(11) 77777-7777',
      lastSession: '2024-01-05',
      nextSession: '2024-01-26',
      status: 'pending',
      professionalType: professionalType
    },
    {
      id: '4',
      name: 'Ana Oliveira',
      age: 9,
      email: 'ana.oliveira@email.com',
      phone: '(11) 66666-6666',
      lastSession: '2023-12-20',
      nextSession: '2024-01-28',
      status: 'inactive',
      professionalType: professionalType
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      case 'pending':
        return 'Pendente';
      default:
        return 'Pendente';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const handleNewPatient = () => {
    navigate('/patients/new');
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-white)' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {professionalType === 'pedagogo' ? 'Alunos' : 'Pacientes'}
            </h1>
            <p className="text-gray-600">
              Gerencie {professionalType === 'pedagogo' ? 'seus alunos' : 'seus pacientes'} e acompanhe o progresso
            </p>
          </div>
          <button
            onClick={handleNewPatient}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus size={20} />
            <span>Novo {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Buscar ${professionalType === 'pedagogo' ? 'alunos' : 'pacientes'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
              style={{ focusRingColor: colors.primary }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={{ focusRingColor: colors.primary }}
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="pending">Pendentes</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                {patients.length}
              </p>
            </div>
            <User size={24} style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-green-600">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <Calendar size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">
                {patients.filter(p => p.status === 'pending').length}
              </p>
            </div>
            <Calendar size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inativos</p>
              <p className="text-2xl font-bold text-gray-600">
                {patients.filter(p => p.status === 'inactive').length}
              </p>
            </div>
            <User size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => handlePatientClick(patient.id)}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-opacity-50"
            style={{ borderColor: colors.primary }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: colors.primary }}
                >
                  {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age} anos</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}
              >
                {getStatusText(patient.status)}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail size={14} />
                <span className="truncate">{patient.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone size={14} />
                <span>{patient.phone}</span>
              </div>
            </div>

            {/* Sessions Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Última sessão:</span>
                <span className="font-medium">
                  {new Date(patient.lastSession).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Próxima sessão:</span>
                <span className="font-medium" style={{ color: colors.primary }}>
                  {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum {professionalType === 'pedagogo' ? 'aluno' : 'paciente'} encontrado
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece adicionando um novo paciente'}
          </p>
          <button
            onClick={handleNewPatient}
            className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200"
            style={{ backgroundColor: colors.primary }}
          >
            Adicionar {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}
          </button>
        </div>
      )}
    </div>
  );
};
