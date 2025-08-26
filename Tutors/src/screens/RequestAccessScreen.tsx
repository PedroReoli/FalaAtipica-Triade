import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { User, Mail } from 'lucide-react-native';
import { Header } from '../components/Header';

import { Navbar } from '../components/Navbar';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type RequestAccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestAccess'>;

export const RequestAccessScreen: React.FC = () => {
  const navigation = useNavigation<RequestAccessScreenNavigationProp>();

  const handleEmail = () => {
    const email = 'pedrosousa2160@gmail.com';
    const subject = 'Solicitação de Acesso - FalaAtípica';
    const body = 'Olá, sou [Preencha] e quero acesso ao FalaAtípica para acompanhar meu filho';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Erro ao abrir email:', err);
    });
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      {/* Navbar Component */}
      <Navbar 
        title="Solicitar Acesso"
        onBack={() => navigation.goBack()}
        showBackButton={true}
        showLogo={true}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Título Principal */}
        <Text style={styles.mainTitle}>Solicite seu Acesso ao FalaAtípica</Text>

        {/* Card do CEO - ENTRE TÍTULO E TEXTO */}
        <View style={styles.ceoCard}>
          <View style={styles.ceoImage}>
            <User size={24} color={COLORS.TEXT_WHITE} />
          </View>
          <View style={styles.ceoInfo}>
            <Text style={styles.ceoTitle}>CEO</Text>
            <Text style={styles.ceoName}>Pedro Lucas Reis</Text>
          </View>
        </View>

        {/* Texto Explicativo */}
        <Text style={styles.explanationText}>
          Sabemos da importância e da sensibilidade envolvidas nesse processo. Por isso, o acesso à área de tutores não é liberado automaticamente. Essa etapa garante que o aplicativo seja utilizado de forma segura, consciente e alinhada ao seu propósito original:
        </Text>

        {/* Bullet Points */}
        <View style={styles.bulletPoints}>
          <Text style={styles.bulletPoint}>• Não substituímos terapias clínicas.</Text>
          <Text style={styles.bulletPoint}>• Não somos um tratamento médico.</Text>
          <Text style={styles.bulletPoint}>• Somos um apoio educacional e comunicacional.</Text>
        </View>

        {/* Instruções */}
        <Text style={styles.instructionsText}>
          Para solicitar acesso, clique no botão abaixo e nos envie um e-mail explicando brevemente como pretende usar o Fala Atípica.
        </Text>

        {/* Card de Email */}
        <TouchableOpacity style={styles.emailCard} onPress={handleEmail}>
          <View style={styles.emailIcon}>
            <Mail size={24} color={COLORS.TEXT_WHITE} />
          </View>
          <View style={styles.emailInfo}>
            <Text style={styles.emailLabel}>Solicitar Acesso</Text>
            <Text style={styles.emailAddress}>Clique aqui para enviar sua solicitação</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>


    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginBottom: 20,
  },
  ceoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND_BLUE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  ceoImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ceoInfo: {
    flex: 1,
  },
  ceoTitle: {
    fontSize: 14,
    color: COLORS.TEXT_WHITE,
    marginBottom: 4,
  },
  ceoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  explanationText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoints: {
    marginBottom: 20,
  },
  bulletPoint: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
    lineHeight: 22,
  },
  instructionsText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
    marginBottom: 24,
  },
  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
  },
  emailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BACKGROUND_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emailInfo: {
    flex: 1,
  },
  emailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  emailAddress: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
  },
});

