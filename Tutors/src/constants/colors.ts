// Cores da aplicação - PADRÃO OBRIGATÓRIO
export const COLORS = {
  // Cores principais
  BLUE: '#1e88e5',
  GREEN: '#43a047',
  RED: '#e53935',
  YELLOW: '#fbc02d',
  
  // Cores de fundo
  BACKGROUND_BLUE: '#054776',
  BACKGROUND_WHITE: '#f4f6ff',
  
  // Tipografia
  TEXT_BLACK: '#3c3c3c',
  TEXT_WHITE: '#ffffff',
  
  // Transparências
  TRANSPARENT: 'transparent',
} as const;

// Padrão: Fundo azul = fonte branca
export const getTextColor = (backgroundColor: string) => {
  return backgroundColor === COLORS.BACKGROUND_BLUE ? COLORS.TEXT_WHITE : COLORS.TEXT_BLACK;
};
