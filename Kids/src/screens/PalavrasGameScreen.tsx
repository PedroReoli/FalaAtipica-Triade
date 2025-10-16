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
import { useAPIIntegration } from '../hooks/useAPIIntegration';
import { mockAuthService } from '../services/mockAuthService';

type PalavrasGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PalavrasGame'>;
type PalavrasGameScreenRouteProp = RouteProp<RootStackParamList, 'PalavrasGame'>;

interface ClickableItem {
  id: string;
  text: string;
  isUsed: boolean;
}

// Mensagens de parabéns aleatórias
const MENSAGENS_SUCESSO = [
  'Isso! Muito bem! 🎉',
  'Parabéns! Você acertou! ⭐',
  'Incrível! Continue assim! 🌟',
  'Perfeito! Você é demais! 🎊',
  'Ótimo trabalho! 👏',
];

const getMensagemAleatoria = () => {
  const randomIndex = Math.floor(Math.random() * MENSAGENS_SUCESSO.length);
  return MENSAGENS_SUCESSO[randomIndex];
};

export const PalavrasGameScreen: React.FC = () => {
  const navigation = useNavigation<PalavrasGameScreenNavigationProp>();
  const route = useRoute<PalavrasGameScreenRouteProp>();
  const { categoryId } = route.params;
  const config = palavrasService.getConfig();
  
  // ✅ Hook de integração com API
  const {
    isAPIAvailable,
    sendProgress,
    emitGameStarted,
    emitGameCompleted
  } = useAPIIntegration();
  
  // Estados
  const [palavras, setPalavras] = useState<PalavraJogo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [bonusScore, setBonusScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [acertosSeguidos, setAcertosSeguidos] = useState(0);
  const [tentativasAtuais, setTentativasAtuais] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(Date.now());
  
  // Estados para sistema de cliques
  const [items, setItems] = useState<ClickableItem[]>([]);
  const [formedWord, setFormedWord] = useState<string[]>([]);
  const [wrongSlots, setWrongSlots] = useState<number[]>([]); // Slots com erro (borda vermelha)
  
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState<string>('');
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
      
      // ✅ EMITIR EVENTO: Jogo iniciado (se for a primeira palavra)
      if (index === 0) {
        emitGameStarted('palavras', 'Jogo das Palavras');
        setGameStartTime(Date.now());
      }
      
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
      setWrongSlots([]);
      
      // Preparar itens clicáveis conforme o tipo
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
        isUsed: false
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

  // Função para clicar em um item (teletransporta para o próximo slot vazio)
  const handleItemClick = (itemId: string) => {
    if (showResult) return;
    
    const item = items.find(i => i.id === itemId);
    if (!item || item.isUsed) return; // Já foi usado
    
    const currentPalavra = palavras[currentIndex];
    const maxSlots = currentPalavra.tipo === 'silabas' 
      ? currentPalavra.silabas!.length 
      : currentPalavra.tipo === 'ordenar'
      ? currentPalavra.letras!.length
      : currentPalavra.lacunas!.length;
    
    // Encontrar o próximo slot vazio
    let targetIndex = -1;
    if (currentPalavra.tipo === 'completar') {
      targetIndex = formedWord.findIndex(slot => slot === '');
      if (targetIndex === -1) return; // Todos os slots preenchidos
    } else {
      if (formedWord.length >= maxSlots) return; // Já completou
      targetIndex = formedWord.length;
    }
    
    // Adicionar ao slot
    const newFormedWord = [...formedWord];
    if (currentPalavra.tipo === 'completar') {
      newFormedWord[targetIndex] = item.text;
    } else {
      newFormedWord.push(item.text);
    }
    setFormedWord(newFormedWord);
    
    // Marcar item como usado
    setItems(items.map(i => 
      i.id === itemId ? { ...i, isUsed: true } : i
    ));

    // Resetar timer de inatividade
    startInactivityTimer();

    // Verificar se completou todos os slots
    const isComplete = currentPalavra.tipo === 'completar'
      ? !newFormedWord.includes('')
      : newFormedWord.length === maxSlots;
      
    if (isComplete) {
      setTimeout(() => {
        validateAnswer(newFormedWord);
      }, 300);
    }
  };

  // Função para remover um item de um slot (volta para as opções)
  const handleSlotClick = (index: number) => {
    if (showResult) return;
    
    const currentPalavra = palavras[currentIndex];
    const removedText = formedWord[index];
    if (!removedText) return; // Slot vazio
    
    // Remover do slot
    const newFormedWord = [...formedWord];
    if (currentPalavra.tipo === 'completar') {
      newFormedWord[index] = '';
    } else {
      newFormedWord.splice(index, 1);
    }
    setFormedWord(newFormedWord);
    
    // Devolver o item para as opções (marcar como não usado)
    setItems(items.map(item => 
      item.text === removedText && item.isUsed
        ? { ...item, isUsed: false }
        : item
    ));

    // Limpar slots errados
    setWrongSlots([]);
  };

  // Função para validar a resposta quando completar todos os slots
  const validateAnswer = (completedWord: string[]) => {
    const currentPalavra = palavras[currentIndex];
    let correct = false;
    let wrongIndices: number[] = [];

    // Validar conforme tipo e identificar slots errados
    if (currentPalavra.tipo === 'silabas') {
      const userAnswer = completedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
      
      if (!correct) {
        // Identificar sílabas erradas
        currentPalavra.silabas!.forEach((silaba, idx) => {
          if (completedWord[idx] !== silaba) {
            wrongIndices.push(idx);
          }
        });
      }
    } else if (currentPalavra.tipo === 'completar') {
      const palavraCompleta = currentPalavra.letras!.map((letra, idx) => {
        if (currentPalavra.lacunas!.includes(idx)) {
          const lacunaIndex = currentPalavra.lacunas!.indexOf(idx);
          return completedWord[lacunaIndex] || '_';
        }
        return letra;
      }).join('');
      
      correct = palavraCompleta === currentPalavra.palavra;
      
      if (!correct) {
        // Identificar lacunas erradas
        currentPalavra.lacunas!.forEach((lacunaPos, idx) => {
          const letraCorreta = currentPalavra.palavra[lacunaPos];
          if (completedWord[idx] !== letraCorreta) {
            wrongIndices.push(idx);
          }
        });
      }
    } else if (currentPalavra.tipo === 'ordenar') {
      const userAnswer = completedWord.join('');
      correct = userAnswer === currentPalavra.palavra;
      
      if (!correct) {
        // Identificar letras em posições erradas
        currentPalavra.palavra.split('').forEach((letra, idx) => {
          if (completedWord[idx] !== letra) {
            wrongIndices.push(idx);
          }
        });
      }
    }

    const tempoResposta = Date.now() - startTimeRef.current;
    
    // Mostrar slots errados (se houver)
    if (!correct) {
      setWrongSlots(wrongIndices);
    }

    // Registrar
    setRespostas(prev => [...prev, {
      palavra: currentPalavra,
      correto: correct,
      tentativas: tentativasAtuais + 1,
      tempoResposta,
      usouPrompt: showPrompt
    }]);

    if (correct) {
      setShowResult(true);
      setIsCorrect(true);
      setMensagemSucesso(getMensagemAleatoria()); // Mensagem aleatória
      
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
      // Errou: mostrar bordas vermelhas nos slots errados (NÃO limpa automaticamente)
      setAcertosSeguidos(0);
      setTentativasAtuais(tentativasAtuais + 1);
      
      // Se esgotou tentativas, avança para próxima palavra
      if (tentativasAtuais + 1 >= config.tentativasMaximas) {
        setTimeout(() => {
          if (currentIndex < palavras.length - 1) {
            nextWord();
          } else {
            finishGame();
          }
        }, 2000);
      }
      // Se ainda tem tentativas, mantém os slots com borda vermelha
      // A criança pode clicar nos slots vermelhos para remover e tentar de novo
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

  const finishGame = async () => {
    // Calcular estatísticas finais
    const totalPalavras = respostas.length;
    const acertos = respostas.filter(r => r.correto).length;
    const erros = totalPalavras - acertos;
    const percentual = Math.round((acertos / totalPalavras) * 100);
    const timeSpent = Math.round((Date.now() - gameStartTime) / 1000); // em segundos
    
    // ✅ ENVIAR PROGRESSO PARA API (com fallback)
    try {
      const currentUser = mockAuthService.getCurrentUser();
      
      if (currentUser) {
        console.log('🎮 [PROGRESSO] Enviando:', percentual + '%');
        const progressResult = await sendProgress({
          userId: currentUser.id,
          gameId: 'palavras',
          level: 1, // Pode ser dinâmico no futuro
          score: percentual,
          correctAnswers: acertos,
          wrongAnswers: erros,
          timeSpent,
          category: categoryId
        });
        
        if (progressResult) {
          console.log('✅ [PROGRESSO] Salvo na API');
        } else {
          console.log('⚠️ [PROGRESSO] API offline - jogo continua');
        }
        
        // ✅ EMITIR EVENTO: Jogo completado
        emitGameCompleted('palavras', 'Jogo das Palavras', percentual);
      }
    } catch (error) {
      console.log('⚠️ [PROGRESSO] Erro - jogo continua');
    }
    
    // ✅ SEMPRE MOSTRA TELA DE RESULTADO (COM OU SEM API)
    setGameCompleted(true);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
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
            
            <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
              <Text style={styles.homeButtonText}>Voltar para Home</Text>
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
          <TouchableOpacity 
            style={[
              styles.letterSlotTouchable,
              wrongSlots.includes(lacunaIndex) && styles.wrongSlot
            ]}
            onPress={() => isLacuna && letraPreenchida && handleSlotClick(lacunaIndex)}
            disabled={!isLacuna || !letraPreenchida}
          >
            <Text style={styles.letterText}>
              {isLacuna ? (letraPreenchida || '') : letra}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  // Componente clicável (100% baseado em cliques)
  const ClickableItem = ({ item }: { item: ClickableItem }) => {
    // Se já foi usado, não mostrar
    if (item.isUsed) return null;
    
    const isSilaba = currentPalavra.tipo === 'silabas' || currentPalavra.tipo === 'ordenar';
    
    return (
      <TouchableOpacity
        onPress={() => handleItemClick(item.id)}
        style={[
          isSilaba ? styles.silabaButton : styles.letterButton,
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
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.formationSlot,
                  formedWord[index] && styles.filledSlot,
                  wrongSlots.includes(index) && styles.wrongSlot
                ]}
                onPress={() => formedWord[index] && handleSlotClick(index)}
                disabled={!formedWord[index]}
              >
                <Text style={styles.formationText}>
                  {formedWord[index] || ''}
                </Text>
              </TouchableOpacity>
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
                    <Sparkles size={48} color={COLORS.YELLOW} />
                  </Animated.View>
                  <Text style={styles.centeredToastSuccess}>{mensagemSucesso}</Text>
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
  wrongSlot: {
    borderColor: COLORS.RED,
    borderWidth: 4,
    borderStyle: 'solid',
    backgroundColor: '#FFE8E8',
    shadowColor: COLORS.RED,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  letterSlotTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
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
  homeButton: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 16,
    padding: 18,
    minWidth: 200,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#2d7a30',
  },
  homeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
});
