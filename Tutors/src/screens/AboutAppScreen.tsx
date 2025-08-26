import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Info, Heart, Users, Award, Smartphone } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { DynamicYear } from '../components/DynamicYear';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const AboutAppScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Sobre o App"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {/* Recursos */}
         <View style={styles.featuresGrid}>
           <View style={styles.featureCard}>
             <Heart size={32} color={COLORS.RED} />
             <Text style={styles.featureTitle}>Acompanhamento Personalizado</Text>
             <Text style={styles.featureDescription}>
               Acompanhe o progresso de cada criança de forma individualizada
             </Text>
           </View>

           <View style={styles.featureCard}>
             <Users size={32} color={COLORS.BLUE} />
             <Text style={styles.featureTitle}>Múltiplos Perfis</Text>
             <Text style={styles.featureDescription}>
               Gerencie perfis para diferentes crianças na mesma conta
             </Text>
           </View>

           <View style={styles.featureCard}>
             <Award size={32} color={COLORS.YELLOW} />
             <Text style={styles.featureTitle}>Sistema de Conquistas</Text>
             <Text style={styles.featureDescription}>
               Motive as crianças com badges e progresso visual
             </Text>
           </View>

           <View style={styles.featureCard}>
             <Smartphone size={32} color={COLORS.GREEN} />
             <Text style={styles.featureTitle}>Recursos Multimídia</Text>
             <Text style={styles.featureDescription}>
               Acesse imagens, sons e atividades educativas
             </Text>
           </View>
         </View>

         {/* Contato */}
         <View style={styles.contactCard}>
           <Text style={styles.contactText}>
             Para dúvidas, sugestões ou suporte técnico:
           </Text>
           <Text style={styles.contactEmail}>contato@falaatipica.com</Text>
         </View>

                   {/* Copyright */}
          <View style={styles.copyrightSection}>
            <DynamicYear 
              prefix="© "
              suffix=" FalaAtípica. Todos os direitos reservados."
              style={styles.copyrightText}
            />
          </View>
       </ScrollView>

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
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    lineHeight: 16,
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
    textAlign: 'center',
  },
  contactEmail: {
    fontSize: 16,
    color: COLORS.BLUE,
    fontWeight: '600',
    textAlign: 'center',
  },
  copyrightSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  copyrightText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

