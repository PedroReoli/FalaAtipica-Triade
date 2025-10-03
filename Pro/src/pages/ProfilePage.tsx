"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Edit, 
  Save, 
  X,
  Shield,
  Key,
  Settings
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "Dr. Ana Silva",
    email: "ana.silva@email.com",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",
    license: "06/123456",
    specialty: "Psicologia Infantil",
    experience: "5 anos",
    education: "Graduação em Psicologia - USP",
    certifications: ["CRP 06/123456", "Especialização em Psicologia Infantil"]
  })
  const [newCertification, setNewCertification] = useState("")
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    console.log("Salvando dados:", formData)
    alert("Perfil atualizado com sucesso!")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: "Dr. Ana Silva",
      email: "ana.silva@email.com",
      phone: "(11) 99999-9999",
      address: "São Paulo, SP",
      license: "06/123456",
      specialty: "Psicologia Infantil",
      experience: "5 anos",
      education: "Graduação em Psicologia - USP",
      certifications: ["CRP 06/123456", "Especialização em Psicologia Infantil"]
    })
    setIsEditing(false)
  }

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }))
      setNewCertification("")
    }
  }

  const handleRemoveCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("A nova senha deve ter pelo menos 6 caracteres!")
      return
    }
    
    console.log("Alterando senha:", passwordData)
    alert("Senha alterada com sucesso!")
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const getProfessionalColor = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return "var(--green)"
      case "psicologo":
        return "var(--blue)"
      case "psiquiatra":
        return "var(--red)"
      default:
        return "var(--blue)"
    }
  }

  const getProfessionalTypeName = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return "Fonoaudiólogo"
      case "psicologo":
        return "Psicólogo"
      case "psiquiatra":
        return "Psiquiatra"
      default:
        return "Profissional"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>
                <p className="text-sm text-gray-600">
                  Gerencie suas informações pessoais e profissionais
                </p>
              </div>
              <div className="flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: getProfessionalColor() }}
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancelar</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: getProfessionalColor() }}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: getProfessionalColor() }}>
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{formData.name}</h2>
                <p className="text-sm text-gray-600">{getProfessionalTypeName()}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{formData.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{formData.address}</span>
                </div>
              </div>
            </div>

            {/* Configurações de Conta */}
            <div className="bg-white rounded-xl p-6 shadow-sm mt-6" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Key className="w-4 h-4" />
                    <span className="text-sm font-medium">Alterar Senha</span>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm font-medium">Parcerias e Convites</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Informações Pessoais */}
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{formData.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{formData.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{formData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  ) : (
                    <p className="text-gray-900 text-sm">{formData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Informações Profissionais */}
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Profissionais</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna 1 - Dados Básicos */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Licença Profissional</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="license"
                        value={formData.license}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm">{formData.license}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm">{formData.specialty}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experiência</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm">{formData.experience}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Formação</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    ) : (
                      <p className="text-gray-900 text-sm">{formData.education}</p>
                    )}
                  </div>
                </div>

                {/* Coluna 2 - Certificações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Certificações</label>
                  
                  {/* Lista de Certificações */}
                  <div className="space-y-2 mb-4">
                    {formData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900 text-sm">{cert}</span>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveCertification(index)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Adicionar Nova Certificação (apenas no modo de edição) */}
                  {isEditing && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        placeholder="Nova certificação..."
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                      />
                      <button
                        onClick={handleAddCertification}
                        className="w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        Adicionar Certificação
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Alterar Senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Alterar Senha</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePasswordSubmit}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Alterar Senha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}