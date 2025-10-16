import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Shield, Check, Crown, Star } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { emailService } from '../utils/emailService';

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
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Buscar dados do usuário logado
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.nome);
      setUserEmail(currentUser.email);
    }
  }, []);

  const handleUpgradeToPremium = () => {
    Alert.alert(
      'Fazer Upgrade para Premium',
      'Deseja solicitar o upgrade para o plano Premium?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Solicitar',
          onPress: async () => {
            const success = await emailService.requestPremiumUpgrade(userName, userEmail);
            if (success) {
              Alert.alert(
                'Solicitação enviada!',
                'Você receberá as instruções de pagamento em breve.',
                [{ text: 'OK' }]
              );
            }
          }
        }
      ]
    );
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
        title="Minha Assinatura"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
             <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
         {/* Plano Free */}
         <View style={[
           styles.planCard,
           currentPlan === 'free' && styles.currentPlanCard
         ]}>
           {currentPlan === 'free' && (
             <View style={styles.currentBadge}>
               <Text style={styles.currentBadgeText}>PLANO ATUAL</Text>
             </View>
           )}
           <View style={styles.planHeader}>
             <Shield size={32} color={COLORS.BLUE} />
             <View style={styles.planInfo}>
               <Text style={styles.planName}>Free</Text>
               <Text style={styles.planPrice}>Grátis</Text>
             </View>
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
         <View style={[
           styles.planCard,
           styles.premiumCard,
           currentPlan === 'premium' && styles.currentPlanCard
         ]}>
           {currentPlan === 'premium' && (
             <View style={styles.currentBadge}>
               <Text style={styles.currentBadgeText}>PLANO ATUAL</Text>
             </View>
           )}
           <View style={styles.premiumBadge}>
             <Star size={16} color={COLORS.TEXT_WHITE} />
             <Text style={styles.premiumBadgeText}>RECOMENDADO</Text>
           </View>
           <View style={styles.planHeader}>
             <Crown size={32} color={COLORS.YELLOW} />
             <View style={styles.planInfo}>
               <Text style={styles.planName}>Premium</Text>
               <Text style={styles.planPrice}>R$ 19,90/mês</Text>
             </View>
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
  planCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  premiumCard: {
    backgroundColor: '#FFF8E1',
    borderColor: COLORS.YELLOW,
  },
  currentPlanCard: {
    borderColor: COLORS.GREEN,
    borderWidth: 3,
  },
  currentBadge: {
    position: 'absolute',
    top: -10,
    left: 16,
    backgroundColor: COLORS.GREEN,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  currentBadgeText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
  premiumBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: COLORS.YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  premiumBadgeText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  planInfo: {
    marginLeft: 16,
    flex: 1,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLUE,
    marginTop: 4,
  },
  featuresList: {
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    color: COLORS.TEXT_BLACK,
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  upgradeButton: {
    backgroundColor: COLORS.YELLOW,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  upgradeButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

