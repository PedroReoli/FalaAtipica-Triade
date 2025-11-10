// Serviço para consumir dados MOCAP/TUTORS
// Simula uma API real que será substituída pelo Supabase na fase final

import perfilData from '../../mockup-data/perfil.json';
import progressDataImport from '../../mockup-data/progress.json';

// Dados mockados diretamente no arquivo (padrão KIDS)
const usersData = {
  users: [
    {
      id: "tutor_001",
      name: "Dra. Ana Silva",
      email: "ana.silva@fono.com",
      phone: "(11) 99999-1111",
      specialization: "Fonoaudióloga",
      crfa: "12345-SP",
      experience: "8 anos",
      institution: "Clínica FalaAtípica",
      address: "Rua das Flores, 123 - São Paulo/SP",
      profileImage: "https://via.placeholder.com/150",
      isActive: true,
      createdAt: "2024-01-15T10:00:00Z",
      lastLogin: "2024-01-20T14:30:00Z",
      childrenIds: ["child_001", "child_002", "child_003"]
    },
    {
      id: "tutor_002",
      name: "Dr. Carlos Santos",
      email: "carlos.santos@fono.com",
      phone: "(11) 99999-2222",
      specialization: "Fonoaudiólogo",
      crfa: "23456-SP",
      experience: "5 anos",
      institution: "Centro de Terapia",
      address: "Av. Paulista, 456 - São Paulo/SP",
      profileImage: "https://via.placeholder.com/150",
      isActive: true,
      createdAt: "2024-01-10T09:00:00Z",
      lastLogin: "2024-01-20T16:45:00Z",
      childrenIds: ["child_004", "child_005"]
    },
    {
      id: "tutor_003",
      name: "Dra. Maria Costa",
      email: "maria.costa@fono.com",
      phone: "(11) 99999-3333",
      specialization: "Fonoaudióloga",
      crfa: "34567-SP",
      experience: "12 anos",
      institution: "Instituto de Fonoaudiologia",
      address: "Rua Augusta, 789 - São Paulo/SP",
      profileImage: "https://via.placeholder.com/150",
      isActive: true,
      createdAt: "2024-01-05T11:00:00Z",
      lastLogin: "2024-01-20T13:15:00Z",
      childrenIds: ["child_006", "child_007", "child_008"]
    },
    {
      id: "tutor_004",
      name: "Dr. Pedro Oliveira",
      email: "pedro.oliveira@fono.com",
      phone: "(11) 99999-4444",
      specialization: "Fonoaudiólogo",
      crfa: "45678-SP",
      experience: "3 anos",
      institution: "Clínica Especializada",
      address: "Rua Oscar Freire, 321 - São Paulo/SP",
      profileImage: "https://via.placeholder.com/150",
      isActive: false,
      createdAt: "2024-01-20T08:00:00Z",
      lastLogin: "2024-01-19T17:30:00Z",
      childrenIds: []
    }
  ]
};

const childrenData = {
  children: [
    {
      id: "child_001",
      name: "João Pedro",
      age: 6,
      birthDate: "2018-03-15",
      gender: "Masculino",
      diagnosis: "Atraso no desenvolvimento da linguagem",
      diagnosisDate: "2023-06-10",
      responsibleName: "Maria Silva",
      responsiblePhone: "(11) 98888-1111",
      responsibleEmail: "maria.silva@email.com",
      responsibleRelationship: "Mãe",
      address: "Rua das Palmeiras, 100 - São Paulo/SP",
      school: "Escola Municipal São João",
      grade: "1º ano",
      tutorId: "tutor_001",
      startDate: "2023-07-01",
      isActive: true,
      lastActivity: "2024-01-20T10:30:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Criança muito participativa, gosta de jogos com sons",
      goals: ["Melhorar articulação de fonemas", "Aumentar vocabulário", "Desenvolver consciência fonológica"]
    },
    {
      id: "child_002",
      name: "Ana Clara",
      age: 5,
      birthDate: "2019-08-22",
      gender: "Feminino",
      diagnosis: "Transtorno fonológico",
      diagnosisDate: "2023-09-15",
      responsibleName: "Carlos Silva",
      responsiblePhone: "(11) 98888-2222",
      responsibleEmail: "carlos.silva@email.com",
      responsibleRelationship: "Pai",
      address: "Av. Brigadeiro Faria Lima, 200 - São Paulo/SP",
      school: "Colégio Particular ABC",
      grade: "Pré-escola",
      tutorId: "tutor_001",
      startDate: "2023-10-01",
      isActive: true,
      lastActivity: "2024-01-19T15:45:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Precisa de mais estímulo para atividades de leitura",
      goals: ["Corrigir substituições fonêmicas", "Melhorar compreensão auditiva", "Desenvolver habilidades de leitura"]
    },
    {
      id: "child_003",
      name: "Lucas Mendes",
      age: 7,
      birthDate: "2017-01-10",
      gender: "Masculino",
      diagnosis: "Disfasia do desenvolvimento",
      diagnosisDate: "2023-03-20",
      responsibleName: "Fernanda Mendes",
      responsiblePhone: "(11) 98888-3333",
      responsibleEmail: "fernanda.mendes@email.com",
      responsibleRelationship: "Mãe",
      address: "Rua dos Ipês, 300 - São Paulo/SP",
      school: "Escola Estadual Santos Dumont",
      grade: "2º ano",
      tutorId: "tutor_001",
      startDate: "2023-04-01",
      isActive: true,
      lastActivity: "2024-01-20T09:15:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Progresso significativo na expressão verbal",
      goals: ["Melhorar estruturação de frases", "Aumentar fluência verbal", "Desenvolver narrativa"]
    },
    {
      id: "child_004",
      name: "Sofia Costa",
      age: 4,
      birthDate: "2020-05-18",
      gender: "Feminino",
      diagnosis: "Atraso na aquisição da linguagem",
      diagnosisDate: "2023-11-05",
      responsibleName: "Roberto Costa",
      responsiblePhone: "(11) 98888-4444",
      responsibleEmail: "roberto.costa@email.com",
      responsibleRelationship: "Pai",
      address: "Rua das Acácias, 400 - São Paulo/SP",
      school: "Centro Educacional Infantil",
      grade: "Pré-escola",
      tutorId: "tutor_002",
      startDate: "2023-12-01",
      isActive: true,
      lastActivity: "2024-01-18T14:20:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Muito tímida, precisa de estímulo para interação",
      goals: ["Desenvolver vocabulário básico", "Melhorar interação social", "Estimular produção de sons"]
    },
    {
      id: "child_005",
      name: "Gabriel Santos",
      age: 8,
      birthDate: "2016-12-03",
      gender: "Masculino",
      diagnosis: "Transtorno do espectro autista (TEA)",
      diagnosisDate: "2022-08-12",
      responsibleName: "Patrícia Santos",
      responsiblePhone: "(11) 98888-5555",
      responsibleEmail: "patricia.santos@email.com",
      responsibleRelationship: "Mãe",
      address: "Av. Morumbi, 500 - São Paulo/SP",
      school: "Escola Especializada",
      grade: "3º ano",
      tutorId: "tutor_002",
      startDate: "2022-09-01",
      isActive: true,
      lastActivity: "2024-01-20T11:00:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Excelente progresso na comunicação alternativa",
      goals: ["Desenvolver comunicação funcional", "Melhorar compreensão de comandos", "Estimular interação social"]
    },
    {
      id: "child_006",
      name: "Isabella Ferreira",
      age: 6,
      birthDate: "2018-07-25",
      gender: "Feminino",
      diagnosis: "Gagueira",
      diagnosisDate: "2023-05-18",
      responsibleName: "Ricardo Ferreira",
      responsiblePhone: "(11) 98888-6666",
      responsibleEmail: "ricardo.ferreira@email.com",
      responsibleRelationship: "Pai",
      address: "Rua das Magnólias, 600 - São Paulo/SP",
      school: "Escola Municipal Maria Clara",
      grade: "1º ano",
      tutorId: "tutor_003",
      startDate: "2023-06-01",
      isActive: true,
      lastActivity: "2024-01-19T16:30:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Aplicando técnicas de fluência com sucesso",
      goals: ["Reduzir frequência da gagueira", "Melhorar fluência natural", "Desenvolver estratégias de coping"]
    },
    {
      id: "child_007",
      name: "Matheus Alves",
      age: 5,
      birthDate: "2019-02-14",
      gender: "Masculino",
      diagnosis: "Apraxia da fala na infância",
      diagnosisDate: "2023-10-08",
      responsibleName: "Juliana Alves",
      responsiblePhone: "(11) 98888-7777",
      responsibleEmail: "juliana.alves@email.com",
      responsibleRelationship: "Mãe",
      address: "Rua dos Cravos, 700 - São Paulo/SP",
      school: "Centro Educacional",
      grade: "Pré-escola",
      tutorId: "tutor_003",
      startDate: "2023-11-01",
      isActive: true,
      lastActivity: "2024-01-20T08:45:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Necessita de terapia intensiva para apraxia",
      goals: ["Melhorar planejamento motor da fala", "Desenvolver sequências fonêmicas", "Aumentar inteligibilidade"]
    },
    {
      id: "child_008",
      name: "Valentina Lima",
      age: 7,
      birthDate: "2017-09-30",
      gender: "Feminino",
      diagnosis: "Dificuldade de aprendizagem",
      diagnosisDate: "2023-02-25",
      responsibleName: "Marcelo Lima",
      responsiblePhone: "(11) 98888-8888",
      responsibleEmail: "marcelo.lima@email.com",
      responsibleRelationship: "Pai",
      address: "Av. Jabaquara, 800 - São Paulo/SP",
      school: "Escola Particular São José",
      grade: "2º ano",
      tutorId: "tutor_003",
      startDate: "2023-03-01",
      isActive: true,
      lastActivity: "2024-01-18T13:15:00Z",
      profileImage: "https://via.placeholder.com/150",
      notes: "Melhorando na leitura e escrita",
      goals: ["Melhorar habilidades de leitura", "Desenvolver consciência fonológica", "Aumentar vocabulário acadêmico"]
    }
  ]
};

const progressData = {
  progress: [
    {
      id: "progress_001",
      childId: "child_001",
      categoryId: "category_001",
      itemId: "item_001",
      gameType: "Jogo de Palavras",
      score: 85,
      attempts: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      timeSpent: 300,
      completedAt: "2024-01-15T10:30:00Z",
      difficulty: "Fácil",
      notes: "Boa performance, mas precisa melhorar a fluência",
    },
    {
      id: "progress_002",
      childId: "child_001",
      categoryId: "category_002",
      itemId: "item_002",
      gameType: "Jogo de Sons",
      score: 90,
      attempts: 12,
      correctAnswers: 10,
      wrongAnswers: 2,
      timeSpent: 450,
      completedAt: "2024-01-16T11:00:00Z",
      difficulty: "Médio",
      notes: "Excelente progresso, mas precisa de mais desafios",
    },
    {
      id: "progress_003",
      childId: "child_002",
      categoryId: "category_001",
      itemId: "item_003",
      gameType: "Jogo de Letras",
      score: 70,
      attempts: 8,
      correctAnswers: 6,
      wrongAnswers: 2,
      timeSpent: 200,
      completedAt: "2024-01-17T10:15:00Z",
      difficulty: "Fácil",
      notes: "Progresso significativo, mas precisa de mais prática",
    },
    {
      id: "progress_004",
      childId: "child_003",
      categoryId: "category_003",
      itemId: "item_004",
      gameType: "Jogo de Números",
      score: 80,
      attempts: 10,
      correctAnswers: 8,
      wrongAnswers: 2,
      timeSpent: 350,
      completedAt: "2024-01-18T11:30:00Z",
      difficulty: "Médio",
      notes: "Boa performance, mas precisa de mais desafios",
    },
    {
      id: "progress_005",
      childId: "child_004",
      categoryId: "category_001",
      itemId: "item_005",
      gameType: "Jogo de Palavras",
      score: 95,
      attempts: 15,
      correctAnswers: 13,
      wrongAnswers: 2,
      timeSpent: 500,
      completedAt: "2024-01-19T12:00:00Z",
      difficulty: "Difícil",
      notes: "Excelente progresso, mas precisa de mais desafios",
    },
    {
      id: "progress_006",
      childId: "child_005",
      categoryId: "category_002",
      itemId: "item_006",
      gameType: "Jogo de Sons",
      score: 88,
      attempts: 14,
      correctAnswers: 12,
      wrongAnswers: 2,
      timeSpent: 480,
      completedAt: "2024-01-20T13:00:00Z",
      difficulty: "Médio",
      notes: "Boa performance, mas precisa de mais desafios",
    },
    {
      id: "progress_007",
      childId: "child_006",
      categoryId: "category_001",
      itemId: "item_007",
      gameType: "Jogo de Letras",
      score: 75,
      attempts: 9,
      correctAnswers: 7,
      wrongAnswers: 2,
      timeSpent: 250,
      completedAt: "2024-01-21T10:00:00Z",
      difficulty: "Fácil",
      notes: "Progresso significativo, mas precisa de mais prática",
    },
    {
      id: "progress_008",
      childId: "child_007",
      categoryId: "category_003",
      itemId: "item_008",
      gameType: "Jogo de Números",
      score: 85,
      attempts: 11,
      correctAnswers: 9,
      wrongAnswers: 2,
      timeSpent: 380,
      completedAt: "2024-01-22T11:00:00Z",
      difficulty: "Médio",
      notes: "Boa performance, mas precisa de mais desafios",
    },
    {
      id: "progress_009",
      childId: "child_008",
      categoryId: "category_001",
      itemId: "item_009",
      gameType: "Jogo de Palavras",
      score: 92,
      attempts: 16,
      correctAnswers: 14,
      wrongAnswers: 2,
      timeSpent: 550,
      completedAt: "2024-01-23T12:00:00Z",
      difficulty: "Difícil",
      notes: "Excelente progresso, mas precisa de mais desafios",
    },
    {
      id: "progress_010",
      childId: "child_001",
      categoryId: "category_002",
      itemId: "item_010",
      gameType: "Jogo de Sons",
      score: 90,
      attempts: 13,
      correctAnswers: 11,
      wrongAnswers: 2,
      timeSpent: 460,
      completedAt: "2024-01-24T13:00:00Z",
      difficulty: "Médio",
      notes: "Boa performance, mas precisa de mais desafios",
    },
  ]
};

const reportsData = {
  reports: [
    {
      id: "report_001",
      childId: "child_001",
      tutorId: "tutor_001",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 100,
        completedActivities: 95,
        averageScore: 82,
        totalTimeSpent: 4500,
        categoriesPlayed: ["category_001", "category_002"],
        improvementAreas: ["fluência", "articulação"],
        strengths: ["comunicação verbal", "comprensão auditiva"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 50, completedActivities: 48, averageScore: 85, totalTimeSpent: 2500 },
        { categoryId: "category_002", totalActivities: 50, completedActivities: 47, averageScore: 79, totalTimeSpent: 2000 },
      ],
      recommendations: ["Praticar mais exercícios de fluência", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_002",
      childId: "child_002",
      tutorId: "tutor_001",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 80,
        completedActivities: 78,
        averageScore: 75,
        totalTimeSpent: 3200,
        categoriesPlayed: ["category_001"],
        improvementAreas: ["comprensão auditiva"],
        strengths: ["comunicação verbal", "comprensão auditiva"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 80, completedActivities: 78, averageScore: 75, totalTimeSpent: 3200 },
      ],
      recommendations: ["Incentivar a leitura de histórias", "Praticar exercícios de fluência"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_003",
      childId: "child_003",
      tutorId: "tutor_001",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 90,
        completedActivities: 88,
        averageScore: 80,
        totalTimeSpent: 3800,
        categoriesPlayed: ["category_003"],
        improvementAreas: ["articulação"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_003", totalActivities: 90, completedActivities: 88, averageScore: 80, totalTimeSpent: 3800 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_004",
      childId: "child_004",
      tutorId: "tutor_002",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 110,
        completedActivities: 108,
        averageScore: 88,
        totalTimeSpent: 4800,
        categoriesPlayed: ["category_001", "category_002"],
        improvementAreas: ["articulação", "fluência"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 55, completedActivities: 54, averageScore: 89, totalTimeSpent: 2600 },
        { categoryId: "category_002", totalActivities: 55, completedActivities: 54, averageScore: 87, totalTimeSpent: 2200 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_005",
      childId: "child_005",
      tutorId: "tutor_002",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 120,
        completedActivities: 118,
        averageScore: 90,
        totalTimeSpent: 5500,
        categoriesPlayed: ["category_001", "category_002"],
        improvementAreas: ["articulação", "fluência"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 60, completedActivities: 59, averageScore: 91, totalTimeSpent: 2800 },
        { categoryId: "category_002", totalActivities: 60, completedActivities: 59, averageScore: 89, totalTimeSpent: 2700 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_006",
      childId: "child_006",
      tutorId: "tutor_003",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 100,
        completedActivities: 98,
        averageScore: 85,
        totalTimeSpent: 4000,
        categoriesPlayed: ["category_001"],
        improvementAreas: ["articulação"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 100, completedActivities: 98, averageScore: 85, totalTimeSpent: 4000 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_007",
      childId: "child_007",
      tutorId: "tutor_003",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 90,
        completedActivities: 88,
        averageScore: 80,
        totalTimeSpent: 3800,
        categoriesPlayed: ["category_003"],
        improvementAreas: ["articulação"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_003", totalActivities: 90, completedActivities: 88, averageScore: 80, totalTimeSpent: 3800 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
    {
      id: "report_008",
      childId: "child_008",
      tutorId: "tutor_003",
      reportType: "Mensal",
      period: "2024-01",
      startDate: "2024-01-01T00:00:00Z",
      endDate: "2024-01-31T23:59:59Z",
      summary: {
        totalActivities: 110,
        completedActivities: 108,
        averageScore: 88,
        totalTimeSpent: 4800,
        categoriesPlayed: ["category_001"],
        improvementAreas: ["articulação"],
        strengths: ["comunicação verbal", "articulação"],
      },
      categoryBreakdown: [
        { categoryId: "category_001", totalActivities: 110, completedActivities: 108, averageScore: 88, totalTimeSpent: 4800 },
      ],
      recommendations: ["Praticar mais exercícios de articulação", "Incentivar a leitura de histórias"],
      nextGoals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      generatedAt: "2024-02-01T10:00:00Z",
    },
  ]
};

const tipsData = {
  tips: [
    {
      id: "tip_001",
      category: "Fluência",
      title: "Como melhorar a fluência verbal?",
      content: "Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a falar, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["fluência", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-01T00:00:00Z",
      author: "Dra. Ana Silva",
    },
    {
      id: "tip_002",
      category: "Articulação",
      title: "Como melhorar a articulação?",
      content: "A articulação é fundamental para a comunicação. Pratique exercícios de articulação fonêmica, como 'b' para 'ba', 'p' para 'pa'. Use palavras com sons diferentes para ajudar a criança a diferenciar. Incentive a criança a falar, mesmo que seja com poucas palavras.",
      difficulty: "Médio",
      tags: ["articulação", "fonêmica", "prática"],
      isFavorite: false,
      createdAt: "2024-01-02T00:00:00Z",
      author: "Dr. Carlos Santos",
    },
    {
      id: "tip_003",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_004",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_005",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_006",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_007",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_008",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_009",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
    {
      id: "tip_010",
      category: "Comprensião Auditiva",
      title: "Como melhorar a compreensão auditiva?",
      content: "A compreensão auditiva é essencial para a linguagem. Pratique exercícios de leitura lenta e clara, com ritmo constante. Use palavras simples e familiares. Incentive a criança a ouvir, mesmo que seja com poucas palavras. Aumente a complexidade das frases gradualmente.",
      difficulty: "Fácil",
      tags: ["comprensão auditiva", "leitura", "prática"],
      isFavorite: false,
      createdAt: "2024-01-03T00:00:00Z",
      author: "Dra. Maria Costa",
    },
  ]
};

const supportData = {
  support: {
    faq: [
      {
        id: "faq_001",
        category: "Geral",
        question: "Como posso acessar os relatórios da minha criança?",
        answer: "Acesse o menu de relatórios no painel do tutor. Você pode filtrar por período, criança e tipo de relatório. Os relatórios são gerados automaticamente e disponibilizados para download.",
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "faq_002",
        category: "Geral",
        question: "O que é um transtorno do espectro autista (TEA)?",
        answer: "Transtorno do espectro autista (TEA) é um distúrbio do desenvolvimento do cérebro que afeta a forma como a pessoa interage com o mundo e como ela se comunica. Pode incluir dificuldades em fazer amizades, expressar sentimentos e entender as intenções alheias.",
        createdAt: "2024-01-02T00:00:00Z",
      },
      {
        id: "faq_003",
        category: "Geral",
        question: "Como posso ajudar um aluno com TEA?",
        answer: "Incentive a criança a falar, mesmo que seja com poucas palavras. Pratique exercícios de comunicação funcional, como pedir e mostrar. Ajude a criança a entender comandos e orientações. Ofereça oportunidades para interagir socialmente.",
        createdAt: "2024-01-03T00:00:00Z",
      },
      {
        id: "faq_004",
        category: "Geral",
        question: "O que é apraxia da fala na infância?",
        answer: "Apraxia da fala na infância é uma dificuldade para executar movimentos musculares necessários para a fala. Pode afetar a pronúncia, a fluência e a inteligibilidade. A terapia intensiva é fundamental para melhorar o planejamento motor da fala.",
        createdAt: "2024-01-04T00:00:00Z",
      },
      {
        id: "faq_005",
        category: "Geral",
        question: "Como posso ajudar um aluno com apraxia?",
        answer: "Ofereça oportunidades para a criança falar, mesmo que seja com poucas palavras. Pratique exercícios de fluência, como repetir frases curtas. Ajude a criança a planejar e executar sequências fonêmicas. Aumente a inteligibilidade.",
        createdAt: "2024-01-05T00:00:00Z",
      },
      {
        id: "faq_006",
        category: "Geral",
        question: "O que é gagueira?",
        answer: "Gagueira é uma dificuldade de fala que ocorre quando a criança tem dificuldade em pronunciar sons. Pode ser causada por ansiedade, estresse ou dificuldades de desenvolvimento. A terapia de fluência é fundamental para reduzir a frequência da gagueira e melhorar a fluência natural.",
        createdAt: "2024-01-06T00:00:00Z",
      },
      {
        id: "faq_007",
        category: "Geral",
        question: "Como posso ajudar um aluno com gagueira?",
        answer: "Incentive a criança a falar, mesmo que seja com poucas palavras. Pratique exercícios de fluência, como repetir frases curtas. Ajude a criança a desenvolver estratégias de coping e melhorar a fluência natural.",
        createdAt: "2024-01-07T00:00:00Z",
      },
      {
        id: "faq_008",
        category: "Geral",
        question: "O que é dificuldade de aprendizagem?",
        answer: "Dificuldade de aprendizagem é um termo geral que pode incluir transtornos do aprendizado, como dislexia, discalculia, disgrafia, entre outros. Pode afetar a leitura, escrita, matemática e outras áreas do conhecimento. A terapia especializada é necessária para ajudar a criança a superar essas dificuldades.",
        createdAt: "2024-01-08T00:00:00Z",
      },
      {
        id: "faq_009",
        category: "Geral",
        question: "Como posso ajudar um aluno com dificuldade de aprendizagem?",
        answer: "Ofereça oportunidades para a criança aprender, mesmo que seja com poucas palavras. Pratique exercícios de leitura lenta e clara, com ritmo constante. Ajude a criança a desenvolver estratégias de aprendizado e melhorar a consciência fonológica.",
        createdAt: "2024-01-09T00:00:00Z",
      },
      {
        id: "faq_010",
        category: "Geral",
        question: "O que é dificuldade de aprendizagem?",
        answer: "Dificuldade de aprendizagem é um termo geral que pode incluir transtornos do aprendizado, como dislexia, discalculia, disgrafia, entre outros. Pode afetar a leitura, escrita, matemática e outras áreas do conhecimento. A terapia especializada é necessária para ajudar a criança a superar essas dificuldades.",
        createdAt: "2024-01-08T00:00:00Z",
      },
    ],
    tutorials: [
      {
        id: "tutorial_001",
        title: "Introdução ao Sistema",
        description: "Aprenda a navegar pelo painel do tutor e entender as principais funcionalidades.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        createdAt: "2024-01-01T00:00:00Z",
      },
      {
        id: "tutorial_002",
        title: "Como registrar atividades",
        description: "Aprenda a registrar as atividades realizadas pela criança no sistema.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        createdAt: "2024-01-02T00:00:00Z",
      },
      {
        id: "tutorial_003",
        title: "Como acessar relatórios",
        description: "Aprenda a acessar e interpretar os relatórios gerados pelo sistema.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        createdAt: "2024-01-03T00:00:00Z",
      },
      {
        id: "tutorial_004",
        title: "Como usar dicas",
        description: "Aprenda a utilizar as dicas para melhorar o desempenho da criança.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        createdAt: "2024-01-04T00:00:00Z",
      },
      {
        id: "tutorial_005",
        title: "Como acessar suporte",
        description: "Aprenda a acessar o suporte técnico e FAQ.",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        createdAt: "2024-01-05T00:00:00Z",
      },
    ],
  }
};

const categoriesData = {
  categories: [
    {
      id: "category_001",
      name: "Fluência",
      description: "Atividades para melhorar a fluência verbal e a articulação fonêmica.",
      icon: "🗣️",
      color: "#FFD700",
      difficulty: "Médio",
      ageRange: "3-12",
      items: [
        { id: "item_001", name: "Jogo de Palavras", description: "Pratique a fluência ao repetir frases curtas e claras.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
        { id: "item_002", name: "Jogo de Sons", description: "Aprenda a diferenciar sons diferentes para melhorar a articulação.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Médio", isActive: true },
        { id: "item_003", name: "Jogo de Letras", description: "Pratique a fluência ao repetir frases curtas e claras.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
      ]
    },
    {
      id: "category_002",
      name: "Comprensião Auditiva",
      description: "Atividades para melhorar a compreensão auditiva e a leitura lenta.",
      icon: "👂",
      color: "#4CAF50",
      difficulty: "Fácil",
      ageRange: "3-12",
      items: [
        { id: "item_004", name: "Jogo de Sons", description: "Aprenda a diferenciar sons diferentes para melhorar a articulação.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Médio", isActive: true },
        { id: "item_005", name: "Jogo de Letras", description: "Pratique a fluência ao repetir frases curtas e claras.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
        { id: "item_006", name: "Jogo de Números", description: "Pratique a compreensão auditiva ao repetir números.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
      ]
    },
    {
      id: "category_003",
      name: "Articulação",
      description: "Atividades para melhorar a articulação fonêmica e a fluência verbal.",
      icon: "👄",
      color: "#2196F3",
      difficulty: "Médio",
      ageRange: "3-12",
      items: [
        { id: "item_007", name: "Jogo de Sons", description: "Aprenda a diferenciar sons diferentes para melhorar a articulação.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Médio", isActive: true },
        { id: "item_008", name: "Jogo de Números", description: "Pratique a articulação ao repetir números.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
        { id: "item_009", name: "Jogo de Letras", description: "Pratique a articulação ao repetir frases curtas.", image: "https://via.placeholder.com/100", sound: "https://via.placeholder.com/100", difficulty: "Fácil", isActive: true },
      ]
    },
  ]
};

const sessionsData = {
  sessions: [
    {
      id: "session_001",
      childId: "child_001",
      tutorId: "tutor_001",
      sessionType: "Terapia",
      startTime: "2024-01-15T10:00:00Z",
      endTime: "2024-01-15T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_001", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 80, notes: "Boa performance" },
        { id: "activity_002", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 75, notes: "Precisa melhorar" },
        { id: "activity_003", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 85, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-22T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_002",
      childId: "child_002",
      tutorId: "tutor_001",
      sessionType: "Terapia",
      startTime: "2024-01-16T10:00:00Z",
      endTime: "2024-01-16T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_004", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 70, notes: "Progresso significativo" },
        { id: "activity_005", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 75, notes: "Boa performance" },
        { id: "activity_006", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 80, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-23T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_003",
      childId: "child_003",
      tutorId: "tutor_001",
      sessionType: "Terapia",
      startTime: "2024-01-17T10:00:00Z",
      endTime: "2024-01-17T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_007", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 80, notes: "Boa performance" },
        { id: "activity_008", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 75, notes: "Precisa melhorar" },
        { id: "activity_009", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 85, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-24T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_004",
      childId: "child_004",
      tutorId: "tutor_002",
      sessionType: "Terapia",
      startTime: "2024-01-18T10:00:00Z",
      endTime: "2024-01-18T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_010", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 90, notes: "Excelente progresso" },
        { id: "activity_011", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 85, notes: "Boa performance" },
        { id: "activity_012", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 88, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-25T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_005",
      childId: "child_005",
      tutorId: "tutor_002",
      sessionType: "Terapia",
      startTime: "2024-01-19T10:00:00Z",
      endTime: "2024-01-19T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_013", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 95, notes: "Excelente progresso" },
        { id: "activity_014", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 90, notes: "Boa performance" },
        { id: "activity_015", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 88, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-26T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_006",
      childId: "child_006",
      tutorId: "tutor_003",
      sessionType: "Terapia",
      startTime: "2024-01-20T10:00:00Z",
      endTime: "2024-01-20T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_016", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 85, notes: "Boa performance" },
        { id: "activity_017", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 80, notes: "Precisa melhorar" },
        { id: "activity_018", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 85, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-27T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_007",
      childId: "child_007",
      tutorId: "tutor_003",
      sessionType: "Terapia",
      startTime: "2024-01-21T10:00:00Z",
      endTime: "2024-01-21T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_019", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 80, notes: "Boa performance" },
        { id: "activity_020", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 75, notes: "Precisa melhorar" },
        { id: "activity_021", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 85, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-28T10:00:00Z",
      status: "Concluída",
    },
    {
      id: "session_008",
      childId: "child_008",
      tutorId: "tutor_003",
      sessionType: "Terapia",
      startTime: "2024-01-22T10:00:00Z",
      endTime: "2024-01-22T11:00:00Z",
      duration: 3600,
      activities: [
        { id: "activity_022", name: "Atividade de Fluência", type: "Jogo", duration: 1500, score: 90, notes: "Excelente progresso" },
        { id: "activity_023", name: "Atividade de Articulação", type: "Exercício", duration: 1200, score: 88, notes: "Boa performance" },
        { id: "activity_024", name: "Atividade de Comprensião Auditiva", type: "Jogo", duration: 900, score: 88, notes: "Excelente" },
      ],
      goals: ["Aumentar fluência verbal", "Melhorar articulação de fonemas"],
      observations: "Criança muito participativa, gostou dos jogos de sons.",
      nextSession: "2024-01-29T10:00:00Z",
      status: "Concluída",
    },
  ]
};

// Tipos baseados nos dados MOCAP
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  crfa: string;
  experience: string;
  institution: string;
  address: string;
  profileImage: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  childrenIds: string[];
}

export interface Child {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  gender: string;
  diagnosis: string;
  diagnosisDate: string;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string;
  responsibleRelationship: string;
  address: string;
  school: string;
  grade: string;
  tutorId: string;
  startDate: string;
  isActive: boolean;
  lastActivity: string;
  profileImage: string;
  notes: string;
  goals: string[];
}

export interface Progress {
  id: string;
  childId: string;
  categoryId: string;
  itemId: string;
  gameType: string;
  score: number;
  attempts: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeSpent: number;
  completedAt: string;
  difficulty: string;
  notes: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  difficulty: string;
  ageRange: string;
  items: CategoryItem[];
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  image: string;
  sound: string;
  difficulty: string;
  isActive: boolean;
}

export interface Report {
  id: string;
  childId: string;
  tutorId: string;
  reportType: string;
  period: string;
  startDate: string;
  endDate: string;
  summary: {
    totalActivities: number;
    completedActivities: number;
    averageScore: number;
    totalTimeSpent: number;
    categoriesPlayed: string[];
    improvementAreas: string[];
    strengths: string[];
  };
  categoryBreakdown: any[];
  recommendations: string[];
  nextGoals: string[];
  generatedAt: string;
}

export interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  difficulty: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  author: string;
}

export interface Session {
  id: string;
  childId: string;
  tutorId: string;
  sessionType: string;
  startTime: string;
  endTime: string;
  duration: number;
  activities: any[];
  goals: string[];
  observations: string;
  nextSession: string;
  status: string;
}

// Serviços MOCAP
export class MocapService {
  // Usuários
  static async getUsers(): Promise<User[]> {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 100));
    return usersData.users;
  }

  static async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return usersData.users.find((user: User) => user.id === id) || null;
  }

  static async getActiveUsers(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return usersData.users.filter((user: User) => user.isActive);
  }

  // Crianças
  static async getChildren(): Promise<Child[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return childrenData.children;
  }

  static async getChildById(id: string): Promise<Child | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return childrenData.children.find((child: Child) => child.id === id) || null;
  }

  static async getChildrenByTutor(tutorId: string): Promise<Child[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return childrenData.children.filter((child: Child) => child.tutorId === tutorId && child.isActive);
  }

  static async getActiveChildren(): Promise<Child[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return childrenData.children.filter((child: Child) => child.isActive);
  }

  // Progresso
  static async getProgress(): Promise<Progress[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return progressData.progress;
  }

  static async getProgressByChild(childId: string): Promise<Progress[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return progressData.progress.filter((progress: Progress) => progress.childId === childId);
  }

  static async getProgressByCategory(categoryId: string): Promise<Progress[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return progressData.progress.filter((progress: Progress) => progress.categoryId === categoryId);
  }

  // Categorias
  static async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return categoriesData.categories;
  }

  static async getCategoryById(id: string): Promise<Category | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return categoriesData.categories.find((category: Category) => category.id === id) || null;
  }

  // Relatórios
  static async getReports(): Promise<Report[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return reportsData.reports;
  }

  static async getReportsByChild(childId: string): Promise<Report[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return reportsData.reports.filter((report: Report) => report.childId === childId);
  }

  static async getReportsByTutor(tutorId: string): Promise<Report[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return reportsData.reports.filter((report: Report) => report.tutorId === tutorId);
  }

  // Dicas
  static async getTips(): Promise<Tip[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return tipsData.tips;
  }

  static async getTipsByCategory(category: string): Promise<Tip[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return tipsData.tips.filter((tip: Tip) => tip.category === category);
  }

  static async getFavoriteTips(): Promise<Tip[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return tipsData.tips.filter((tip: Tip) => tip.isFavorite);
  }

  static async getTipCategories(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return tipsData.categories;
  }

  // Suporte
  static async getSupportData(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return supportData.support;
  }

  static async getFAQ(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return supportData.support.faq;
  }

  static async getFAQByCategory(category: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return supportData.support.faq.filter((faq: any) => faq.category === category);
  }

  static async getTutorials(): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return supportData.support.tutorials;
  }

  // Sessões
  static async getSessions(): Promise<Session[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return sessionsData.sessions;
  }

  static async getSessionsByChild(childId: string): Promise<Session[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return sessionsData.sessions.filter((session: Session) => session.childId === childId);
  }

  static async getSessionsByTutor(tutorId: string): Promise<Session[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return sessionsData.sessions.filter((session: Session) => session.tutorId === tutorId);
  }

  // Métodos utilitários
  static async getChildWithProgress(childId: string): Promise<{ child: Child; progress: Progress[] } | null> {
    const child = await this.getChildById(childId);
    if (!child) return null;

    const progress = await this.getProgressByChild(childId);
    return { child, progress };
  }

  static async getTutorWithChildren(tutorId: string): Promise<{ tutor: User; children: Child[] } | null> {
    const tutor = await this.getUserById(tutorId);
    if (!tutor) return null;

    const children = await this.getChildrenByTutor(tutorId);
    return { tutor, children };
  }

  static async searchChildren(query: string): Promise<Child[]> {
    const children = await this.getActiveChildren();
    const lowerQuery = query.toLowerCase();
    
    return children.filter(child => 
      child.name.toLowerCase().includes(lowerQuery) ||
      child.diagnosis.toLowerCase().includes(lowerQuery) ||
      child.school.toLowerCase().includes(lowerQuery)
    );
  }

  static async getChildStats(childId: string): Promise<{
    totalActivities: number;
    averageScore: number;
    totalTimeSpent: number;
    categoriesPlayed: string[];
  }> {
    const progress = await this.getProgressByChild(childId);
    
    const totalActivities = progress.length;
    const averageScore = totalActivities > 0 
      ? progress.reduce((sum, p) => sum + p.score, 0) / totalActivities 
      : 0;
    const totalTimeSpent = progress.reduce((sum, p) => sum + p.timeSpent, 0);
    const categoriesPlayed = [...new Set(progress.map(p => p.categoryId))];

    return {
      totalActivities,
      averageScore,
      totalTimeSpent,
      categoriesPlayed,
    };
  }

  // Métodos específicos para perfil do tutor
  static async getTutorProfile(tutorId: string = 'tutor_001'): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return perfilData;
  }

  static async getChildrenProgress(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return progressData;
  }
}

export default MocapService;
