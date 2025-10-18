import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Clock, Search } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { socketService } from '../services/socketService';
import type { ProfessionalType } from '../types';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // DESABILITADO - Sistema de agenda

interface Session {
  id: string;
  patient: string;
  patientId: string;
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
  const { professionalType, professionalData } = useProfessional();
  const roleColor = useRoleColor();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSessions();
    
    // Socket.IO listeners para atualizações em tempo real
    socketService.on('session-created', (data: any) => {
      console.log('📝 Nova sessão recebida via Socket.IO:', data);
      const professionalId = professionalData?.id || 'prof_001';
      if (data.professionalId === professionalId && data.session) {
        setSessions(prevSessions => [data.session, ...prevSessions]);
      }
    });

    socketService.on('agenda-confirmed', (data: any) => {
      console.log('✅ Agenda confirmada via Socket.IO:', data);
      loadSessions();
    });

    return () => {
      socketService.off('session-created');
      socketService.off('agenda-confirmed');
    };
  }, [professionalData]);

  // DESABILITADO - Sistema de agenda
  /*
  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const professionalId = professionalData?.id || 'prof_001';
      
      console.log('📋 [SESSIONS] professionalData:', professionalData);
      console.log('📋 [SESSIONS] professionalId extraído:', professionalId);
      console.log('📋 [SESSIONS] URL completa:', `${API_BASE_URL}/pro/sessions?professionalId=${professionalId}`);
      
      // APENAS API - SEM FALLBACK PARA MOCKUP
      const response = await fetch(`${API_BASE_URL}/pro/sessions?professionalId=${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ [SESSIONS] Sessões carregadas da API:', data);
        
        if (data.success && data.data.sessions) {
          const loadedSessions = data.data.sessions.map((s: any) => ({
        ...s,
            professionalType: professionalType || 'fonoaudiologo'
      }));
          
          console.log(`📊 [SESSIONS] Total de sessões: ${loadedSessions.length}`);
      setSessions(loadedSessions);
        } else {
          console.warn('⚠️ [SESSIONS] Resposta da API sem sessões');
          setSessions([]);
        }
      } else {
        console.error('❌ [SESSIONS] Erro na resposta da API:', response.status);
        setSessions([]);
      }
    } catch (error) {
      console.error('❌ [SESSIONS] Erro ao carregar sessões:', error);
      setSessions([]);
    } finally {
      setIsLoading(false);
    }
  };
  */

  // Função simplificada - sem agenda por enquanto
  const loadSessions = async () => {
    setIsLoading(true);
    setSessions([]); // Lista vazia por enquanto
    setIsLoading(false);
  };

  // Função para verificar se uma sessão está próxima (nas próximas 2 semanas)
  const isUpcoming = (date: string) => {
    const sessionDate = new Date(date);
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);
    
    return sessionDate >= today && sessionDate <= twoWeeksFromNow;
  };

  // Filtrar e ordenar sessões
  const filteredSessions = sessions
    .filter(session => {
      // Filtro de busca
      const matchesSearch = searchTerm === '' || 
        session.patient.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;

      // Filtro de status
      if (filterStatus === 'pending') return session.status === 'pending';
      if (filterStatus === 'completed') return session.status === 'completed';
      if (filterStatus === 'upcoming') {
        return isUpcoming(session.date) && session.status === 'pending';
      }
      
      return true; // 'all'
    })
    .sort((a, b) => {
      // Ordenar por data (mais recentes primeiro)
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Função para obter cor de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Função para obter texto de status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Agendada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
      {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                       style={{ backgroundColor: roleColor.primary }}>
                    <Calendar size={20} className="text-white" />
                  </div>
          <div>
                    <h1 className="text-xl font-bold" style={{ color: "var(--text-black)" }}>
                      Sessões Agendadas
            </h1>
                    <p className="text-sm text-gray-600 mt-1">
                      Gerencie suas {professionalType === 'psiquiatra' ? 'consultas' : 'sessões'} com pacientes
            </p>
          </div>
                </div>
                  <button
                  onClick={() => navigate('/sessions/new')} 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: roleColor.primary }}
          >
                  <Plus size={18} />
            <span>Nova {professionalType === 'psiquiatra' ? 'Consulta' : 'Sessão'}</span>
          </button>
              </div>
            </div>
        </div>

          {/* Filtros e Busca */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex flex-col md:flex-row gap-4">
                {/* Busca */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar por paciente..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ 
                      '--tw-ring-color': roleColor.primary 
                    } as React.CSSProperties}
                  />
                  </div>

                {/* Filtros */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterStatus('all')} 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'all' 
                        ? 'text-white shadow-sm' 
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={filterStatus === 'all' ? { backgroundColor: roleColor.primary } : {}}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFilterStatus('upcoming')} 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'upcoming' 
                        ? 'text-white shadow-sm' 
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={filterStatus === 'upcoming' ? { backgroundColor: roleColor.primary } : {}}
                  >
                    Próximas
                  </button>
                  <button
                    onClick={() => setFilterStatus('completed')} 
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === 'completed' 
                        ? 'text-white shadow-sm' 
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={filterStatus === 'completed' ? { backgroundColor: roleColor.primary } : {}}
                  >
                    Concluídas
                  </button>
                </div>
              </div>
        </div>
      </div>

          {/* Grid de Sessões */}
            <div className="dashboard-spacing">
            {isLoading ? (
              <div className="bg-white rounded-xl p-8 shadow-sm text-center" style={{ border: `2px solid ${roleColor.primary}` }}>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" 
                       style={{ borderColor: `${roleColor.primary} transparent ${roleColor.primary} ${roleColor.primary}` }} />
                  <span className="text-gray-600">Carregando sessões...</span>
            </div>
            </div>
            ) : filteredSessions.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm text-center" style={{ border: `2px solid ${roleColor.primary}` }}>
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Nenhuma sessão encontrada
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Tente ajustar os filtros de busca' 
                    : 'Comece agendando uma nova sessão com seus pacientes'}
                </p>
                              <button
                  onClick={() => navigate('/sessions/new')}
                  className="px-6 py-3 rounded-lg text-white font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: roleColor.primary }}
                              >
                  <Plus size={18} className="inline mr-2" />
                  Nova Sessão
                              </button>
                          </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSessions.map((session) => (
                              <div
                                key={session.id}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                    style={{ border: `2px solid ${roleColor.primary}` }}
                    onClick={() => {
                      console.log('🔍 Sessão clicada:', session.id);
                      // TODO: Implementar modal de detalhes ou navegar para /sessions/:id
                    }}
                  >
                    {/* Header do Card */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                          style={{ backgroundColor: roleColor.primary }}
                        >
                          {session.patient.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
            <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{session.patient}</h3>
                          <p className="text-xs text-gray-600">{session.type}</p>
                                        </div>
                                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(session.status)}`}>
                        {getStatusText(session.status)}
                      </span>
                    </div>
                    
                    {/* Data e Hora */}
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Calendar size={14} className="text-gray-500" />
                        <span>{formatDate(session.date)}</span>
                                </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Clock size={14} className="text-gray-500" />
                        <span>{session.time} • {session.duration} min</span>
          </div>
        </div>

                    {/* Notas (se houver) */}
                    {session.notes && session.notes.trim() !== '' && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-600 line-clamp-2">
                          <span className="font-semibold">Obs:</span> {session.notes}
                        </p>
                          </div>
                    )}
                                </div>
        ))}
        </div>
      )}
          </div>
        </div>
      </div>
    </div>
  );
};
