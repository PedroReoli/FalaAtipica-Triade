import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, Phone, Mail, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { ProfessionalType } from '../types';

interface Patient {
  id: string;
  name: string;
  age: number;
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
  const roleColor = useRoleColor();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Dados mockados
  const patients: Patient[] = [
    {
      id: '1',
      name: 'João Silva',
      age: 8,
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
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Dados para o gráfico com cores melhoradas
  const chartData = [
    { 
      name: 'Ativos', 
      value: patients.filter(p => p.status === 'active').length, 
      color: '#22C55E',
      lightColor: '#86EFAC' 
    },
    { 
      name: 'Pendentes', 
      value: patients.filter(p => p.status === 'pending').length, 
      color: '#F59E0B',
      lightColor: '#FCD34D' 
    },
    { 
      name: 'Inativos', 
      value: patients.filter(p => p.status === 'inactive').length, 
      color: '#94A3B8',
      lightColor: '#CBD5E1' 
    }
  ];

  // Custom tooltip para o gráfico
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2" style={{ borderColor: data.payload.color }}>
          <p className="font-semibold" style={{ color: data.payload.color }}>
            {data.name}
          </p>
          <p className="text-sm text-gray-600">
            Total: <span className="font-bold">{data.value}</span>
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / patients.length) * 100).toFixed(1)}% do total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom label para o centro do gráfico
  const renderCenterLabel = () => {
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
        <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold" fill="var(--text-black)">
          {patients.length}
        </tspan>
        <tspan x="50%" dy="1.5em" fontSize="12" fill="#6B7280">
          {professionalType === 'pedagogo' ? 'Alunos' : 'Pacientes'}
        </tspan>
      </text>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

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
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
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
            style={{ backgroundColor: roleColor.primary }}
          >
            <Plus size={20} />
            <span>Novo {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}</span>
          </button>
        </div>
            </div>
          </div>

          {/* Stats and Patients in same row */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Stats Cards - Left Side */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-black)" }}>Estatísticas</h3>
                  
                  {/* Gráfico Interativo */}
                  <div className="mb-4">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                          onMouseEnter={onPieEnter}
                          onMouseLeave={onPieLeave}
                          cursor="pointer"
                        >
                          {chartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={activeIndex === index ? entry.lightColor : entry.color}
                              stroke={entry.color}
                              strokeWidth={activeIndex === index ? 3 : 1}
                              style={{
                                filter: activeIndex === index ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
                                transition: 'all 0.3s ease'
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        {renderCenterLabel()}
                      </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Legenda customizada */}
                    <div className="flex justify-center items-center gap-4 mt-2">
                      {chartData.map((entry, index) => (
                        <div 
                          key={entry.name}
                          className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                          onMouseEnter={() => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                        >
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-xs text-gray-600 font-medium">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border-2 bg-white" style={{ borderColor: roleColor.primary }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                        Resumo
                      </h4>
                      <span className="text-2xl font-bold" style={{ color: roleColor.primary }}>
                        {patients.length}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {professionalType === 'pedagogo' ? 'alunos cadastrados' : 'pacientes cadastrados'}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Ativos */}
                      <div 
                        className="p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer"
                        style={{ 
                          backgroundColor: '#F0FDF4',
                          borderColor: '#22C55E'
                        }}
                        onMouseEnter={() => setActiveIndex(0)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {patients.filter(p => p.status === 'active').length}
                          </div>
                          <div className="text-xs font-medium text-green-700">Ativos</div>
                          <div className="text-xs text-green-600 mt-1">
                            {((patients.filter(p => p.status === 'active').length / patients.length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      {/* Pendentes */}
                      <div 
                        className="p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer"
                        style={{ 
                          backgroundColor: '#FFFBEB',
                          borderColor: '#F59E0B'
                        }}
                        onMouseEnter={() => setActiveIndex(1)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-600 mb-1">
                            {patients.filter(p => p.status === 'pending').length}
                          </div>
                          <div className="text-xs font-medium text-amber-700">Pendentes</div>
                          <div className="text-xs text-amber-600 mt-1">
                            {((patients.filter(p => p.status === 'pending').length / patients.length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>

                      {/* Inativos */}
                      <div 
                        className="p-3 rounded-lg border-2 transition-all duration-300 hover:shadow-md cursor-pointer"
                        style={{ 
                          backgroundColor: '#F8FAFC',
                          borderColor: '#94A3B8'
                        }}
                        onMouseEnter={() => setActiveIndex(2)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-slate-600 mb-1">
                            {patients.filter(p => p.status === 'inactive').length}
                          </div>
                          <div className="text-xs font-medium text-slate-700">Inativos</div>
                          <div className="text-xs text-slate-600 mt-1">
                            {((patients.filter(p => p.status === 'inactive').length / patients.length) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patients List - Right Side */}
              <div className="lg:col-span-3">
        {/* Search and Filters */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-4" style={{ border: `2px solid ${roleColor.primary}` }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder={`Buscar ${professionalType === 'pedagogo' ? 'alunos' : 'pacientes'}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                      />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none w-full sm:w-auto sm:min-w-[140px]"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
            <option value="pending">Pendentes</option>
          </select>
        </div>
      </div>

                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-black)" }}>
                    {professionalType === 'pedagogo' ? 'Alunos' : 'Pacientes'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => handlePatientClick(patient.id)}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  style={{ border: `2px solid ${roleColor.primary}` }}
          >
            {/* Header */}
                  <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{patient.name}</h3>
                        <p className="text-xs text-gray-600">{patient.age} anos</p>
                </div>
              </div>
              <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(patient.status)}`}
              >
                      {patient.status === 'active' && <CheckCircle size={12} />}
                      {patient.status === 'pending' && <Clock size={12} />}
                      {patient.status === 'inactive' && <AlertCircle size={12} />}
                      <span>{getStatusText(patient.status)}</span>
              </span>
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
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Mail size={12} />
                      <span className="truncate">{patient.tutor.email}</span>
              </div>
            </div>

            {/* Sessions Info */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Última:</span>
                      <span className="font-medium text-xs">
                  {new Date(patient.lastSession).toLocaleDateString('pt-BR')}
                </span>
              </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Próxima:</span>
                      <span className="font-medium text-xs" style={{ color: roleColor.primary }}>
                  {new Date(patient.nextSession).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        ))}
                  </div>
                </div>
              </div>
            </div>
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
            <div className="dashboard-spacing">
              <div className="bg-white rounded-xl p-8 shadow-sm text-center" style={{ border: `2px solid ${roleColor.primary}` }}>
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
            style={{ backgroundColor: roleColor.primary }}
          >
            Adicionar {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}
          </button>
              </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};
