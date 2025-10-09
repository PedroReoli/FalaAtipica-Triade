import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, User, FileText, Activity, Target, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';

interface SessionObjective {
  id: string;
  description: string;
  completed: boolean;
}

interface SessionActivity {
  id: string;
  name: string;
  duration: number;
  materials: string[];
  notes: string;
}

interface SessionReport {
  objectives: SessionObjective[];
  activities: SessionActivity[];
  observations: string;
  progress: number;
  behavior: string;
  nextSteps: string[];
  recommendations: string;
  homework: string;
}

export const SessionDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const roleColor = useRoleColor();
  const [activeTab, setActiveTab] = useState<'details' | 'report' | 'notes'>('details');

  // Dados mockados da sessão
  const session = {
    id: id,
    patientId: '1',
    patientName: 'João Silva',
    date: '2024-01-15',
    time: '14:00',
    duration: 60,
    type: 'Terapia Individual',
    status: 'completed',
    professional: {
      name: 'Dr. Ana Santos',
      type: professionalType
    },
    location: 'Consultório 1',
    objectives: [
      { id: '1', description: 'Melhorar articulação do fonema /r/', completed: true },
      { id: '2', description: 'Trabalhar fluência na fala', completed: true },
      { id: '3', description: 'Exercitar coordenação motora oral', completed: false }
    ],
    activities: [
      {
        id: '1',
        name: 'Exercícios de articulação',
        duration: 20,
        materials: ['Espelho', 'Palitos de sorvete', 'Cartões com imagens'],
        notes: 'Paciente demonstrou boa coordenação'
      },
      {
        id: '2',
        name: 'Jogo de palavras',
        duration: 25,
        materials: ['Tabuleiro', 'Dados', 'Cartas'],
        notes: 'Excelente participação e concentração'
      },
      {
        id: '3',
        name: 'Relaxamento',
        duration: 15,
        materials: ['Música relaxante', 'Bola de stress'],
        notes: 'Paciente ficou mais calmo'
      }
    ],
    report: {
      objectives: [
        { id: '1', description: 'Melhorar articulação do fonema /r/', completed: true },
        { id: '2', description: 'Trabalhar fluência na fala', completed: true },
        { id: '3', description: 'Exercitar coordenação motora oral', completed: false }
      ],
      activities: [
        {
          id: '1',
          name: 'Exercícios de articulação',
          duration: 20,
          materials: ['Espelho', 'Palitos de sorvete', 'Cartões com imagens'],
          notes: 'Paciente demonstrou boa coordenação'
        },
        {
          id: '2',
          name: 'Jogo de palavras',
          duration: 25,
          materials: ['Tabuleiro', 'Dados', 'Cartas'],
          notes: 'Excelente participação e concentração'
        }
      ],
      observations: 'Paciente apresentou excelente evolução na sessão. Demonstrou maior confiança e participação ativa em todas as atividades propostas.',
      progress: 75,
      behavior: 'Colaborativo e motivado',
      nextSteps: [
        'Continuar exercícios de articulação em casa',
        'Praticar fluência com leitura em voz alta',
        'Agendar próxima sessão para próxima semana'
      ],
      recommendations: 'Manter rotina de exercícios diários e acompanhar progresso com atividades lúdicas.',
      homework: 'Praticar exercícios de articulação por 15 minutos diários e ler em voz alta por 10 minutos.'
    }
  };

  const handleEdit = () => {
    navigate(`/sessions/${id}/edit`);
  };

  const handleEditReport = () => {
    navigate(`/sessions/${id}/report/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta sessão?')) {
      navigate('/sessions');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Realizada';
      case 'scheduled':
        return 'Agendada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return 'Agendada';
    }
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigate('/sessions')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEdit}
                    className="p-2 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    <Trash2 size={18} className="text-white" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                    Sessão com {session.patientName}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} />
                      <span>{new Date(session.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock size={16} />
                      <span>{session.time} - {session.duration} min</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)}`}
                    >
                      {getStatusText(session.status)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{session.type}</p>
                  <p className="text-sm text-gray-500">{session.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'details'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'details' ? roleColor.primary : 'transparent',
                    backgroundColor: activeTab === 'details' ? roleColor.primary : 'transparent',
                    color: activeTab === 'details' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Activity size={18} />
                    <span>Detalhes</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'report'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'report' ? roleColor.primary : 'transparent',
                    backgroundColor: activeTab === 'report' ? roleColor.primary : 'transparent',
                    color: activeTab === 'report' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FileText size={18} />
                    <span>Relatório</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'notes'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'notes' ? roleColor.primary : 'transparent',
                    backgroundColor: activeTab === 'notes' ? roleColor.primary : 'transparent',
                    color: activeTab === 'notes' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <BookOpen size={18} />
                    <span>Anotações</span>
                  </div>
                </button>
              </div>

              <div className="p-6">
                {/* Tab: Detalhes */}
                {activeTab === 'details' && (
                  <div className="space-y-6">
                    {/* Objetivos */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: roleColor.primary }}>
                        Objetivos da Sessão
                      </h3>
                      <div className="space-y-3">
                        {session.objectives.map((objective) => (
                          <div
                            key={objective.id}
                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex-shrink-0">
                              {objective.completed ? (
                                <CheckCircle size={20} className="text-green-600" />
                              ) : (
                                <AlertCircle size={20} className="text-yellow-600" />
                              )}
                            </div>
                            <span className="flex-1 text-sm">{objective.description}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              objective.completed 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {objective.completed ? 'Concluído' : 'Pendente'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Atividades */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4" style={{ color: roleColor.primary }}>
                        Atividades Realizadas
                      </h3>
                      <div className="space-y-4">
                        {session.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{activity.name}</h4>
                              <span className="text-sm text-gray-600">{activity.duration} min</span>
                            </div>
                            <div className="mb-2">
                              <p className="text-sm text-gray-600 mb-1">Materiais utilizados:</p>
                              <div className="flex flex-wrap gap-1">
                                {activity.materials.map((material, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                  >
                                    {material}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">{activity.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Relatório */}
                {activeTab === 'report' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                        Relatório da Sessão
                      </h3>
                      <button
                        onClick={handleEditReport}
                        className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
                        style={{ backgroundColor: roleColor.primary }}
                      >
                        Editar Relatório
                      </button>
                    </div>

                    {/* Progresso */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Progresso Geral</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${session.report.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {session.report.progress}%
                        </span>
                      </div>
                    </div>

                    {/* Observações */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Observações</h4>
                      <p className="text-sm text-gray-700">{session.report.observations}</p>
                    </div>

                    {/* Comportamento */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Comportamento</h4>
                      <p className="text-sm text-gray-700">{session.report.behavior}</p>
                    </div>

                    {/* Próximos Passos */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Próximos Passos</h4>
                      <ul className="space-y-1">
                        {session.report.nextSteps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recomendações */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Recomendações</h4>
                      <p className="text-sm text-gray-700">{session.report.recommendations}</p>
                    </div>

                    {/* Tarefas para Casa */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-2">Tarefas para Casa</h4>
                      <p className="text-sm text-gray-700">{session.report.homework}</p>
                    </div>
                  </div>
                )}

                {/* Tab: Anotações */}
                {activeTab === 'notes' && (
                  <div className="text-center py-12">
                    <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Anotações da Sessão
                    </h3>
                    <p className="text-gray-600 mb-6">
                      As anotações detalhadas da sessão aparecerão aqui
                    </p>
                    <button
                      onClick={() => navigate(`/sessions/${id}/notes`)}
                      className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: roleColor.primary }}
                    >
                      Ver Anotações
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
