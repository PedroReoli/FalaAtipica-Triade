import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Check, X, Star, Sparkles, Image as ImageIcon, Lightbulb } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { cenaCertaService, type CenaCerta } from '../services/cenaCertaService';
import { useAPIIntegration } from '../hooks/useAPIIntegration';
import { mockAuthService } from '../services/mockAuthService';

type CenaCertaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CenaCerta'>;

export const CenaCertaScreen: React.FC = () => {
  const navigation = useNavigation<CenaCertaScreenNavigationProp>();
  const config = cenaCertaService.getConfig();
  
  // ✅ Hook de integração com API
  const { sendProgress, emitGameStarted, emitGameCompleted } = useAPIIntegration();
  
  // Estados do jogo
  const [cenas, setCenas] = useState<CenaCerta[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frases, setFrases] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedFrase, setSelectedFrase] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [acertosSeguidos, setAcertosSeguidos] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  const [respostas, setRespostas] = useState<Array<{ cena: CenaCerta; correto: boolean; tempoResposta: number; usouPrompt: boolean }>>([]);
  
  // Refs
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Animações
  const imageHighlightAnim = useRef(new Animated.Value(0)).current;
  const celebrationAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  // Inicializar jogo
  useEffect(() => {
    startNewGame();
  }, []);

  // Timer de inatividade
  useEffect(() => {
    if (!showResult && currentIndex < cenas.length) {
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
    emitGameStarted('cena-certa', 'Cena Certa');
    setGameStartTime(Date.now());
    
    const cenasSelecionadas = cenaCertaService.getCenasMisturadas(config.totalRodadasPorSessao);
    setCenas(cenasSelecionadas);
    loadCena(0, cenasSelecionadas);
    setCurrentIndex(0);
    setScore(0);
    setGameCompleted(false);
    setSelectedFrase(null);
    setShowResult(false);
    setAcertosSeguidos(0);
    setShowPrompt(false);
    setRespostas([]);
  };

  const loadCena = (index: number, cenasList: CenaCerta[] = cenas) => {
    if (index < cenasList.length) {
      const cena = cenasList[index];
      const frasesEmbaralhadas = cenaCertaService.getFrasesEmbaralhadas(cena);
      setFrases(frasesEmbaralhadas);
      startTimeRef.current = Date.now();
    }
  };

  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Após 8 segundos de inatividade, mostrar dica visual
    inactivityTimerRef.current = setTimeout(() => {
      // Fading: apenas se não tiver muitos acertos seguidos
      if (acertosSeguidos < config.fadePromptAposAcertos) {
        setShowPrompt(true);
        animateImageHighlight();
      }
    }, config.tempoInatividade);
  };

  const animateImageHighlight = () => {
    // Piscar contorno na imagem
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageHighlightAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(imageHighlightAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateCelebration = () => {
    // Estrela
    Animated.sequence([
      Animated.timing(celebrationAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // Confete
    Animated.sequence([
      Animated.timing(confettiAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(confettiAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleAnswer = (frase: string) => {
    if (showResult) return;

    // Limpar timer
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    // Parar animações
    imageHighlightAnim.stopAnimation();
    imageHighlightAnim.setValue(0);

    const currentCena = cenas[currentIndex];
    const isCorrect = frase === currentCena.fraseCerta;
    const tempoResposta = Date.now() - startTimeRef.current;

    setSelectedFrase(frase);
    setShowResult(true);

    // Registrar resposta
    setRespostas(prev => [...prev, {
      cena: currentCena,
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
      // Destacar elemento correto na cena após erro
      if (config.destacarElemento) {
        animateImageHighlight();
      }
    }

    // Próxima rodada
    setTimeout(() => {
      if (currentIndex < cenas.length - 1) {
        nextRound();
      } else {
        finishGame();
      }
    }, 3000);
  };

  const nextRound = () => {
    setCurrentIndex(currentIndex + 1);
    loadCena(currentIndex + 1);
    setSelectedFrase(null);
    setShowResult(false);
    setShowPrompt(false);
    imageHighlightAnim.setValue(0);
  };

  const finishGame = async () => {
    // Calcular estatísticas
    const stats = calculateStats();
    const percentual = Math.round(stats.percentualAcerto);
    const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
    
    // ✅ ENVIAR PROGRESSO PARA API (com fallback)
    try {
      const currentUser = mockAuthService.getCurrentUser();
      
      if (currentUser) {
        await sendProgress({
          userId: currentUser.id,
          gameId: 'cena-certa',
          level: 1,
          score: percentual,
          correctAnswers: stats.acertos,
          wrongAnswers: stats.erros,
          timeSpent,
          category: 'geral'
        });
        
        // ✅ EMITIR EVENTO: Jogo completado
        emitGameCompleted('cena-certa', 'Cena Certa', percentual);
      }
    } catch (error) {
      console.log('⚠️ Erro ao enviar progresso, jogo continua:', error);
    }
    
    // ✅ SEMPRE MOSTRA RESULTADO (COM OU SEM API)
    setGameCompleted(true);
    console.log('Estatísticas Cena Certa:', stats);
  };

  const calculateStats = () => {
    const totalCenas = respostas.length;
    const acertos = respostas.filter(r => r.correto).length;
    const percentualAcerto = (acertos / totalCenas) * 100;
    const tempoMedio = respostas.reduce((sum, r) => sum + r.tempoResposta, 0) / totalCenas;
    const promptsUsados = respostas.filter(r => r.usouPrompt).length;
    
    // Por nível
    const porNivel = {
      nivel1: respostas.filter(r => r.cena.dificuldade === 1),
      nivel2: respostas.filter(r => r.cena.dificuldade === 2),
      nivel3: respostas.filter(r => r.cena.dificuldade === 3),
    };

    return {
      totalCenas,
      acertos,
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

  // Tela de resultado
  if (gameCompleted) {
    const stats = calculateStats();
    
    return (
      <SafeAreaView style={styles.container}>
        <InternalHeader title="Cena Certa" />
        
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Animated.View style={{ transform: [{ scale: celebrationAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.3] }) }] }}>
              <Star size={64} color={COLORS.YELLOW} fill={COLORS.YELLOW} />
            </Animated.View>
            
            <Text style={styles.resultTitle}>Parabéns! 🎉</Text>
            <Text style={styles.resultScore}>
              {score} de {cenas.length} cenas corretas!
            </Text>
            <Text style={styles.resultPercentage}>
              {stats.percentualAcerto}% de acertos
            </Text>
            
            {parseFloat(stats.percentualAcerto) === 100 && (
              <Text style={styles.perfectScore}>Perfeito! ⭐⭐⭐</Text>
            )}
            
            {parseFloat(stats.percentualAcerto) >= 75 && parseFloat(stats.percentualAcerto) < 100 && (
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

  // Jogo em andamento
  const currentCena = cenas[currentIndex];
  if (!currentCena) return null;

  const borderColor = imageHighlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.BLUE, COLORS.YELLOW]
  });

  const borderWidth = imageHighlightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 6]
  });

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader 
        title="Cena Certa" 
        showBackButton={true}
        onBack={() => navigation.navigate('Dashboard')}
      />

      <View style={styles.content}>
        {/* Info do jogo */}
        <View style={styles.gameInfo}>
          <Text style={styles.roundText}>
            Cena {currentIndex + 1} de {cenas.length}
          </Text>
          <Text style={styles.scoreText}>✨ {score} pontos</Text>
        </View>

        {/* Indicador de nível */}
        <View style={styles.levelIndicator}>
          <View 
            style={[
              styles.levelBadge,
              { backgroundColor: 
                currentCena.dificuldade === 1 ? COLORS.GREEN :
                currentCena.dificuldade === 2 ? COLORS.YELLOW :
                COLORS.RED
              }
            ]}
          >
            <Text style={styles.levelText}>
              Nível {currentCena.dificuldade}
            </Text>
          </View>
        </View>

        {/* Pergunta */}
        <Text style={styles.questionText}>Qual frase combina com a cena?</Text>

        {/* Imagem da Cena */}
        <Animated.View 
          style={[
            styles.sceneImageContainer,
            {
              borderColor: showPrompt || (showResult && !selectedFrase) ? borderColor : COLORS.BLUE,
              borderWidth: showPrompt || (showResult && !selectedFrase) ? borderWidth : 4
            }
          ]}
        >
          <View style={styles.imagePlaceholder}>
            <ImageIcon size={80} color={COLORS.BLUE} />
            <Text style={styles.imageDescription}>{currentCena.descricao}</Text>
          </View>
        </Animated.View>

        {/* Frases */}
        <View style={styles.frasesContainer}>
          {frases.map((frase, index) => {
            const isSelected = selectedFrase === frase;
            const isCorrect = frase === currentCena.fraseCerta;
            
            let buttonStyle = styles.fraseButton;
            let textStyle = styles.fraseText;
            
            if (showResult) {
              if (isSelected && isCorrect) {
                buttonStyle = [styles.fraseButton, styles.correctFrase];
                textStyle = [styles.fraseText, styles.correctText];
              } else if (isSelected && !isCorrect) {
                buttonStyle = [styles.fraseButton, styles.wrongFrase];
                textStyle = [styles.fraseText, styles.wrongText];
              } else if (isCorrect) {
                buttonStyle = [styles.fraseButton, styles.correctFrase];
                textStyle = [styles.fraseText, styles.correctText];
              }
            }
            
            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(frase)}
                disabled={showResult}
                activeOpacity={0.7}
              >
                <View style={styles.fraseContent}>
                  <Text style={textStyle}>{frase}</Text>
                  {showResult && isCorrect && (
                    <Check size={24} color={COLORS.TEXT_WHITE} />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X size={24} color={COLORS.TEXT_WHITE} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback */}
        {showResult && (
          <Animated.View 
            style={[
              styles.feedbackContainer,
              { 
                opacity: celebrationAnim,
                transform: [{
                  translateY: confettiAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20]
                  })
                }]
              }
            ]}
          >
            {selectedFrase === currentCena.fraseCerta ? (
              <View style={styles.feedbackSuccess}>
                <Sparkles size={32} color={COLORS.YELLOW} />
                <Text style={styles.feedbackTextSuccess}>Você acertou! 🎉</Text>
              </View>
            ) : (
              <View style={styles.feedbackError}>
                <Lightbulb size={28} color={COLORS.YELLOW} />
                <Text style={styles.feedbackTextError}>Veja a cena com atenção! 👀</Text>
              </View>
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
    padding: 16,
  },
  
  // Info do jogo
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  
  // Nível
  levelIndicator: {
    alignItems: 'center',
    marginBottom: 16,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  
  // Pergunta
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginBottom: 16,
  },
  
  // Imagem da cena
  sceneImageContainer: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  imagePlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  imageDescription: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    opacity: 0.6,
  },
  
  // Frases
  frasesContainer: {
    gap: 12,
  },
  fraseButton: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fraseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  fraseText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  correctFrase: {
    backgroundColor: COLORS.GREEN,
    borderColor: COLORS.GREEN,
  },
  wrongFrase: {
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  correctText: {
    color: COLORS.TEXT_WHITE,
    fontWeight: 'bold',
  },
  wrongText: {
    color: COLORS.TEXT_WHITE,
    fontWeight: 'bold',
  },
  
  // Feedback
  feedbackContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  feedbackSuccess: {
    alignItems: 'center',
    gap: 8,
  },
  feedbackError: {
    alignItems: 'center',
    gap: 8,
  },
  feedbackTextSuccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GREEN,
  },
  feedbackTextError: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.RED,
  },
  
  // Resultado
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

