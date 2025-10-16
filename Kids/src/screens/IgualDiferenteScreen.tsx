import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Check, X, Star, Sparkles, Image as ImageIcon } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { igualDiferenteService, type ParIgualDiferente } from '../services/igualDiferenteService';
import { useAPIIntegration } from '../hooks/useAPIIntegration';
import { mockAuthService } from '../services/mockAuthService';

type IgualDiferenteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'IgualDiferente'>;

export const IgualDiferenteScreen: React.FC = () => {
  const navigation = useNavigation<IgualDiferenteScreenNavigationProp>();
  const config = igualDiferenteService.getConfig();
  
  // ✅ Hook de integração com API
  const { sendProgress, emitGameStarted, emitGameCompleted } = useAPIIntegration();
  
  // Estados do jogo
  const [pares, setPares] = useState<ParIgualDiferente[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'igual' | 'diferente' | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [acertosSeguidos, setAcertosSeguidos] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [respostas, setRespostas] = useState<Array<{ par: ParIgualDiferente; correto: boolean; tempoResposta: number; usouPrompt: boolean }>>([]);
  
  // Refs para timers
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Animações
  const promptAnim = useRef(new Animated.Value(0)).current;
  const celebrationAnim = useRef(new Animated.Value(0)).current;

  // Inicializar jogo
  useEffect(() => {
    startNewGame();
  }, []);

  // Timer de inatividade
  useEffect(() => {
    if (!showResult && currentIndex < pares.length) {
      startInactivityTimer();
    }
    
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [currentIndex, showResult]);

  const startNewGame = () => {
    // ✅ EMITIR EVENTO: Jogo iniciado
    emitGameStarted('igual-diferente', 'Igual ou Diferente');
    setGameStartTime(Date.now());
    
    const paresSelecionados = igualDiferenteService.getParesMisturados(config.totalRodadasPorSessao);
    setPares(paresSelecionados);
    setCurrentIndex(0);
    setScore(0);
    setGameCompleted(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setAcertosSeguidos(0);
    setShowPrompt(false);
    setRespostas([]);
  };

  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Após 5 segundos de inatividade, mostrar prompt (piscando na resposta correta)
    inactivityTimerRef.current = setTimeout(() => {
      // Apenas mostrar prompt se ainda não tiver acertos seguidos suficientes (fading)
      if (acertosSeguidos < config.fadePromptAposAcertos) {
        setShowPrompt(true);
        animatePrompt();
      }
    }, config.tempoInatividade);
  };

  const animatePrompt = () => {
    // Animação de piscar
    Animated.loop(
      Animated.sequence([
        Animated.timing(promptAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(promptAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateCelebration = () => {
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAnswer = (answer: 'igual' | 'diferente') => {
    if (showResult) return;

    // Limpar timer de inatividade
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Parar animação de prompt
    promptAnim.stopAnimation();
    promptAnim.setValue(0);

    const currentPar = pares[currentIndex];
    const isCorrect = answer === currentPar.resposta;
    const tempoResposta = Date.now() - startTimeRef.current;

    setSelectedAnswer(answer);
    setShowResult(true);

    // Registrar resposta
    setRespostas(prev => [...prev, {
      par: currentPar,
      correto: isCorrect,
      tempoResposta,
      usouPrompt: showPrompt
    }]);

    if (isCorrect) {
      setScore(score + 1);
      setAcertosSeguidos(acertosSeguidos + 1);
      animateCelebration();
    } else {
      setAcertosSeguidos(0);
    }

    // Próxima rodada ou finalizar
    setTimeout(() => {
      if (currentIndex < pares.length - 1) {
        nextRound();
      } else {
        finishGame();
      }
    }, 2000);
  };

  const nextRound = () => {
    setCurrentIndex(currentIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowPrompt(false);
    promptAnim.setValue(0);
    startTimeRef.current = Date.now();
  };

  const finishGame = async () => {
    // Calcular estatísticas
    const stats = calculateStats();
    const percentual = parseFloat(stats.percentualAcerto);
    const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
    
    // ✅ ENVIAR PROGRESSO PARA API (com fallback)
    try {
      const currentUser = mockAuthService.getCurrentUser();
      
      if (currentUser) {
        await sendProgress({
          userId: currentUser.id,
          gameId: 'igual-diferente',
          level: 1,
          score: percentual,
          correctAnswers: stats.acertos,
          wrongAnswers: stats.erros,
          timeSpent,
          category: 'geral'
        });
        
        // ✅ EMITIR EVENTO: Jogo completado
        emitGameCompleted('igual-diferente', 'Igual ou Diferente', percentual);
      }
    } catch (error) {
      console.log('⚠️ Erro ao enviar progresso, jogo continua:', error);
    }
    
    // ✅ SEMPRE MOSTRA RESULTADO (COM OU SEM API)
    setGameCompleted(true);
    console.log('Estatísticas do jogo:', stats);
  };

  const calculateStats = () => {
    const totalPares = respostas.length;
    const acertos = respostas.filter(r => r.correto).length;
    const erros = totalPares - acertos;
    const percentualAcerto = (acertos / totalPares) * 100;
    const tempoMedio = respostas.reduce((sum, r) => sum + r.tempoResposta, 0) / totalPares;
    const promptsUsados = respostas.filter(r => r.usouPrompt).length;
    
    // Análise por nível
    const porNivel = {
      nivel1: respostas.filter(r => r.par.dificuldade === 1),
      nivel2: respostas.filter(r => r.par.dificuldade === 2),
      nivel3: respostas.filter(r => r.par.dificuldade === 3),
    };

    return {
      totalPares,
      acertos,
      erros,
      percentualAcerto: percentualAcerto.toFixed(1),
      tempoMedio: Math.round(tempoMedio / 1000),
      promptsUsados,
      porNivel: {
        nivel1: {
          total: porNivel.nivel1.length,
          acertos: porNivel.nivel1.filter(r => r.correto).length,
        },
        nivel2: {
          total: porNivel.nivel2.length,
          acertos: porNivel.nivel2.filter(r => r.correto).length,
        },
        nivel3: {
          total: porNivel.nivel3.length,
          acertos: porNivel.nivel3.filter(r => r.correto).length,
        },
      }
    };
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  // Tela de resultado final
  if (gameCompleted) {
    const stats = calculateStats();
    
    return (
      <SafeAreaView style={styles.container}>
        <InternalHeader title="Igual-Diferente" />
        
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Animated.View style={{ transform: [{ scale: celebrationAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] }}>
              <Star size={64} color={COLORS.YELLOW} fill={COLORS.YELLOW} />
            </Animated.View>
            
            <Text style={styles.resultTitle}>Parabéns! 🎉</Text>
            <Text style={styles.resultScore}>
              Você acertou {score} de {pares.length} pares!
            </Text>
            <Text style={styles.resultPercentage}>
              {stats.percentualAcerto}% de acertos
            </Text>
            
            {parseFloat(stats.percentualAcerto) === 100 && (
              <Text style={styles.perfectScore}>Perfeito! ⭐⭐⭐</Text>
            )}
            
            {parseFloat(stats.percentualAcerto) >= 80 && parseFloat(stats.percentualAcerto) < 100 && (
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

  // Tela do jogo
  const currentPar = pares[currentIndex];
  if (!currentPar) return null;

  const isCorrectAnswer = (answer: 'igual' | 'diferente') => {
    return answer === currentPar.resposta;
  };

  const getButtonStyle = (buttonType: 'igual' | 'diferente') => {
    const isSelected = selectedAnswer === buttonType;
    const isCorrect = isCorrectAnswer(buttonType);
    
    if (!showResult) {
      // Mostrar prompt (piscar) no botão correto se inativo
      if (showPrompt && isCorrect) {
        return [
          styles.answerButton,
          { 
            borderColor: COLORS.YELLOW,
            borderWidth: 4,
            opacity: promptAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1]
            })
          }
        ];
      }
      return styles.answerButton;
    }
    
    if (isSelected && isCorrect) {
      return [styles.answerButton, styles.correctAnswer];
    } else if (isSelected && !isCorrect) {
      return [styles.answerButton, styles.wrongAnswer];
    } else if (isCorrect) {
      return [styles.answerButton, styles.correctAnswer];
    }
    
    return styles.answerButton;
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader 
        title="Igual-Diferente" 
        showBackButton={true}
        onBack={() => navigation.navigate('Dashboard')}
      />

      <View style={styles.content}>
        {/* Informações do jogo */}
        <View style={styles.gameInfo}>
          <Text style={styles.roundText}>
            Par {currentIndex + 1} de {pares.length}
          </Text>
          <Text style={styles.scoreText}>✨ {score} pontos</Text>
        </View>

        {/* Indicador de nível */}
        <View style={styles.levelIndicator}>
          <View 
            style={[
              styles.levelBadge,
              { backgroundColor: 
                currentPar.dificuldade === 1 ? COLORS.GREEN :
                currentPar.dificuldade === 2 ? COLORS.YELLOW :
                COLORS.RED
              }
            ]}
          >
            <Text style={styles.levelText}>
              Nível {currentPar.dificuldade}
            </Text>
          </View>
        </View>

        {/* Área dos Pares */}
        <View style={styles.pairsContainer}>
          <Text style={styles.questionText}>Estes são iguais ou diferentes?</Text>
          
          <View style={styles.pairsRow}>
            {/* Item 1 */}
            <View style={styles.itemCard}>
              {currentPar.item1.tipo === 'texto' ? (
                <Text style={styles.itemText}>{currentPar.item1.conteudo}</Text>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <ImageIcon size={60} color={COLORS.BLUE} />
                  <Text style={styles.imageName}>{currentPar.item1.conteudo}</Text>
                </View>
              )}
            </View>

            {/* Separador */}
            <Text style={styles.separator}>×</Text>

            {/* Item 2 */}
            <View style={styles.itemCard}>
              {currentPar.item2.tipo === 'texto' ? (
                <Text style={styles.itemText}>{currentPar.item2.conteudo}</Text>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <ImageIcon size={60} color={COLORS.BLUE} />
                  <Text style={styles.imageName}>{currentPar.item2.conteudo}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Botões de Resposta */}
        <View style={styles.answersContainer}>
          <Animated.View style={getButtonStyle('igual')}>
            <TouchableOpacity
              style={styles.answerButtonTouchable}
              onPress={() => handleAnswer('igual')}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.answerButtonText,
                selectedAnswer === 'igual' && showResult && styles.selectedText
              ]}>
                IGUAL
              </Text>
              {showResult && isCorrectAnswer('igual') && (
                <Check size={24} color={COLORS.TEXT_WHITE} />
              )}
              {showResult && selectedAnswer === 'igual' && !isCorrectAnswer('igual') && (
                <X size={24} color={COLORS.TEXT_WHITE} />
              )}
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={getButtonStyle('diferente')}>
            <TouchableOpacity
              style={styles.answerButtonTouchable}
              onPress={() => handleAnswer('diferente')}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.answerButtonText,
                selectedAnswer === 'diferente' && showResult && styles.selectedText
              ]}>
                DIFERENTE
              </Text>
              {showResult && isCorrectAnswer('diferente') && (
                <Check size={24} color={COLORS.TEXT_WHITE} />
              )}
              {showResult && selectedAnswer === 'diferente' && !isCorrectAnswer('diferente') && (
                <X size={24} color={COLORS.TEXT_WHITE} />
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Feedback Visual */}
        {showResult && (
          <Animated.View 
            style={[
              styles.feedbackContainer,
              { opacity: celebrationAnim }
            ]}
          >
            {selectedAnswer === currentPar.resposta ? (
              <>
                <Sparkles size={32} color={COLORS.YELLOW} />
                <Text style={styles.feedbackTextSuccess}>Perfeito! 🎉</Text>
              </>
            ) : (
              <Text style={styles.feedbackTextError}>Tente novamente! 😊</Text>
            )}
          </Animated.View>
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
  
  // Info do jogo
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roundText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.BLUE,
  },
  
  // Indicador de nível
  levelIndicator: {
    alignItems: 'center',
    marginBottom: 24,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  
  // Pares
  pairsContainer: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginBottom: 24,
  },
  pairsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  itemCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
    padding: 24,
    minWidth: 140,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  itemText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  imageName: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  separator: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  
  // Botões de resposta
  answersContainer: {
    gap: 16,
  },
  answerButton: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  answerButtonTouchable: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  answerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  selectedText: {
    color: COLORS.TEXT_WHITE,
  },
  correctAnswer: {
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.GREEN,
  },
  wrongAnswer: {
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  
  // Feedback
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  feedbackTextSuccess: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.GREEN,
  },
  feedbackTextError: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.RED,
  },
  
  // Resultado final
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    minWidth: 300,
    gap: 16,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
  },
  resultScore: {
    fontSize: 20,
    color: COLORS.TEXT_BLACK,
  },
  resultPercentage: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLUE,
  },
  perfectScore: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.YELLOW,
    marginTop: 8,
  },
  goodScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.GREEN,
    marginTop: 8,
  },
  playAgainButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 12,
    padding: 16,
    minWidth: 180,
    alignItems: 'center',
    marginTop: 16,
  },
  playAgainText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
});

