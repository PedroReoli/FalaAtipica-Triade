import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  Mail, 
  Instagram, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  XCircle,
  Clock,
  Info
} from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { emailService } from '../utils/emailService';
import { API_BASE_URL } from '../config/api';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const contactInfo = [
  { id: '1', title: 'Email', value: 'pedrosousa2160@gmail.com', icon: 'mail' },
  { id: '2', title: 'Instagram', value: '@falaatipica', icon: 'instagram' },
];

const faqData = [
  {
    id: '1',
    question: 'Como acompanho o progresso da minha criança?',
    answer: 'Acesse a aba "Progresso" no menu principal. Lá você verá estatísticas detalhadas de cada jogo, tempo jogado e evolução geral. Se tiver mais de uma criança, use as setas para alternar entre elas.'
  },
  {
    id: '2',
    question: 'Como agendo consultas com o profissional?',
    answer: 'As consultas são agendadas pelo profissional que acompanha sua criança. Você receberá notificações e pode visualizar todas as agendas na aba "Agenda".'
  },
  {
    id: '3',
    question: 'Minha criança não está jogando. O que fazer?',
    answer: 'Verifique se a criança tem acesso ao app KIDS. Incentive-a a jogar diariamente por 15-20 minutos. Se persistir, entre em contato com o profissional responsável.'
  },
  {
    id: '4',
    question: 'Como adiciono outra criança?',
    answer: 'Entre em contato com o suporte através do email abaixo. Nossa equipe irá configurar o acesso para a nova criança.'
  },
  {
    id: '5',
    question: 'O app funciona offline?',
    answer: 'Sim! O app funciona offline. Os dados serão sincronizados automaticamente quando a conexão for restaurada.'
  },
];

export const SupportScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000),
      });
      
      if (response.ok) {
        setApiStatus('online');
      } else {
        setApiStatus('offline');
      }
    } catch (error) {
      setApiStatus('offline');
    }
  };

  const handleReportProblem = async () => {
    const currentUser = mockAuthService.getCurrentUser();
    
    Alert.alert(
      'Reportar Problema',
      'Deseja enviar um email descrevendo o problema encontrado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Enviar Email',
          onPress: async () => {
            const subject = 'Relato de Problema - FalaAtípica Tutors';
            const body = `Olá equipe FalaAtípica,

Gostaria de reportar um problema no aplicativo.

Dados da conta:
- Nome: ${currentUser?.nome || 'Não informado'}
- Email: ${currentUser?.email || 'Não informado'}

Descrição do problema:
[Descreva aqui o problema encontrado]

Atenciosamente,
${currentUser?.nome || 'Usuário'}`;

            try {
              const mailtoUrl = `mailto:pedrosousa2160@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              await Linking.openURL(mailtoUrl);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível abrir o cliente de email.');
            }
          }
        }
      ]
    );
  };

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

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
        {/* Status do Sistema */}
        <View style={[styles.statusCard, apiStatus === 'online' ? styles.statusOnline : styles.statusOffline]}>
          {apiStatus === 'online' ? (
            <CheckCircle size={18} color={COLORS.GREEN} />
          ) : apiStatus === 'offline' ? (
            <XCircle size={18} color={COLORS.RED} />
          ) : (
            <AlertCircle size={18} color={COLORS.YELLOW} />
          )}
          <Text style={styles.statusText}>
            Sistema: {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline (modo local)' : 'Verificando...'}
          </Text>
        </View>

        {/* Reportar Problema */}
        <TouchableOpacity style={styles.reportButton} onPress={handleReportProblem}>
          <AlertCircle size={20} color={COLORS.TEXT_WHITE} />
          <Text style={styles.reportButtonText}>Reportar Problema</Text>
        </TouchableOpacity>

        {/* Entre em Contato */}
        <Text style={styles.sectionTitle}>Entre em Contato</Text>
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

        {/* Horário de Atendimento */}
        <View style={styles.scheduleCard}>
          <Clock size={18} color={COLORS.BLUE} />
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTitle}>Horário de Atendimento</Text>
            <Text style={styles.scheduleText}>Segunda a Sexta: 9h às 18h</Text>
            <Text style={styles.scheduleText}>Sábado: 9h às 13h</Text>
          </View>
        </View>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
        <View style={styles.faqSection}>
          {faqData.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqCard}
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  {isExpanded ? (
                    <ChevronUp size={20} color={COLORS.BLUE} />
                  ) : (
                    <ChevronDown size={20} color={COLORS.BLUE} />
                  )}
                </View>
                {isExpanded && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Informações do App */}
        <View style={styles.appInfoCard}>
          <Info size={16} color={COLORS.BLUE} />
          <Text style={styles.appInfoText}>FalaAtípica Tutors v1.0.0</Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    gap: 10,
  },
  statusOnline: {
    backgroundColor: COLORS.GREEN + '15',
    borderWidth: 1,
    borderColor: COLORS.GREEN,
  },
  statusOffline: {
    backgroundColor: COLORS.YELLOW + '15',
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  reportButton: {
    backgroundColor: COLORS.RED,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_WHITE,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactSection: {
    marginBottom: 20,
    gap: 10,
  },
  contactCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  contactIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.GREEN + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfoContainer: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 13,
    color: COLORS.BLUE,
    fontWeight: '600',
  },
  scheduleCard: {
    backgroundColor: COLORS.BLUE + '10',
    borderWidth: 1,
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 6,
  },
  scheduleText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
    marginBottom: 2,
  },
  faqSection: {
    marginBottom: 20,
    gap: 10,
  },
  faqCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    lineHeight: 18,
  },
  appInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 20,
    gap: 8,
  },
  appInfoText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
  },
});
