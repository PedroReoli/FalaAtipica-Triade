import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, Calendar, Phone, Mail, Users } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import { getProfessionalColor } from '../utils/getProfessionalColor';
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
  tutor: {
    name: string;
    phone: string;
    email: string;
  };
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
      professionalType: professionalType,
      tutor: {
        name: 'Carlos Silva',
        phone: '(11) 99999-8888',
        email: 'carlos.silva@email.com'
      }
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
      professionalType: professionalType,
      tutor: {
        name: 'Ana Santos',
        phone: '(11) 88888-7777',
        email: 'ana.santos@email.com'
      }
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
      professionalType: professionalType,
      tutor: {
        name: 'Roberto Costa',
        phone: '(11) 77777-6666',
        email: 'roberto.costa@email.com'
      }
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
      professionalType: professionalType,
      tutor: {
        name: 'Lucia Oliveira',
        phone: '(11) 66666-5555',
        email: 'lucia.oliveira@email.com'
      }
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
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                    {professionalType === 'pedagogo' ? 'Alunos' : 'Pacientes'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gerencie {professionalType === 'pedagogo' ? 'seus alunos' : 'seus pacientes'} e acompanhe o progresso
                  </p>
                </div>
                <button
                  onClick={handleNewPatient}
                  className="px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  <Plus size={20} />
                  <span>Novo {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={`Buscar ${professionalType === 'pedagogo' ? 'alunos' : 'pacientes'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: getProfessionalColor() }}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                  style={{ focusRingColor: getProfessionalColor() }}
                >
                  <option value="all">Todos os status</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                  <option value="pending">Pendentes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                      {patients.length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: getProfessionalColor() }}>
                    <User size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ativos</p>
                    <p className="text-xl font-bold text-green-600">
                      {patients.filter(p => p.status === 'active').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500">
                    <Calendar size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {patients.filter(p => p.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-500">
                    <Calendar size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Inativos</p>
                    <p className="text-xl font-bold text-gray-600">
                      {patients.filter(p => p.status === 'inactive').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-500">
                    <User size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  style={{ border: `2px solid ${getProfessionalColor()}` }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                        style={{ backgroundColor: getProfessionalColor() }}
                      >
                        {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{patient.name}</h3>
                        <p className="text-xs text-gray-600">{patient.age} anos</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}
                    >
                      {getStatusText(patient.status)}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Mail size={12} />
                      <span className="truncate">{patient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Phone size={12} />
                      <span>{patient.phone}</span>
                    </div>
                  </div>

                  {/* Tutor Info */}
                  <div className="space-y-1 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Users size={12} />
                      <span className="font-medium">Tutor: {patient.tutor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Phone size={12} />
                      <span>{patient.tutor.phone}</span>
                    </div>
                  </div>

                  {/* Sessions Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Última sessão:</span>
                      <span className="font-medium">
                        {new Date(patient.lastSession).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Próxima sessão:</span>
                      <span className="font-medium" style={{ color: getProfessionalColor() }}>
                        {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
