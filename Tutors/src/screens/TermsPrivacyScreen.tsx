import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FileText, Shield, Lock } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const TermsPrivacyScreen: React.FC = () => {
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
        title="Termos e Privacidade"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {/* Termos de Uso */}
         <View style={styles.termsCard}>
           <View style={styles.cardHeader}>
             <FileText size={24} color={COLORS.BLUE} />
             <Text style={styles.cardTitle}>Termos de Uso</Text>
           </View>
           <Text style={styles.cardText}>
             O FalaAtípica Tutors é destinado exclusivamente para uso educacional e de desenvolvimento infantil. 
             Os pais e responsáveis são responsáveis pelo uso adequado do aplicativo pelas crianças sob sua supervisão.
           </Text>
         </View>

         {/* Política de Privacidade */}
         <View style={styles.termsCard}>
           <View style={styles.cardHeader}>
             <Shield size={24} color={COLORS.GREEN} />
             <Text style={styles.cardTitle}>Política de Privacidade</Text>
           </View>
           <Text style={styles.cardText}>
             Coletamos apenas informações necessárias para o funcionamento do aplicativo. 
             Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros.
           </Text>
         </View>

         {/* Proteção de Dados */}
         <View style={styles.termsCard}>
           <View style={styles.cardHeader}>
             <Lock size={24} color={COLORS.RED} />
             <Text style={styles.cardTitle}>Proteção de Dados</Text>
           </View>
           <Text style={styles.cardText}>
             Todos os dados são criptografados durante a transmissão e armazenamento. 
             Apenas funcionários autorizados têm acesso aos dados, e apenas quando necessário.
           </Text>
         </View>

         {/* Contato */}
         <View style={styles.contactCard}>
           <Text style={styles.contactText}>
             Se você tiver dúvidas sobre estes termos ou nossa política de privacidade:
           </Text>
           <Text style={styles.contactEmail}>privacidade@falaatipica.com</Text>
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
  termsCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginLeft: 12,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    lineHeight: 20,
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
});

