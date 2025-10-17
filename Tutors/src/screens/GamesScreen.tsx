import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Eye, Film, Gamepad2, Brain, ArrowLeft } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Game {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  learningGoals: string[];
  ageRange: string;
}

const games: Game[] = [
  {
    id: 'igual-diferente',
    name: 'Igual ou Diferente',
    icon: Eye,
    color: COLORS.YELLOW,
    description: 'Jogo de discriminação visual onde a criança identifica semelhanças e diferenças entre imagens.',
    learningGoals: [
      'Desenvolver atenção visual e concentração',
      'Aprimorar discriminação de detalhes',
      'Estimular raciocínio comparativo',
      'Fortalecer memória visual'
    ],
    ageRange: '3-6 anos'
  },
  {
    id: 'cena-certa',
    name: 'Cena Certa',
    icon: Film,
    color: COLORS.RED,
    description: 'Jogo de associação contextual onde a criança relaciona objetos aos seus ambientes apropriados.',
    learningGoals: [
      'Desenvolver compreensão de contextos',
      'Estimular vocabulário situacional',
      'Aprimorar raciocínio lógico',
      'Fortalecer associação semântica'
    ],
    ageRange: '4-8 anos'
  },
  {
    id: 'adivinha',
    name: 'Adivinha',
    icon: Gamepad2,
    color: COLORS.BLUE,
    description: 'Jogo de reconhecimento e nomeação onde a criança identifica e nomeia objetos, animais e conceitos.',
    learningGoals: [
      'Expandir vocabulário receptivo e expressivo',
      'Estimular nomeação espontânea',
      'Desenvolver categorização',
      'Fortalecer memória semântica'
    ],
    ageRange: '3-7 anos'
  },
  {
    id: 'palavras',
    name: 'Jogo das Palavras',
    icon: Brain,
    color: COLORS.GREEN,
    description: 'Jogo de leitura e escrita onde a criança forma palavras através da associação entre sons e letras.',
    learningGoals: [
      'Desenvolver consciência fonológica',
      'Estimular habilidades de leitura inicial',
      'Aprimorar relação grafema-fonema',
      'Fortalecer vocabulário escrito'
    ],
    ageRange: '5-9 anos'
  }
];

export const GamesScreen: React.FC = () => {
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
        title="Jogos Educativos"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Introdução */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>4 Jogos Especializados</Text>
          <Text style={styles.introText}>
            Cada jogo foi desenvolvido por fonoaudiólogos para estimular diferentes aspectos do desenvolvimento da fala e linguagem.
          </Text>
        </View>

        {/* Lista de Jogos */}
        {games.map((game, index) => {
          const IconComponent = game.icon;
          
          return (
            <View 
              key={game.id} 
              style={[
                styles.gameCard,
                { borderLeftColor: game.color }
              ]}
            >
              {/* Header do Card */}
              <View style={styles.gameHeader}>
                <View style={[styles.gameIconContainer, { backgroundColor: game.color + '20' }]}>
                  <IconComponent size={28} color={game.color} />
                </View>
                <View style={styles.gameHeaderText}>
                  <Text style={styles.gameName}>{game.name}</Text>
                  <Text style={styles.gameAge}>Idade recomendada: {game.ageRange}</Text>
                </View>
              </View>

              {/* Descrição */}
              <Text style={styles.gameDescription}>{game.description}</Text>

              {/* O que a criança aprende */}
              <View style={styles.learningSection}>
                <Text style={styles.learningSectionTitle}>O que a criança desenvolve:</Text>
                {game.learningGoals.map((goal, idx) => (
                  <View key={idx} style={styles.learningItem}>
                    <View style={[styles.bullet, { backgroundColor: game.color }]} />
                    <Text style={styles.learningText}>{goal}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Nota Informativa */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>💡 Dica para Pais</Text>
          <Text style={styles.noteText}>
            Incentive seu filho a jogar regularmente, mas respeite o ritmo dele. Cada criança aprende no seu tempo. 
            O importante é tornar o aprendizado divertido e sem pressão!
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
  },
  introContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: COLORS.BACKGROUND_BLUE + '10',
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BACKGROUND_BLUE + '30',
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  gameCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRightColor: '#F0F0F0',
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  gameIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameHeaderText: {
    flex: 1,
  },
  gameName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  gameAge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  gameDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  learningSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
  },
  learningSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  learningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 10,
  },
  learningText: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
  noteContainer: {
    backgroundColor: COLORS.BLUE + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.BLUE + '30',
  },
  noteTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 19,
  },
});

