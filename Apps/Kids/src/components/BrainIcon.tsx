import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface BrainIconProps {
  size?: number;
}

export const BrainIcon: React.FC<BrainIconProps> = ({ size = 40 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Lobo frontal - vermelho */}
      <View style={[styles.brainSection, styles.frontalLobe, { backgroundColor: COLORS.RED }]} />
      
      {/* Lobo parietal - amarelo */}
      <View style={[styles.brainSection, styles.parietalLobe, { backgroundColor: COLORS.YELLOW }]} />
      
      {/* Lobo temporal - azul */}
      <View style={[styles.brainSection, styles.temporalLobe, { backgroundColor: COLORS.BLUE }]} />
      
      {/* Cerebelo - verde */}
      <View style={[styles.brainSection, styles.cerebellum, { backgroundColor: COLORS.GREEN }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brainSection: {
    position: 'absolute',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.TEXT_BLACK,
  },
  frontalLobe: {
    top: 2,
    left: 8,
    width: 12,
    height: 8,
  },
  parietalLobe: {
    top: 2,
    right: 8,
    width: 12,
    height: 8,
  },
  temporalLobe: {
    bottom: 8,
    left: 6,
    width: 10,
    height: 12,
  },
  cerebellum: {
    bottom: 8,
    right: 6,
    width: 10,
    height: 12,
  },
});
