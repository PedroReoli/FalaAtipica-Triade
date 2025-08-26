import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Mail, Smartphone, Star, Users, GraduationCap } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const contactInfo = [
  { id: '1', title: 'Email', value: 'suporte@falaatipica.com', icon: Mail },
  { id: '2', title: 'Instagram', value: '@falaatipica', icon: Smartphone },
];

const badges = [
  { id: '1', title: 'Suporte Premium', description: 'Atendimento prioritário', icon: Star, available: true },
  { id: '2', title: 'Comunidade', description: 'Grupo de tutores', icon: Users, available: true },
  { id: '3', title: 'Webinar', description: 'Treinamentos mensais', icon: GraduationCap, available: false },
];

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContactPress = (type: string, value: string) => {
    // TODO: Implementar ação de contato
    console.log('Contato:', type, value);
  };

  const handleBadgePress = (badgeId: string) => {
    // TODO: Implementar ação do badge
    console.log('Badge selecionado:', badgeId);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Suporte"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Entre em Contato</Text>
        <Text style={styles.subtitle}>
          Estamos aqui para ajudar você e suas crianças.
        </Text>

        {/* Informações de Contato */}
        <View style={styles.contactSection}>
          {contactInfo.map((contact) => {
            const IconComponent = contact.icon;
            return (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactCard}
                onPress={() => handleContactPress(contact.title, contact.value)}
              >
                <IconComponent size={24} color={COLORS.GREEN} />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{contact.title}</Text>
                  <Text style={styles.contactValue}>{contact.value}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.title}>Recursos</Text>
        
        {/* Lista de Badges */}
        <View style={styles.badgesList}>
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <TouchableOpacity
                key={badge.id}
                style={[styles.badgeCard, !badge.available && styles.badgeLocked]}
                onPress={() => handleBadgePress(badge.id)}
              >
                <IconComponent size={32} color={badge.available ? COLORS.GREEN : COLORS.YELLOW} />
                <View style={styles.badgeInfo}>
                  <Text style={[styles.badgeTitle, !badge.available && styles.badgeTitleLocked]}>
                    {badge.title}
                  </Text>
                  <Text style={[styles.badgeDescription, !badge.available && styles.badgeDescriptionLocked]}>
                    {badge.description}
                  </Text>
                </View>
                {badge.available && <Text style={styles.badgeAvailable}>Disponível</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={() => {}}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    marginBottom: 24,
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: COLORS.BLUE,
  },
  badgesList: {
    gap: 12,
  },
  badgeCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeLocked: {
    borderColor: COLORS.YELLOW,
    opacity: 0.6,
  },
  badgeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  badgeTitleLocked: {
    color: COLORS.GREEN,
  },
  badgeDescription: {
    fontSize: 14,
    color: COLORS.GREEN,
  },
  badgeDescriptionLocked: {
    color: COLORS.YELLOW,
  },
  badgeAvailable: {
    fontSize: 12,
    color: COLORS.BLUE,
    fontWeight: '600',
  },
});
