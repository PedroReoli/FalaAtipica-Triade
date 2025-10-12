import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface InternalHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const InternalHeader: React.FC<InternalHeaderProps> = ({
  title,
  showBackButton = false,
  onBack,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND_BLUE} />
      
      {/* Internal Page Header */}
      <View style={styles.header}>
        {/* Botão Home (esquerda) - só aparece se showBackButton */}
        <View style={styles.leftContainer}>
          {showBackButton && onBack && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Home size={28} color={COLORS.TEXT_WHITE} strokeWidth={2.5} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Logo (centro quando não tem botão, direita quando tem) */}
        <View style={[styles.logoContainer, !showBackButton && styles.logoContainerCentered]}>
          <Logo size="large" showText={false} color={COLORS.TEXT_WHITE} />
        </View>
        
        {/* Título (baixo e centralizado quando não tem botão) */}
        {showBackButton && (
          <Text style={styles.title}>{title}</Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60,
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  logoContainerCentered: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.TEXT_WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    left: 60,
    right: 60,
    textAlign: 'center',
    zIndex: 1,
  },
});
