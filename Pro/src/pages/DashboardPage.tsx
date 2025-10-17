"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  Brain,
  TrendingUp,
  FileText,
  Pill,
  BookOpen,
  Activity,
  Heart,
  Target,
  Filter,
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { ProgressSection, WeeklySchedule, DataSummary } from "../components/dashboardComponents"
import { DashboardWidget } from "../components/morph"
import { useProfessionalMetrics } from "../hooks/useProfessionalMetrics"
import { mockDataService } from "../services/mockDataService"

// Dados mockados para os gráficos
const progressData = [
  { name: "Jan", progress: 65 },
  { name: "Fev", progress: 72 },
  { name: "Mar", progress: 68 },
  { name: "Abr", progress: 75 },
  { name: "Mai", progress: 80 },
  { name: "Jun", progress: 85 },
]

const sessionData = [
  { day: "Seg", sessions: 4 },
  { day: "Ter", sessions: 6 },
  { day: "Qua", sessions: 3 },
  { day: "Qui", sessions: 7 },
  { day: "Sex", sessions: 5 },
  { day: "Sáb", sessions: 2 },
]

// Dados mockados para compromissos
const appointmentsData = [
  { id: "1-0", time: "09:00", patient: "João Silva", type: "sessão", status: "confirmed" as const },
  { id: "2-0", time: "14:30", patient: "Maria Santos", type: "sessão", status: "confirmed" as const },
  { id: "3-1", time: "10:15", patient: "Pedro Costa", type: "sessão", status: "pending" as const },
  { id: "4-1", time: "16:00", patient: "Ana Oliveira", type: "sessão", status: "confirmed" as const },
  { id: "5-2", time: "08:30", patient: "Carlos Lima", type: "sessão", status: "completed" as const },
  { id: "6-2", time: "11:45", patient: "Lucia Ferreira", type: "sessão", status: "confirmed" as const },
  { id: "7-3", time: "13:00", patient: "Roberto Alves", type: "sessão", status: "pending" as const },
  { id: "8-3", time: "15:30", patient: "Fernanda Rocha", type: "sessão", status: "confirmed" as const },
  { id: "9-4", time: "09:45", patient: "Marcos Souza", type: "sessão", status: "confirmed" as const },
  { id: "10-4", time: "14:00", patient: "Patricia Lima", type: "sessão", status: "pending" as const },
  { id: "11-5", time: "10:30", patient: "Ricardo Santos", type: "sessão", status: "confirmed" as const },
]

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week')
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const professionalId = professionalData?.id || 'prof_001';
      const stats = await mockDataService.loadDashboardStats(professionalId);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Configurações específicas por tipo de profissional
  const getProfessionalConfig = () => {
    switch (professionalType) {
      case "fonoaudiologo":
        return {
          title: "Fonoaudiólogo",
          icon: Brain,
          color: "var(--green)",
          stats: [
            {
              title: "Pacientes",
              value: dashboardStats?.totalPatients?.toString() || "24",
              icon: Users,
              color: "var(--green)",
              change: "+12%",
            },
            {
              title: "Sessões",
              value: dashboardStats?.totalSessions?.toString() || "156",
              icon: Calendar,
              color: "var(--green)",
              change: "+8%",
            },
            {
              title: "Progresso",
              value: "78%",
              icon: TrendingUp,
              color: "var(--green)",
              change: "+5%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.pendingReports?.toString() || "42",
              icon: FileText,
              color: "var(--green)",
              change: "+15%",
            },
          ],
        }

      case "psicologo":
        return {
          title: "Psicólogo",
          icon: Heart,
          color: "var(--blue)",
          stats: [
            {
              title: "Pacientes",
              value: "18",
              icon: Users,
              color: "var(--blue)",
              change: "+8%",
            },
            {
              title: "Sessões",
              value: "89",
              icon: Calendar,
              color: "var(--blue)",
              change: "+12%",
            },
            {
              title: "Progresso",
              value: "82%",
              icon: TrendingUp,
              color: "var(--blue)",
              change: "+7%",
            },
            {
              title: "Avaliações",
              value: "31",
              icon: FileText,
              color: "var(--blue)",
              change: "+20%",
            },
          ],
        }

      case "psiquiatra":
        return {
          title: "Psiquiatra",
          icon: Pill,
          color: "var(--red)",
          stats: [
            {
              title: "Pacientes",
              value: "32",
              icon: Users,
              color: "var(--red)",
              change: "+15%",
            },
            {
              title: "Consultas",
              value: "124",
              icon: Calendar,
              color: "var(--red)",
              change: "+18%",
            },
            {
              title: "Prescrições",
              value: "67",
              icon: Pill,
              color: "var(--red)",
              change: "+22%",
            },
            {
              title: "Relatórios",
              value: "28",
              icon: FileText,
              color: "var(--red)",
              change: "+25%",
            },
          ],
        }

      case "pedagogo":
        return {
          title: "Pedagogo",
          icon: BookOpen,
          color: "var(--yellow)",
          stats: [
            {
              title: "Alunos",
              value: "28",
              icon: Users,
              color: "var(--yellow)",
              change: "+15%",
            },
            {
              title: "Sessões",
              value: "142",
              icon: Calendar,
              color: "var(--yellow)",
              change: "+12%",
            },
            {
              title: "Progresso",
              value: "85%",
              icon: TrendingUp,
              color: "var(--yellow)",
              change: "+8%",
            },
            {
              title: "Relatórios",
              value: "38",
              icon: FileText,
              color: "var(--yellow)",
              change: "+20%",
            },
          ],
        }

      case "psicopedagogo":
        return {
          title: "Psicopedagogo",
          icon: Brain,
          color: "var(--purple)",
          stats: [
            {
              title: "Pacientes",
              value: "22",
              icon: Users,
              color: "var(--purple)",
              change: "+10%",
            },
            {
              title: "Sessões",
              value: "98",
              icon: Calendar,
              color: "var(--purple)",
              change: "+8%",
            },
            {
              title: "Progresso",
              value: "78%",
              icon: TrendingUp,
              color: "var(--purple)",
              change: "+6%",
            },
            {
              title: "Avaliações",
              value: "29",
              icon: FileText,
              color: "var(--purple)",
              change: "+18%",
            },
          ],
        }

      default:
        return {
          title: "Profissional",
          icon: Users,
          color: "var(--blue)",
          stats: [],
        }
    }
  }

  const config = getProfessionalConfig()

  // Dados de resumo por período
  const getSummaryData = () => {
    const baseStats = config.stats
    const periodMultiplier = selectedPeriod === 'week' ? 1 : selectedPeriod === 'month' ? 4 : 12
    
    return baseStats.map(stat => ({
      ...stat,
      value: selectedPeriod === 'week' 
        ? stat.value 
        : selectedPeriod === 'month' 
          ? Math.round(parseInt(stat.value) * 1.2).toString()
          : Math.round(parseInt(stat.value) * 1.5).toString()
    }))
  }

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week': return 'Esta Semana'
      case 'month': return 'Este Mês'
      case 'quarter': return 'Este Trimestre'
      default: return 'Este Período'
    }
  }

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      {/* Conteúdo Principal - Sempre ocupa altura total da tela */}
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-2">
          {/* Resumos - Topo */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: `2px solid ${config.color}` }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: "var(--text-black)" }}>
                  Resumos - {getPeriodLabel()}
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-gray-500" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month' | 'quarter')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    style={{ borderColor: config.color }}
                  >
                    <option value="week">Esta Semana</option>
                    <option value="month">Este Mês</option>
                    <option value="quarter">Este Trimestre</option>
                  </select>
                </div>
              </div>
              
              {/* Resumos em Grid Horizontal */}
              <div className="summary-grid">
                {getSummaryData().map((stat, index) => (
                  <div
                    key={index}
                    className="summary-card"
                  >
                    <div className="summary-card-content">
                      <div
                        className="summary-card-icon"
                        style={{ backgroundColor: stat.color }}
                      >
                        <stat.icon size={18} className="text-white" />
                      </div>
                      <div className="summary-card-info">
                        <p className="summary-card-title">{stat.title}</p>
                        {stat.change && <p className="summary-card-change">{stat.change}</p>}
                      </div>
                    </div>
                    <div>
                      <p className="summary-card-value">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layout Principal - Agenda Completa */}
          <div className="dashboard-spacing">
            <WeeklySchedule
              appointments={appointmentsData}
              professionalType={professionalType}
              color={config.color}
              onViewFullCalendar={() => navigate("/full-calendar")}
            />
          </div>

          {/* Seção de Progresso - Abaixo */}
          <div className="dashboard-spacing">
            <ProgressSection
              progressData={progressData}
              sessionData={sessionData}
              professionalType={professionalType}
              color={config.color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
