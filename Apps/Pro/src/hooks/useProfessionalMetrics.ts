import { useMemo } from 'react';
import { Users, Calendar, TrendingUp, FileText } from 'lucide-react';
import type { ProfessionalType } from '../types';

export interface ProfessionalMetric {
  label: string;
  value: string | number;
  change: string;
  icon: any;
}

export const useProfessionalMetrics = (professionalType: ProfessionalType): ProfessionalMetric[] => {
  return useMemo(() => {
    const metrics: Record<ProfessionalType, ProfessionalMetric[]> = {
      fonoaudiologo: [
        { label: 'Pacientes', value: 24, change: '+12%', icon: Users },
        { label: 'Sessões', value: 156, change: '+8%', icon: Calendar },
        { label: 'Progresso', value: '78%', change: '+5%', icon: TrendingUp },
        { label: 'Relatórios', value: 42, change: '+15%', icon: FileText }
      ],
      psicologo: [
        { label: 'Pacientes', value: 18, change: '+8%', icon: Users },
        { label: 'Sessões', value: 89, change: '+12%', icon: Calendar },
        { label: 'Progresso', value: '82%', change: '+7%', icon: TrendingUp },
        { label: 'Avaliações', value: 31, change: '+20%', icon: FileText }
      ],
      psiquiatra: [
        { label: 'Pacientes', value: 32, change: '+15%', icon: Users },
        { label: 'Consultas', value: 124, change: '+18%', icon: Calendar },
        { label: 'Prescrições', value: 67, change: '+22%', icon: FileText },
        { label: 'Relatórios', value: 28, change: '+25%', icon: FileText }
      ],
      pedagogo: [
        { label: 'Alunos', value: 28, change: '+15%', icon: Users },
        { label: 'Sessões', value: 142, change: '+12%', icon: Calendar },
        { label: 'Progresso', value: '85%', change: '+8%', icon: TrendingUp },
        { label: 'Relatórios', value: 38, change: '+20%', icon: FileText }
      ],
      psicopedagogo: [
        { label: 'Pacientes', value: 22, change: '+10%', icon: Users },
        { label: 'Sessões', value: 98, change: '+8%', icon: Calendar },
        { label: 'Progresso', value: '78%', change: '+6%', icon: TrendingUp },
        { label: 'Avaliações', value: 29, change: '+18%', icon: FileText }
      ]
    };

    return metrics[professionalType] || metrics.psicologo;
  }, [professionalType]);
};
