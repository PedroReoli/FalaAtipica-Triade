import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Star, Sparkles, Image as ImageIcon, X } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { palavrasService, type PalavraJogo } from '../services/palavrasService';

type PalavrasGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PalavrasGame'>;
type PalavrasGameScreenRouteProp = RouteProp<RootStackParamList, 'PalavrasGame'>;

interface DraggableItem {
  id: string;
  text: string;
  isInFormation: boolean;
  formationIndex: number | null;
}

export const PalavrasGameScreen: React.FC = () => {
  const navigation = useNavigation<PalavrasGameScreenNavigationProp>();
  const route = useRoute<PalavrasGameScreenRouteProp>();
  const { categoryId } = route.params;
  const config = palavrasService.getConfig();
  
  // Estados
  const [palavras, setPalavras] = useState<PalavraJogo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [acertosSeguidos, setAcertosSeguidos] = useState(0);
  const [tentativasAtuais, setTentativasAtuais] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  
  // Estados para drag & drop
  const [items, setItems] = useState<DraggableItem[]>([]);
  const [formedWord, setFormedWord] = useState<string[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [respostas, setRespostas] = useState<any[]>([]);
  
  // Refs
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const formationAreaRef = useRef<View>(null);
  const formationAreaLayout = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  
  // Animações
  const celebrationAnim = useRef(new Animated.Value(0)).current;
  const promptAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  // Inicializar
  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (!showResult && currentIndex < palavras.length) {
      startInactivityTimer();
    }
    
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [currentIndex, showResult, formedWord]);

  const startNewGame = () => {
    const palavrasSelecionadas = palavrasService.getPalavrasMisturadas(categoryId, config.palavrasPorSessao);
    setPalavras(palavrasSelecionadas);
    loadPalavra(0, palavrasSelecionadas);
    setCurrentIndex(0);
    setScore(0);
    setBonusScore(0);
    setGameCompleted(false);
    setAcertosSeguidos(0);
    setRespostas([]);
  };

  const loadPalavra = (index: number, palavrasList: PalavraJogo[] = palavras) => {
    if (index < palavrasList.length) {
      const palavra = palavrasList[index];
      
      // Resetar estados e inicializar formedWord conforme o tipo
      if (palavra.tipo === 'completar' && palavra.lacunas) {
        // Para "completar", inicializar com array de strings vazias
        setFormedWord(Array(palavra.lacunas.length).fill(''));
      } else {
        // Para "silabas" e "ordenar", inicializar vazio
        setFormedWord([]);
      }
      
      setShowResult(false);
      setIsCorrect(false);
      setTentativasAtuais(0);
      setShowPrompt(false);
      setSelectedItemId(null);
      
      // Preparar itens arrastáveis conforme o tipo
      let itemsText: string[] = [];
      if (palavra.tipo === 'silabas' && palavra.silabas) {
        itemsText = palavrasService.embaralharSilabas(palavra.silabas);
      } else if (palavra.tipo === 'ordenar' && palavra.letras) {
        itemsText = palavrasService.embaralharLetras(palavra.letras);
      } else if (palavra.tipo === 'completar' && palavra.opcoes) {
        itemsText = palavra.opcoes;
      }
      
      setItems(itemsText.map((text, idx) => ({
        id: `item-${idx}-${Date.now()}`,
        text,
        isInFormation: false,
        formationIndex: null
      })));
      
      startTimeRef.current = Date.now();
    }
  };

  const startInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      if (acertosSeguidos < config.fadePromptAposAcertos) {
        setShowPrompt(true);
        animatePrompt();
      }
    }, config.mostrarDicaAposInatividade);
  };

  const animatePrompt = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(promptAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(promptAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animateCelebration = () => {
    Animated.sequence([
      Animated.spring(celebrationAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(celebrationAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

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

  const handleAddToFormation = (itemId: string) => {
    if (showResult) return;
    
    const item = items.find(i => i.id === itemId);
    if (!item || item.isInFormation) return;
    
    const currentPalavra = palavras[currentIndex];
    const maxSlots = currentPalavra.tipo === 'silabas' 
      ? currentPalavra.silabas!.length 
      : currentPalavra.tipo === 'ordenar'
      ? currentPalavra.letras!.length
      : currentPalavra.lacunas!.length;
    
    // Para "completar", encontrar o próximo índice vazio
    let targetIndex = -1;
    if (currentPalavra.tipo === 'completar') {
      targetIndex = formedWord.findIndex(slot => slot === '');
      if (targetIndex === -1) return; // Todos os slots estão preenchidos
    } else {
      // Para "silabas" e "ordenar", adicionar no final
      if (formedWord.length >= maxSlots) return;
      targetIndex = formedWord.length;
    }
    
    // Adicionar à palavra formada
    const newFormedWord = [...formedWord];
    if (currentPalavra.tipo === 'completar') {
      newFormedWord[targetIndex] = item.text;
    } else {
      newFormedWord.push(item.text);
    }
    setFormedWord(newFormedWord);
    
    // Marcar item como na formação
    setItems(items.map(i => 
      i.id === itemId 
        ? { ...i, isInFormation: true, formationIndex: targetIndex }
        : i
    ));

    // Verificar se completou automaticamente
    const isComplete = currentPalavra.tipo === 'completar'
      ? !newFormedWord.includes('') // Todos os slots preenchidos
      : newFormedWord.length === maxSlots;
      
    if (isComplete) {
      setTimeout(() => {
        handleAutoConfirm();
      }, 300); // Pequeno delay para ver a animação
    }
  };

  const handleRemoveFromFormation = (index: number) => {
    if (showResult) return;
    
    const currentPalavra = palavras[currentIndex];
    
    // Remover da palavra formada
    const newFormedWord = [...formedWord];
    if (currentPalavra.tipo === 'completar') {
      // Para "completar", apenas limpar o slot
      newFormedWord[index] = '';
    } else {
      // Para "silabas" e "ordenar", remover e reorganizar
      newFormedWord.splice(index, 1);
    }
    setFormedWord(newFormedWord);
    
    // Atualizar itens
    setItems(items.map(item => {
      if (item.formationIndex === index) {
        return { ...item, isInFormation: false, formationIndex: null };
      } else if (currentPalavra.tipo !== 'completar' && item.formationIndex !== null && item.formationIndex > index) {
        // Apenas reorganizar índices para "silabas" e "ordenar"
        return { ...item, formationIndex: item.formationIndex - 1 };
      }
      return item;
    }));
  };

  const handleAutoConfirm = () => {
    const currentPalavra = palavras[currentIndex];
    let userAnswer = '';
    let correct = false;

    // Validar conforme tipo
    if (currentPalavra.tipo === 'silabas') {
      userAnswer = formedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
    } else if (currentPalavra.tipo === 'completar') {
      const palavra = currentPalavra.letras!.map((letra, idx) => {
        if (currentPalavra.lacunas!.includes(idx)) {
          const lacunaIndex = currentPalavra.lacunas!.indexOf(idx);
          return formedWord[lacunaIndex] || '_';
        }
        return letra;
      }).join('');
      userAnswer = palavra;
      correct = palavra === currentPalavra.palavra;
    } else if (currentPalavra.tipo === 'ordenar') {
      userAnswer = formedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
    }

    const tempoResposta = Date.now() - startTimeRef.current;
    setShowResult(true);
    setIsCorrect(correct);

    // Registrar
    setRespostas(prev => [...prev, {
      palavra: currentPalavra,
      correto: correct,
      tentativas: tentativasAtuais + 1,
      tempoResposta,
      usouPrompt: showPrompt
    }]);

    if (correct) {
      const pontos = config.pontosPorAcerto + (!showPrompt ? config.bonusSemDica : 0);
      setScore(score + pontos);
      if (!showPrompt) {
        setBonusScore(bonusScore + config.bonusSemDica);
      }
      setAcertosSeguidos(acertosSeguidos + 1);
      animateCelebration();
      
      setTimeout(() => {
        if (currentIndex < palavras.length - 1) {
          nextWord();
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      setAcertosSeguidos(0);
      setTentativasAtuais(tentativasAtuais + 1);
      
      if (tentativasAtuais + 1 >= config.tentativasMaximas) {
        setTimeout(() => {
          if (currentIndex < palavras.length - 1) {
            nextWord();
          } else {
            finishGame();
          }
        }, 3000);
      } else {
        setTimeout(() => {
          setShowResult(false);
          setIsCorrect(false);
          // Resetar formação
          if (currentPalavra.tipo === 'completar' && currentPalavra.lacunas) {
            setFormedWord(Array(currentPalavra.lacunas.length).fill(''));
          } else {
            setFormedWord([]);
          }
          setItems(items.map(item => ({ 
            ...item, 
            isInFormation: false, 
            formationIndex: null 
          })));
        }, 2000);
      }
    }
  };

  const handleConfirm = () => {
    const currentPalavra = palavras[currentIndex];
    let userAnswer = '';
    let correct = false;

    // Validar conforme tipo
    if (currentPalavra.tipo === 'silabas') {
      userAnswer = formedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
    } else if (currentPalavra.tipo === 'completar') {
      const palavra = currentPalavra.letras!.map((letra, idx) => {
        if (currentPalavra.lacunas!.includes(idx)) {
          const lacunaIndex = currentPalavra.lacunas!.indexOf(idx);
          return formedWord[lacunaIndex] || '_';
        }
        return letra;
      }).join('');
      userAnswer = palavra;
      correct = palavra === currentPalavra.palavra;
    } else if (currentPalavra.tipo === 'ordenar') {
      userAnswer = formedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
    }

    const tempoResposta = Date.now() - startTimeRef.current;
    setShowResult(true);
    setIsCorrect(correct);

    // Registrar
    setRespostas(prev => [...prev, {
      palavra: currentPalavra,
      correto: correct,
      tentativas: tentativasAtuais + 1,
      tempoResposta,
      usouPrompt: showPrompt
    }]);

    if (correct) {
      const pontos = config.pontosPorAcerto + (!showPrompt ? config.bonusSemDica : 0);
      setScore(score + pontos);
      if (!showPrompt) {
        setBonusScore(bonusScore + config.bonusSemDica);
      }
      setAcertosSeguidos(acertosSeguidos + 1);
      animateCelebration();
      
      setTimeout(() => {
        if (currentIndex < palavras.length - 1) {
          nextWord();
        } else {
          finishGame();
        }
      }, 2000);
    } else {
      setAcertosSeguidos(0);
      setTentativasAtuais(tentativasAtuais + 1);
      
      if (tentativasAtuais + 1 >= config.tentativasMaximas) {
        setTimeout(() => {
          if (currentIndex < palavras.length - 1) {
            nextWord();
          } else {
            finishGame();
          }
        }, 3000);
      } else {
        setTimeout(() => {
          setShowResult(false);
          setIsCorrect(false);
          // Resetar formação
          if (currentPalavra.tipo === 'completar' && currentPalavra.lacunas) {
            setFormedWord(Array(currentPalavra.lacunas.length).fill(''));
          } else {
            setFormedWord([]);
          }
          setItems(items.map(item => ({ 
            ...item, 
            isInFormation: false, 
            formationIndex: null 
          })));
        }, 2000);
      }
    }
  };

  const nextWord = () => {
    setCurrentIndex(currentIndex + 1);
    loadPalavra(currentIndex + 1);
  };

  const finishGame = () => {
    setGameCompleted(true);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handlePlayAgain = () => {
    startNewGame();
  };

  // Tela de resultado
  if (gameCompleted) {
    const totalPalavras = respostas.length;
    const acertos = respostas.filter(r => r.correto).length;
    const percentual = ((acertos / totalPalavras) * 100).toFixed(1);
    
    return (
      <SafeAreaView style={styles.container}>
        <InternalHeader title="Forme a Palavra" />
        
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Star size={64} color={COLORS.YELLOW} fill={COLORS.YELLOW} />
            <Text style={styles.resultTitle}>Parabéns! 🎉</Text>
            <Text style={styles.resultScore}>
              {acertos} de {totalPalavras} palavras!
            </Text>
            <Text style={styles.resultPercentage}>{percentual}%</Text>
            {bonusScore > 0 && (
              <Text style={styles.bonusText}>🌟 +{bonusScore} pontos bônus!</Text>
            )}
            
            {parseFloat(percentual) === 100 && (
              <Text style={styles.perfectScore}>Perfeito! ⭐⭐⭐</Text>
            )}
            
            <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
              <Text style={styles.playAgainText}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const currentPalavra = palavras[currentIndex];
  if (!currentPalavra) return null;

  // Renderizar palavra com lacunas (para tipo "completar")
  const renderPalavraComLacunas = () => {
    if (currentPalavra.tipo !== 'completar') return null;
    
    return palavrasService.getPalavraComLacunas(currentPalavra).map((letra, index) => {
      const isLacuna = letra === '_';
      const lacunaIndex = isLacuna ? currentPalavra.lacunas!.indexOf(index) : -1;
      const letraPreenchida = lacunaIndex >= 0 ? formedWord[lacunaIndex] : null;
      
      return (
        <View 
          key={index} 
          style={[
            styles.letterSlot,
            isLacuna && styles.emptySlot,
            showPrompt && isLacuna && !letraPreenchida && { 
              borderColor: COLORS.YELLOW, 
              borderWidth: 4,
              shadowColor: COLORS.YELLOW,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.6,
              shadowRadius: 8,
              elevation: 8,
            }
          ]}
        >
          {isLacuna && letraPreenchida && (
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={() => handleRemoveFromFormation(lacunaIndex)}
            >
              <X size={16} color={COLORS.RED} strokeWidth={3} />
            </TouchableOpacity>
          )}
          <Text style={styles.letterText}>
            {isLacuna ? (letraPreenchida || '') : letra}
          </Text>
        </View>
      );
    });
  };

  // Componente clicável (substitui drag & drop)
  const ClickableItem = ({ item }: { item: DraggableItem }) => {
    if (item.isInFormation) return null;
    
    const isSilaba = currentPalavra.tipo === 'silabas' || currentPalavra.tipo === 'ordenar';
    
    const handleClick = () => {
      if (showResult) return;
      
      // Adiciona ao próximo espaço vazio automaticamente
      handleAddToFormation(item.id);
      
      // Feedback visual temporário
      setSelectedItemId(item.id);
      setTimeout(() => setSelectedItemId(null), 300);
    };
    
    return (
      <TouchableOpacity
        onPress={handleClick}
        style={[
          isSilaba ? styles.silabaButton : styles.letterButton,
          selectedItemId === item.id && styles.selectedItem,
          showPrompt && {
            shadowColor: COLORS.GREEN,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 12,
            elevation: 10,
          }
        ]}
        activeOpacity={0.7}
      >
        <Text style={isSilaba ? styles.silabaText : styles.letterButtonText}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader 
        title="Forme a Palavra" 
        showBackButton={true}
        onBack={handleHome}
      />

      <View style={styles.content}>
        {/* Info */}
        <View style={styles.gameInfo}>
          <Text style={styles.roundText}>Palavra {currentIndex + 1}/{palavras.length}</Text>
          <Text style={styles.scoreText}>✨ {score} pontos</Text>
        </View>

        {/* Imagem */}
        <View style={styles.imageContainer}>
          <ImageIcon size={140} color={COLORS.GREEN} strokeWidth={2.5} />
          <Text style={styles.imageName}>{currentPalavra.imagem}</Text>
        </View>

        {/* Área de Formação */}
        <View 
          style={styles.formationArea}
          ref={formationAreaRef}
          onLayout={(event) => {
            const { x, y, width, height } = event.nativeEvent.layout;
            formationAreaLayout.current = { x, y, width, height };
          }}
        >
          
          {currentPalavra.tipo === 'completar' ? (
            renderPalavraComLacunas()
          ) : (
            // Sílabas ou Ordenar
            Array.from({ 
              length: currentPalavra.tipo === 'silabas' 
                ? currentPalavra.silabas!.length 
                : currentPalavra.letras!.length 
            }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.formationSlot,
                  formedWord[index] && styles.filledSlot
                ]}
              >
                {formedWord[index] && (
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => handleRemoveFromFormation(index)}
                  >
                    <X size={18} color={COLORS.RED} strokeWidth={3} />
                  </TouchableOpacity>
                )}
                <Text style={styles.formationText}>
                  {formedWord[index] || ''}
                </Text>
              </View>
            ))
          )}
        </View>


        {/* Itens Arrastáveis */}
        <View style={styles.optionsContainer}>
          {items.map((item) => (
            <ClickableItem key={item.id} item={item} />
          ))}
        </View>


        {/* Feedback Centralizado */}
        {showResult && (
          <View style={styles.centeredToastContainer}>
            <Animated.View 
              style={[styles.centeredToast, { 
                opacity: celebrationAnim,
                transform: [{
                  scale: celebrationAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.8, 1.2]
                  })
                }]
              }]}
            >
              {isCorrect ? (
                <>
                  <Animated.View style={{ opacity: confettiAnim }}>
                    <Sparkles size={64} color={COLORS.YELLOW} />
                  </Animated.View>
                  <Text style={styles.centeredToastSuccess}>Isso! Muito bem! 🎉</Text>
                </>
              ) : (
                <>
                  <Text style={styles.centeredToastError}>
                    {tentativasAtuais >= config.tentativasMaximas 
                      ? `A palavra era: ${currentPalavra.palavra}` 
                      : 'Tente novamente! 😊'}
                  </Text>
                </>
              )}
            </Animated.View>
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
    padding: 16,
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    color: COLORS.GREEN,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 24,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: COLORS.GREEN,
    shadowColor: COLORS.GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  imageName: {
    fontSize: 11,
    color: COLORS.TEXT_BLACK,
    marginTop: 12,
    opacity: 0.5,
  },
  formationArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
    padding: 16,
    backgroundColor: '#F0F8F0',
    borderRadius: 16,
    minHeight: 90,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.GREEN,
    borderStyle: 'dashed',
    position: 'relative',
  },
  formationSlot: {
    minWidth: 60,
    height: 60,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    position: 'relative',
  },
  filledSlot: {
    borderColor: COLORS.GREEN,
    borderStyle: 'solid',
    backgroundColor: '#E8F5E8',
  },
  selectedItem: {
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
    shadowColor: COLORS.BLUE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  formationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  letterSlot: {
    width: 48,
    height: 60,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.GREEN,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  emptySlot: {
    borderStyle: 'dashed',
    borderColor: '#ccc',
  },
  letterText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.RED,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  centeredToastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  centeredToast: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.GREEN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 280,
    gap: 16,
  },
  centeredToastSuccess: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.GREEN,
    textAlign: 'center',
  },
  centeredToastError: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.RED,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    minHeight: 80,
  },
  silabaButton: {
    backgroundColor: COLORS.GREEN,
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#2d7a30',
  },
  silabaText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  letterButton: {
    backgroundColor: COLORS.GREEN,
    width: 68,
    height: 68,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#2d7a30',
  },
  letterButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: COLORS.GREEN,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    minWidth: 320,
    gap: 16,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
  },
  resultScore: {
    fontSize: 22,
    color: COLORS.TEXT_BLACK,
    fontWeight: '600',
  },
  resultPercentage: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.GREEN,
  },
  bonusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.YELLOW,
  },
  perfectScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.YELLOW,
    marginTop: 8,
  },
  playAgainButton: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 16,
    padding: 18,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#2d7a30',
  },
  playAgainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
});
