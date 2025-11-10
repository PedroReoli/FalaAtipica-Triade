import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showText = true,
  color = COLORS.TEXT_WHITE,
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return { icon: 24, text: 16 };
      case 'large':
        return { icon: 48, text: 24 };
      default:
        return { icon: 32, text: 20 };
    }
  };

  const { icon, text } = getSize();

  return (
    <View style={styles.container}>
      {/* Logo do FalaAtípica */}
      <Image
        source={require('../../assets/falaatipica-logo.png')}
        style={[styles.logoImage, { width: icon, height: icon }]}
        resizeMode="contain"
      />

      {/* Texto do Logo */}
      {showText && (
        <Text style={[styles.logoText, { fontSize: text, color }]}>
          FalaAtípica
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    // O tamanho é definido dinamicamente via props
  },
  logoText: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
