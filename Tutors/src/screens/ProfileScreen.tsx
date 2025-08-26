import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Edit, Key, Smartphone, FileText, Shield, ChevronRight } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const menuItems = [
  {
    id: '1',
    title: 'Change Password',
    icon: Key,
    route: 'ChangePassword' as keyof RootStackParamList,
  },
  {
    id: '2',
    title: 'Cadastrar nova conta',
    icon: Smartphone,
    route: 'RegisterDevice' as keyof RootStackParamList,
  },
  {
    id: '3',
    title: 'Sobre o App',
    icon: Smartphone,
    route: 'AboutApp' as keyof RootStackParamList,
  },
  {
    id: '4',
    title: 'Termos e Privacidade',
    icon: FileText,
    route: 'TermsPrivacy' as keyof RootStackParamList,
  },
  {
    id: '5',
    title: 'Minha Assinatura',
    icon: Shield,
    route: 'Subscription' as keyof RootStackParamList,
  },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleMenuPress = (route: keyof RootStackParamList) => {
    navigation.navigate(route);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
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
                <Text style={styles.profileInitial}>U</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <Edit size={16} color={COLORS.TEXT_WHITE} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>[NOME DO USUARIO]</Text>
            <Text style={styles.userEmail}>EMAIL DO USUARIO</Text>
          </View>
        </View>

        {/* Configurações Gerais */}
        <View style={styles.settingsHeader}>
          <Text style={styles.settingsTitle}>Configuracoes Gerais</Text>
        </View>

        {/* Menu de Opções */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.route)}
              >
                <View style={styles.menuItemLeft}>
                  <IconComponent size={20} color={COLORS.TEXT_BLACK} />
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
        onProfilesPress={() => {}}
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
  settingsHeader: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  menuSection: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.TEXT_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    marginLeft: 16,
  },
});
