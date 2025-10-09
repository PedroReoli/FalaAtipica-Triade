import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle, User, Calendar, Phone, Mail } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';

export const DeletePatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { professionalType } = useProfessional();
  const roleColor = useRoleColor();
  
  const [confirmationText, setConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Dados mockados do paciente
  const patient = {
    id: id,
    name: 'João Silva',
    age: 8,
    birthDate: '2016-05-15',
    registrationDate: '2024-01-10',
    status: 'active',
    tutor: {
      name: 'Carlos Silva',
      phone: '(11) 99999-8888',
      email: 'carlos.silva@email.com',
      relationship: 'Pai'
    },
    medicalInfo: {
      diagnosis: 'Transtorno de Fala',
      allergies: 'Nenhuma',
      medications: 'Nenhuma'
    },
    sessionsCount: 12,
    lastSession: '2024-01-15'
  };

  const isConfirmationValid = confirmationText.trim() === patient.name;
  const isDeleteDisabled = !isConfirmationValid || isDeleting;

  const handleDelete = async () => {
    if (!isConfirmationValid) return;
    
    setIsDeleting(true);
    
    try {
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Paciente excluído:', patient.id);
      alert('Paciente excluído com sucesso!');
      navigate('/patients');
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      alert('Erro ao excluir paciente. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate(`/patients/${id}`);
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
                  onClick={() => navigate(`/patients/${id}`)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </button>
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle size={20} />
                  <span className="font-medium">Exclusão de Paciente</span>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-2">
                  ⚠️ Exclusão Permanente
                </h1>
                <p className="text-gray-600">
                  Esta ação não pode ser desfeita. Todos os dados do paciente serão removidos permanentemente.
                </p>
              </div>
            </div>
          </div>

          {/* Patient Info */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: roleColor.primary }}>
                Informações do Paciente
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dados Pessoais */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-600">{patient.age} anos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Calendar size={20} className="text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Cadastrado em</p>
                      <p className="font-medium">{new Date(patient.registrationDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                {/* Dados do Tutor */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User size={20} className="text-gray-500" />
                    <div>
                      <p className="font-semibold text-gray-900">{patient.tutor.name}</p>
                      <p className="text-sm text-gray-600">{patient.tutor.relationship}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone size={20} className="text-gray-500" />
                    <p className="text-sm text-gray-600">{patient.tutor.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={20} className="text-gray-500" />
                    <p className="text-sm text-gray-600">{patient.tutor.email}</p>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Dados que serão perdidos:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• {patient.sessionsCount} sessões realizadas</li>
                  <li>• Histórico médico completo</li>
                  <li>• Relatórios e anotações</li>
                  <li>• Documentos anexados</li>
                  <li>• Informações do tutor</li>
                  <li>• Última sessão: {new Date(patient.lastSession).toLocaleDateString('pt-BR')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Confirmation */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-red-200">
              <div className="text-center mb-6">
                <AlertTriangle size={48} className="mx-auto text-red-600 mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Confirmação de Exclusão
                </h3>
                <p className="text-gray-600 mb-4">
                  Para confirmar a exclusão, digite o nome completo do paciente:
                </p>
                <p className="font-semibold text-gray-900 text-lg">
                  "{patient.name}"
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  placeholder="Digite o nome do paciente aqui..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none text-center"
                  style={{
                    focusRingColor: roleColor.primary
                  }}
                />
                
                {confirmationText && !isConfirmationValid && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    Nome incorreto. Digite exatamente: "{patient.name}"
                  </p>
                )}
                
                {isConfirmationValid && (
                  <p className="text-green-600 text-sm mt-2 text-center">
                    ✓ Nome confirmado. Você pode prosseguir com a exclusão.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={isDeleteDisabled}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                    isDeleteDisabled
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Excluindo...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      <span>Excluir Permanentemente</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
