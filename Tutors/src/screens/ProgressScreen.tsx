import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const stats = [
  { id: '1', title: 'Total de Interações', value: '1,247', icon: '📊' },
  { id: '2', title: 'Dias Ativos', value: '23', icon: '📅' },
  { id: '3', title: 'Tempo Médio por Sessão', value: '15 min', icon: '⏱️' },
  { id: '4', title: 'Categoria Mais Usada', value: 'Animais', icon: '🐶' },
];

const badges = [
  { id: '1', title: 'Primeiro Passo', description: 'Primeira sessão completada', icon: '🥇', earned: true },
  { id: '2', title: 'Consistente', description: '7 dias seguidos', icon: '🔥', earned: true },
  { id: '3', title: 'Explorador', description: 'Todas as categorias visitadas', icon: '🗺️', earned: false },
  { id: '4', title: 'Mestre', description: '100 interações completadas', icon: '👑', earned: false },
];

export const ProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Progresso" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Estatísticas</Text>
        
        {/* Cards de Estatísticas */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Conquistas</Text>
        
        {/* Lista de Badges */}
        <View style={styles.badgesList}>
          {badges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, !badge.earned && styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
              <View style={styles.badgeInfo}>
                <Text style={[styles.badgeTitle, !badge.earned && styles.badgeTitleLocked]}>
                  {badge.title}
                </Text>
                <Text style={[styles.badgeDescription, !badge.earned && styles.badgeDescriptionLocked]}>
                  {badge.description}
                </Text>
              </View>
              {badge.earned && <Text style={styles.badgeEarned}>✓</Text>}
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomNavigation 
        onHome={handleHome}
        homeActive={false}
      />
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLUE,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  badgesList: {
    gap: 12,
  },
  badgeCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeLocked: {
    borderColor: COLORS.YELLOW,
    opacity: 0.6,
  },
  badgeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  badgeTitleLocked: {
    color: COLORS.GREEN,
  },
  badgeDescription: {
    fontSize: 14,
    color: COLORS.GREEN,
  },
  badgeDescriptionLocked: {
    color: COLORS.YELLOW,
  },
  badgeEarned: {
    fontSize: 24,
    color: COLORS.BLUE,
    fontWeight: 'bold',
  },
});
