import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ExternalLink, Lightbulb, Heart, MessageCircle, FileText, ChevronDown, ChevronUp, Video, Headphones } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Dicas práticas para os pais/tutores
const practicalTips = [
  {
    id: '1',
    title: 'Estabeleça uma rotina diária',
    description: 'Crie horários fixos para as atividades do app (15-20min por dia). A consistência é fundamental para o desenvolvimento da criança.',
    icon: Lightbulb,
  },
  {
    id: '2',
    title: 'Comemore cada pequena conquista',
    description: 'Reforce positivamente cada progresso, por menor que seja. Elogios e abraços fazem toda a diferença na motivação da criança.',
    icon: Heart,
  },
  {
    id: '3',
    title: 'Mantenha contato com o profissional',
    description: 'Participe ativamente das consultas e tire todas as suas dúvidas. A parceria entre família e profissional é essencial.',
    icon: MessageCircle,
  },
];

// Recursos externos úteis
const resources = [
  {
    id: '1',
    title: 'Me Ajuda a Falar - Guia Prático',
    description: 'Guia completo com atividades e técnicas para estimular a fala',
    url: 'https://www.carapicuiba.escolaeduc.com.br/pdf_deficienc/me-ajuda-a-falar.pdf',
    icon: FileText,
    color: COLORS.RED,
  },
  {
    id: '2',
    title: 'Instituto ABCD - Dicas e Orientações',
    description: 'Artigos e vídeos sobre desenvolvimento infantil e linguagem',
    url: 'https://institutoabcd.org.br/',
    icon: Video,
    color: COLORS.BLUE,
  },
  {
    id: '3',
    title: 'SBFa - Sociedade Brasileira de Fonoaudiologia',
    description: 'Encontre profissionais e materiais especializados',
    url: 'https://www.sbfa.org.br/',
    icon: Headphones,
    color: COLORS.GREEN,
  },
];

export const TipsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const handleOpenLink = async (url: string, title: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Erro', 'Não foi possível abrir o link.');
      }
    } catch (error) {
      Alert.alert('Erro', `Não foi possível abrir ${title}`);
    }
  };

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
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
        title="Dicas e Recursos"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dicas Práticas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Dicas Práticas para o Dia a Dia</Text>
          <View style={styles.tipsList}>
            {practicalTips.map((tip) => {
              const IconComponent = tip.icon;
              const isExpanded = expandedTip === tip.id;
              return (
                <TouchableOpacity
                  key={tip.id}
                  style={styles.tipCard}
                  onPress={() => toggleTip(tip.id)}
                >
                  <View style={styles.tipHeader}>
                    <IconComponent size={20} color={COLORS.BLUE} />
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    {isExpanded ? (
                      <ChevronUp size={20} color={COLORS.TEXT_BLACK} />
                    ) : (
                      <ChevronDown size={20} color={COLORS.TEXT_BLACK} />
                    )}
                  </View>
                  {isExpanded && (
                    <Text style={styles.tipDescription}>{tip.description}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recursos Externos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔗 Recursos e Links Úteis</Text>
          <View style={styles.resourcesList}>
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <TouchableOpacity
                  key={resource.id}
                  style={[styles.resourceCard, { borderColor: resource.color }]}
                  onPress={() => handleOpenLink(resource.url, resource.title)}
                >
                  <View style={styles.resourceHeader}>
                    <IconComponent size={24} color={resource.color} />
                    <View style={styles.resourceInfo}>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                      <Text style={styles.resourceDescription}>{resource.description}</Text>
                    </View>
                    <ExternalLink size={20} color={resource.color} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Lembrete Importante */}
        <View style={styles.reminderSection}>
          <View style={styles.reminderHeader}>
            <Heart size={24} color={COLORS.RED} />
            <Text style={styles.reminderTitle}>Lembre-se</Text>
          </View>
          <Text style={styles.reminderText}>
            Cada criança tem seu próprio ritmo de desenvolvimento. Seja paciente, mantenha a consistência nas atividades e celebre cada pequena conquista. O amor e o apoio da família são fundamentais! 💙
          </Text>
        </View>

        {/* Espaçamento para o Footer */}
        <View style={{ height: 20 }} />
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
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  
  // Dicas Práticas
  tipsList: {
    gap: 10,
  },
  tipCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 10,
    padding: 12,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tipTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  tipDescription: {
    fontSize: 13,
    color: COLORS.TEXT_BLACK,
    lineHeight: 18,
    marginTop: 10,
    paddingLeft: 30,
  },

  // Recursos Externos
  resourcesList: {
    gap: 12,
  },
  resourceCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderRadius: 10,
    padding: 14,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    opacity: 0.7,
  },

  // Lembrete
  reminderSection: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  reminderText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    lineHeight: 20,
  },
});
