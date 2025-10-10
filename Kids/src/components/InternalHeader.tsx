import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface InternalHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const InternalHeader: React.FC<InternalHeaderProps> = ({
  title,
  onBack,
  showBackButton = false,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND_BLUE} />
      
      {/* Internal Page Header */}
      <View style={styles.header}>
        {showBackButton && onBack && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Home size={28} color={COLORS.TEXT_WHITE} strokeWidth={2.5} />
          </TouchableOpacity>
        )}
        
        <Text style={[
          styles.title,
          showBackButton && styles.titleWithBack
        ]}>
          {title}
        </Text>
        
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
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 3,
    padding: 4,
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
  titleWithBack: {
    left: 56,
  },
  logoContainer: {
    zIndex: 2,
  },
});
