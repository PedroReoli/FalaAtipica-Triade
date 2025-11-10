"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/atoms/Container"
import { Heading } from "@/components/atoms/Heading"
import { Text } from "@/components/atoms/Text"
import { Navbar } from "@/components/layout/Navbar"
import { ClipboardCheck, Clock, Target, Heart, Star } from "lucide-react"
import { submitUsabilidadeForm, validateUsabilidadeFormData, formatUsabilidadeFormData } from "@/services/usabilidadeFormService"
import { UsabilidadeFormData } from "@/config/usabilidadeFormConfig"
import { useToast } from "@/hooks/useToast"
import { ToastContainer } from "@/components/atoms/Toast"

export default function UsabilidadePage() {
  const [formData, setFormData] = useState<UsabilidadeFormData>({
    nome: "",
    email: "",
    usoFrequencia: "",
    sistemaComplexo: "",
    facilidadeUso: "",
    necessidadeSuporte: "",
    funcionalidadesIntegradas: "",
    inconsistenciaInterface: "",
    aprendizadoRapido: "",
    sistemaConfuso: "",
    confiancaUso: "",
    necessidadesAntes: "",
    sugestoes: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toasts, removeToast, showSuccess, showError } = useToast()

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const emailSuggestions = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "empresa.com.br", "clinica.com.br", "escola.com.br"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Autocomplete para email
    if (name === "email" && value.includes("@")) {
      const domain = value.split("@")[1]
      if (domain) {
        const filtered = emailSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(domain.toLowerCase()))
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
    const emailPrefix = formData.email.split("@")[0]
    setFormData((prev) => ({ ...prev, email: `${emailPrefix}@${suggestion}` }))
    setShowSuggestions(false)
  }

  // Função para lidar com Tab no email
  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && showSuggestions && suggestions.length > 0) {
      e.preventDefault()
      const firstSuggestion = suggestions[0]
      const emailPrefix = formData.email.split("@")[0]
      setFormData((prev) => ({ ...prev, email: `${emailPrefix}@${firstSuggestion}` }))
      setShowSuggestions(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    try {
      // Formatar dados
      const formattedData = formatUsabilidadeFormData(formData)

      // Validar dados
      if (!validateUsabilidadeFormData(formattedData)) {
        showError("Campos obrigatórios", "Por favor, responda todas as perguntas.")
        setIsSubmitting(false)
        return
      }

      // Enviar formulário
      const response = await submitUsabilidadeForm(formattedData)

      if (response.success) {
        // Mostrar toast de sucesso
        showSuccess("Questionário enviado!", "Obrigado pela sua participação! Sua opinião é muito importante para nós.")

        // Limpar formulário
        setFormData({
          nome: "",
          email: "",
          usoFrequencia: "",
          sistemaComplexo: "",
          facilidadeUso: "",
          necessidadeSuporte: "",
          funcionalidadesIntegradas: "",
          inconsistenciaInterface: "",
          aprendizadoRapido: "",
          sistemaConfuso: "",
          confiancaUso: "",
          necessidadesAntes: "",
          sugestoes: "",
        })
      } else {
        showError("Erro no envio", response.message || "Erro ao enviar questionário. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      showError("Erro de conexão", "Erro ao enviar questionário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: ClipboardCheck,
      title: "Teste Rápido",
      desc: "Questionário leve e objetivo",
      color: "#1e88e5",
    },
    {
      icon: Clock,
      title: "Menos de 3 Minutos",
      desc: "Sua contribuição é essencial",
      color: "#43a047",
    },
    {
      icon: Target,
      title: "Impacto Real",
      desc: "Ajude a melhorar a experiência",
      color: "#fbc02d",
    },
  ]

  const questions = [
    {
      name: "usoFrequencia",
      label: "Eu acho que usaria o FalaAtípica com frequência.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "sistemaComplexo",
      label: "Achei o sistema desnecessariamente complexo.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "facilidadeUso",
      label: "Achei o FalaAtípica fácil de usar.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "necessidadeSuporte",
      label: "Acho que precisaria de suporte técnico para usar o sistema.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "funcionalidadesIntegradas",
      label: "As funcionalidades estão bem integradas.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "inconsistenciaInterface",
      label: "Achei que havia muita inconsistência na interface.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "aprendizadoRapido",
      label: "Acredito que a maioria das pessoas aprenderia a usar o FalaAtípica rapidamente.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "sistemaConfuso",
      label: "Achei o sistema confuso de usar.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "confiancaUso",
      label: "Senti-me confiante ao usar o sistema.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
    {
      name: "necessidadesAntes",
      label: "Precisei aprender muitas coisas antes de conseguir usar o sistema.",
      options: [
        { value: "1", label: "1 - Discordo totalmente" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5 - Concordo totalmente" },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-[#f4f6ff]">
      {/* Hero - Compacto */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-[#054776] to-[#1e88e5] relative">
        <Navbar />
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
            <Heading level={1} color="white">
              Teste de Usabilidade
            </Heading>

            <Text size="lg" color="white" weight="light" className="max-w-3xl mx-auto">
              Ajude-nos a entender como melhorar a experiência dos usuários e otimizar o desempenho do sistema.
            </Text>
          </motion.div>
        </Container>
      </section>

      {/* Introdução */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 md:p-8 shadow-lg"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#1e88e5]/10">
                <Heart className="w-6 h-6 text-[#1e88e5]" />
              </div>
              <div className="space-y-3">
                <Text size="base" weight="medium" color="primary">
                  Olá!
                </Text>
                <Text size="base" color="gray">
                  Este formulário faz parte de um teste de usabilidade para a plataforma FalaAtípica, um projeto de
                  tecnologia educacional voltado à comunicação de crianças não verbais.
                </Text>
                <Text size="base" color="gray">
                  Sua contribuição é essencial para entendermos como melhorar a experiência dos usuários e otimizar o
                  desempenho do sistema.
                </Text>
                <Text size="base" color="gray">
                  O questionário é rápido e leva menos de 3 minutos.
                </Text>
                <Text size="base" weight="semibold" color="primary">
                  Obrigado por participar!
                </Text>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Benefícios - Compacto */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <div className="grid md:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white border-2 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300"
                style={{ borderColor: benefit.color }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${benefit.color}20` }}
                >
                  <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                </motion.div>
                <Heading level={4} color="primary" className="mb-2 text-base">
                  {benefit.title}
                </Heading>
                <Text size="sm" color="gray">
                  {benefit.desc}
                </Text>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulário */}
      <section className="py-12 bg-[#f4f6ff]">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#1e88e5] rounded-xl p-6 shadow-lg"
          >
            <div className="text-center mb-6">
              <Heading level={2} color="primary">
                Responda ao questionário
              </Heading>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos de identificação */}
              <div className="grid md:grid-cols-2 gap-4 pb-6 border-b-2 border-gray-200">
                <div>
                  <label className="block text-sm font-semibold text-[#054776] mb-1">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-[#054776] mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyDown={handleEmailKeyDown}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none"
                    placeholder="seu@email.com"
                  />

                  {/* Autocomplete para email */}
                  {showSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border-2 border-[#1e88e5] rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto mt-1">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full px-4 py-2 text-left hover:bg-[#1e88e5]/10 transition-colors duration-200"
                        >
                          {formData.email.split("@")[0]}@{suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {questions.map((question, index) => (
                <div key={question.name} className="space-y-3">
                  <label className="block text-sm font-semibold text-[#054776]">
                    {question.label}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {question.options.map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center space-y-2 cursor-pointer px-4 py-3 rounded-lg border-2 transition-all ${
                          formData[question.name as keyof UsabilidadeFormData] === option.value
                            ? "border-[#1e88e5] bg-[#1e88e5]/10"
                            : "border-gray-300 hover:border-[#1e88e5]/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.name}
                          value={option.value}
                          checked={formData[question.name as keyof UsabilidadeFormData] === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <Star
                          className={`w-6 h-6 ${
                            formData[question.name as keyof UsabilidadeFormData] === option.value
                              ? "text-[#fbc02d] fill-current"
                              : "text-gray-400"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium text-center ${
                            formData[question.name as keyof UsabilidadeFormData] === option.value
                              ? "text-[#054776]"
                              : "text-gray-600"
                          }`}
                        >
                          {option.value}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#054776]">
                  Deixe aqui sugestões ou observações sobre sua experiência de uso.
                </label>
                <textarea
                  name="sugestoes"
                  value={formData.sugestoes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#1e88e5] focus:outline-none resize-none"
                  placeholder="Sua opinião é muito importante para nós..."
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                      : "bg-[#1e88e5] text-white hover:bg-[#1976d2] hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Enviando..." : "Enviar Questionário"}
                </button>
              </div>
            </form>
          </motion.div>
        </Container>
      </section>

      {/* Toast Container */}
      <ToastContainer toasts={toasts.map((toast) => ({ ...toast, onClose: removeToast }))} onClose={removeToast} />
    </main>
  )
}
