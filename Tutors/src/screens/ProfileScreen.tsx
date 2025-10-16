import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Edit, Key, FileText, Shield, ChevronRight } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { emailService } from '../utils/emailService';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const menuItems = [
  {
    id: '1',
    title: 'Solicitar mudança de senha',
    icon: Key,
    action: 'requestPasswordChange' as const,
  },
  {
    id: '2',
    title: 'Sobre o App',
    icon: FileText,
    route: 'AboutApp' as keyof RootStackParamList,
  },
  {
    id: '3',
    title: 'Termos e Privacidade',
    icon: FileText,
    route: 'TermsPrivacy' as keyof RootStackParamList,
  },
  {
    id: '4',
    title: 'Minha Assinatura',
    icon: Shield,
    route: 'Subscription' as keyof RootStackParamList,
  },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState('Usuário');
  const [userEmail, setUserEmail] = useState('email@exemplo.com');
  const [userInitial, setUserInitial] = useState('U');

  useEffect(() => {
    // Buscar dados do usuário logado
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.nome);
      setUserEmail(currentUser.email);
      setUserInitial(currentUser.nome.charAt(0).toUpperCase());
    }
  }, []);

  const handleMenuPress = async (item: typeof menuItems[0]) => {
    // Se tem action, executar ação especial
    if ('action' in item && item.action === 'requestPasswordChange') {
      // Abre email diretamente sem confirmação
      await emailService.requestPasswordChange(userName, userEmail);
    } 
    // Se tem route, navegar normalmente
    else if ('route' in item) {
      navigation.navigate(item.route);
    }
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEditProfile = () => {
    // TODO: Implementar edição de perfil
    console.log('Editar perfil');
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Perfil"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <View style={styles.content}>
        {/* Seção do Usuário */}
        <View style={styles.userSection}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                {/* Placeholder para foto do usuário */}
                <Text style={styles.profileInitial}>{userInitial}</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Edit size={16} color={COLORS.TEXT_WHITE} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
          </View>
        </View>

        {/* Menu de Opções */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item)}
              >
                <View style={styles.menuItemLeft}>
                  <IconComponent size={24} color={COLORS.BLUE} />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={COLORS.TEXT_BLACK} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Footer 
        activeTab="profiles"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  userSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BACKGROUND_WHITE,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
  },
  menuSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginLeft: 16,
  },
});
