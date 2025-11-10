import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Eye, Film, Gamepad2, Brain, X } from 'lucide-react-native';
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
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleGamePress = (game: Game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
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
        {/* Grid de Cards Micro */}
        <View style={styles.gamesGrid}>
          {games.map((game) => {
            const IconComponent = game.icon;
            
            return (
              <TouchableOpacity
                key={game.id}
                style={[styles.microCard, { borderColor: game.color }]}
                onPress={() => handleGamePress(game)}
                activeOpacity={0.7}
              >
                <View style={[styles.microIconContainer, { backgroundColor: game.color + '20' }]}>
                  <IconComponent size={32} color={game.color} />
                </View>
                <Text style={styles.microCardName}>{game.name}</Text>
                <Text style={styles.microCardAge}>{game.ageRange}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Nota Informativa */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>💡 Dica para Pais</Text>
          <Text style={styles.noteText}>
            Toque em cada jogo para ver detalhes sobre o que a criança desenvolve e aprende.
          </Text>
        </View>
      </ScrollView>

      {/* Modal de Detalhes do Jogo */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedGame && (
              <>
                {/* Header do Modal */}
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIconContainer, { backgroundColor: selectedGame.color + '20' }]}>
                    {React.createElement(selectedGame.icon, { size: 36, color: selectedGame.color })}
                  </View>
                  <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                    <X size={24} color={COLORS.TEXT_BLACK} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  {/* Título */}
                  <Text style={styles.modalTitle}>{selectedGame.name}</Text>
                  <Text style={styles.modalAge}>Idade recomendada: {selectedGame.ageRange}</Text>

                  {/* Descrição */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Sobre o Jogo</Text>
                    <Text style={styles.modalDescription}>{selectedGame.description}</Text>
                  </View>

                  {/* O que a criança aprende */}
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>O que a criança desenvolve</Text>
                    {selectedGame.learningGoals.map((goal, idx) => (
                      <View key={idx} style={styles.learningItem}>
                        <View style={[styles.bullet, { backgroundColor: selectedGame.color }]} />
                        <Text style={styles.learningText}>{goal}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Botão Fechar */}
                  <TouchableOpacity 
                    style={[styles.closeModalButton, { backgroundColor: selectedGame.color }]}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeModalButtonText}>Fechar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

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
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  microCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 12,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  microIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  microCardName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginBottom: 4,
  },
  microCardAge: {
    fontSize: 11,
    fontWeight: '500',
    color: '#888',
    textAlign: 'center',
  },
  noteContainer: {
    backgroundColor: COLORS.BLUE + '10',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.BLUE + '30',
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 6,
  },
  noteText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 6,
  },
  modalAge: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  modalDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  learningItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 4,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  learningText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },
  closeModalButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_WHITE,
  },
});

