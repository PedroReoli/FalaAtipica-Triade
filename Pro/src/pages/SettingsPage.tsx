"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Settings, User, Bell, Shield, Palette, ArrowLeft, Save, Eye, EyeOff } from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData, updateProfessional } = useProfessional()
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    emailReports: true,
    darkMode: false,
    language: "pt-BR",
    timezone: "America/Sao_Paulo"
  })

  const getProfessionalColor = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return "var(--green)"
      case "psicologo":
        return "var(--blue)"
      case "psiquiatra":
        return "var(--red)"
      case "pedagogo":
        return "var(--yellow)"
      case "psicopedagogo":
        return "var(--purple)"
      default:
        return "var(--blue)"
    }
  }

  const handleSaveSettings = () => {
    console.log("Configurações salvas:", settings)
    // Aqui você salvaria as configurações no backend
  }

  const handleLogout = () => {
    // Lógica de logout
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} style={{ color: "var(--text-black)" }} />
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text-black)" }}>
                  Configurações
                </h1>
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Gerencie suas preferências e configurações
                </p>
              </div>
            </div>
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: getProfessionalColor() }}
            >
              <Settings size={20} className="text-white" />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Perfil */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <User size={20} style={{ color: getProfessionalColor() }} />
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                Informações do Perfil
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={professionalData?.name || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={professionalData?.email || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Licença/Registro
                </label>
                <input
                  type="text"
                  value={professionalData?.license || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Especialidade
                </label>
                <input
                  type="text"
                  value={professionalData?.specialty || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Bell size={20} style={{ color: getProfessionalColor() }} />
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                Notificações
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notificações Push</h3>
                  <p className="text-sm text-gray-500">Receber notificações sobre novas sessões e lembretes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Relatórios por Email</h3>
                  <p className="text-sm text-gray-500">Receber relatórios automaticamente por email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailReports}
                    onChange={(e) => setSettings({...settings, emailReports: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Aparência */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Palette size={20} style={{ color: getProfessionalColor() }} />
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                Aparência
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Idioma
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuso Horário
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                  <option value="America/New_York">New York (UTC-5)</option>
                  <option value="Europe/London">London (UTC+0)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Shield size={20} style={{ color: getProfessionalColor() }} />
              <h2 className="text-lg font-semibold" style={{ color: "var(--text-black)" }}>
                Segurança
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alterar Senha
                </label>
                <div className="flex space-x-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <input
                  type="password"
                  placeholder="Confirme a nova senha"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSaveSettings}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: getProfessionalColor() }}
            >
              <Save size={18} />
              <span>Salvar Configurações</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border-2 font-medium transition-colors"
              style={{ borderColor: "var(--red)", color: "var(--red)" }}
            >
              <span>Sair da Conta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
