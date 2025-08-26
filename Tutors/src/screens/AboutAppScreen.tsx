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

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const AboutAppScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    navigation.navigate('Dashboard');
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
        {/* Header */}
        <View style={styles.headerSection}>
          <Info size={64} color={COLORS.BLUE} />
          <Text style={styles.appName}>FalaAtípica Tutors</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
        </View>

        {/* Descrição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
          <Text style={styles.description}>
            O FalaAtípica Tutors é um aplicativo desenvolvido para auxiliar pais e responsáveis 
            no desenvolvimento da fala e linguagem de crianças com atrasos no desenvolvimento. 
            Nossa missão é proporcionar ferramentas educativas e recursos que facilitem o 
            processo de estimulação da comunicação.
          </Text>
        </View>

        {/* Recursos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Principais Recursos</Text>
          
          <View style={styles.featureItem}>
            <Heart size={24} color={COLORS.RED} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Acompanhamento Personalizado</Text>
              <Text style={styles.featureDescription}>
                Acompanhe o progresso de cada criança de forma individualizada
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Users size={24} color={COLORS.BLUE} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Múltiplos Perfis</Text>
              <Text style={styles.featureDescription}>
                Gerencie perfis para diferentes crianças na mesma conta
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Award size={24} color={COLORS.YELLOW} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Sistema de Conquistas</Text>
              <Text style={styles.featureDescription}>
                Motive as crianças com badges e progresso visual
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Smartphone size={24} color={COLORS.GREEN} />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Recursos Multimídia</Text>
              <Text style={styles.featureDescription}>
                Acesse imagens, sons e atividades educativas
              </Text>
            </View>
          </View>
        </View>

        {/* Equipe */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nossa Equipe</Text>
          <Text style={styles.teamDescription}>
            Desenvolvido por uma equipe dedicada de profissionais da área de fonoaudiologia 
            e tecnologia, comprometidos em criar soluções inovadoras para o desenvolvimento 
            infantil.
          </Text>
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.contactText}>
            Para dúvidas, sugestões ou suporte técnico:
          </Text>
          <Text style={styles.contactEmail}>contato@falaatipica.com</Text>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2024 FalaAtípica. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>

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
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  featureText: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    lineHeight: 20,
  },
  teamDescription: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
  },
  contactText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 16,
    color: COLORS.BLUE,
    fontWeight: '600',
  },
  copyrightSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  copyrightText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
