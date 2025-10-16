import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BarChart3, Eye, Film, Gamepad2, Brain, Trophy, Clock, Target, ChevronDown, ChevronUp } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { ChildSelector } from '../components/ChildSelector';
import { mockAuthService } from '../services/mockAuthService';
import { API_BASE_URL } from '../config/api';
import { socketService } from '../services/socketService';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface GameProgress {
  gameId: string;
  gameName: string;
  icon: string;
  color: string;
  totalSessions: number;
  averageScore: number;
  bestScore: number;
  totalTime: number;
  lastPlayed: string | null;
}

interface Child {
  id: string;
  nome: string;
  idade: number;
  progressoGeral?: number;
}

interface ProgressData {
  childId: string;
  childName: string;
  progressoGeral: number;
  games: GameProgress[];
  statistics: {
    totalGames: number;
    totalTimeMinutes: number;
    averageScore: number;
    bestGame: string;
  };
}

export const ProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [expandedGame, setExpandedGame] = useState<string | null>(null);
  const [availableChildren, setAvailableChildren] = useState<Child[]>([]);

  useEffect(() => {
    loadAvailableChildren();
    loadProgressData();
    setupRealtimeUpdates();

    return () => {
      // Limpar listeners ao desmontar
      socketService.off('child-game-completed');
    };
  }, []);

  useEffect(() => {
    if (selectedChild) {
      loadProgressData();
    }
  }, [selectedChild]);

  const setupRealtimeUpdates = () => {
    // Conectar WebSocket se ainda não conectou
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser && !socketService.isSocketConnected()) {
      socketService.connect(currentUser.id, currentUser.nome);
    }

    // Escutar quando criança completa jogo
    socketService.on('child-game-completed', (data: any) => {
      console.log('📊 Progresso atualizado em tempo real:', data);
      
      // Verificar se é uma das minhas crianças
      if (currentUser && currentUser.criancasIds && currentUser.criancasIds.includes(data.userId)) {
        console.log('✅ Recarregando progresso automaticamente');
        
        // Se for a criança atualmente selecionada, recarregar
        if (data.userId === selectedChild) {
          loadProgressData();
        }
      }
    });
  };

  const loadAvailableChildren = async () => {
    try {
      const currentUser = mockAuthService.getCurrentUser();
      
      if (!currentUser || !currentUser.criancasIds) return;

      // Buscar dados das crianças via API
      try {
        const response = await fetch(`${API_BASE_URL}/tutors/profile/${currentUser.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(3000),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data.criancas) {
            const children = data.data.criancas.map((c: any) => ({
              id: c.id,
              nome: c.nome,
              idade: c.idade,
              progressoGeral: c.progressoGeral,
            }));
            setAvailableChildren(children);
            if (!selectedChild && children.length > 0) {
              setSelectedChild(children[0].id);
            }
            return;
          }
        }
      } catch (error) {
        console.log('⚠️ API erro - usando dados mockados');
      }

      // Fallback: usar perfil mockado
      const perfilData = require('../../mockup-data/perfil.json');
      if (perfilData.criancas) {
        const children = perfilData.criancas.map((c: any) => ({
          id: c.id,
          nome: c.nome,
          idade: c.idade,
          progressoGeral: c.progressoGeral,
        }));
        setAvailableChildren(children);
        if (!selectedChild && children.length > 0) {
          setSelectedChild(children[0].id);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar crianças:', error);
    }
  };

  const loadProgressData = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setIsLoading(true);
      const currentUser = mockAuthService.getCurrentUser();
      
      if (!currentUser || !currentUser.criancasIds || currentUser.criancasIds.length === 0) {
        // Fallback: dados mockados
        setProgressData(getMockProgressData());
        if (!isRefreshing) setIsLoading(false);
        return;
      }

      // Usar criança selecionada, ou primeira se não houver seleção
      const childId = selectedChild || currentUser.criancasIds[0];
      if (!selectedChild) setSelectedChild(childId);
      
      // Tentar API primeiro
      try {
        const response = await fetch(`${API_BASE_URL}/tutors/progress/${childId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(3000),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const formattedData = formatAPIData(data.data);
            setProgressData(formattedData);
            if (!isRefreshing) setIsLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('⚠️ API erro - usando dados mockados');
      }

      // Fallback: dados mockados
      setProgressData(getMockProgressData());
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      setProgressData(getMockProgressData());
    } finally {
      if (!isRefreshing) setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProgressData(true);
    setRefreshing(false);
  };

  const formatAPIData = (data: any): ProgressData => {
    const gameMap: { [key: string]: { name: string; icon: string; color: string } } = {
      'igual-diferente': { name: 'Igual-Diferente', icon: 'eye', color: COLORS.YELLOW },
      'cena-certa': { name: 'Cena Certa', icon: 'film', color: COLORS.RED },
      'adivinha': { name: 'Adivinha', icon: 'gamepad', color: COLORS.BLUE },
      'palavras': { name: 'Jogo das Palavras', icon: 'brain', color: COLORS.GREEN },
    };

    // Criar array com TODOS os jogos (mesmo os que não foram jogados)
    const allGames: GameProgress[] = Object.keys(gameMap).map(gameId => {
      const gameInfo = gameMap[gameId];
      const gameData = (data.porJogo || []).find((g: any) => g.gameId === gameId);
      
      if (gameData) {
        // Jogo foi jogado - usar dados reais
        return {
          gameId,
          gameName: gameInfo.name,
          icon: gameInfo.icon,
          color: gameInfo.color,
          totalSessions: gameData.jogos?.length || 0,
          averageScore: gameData.mediaScore || 0,
          bestScore: Math.max(...(gameData.jogos?.map((j: any) => j.score) || [0])),
          totalTime: Math.round((gameData.jogos?.reduce((sum: number, j: any) => sum + (j.timeSpent || 0), 0) || 0) / 60),
          lastPlayed: gameData.jogos?.[gameData.jogos.length - 1]?.timestamp || null,
        };
      } else {
        // Jogo nunca foi jogado - dados zerados
        return {
          gameId,
          gameName: gameInfo.name,
          icon: gameInfo.icon,
          color: gameInfo.color,
          totalSessions: 0,
          averageScore: 0,
          bestScore: 0,
          totalTime: 0,
          lastPlayed: null,
        };
      }
    });

    // Calcular melhor jogo
    let bestGame = 'Nenhum';
    let highestScore = 0;
    allGames.forEach(game => {
      if (game.averageScore > highestScore) {
        highestScore = game.averageScore;
        bestGame = game.gameName;
      }
    });

    return {
      childId: data.childId,
      childName: data.childName,
      progressoGeral: data.progressoGeral || 0,
      games: allGames, // Retorna TODOS os 4 jogos
      statistics: {
        totalGames: data.estatisticas?.totalJogos || 0,
        totalTimeMinutes: data.estatisticas?.tempoTotal || 0,
        averageScore: data.estatisticas?.mediaGeral || 0,
        bestGame,
      },
    };
  };

  const getMockProgressData = (): ProgressData => {
    // SEMPRE retornar TODOS os 4 jogos
    const allGames: GameProgress[] = [
      {
        gameId: 'igual-diferente',
        gameName: 'Igual-Diferente',
        icon: 'eye',
        color: COLORS.YELLOW,
        totalSessions: 15,
        averageScore: 82,
        bestScore: 95,
        totalTime: 25,
        lastPlayed: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        gameId: 'cena-certa',
        gameName: 'Cena Certa',
        icon: 'film',
        color: COLORS.RED,
        totalSessions: 12,
        averageScore: 75,
        bestScore: 90,
        totalTime: 20,
        lastPlayed: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
      {
        gameId: 'adivinha',
        gameName: 'Adivinha',
        icon: 'gamepad',
        color: COLORS.BLUE,
        totalSessions: 18,
        averageScore: 88,
        bestScore: 100,
        totalTime: 30,
        lastPlayed: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      },
      {
        gameId: 'palavras',
        gameName: 'Jogo das Palavras',
        icon: 'brain',
        color: COLORS.GREEN,
        totalSessions: 20,
        averageScore: 70,
        bestScore: 85,
        totalTime: 35,
        lastPlayed: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
    ];

    return {
      childId: 'child_001',
      childName: 'João Silva',
      progressoGeral: 75,
      games: allGames, // TODOS os 4 jogos sempre presentes
      statistics: {
        totalGames: 65,
        totalTimeMinutes: 110,
        averageScore: 79,
        bestGame: 'Adivinha',
      },
    };
  };

  const formatLastPlayed = (timestamp: string | null): string => {
    if (!timestamp) return 'Nunca jogado';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora mesmo';
    if (diffMins < 60) return `Há ${diffMins} min`;
    if (diffHours < 24) return `Há ${diffHours}h`;
    if (diffDays === 1) return 'Ontem';
    return `Há ${diffDays} dias`;
  };

  const getGameIcon = (iconName: string) => {
    switch (iconName) {
      case 'eye':
        return Eye;
      case 'film':
        return Film;
      case 'gamepad':
        return Gamepad2;
      case 'brain':
        return Brain;
      default:
        return Gamepad2;
    }
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

  const toggleGameExpansion = (gameId: string) => {
    setExpandedGame(expandedGame === gameId ? null : gameId);
  };

  if (isLoading) {
    return (
      <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
        <Navbar 
          title="Progresso"
          onBack={handleBack}
          showBackButton={true}
          showLogo={true}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.BLUE} />
          <Text style={styles.loadingText}>Carregando progresso...</Text>
        </View>
        <Footer 
          activeTab="home"
          onHomePress={handleHome}
          onProfilesPress={handleProfiles}
        />
      </SafeAreaWrapper>
    );
  }

  if (!progressData) {
    return (
      <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
        <Navbar 
          title="Progresso"
          onBack={handleBack}
          showBackButton={true}
          showLogo={true}
        />
        <View style={styles.emptyState}>
          <BarChart3 size={64} color={COLORS.BLUE} />
          <Text style={styles.emptyStateTitle}>Nenhum dado encontrado</Text>
          <Text style={styles.emptyStateText}>
            Não há dados de progresso disponíveis no momento.
          </Text>
        </View>
        <Footer 
          activeTab="home"
          onHomePress={handleHome}
          onProfilesPress={handleProfiles}
        />
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Progresso"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />

      {/* Seletor de Criança - Apenas se tiver 2+ crianças */}
      <ChildSelector
        children={availableChildren}
        selectedChildId={selectedChild}
        onSelectChild={setSelectedChild}
      />
      
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.BLUE]}
            tintColor={COLORS.BLUE}
            title="Atualizando progresso..."
            titleColor={COLORS.BLUE}
          />
        }
      >
        {/* Header - Info da Criança */}
        <View style={styles.header}>
          <Text style={styles.childName}>{progressData.childName}</Text>
          <View style={styles.overallProgressContainer}>
            <Text style={styles.overallProgressValue}>{progressData.progressoGeral}%</Text>
            <Text style={styles.overallProgressLabel}>Progresso Geral</Text>
          </View>
        </View>

        {/* Estatísticas Gerais - Stack Vertical */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderColor: COLORS.BLUE }]}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.BLUE + '15' }]}>
              <Target size={18} color={COLORS.BLUE} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{progressData.statistics.totalGames}</Text>
              <Text style={styles.statLabel}>Sessões Totais</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { borderColor: COLORS.GREEN }]}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.GREEN + '15' }]}>
              <Clock size={18} color={COLORS.GREEN} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{progressData.statistics.totalTimeMinutes} minutos</Text>
              <Text style={styles.statLabel}>Tempo Total de Jogo</Text>
            </View>
          </View>

          <View style={[styles.statCard, { borderColor: COLORS.YELLOW }]}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.YELLOW + '15' }]}>
              <BarChart3 size={18} color={COLORS.YELLOW} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{progressData.statistics.averageScore}%</Text>
              <Text style={styles.statLabel}>Média Geral de Acertos</Text>
            </View>
          </View>
          
          <View style={[styles.statCard, { borderColor: COLORS.RED }]}>
            <View style={[styles.statIconContainer, { backgroundColor: COLORS.RED + '15' }]}>
              <Trophy size={18} color={COLORS.RED} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue} numberOfLines={1} adjustsFontSizeToFit>{progressData.statistics.bestGame}</Text>
              <Text style={styles.statLabel}>Jogo com Melhor Desempenho</Text>
            </View>
          </View>
        </View>

        {/* Jogos Individuais */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>Progresso por Jogo</Text>
          {progressData.games.map((game) => {
            const IconComponent = getGameIcon(game.icon);
            const isExpanded = expandedGame === game.gameId;
            
            return (
              <TouchableOpacity
                key={game.gameId}
                activeOpacity={0.7}
                onPress={() => toggleGameExpansion(game.gameId)}
                style={[
                  isExpanded ? styles.gameCardExpanded : styles.gameCardCompact,
                  { borderLeftColor: game.color }
                ]}
              >
                {/* Cabeçalho Compacto - SEMPRE VISÍVEL */}
                <View style={styles.compactGameHeader}>
                  <View style={[styles.compactGameIcon, { backgroundColor: game.color + '20' }]}>
                    <IconComponent size={20} color={game.color} />
                  </View>
                  <View style={styles.compactGameInfo}>
                    <Text style={styles.compactGameName}>{game.gameName}</Text>
                    <Text style={styles.compactGameScore}>
                      {game.totalSessions === 0 
                        ? 'Nunca jogado' 
                        : `${game.averageScore}% média • ${game.totalSessions} sessões`
                      }
                    </Text>
                  </View>
                  <View style={styles.expandIconGame}>
                    {isExpanded ? (
                      <ChevronUp size={20} color={game.color} />
                    ) : (
                      <ChevronDown size={20} color={game.color} />
                    )}
                  </View>
                </View>

                {/* Detalhes Expandidos - CONDICIONAL */}
                {isExpanded && (
                  <View style={styles.expandedGameContent}>
                    {game.totalSessions === 0 ? (
                      // Jogo nunca foi jogado
                      <View style={styles.emptyGameState}>
                        <Text style={styles.emptyGameText}>
                          Este jogo ainda não foi jogado pela criança.
                        </Text>
                        <Text style={styles.emptyGameHint}>
                          Incentive a criança a experimentar!
                        </Text>
                      </View>
                    ) : (
                      // Jogo foi jogado - mostrar estatísticas
                      <>
                        {/* Última vez jogado */}
                        <Text style={styles.lastPlayedExpanded}>
                          Última vez: {formatLastPlayed(game.lastPlayed)}
                        </Text>

                        {/* Estatísticas do Jogo */}
                        <View style={styles.gameStatsGrid}>
                          <View style={styles.gameStatBox}>
                            <Text style={styles.gameStatValue}>{game.totalSessions}</Text>
                            <Text style={styles.gameStatLabel}>Sessões</Text>
                          </View>
                          <View style={styles.gameStatBox}>
                            <Text style={styles.gameStatValue}>{game.bestScore}%</Text>
                            <Text style={styles.gameStatLabel}>Melhor</Text>
                          </View>
                          <View style={styles.gameStatBox}>
                            <Text style={styles.gameStatValue}>{game.totalTime}min</Text>
                            <Text style={styles.gameStatLabel}>Tempo</Text>
                          </View>
                        </View>

                        {/* Barra de Progresso */}
                        <View style={styles.progressBarContainer}>
                          <View style={styles.progressBarBackground}>
                            <View 
                              style={[
                                styles.progressBarFill, 
                                { width: `${game.averageScore}%`, backgroundColor: game.color }
                              ]} 
                            />
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  childName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  overallProgressContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  overallProgressLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#888',
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  overallProgressValue: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.BLUE,
    letterSpacing: -0.8,
  },
  statsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 6,
  },
  statCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
    gap: 10,
  },
  statIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 1,
    letterSpacing: -0.2,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: '#666',
  },
  gamesSection: {
    paddingVertical: 8,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 10,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gameCardCompact: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRightColor: '#F0F0F0',
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  gameCardExpanded: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRightColor: '#F0F0F0',
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  compactGameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactGameIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactGameInfo: {
    flex: 1,
  },
  compactGameName: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 2,
  },
  compactGameScore: {
    fontSize: 10,
    fontWeight: '500',
    color: '#666',
  },
  expandIconGame: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedGameContent: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  lastPlayedExpanded: {
    fontSize: 10,
    fontWeight: '500',
    color: '#999',
    marginBottom: 10,
    textAlign: 'center',
  },
  gameStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  gameStatBox: {
    alignItems: 'center',
    flex: 1,
  },
  gameStatLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: '#888',
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  gameStatValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    letterSpacing: -0.2,
  },
  progressBarContainer: {
    marginTop: 6,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  emptyGameState: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  emptyGameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    textAlign: 'center',
    marginBottom: 6,
  },
  emptyGameHint: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
