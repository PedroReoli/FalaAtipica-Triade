import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  backgroundColor = COLORS.BACKGROUND_WHITE,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {children}
      </SafeAreaView>
      
      {/* Área para os botões de navegação do sistema */}
      <View style={[styles.systemNavArea, { height: insets.bottom }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  systemNavArea: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
});
