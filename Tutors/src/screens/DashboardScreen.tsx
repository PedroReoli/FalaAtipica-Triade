import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  Calendar, 
  BarChart3, 
  HelpCircle, 
  Lightbulb, 
  User,
  Gamepad2
} from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { apiService } from '../services/apiService';
import { socketService } from '../services/socketService';
import { useToast } from '../hooks/useToast';
import { ToastContainer } from '../components/Toast';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Crianca {
  id: string;
  nome: string;
  idade: number;
  diagnostico: string;
  progressoGeral: number;
}

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { toasts, removeToast, success, info } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [criancas, setCriancas] = useState<Crianca[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadUserData();
    setupWebSocket();

    return () => {
      // Limpar listeners ao desmontar
      socketService.off('progress-updated');
      socketService.off('child-game-completed');
      socketService.off('child-achievement-unlocked');
      socketService.off('session-created');
      socketService.off('agenda-created');
      socketService.off('agenda-updated');
    };
  }, []);

  const setupWebSocket = () => {
    const currentUser = mockAuthService.getCurrentUser();
    
    if (currentUser) {
      // Conectar WebSocket
      socketService.connect(currentUser.id, currentUser.nome);

      // Escutar progresso atualizado
      socketService.on('progress-updated', (data: any) => {
        console.log('📊 Progresso atualizado:', data);
        // Atualizar UI
        updateChildProgress(data.userId, data.score);
      });

      // Escutar jogo completado
      socketService.on('child-game-completed', (data: any) => {
        success(`🎉 ${data.userName} completou ${data.gameName}!`);
        // Recarregar dados
        loadUserData();
      });

      // Escutar conquista desbloqueada
      socketService.on('child-achievement-unlocked', (data: any) => {
        info(`⭐ ${data.userName} desbloqueou: ${data.achievementName}`);
      });

      // Escutar sessão criada
      socketService.on('session-created', (data: any) => {
        success(`📝 Nova sessão agendada para ${data.patientName}`);
        // Recarregar dados para atualizar contadores
        loadUserData();
      });

      // Escutar agenda criada
      socketService.on('agenda-created', (data: any) => {
        success(`📅 Nova consulta agendada: ${data.criancaNome} - ${data.data} às ${data.horario}`);
      });

      // Escutar agenda atualizada
      socketService.on('agenda-updated', (data: any) => {
        info(`📅 Consulta atualizada: ${data.criancaNome} - Status: ${data.status}`);
      });
    }
  };

  const updateChildProgress = (childId: string, newScore: number) => {
    setCriancas(prev => prev.map(crianca => {
      if (crianca.id === childId) {
        return {
          ...crianca,
          progressoGeral: Math.round((crianca.progressoGeral + newScore) / 2)
        };
      }
      return crianca;
    }));
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      
      // Pegar usuário logado
      const currentUser = mockAuthService.getCurrentUser();
      
      if (currentUser) {
        setUserName(currentUser.nome);
        
        // Carregar perfil do tutor via API
        const perfilData = await apiService.getTutorProfile(currentUser.id);
        
        if (perfilData && perfilData.criancas) {
          setCriancas(perfilData.criancas);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Fallback para dados mockados locais se API falhar
      try {
        const MocapService = require('../services/mocapService').default;
        const perfilData = await MocapService.getTutorProfile(currentUser.id);
        if (perfilData && perfilData.criancas) {
          setCriancas(perfilData.criancas);
        }
      } catch (fallbackError) {
        console.error('Erro ao carregar dados mockados:', fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToFeature = (feature: keyof RootStackParamList) => {
    if (feature === 'ChildProfile') {
      navigation.navigate('ChildProfile', { childId: '1' });
    } else {
      navigation.navigate(feature);
    }
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    mockAuthService.logout();
    socketService.disconnect();
    
    // Limpa o histórico de navegação e vai para Login
    // Isso impede que o usuário volte para Dashboard ao clicar em "voltar"
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleProfileTap = () => {
    // Incrementar contador de taps
    setTapCount(prev => prev + 1);

    // Limpar timer anterior se existir
    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    // Verificar se é o segundo tap
    if (tapCount === 1) {
      // Segundo tap - fazer logout
      handleLogout();
      setTapCount(0);
    } else {
      // Primeiro tap - esperar 500ms para ver se vem o segundo
      tapTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 500);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.BLUE} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Area */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImage}
            onPress={handleProfileTap}
            activeOpacity={0.7}
          >
            <User size={20} color={COLORS.TEXT_WHITE} />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Olá</Text>
            <Text style={styles.userName}>{userName || 'Usuário'}</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Funcionalidades Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <View style={styles.functionalitiesGrid}>
            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Agenda')}
            >
              <View style={styles.cardIcon}>
                <Calendar size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Agenda</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Progress')}
            >
              <View style={styles.cardIcon}>
                <BarChart3 size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Progresso</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Support')}
            >
              <View style={styles.cardIcon}>
                <HelpCircle size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Suporte</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Tips')}
            >
              <View style={styles.cardIcon}>
                <Lightbulb size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Dicas e Recursos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Games')}
            >
              <View style={styles.cardIcon}>
                <Gamepad2 size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Jogos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Crianças Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crianças ({criancas.length})</Text>
          <View style={styles.childrenList}>
            {criancas.length > 0 ? (
              criancas.map((crianca) => (
                <TouchableOpacity 
                  key={crianca.id}
                  style={styles.childCard}
                  onPress={() => navigation.navigate('ChildProfile', { childId: crianca.id })}
                >
                  <View style={styles.childImage}>
                    <User size={20} color={COLORS.TEXT_WHITE} />
                  </View>
                  <View style={styles.childInfo}>
                    <View style={styles.childHeader}>
                      <Text style={styles.childName}>{crianca.nome}</Text>
                      <Text style={styles.childAge}>{crianca.idade} anos</Text>
                    </View>
                    <Text style={styles.childDescription}>{crianca.diagnostico}</Text>
                    {/* Barra de Progresso */}
                    <View style={styles.progressBarContainer}>
                      <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${crianca.progressoGeral}%` }]} />
                      </View>
                      <Text style={styles.progressText}>{crianca.progressoGeral}%</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>Nenhuma criança cadastrada</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    fontWeight: '500',
  },
  header: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  functionalitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  functionalityCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  childrenList: {
    gap: 12,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
    gap: 8,
  },
  childHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  childAge: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    opacity: 0.7,
    backgroundColor: COLORS.BLUE,
    color: COLORS.TEXT_WHITE,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: '600',
  },
  childDescription: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    opacity: 0.8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.GREEN,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    minWidth: 35,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    opacity: 0.6,
  },
});
