import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Users, Phone, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useRoleColor } from '../hooks/useRoleColor';
import { useToast } from '../hooks/useToast';
import { mockDataService } from '../services/mockDataService';

export const NewPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { professionalType, professionalData } = useProfessional();
  const roleColor = useRoleColor();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    // Informações do Paciente
    name: '',
    birthDate: '',
    // Informações do Tutor
    tutorName: '',
    tutorRelationship: '',
    tutorPhone: '',
    tutorEmail: '',
    // Endereço
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // Informações Médicas
    diagnosis: '',
    allergies: '',
    medications: '',
    observations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSaving(true);
      
      // Preparar dados para enviar
      const patientData = {
        nome: formData.name,
        dataNascimento: formData.birthDate,
        idade: calculateAge(formData.birthDate),
        tutor: {
          nome: formData.tutorName,
          relacionamento: formData.tutorRelationship,
          telefone: formData.tutorPhone,
          email: formData.tutorEmail
        },
        endereco: {
          rua: formData.street,
          cidade: formData.city,
          estado: formData.state,
          cep: formData.zipCode
        },
        diagnostico: formData.diagnosis,
        alergias: formData.allergies,
        medicamentos: formData.medications,
        observacoes: formData.observations,
        profissionalId: professionalData?.id || 'prof_001',
        status: 'ativo'
      };
      
      // Salvar via API (com fallback automático)
      const savedPatient = await mockDataService.savePatient(patientData);
      
      showToast('Paciente cadastrado com sucesso!', 'success');
      navigate('/patients');
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      showToast('Erro ao cadastrar paciente', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Header */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/patients')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                      Novo {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Preencha os dados para cadastrar um novo {professionalType === 'pedagogo' ? 'aluno' : 'paciente'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="dashboard-spacing">
            <form onSubmit={handleSubmit}>
              <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
                {/* Informações do Paciente */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <User size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Informações do {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Digite o nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                      />
                    </div>
                  </div>
                </div>

                {/* Informações do Tutor */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <Users size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Informações do Tutor/Responsável
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome do Tutor *
                      </label>
                      <input
                        type="text"
                        name="tutorName"
                        value={formData.tutorName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Digite o nome do tutor"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parentesco *
                      </label>
                      <select
                        name="tutorRelationship"
                        value={formData.tutorRelationship}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                      >
                        <option value="">Selecione</option>
                        <option value="Pai">Pai</option>
                        <option value="Mãe">Mãe</option>
                        <option value="Avô">Avô</option>
                        <option value="Avó">Avó</option>
                        <option value="Tio">Tio</option>
                        <option value="Tia">Tia</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone size={16} className="inline mr-1" />
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="tutorPhone"
                        value={formData.tutorPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-1" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="tutorEmail"
                        value={formData.tutorEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Endereço
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rua e Número
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Rua Exemplo, 123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="São Paulo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="SP"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações Médicas */}
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileText size={20} style={{ color: roleColor.primary }} />
                    <h3 className="text-lg font-semibold" style={{ color: roleColor.primary }}>
                      Informações Médicas
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diagnóstico
                      </label>
                      <input
                        type="text"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Digite o diagnóstico"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Alergias
                      </label>
                      <input
                        type="text"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Nenhuma"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Medicações
                      </label>
                      <input
                        type="text"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Nenhuma"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Observações
                      </label>
                      <textarea
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none resize-none"
                        style={{ focusRingColor: roleColor.primary }}
                        placeholder="Informações adicionais sobre o paciente"
                      />
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => navigate('/patients')}
                    className="px-6 py-3 rounded-lg border-2 font-medium transition-colors"
                    style={{ borderColor: roleColor.primary, color: roleColor.primary }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                    style={{ backgroundColor: roleColor.primary }}
                  >
                    <Save size={18} />
                    <span>Salvar {professionalType === 'pedagogo' ? 'Aluno' : 'Paciente'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


