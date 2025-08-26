import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface NavbarProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  showLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  onBack,
  showBackButton = true,
  showLogo = true,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <ArrowLeft size={24} color={COLORS.TEXT_WHITE} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      {showLogo ? (
        <Logo size="medium" showText={false} color={COLORS.TEXT_WHITE} />
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 64,
  },
  backButton: {
    padding: 4,
  },
  title: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 32,
  },
});
