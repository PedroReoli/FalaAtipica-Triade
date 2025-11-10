import { useMemo } from 'react';
import type { ProfessionalType } from '../types';

export interface ProfessionalColors {
  primary: string;
  secondary: string;
  light: string;
  dark: string;
}

export const useProfessionalColors = (professionalType: ProfessionalType): ProfessionalColors => {
  return useMemo(() => {
    const colors: Record<ProfessionalType, ProfessionalColors> = {
      fonoaudiologo: {
        primary: '#43a047',
        secondary: '#66bb6a',
        light: '#c8e6c9',
        dark: '#2e7d32'
      },
      psicologo: {
        primary: '#1e88e5',
        secondary: '#42a5f5',
        light: '#bbdefb',
        dark: '#1565c0'
      },
      psiquiatra: {
        primary: '#e53935',
        secondary: '#ef5350',
        light: '#ffcdd2',
        dark: '#c62828'
      },
      pedagogo: {
        primary: '#fbc02d',
        secondary: '#ffeb3b',
        light: '#fff9c4',
        dark: '#f57f17'
      },
      psicopedagogo: {
        primary: '#9c27b0',
        secondary: '#ba68c8',
        light: '#e1bee7',
        dark: '#7b1fa2'
      }
    };

    return colors[professionalType] || colors.psicologo;
  }, [professionalType]);
};

export const getProfessionalColor = (professionalType: ProfessionalType): string => {
  const colors = {
    fonoaudiologo: 'var(--green)',
    psicologo: 'var(--blue)',
    psiquiatra: 'var(--red)',
    pedagogo: 'var(--yellow)',
    psicopedagogo: 'var(--purple)'
  };

  return colors[professionalType] || colors.psicologo;
};
