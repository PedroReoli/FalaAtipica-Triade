import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Smartphone, Mail, Users, Clock, FileText, FolderOpen, History, Activity } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import { uploadCacheService } from '../services/uploadCacheService';

// DESABILITADO - Sistema de agenda
// interface Session {
//   id: string;
//   date: string;
//   duration: number;
//   type: string;
//   notes: string;
//   status: 'completed' | 'scheduled' | 'cancelled';
// }

const PatientDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const colors = useProfessionalColors(professionalType);
  const [activeTab, setActiveTab] = useState<'info' | 'reports' | 'documents' | 'history'>('info');
  const [uploadedReports, setUploadedReports] = useState<any[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);
  const [showEditHistoryModal, setShowEditHistoryModal] = useState(false);
  const [showAddHistoryModal, setShowAddHistoryModal] = useState(false);

  // Carregar arquivos do cache ao montar o componente
  useEffect(() => {
    if (id) {
      const reports = uploadCacheService.getReportsByPatient(id);
      const documents = uploadCacheService.getDocumentsByPatient(id);
      setUploadedReports(reports);
      setUploadedDocuments(documents);

      const stats = uploadCacheService.getCacheStats();
      console.log('📊 [CACHE] Estatísticas:', stats);
    }
  }, [id]);

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

  // DESABILITADO - Sistema de agenda
  // const sessions: Session[] = [
  //   {
  //     id: '1',
  //     date: '2024-01-15',
  //     duration: 60,
  //     type: 'Terapia Individual',
  //     notes: 'Sessão focada em exercícios de articulação.',
  //     status: 'completed'
  //   },
  //   {
  //     id: '2',
  //     date: '2024-01-22',
  //     duration: 60,
  //     type: 'Terapia Individual',
  //     notes: 'Continuação dos exercícios anteriores.',
  //     status: 'scheduled'
  //   }
  // ];

  const handleEdit = () => {
    navigate(`/patients/${id}/edit`);
  };

  const handleDelete = () => {
    navigate(`/patients/${id}/delete`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'report' | 'document') => {
    const files = event.target.files;
    if (files && id) {
      const newFiles = Array.from(files);
      
      // Adicionar cada arquivo ao cache
      const cachedFiles = newFiles.map(file => 
        uploadCacheService.addFile(id, file, type)
      );

      // Atualizar estado local
      if (type === 'report') {
        setUploadedReports(prev => [...cachedFiles, ...prev]);
      } else {
        setUploadedDocuments(prev => [...cachedFiles, ...prev]);
      }

      console.log(`✅ ${newFiles.length} arquivo(s) adicionado(s) ao cache como ${type}`);
    }
  };

  const triggerFileUpload = (inputId: string) => {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleEditHistory = () => {
    setShowEditHistoryModal(true);
  };

  const handleAddHistory = () => {
    setShowAddHistoryModal(true);
  };

  const closeEditHistoryModal = () => {
    setShowEditHistoryModal(false);
  };

  const closeAddHistoryModal = () => {
    setShowAddHistoryModal(false);
  };


  // DESABILITADO - Sistema de agenda
  // const handleViewSession = (sessionId: string) => {
  //   navigate(`/sessions/${sessionId}`);
  // };

  // const handleEditSession = (sessionId: string) => {
  //   navigate(`/sessions/${sessionId}/edit`);
  // };

  // const handleEditSessionReport = (sessionId: string) => {
  //   navigate(`/sessions/${sessionId}/report/edit`);
  // };

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

  // DESABILITADO - Sistema de agenda
  // const getSessionStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'completed':
  //       return 'bg-green-100 text-green-800 border-green-200';
  //     case 'scheduled':
  //       return 'bg-blue-100 text-blue-800 border-blue-200';
  //     case 'cancelled':
  //       return 'bg-red-100 text-red-800 border-red-200';
  //     default:
  //       return 'bg-gray-100 text-gray-800 border-gray-200';
  //   }
  // };

  // const getSessionStatusText = (status: string) => {
  //   switch (status) {
  //     case 'completed':
  //       return 'Realizada';
  //     case 'scheduled':
  //       return 'Agendada';
  //     case 'cancelled':
  //       return 'Cancelada';
  //     default:
  //       return 'Agendada';
  //   }
  // };

  return (
    <>
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
                    title="Editar paciente"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                    style={{ backgroundColor: '#EF4444' }}
                    title="Excluir paciente"
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
                {/* DESABILITADO - Sistema de agenda */}
                {/* <button
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
                </button> */}
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
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'documents'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'documents' ? colors.primary : 'transparent',
                    backgroundColor: activeTab === 'documents' ? colors.primary : 'transparent',
                    color: activeTab === 'documents' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FolderOpen size={18} />
                    <span>Documentos</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 px-6 py-3 font-medium transition-colors ${
                    activeTab === 'history'
                      ? 'border-b-2 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === 'history' ? colors.primary : 'transparent',
                    backgroundColor: activeTab === 'history' ? colors.primary : 'transparent',
                    color: activeTab === 'history' ? 'white' : undefined
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <History size={18} />
                    <span>Histórico</span>
                  </div>
                </button>
              </div>

              <div className="p-6">
                {/* Inputs de arquivo ocultos */}
                <input
                  type="file"
                  id="document-upload"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'document')}
                  className="hidden"
                />
                <input
                  type="file"
                  id="report-upload"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => handleFileUpload(e, 'report')}
                  className="hidden"
                />
                
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
                            <Smartphone size={16} className="text-gray-500" />
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

                {/* DESABILITADO - Sistema de agenda */}
                {/* Tab: Sessões */}
                {/* {activeTab === 'sessions' && (
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
                )} */}

                {/* Tab: Relatórios */}
                {activeTab === 'reports' && (
                  <div className="space-y-6">
                    {/* Arquivos em cache */}
                    {uploadedReports.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-md font-semibold mb-3" style={{ color: colors.primary }}>
                          Relatórios Carregados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {uploadedReports.map((cachedFile) => (
                            <div key={cachedFile.id} className="p-4 border border-green-200 rounded-lg bg-green-50 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <FileText size={24} className="text-green-500" />
                                  <div>
                                    <p className="font-medium text-gray-900">{cachedFile.file.name}</p>
                                    <p className="text-sm text-gray-500">{(cachedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className="text-xs text-gray-400">{new Date(cachedFile.uploadedAt).toLocaleString('pt-BR')}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {cachedFile.url && (
                                    <a 
                                      href={cachedFile.url} 
                                      download={cachedFile.file.name}
                                      className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
                                    >
                                      Download
                                    </a>
                                  )}
                                  <button 
                                    onClick={() => {
                                      uploadCacheService.removeFile(cachedFile.id);
                                      setUploadedReports(prev => prev.filter(f => f.id !== cachedFile.id));
                                    }}
                                    className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                                  >
                                    Remover
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state se não houver uploads */}
                    {uploadedReports.length === 0 && (
                      <div className="text-center py-12">
                        <FileText size={64} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Nenhum relatório carregado
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Faça upload de relatórios para este paciente
                        </p>
                        <button
                          onClick={() => triggerFileUpload('report-upload')}
                          className="px-6 py-3 rounded-lg text-white font-medium transition-colors"
                          style={{ backgroundColor: colors.primary }}
                        >
                          Upload Relatório
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Documentos */}
                {activeTab === 'documents' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                        Documentos e Anexos
                      </h3>
                      <button
                        onClick={() => triggerFileUpload('document-upload')}
                        className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <FolderOpen size={18} className="inline mr-2" />
                        Upload
                      </button>
                    </div>
                    
                    {/* Arquivos em cache */}
                    {uploadedDocuments.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-md font-semibold mb-3" style={{ color: colors.primary }}>
                          Documentos Carregados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {uploadedDocuments.map((cachedFile) => (
                            <div key={cachedFile.id} className="p-4 border border-blue-200 rounded-lg bg-blue-50 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <FileText size={24} className="text-blue-500" />
                                  <div>
                                    <p className="font-medium text-gray-900">{cachedFile.file.name}</p>
                                    <p className="text-sm text-gray-500">{(cachedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <p className="text-xs text-gray-400">{new Date(cachedFile.uploadedAt).toLocaleString('pt-BR')}</p>
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                  {cachedFile.url && (
                                    <a 
                                      href={cachedFile.url} 
                                      download={cachedFile.file.name}
                                      className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors text-center"
                                    >
                                      Download
                                    </a>
                                  )}
                                  <button 
                                    onClick={() => {
                                      uploadCacheService.removeFile(cachedFile.id);
                                      setUploadedDocuments(prev => prev.filter(f => f.id !== cachedFile.id));
                                    }}
                                    className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
                                  >
                                    Remover
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty state se não houver uploads */}
                    {uploadedDocuments.length === 0 && (
                      <div className="text-center py-12">
                        <FolderOpen size={64} style={{ color: '#D1D5DB', margin: '0 auto 16px' }} />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                          Nenhum documento carregado
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Faça upload de documentos para este paciente
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Histórico Médico */}
                {activeTab === 'history' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                        Histórico Médico Detalhado
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleEditHistory}
                          className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Edit2 size={18} className="inline mr-2" />
                          Editar
                        </button>
                        <button
                          onClick={handleAddHistory}
                          className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Activity size={18} className="inline mr-2" />
                          Adicionar Histórico
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Timeline de eventos */}
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                        
                        <div className="relative flex items-start space-x-4 pb-6">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <History size={16} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                              <h4 className="font-semibold text-gray-900">Primeira Consulta</h4>
                              <p className="text-sm text-gray-600">15/01/2024</p>
                              <p className="text-gray-700 mt-2">
                                Paciente apresentou dificuldades na articulação do fonema /r/. 
                                Iniciado processo de avaliação fonoaudiológica.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start space-x-4 pb-6">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Activity size={16} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                              <h4 className="font-semibold text-gray-900">Início do Tratamento</h4>
                              <p className="text-sm text-gray-600">22/01/2024</p>
                              <p className="text-gray-700 mt-2">
                                Iniciadas sessões de terapia fonoaudiológica com foco na 
                                articulação e desenvolvimento da fala.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Clock size={16} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                              <h4 className="font-semibold text-gray-900">Avaliação de Progresso</h4>
                              <p className="text-sm text-gray-600">28/01/2024</p>
                              <p className="text-gray-700 mt-2">
                                Melhora significativa observada na articulação. 
                                Paciente demonstra maior confiança na comunicação.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Modal de Editar Histórico */}
      {showEditHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4" style={{ border: `2px solid ${colors.primary}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Editar Histórico Médico
              </h3>
              <button
                onClick={closeEditHistoryModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Evento
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Primeira Consulta</option>
                  <option>Início do Tratamento</option>
                  <option>Avaliação de Progresso</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="2024-01-15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="Paciente apresentou dificuldades na articulação do fonema /r/. Iniciado processo de avaliação fonoaudiológica."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeEditHistoryModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={closeEditHistoryModal}
                className="px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Adicionar Histórico */}
      {showAddHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4" style={{ border: `2px solid ${colors.primary}` }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Adicionar Novo Evento ao Histórico
              </h3>
              <button
                onClick={closeAddHistoryModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Consulta</option>
                  <option>Exame</option>
                  <option>Tratamento</option>
                  <option>Medicação</option>
                  <option>Procedimento</option>
                  <option>Outro</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título do Evento
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Nova consulta com especialista"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição Detalhada
                </label>
                <textarea
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descreva o evento, observações, resultados, etc."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={closeAddHistoryModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={closeAddHistoryModal}
                className="px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Adicionar Evento
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { PatientDetailsPage };
