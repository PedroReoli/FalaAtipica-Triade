import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, User } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

interface FooterProps {
  activeTab?: 'home' | 'profiles';
  onHomePress?: () => void;
  onProfilesPress?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeTab = 'home',
  onHomePress,
  onProfilesPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.navTab, activeTab === 'home' && styles.activeTab]} 
        onPress={onHomePress}
      >
        <View style={[styles.iconContainer, activeTab === 'home' && styles.activeIconContainer]}>
          <Home 
            size={24} 
            color={activeTab === 'home' ? COLORS.TEXT_WHITE : COLORS.TEXT_WHITE} 
          />
        </View>
        <Text style={[styles.navText, activeTab === 'home' && styles.activeNavText]}>
          Inicio
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.navTab, activeTab === 'profiles' && styles.activeTab]} 
        onPress={onProfilesPress}
      >
        <View style={[styles.iconContainer, activeTab === 'profiles' && styles.activeIconContainer]}>
          <User 
            size={24} 
            color={activeTab === 'profiles' ? COLORS.TEXT_WHITE : COLORS.TEXT_WHITE} 
          />
        </View>
        <Text style={[styles.navText, activeTab === 'profiles' && styles.activeNavText]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    minHeight: 70,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activeIconContainer: {
    backgroundColor: COLORS.BLUE,
    shadowColor: COLORS.BLUE,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  navText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.8,
  },
  activeNavText: {
    fontWeight: 'bold',
    opacity: 1,
  },
});
