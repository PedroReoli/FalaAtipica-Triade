import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Shield, Check, Crown, Star } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const freeFeatures = [
  'Acesso básico às funcionalidades',
  'Até 2 perfis de crianças',
  'Recursos educativos limitados',
  'Suporte por email',
];

const premiumFeatures = [
  'Acesso completo a todas as funcionalidades',
  'Perfis ilimitados de crianças',
  'Recursos educativos premium',
  'Conteúdo exclusivo',
  'Suporte prioritário',
  'Backup automático',
  'Relatórios detalhados',
  'Atualizações antecipadas',
];

export const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentPlan, setCurrentPlan] = useState<'free' | 'premium'>('free');

  const handleUpgradeToPremium = () => {
    // TODO: Implementar upgrade para premium
    console.log('Upgrade para premium');
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
        title="Minha Assinatura"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <Shield size={64} color={COLORS.BLUE} />
          <Text style={styles.title}>Minha Assinatura</Text>
          <Text style={styles.subtitle}>
            Gerencie seu plano e aproveite todos os recursos
          </Text>
        </View>

        {/* Plano Atual */}
        <View style={styles.currentPlanSection}>
          <Text style={styles.currentPlanTitle}>Seu Plano Atual</Text>
          <View style={[
            styles.planCard,
            currentPlan === 'premium' ? styles.premiumCard : styles.freeCard
          ]}>
            <View style={styles.planHeader}>
              {currentPlan === 'premium' ? (
                <Crown size={32} color={COLORS.YELLOW} />
              ) : (
                <Shield size={32} color={COLORS.BLUE} />
              )}
              <View style={styles.planInfo}>
                <Text style={styles.planName}>
                  {currentPlan === 'premium' ? 'Premium' : 'Free'}
                </Text>
                <Text style={styles.planStatus}>
                  {currentPlan === 'premium' ? 'Ativo' : 'Gratuito'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Comparação de Planos */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>Comparar Planos</Text>
          
          {/* Plano Free */}
          <View style={styles.planComparisonCard}>
            <View style={styles.planComparisonHeader}>
              <Shield size={24} color={COLORS.BLUE} />
              <Text style={styles.planComparisonName}>Free</Text>
              <Text style={styles.planComparisonPrice}>Grátis</Text>
            </View>
            <View style={styles.featuresList}>
              {freeFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={COLORS.GREEN} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Plano Premium */}
          <View style={[styles.planComparisonCard, styles.premiumComparisonCard]}>
            <View style={styles.premiumBadge}>
              <Star size={16} color={COLORS.TEXT_WHITE} />
              <Text style={styles.premiumBadgeText}>RECOMENDADO</Text>
            </View>
            <View style={styles.planComparisonHeader}>
              <Crown size={24} color={COLORS.YELLOW} />
              <Text style={styles.planComparisonName}>Premium</Text>
              <Text style={styles.planComparisonPrice}>R$ 19,90/mês</Text>
            </View>
            <View style={styles.featuresList}>
              {premiumFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={COLORS.GREEN} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            {currentPlan === 'free' && (
              <TouchableOpacity
                style={styles.upgradeButton}
                onPress={handleUpgradeToPremium}
              >
                <Crown size={20} color={COLORS.TEXT_WHITE} />
                <Text style={styles.upgradeButtonText}>Fazer Upgrade</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Informações Adicionais */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Informações Importantes</Text>
          <Text style={styles.infoText}>
            • Você pode cancelar sua assinatura a qualquer momento
          </Text>
          <Text style={styles.infoText}>
            • O pagamento é processado de forma segura
          </Text>
          <Text style={styles.infoText}>
            • Acesso imediato após a confirmação do pagamento
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    lineHeight: 24,
  },
  currentPlanSection: {
    marginBottom: 32,
  },
  currentPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
  },
  freeCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderColor: COLORS.BLUE,
  },
  premiumCard: {
    backgroundColor: '#FFF8E1',
    borderColor: COLORS.YELLOW,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planInfo: {
    marginLeft: 16,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  planStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  comparisonSection: {
    marginBottom: 32,
  },
  comparisonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  planComparisonCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  premiumComparisonCard: {
    borderColor: COLORS.YELLOW,
    position: 'relative',
  },
  premiumBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  premiumBadgeText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  planComparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planComparisonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginLeft: 12,
    flex: 1,
  },
  planComparisonPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    marginLeft: 12,
    flex: 1,
  },
  upgradeButton: {
    backgroundColor: COLORS.YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  upgradeButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
    lineHeight: 20,
  },
});
