import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User } from 'lucide-react-native';
import { Logo } from './Logo';
import { COLORS } from '../constants/colors';

interface HeaderProps {
  showProfile?: boolean;
  showLogo?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  showProfile = true,
  showLogo = true,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND_BLUE} />
      
      {/* Home Header */}
      <View style={styles.header}>
        {showProfile && (
          <View style={styles.profileSection}>
            <View style={styles.profileImage}>
              <User size={14} color={COLORS.TEXT_WHITE} />
            </View>
            <Text style={styles.greeting}>Olá [NOME]</Text>
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: '500',
  },

});
