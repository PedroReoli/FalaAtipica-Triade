"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Building2, 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  Bell, 
  Globe, 
  Save,
  Plus,
  X,
  Check,
  Clock,
  AlertCircle
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"

interface Partnership {
  id: string
  name: string
  type: 'clinic' | 'partnership'
  members: number
  status: 'active' | 'pending' | 'invited'
  createdBy: string
  createdAt: string
}

interface Invite {
  id: string
  email: string
  professionalType: string
  status: 'pending' | 'accepted' | 'declined'
  sentAt: string
  expiresAt: string
}

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [activeTab, setActiveTab] = useState<'partnerships' | 'invites'>('partnerships')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showPartnershipModal, setShowPartnershipModal] = useState(false)
  const [newInvite, setNewInvite] = useState({
    email: '',
    professionalType: '',
    message: ''
  })
  const [newPartnership, setNewPartnership] = useState({
    name: '',
    type: 'clinic' as 'clinic' | 'partnership',
    description: ''
  })

  // Dados mockados
  const partnerships: Partnership[] = [
    {
      id: "1",
      name: "Clínica Psicológica Central",
      type: "clinic",
      members: 5,
      status: "active",
      createdBy: "Dr. Ana Silva",
      createdAt: "2024-01-15"
    },
    {
      id: "2", 
      name: "Parceria com Dr. Carlos Santos",
      type: "partnership",
      members: 2,
      status: "active",
      createdBy: "Dr. Ana Silva",
      createdAt: "2024-01-20"
    }
  ]

  const invites: Invite[] = [
    {
      id: "1",
      email: "maria.psicologa@email.com",
      professionalType: "psicologo",
      status: "pending",
      sentAt: "2024-01-25",
      expiresAt: "2024-02-01"
    },
    {
      id: "2",
      email: "joao.fono@email.com", 
      professionalType: "fonoaudiologo",
      status: "accepted",
      sentAt: "2024-01-20",
      expiresAt: "2024-01-27"
    }
  ]

  const handleInviteSubmit = () => {
    // Simular envio de convite por email
    const inviteData = {
      ...newInvite,
      id: Date.now().toString(),
      status: 'pending',
      sentAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias
    }
    
    console.log("Enviando convite por email:", inviteData)
    
    // Simular feedback visual
    alert(`Convite enviado para ${newInvite.email}!\n\nO profissional receberá um email com instruções para aceitar o convite.`)
    
    setShowInviteModal(false)
    setNewInvite({ email: '', professionalType: '', message: '' })
  }

  const handlePartnershipSubmit = () => {
    console.log("Criando parceria:", newPartnership)
    setShowPartnershipModal(false)
    setNewPartnership({ name: '', type: 'clinic', description: '' })
  }

  const handleAcceptInvite = (inviteId: string) => {
    console.log("Aceitando convite:", inviteId)
    alert("Convite aceito! O profissional foi adicionado à parceria.")
  }

  const handleDeclineInvite = (inviteId: string) => {
    console.log("Recusando convite:", inviteId)
    alert("Convite recusado.")
  }

  const handleCancelInvite = (inviteId: string) => {
    console.log("Cancelando convite:", inviteId)
    alert("Convite cancelado.")
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "invited":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "declined":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "invited":
        return "Convidado"
      case "accepted":
        return "Aceito"
      case "declined":
        return "Recusado"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
            <p className="text-sm text-gray-600">
              Gerencie seu perfil, parcerias e convites
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('partnerships')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'partnerships'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Parcerias
            </button>
            <button
              onClick={() => setActiveTab('invites')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'invites'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Convites
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        

        {/* Parcerias Tab */}
        {activeTab === 'partnerships' && (
          <div className="space-y-6">
            {/* Header com Botão */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Parcerias e Clínicas</h3>
                <p className="text-sm text-gray-600">Gerencie suas parcerias profissionais</p>
              </div>
              <button
                onClick={() => setShowPartnershipModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <Plus className="w-4 h-4" />
                <span>Nova Parceria</span>
              </button>
            </div>

            {/* Lista de Parcerias */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {partnerships.map((partnership) => (
                <div key={partnership.id} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: getProfessionalColor() }}>
                        {partnership.type === 'clinic' ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{partnership.name}</h4>
                        <p className="text-xs text-gray-600">{partnership.type === 'clinic' ? 'Clínica' : 'Parceria'}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(partnership.status)}`}>
                      {getStatusText(partnership.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-xs text-gray-600">
                      <Users className="w-3 h-3 mr-2" />
                      <span>{partnership.members} membros</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <User className="w-3 h-3 mr-2" />
                      <span>Criado por {partnership.createdBy}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Criado em {new Date(partnership.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                      Gerenciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Convites Tab */}
        {activeTab === 'invites' && (
          <div className="space-y-6">
            {/* Header com Botão */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Convites Enviados</h3>
                <p className="text-sm text-gray-600">Gerencie os convites para parcerias</p>
              </div>
              <button
                onClick={() => setShowInviteModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: getProfessionalColor() }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Enviar Convite</span>
              </button>
            </div>

            {/* Informações sobre o Sistema de Email */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Como funciona o sistema de convites</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Quando você envia um convite, o profissional recebe um email com um link para aceitar ou recusar a parceria. 
                    O convite expira em 7 dias. Você pode cancelar convites pendentes a qualquer momento.
                  </p>
                </div>
              </div>
            </div>

            {/* Lista de Convites */}
            <div className="space-y-4">
              {invites.map((invite) => (
                <div key={invite.id} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${getProfessionalColor()}` }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: getProfessionalColor() }}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{invite.email}</h4>
                        <p className="text-xs text-gray-600 capitalize">{invite.professionalType}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invite.status)}`}>
                      {getStatusText(invite.status)}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-2" />
                      <span>Enviado em {new Date(invite.sentAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <AlertCircle className="w-3 h-3 mr-2" />
                      <span>Expira em {new Date(invite.expiresAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {invite.status === 'pending' && 'Aguardando resposta...'}
                      {invite.status === 'accepted' && 'Convite aceito!'}
                      {invite.status === 'declined' && 'Convite recusado'}
                    </div>
                    <div className="flex space-x-2">
                      {invite.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleAcceptInvite(invite.id)}
                            className="text-green-600 hover:text-green-800 text-xs font-medium px-2 py-1 bg-green-50 rounded"
                          >
                            Aceitar
                          </button>
                          <button 
                            onClick={() => handleDeclineInvite(invite.id)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 bg-red-50 rounded"
                          >
                            Recusar
                          </button>
                          <button 
                            onClick={() => handleCancelInvite(invite.id)}
                            className="text-gray-600 hover:text-gray-800 text-xs font-medium px-2 py-1 bg-gray-50 rounded"
                          >
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Convite */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Enviar Convite</h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email do Profissional</label>
                  <input
                    type="email"
                    value={newInvite.email}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="profissional@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Profissional</label>
                  <select
                    value={newInvite.professionalType}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, professionalType: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="psicologo">Psicólogo</option>
                    <option value="fonoaudiologo">Fonoaudiólogo</option>
                    <option value="psiquiatra">Psiquiatra</option>
                    <option value="pedagogo">Pedagogo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem (opcional)</label>
                  <textarea
                    value={newInvite.message}
                    onChange={(e) => setNewInvite(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Conte sobre a parceria..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleInviteSubmit}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Enviar Convite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Parceria */}
      {showPartnershipModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Nova Parceria</h3>
              <button
                onClick={() => setShowPartnershipModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Parceria/Clínica</label>
                  <input
                    type="text"
                    value={newPartnership.name}
                    onChange={(e) => setNewPartnership(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome da clínica ou parceria"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={newPartnership.type}
                    onChange={(e) => setNewPartnership(prev => ({ ...prev, type: e.target.value as 'clinic' | 'partnership' }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="clinic">Clínica</option>
                    <option value="partnership">Parceria Individual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição (opcional)</label>
                  <textarea
                    value={newPartnership.description}
                    onChange={(e) => setNewPartnership(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descreva a parceria..."
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPartnershipModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePartnershipSubmit}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: getProfessionalColor() }}
                >
                  Criar Parceria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}