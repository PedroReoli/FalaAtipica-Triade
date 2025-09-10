// Tipos de usuário/profissional
export type ProfessionalType = 'fonoaudiologo' | 'psicologo' | 'psiquiatra' | 'pedagogo' | 'psicopedagogo';

export interface Professional {
  id: string;
  name: string;
  email: string;
  type: ProfessionalType;
  specialty?: string;
  license?: string;
  avatar?: string;
}

// Tipos de paciente
export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  startDate: string;
  professionalId: string;
  progress: PatientProgress;
}

export interface PatientProgress {
  totalSessions: number;
  currentLevel: number;
  categories: CategoryProgress[];
}

export interface CategoryProgress {
  id: string;
  name: string;
  progress: number;
  completedItems: number;
  totalItems: number;
}

// Tipos de sessão
export interface Session {
  id: string;
  patientId: string;
  professionalId: string;
  date: string;
  duration: number;
  activities: Activity[];
  notes?: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  duration: number;
  progress: number;
}

// Tipos de relatório
export interface Report {
  id: string;
  patientId: string;
  professionalId: string;
  period: string;
  data: ReportData;
  generatedAt: string;
}

export interface ReportData {
  sessionsCount: number;
  totalDuration: number;
  progressByCategory: CategoryProgress[];
  trends: TrendData[];
}

export interface TrendData {
  date: string;
  progress: number;
  sessions: number;
}
