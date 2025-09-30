"use client"

import type React from "react"
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
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
import { ProgressSection, WeeklySchedule, QuickActions, DataSummary } from "../components/dashboardComponents"
import { DashboardWidget } from "../components/morph"
import { useProfessionalMetrics } from "../hooks/useProfessionalMetrics"

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
              value: "24",
              icon: Users,
              color: "var(--green)",
              change: "+12%",
            },
            {
              title: "Sessões",
              value: "156",
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
              value: "42",
              icon: FileText,
              color: "var(--green)",
              change: "+15%",
            },
          ],
          quickActions: [
            {
              title: "Nova Sessão",
              description: "Registrar sessão",
              icon: Calendar,
              color: "var(--green)",
              onClick: () => navigate("/sessions/new"),
            },
            {
              title: "Avaliação",
              description: "Avaliar paciente",
              icon: Activity,
              color: "var(--green)",
              onClick: () => navigate("/assessments"),
            },
            {
              title: "Relatórios",
              description: "Ver relatórios",
              icon: BarChart3,
              color: "var(--green)",
              onClick: () => navigate("/reports"),
            },
            {
              title: "Apps",
              description: "Gerenciar apps",
              icon: Settings,
              color: "var(--green)",
              onClick: () => navigate("/apps"),
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
          quickActions: [
            {
              title: "Nova Sessão",
              description: "Registrar sessão",
              icon: Calendar,
              color: "var(--blue)",
              onClick: () => navigate("/sessions/new"),
            },
            {
              title: "Avaliação",
              description: "Avaliar paciente",
              icon: Target,
              color: "var(--blue)",
              onClick: () => navigate("/assessments"),
            },
            {
              title: "Relatórios",
              description: "Ver relatórios",
              icon: BarChart3,
              color: "var(--blue)",
              onClick: () => navigate("/reports"),
            },
            {
              title: "Apps",
              description: "Gerenciar apps",
              icon: Settings,
              color: "var(--blue)",
              onClick: () => navigate("/apps"),
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
          quickActions: [
            {
              title: "Nova Consulta",
              description: "Registrar consulta",
              icon: Calendar,
              color: "var(--red)",
              onClick: () => navigate("/sessions/new"),
            },
            {
              title: "Medicações",
              description: "Gerenciar meds",
              icon: Pill,
              color: "var(--red)",
              onClick: () => navigate("/medications"),
            },
            {
              title: "Prescrições",
              description: "Ver prescrições",
              icon: BookOpen,
              color: "var(--red)",
              onClick: () => navigate("/prescriptions"),
            },
            {
              title: "Apps",
              description: "Gerenciar apps",
              icon: Settings,
              color: "var(--red)",
              onClick: () => navigate("/apps"),
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
          quickActions: [
            {
              title: "Nova Sessão",
              description: "Registrar sessão",
              icon: Calendar,
              color: "var(--yellow)",
              onClick: () => navigate("/sessions/new"),
            },
            {
              title: "Avaliação",
              description: "Avaliar aluno",
              icon: Activity,
              color: "var(--yellow)",
              onClick: () => navigate("/assessments"),
            },
            {
              title: "Relatórios",
              description: "Ver relatórios",
              icon: BarChart3,
              color: "var(--yellow)",
              onClick: () => navigate("/reports"),
            },
            {
              title: "Apps",
              description: "Gerenciar apps",
              icon: Settings,
              color: "var(--yellow)",
              onClick: () => navigate("/apps"),
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
          quickActions: [
            {
              title: "Nova Sessão",
              description: "Registrar sessão",
              icon: Calendar,
              color: "var(--purple)",
              onClick: () => navigate("/sessions/new"),
            },
            {
              title: "Avaliação",
              description: "Avaliar dificuldades",
              icon: Target,
              color: "var(--purple)",
              onClick: () => navigate("/assessments"),
            },
            {
              title: "Relatórios",
              description: "Ver relatórios",
              icon: BarChart3,
              color: "var(--purple)",
              onClick: () => navigate("/reports"),
            },
            {
              title: "Apps",
              description: "Gerenciar apps",
              icon: Settings,
              color: "var(--purple)",
              onClick: () => navigate("/apps"),
            },
          ],
        }

      default:
        return {
          title: "Profissional",
          icon: Users,
          color: "var(--blue)",
          stats: [],
          quickActions: [],
        }
    }
  }

  const config = getProfessionalConfig()

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "var(--background-white)" }}>
      {/* Conteúdo Principal - Sempre ocupa altura total da tela */}
      <div className="min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="w-full min-h-full flex flex-col space-y-4">
          {/* Ações Rápidas - Topo */}
          <div className="w-full">
            <QuickActions actions={config.quickActions} />
          </div>

          {/* Layout Principal - Resumo e Agenda lado a lado */}
          <div className="w-full grid grid-cols-1 xl:grid-cols-4 gap-4">
            {/* Resumo dos Dados - Esquerda (1/4 da tela) */}
            <div className="xl:col-span-1">
              <DataSummary stats={config.stats} color={config.color} />
            </div>

            {/* Agenda Semanal - Direita (3/4 da tela) */}
            <div className="xl:col-span-3">
              <WeeklySchedule
                appointments={appointmentsData}
                professionalType={professionalType}
                color={config.color}
                onViewFullCalendar={() => navigate("/full-calendar")}
              />
            </div>
          </div>

          {/* Seção de Progresso - Abaixo */}
          <div className="w-full">
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
