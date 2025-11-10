import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

interface BottomNavigationProps {
  onHome?: () => void;
  homeActive?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onHome,
  homeActive = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.homeButton, homeActive && styles.activeButton]} 
        onPress={onHome}
      >
        <Home size={24} color={COLORS.TEXT_WHITE} />
        <Text style={[styles.navText, homeActive && styles.activeText]}>Início</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  homeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  activeButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 8,
  },
  navText: {
    fontSize: 14,
    color: COLORS.TEXT_WHITE,
    fontWeight: '500',
    marginTop: 4,
  },
  activeText: {
    color: COLORS.TEXT_WHITE,
  },
});
