import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Award, Edit, Save, X } from 'lucide-react';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useProfessionalColors } from '../hooks/useProfessionalColors';
import { mockAuthService } from '../services/mockAuthService';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { professionalData, currentUser, setCurrentUser } = useProfessional();
  const colors = useProfessionalColors(currentUser?.type || 'psicologo');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '(11) 99999-9999',
    address: 'São Paulo, SP',
    license: currentUser?.license || '',
    specialty: currentUser?.specialty || '',
    experience: '5 anos',
    education: 'Graduação em Psicologia - USP',
    certifications: ['CRP 06/123456', 'Especialização em Psicologia Infantil']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Aqui você salvaria os dados no backend
    console.log('Salvando dados:', formData);
    setIsEditing(false);
    // Simular atualização do usuário
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        name: formData.name,
        email: formData.email,
        license: formData.license,
        specialty: formData.specialty
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '(11) 99999-9999',
      address: 'São Paulo, SP',
      license: currentUser?.license || '',
      specialty: currentUser?.specialty || '',
      experience: '5 anos',
      education: 'Graduação em Psicologia - USP',
      certifications: ['CRP 06/123456', 'Especialização em Psicologia Infantil']
    });
    setIsEditing(false);
  };

  const getProfessionalTypeName = (type: string) => {
    switch (type) {
      case 'fonoaudiologo':
        return 'Fonoaudiólogo';
      case 'psicologo':
        return 'Psicólogo';
      case 'psiquiatra':
        return 'Psiquiatra';
      case 'pedagogo':
        return 'Pedagogo';
      case 'psicopedagogo':
        return 'Psicopedagogo';
      default:
        return 'Profissional';
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--background-white)' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Perfil</h1>
            <p className="text-gray-600">Gerencie suas informações pessoais e profissionais</p>
          </div>
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Save size={20} />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium transition-colors duration-200 hover:bg-gray-50"
                >
                  <X size={20} />
                  <span>Cancelar</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200"
                style={{ backgroundColor: colors.primary }}
              >
                <Edit size={20} />
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                style={{ backgroundColor: colors.primary }}
              >
                {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {currentUser?.name || 'Usuário'}
              </h2>
              <p className="text-gray-600 mb-2">
                {getProfessionalTypeName(currentUser?.type || 'psicologo')}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {currentUser?.specialty || 'Especialidade'}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Award size={16} />
                <span>{currentUser?.license || 'Licença'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <User size={16} />
                    <span>{formData.name}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Mail size={16} />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Phone size={16} />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <MapPin size={16} />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>

              {/* Licença */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licença/Registro
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Award size={16} />
                    <span>{formData.license}</span>
                  </div>
                )}
              </div>

              {/* Especialidade */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidade
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Award size={16} />
                    <span>{formData.specialty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Profissionais</h3>
            
            <div className="space-y-6">
              {/* Experiência */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experiência
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="flex items-center space-x-2 text-gray-900">
                    <Calendar size={16} />
                    <span>{formData.experience}</span>
                  </div>
                )}
              </div>

              {/* Formação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formação
                </label>
                {isEditing ? (
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                    style={{ focusRingColor: colors.primary }}
                  />
                ) : (
                  <div className="text-gray-900">
                    <span>{formData.education}</span>
                  </div>
                )}
              </div>

              {/* Certificações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificações
                </label>
                <div className="space-y-2">
                  {formData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-2 text-gray-900">
                      <Award size={16} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
