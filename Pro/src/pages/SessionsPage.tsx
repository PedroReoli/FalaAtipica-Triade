import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Calendar, Clock, User, Edit, Eye } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import { SessionCard } from '../components/morph';
import type { ProfessionalType } from '../types';

interface Session {
  id: string;
  patient: string;
  date: string;
  time: string;
  duration: number;
  status: 'completed' | 'pending' | 'cancelled';
  type: string;
  notes?: string;
  professionalType: ProfessionalType;
}

export const SessionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { professionalType } = useProfessional();
  const colors = useProfessionalColors(professionalType);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDate, setFilterDate] = useState<string>('');

  // Dados mockados
  const sessions: Session[] = [
    {
      id: '1',
      patient: 'João Silva',
      date: '2024-01-22',
      time: '09:00',
      duration: 45,
      status: 'pending',
      type: professionalType === 'fonoaudiologo' ? 'Sessão de Fonoaudiologia' :
            professionalType === 'psicologo' ? 'Sessão de Psicologia' :
            professionalType === 'psiquiatra' ? 'Consulta Psiquiátrica' :
            professionalType === 'pedagogo' ? 'Sessão Pedagógica' :
            'Sessão Psicopedagógica',
      notes: 'Primeira sessão do mês',
      professionalType: professionalType
    },
    {
      id: '2',
      patient: 'Maria Santos',
      date: '2024-01-22',
      time: '10:30',
      duration: 50,
      status: 'completed',
      type: professionalType === 'fonoaudiologo' ? 'Sessão de Fonoaudiologia' :
            professionalType === 'psicologo' ? 'Sessão de Psicologia' :
            professionalType === 'psiquiatra' ? 'Consulta Psiquiátrica' :
            professionalType === 'pedagogo' ? 'Sessão Pedagógica' :
            'Sessão Psicopedagógica',
      notes: 'Sessão de acompanhamento',
      professionalType: professionalType
    },
    {
      id: '3',
      patient: 'Pedro Costa',
      date: '2024-01-23',
      time: '14:00',
      duration: 60,
      status: 'pending',
      type: professionalType === 'fonoaudiologo' ? 'Sessão de Fonoaudiologia' :
            professionalType === 'psicologo' ? 'Sessão de Psicologia' :
            professionalType === 'psiquiatra' ? 'Consulta Psiquiátrica' :
            professionalType === 'pedagogo' ? 'Sessão Pedagógica' :
            'Sessão Psicopedagógica',
      professionalType: professionalType
    },
    {
      id: '4',
      patient: 'Ana Oliveira',
      date: '2024-01-20',
      time: '16:00',
      duration: 45,
      status: 'cancelled',
      type: professionalType === 'fonoaudiologo' ? 'Sessão de Fonoaudiologia' :
            professionalType === 'psicologo' ? 'Sessão de Psicologia' :
            professionalType === 'psiquiatra' ? 'Consulta Psiquiátrica' :
            professionalType === 'pedagogo' ? 'Sessão Pedagógica' :
            'Sessão Psicopedagógica',
      notes: 'Cancelada pelo paciente',
      professionalType: professionalType
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Pendente';
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    const matchesDate = !filterDate || session.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSessionClick = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
  };

  const handleNewSession = () => {
    navigate('/sessions/new');
  };

  const handleEditSession = (sessionId: string) => {
    navigate(`/sessions/${sessionId}/edit`);
  };

  const handleViewSession = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                    {professionalType === 'psiquiatra' ? 'Consultas' : 'Sessões'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Gerencie suas {professionalType === 'psiquiatra' ? 'consultas' : 'sessões'} e acompanhe o progresso
                  </p>
                </div>
                <button
                  onClick={handleNewSession}
                  className="px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Plus size={20} />
                  <span>Nova {professionalType === 'psiquiatra' ? 'Consulta' : 'Sessão'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold" style={{ color: colors.primary }}>
                      {sessions.length}
                    </p>
                  </div>
                  <Calendar size={20} style={{ color: colors.primary }} />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Concluídas</p>
                    <p className="text-xl font-bold text-green-600">
                      {sessions.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                  <Calendar size={20} className="text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pendentes</p>
                    <p className="text-xl font-bold text-yellow-600">
                      {sessions.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <Clock size={20} className="text-yellow-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Canceladas</p>
                    <p className="text-xl font-bold text-red-600">
                      {sessions.filter(s => s.status === 'cancelled').length}
                    </p>
                  </div>
                  <Calendar size={20} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4" style={{ border: `2px solid ${colors.primary}` }}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder={`Buscar ${professionalType === 'psiquiatra' ? 'consultas' : 'sessões'}...`}
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
                  <option value="completed">Concluídas</option>
                  <option value="pending">Pendentes</option>
                  <option value="cancelled">Canceladas</option>
                </select>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none w-full sm:w-auto sm:min-w-[140px]"
                />
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text-black)" }}>
                {professionalType === 'psiquiatra' ? 'Consultas' : 'Sessões'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => handleSessionClick(session.id)}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-2 border-gray-200 hover:border-gray-300"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: colors.primary }}
                        >
                          {session.patient.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{session.patient}</h3>
                          <p className="text-xs text-gray-600">{session.type}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}
                      >
                        {getStatusText(session.status)}
                      </span>
                    </div>

                    {/* Session Info */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Calendar size={12} />
                        <span>{new Date(session.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Clock size={12} />
                        <span>{session.time} - {session.duration} min</span>
                      </div>
                      {session.notes && (
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <User size={12} />
                          <span className="truncate">{session.notes}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewSession(session.id);
                        }}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditSession(session.id);
                        }}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredSessions.length === 0 && (
            <div className="dashboard-spacing">
              <div className="bg-white rounded-xl p-8 shadow-sm text-center" style={{ border: `2px solid ${colors.primary}` }}>
                <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhuma {professionalType === 'psiquiatra' ? 'consulta' : 'sessão'} encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece agendando uma nova sessão'}
                </p>
                <button
                  onClick={handleNewSession}
                  className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200"
                  style={{ backgroundColor: colors.primary }}
                >
                  Agendar {professionalType === 'psiquiatra' ? 'Consulta' : 'Sessão'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
