import { useMemo } from 'react';
import { getCurrentYear, getCurrentDate, getCurrentMonthName, isNewYear } from '../utils/dateUtils';

/**
 * Hook customizado que fornece funções de data úteis
 * @returns Objeto com funções de data
 */
export const useDateUtils = () => {
  const dateUtils = useMemo(() => ({
    /**
     * Obtém o ano atual
     */
    getCurrentYear,
    
    /**
     * Obtém a data atual formatada
     */
    getCurrentDate,
    
    /**
     * Obtém o mês atual por extenso
     */
    getCurrentMonthName,
    
    /**
     * Verifica se é o primeiro dia do ano
     */
    isNewYear,
    
    /**
     * Obtém o ano atual (valor direto)
     */
    currentYear: getCurrentYear(),
    
    /**
     * Obtém a data atual formatada (valor direto)
     */
    currentDate: getCurrentDate(),
    
    /**
     * Obtém o mês atual por extenso (valor direto)
     */
    currentMonth: getCurrentMonthName(),
    
    /**
     * Verifica se é o primeiro dia do ano (valor direto)
     */
    isNewYearToday: isNewYear(),
  }), []);

  return dateUtils;
};
