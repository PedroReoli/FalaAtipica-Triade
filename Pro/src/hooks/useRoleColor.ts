import { useMemo } from 'react';
import { useProfessional } from '../contexts/ProfessionalContext';
import type { ProfessionalType } from '../types';

/**
 * Hook centralizado para gerenciar cores baseadas no role do profissional
 * Usa as cores padrão definidas em colors.css
 * 
 * Cores do projeto:
 * - Fonoaudiólogo: Verde (#43a047)
 * - Psicólogo: Azul (#1e88e5)
 * - Psiquiatra: Vermelho (#e53935)
 * - Pedagogo: Amarelo (#fbc02d)
 * - Psicopedagogo: Roxo (#9c27b0)
 */

interface RoleColors {
  primary: string;        // Cor principal (var(--color))
  primaryHex: string;     // Cor em hexadecimal
  secondary: string;      // Cor secundária para hover/destaque
  light: string;          // Versão clara da cor
  dark: string;           // Versão escura da cor
}

const roleColorMap: Record<ProfessionalType, RoleColors> = {
  fonoaudiologo: {
    primary: 'var(--green)',
    primaryHex: '#43a047',
    secondary: '#66bb6a',
    light: '#c8e6c9',
    dark: '#2e7d32'
  },
  psicologo: {
    primary: 'var(--blue)',
    primaryHex: '#1e88e5',
    secondary: '#42a5f5',
    light: '#bbdefb',
    dark: '#1565c0'
  },
  psiquiatra: {
    primary: 'var(--red)',
    primaryHex: '#e53935',
    secondary: '#ef5350',
    light: '#ffcdd2',
    dark: '#c62828'
  },
  pedagogo: {
    primary: 'var(--yellow)',
    primaryHex: '#fbc02d',
    secondary: '#ffeb3b',
    light: '#fff9c4',
    dark: '#f57f17'
  },
  psicopedagogo: {
    primary: 'var(--purple)',
    primaryHex: '#9c27b0',
    secondary: '#ba68c8',
    light: '#e1bee7',
    dark: '#7b1fa2'
  }
};

/**
 * Hook que retorna as cores baseadas no role do profissional logado
 * Usa o ProfessionalContext para determinar o tipo de profissional
 */
export const useRoleColor = () => {
  const { professionalType } = useProfessional();

  const colors = useMemo(() => {
    return roleColorMap[professionalType] || roleColorMap.psicologo;
  }, [professionalType]);

  return {
    ...colors,
    // Função helper para aplicar a cor principal em inline styles
    getStyle: (property: 'backgroundColor' | 'color' | 'borderColor' = 'color') => ({
      [property]: colors.primary
    }),
    // Função helper para obter a cor primária (mais usada)
    getPrimaryColor: () => colors.primary,
    // Função helper para obter a cor em hexadecimal
    getPrimaryHex: () => colors.primaryHex
  };
};

/**
 * Função utilitária para obter a cor de um role específico
 * Útil para quando você precisa da cor de um role diferente do atual
 */
export const getRoleColor = (role: ProfessionalType): RoleColors => {
  return roleColorMap[role] || roleColorMap.psicologo;
};

/**
 * Função utilitária para obter apenas a cor primária de um role
 * Útil para casos simples onde só precisa da cor principal
 */
export const getRolePrimaryColor = (role: ProfessionalType): string => {
  return roleColorMap[role]?.primary || roleColorMap.psicologo.primary;
};

