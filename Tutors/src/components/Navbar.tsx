import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, User } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface NavbarProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  showLogo?: boolean;
  showProfile?: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  onBack,
  showBackButton = true,
  showLogo = true,
  showProfile = false,
  onLogout,
}) => {
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfileTap = () => {
    // Incrementar contador de taps
    setTapCount(prev => prev + 1);

    // Limpar timer anterior se existir
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    // Verificar se é o segundo tap
    if (tapCount === 1) {
      // Segundo tap - fazer logout
      if (onLogout) {
        onLogout();
      }
      setTapCount(0);
    } else {
      // Primeiro tap - esperar 500ms para ver se vem o segundo
      tapTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 500);
    }
  };

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
      
      {showProfile ? (
        <TouchableOpacity
          style={styles.profileImage}
          onPress={handleProfileTap}
          activeOpacity={0.7}
        >
          <User size={20} color={COLORS.TEXT_WHITE} />
        </TouchableOpacity>
      ) : showLogo ? (
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
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.TEXT_WHITE,
  },
});
