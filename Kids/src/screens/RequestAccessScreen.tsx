import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { User, Mail } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type RequestAccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RequestAccess'>;

export const RequestAccessScreen: React.FC = () => {
  const navigation = useNavigation<RequestAccessScreenNavigationProp>();

  const handleHome = () => {
    navigation.navigate('Splash');
  };

  const handleEmail = () => {
    const email = 'pedrosousa2160@gmail.com';
    const subject = 'Solicitação de Acesso - FalaAtípica';
    const body = 'Olá, sou [Preencha] e quero acesso ao FalaAtípica';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Erro ao abrir email:', err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Solicitar Acesso" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
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

        {/* Seção Informativa */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Informativo</Text>
          
          <View style={styles.ceoCard}>
            <View style={styles.ceoImage}>
              <User size={24} color={COLORS.TEXT_WHITE} />
            </View>
            <View style={styles.ceoInfo}>
              <Text style={styles.ceoTitle}>CEO</Text>
              <Text style={styles.ceoName}>Pedro Lucas Reis</Text>
            </View>
          </View>
        </View>

        {/* Descrição do Projeto */}
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            O Fala Atípica é uma ferramenta criada com muito cuidado para apoiar a comunicação de crianças autistas não verbais.
          </Text>
          <Text style={styles.description}>
            Nossa missão é potencializar interações significativas entre crianças e adultos responsáveis, respeitando os diferentes ritmos, repertórios e necessidades.
          </Text>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },

  emailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BLUE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    gap: 12,
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
  },
  emailInfo: {
    flex: 1,
  },
  emailLabel: {
    fontSize: 14,
    color: COLORS.TEXT_WHITE,
    marginBottom: 4,
  },
  emailAddress: {
    fontSize: 14,
    color: COLORS.TEXT_WHITE,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginBottom: 16,
  },
  ceoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 3,
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
  ceoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ceoInfo: {
    flex: 1,
  },
  ceoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  ceoName: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
  },
  descriptionSection: {
    marginBottom: 40,
    gap: 16,
  },
  description: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
    textAlign: 'justify',
  },
});
