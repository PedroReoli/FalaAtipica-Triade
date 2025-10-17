"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Users, 
  Copy, 
  Check,
  Clock,
  AlertCircle,
  KeyRound,
  UserPlus2
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { useRoleColor } from "../hooks/useRoleColor"
import { useToast } from "../hooks/useToast"

interface Partnership {
  id: string
  partnerId: string
  partnerName: string
  partnerType: string
  status: 'active'
  createdAt: string
}

interface Token {
  id: string
  token: string
  createdAt: string
  expiresAt: string
  status: 'pending' | 'claimed'
  claimedBy: string | null
  claimedAt: string | null
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const roleColor = useRoleColor()
  const { showToast } = useToast()
  
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showGenerateTokenModal, setShowGenerateTokenModal] = useState(false)
  const [showClaimTokenModal, setShowClaimTokenModal] = useState(false)
  const [generatedToken, setGeneratedToken] = useState('')
  const [claimTokenInput, setClaimTokenInput] = useState('')
  const [copiedToken, setCopiedToken] = useState(false)

  useEffect(() => {
    loadPartnerships()
    loadTokens()
  }, [])

  const loadPartnerships = async () => {
    try {
      const professionalId = professionalData?.id || 'prof_001'
      
      const response = await fetch(`${API_BASE_URL}/pro/partnerships/${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setPartnerships(data.data.partnerships || [])
        }
      } else {
        // Fallback: dados mockados
        setPartnerships([
          {
            id: "partnership_001",
            partnerId: "prof_002",
            partnerName: "Dra. Ana Santos",
            partnerType: "psicologo",
            status: "active",
            createdAt: "2025-01-15T10:30:00.000Z"
          },
          {
            id: "partnership_002",
            partnerId: "prof_003",
            partnerName: "Dr. João Costa",
            partnerType: "fonoaudiologo",
            status: "active",
            createdAt: "2025-01-20T14:20:00.000Z"
          }
        ])
      }
    } catch (error) {
      console.error('Erro ao carregar parcerias:', error)
      // Fallback
      setPartnerships([])
    } finally {
      setIsLoading(false)
    }
  }

  const loadTokens = async () => {
    try {
      const professionalId = professionalData?.id || 'prof_001'
      
      const response = await fetch(`${API_BASE_URL}/pro/my-tokens/${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTokens(data.data.tokens || [])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar tokens:', error)
    }
  }

  const handleGenerateToken = async () => {
    try {
      const professionalId = professionalData?.id || 'prof_001'
      const professionalName = professionalData?.name || 'Profissional'
      
      const response = await fetch(`${API_BASE_URL}/pro/partnership-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          professionalId,
          professionalName,
          professionalType
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setGeneratedToken(data.data.token)
        setShowGenerateTokenModal(true)
        await loadTokens()
        showToast('Token gerado com sucesso!', 'success')
      } else {
        showToast(data.message || 'Erro ao gerar token', 'error')
      }
    } catch (error) {
      console.error('Erro ao gerar token:', error)
      showToast('Erro ao gerar token', 'error')
    }
  }

  const handleClaimToken = async () => {
    if (!claimTokenInput.trim()) {
      showToast('Digite um token válido', 'error')
      return
    }

    try {
      const professionalId = professionalData?.id || 'prof_001'
      const professionalName = professionalData?.name || 'Profissional'
      
      const response = await fetch(`${API_BASE_URL}/pro/claim-partnership`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: claimTokenInput.trim(),
          professionalId,
          professionalName,
          professionalType
        })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        showToast(`Parceria estabelecida com ${data.data.partner.name}!`, 'success')
        setShowClaimTokenModal(false)
        setClaimTokenInput('')
        await loadPartnerships()
      } else {
        showToast(data.message || 'Erro ao reivindicar parceria', 'error')
      }
    } catch (error) {
      console.error('Erro ao reivindicar parceria:', error)
      showToast('Erro ao reivindicar parceria', 'error')
    }
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken)
    setCopiedToken(true)
    showToast('Token copiado!', 'success')
    setTimeout(() => setCopiedToken(false), 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getProfessionalTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      psicologo: 'Psicólogo(a)',
      fonoaudiologo: 'Fonoaudiólogo(a)',
      psiquiatra: 'Psiquiatra',
      pedagogo: 'Pedagogo(a)',
      terapeuta: 'Terapeuta'
    }
    return types[type] || type
  }

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-4">
          {/* Header Card - Configurações */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-6 shadow-sm" style={{ border: `2px solid ${roleColor.primary}` }}>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                  Sistema de Parcerias
                </h1>
                <p className="text-gray-600 mt-1">Conecte-se com outros profissionais de forma simples e segura</p>
              </div>
            </div>
          </div>

          {/* Info Card - Como Funciona */}
          <div className="dashboard-spacing">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-2">Como funciona o sistema de tokens?</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li><strong>Gere um token:</strong> Clique em "Gerar Token de Parceria" e compartilhe com outro profissional</li>
                    <li><strong>Compartilhe:</strong> Envie o token por WhatsApp, email ou qualquer meio de comunicação</li>
                    <li><strong>Parceiro reivindica:</strong> O outro profissional cola o token e clica em "Reivindicar"</li>
                    <li><strong>Pronto!</strong> A parceria é estabelecida instantaneamente ✅</li>
                  </ol>
                  <p className="text-xs text-blue-600 mt-2">💡 Tokens expiram em 7 dias e podem ser usados apenas uma vez.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dashboard-spacing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gerar Token */}
              <button
                onClick={handleGenerateToken}
                className="flex items-center justify-center space-x-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                style={{ border: `2px solid ${roleColor.primary}` }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${roleColor.primary}20` }}
                >
                  <KeyRound className="w-6 h-6" style={{ color: roleColor.primary }} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-lg" style={{ color: "var(--text-black)" }}>
                    Gerar Token de Parceria
                  </h3>
                  <p className="text-sm text-gray-600">Crie um token para compartilhar</p>
                </div>
              </button>

              {/* Reivindicar Token */}
              <button
                onClick={() => setShowClaimTokenModal(true)}
                className="flex items-center justify-center space-x-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                style={{ border: `2px solid ${roleColor.primary}` }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${roleColor.primary}20` }}
                >
                  <UserPlus2 className="w-6 h-6" style={{ color: roleColor.primary }} />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-bold text-lg" style={{ color: "var(--text-black)" }}>
                    Reivindicar Parceria
                  </h3>
                  <p className="text-sm text-gray-600">Use um token recebido</p>
                </div>
              </button>
            </div>
          </div>

          {/* Minhas Parcerias */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-black)" }}>
                Minhas Parcerias ({partnerships.length})
              </h2>
              
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Carregando...</div>
              ) : partnerships.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Nenhuma parceria ainda</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Gere um token ou reivindique uma parceria para começar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {partnerships.map((partnership) => (
                    <div 
                      key={partnership.id} 
                      className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow"
                      style={{ borderColor: roleColor.primary }}
                    >
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: roleColor.primary }}
                        >
                          {partnership.partnerName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{partnership.partnerName}</h4>
                          <p className="text-sm text-gray-600">{getProfessionalTypeLabel(partnership.partnerType)}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>Desde {formatDate(partnership.createdAt)}</span>
                          </div>
                        </div>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                          style={{ 
                            backgroundColor: '#22c55e20', 
                            color: '#16a34a' 
                          }}
                        >
                          Ativo
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Meus Tokens Gerados */}
          {tokens.length > 0 && (
            <div className="dashboard-spacing">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-black)" }}>
                  Tokens Gerados ({tokens.length})
                </h2>
                <div className="space-y-3">
                  {tokens.map((token) => (
                    <div 
                      key={token.id}
                      className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono font-semibold text-gray-700">
                          {token.token}
                        </code>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            token.status === 'claimed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {token.status === 'claimed' ? 'Usado' : 'Pendente'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Criado em {formatDate(token.createdAt)}</span>
                        <span>Expira em {formatDate(token.expiresAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal - Gerar Token */}
      {showGenerateTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${roleColor.primary}20` }}
                >
                  <KeyRound className="w-8 h-8" style={{ color: roleColor.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-black)" }}>
                  Token Gerado! 🎉
                </h3>
                <p className="text-sm text-gray-600">
                  Copie e compartilhe com outro profissional
                </p>
              </div>

              {/* Token Display */}
              <div className="mb-6">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-3">
                  <code className="text-lg font-mono font-bold text-center block break-all" style={{ color: roleColor.primary }}>
                    {generatedToken}
                  </code>
                </div>
                <button
                  onClick={handleCopyToken}
                  className="w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                  style={{ 
                    backgroundColor: copiedToken ? '#22c55e' : roleColor.primary,
                    color: 'white'
                  }}
                >
                  {copiedToken ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copiar Token</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-blue-800">
                  <strong>⏰ Validade:</strong> Este token expira em 7 dias<br />
                  <strong>🔒 Segurança:</strong> Pode ser usado apenas uma vez<br />
                  <strong>📤 Próximo passo:</strong> Envie para outro profissional via WhatsApp, email, etc.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowGenerateTokenModal(false)
                  setGeneratedToken('')
                  setCopiedToken(false)
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Reivindicar Token */}
      {showClaimTokenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${roleColor.primary}20` }}
                >
                  <UserPlus2 className="w-8 h-8" style={{ color: roleColor.primary }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-black)" }}>
                  Reivindicar Parceria
                </h3>
                <p className="text-sm text-gray-600">
                  Cole o token recebido de outro profissional
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Token de Parceria
                </label>
                <input
                  type="text"
                  value={claimTokenInput}
                  onChange={(e) => setClaimTokenInput(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-transparent font-mono text-sm"
                  style={{ focusRing: roleColor.primary }}
                  placeholder="PARCERIA_abc123xyz"
                />
                <p className="text-xs text-gray-500 mt-2">
                  O token possui formato: PARCERIA_xxxxxxxxxxxxx
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowClaimTokenModal(false)
                    setClaimTokenInput('')
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleClaimToken}
                  className="flex-1 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: roleColor.primary }}
                >
                  Reivindicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
