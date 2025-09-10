import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Heart, 
  Pill, 
  BookOpen, 
  Brain,
  FileText, 
  BarChart3, 
  Target, 
  Stethoscope,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import type { ProfessionalType } from '../types';

export interface ProfessionalAction {
  label: string;
  icon: any;
  action: string;
  onClick: () => void;
}

export const useProfessionalActions = (professionalType: ProfessionalType): ProfessionalAction[] => {
  const navigate = useNavigate();

  return useMemo(() => {
    const actions: Record<ProfessionalType, ProfessionalAction[]> = {
      fonoaudiologo: [
        { 
          label: 'Nova Sessão', 
          icon: Mic, 
          action: 'new-session',
          onClick: () => navigate('/sessions/new')
        },
        { 
          label: 'Avaliação', 
          icon: FileText, 
          action: 'assessment',
          onClick: () => navigate('/assessments/new')
        },
        { 
          label: 'Relatório', 
          icon: BarChart3, 
          action: 'report',
          onClick: () => navigate('/reports/generate')
        }
      ],
      psicologo: [
        { 
          label: 'Nova Sessão', 
          icon: Heart, 
          action: 'new-session',
          onClick: () => navigate('/sessions/new')
        },
        { 
          label: 'Avaliação', 
          icon: Target, 
          action: 'assessment',
          onClick: () => navigate('/assessments/new')
        },
        { 
          label: 'Relatório', 
          icon: TrendingUp, 
          action: 'report',
          onClick: () => navigate('/reports/generate')
        }
      ],
      psiquiatra: [
        { 
          label: 'Nova Consulta', 
          icon: Stethoscope, 
          action: 'new-consultation',
          onClick: () => navigate('/sessions/new')
        },
        { 
          label: 'Medicação', 
          icon: Pill, 
          action: 'medication',
          onClick: () => navigate('/medications/new')
        },
        { 
          label: 'Prescrição', 
          icon: FileText, 
          action: 'prescription',
          onClick: () => navigate('/prescriptions/new')
        }
      ],
      pedagogo: [
        { 
          label: 'Nova Sessão', 
          icon: BookOpen, 
          action: 'new-session',
          onClick: () => navigate('/sessions/new')
        },
        { 
          label: 'Avaliação', 
          icon: GraduationCap, 
          action: 'assessment',
          onClick: () => navigate('/assessments/new')
        },
        { 
          label: 'Relatório', 
          icon: BarChart3, 
          action: 'report',
          onClick: () => navigate('/reports/generate')
        }
      ],
      psicopedagogo: [
        { 
          label: 'Nova Sessão', 
          icon: Brain, 
          action: 'new-session',
          onClick: () => navigate('/sessions/new')
        },
        { 
          label: 'Avaliação', 
          icon: Target, 
          action: 'assessment',
          onClick: () => navigate('/assessments/new')
        },
        { 
          label: 'Relatório', 
          icon: TrendingUp, 
          action: 'report',
          onClick: () => navigate('/reports/generate')
        }
      ]
    };

    return actions[professionalType] || actions.psicologo;
  }, [professionalType, navigate]);
};
