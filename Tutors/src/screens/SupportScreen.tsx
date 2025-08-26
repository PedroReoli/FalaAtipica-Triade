import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const contactInfo = [
  { id: '1', title: 'Email', value: 'suporte@falaatipica.com', icon: '📧' },
  { id: '2', title: 'Instagram', value: '@falaatipica', icon: '📱' },
];

const badges = [
  { id: '1', title: 'Suporte Premium', description: 'Atendimento prioritário', icon: '⭐', available: true },
  { id: '2', title: 'Comunidade', description: 'Grupo de tutores', icon: '👥', available: true },
  { id: '3', title: 'Webinar', description: 'Treinamentos mensais', icon: '🎓', available: false },
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

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Suporte" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Entre em Contato</Text>
        <Text style={styles.subtitle}>
          Estamos aqui para ajudar você e suas crianças.
        </Text>

        {/* Informações de Contato */}
        <View style={styles.contactSection}>
          {contactInfo.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => handleContactPress(contact.title, contact.value)}
            >
              <Text style={styles.contactIcon}>{contact.icon}</Text>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactValue}>{contact.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>Recursos</Text>
        
        {/* Lista de Badges */}
        <View style={styles.badgesList}>
          {badges.map((badge) => (
            <TouchableOpacity
              key={badge.id}
              style={[styles.badgeCard, !badge.available && styles.badgeLocked]}
              onPress={() => handleBadgePress(badge.id)}
            >
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
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
          ))}
        </View>
      </ScrollView>

      <BottomNavigation 
        onHome={handleHome}
        homeActive={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
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
  contactIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
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
  badgeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
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
