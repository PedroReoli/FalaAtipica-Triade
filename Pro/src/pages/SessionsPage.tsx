import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, ChevronLeft, ChevronRight, Move, Calendar
} from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import type { ProfessionalType } from '../types';
import { mockDataService } from '../services/mockDataService';

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
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);
  const [showDayModal, setShowDayModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [draggedSession, setDraggedSession] = useState<Session | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setIsLoading(true);
      const professionalId = professionalData?.id || 'prof_001';
      const data = await mockDataService.loadSessions(professionalId);
      const loadedSessions = (data.sessions || []).map((s: any) => ({
        ...s,
        professionalType
      }));
      setSessions(loadedSessions);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      setSessions(mockSessions);
    } finally {
      setIsLoading(false);
    }
  };

  // Dados mockados das sessões (fallback)
  const mockSessions: Session[] = [
    {
      id: '1',
      patient: 'João Silva',
      patientId: '1',
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
      patientId: '2',
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
      patientId: '3',
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
      patientId: '4',
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

  // Dados mockados dos pacientes
  const patients = [
    { id: '1', name: 'João Silva', age: 8 },
    { id: '2', name: 'Maria Santos', age: 7 },
    { id: '3', name: 'Pedro Costa', age: 9 },
    { id: '4', name: 'Ana Oliveira', age: 6 }
  ];


  // Funções de navegação do calendário
  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  // Função para obter sessões do dia
  const getSessionsForDate = (date: string) => {
    return sessions.filter(session => session.date === date);
  };

  // Funções de Drag & Drop
  const handleDragStart = (session: Session) => {
    if (!isEditMode) return;
    setDraggedSession(session);
  };

  const handleDragEnd = () => {
    setDraggedSession(null);
    setDragOverDate(null);
  };

  const handleDragOver = (e: React.DragEvent, date: string) => {
    if (!isEditMode || !draggedSession) return;
    e.preventDefault();
    setDragOverDate(date);
  };

  const handleDrop = (e: React.DragEvent, targetDate: string) => {
    if (!isEditMode || !draggedSession) return;
    e.preventDefault();
    
    // Aqui você implementaria a lógica para mover a sessão
    console.log(`Movendo sessão ${draggedSession.id} para ${targetDate}`);
    
    // Simular atualização da sessão
    const updatedSession = { ...draggedSession, date: targetDate };
    console.log('Sessão atualizada:', updatedSession);
    
    setDraggedSession(null);
    setDragOverDate(null);
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  // Função para abrir modal do dia
  const handleDayClick = (date: string) => {
    setSelectedDay(date);
    setShowDayModal(true);
  };

  const closeDayModal = () => {
    setShowDayModal(false);
    setSelectedDay(null);
  };

  // Função de scroll sincronizado
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    
    // Sincronizar scroll de todas as colunas
    const scrollableElements = document.querySelectorAll('.scrollable-column');
    scrollableElements.forEach((element) => {
      if (element !== e.currentTarget) {
        element.scrollTop = scrollTop;
      }
    });
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
              {professionalType === 'psiquiatra' ? 'Consultas' : 'Sessões'}
            </h1>
                  <p className="text-gray-600 mt-1">
                    Calendário de {professionalType === 'psiquiatra' ? 'consultas' : 'sessões'}
            </p>
          </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/full-calendar')}
                    className="px-4 py-2 rounded-lg font-medium transition-colors text-gray-600 bg-gray-100 hover:bg-gray-200"
                  >
                    <Calendar size={18} className="inline mr-2" />
                    Agenda Completa
                  </button>
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isEditMode 
                        ? 'text-white' 
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={{ backgroundColor: isEditMode ? roleColor.primary : undefined }}
                  >
                    <Edit size={18} className="inline mr-2" />
                    {isEditMode ? 'Sair do Modo Edição' : 'Modo Edição'}
                  </button>
          <button
                    onClick={() => setShowNewSessionModal(true)}
                    className="px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
            style={{ backgroundColor: roleColor.primary }}
          >
            <Plus size={20} />
            <span>Nova {professionalType === 'psiquiatra' ? 'Consulta' : 'Sessão'}</span>
          </button>
                </div>
              </div>
            </div>
        </div>

          {/* Controles do Calendário */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigateCalendar('prev')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => navigateCalendar('next')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {viewMode === 'month' && currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    {viewMode === 'week' && `Semana de ${currentDate.toLocaleDateString('pt-BR')}`}
                    {viewMode === 'day' && currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </h2>
          </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'month' 
                        ? 'text-white' 
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={{ backgroundColor: viewMode === 'month' ? roleColor.primary : undefined }}
                  >
                    Mês
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'week' 
                        ? 'text-white' 
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={{ backgroundColor: viewMode === 'week' ? roleColor.primary : undefined }}
                  >
                    Semana
                  </button>
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      viewMode === 'day' 
                        ? 'text-white' 
                        : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                    }`}
                    style={{ backgroundColor: viewMode === 'day' ? roleColor.primary : undefined }}
                  >
                    Dia
                  </button>
                </div>
              </div>
        </div>
      </div>

          {/* Indicador de Drag & Drop */}
          {isEditMode && draggedSession && (
            <div className="dashboard-spacing">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center space-x-2 text-blue-800">
                  <Move size={20} />
                  <span className="font-medium">
                    Arrastando: {draggedSession.patient} - {draggedSession.time}
                  </span>
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  Solte em qualquer dia para mover a sessão
              </p>
            </div>
            </div>
          )}

          {/* Calendário */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              {viewMode === 'month' && (
                <div className="grid grid-cols-7 gap-0">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="p-2 text-center font-semibold text-gray-700 bg-gray-50 border-b border-gray-200 text-sm">
                      {day}
                    </div>
                  ))}
                  {(() => {
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const startDate = new Date(firstDay);
                    startDate.setDate(startDate.getDate() - firstDay.getDay());
                    
                    const days = [];
                    const current = new Date(startDate);
                    
                    for (let i = 0; i < 42; i++) {
                      const daySessions = getSessionsForDate(current.toISOString().split('T')[0]);
                      const isCurrentMonth = current.getMonth() === month;
                      const isToday = current.toDateString() === new Date().toDateString();
                      
                      days.push(
                        <div
                          key={i}
                          className={`p-1 min-h-[80px] border border-gray-200 cursor-pointer ${
                            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                          } ${isToday ? 'bg-blue-50 border-blue-300' : ''} ${
                            dragOverDate === current.toISOString().split('T')[0] ? 'bg-green-100 border-green-300' : ''
                          }`}
                          onDragOver={(e) => handleDragOver(e, current.toISOString().split('T')[0])}
                          onDrop={(e) => handleDrop(e, current.toISOString().split('T')[0])}
                          onDragLeave={handleDragLeave}
                          onClick={() => handleDayClick(current.toISOString().split('T')[0])}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-medium ${
                              isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {current.getDate()}
                            </span>
                            {isEditMode && (
                              <button
                                onClick={() => setShowNewSessionModal(true)}
                                className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            )}
                          </div>
                          <div className="space-y-0.5">
                            {daySessions.slice(0, 2).map((session) => (
                              <div
                                key={session.id}
                                draggable={isEditMode}
                                onDragStart={() => handleDragStart(session)}
                                onDragEnd={handleDragEnd}
                                className={`p-0.5 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                                  session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                } ${isEditMode ? 'cursor-move' : ''} ${
                                  draggedSession?.id === session.id ? 'opacity-50' : ''
                                }`}
                                onClick={() => !isEditMode && navigate(`/sessions/${session.id}`)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-medium truncate text-xs">{session.time}</div>
                                    <div className="truncate text-xs">{session.patient}</div>
                                  </div>
                                  {isEditMode && (
                                    <Move size={8} className="text-gray-500 ml-1" />
                                  )}
                                </div>
                              </div>
                            ))}
                            {daySessions.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{daySessions.length - 2} mais
                              </div>
                            )}
          </div>
        </div>
                      );
                      current.setDate(current.getDate() + 1);
                    }
                    
                    return days;
                  })()}
                </div>
              )}
              
              {viewMode === 'week' && (
                <div className="h-[600px] overflow-hidden">
                  {/* Container único com grid de 8 colunas (1 para horas + 7 para dias) */}
                  <div className="grid grid-cols-8 h-full">
                    {/* Coluna de Horas com scroll */}
                    <div 
                      className="flex flex-col overflow-y-auto scrollable-column" 
                      style={{ maxHeight: '600px' }}
                      onScroll={handleScroll}
                    >
                      <div className="h-12 border-b border-gray-200 flex-shrink-0"></div>
                      {Array.from({ length: 18 }, (_, i) => {
                        const hour = i + 6; // 6h às 23h
                        return (
                          <div key={hour} className="h-12 border-b border-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                            {hour.toString().padStart(2, '0')}:00
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Grid de Dias - 7 colunas */}
                    {(() => {
                      const startOfWeek = new Date(currentDate);
                      const day = startOfWeek.getDay();
                      startOfWeek.setDate(startOfWeek.getDate() - day);
                      
                      const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
                      const weekDays = [];
                      
                      for (let i = 0; i < 7; i++) {
                        const date = new Date(startOfWeek);
                        date.setDate(date.getDate() + i);
                        const dateString = date.toISOString().split('T')[0];
                        const daySessions = getSessionsForDate(dateString);
                        const isToday = date.toDateString() === new Date().toDateString();
                        
                        weekDays.push(
                          <div 
                            key={i} 
                            className={`flex flex-col border-r border-gray-200 ${isToday ? 'bg-blue-50' : 'bg-white'} ${
                              dragOverDate === dateString ? 'bg-green-100 border-green-300' : ''
                            }`}
                            onDragOver={(e) => handleDragOver(e, dateString)}
                            onDrop={(e) => handleDrop(e, dateString)}
                            onDragLeave={handleDragLeave}
                          >
                            {/* Cabeçalho do Dia */}
                            <div className="h-12 border-b border-gray-200 flex items-center justify-between px-2">
            <div>
                                <div className="font-semibold text-gray-900 text-sm">{days[i]}</div>
                                <div className="text-xs text-gray-600">{date.getDate()}</div>
                              </div>
                              {isEditMode && (
                                <button
                                  onClick={() => setShowNewSessionModal(true)}
                                  className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              )}
                            </div>
                            
                            {/* Grid de Horas - Alinhado com a coluna de horas */}
                            <div 
                              className="overflow-y-auto scrollable-column" 
                              style={{ maxHeight: 'calc(100% - 48px)' }}
                              onScroll={handleScroll}
                            >
                              {Array.from({ length: 18 }, (_, hourIndex) => {
                                const hour = hourIndex + 6;
                                const hourSessions = daySessions.filter(session => {
                                  const sessionHour = parseInt(session.time.split(':')[0]);
                                  return sessionHour === hour;
                                });
                                
                                return (
                                  <div key={hour} className="h-12 border-b border-gray-200 relative">
                                    {hourSessions.map((session) => (
                                      <div
                                        key={session.id}
                                        draggable={isEditMode}
                                        onDragStart={() => handleDragStart(session)}
                                        onDragEnd={handleDragEnd}
                                        className={`absolute inset-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                          session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                          session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                          'bg-red-100 text-red-800'
                                        } ${isEditMode ? 'cursor-move' : ''} ${
                                          draggedSession?.id === session.id ? 'opacity-50' : ''
                                        }`}
                                        onClick={() => !isEditMode && navigate(`/sessions/${session.id}`)}
                                      >
                                        <div className="p-1">
                                          <div className="font-medium text-xs">{session.time}</div>
                                          <div className="text-xs truncate">{session.patient}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })}
                            </div>
            </div>
                        );
                      }
                      
                      return weekDays;
                    })()}
          </div>
        </div>
              )}
              
              {viewMode === 'day' && (
                <div className="h-[600px] overflow-hidden">
                  {/* Container único com grid de 2 colunas (1 para horas + 1 para dia) */}
                  <div className="grid grid-cols-2 h-full">
                    {/* Coluna de Horas com scroll */}
                    <div 
                      className="flex flex-col overflow-y-auto scrollable-column" 
                      style={{ maxHeight: '600px' }}
                      onScroll={handleScroll}
                    >
                      <div className="h-12 border-b border-gray-200 flex-shrink-0"></div>
                      {Array.from({ length: 18 }, (_, i) => {
                        const hour = i + 6; // 6h às 23h
                        return (
                          <div key={hour} className="h-12 border-b border-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                            {hour.toString().padStart(2, '0')}:00
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Área do Dia */}
                    <div className="flex flex-col">
                      {(() => {
                        const dateString = currentDate.toISOString().split('T')[0];
                        const daySessions = getSessionsForDate(dateString);
                        
                        return (
                          <div 
                            className={`h-full border border-gray-200 bg-white flex flex-col ${
                              dragOverDate === dateString ? 'bg-green-100 border-green-300' : ''
                            }`}
                            onDragOver={(e) => handleDragOver(e, dateString)}
                            onDrop={(e) => handleDrop(e, dateString)}
                            onDragLeave={handleDragLeave}
                          >
                            {/* Cabeçalho do Dia */}
                            <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
            <div>
                                <div className="font-semibold text-gray-900 text-sm">
                                  {currentDate.toLocaleDateString('pt-BR', { 
                                    weekday: 'long', 
                                    day: 'numeric',
                                    month: 'short'
                                  })}
                                </div>
                              </div>
                              {isEditMode && (
                                <button
                                  onClick={() => setShowNewSessionModal(true)}
                                  className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                                >
                                  <Plus size={10} />
                                </button>
                              )}
            </div>
                            
                            {/* Grid de Horas - Alinhado com a coluna de horas */}
                            {Array.from({ length: 18 }, (_, hourIndex) => {
                              const hour = hourIndex + 6;
                              const hourSessions = daySessions.filter(session => {
                                const sessionHour = parseInt(session.time.split(':')[0]);
                                return sessionHour === hour;
                              });
                              
                              return (
                                <div key={hour} className="h-12 border-b border-gray-200 relative">
                                  {hourSessions.map((session) => (
                                    <div
                                      key={session.id}
                                      draggable={isEditMode}
                                      onDragStart={() => handleDragStart(session)}
                                      onDragEnd={handleDragEnd}
                                      className={`absolute inset-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                        session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      } ${isEditMode ? 'cursor-move' : ''} ${
                                        draggedSession?.id === session.id ? 'opacity-50' : ''
                                      }`}
                                      onClick={() => !isEditMode && navigate(`/sessions/${session.id}`)}
                                    >
                                      <div className="p-1">
                                        <div className="font-medium text-xs">{session.time}</div>
                                        <div className="text-xs truncate">{session.patient}</div>
                                        <div className="text-xs opacity-75">{session.type}</div>
          </div>
        </div>
                                  ))}
                                </div>
                              );
                            })}
            </div>
                        );
                      })()}
          </div>
        </div>
      </div>
              )}
          </div>
        </div>

          {/* Modal do Dia */}
          {showDayModal && selectedDay && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 h-[80vh]" style={{ border: `2px solid ${roleColor.primary}` }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ color: roleColor.primary }}>
                    {new Date(selectedDay).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </h3>
                  <button
                    onClick={closeDayModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>
                
                <div className="h-[calc(80vh-120px)] overflow-hidden">
                  {/* Container único com grid de 2 colunas (1 para horas + 1 para dia) */}
                  <div className="grid grid-cols-[80px_1fr] h-full">
                    {/* Coluna de Horas com largura menor e scroll */}
                    <div 
                      className="flex flex-col overflow-y-auto scrollable-column" 
                      style={{ maxHeight: '600px' }}
                      onScroll={handleScroll}
                    >
                      <div className="h-12 border-b border-gray-200 flex-shrink-0"></div>
                      {Array.from({ length: 18 }, (_, i) => {
                        const hour = i + 6; // 6h às 23h
                        return (
                          <div key={hour} className="h-12 border-b border-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                            {hour.toString().padStart(2, '0')}:00
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Área do Dia */}
                    <div className="flex flex-col">
                      <div 
                        className={`h-full border border-gray-200 bg-white flex flex-col ${
                          dragOverDate === selectedDay ? 'bg-green-100 border-green-300' : ''
                        }`}
                        onDragOver={(e) => handleDragOver(e, selectedDay)}
                        onDrop={(e) => handleDrop(e, selectedDay)}
                        onDragLeave={handleDragLeave}
                      >
                        {/* Cabeçalho do Dia */}
                        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {new Date(selectedDay).toLocaleDateString('pt-BR', { 
                                weekday: 'long', 
                                day: 'numeric',
                                month: 'short'
                              })}
                            </div>
                          </div>
                          {isEditMode && (
                            <button
                              onClick={() => setShowNewSessionModal(true)}
                              className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          )}
                        </div>
                        
                        {/* Grid de Horas - Alinhado com a coluna de horas */}
                        {Array.from({ length: 12 }, (_, hourIndex) => {
                          const hour = hourIndex + 8;
                          const daySessions = getSessionsForDate(selectedDay);
                          const hourSessions = daySessions.filter(session => {
                            const sessionHour = parseInt(session.time.split(':')[0]);
                            return sessionHour === hour;
                          });
                          
                          return (
                            <div key={hour} className="h-12 border-b border-gray-200 relative">
                              {hourSessions.map((session) => (
                                <div
            key={session.id}
                                  draggable={isEditMode}
                                  onDragStart={() => handleDragStart(session)}
                                  onDragEnd={handleDragEnd}
                                  className={`absolute inset-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                    session.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  } ${isEditMode ? 'cursor-move' : ''} ${
                                    draggedSession?.id === session.id ? 'opacity-50' : ''
                                  }`}
                                  onClick={() => !isEditMode && navigate(`/sessions/${session.id}`)}
                                >
                                  <div className="p-1">
                                    <div className="font-medium text-xs">{session.time}</div>
                                    <div className="text-xs truncate">{session.patient}</div>
                                    <div className="text-xs opacity-75">{session.type}</div>
                                  </div>
                                </div>
        ))}
      </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
        </div>
            </div>
          )}

          {/* Modal de Nova Sessão */}
          {showNewSessionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4" style={{ border: `2px solid ${roleColor.primary}` }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold" style={{ color: roleColor.primary }}>
                    Nova Sessão
          </h3>
                  <button
                    onClick={() => setShowNewSessionModal(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  console.log('Nova sessão criada');
                  setShowNewSessionModal(false);
                }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Paciente
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Selecione um paciente</option>
                        {patients.map(patient => (
                          <option key={patient.id} value={patient.id}>
                            {patient.name} ({patient.age} anos)
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Horário
                      </label>
                      <input
                        type="time"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duração (min)
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value={30}>30 minutos</option>
                        <option value={45}>45 minutos</option>
                        <option value={60}>60 minutos</option>
                        <option value={90}>90 minutos</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Sessão
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Sessão de Fonoaudiologia"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
      </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações
                    </label>
                    <textarea
                      placeholder="Observações sobre a sessão..."
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
      </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowNewSessionModal(false)}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
          <button
                      type="submit"
                      className="px-4 py-2 text-white rounded-lg transition-colors"
            style={{ backgroundColor: roleColor.primary }}
          >
                      Agendar Sessão
          </button>
                  </div>
                </form>
              </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};
