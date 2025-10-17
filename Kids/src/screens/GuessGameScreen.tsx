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
import { useAPIIntegration } from '../hooks/useAPIIntegration';
import { mockAuthService } from '../services/mockAuthService';

type GuessGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GuessGame'>;

export const GuessGameScreen: React.FC = () => {
  const navigation = useNavigation<GuessGameScreenNavigationProp>();
  
  // ✅ Hook de integração com API
  const { sendProgress, emitGameStarted, emitGameCompleted } = useAPIIntegration();
  
  // Estados do jogo
  const [currentItem, setCurrentItem] = useState<ItemAdivinha | null>(null);
  const [alternativas, setAlternativas] = useState<Alternativa[]>([]);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [gameSequence, setGameSequence] = useState<ItemAdivinha[]>([]);
  const totalRounds = 14;

  // Inicializar jogo
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // ✅ EMITIR EVENTO: Jogo iniciado
    emitGameStarted('adivinha', 'Adivinha');
    setGameStartTime(Date.now());
    
    // Criar sequência de 14 rodadas sem repetir imagens seguidas
    const sequence = createGameSequence();
    setGameSequence(sequence);
    
    // Carregar primeira rodada
    if (sequence.length > 0) {
      loadItemFromSequence(0, sequence);
    }
    
    setScore(0);
    setCurrentRound(1);
    setGameCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const createGameSequence = (): ItemAdivinha[] => {
    // Pegar TODOS os itens de todas as categorias (7 itens)
    const todosItens: ItemAdivinha[] = [];
    const categorias = ['animais', 'frutas', 'objetos'];
    
    categorias.forEach(categoriaId => {
      const categoria = adivinhaService.getCategoria(categoriaId);
      if (categoria) {
        todosItens.push(...categoria.itens);
      }
    });

    // Duplicar itens (7 × 2 = 14)
    const itensDuplicados = [...todosItens, ...todosItens];
    
    // Embaralhar usando Fisher-Yates
    for (let i = itensDuplicados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [itensDuplicados[i], itensDuplicados[j]] = [itensDuplicados[j], itensDuplicados[i]];
    }
    
    // Remover repetições em sequência
    for (let i = 0; i < itensDuplicados.length - 1; i++) {
      if (itensDuplicados[i].id === itensDuplicados[i + 1].id) {
        // Encontrar um item diferente para trocar
        for (let j = i + 2; j < itensDuplicados.length; j++) {
          if (itensDuplicados[j].id !== itensDuplicados[i].id && 
              (j === itensDuplicados.length - 1 || itensDuplicados[j].id !== itensDuplicados[i + 2]?.id)) {
            // Trocar posições
            [itensDuplicados[i + 1], itensDuplicados[j]] = [itensDuplicados[j], itensDuplicados[i + 1]];
            break;
          }
        }
      }
    }
    
    return itensDuplicados;
  };

  const loadItemFromSequence = (index: number, sequence: ItemAdivinha[]) => {
    const item = sequence[index];
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
    const nextIndex = currentRound; // currentRound já é baseado em 1, então usar direto
    loadItemFromSequence(nextIndex, gameSequence);
    setCurrentRound(currentRound + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const finishGame = async () => {
    // Calcular percentual
    const percentual = Math.round((score / totalRounds) * 100);
    const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
    
    // ✅ ENVIAR PROGRESSO PARA API (com fallback)
    try {
      const currentUser = mockAuthService.getCurrentUser();
      
      if (currentUser) {
        await sendProgress({
          userId: currentUser.id,
          gameId: 'adivinha',
          level: 1,
          score: percentual,
          correctAnswers: score,
          wrongAnswers: totalRounds - score,
          timeSpent,
          category: 'animais'
        });
        
        // ✅ EMITIR EVENTO: Jogo completado
        emitGameCompleted('adivinha', 'Adivinha', percentual);
      }
    } catch (error) {
      console.log('⚠️ Erro ao enviar progresso, jogo continua:', error);
    }
    
    // ✅ SEMPRE MOSTRA RESULTADO (COM OU SEM API)
    setGameCompleted(true);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
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
            
            <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
              <Text style={styles.homeButtonText}>Voltar para Home</Text>
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

        {/* Imagem do item */}
        <View style={styles.shadowContainer}>
          <View style={styles.imageContainer}>
            {currentItem?.imagem && (
              <Image
                source={currentItem.imagem}
                style={styles.itemImage}
                resizeMode="contain"
              />
            )}
          </View>
          <Text style={styles.questionText}>O que é isso?</Text>
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
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 20,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
  },
  itemImage: {
    width: 220,
    height: 220,
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
  homeButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 12,
    padding: 16,
    minWidth: 150,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_WHITE,
  },
});
