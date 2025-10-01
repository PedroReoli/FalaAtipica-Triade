import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Phone, Mail, Users, Clock, FileText, Activity, Eye, MoreHorizontal } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import type { ProfessionalType } from '../types';

interface Session {
  id: string;
  date: string;
  duration: number;
  type: string;
  notes: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

export const PatientDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const colors = useProfessionalColors(professionalType);
  const [activeTab, setActiveTab] = useState<'info' | 'sessions' | 'reports'>('info');

  // Dados mockados do paciente
  const patient = {
    id: id,
    name: 'João Silva',
    age: 8,
    birthDate: '2016-05-15',
    status: 'active',
    registrationDate: '2024-01-10',
    tutor: {
      name: 'Carlos Silva',
      phone: '(11) 99999-8888',
      email: 'carlos.silva@email.com',
      relationship: 'Pai'
    },
    address: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    medicalInfo: {
      diagnosis: 'Transtorno de Fala',
      allergies: 'Nenhuma',
      medications: 'Nenhuma',
      observations: 'Paciente apresenta ótima evolução nas sessões.'
    }
  };

  const sessions: Session[] = [
    {
      id: '1',
      date: '2024-01-15',
      duration: 60,
      type: 'Terapia Individual',
      notes: 'Sessão focada em exercícios de articulação.',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-01-22',
      duration: 60,
      type: 'Terapia Individual',
      notes: 'Continuação dos exercícios anteriores.',
      status: 'scheduled'
    }
  ];

  const handleEdit = () => {
    navigate(`/patients/${id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      navigate('/patients');
    }
  };

  const handleViewSession = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
  };

  const handleEditSession = (sessionId: string) => {
    navigate(`/sessions/${sessionId}/edit`);
  };

  const handleEditSessionReport = (sessionId: string) => {
    navigate(`/sessions/${sessionId}/report/edit`);
  };

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

  const getSessionStatusColor = (status: string) => {
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

  const getSessionStatusText = (status: string) => {
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
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigate('/patients')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </button>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEdit}
                    className="p-2 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: colors.primary }}
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

              <div className="flex items-center space-x-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                  style={{ backgroundColor: colors.primary }}
                >
                  {patient.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                    {patient.name}
                  </h1>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-gray-600">{patient.age} anos</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}
                    >
                      {getStatusText(patient.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl shadow-sm" style={{ border: `2px solid ${colors.primary}` }}>
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'info'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'info' ? colors.primary : 'transparent',
                    backgroundColor: activeTab === 'info' ? colors.primary : 'transparent',
                    color: activeTab === 'info' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Users size={18} />
                    <span>Informações</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'sessions'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'sessions' ? colors.primary : 'transparent',
                    backgroundColor: activeTab === 'sessions' ? colors.primary : 'transparent',
                    color: activeTab === 'sessions' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar size={18} />
                    <span>Sessões</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'reports'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'reports' ? colors.primary : 'transparent',
                    backgroundColor: activeTab === 'reports' ? colors.primary : 'transparent',
                    color: activeTab === 'reports' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FileText size={18} />
                    <span>Relatórios</span>
                  </div>
                </button>
              </div>

              <div className="p-6">
                {/* Tab: Informações */}
                {activeTab === 'info' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Informações Pessoais */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                        Informações Pessoais
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Data de Nascimento</p>
                          <p className="font-medium">{new Date(patient.birthDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Data de Cadastro</p>
                          <p className="font-medium">{new Date(patient.registrationDate).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Endereço</p>
                          <p className="font-medium">{patient.address.street}</p>
                          <p className="text-sm text-gray-600">
                            {patient.address.city} - {patient.address.state}, {patient.address.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Informações do Tutor */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                        Informações do Tutor
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users size={16} className="text-gray-500" />
                            <p className="text-xs text-gray-500">Nome</p>
                          </div>
                          <p className="font-medium">{patient.tutor.name}</p>
                          <p className="text-sm text-gray-600">{patient.tutor.relationship}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Phone size={16} className="text-gray-500" />
                            <p className="text-xs text-gray-500">Telefone</p>
                          </div>
                          <p className="font-medium">{patient.tutor.phone}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <Mail size={16} className="text-gray-500" />
                            <p className="text-xs text-gray-500">Email</p>
                          </div>
                          <p className="font-medium">{patient.tutor.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Informações Médicas */}
                    <div className="md:col-span-2 space-y-4">
                      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
                        Informações Médicas
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Diagnóstico</p>
                          <p className="font-medium">{patient.medicalInfo.diagnosis}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Alergias</p>
                          <p className="font-medium">{patient.medicalInfo.allergies}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Medicações</p>
                          <p className="font-medium">{patient.medicalInfo.medications}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Observações</p>
                          <p className="font-medium">{patient.medicalInfo.observations}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Sessões */}
                {activeTab === 'sessions' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                        Histórico de Sessões
                      </h3>
                      <button
                        onClick={() => navigate('/sessions/new')}
                        className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
                        style={{ backgroundColor: colors.primary }}
                      >
                        Nova Sessão
                      </button>
                    </div>
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: colors.primary }}
                            >
                              <Activity size={18} className="text-white" />
                            </div>
                            <div>
                              <p className="font-semibold">{session.type}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(session.date).toLocaleDateString('pt-BR')} - {session.duration} min
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getSessionStatusColor(session.status)}`}
                            >
                              {getSessionStatusText(session.status)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => handleViewSession(session.id)}
                                className="p-2 rounded-lg text-white transition-colors hover:opacity-80"
                                style={{ backgroundColor: colors.primary }}
                                title="Visualizar sessão"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleEditSession(session.id)}
                                className="p-2 rounded-lg text-white transition-colors hover:opacity-80"
                                style={{ backgroundColor: colors.primary }}
                                title="Editar sessão"
                              >
                                <Edit2 size={16} />
                              </button>
                              {session.status === 'completed' && (
                                <button
                                  onClick={() => handleEditSessionReport(session.id)}
                                  className="p-2 rounded-lg text-white transition-colors hover:opacity-80"
                                  style={{ backgroundColor: colors.primary }}
                                  title="Editar relatório"
                                >
                                  <FileText size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{session.notes}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab: Relatórios */}
                {activeTab === 'reports' && (
                  <div className="text-center py-12">
                    <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nenhum relatório disponível
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Os relatórios gerados para este paciente aparecerão aqui
                    </p>
                    <button
                      onClick={() => navigate('/reports/generate')}
                      className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Gerar Relatório
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


