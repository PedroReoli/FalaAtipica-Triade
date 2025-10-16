import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const faqData = [
  {
    id: '1',
    question: 'Como acompanho o progresso da minha criança?',
    answer: 'Acesse a aba "Progresso" no menu principal. Lá você verá estatísticas detalhadas de cada jogo, tempo jogado e evolução geral. Se tiver mais de uma criança, use as setas (← →) para alternar entre elas e visualizar o progresso individual de cada uma.'
  },
  {
    id: '2',
    question: 'Como entro em contato com o profissional?',
    answer: 'O contato direto com o profissional é feito através das consultas agendadas na aba "Agenda". Em caso de urgência ou dúvidas, você pode solicitar um contato através do suporte enviando email para pedrosousa2160@gmail.com.'
  },
  {
    id: '3',
    question: 'Como vejo o histórico de consultas?',
    answer: 'Na aba "Agenda", use os filtros no topo da tela. Selecione "Histórico" para ver todas as consultas concluídas ou canceladas. Você pode expandir cada consulta clicando nela para ver detalhes completos e observações do profissional.'
  },
];

export const FAQScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
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

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Perguntas Frequentes"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <Text style={styles.headerText}>
          Encontre respostas para as dúvidas mais comuns sobre o FalaAtípica.
        </Text>

        {/* FAQ Cards */}
        <View style={styles.faqSection}>
          {faqData.map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <TouchableOpacity
                key={faq.id}
                style={[
                  isExpanded ? styles.faqCardExpanded : styles.faqCard,
                ]}
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <HelpCircle size={18} color={COLORS.BLUE} />
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <View style={styles.expandIcon}>
                    {isExpanded ? (
                      <ChevronUp size={20} color={COLORS.BLUE} />
                    ) : (
                      <ChevronDown size={20} color={COLORS.BLUE} />
                    )}
                  </View>
                </View>
                {isExpanded && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{faq.answer}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Rodapé de Ajuda */}
        <View style={styles.helpFooter}>
          <Text style={styles.helpFooterText}>
            Não encontrou a resposta que procurava?
          </Text>
          <Text style={styles.helpFooterEmail}>
            Entre em contato: pedrosousa2160@gmail.com
          </Text>
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
  headerText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginBottom: 16,
    lineHeight: 19,
    textAlign: 'center',
  },
  faqSection: {
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
  faqCardExpanded: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  expandIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqAnswerContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  faqAnswer: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    lineHeight: 18,
  },
  helpFooter: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    alignItems: 'center',
  },
  helpFooterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 6,
  },
  helpFooterEmail: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.BLUE,
  },
});

