import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface InternalHeaderProps {
  title: string;
}

export const InternalHeader: React.FC<InternalHeaderProps> = ({
  title,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND_BLUE} />
      
      {/* Internal Page Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.logoContainer}>
          <Logo size="large" showText={false} color={COLORS.TEXT_WHITE} />
        </View>
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 40,
    position: 'relative',
  },
  title: {
    color: COLORS.TEXT_WHITE,
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: 1,
  },
  logoContainer: {
    zIndex: 2,
  },
});
