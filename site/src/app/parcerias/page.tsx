'use client'

import React, { useState } from 'react'
import { Container } from '@/components/atoms/Container'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { Button } from '@/components/atoms/Button'
import { Mail, MapPin, Users, Heart, Search, Edit3 } from 'lucide-react'
import { submitParceriasForm, validateFormData, formatFormData } from '@/services/parceriasFormService'
import { FormData } from '@/config/formConfig'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/atoms/Toast'

export default function ParceriasPage() {
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: '',
    email: '',
    endereco: '',
    telefone: '',
    doQueGostou: '',
    sugestoes: '',
    motivoParceria: ''
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  const [cepValue, setCepValue] = useState('')
  const [addressMode, setAddressMode] = useState<'cep' | 'manual'>('cep')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toasts, removeToast, showSuccess, showError } = useToast()

  const emailSuggestions = [
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'yahoo.com',
    'empresa.com.br',
    'clinica.com.br',
    'escola.com.br'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Autocomplete para email
    if (name === 'email' && value.includes('@')) {
      const domain = value.split('@')[1]
      if (domain) {
        const filtered = emailSuggestions.filter(suggestion => 
          suggestion.toLowerCase().includes(domain.toLowerCase())
        )
        setSuggestions(filtered)
        setShowSuggestions(filtered.length > 0)
      } else {
        setSuggestions(emailSuggestions)
        setShowSuggestions(true)
      }
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const emailPrefix = formData.email.split('@')[0]
    setFormData(prev => ({ ...prev, email: `${emailPrefix}@${suggestion}` }))
    setShowSuggestions(false)
  }

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
    }
    return value
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData(prev => ({ ...prev, telefone: formatted }))
  }

  // Função para buscar CEP
  const buscarCep = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '')
    
    if (cepLimpo.length === 8) {
      setIsLoadingCep(true)
      
      try {
        // Tentar múltiplas APIs de CEP
        const apis = [
          `https://viacep.com.br/ws/${cepLimpo}/json/`,
          `https://cep.awesomeapi.com.br/json/${cepLimpo}`,
          `https://api.postmon.com.br/v1/cep/${cepLimpo}`
        ]

        let enderecoCompleto = ''
        
        for (const api of apis) {
          try {
            const response = await fetch(api)
            const data = await response.json()
            
            if (data && !data.erro) {
              // ViaCEP
              if (data.logradouro) {
                enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
                break
              }
              // AwesomeAPI
              if (data.address) {
                enderecoCompleto = `${data.address}, ${data.district}, ${data.city} - ${data.state}`
                break
              }
              // Postmon
              if (data.logradouro) {
                enderecoCompleto = `${data.logradouro}, ${data.bairro}, ${data.cidade} - ${data.estado}`
                break
              }
            }
          } catch (error) {
            console.log(`API ${api} falhou, tentando próxima...`)
            continue
          }
        }
        
        if (enderecoCompleto) {
          setFormData(prev => ({ ...prev, endereco: enderecoCompleto }))
        } else {
          alert('CEP não encontrado. Verifique o número digitado.')
        }
        
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
        alert('Erro ao buscar CEP. Tente novamente.')
      } finally {
        setIsLoadingCep(false)
      }
    }
  }

  // Função para formatar CEP
  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '')
    return numbers.replace(/(\d{5})(\d)/, '$1-$2')
  }

  // Função para lidar com mudanças no CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = formatCep(e.target.value)
    setCepValue(cep)
    
    // Buscar CEP automaticamente quando tiver 8 dígitos
    if (cep.replace(/\D/g, '').length === 8) {
      buscarCep(cep)
    }
  }

  // Função para lidar com Tab no email
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
      e.preventDefault()
      const firstSuggestion = suggestions[0]
      const emailPrefix = formData.email.split('@')[0]
      setFormData(prev => ({ ...prev, email: `${emailPrefix}@${firstSuggestion}` }))
      setShowSuggestions(false)
    }
  }

  // Função para alternar modo de endereço
  const toggleAddressMode = () => {
    setAddressMode(prev => prev === 'cep' ? 'manual' : 'cep')
    // Limpar campos ao alternar
    setCepValue('')
    setFormData(prev => ({ ...prev, endereco: '' }))
  }

  // Função para lidar com mudanças no input de endereço
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (addressMode === 'cep') {
      const formatted = formatCep(value)
      setCepValue(formatted)
      setFormData(prev => ({ ...prev, endereco: formatted }))
      
      // Buscar CEP automaticamente quando tiver 8 dígitos
      if (formatted.replace(/\D/g, '').length === 8) {
        buscarCep(formatted)
      }
    } else {
      setFormData(prev => ({ ...prev, endereco: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)
    
    try {
      // Formatar dados
      const formattedData = formatFormData(formData)
      
      // Validar dados
      if (!validateFormData(formattedData)) {
        showError(
          'Campos obrigatórios',
          'Por favor, preencha todos os campos obrigatórios corretamente.'
        )
        setIsSubmitting(false)
        return
      }
      
      // Enviar formulário
      const response = await submitParceriasForm(formattedData)
      
      if (response.success) {
        // Mostrar toast de sucesso
        showSuccess(
          'Solicitação enviada!',
          'Sua solicitação de parceria foi enviada com sucesso. Entraremos em contato em breve.'
        )
        
        // Limpar formulário
        setFormData({
          nomeEmpresa: '',
          email: '',
          endereco: '',
          telefone: '',
          doQueGostou: '',
          sugestoes: '',
          motivoParceria: ''
        })
        
        // Limpar CEP
        setCepValue('')
        setAddressMode('cep')
        
      } else {
        showError(
          'Erro no envio',
          response.message || 'Erro ao enviar solicitação. Tente novamente.'
        )
      }
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      showError(
        'Erro de conexão',
        'Erro ao enviar solicitação. Tente novamente ou entre em contato diretamente.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#054776] to-[#1e88e5]">
        <Container maxWidth="lg">
          <div className="text-center space-y-8">
            <Heading level={1} color="white">
              Faça parte da transformação
            </Heading>
            
            <Text size="xl" color="white" weight="light" className="max-w-4xl mx-auto leading-relaxed">
              Junte-se às clínicas, escolas e instituições que estão revolucionando o cuidado 
              com crianças que têm atraso de fala através da tecnologia.
            </Text>
          </div>
        </Container>
      </section>

      {/* Benefícios das Parcerias */}
      <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Heading level={2} color="primary">
                Por que ser nosso parceiro?
              </Heading>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border-3 border-[#1e88e5] rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#1e88e5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-[#1e88e5]" />
                </div>
                <Heading level={3} color="primary" className="mb-4">
                  Impacto Social Real
                </Heading>
                <Text size="base" color="gray" className="leading-relaxed">
                  Contribua diretamente para o desenvolvimento de milhares de crianças 
                  com atraso de fala em todo o Brasil.
                </Text>
              </div>

              <div className="bg-white border-3 border-[#43a047] rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#43a047]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-[#43a047]" />
                </div>
                <Heading level={3} color="secondary" className="mb-4">
                  Tecnologia Inovadora
                </Heading>
                <Text size="base" color="gray" className="leading-relaxed">
                  Acesse ferramentas de ponta desenvolvidas especificamente para 
                  profissionais da área de fonoaudiologia e educação.
                </Text>
              </div>

              <div className="bg-white border-3 border-[#fbc02d] rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
                <div className="w-16 h-16 bg-[#fbc02d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-[#fbc02d]" />
                </div>
                <Heading level={3} color="primary" className="mb-4">
                  Suporte Especializado
                </Heading>
                <Text size="base" color="gray" className="leading-relaxed">
                  Receba treinamento completo e suporte técnico para implementar 
                  o sistema em sua instituição.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </section>

          {/* Formulário de Contato */}
          <section className="py-20 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Heading level={2} color="primary">
                Vamos conversar sobre parceria?
              </Heading>
              <Text size="lg" color="gray" className="max-w-3xl mx-auto">
                Preencha o formulário abaixo e entraremos em contato para discutir 
                como podemos trabalhar juntos.
              </Text>
            </div>

            <div className="bg-gradient-to-br from-[#f4f6ff] to-white border-3 border-[#1e88e5] rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nomeEmpresa" className="block text-sm font-semibold text-[#054776] mb-2">
                      Nome da Empresa/Instituição *
                    </label>
                    <input
                      type="text"
                      id="nomeEmpresa"
                      name="nomeEmpresa"
                      value={formData.nomeEmpresa}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300"
                      placeholder="Ex: Clínica ABC"
                    />
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-semibold text-[#054776] mb-2">
                      Email *
                    </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onKeyDown={handleEmailKeyDown}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300"
                          placeholder="contato@empresa.com"
                        />
                    
                    {/* Autocomplete para email */}
                    {showSuggestions && (
                      <div className="absolute top-full left-0 right-0 bg-white border-2 border-[#1e88e5] rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-2 text-left hover:bg-[#1e88e5]/10 transition-colors duration-200"
                          >
                            {formData.email.split('@')[0]}@{suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                    <div>
                      <label htmlFor="endereco" className="block text-sm font-semibold text-[#054776] mb-2">
                        Endereço *
                      </label>
                      <div className="flex space-x-3">
                        {/* Botão de alternância */}
                        <div className="flex flex-col space-y-2">
                          <button
                            type="button"
                            onClick={toggleAddressMode}
                            className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 flex items-center space-x-2 ${
                              addressMode === 'cep' 
                                ? 'bg-[#1e88e5] text-white border-[#1e88e5]' 
                                : 'bg-white text-[#1e88e5] border-[#1e88e5] hover:bg-[#1e88e5] hover:text-white'
                            }`}
                          >
                            {addressMode === 'cep' ? (
                              <Search className="w-4 h-4" />
                            ) : (
                              <Edit3 className="w-4 h-4" />
                            )}
                            <span className="text-sm font-medium">
                              {addressMode === 'cep' ? 'CEP' : 'Manual'}
                            </span>
                          </button>
                          
                          {addressMode === 'cep' && isLoadingCep && (
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1e88e5]"></div>
                            </div>
                          )}
                        </div>
                        
                        {/* Input de endereço */}
                        <div className="flex-1">
                          <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={addressMode === 'cep' ? cepValue : formData.endereco}
                            onChange={handleAddressChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300"
                            placeholder={
                              addressMode === 'cep' 
                                ? 'Digite o CEP (ex: 20000-000)' 
                                : 'Digite o endereço completo (rua, número, bairro, cidade)'
                            }
                            maxLength={addressMode === 'cep' ? 9 : undefined}
                          />
                          
                          <Text size="sm" color="gray" className="mt-1">
                            {addressMode === 'cep' 
                              ? 'Digite o CEP para preenchimento automático' 
                              : 'Digite o endereço completo manualmente'
                            }
                          </Text>
                        </div>
                      </div>
                    </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-semibold text-[#054776] mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300"
                    placeholder="(21) 99999-9999"
                    maxLength={15}
                  />
                </div>

                <div>
                  <label htmlFor="doQueGostou" className="block text-sm font-semibold text-[#054776] mb-2">
                    Do que gostou no projeto? *
                  </label>
                  <textarea
                    id="doQueGostou"
                    name="doQueGostou"
                    value={formData.doQueGostou}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Conte-nos o que mais chamou sua atenção no FalaAtípica..."
                  />
                </div>

                <div>
                  <label htmlFor="sugestoes" className="block text-sm font-semibold text-[#054776] mb-2">
                    Sugestões
                  </label>
                  <textarea
                    id="sugestoes"
                    name="sugestoes"
                    value={formData.sugestoes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tem alguma sugestão ou ideia para melhorar o projeto?"
                  />
                </div>

                <div>
                  <label htmlFor="motivoParceria" className="block text-sm font-semibold text-[#054776] mb-2">
                    Motivo da parceria *
                  </label>
                  <textarea
                    id="motivoParceria"
                    name="motivoParceria"
                    value={formData.motivoParceria}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Por que deseja fazer uma parceria conosco? Como podemos trabalhar juntos?"
                  />
                </div>

                    <div className="text-center">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`px-6 py-3 text-lg font-medium rounded-lg border-2 transition-all duration-300 ${
                          isSubmitting 
                            ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500 border-gray-300' 
                            : 'bg-[#1e88e5] text-white border-[#1e88e5] hover:bg-[#1976d2] hover:border-[#1976d2] hover:scale-105'
                        }`}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar Solicitação de Parceria'}
                      </button>
                    </div>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="bg-gradient-to-r from-[#054776] to-[#1e88e5] rounded-2xl p-8 text-center">
              <Heading level={3} color="white" className="mb-6">
                Contato Direto
              </Heading>
              
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-center space-x-3">
                      <MapPin className="w-6 h-6 text-white" />
                      <Text color="white" weight="medium">
                        Volta Redonda, RJ
                      </Text>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-3">
                      <Users className="w-6 h-6 text-white" />
                      <Text color="white" weight="medium">
                        Parcerias Disponíveis
                      </Text>
                    </div>
                  </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Toast Container */}
      <ToastContainer toasts={toasts.map(toast => ({ ...toast, onClose: removeToast }))} onClose={removeToast} />
    </main>
  )
}
