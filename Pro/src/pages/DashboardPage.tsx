"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Users,
  Calendar,
  Brain,
  Pill,
  BookOpen,
  Heart,
  Filter,
  FileText,
  Smartphone,
  Settings,
} from "lucide-react"
import { useProfessional } from "../contexts/ProfessionalContext"
// import { ProgressSection } from "../components/dashboardComponents" // DESABILITADO
import { mockDataService } from "../services/mockDataService"

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'; // DESABILITADO - Sistema de agenda

// DESABILITADO - Dados mockados de fallback para gráficos
// const progressData = [
//   { name: "Jan", progress: 65 },
//   { name: "Fev", progress: 72 },
//   { name: "Mar", progress: 68 },
//   { name: "Abr", progress: 75 },
//   { name: "Mai", progress: 80 },
//   { name: "Jun", progress: 85 },
// ]

// const sessionData = [
//   { day: "Seg", sessions: 4 },
//   { day: "Ter", sessions: 6 },
//   { day: "Qua", sessions: 3 },
//   { day: "Qui", sessions: 7 },
//   { day: "Sex", sessions: 5 },
//   { day: "Sáb", sessions: 2 },
// ]

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const { professionalType, professionalData } = useProfessional()
  // const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week') // REMOVIDO - não usado mais
  const [dashboardStats, setDashboardStats] = useState<any>(null)
  // DESABILITADO - Sistema de agenda
  // const [appointments, setAppointments] = useState<any[]>([])
  // const [isLoadingAppointments, setIsLoadingAppointments] = useState(true)

  useEffect(() => {
    loadDashboardData();
    // loadAppointments(); // DESABILITADO - Sistema de agenda
  }, []);

  const loadDashboardData = async () => {
    try {
      const professionalId = professionalData?.id || 'prof_001';
      const stats = await mockDataService.loadDashboardStats(professionalId);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
  };

  // DESABILITADO - Sistema de agenda
  /*
  const loadAppointments = async () => {
    try {
      setIsLoadingAppointments(true);
      const professionalId = professionalData?.id || 'prof_001';
      
      console.log('📅 [DASHBOARD] professionalData:', professionalData);
      console.log('📅 [DASHBOARD] professionalId extraído:', professionalId);
      console.log('📅 [DASHBOARD] URL completa:', `${API_BASE_URL}/pro/sessions?professionalId=${professionalId}`);
      
      // Tentar API primeiro
      const response = await fetch(`${API_BASE_URL}/pro/sessions?professionalId=${professionalId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.sessions) {
          // Converter sessões para formato de appointments
          const appointmentsFromAPI = data.data.sessions
            .filter((s: any) => s.status === 'pending' || s.status === 'completed')
            .slice(0, 10)
            .map((s: any) => ({
              id: s.id,
              time: s.time,
              patient: s.patient,
              type: s.type || 'sessão',
              status: s.status === 'pending' ? 'confirmed' : s.status === 'completed' ? 'completed' : 'pending'
            }));
          
          console.log(`✅ [DASHBOARD] ${appointmentsFromAPI.length} compromissos carregados da API`);
          setAppointments(appointmentsFromAPI);
          return;
        }
      }
      
      throw new Error('API falhou');
    } catch (error) {
      console.warn('⚠️ [DASHBOARD] Erro ao carregar compromissos da API, usando fallback mockado');
      
      // Fallback: dados mockados locais
      const fallbackAppointments = [
        { id: "1", time: "09:00", patient: "João Silva", type: "sessão", status: "confirmed" as const },
        { id: "2", time: "14:30", patient: "Maria Santos", type: "sessão", status: "confirmed" as const },
        { id: "3", time: "10:15", patient: "Pedro Costa", type: "sessão", status: "pending" as const },
        { id: "4", time: "16:00", patient: "Ana Oliveira", type: "sessão", status: "confirmed" as const },
        { id: "5", time: "08:30", patient: "Carlos Lima", type: "sessão", status: "completed" as const },
      ];
      setAppointments(fallbackAppointments);
    } finally {
      setIsLoadingAppointments(false);
    }
  };
  */

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
              value: dashboardStats?.totalPatients?.toString() || "0",
              icon: Users,
              color: "var(--green)",
              change: "+12%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.totalReports?.toString() || "0",
              icon: FileText,
              color: "var(--green)",
              change: "+8%",
            },
            // DESABILITADO - Sistema de agenda
            // {
            //   title: "Sessões",
            //   value: dashboardStats?.totalSessions?.toString() || "0",
            //   icon: Calendar,
            //   color: "var(--green)",
            //   change: "+8%",
            // },
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
              value: dashboardStats?.totalPatients?.toString() || "0",
              icon: Users,
              color: "var(--blue)",
              change: "+8%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.totalReports?.toString() || "0",
              icon: FileText,
              color: "var(--blue)",
              change: "+10%",
            },
            // DESABILITADO - Sistema de agenda
            // {
            //   title: "Sessões",
            //   value: dashboardStats?.totalSessions?.toString() || "0",
            //   icon: Calendar,
            //   color: "var(--blue)",
            //   change: "+12%",
            // },
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
              value: dashboardStats?.totalPatients?.toString() || "0",
              icon: Users,
              color: "var(--red)",
              change: "+15%",
            },
            {
              title: "Consultas",
              value: dashboardStats?.totalSessions?.toString() || "0",
              icon: Calendar,
              color: "var(--red)",
              change: "+18%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.totalReports?.toString() || "0",
              icon: FileText,
              color: "var(--red)",
              change: "+15%",
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
              value: dashboardStats?.totalPatients?.toString() || "0",
              icon: Users,
              color: "var(--yellow)",
              change: "+15%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.totalReports?.toString() || "0",
              icon: FileText,
              color: "var(--yellow)",
              change: "+12%",
            },
            // DESABILITADO - Sistema de agenda
            // {
            //   title: "Sessões",
            //   value: dashboardStats?.totalSessions?.toString() || "0",
            //   icon: Calendar,
            //   color: "var(--yellow)",
            //   change: "+12%",
            // },
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
              value: dashboardStats?.totalPatients?.toString() || "0",
              icon: Users,
              color: "var(--purple)",
              change: "+10%",
            },
            {
              title: "Relatórios",
              value: dashboardStats?.totalReports?.toString() || "0",
              icon: FileText,
              color: "var(--purple)",
              change: "+9%",
            },
            // DESABILITADO - Sistema de agenda
            // {
            //   title: "Sessões",
            //   value: dashboardStats?.totalSessions?.toString() || "0",
            //   icon: Calendar,
            //   color: "var(--purple)",
            //   change: "+8%",
            // },
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


  // Mensagens motivacionais para a semana
  const getMotivationalMessage = () => {
    const messages = [
      "🌟 Esta semana será incrível! Continue fazendo a diferença na vida dos seus pacientes.",
      "💪 Você está transformando vidas todos os dias. Mantenha esse excelente trabalho!",
      "🎯 Cada sessão é uma oportunidade de crescimento. Vamos fazer desta semana a melhor!",
      "✨ Sua dedicação inspira mudanças positivas. Continue sendo essa luz na vida das pessoas!",
      "🚀 Esta semana trará novos desafios e conquistas. Você está preparado para o sucesso!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Dicas de bem-estar
  const getWellnessTip = () => {
    const tips = [
      "🌱 Lembre-se de fazer uma pausa a cada 2 horas de trabalho. Seu bem-estar é fundamental!",
      "💧 Mantenha-se hidratado! Beba água regularmente durante o dia para manter a energia.",
      "🧘‍♀️ Pratique 5 minutos de respiração profunda entre as sessões para recarregar as energias.",
      "🚶‍♂️ Faça uma caminhada de 10 minutos durante o almoço. O movimento ajuda a clarear a mente.",
      "😴 Durma pelo menos 7-8 horas por noite. O descanso é essencial para sua performance.",
      "🍎 Alimente-se de forma equilibrada. Evite pular refeições durante o dia de trabalho.",
      "📱 Desconecte-se do trabalho após o expediente. O tempo de lazer é sagrado!",
      "🌿 Respire ar fresco sempre que possível. Abra as janelas e renove o ambiente."
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  // Dicas profissionais específicas por tipo
  const getProfessionalTip = () => {
    const tips = {
      fonoaudiologo: [
        "🎯 Use exercícios de respiração para ajudar pacientes com ansiedade durante as sessões.",
        "📝 Documente cada progresso, por menor que seja. Isso motiva tanto você quanto o paciente.",
        "🎵 A música pode ser uma ferramenta poderosa para exercícios de fala e linguagem.",
        "👥 Envolva a família nos exercícios. O apoio em casa acelera o progresso.",
        "🎭 Use jogos e brincadeiras para tornar as sessões mais envolventes para crianças."
      ],
      psicologo: [
        "💙 Pratique a escuta ativa. Às vezes, o silêncio é mais poderoso que as palavras.",
        "📊 Mantenha registros detalhados das sessões. Isso ajuda no acompanhamento do progresso.",
        "🤝 Estabeleça limites claros com os pacientes desde o início da terapia.",
        "🔄 Adapte suas técnicas conforme a personalidade e necessidades de cada paciente.",
        "💪 Lembre-se: você não pode resolver todos os problemas, mas pode guiar o caminho."
      ],
      psiquiatra: [
        "⚖️ Equilibre medicação com terapia. O tratamento ideal é sempre multidisciplinar.",
        "📋 Monitore efeitos colaterais regularmente. A comunicação com o paciente é crucial.",
        "🧠 Mantenha-se atualizado com as últimas pesquisas em neurociência e farmacologia.",
        "👨‍👩‍👧‍👦 Considere o contexto familiar e social do paciente nas decisões clínicas.",
        "⏰ Reserve tempo para explicar o tratamento. Pacientes informados aderem melhor."
      ],
      pedagogo: [
        "🎨 Use diferentes métodos de ensino. Cada aluno aprende de uma forma única.",
        "📚 Adapte o conteúdo ao nível de desenvolvimento de cada criança.",
        "🤝 Mantenha comunicação constante com os pais. A parceria é fundamental.",
        "🎯 Estabeleça objetivos claros e mensuráveis para acompanhar o progresso.",
        "💡 Transforme dificuldades em oportunidades de crescimento e aprendizado."
      ],
      psicopedagogo: [
        "🔍 Faça avaliações detalhadas antes de iniciar qualquer intervenção.",
        "🎯 Desenvolva estratégias personalizadas baseadas no perfil de aprendizagem.",
        "📊 Monitore o progresso regularmente e ajuste as estratégias conforme necessário.",
        "👥 Trabalhe em equipe com outros profissionais para um atendimento integral.",
        "💪 Foque nas potencialidades do aluno, não apenas nas dificuldades."
      ]
    };
    
    const professionalTips = tips[professionalType as keyof typeof tips] || tips.fonoaudiologo;
    return professionalTips[Math.floor(Math.random() * professionalTips.length)];
  };

  // Acessos rápidos
  const quickAccessItems = [
    {
      title: "Pacientes",
      description: "Gerencie seus pacientes",
      icon: Users,
      path: "/patients",
      color: "var(--green)"
    },
    {
      title: "Relatórios",
      description: "Visualize relatórios detalhados",
      icon: FileText,
      path: "/reports",
      color: "var(--blue)"
    },
    {
      title: "Apps",
      description: "Gerencie aplicações",
      icon: Smartphone,
      path: "/apps",
      color: "var(--purple)"
    },
    {
      title: "Configurações",
      description: "Ajuste suas preferências",
      icon: Settings,
      path: "/settings",
      color: "var(--gray)"
    }
  ];

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: "var(--background-white)" }}>
      <div className="dashboard-content">
        <div className="w-full min-h-full flex flex-col space-y-6">
          
          {/* Hero Section - Saudação e Mensagem Motivacional */}
          <div className="dashboard-spacing">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 shadow-lg" style={{ border: `3px solid ${config.color}` }}>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "var(--text-black)" }}>
                  Olá, {professionalData?.name || 'Profissional'}! 👋
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
                  {getMotivationalMessage()}
                </p>
                <div className="flex items-center justify-center space-x-2 text-lg text-gray-600">
                  <Calendar size={20} />
                  <span>Bem-vindo à sua semana de trabalho!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dicas de Bem-estar e Profissionais */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-2xl p-6 shadow-lg" style={{ border: `3px solid ${config.color}` }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-black)" }}>
                  Dicas do Dia 💡
                </h2>
                <div className="flex items-center space-x-2">
                  <Brain size={20} className="text-gray-500" />
                  <span className="text-sm text-gray-600">Atualizadas diariamente</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dicas de Bem-estar */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-green-100">
                      <Heart size={24} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-green-800 mb-2">Bem-estar</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getWellnessTip()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dicas Profissionais */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-blue-100">
                      <Brain size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">Profissional</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {getProfessionalTip()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acessos Rápidos */}
          <div className="dashboard-spacing">
            <div className="bg-white rounded-2xl p-6 shadow-lg" style={{ border: `3px solid ${config.color}` }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-black)" }}>
                Acessos Rápidos ⚡
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickAccessItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => navigate(item.path)}
                      className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow" style={{ backgroundColor: `${item.color}20` }}>
                          <Icon size={28} style={{ color: item.color }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-black)" }}>
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* DESABILITADO - Gráficos de progresso */}
          {/* <div className="dashboard-spacing">
            <ProgressSection
              progressData={progressData}
              sessionData={sessionData}
              professionalType={professionalType}
              color={config.color}
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}
