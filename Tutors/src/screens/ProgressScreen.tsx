import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BarChart3, Calendar, Clock, Dog, Trophy, Flame, Map, Crown, Check } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const stats = [
  { id: '1', title: 'Total de Interações', value: '1,247', icon: BarChart3 },
  { id: '2', title: 'Dias Ativos', value: '23', icon: Calendar },
  { id: '3', title: 'Tempo Médio por Sessão', value: '15 min', icon: Clock },
  { id: '4', title: 'Categoria Mais Usada', value: 'Animais', icon: Dog },
];

const badges = [
  { id: '1', title: 'Primeiro Passo', description: 'Primeira sessão completada', icon: Trophy, earned: true },
  { id: '2', title: 'Consistente', description: '7 dias seguidos', icon: Flame, earned: true },
  { id: '3', title: 'Explorador', description: 'Todas as categorias visitadas', icon: Map, earned: false },
  { id: '4', title: 'Mestre', description: '100 interações completadas', icon: Crown, earned: false },
];

export const ProgressScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Progresso"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Estatísticas</Text>
        
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

        <Text style={styles.title}>Conquistas</Text>
        
        {/* Lista de Badges - Layout Compacto */}
        <View style={styles.badgesGrid}>
          {badges.map((badge) => {
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
      </View>

      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={() => {}}
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
});
