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
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-white)' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {professionalType === 'psiquiatra' ? 'Consultas' : 'Sessões'}
            </h1>
            <p className="text-gray-600">
              Gerencie suas {professionalType === 'psiquiatra' ? 'consultas' : 'sessões'} e acompanhe o progresso
            </p>
          </div>
          <button
            onClick={handleNewSession}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus size={20} />
            <span>Nova {professionalType === 'psiquiatra' ? 'Consulta' : 'Sessão'}</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={`Buscar ${professionalType === 'psiquiatra' ? 'consultas' : 'sessões'}...`}
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
            <option value="completed">Concluídas</option>
            <option value="pending">Pendentes</option>
            <option value="cancelled">Canceladas</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={{ focusRingColor: colors.primary }}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                {sessions.length}
              </p>
            </div>
            <Calendar size={24} style={{ color: colors.primary }} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-green-600">
                {sessions.filter(s => s.status === 'completed').length}
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
                {sessions.filter(s => s.status === 'pending').length}
              </p>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Canceladas</p>
              <p className="text-2xl font-bold text-red-600">
                {sessions.filter(s => s.status === 'cancelled').length}
              </p>
            </div>
            <Calendar size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => (
          <SessionCard
            key={session.id}
            professionalType={session.professionalType}
            session={session}
            onEdit={() => handleEditSession(session.id)}
            onView={() => handleViewSession(session.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
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
      )}
    </div>
  );
};
