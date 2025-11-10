/**
 * Utilitários para manipulação de datas
 */

/**
 * Obtém o ano atual
 * @returns {number} Ano atual (ex: 2024, 2025, etc.)
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Obtém a data atual formatada
 * @returns {string} Data atual no formato DD/MM/YYYY
 */
export const getCurrentDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  
  return `${day}/${month}/${year}`;
};

/**
 * Obtém o mês atual por extenso
 * @returns {string} Nome do mês atual em português
 */
export const getCurrentMonthName = (): string => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  return months[new Date().getMonth()];
};

/**
 * Verifica se é o primeiro dia do ano
 * @returns {boolean} true se for 1º de janeiro
 */
export const isNewYear = (): boolean => {
  const today = new Date();
  return today.getDate() === 1 && today.getMonth() === 0;
};
