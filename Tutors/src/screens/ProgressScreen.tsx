import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BarChart3, Calendar, Clock, Dog, Trophy, Flame, Map, Crown, Check } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Dados mockados do MOCAP/TUTORS
const mockProgressData = {
  criancas: [
    {
      id: "crianca_001",
      nome: "João Silva",
      idade: 5,
      responsavel: "Maria Silva",
      dataInicio: "2024-01-15",
      progressoGeral: 75,
      categorias: [
        {
          id: "animais",
          nome: "Animais",
          progresso: 80,
          itensCompletos: 8,
          totalItens: 10,
          ultimaAtividade: "2024-01-20T10:30:00Z"
        },
        {
          id: "objetos",
          nome: "Objetos",
          progresso: 60,
          itensCompletos: 6,
          totalItens: 10,
          ultimaAtividade: "2024-01-19T14:15:00Z"
        },
        {
          id: "cores",
          nome: "Cores",
          progresso: 90,
          itensCompletos: 9,
          totalItens: 10,
          ultimaAtividade: "2024-01-21T09:45:00Z"
        }
      ],
      conquistas: [
        {
          id: "primeira_conquista",
          nome: "Primeira Estrela",
          descricao: "Completou o primeiro jogo",
          data: "2024-01-16T16:20:00Z",
          icone: "star"
        },
        {
          id: "animais_mestre",
          nome: "Mestre dos Animais",
          descricao: "Completou todos os jogos de animais",
          data: "2024-01-20T10:30:00Z",
          icone: "trophy"
        }
      ],
      estatisticas: {
        totalJogos: 24,
        jogosCompletos: 18,
        tempoTotal: 45,
        sequenciaAtual: 3,
        melhorSequencia: 5
      }
    }
  ]
};

export const ProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [progressData, setProgressData] = useState(mockProgressData);

  useEffect(() => {
    // Carregar dados do MOCAP/TUTORS
    setProgressData(mockProgressData);
  }, []);

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Calcular estatísticas gerais
  const getGeneralStats = () => {
    const crianca = progressData.criancas[0];
    if (!crianca) return [];

    return [
      { id: '1', title: 'Total de Jogos', value: crianca.estatisticas.totalJogos.toString(), icon: BarChart3 },
      { id: '2', title: 'Jogos Completos', value: crianca.estatisticas.jogosCompletos.toString(), icon: Check },
      { id: '3', title: 'Tempo Total', value: `${crianca.estatisticas.tempoTotal} min`, icon: Clock },
      { id: '4', title: 'Progresso Geral', value: `${crianca.progressoGeral}%`, icon: Trophy },
    ];
  };

  const getCategoryStats = () => {
    const crianca = progressData.criancas[0];
    if (!crianca) return [];

    return crianca.categorias.map(categoria => ({
      id: categoria.id,
      nome: categoria.nome,
      progresso: categoria.progresso,
      itensCompletos: categoria.itensCompletos,
      totalItens: categoria.totalItens,
      ultimaAtividade: categoria.ultimaAtividade
    }));
  };

  const getAchievements = () => {
    const crianca = progressData.criancas[0];
    if (!crianca) return [];

    return crianca.conquistas.map(conquista => ({
      id: conquista.id,
      title: conquista.nome,
      description: conquista.descricao,
      icon: conquista.icone === 'star' ? Trophy : conquista.icone === 'trophy' ? Crown : Trophy,
      earned: true,
      date: conquista.data
    }));
  };

  const stats = getGeneralStats();
  const achievements = getAchievements();
  const categoryStats = getCategoryStats();

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Progresso"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Estatísticas Gerais</Text>
        
        {/* Cards de Estatísticas */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <View key={stat.id} style={styles.statCard}>
                <IconComponent size={20} color={COLORS.BLUE} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.title}>Progresso por Categoria</Text>
        
        {/* Progresso por Categoria */}
        <View style={styles.categoryContainer}>
          {categoryStats.map((categoria) => (
            <View key={categoria.id} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{categoria.nome}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${categoria.progresso}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {categoria.itensCompletos}/{categoria.totalItens} itens ({categoria.progresso}%)
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Conquistas</Text>
        
        {/* Lista de Badges - Layout Compacto */}
        <View style={styles.badgesGrid}>
          {achievements.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <View key={badge.id} style={[styles.badgeCard, !badge.earned && styles.badgeLocked]}>
                <IconComponent size={24} color={badge.earned ? COLORS.GREEN : COLORS.YELLOW} />
                <View style={styles.badgeInfo}>
                  <Text style={[styles.badgeTitle, !badge.earned && styles.badgeTitleLocked]}>
                    {badge.title}
                  </Text>
                  <Text style={[styles.badgeDescription, !badge.earned && styles.badgeDescriptionLocked]}>
                    {badge.description}
                  </Text>
                </View>
                {badge.earned && <Check size={20} color={COLORS.BLUE} />}
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
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLUE,
    marginTop: 6,
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 11,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  badgesGrid: {
    flex: 1,
    gap: 8,
  },
  badgeCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeLocked: {
    borderColor: COLORS.YELLOW,
    opacity: 0.6,
  },
  badgeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 2,
  },
  badgeTitleLocked: {
    color: COLORS.GREEN,
  },
  badgeDescription: {
    fontSize: 12,
    color: COLORS.GREEN,
  },
  badgeDescriptionLocked: {
    color: COLORS.YELLOW,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.GREEN,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
});
