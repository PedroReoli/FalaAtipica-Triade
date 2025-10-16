import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Mail, Instagram } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const contactInfo = [
  { id: '1', title: 'Email', value: 'pedrosousa2160@gmail.com', icon: 'mail' },
  { id: '2', title: 'Instagram', value: '@falaatipica', icon: 'instagram' },
];

const badges = [
  { id: '1', title: 'Suporte Premium', description: 'Atendimento prioritário', icon: '⭐', available: true },
  { id: '2', title: 'Comunidade', description: 'Grupo de tutores', icon: '👥', available: true },
  { id: '3', title: 'Webinar', description: 'Treinamentos mensais', icon: '🎓', available: false },
];

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleContactPress = async (type: string, value: string) => {
    if (type === 'Email') {
      try {
        const mailtoUrl = `mailto:${value}?subject=Suporte FalaAtípica - Tutors`;
        const canOpen = await Linking.canOpenURL(mailtoUrl);
        
        if (canOpen) {
          await Linking.openURL(mailtoUrl);
        } else {
          Alert.alert('Email', `Entre em contato: ${value}`);
        }
      } catch (error) {
        Alert.alert('Email', `Entre em contato: ${value}`);
      }
    } else if (type === 'Instagram') {
      try {
        const instagramUrl = `instagram://user?username=${value.replace('@', '')}`;
        const canOpen = await Linking.canOpenURL(instagramUrl);
        
        if (canOpen) {
          await Linking.openURL(instagramUrl);
        } else {
          await Linking.openURL(`https://instagram.com/${value.replace('@', '')}`);
        }
      } catch (error) {
        Alert.alert('Instagram', `Visite: ${value}`);
      }
    }
  };

  const handleBadgePress = (badgeId: string) => {
    // TODO: Implementar ação do badge
    console.log('Badge selecionado:', badgeId);
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

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'mail':
        return Mail;
      case 'instagram':
        return Instagram;
      default:
        return Mail;
    }
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
            const IconComponent = getContactIcon(contact.icon);
            return (
              <TouchableOpacity
                key={contact.id}
                style={styles.contactCard}
                onPress={() => handleContactPress(contact.title, contact.value)}
              >
                <View style={styles.contactIconContainer}>
                  <IconComponent size={20} color={COLORS.GREEN} />
                </View>
                <View style={styles.contactInfoContainer}>
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

      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  contactSection: {
    marginBottom: 24,
  },
  contactCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.GREEN + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactInfoContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 3,
  },
  contactValue: {
    fontSize: 13,
    color: COLORS.BLUE,
    fontWeight: '500',
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
