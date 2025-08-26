import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const HomeFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Footer vazio - apenas visual */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
    paddingVertical: 8,
    minHeight: 40,
  },
});
