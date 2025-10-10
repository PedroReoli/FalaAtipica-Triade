import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Zap, Lightbulb, Check, X, HelpCircle } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { adivinhaService } from '../services/adivinhaService';
import type { ItemAdivinha, Alternativa } from '../services/adivinhaService';

type GuessGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GuessGame'>;

export const GuessGameScreen: React.FC = () => {
  const navigation = useNavigation<GuessGameScreenNavigationProp>();
  
  // Estados do jogo
  const [currentItem, setCurrentItem] = useState<ItemAdivinha | null>(null);
  const [alternativas, setAlternativas] = useState<Alternativa[]>([]);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const totalRounds = 5;

  // Inicializar jogo
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    loadNewItem();
    setScore(0);
    setCurrentRound(1);
    setGameCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const loadNewItem = () => {
    // Buscar item aleatório da categoria animais
    const item = adivinhaService.getRandomItem('animais');
    if (item) {
      setCurrentItem(item);
      // Embaralhar e pegar 4 alternativas
      const embaralhadas = adivinhaService.getAlternativasEmbaralhadas(item, 4);
      setAlternativas(embaralhadas);
    }
  };

  const handleAnswer = (alternativaId: string) => {
    if (showResult) return;
    
    setSelectedAnswer(alternativaId);
    setShowResult(true);
    
    const alternativa = alternativas.find(alt => alt.id === alternativaId);
    if (alternativa?.correta) {
      setScore(score + 1);
    }
    
    // Mostrar resultado por 2 segundos
    setTimeout(() => {
      if (currentRound < totalRounds) {
        nextRound();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const nextRound = () => {
    loadNewItem();
    setCurrentRound(currentRound + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const finishGame = () => {
    setGameCompleted(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  // Tela de resultado final
  if (gameCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <InternalHeader title="Adivinha" />
        
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Parabéns! 🎉</Text>
            <Text style={styles.resultScore}>Você acertou {score} de {totalRounds} perguntas!</Text>
            
            {score === totalRounds && (
              <Text style={styles.perfectScore}>Perfeito! ⭐</Text>
            )}
            
            {score >= totalRounds * 0.8 && score < totalRounds && (
              <Text style={styles.goodScore}>Muito bem! 🌟</Text>
            )}
            
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader 
        title="Adivinha" 
        showBackButton={true}
        onBack={() => navigation.navigate('Dashboard')}
      />

      <View style={styles.content}>
        {/* Informações do jogo */}
        <View style={styles.gameInfo}>
          <Text style={styles.roundText}>Pergunta {currentRound} de {totalRounds}</Text>
          <Text style={styles.scoreText}>✨ {score} pontos</Text>
        </View>

        {/* Sombra/Imagem do item */}
        <View style={styles.shadowContainer}>
          <View style={styles.shadowImage}>
            <HelpCircle size={80} color={COLORS.TEXT_WHITE} />
          </View>
          <Text style={styles.questionText}>Qual é este animal?</Text>
        </View>

        {/* Alternativas */}
        <View style={styles.alternativesContainer}>
          {alternativas.map((alternativa, index) => {
            const isSelected = selectedAnswer === alternativa.id;
            const isCorrect = alternativa.correta;
            const showCorrect = showResult && isCorrect;
            const showWrong = showResult && isSelected && !isCorrect;
            
            return (
              <TouchableOpacity
                key={alternativa.id}
                style={[
                  styles.alternativeButton,
                  isSelected && styles.selectedAlternative,
                  showCorrect && styles.correctAlternative,
                  showWrong && styles.wrongAlternative
                ]}
                onPress={() => handleAnswer(alternativa.id)}
                disabled={showResult}
              >
                <Text style={[
                  styles.alternativeText,
                  isSelected && styles.selectedAlternativeText,
                  showCorrect && styles.correctAlternativeText,
                  showWrong && styles.wrongAlternativeText
                ]}>
                  {alternativa.nome}
                </Text>
                {showResult && (
                  <View style={styles.resultIcon}>
                    {isCorrect ? (
                      <Check size={20} color={COLORS.GREEN} />
                    ) : isSelected ? (
                      <X size={20} color={COLORS.RED} />
                    ) : null}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {showResult && (
          <View style={styles.feedbackContainer}>
            {selectedAnswer && alternativas.find(alt => alt.id === selectedAnswer)?.correta ? (
              <Text style={styles.feedbackText}>Parabéns! 🎉</Text>
            ) : (
              <Text style={styles.feedbackText}>Tente novamente! 😊</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  roundText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLUE,
  },
  shadowContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  shadowImage: {
    width: 150,
    height: 150,
    backgroundColor: COLORS.BACKGROUND_BLUE,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  shadowText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  alternativesContainer: {
    gap: 12,
  },
  alternativeButton: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAlternative: {
    borderColor: COLORS.BLUE,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  correctAlternative: {
    borderColor: COLORS.GREEN,
    backgroundColor: '#E8F5E8',
  },
  wrongAlternative: {
    borderColor: COLORS.RED,
    backgroundColor: '#FFE8E8',
  },
  alternativeText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  selectedAlternativeText: {
    color: COLORS.BLUE,
  },
  correctAlternativeText: {
    color: COLORS.GREEN,
  },
  wrongAlternativeText: {
    color: COLORS.RED,
  },
  resultIcon: {
    marginLeft: 10,
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    minWidth: 280,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 10,
  },
  resultScore: {
    fontSize: 18,
    color: COLORS.TEXT_BLACK,
    marginBottom: 10,
  },
  perfectScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.YELLOW,
    marginBottom: 20,
  },
  goodScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GREEN,
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 12,
    padding: 16,
    minWidth: 150,
    alignItems: 'center',
  },
  playAgainText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_WHITE,
  },
});
