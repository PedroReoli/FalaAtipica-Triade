import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface HeaderProps {
  showProfile?: boolean;
  showLogo?: boolean;
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showProfile = true,
  showLogo = true,
  userName = 'Criança',
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND_BLUE} />
      
      {/* Home Header */}
      <View style={styles.header}>
        {showProfile && (
          <View style={styles.profileSection}>
            <TouchableOpacity 
              style={styles.profileImage}
              onPress={handleProfileTap}
              activeOpacity={0.7}
            >
              <User size={24} color={COLORS.TEXT_WHITE} />
            </TouchableOpacity>
            <Text style={styles.greeting}>Olá, {userName}</Text>
          </View>
        )}

        {showLogo && (
          <Logo size="large" showText={false} color={COLORS.TEXT_WHITE} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 40,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.TEXT_WHITE,
  },
  greeting: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: '500',
  },

});
