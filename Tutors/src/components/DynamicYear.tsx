import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { getCurrentYear } from '../utils/dateUtils';

interface DynamicYearProps {
  prefix?: string;
  suffix?: string;
  style?: any;
}

/**
 * Componente que exibe o ano atual dinamicamente
 * @param prefix - Texto antes do ano (ex: "© ")
 * @param suffix - Texto depois do ano (ex: " FalaAtípica")
 * @param style - Estilos customizados
 */
export const DynamicYear: React.FC<DynamicYearProps> = ({ 
  prefix = '', 
  suffix = '', 
  style 
}) => {
  const currentYear = getCurrentYear();
  
  return (
    <Text style={[styles.text, style]}>
      {prefix}{currentYear}{suffix}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: '#666',
  },
});
