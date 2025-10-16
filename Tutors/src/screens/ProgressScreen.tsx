import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BarChart3, Eye, Film, Gamepad2, Brain, Trophy, Clock, Target } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { API_BASE_URL } from '../config/api';

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
  const [selectedChild, setSelectedChild] = useState<string>('');

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      setIsLoading(true);
      const currentUser = mockAuthService.getCurrentUser();
      
      if (!currentUser || !currentUser.criancasIds || currentUser.criancasIds.length === 0) {
        // Fallback: dados mockados
        setProgressData(getMockProgressData());
        setIsLoading(false);
        return;
      }

      const childId = currentUser.criancasIds[0]; // Primeira criança
      setSelectedChild(childId);
      
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
            setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const formatAPIData = (data: any): ProgressData => {
    const gameMap: { [key: string]: { name: string; icon: string; color: string } } = {
      'igual-diferente': { name: 'Igual-Diferente', icon: 'eye', color: COLORS.YELLOW },
      'cena-certa': { name: 'Cena Certa', icon: 'film', color: COLORS.RED },
      'adivinha': { name: 'Adivinha', icon: 'gamepad', color: COLORS.BLUE },
      'palavras': { name: 'Jogo das Palavras', icon: 'brain', color: COLORS.GREEN },
    };

    const games: GameProgress[] = (data.porJogo || []).map((game: any) => {
      const gameInfo = gameMap[game.gameId] || { name: game.gameName, icon: 'gamepad', color: COLORS.BLUE };
      
      return {
        gameId: game.gameId,
        gameName: gameInfo.name,
        icon: gameInfo.icon,
        color: gameInfo.color,
        totalSessions: game.jogos?.length || 0,
        averageScore: game.mediaScore || 0,
        bestScore: Math.max(...(game.jogos?.map((j: any) => j.score) || [0])),
        totalTime: Math.round((game.jogos?.reduce((sum: number, j: any) => sum + (j.timeSpent || 0), 0) || 0) / 60),
        lastPlayed: game.jogos?.[game.jogos.length - 1]?.timestamp || null,
      };
    });

    // Calcular melhor jogo
    let bestGame = 'Nenhum';
    let highestScore = 0;
    games.forEach(game => {
      if (game.averageScore > highestScore) {
        highestScore = game.averageScore;
        bestGame = game.gameName;
      }
    });

    return {
      childId: data.childId,
      childName: data.childName,
      progressoGeral: data.progressoGeral || 0,
      games,
      statistics: {
        totalGames: data.estatisticas?.totalJogos || 0,
        totalTimeMinutes: data.estatisticas?.tempoTotal || 0,
        averageScore: data.estatisticas?.mediaGeral || 0,
        bestGame,
      },
    };
  };

  const getMockProgressData = (): ProgressData => {
    return {
      childId: 'child_001',
      childName: 'João Silva',
      progressoGeral: 75,
      games: [
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
      ],
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

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `Há ${diffMins} min`;
    if (diffHours < 24) return `Há ${diffHours}h`;
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
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header - Info da Criança */}
        <View style={styles.header}>
          <Text style={styles.childName}>{progressData.childName}</Text>
          <View style={styles.overallProgressContainer}>
            <Text style={styles.overallProgressLabel}>Progresso Geral</Text>
            <Text style={styles.overallProgressValue}>{progressData.progressoGeral}%</Text>
          </View>
        </View>

        {/* Estatísticas Gerais */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Target size={20} color={COLORS.BLUE} />
            <Text style={styles.statValue}>{progressData.statistics.totalGames}</Text>
            <Text style={styles.statLabel}>Sessões</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={20} color={COLORS.GREEN} />
            <Text style={styles.statValue}>{progressData.statistics.totalTimeMinutes}min</Text>
            <Text style={styles.statLabel}>Tempo Total</Text>
          </View>
          <View style={styles.statCard}>
            <BarChart3 size={20} color={COLORS.YELLOW} />
            <Text style={styles.statValue}>{progressData.statistics.averageScore}%</Text>
            <Text style={styles.statLabel}>Média Geral</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy size={20} color={COLORS.RED} />
            <Text style={styles.statValue} numberOfLines={1}>{progressData.statistics.bestGame}</Text>
            <Text style={styles.statLabel}>Melhor Jogo</Text>
          </View>
        </View>

        {/* Jogos Individuais */}
        <View style={styles.gamesSection}>
          <Text style={styles.sectionTitle}>Progresso por Jogo</Text>
          {progressData.games.map((game) => {
            const IconComponent = getGameIcon(game.icon);
            return (
              <View key={game.gameId} style={[styles.gameCard, { borderColor: game.color }]}>
                {/* Header do Jogo */}
                <View style={styles.gameHeader}>
                  <View style={styles.gameHeaderLeft}>
                    <View style={[styles.gameIconContainer, { backgroundColor: game.color + '20' }]}>
                      <IconComponent size={24} color={game.color} />
                    </View>
                    <View>
                      <Text style={styles.gameName}>{game.gameName}</Text>
                      <Text style={styles.lastPlayed}>{formatLastPlayed(game.lastPlayed)}</Text>
                    </View>
                  </View>
                  <View style={[styles.scoreCircle, { borderColor: game.color }]}>
                    <Text style={[styles.scoreValue, { color: game.color }]}>{game.averageScore}%</Text>
                  </View>
                </View>

                {/* Estatísticas do Jogo */}
                <View style={styles.gameStats}>
                  <View style={styles.gameStatItem}>
                    <Text style={styles.gameStatLabel}>Sessões</Text>
                    <Text style={styles.gameStatValue}>{game.totalSessions}</Text>
                  </View>
                  <View style={styles.gameStatItem}>
                    <Text style={styles.gameStatLabel}>Melhor</Text>
                    <Text style={styles.gameStatValue}>{game.bestScore}%</Text>
                  </View>
                  <View style={styles.gameStatItem}>
                    <Text style={styles.gameStatLabel}>Tempo</Text>
                    <Text style={styles.gameStatValue}>{game.totalTime}min</Text>
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
              </View>
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
    paddingHorizontal: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  childName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  overallProgressContainer: {
    alignItems: 'center',
  },
  overallProgressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  overallProgressValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BLUE,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  gamesSection: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  gameCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  gameHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  lastPlayed: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  gameStatItem: {
    alignItems: 'center',
  },
  gameStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  gameStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
