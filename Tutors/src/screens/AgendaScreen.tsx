import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Calendar, Clock, MapPin, Video, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService } from '../services/mockAuthService';
import { API_BASE_URL } from '../config/api';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Agenda {
  id: string;
  criancaId: string;
  criancaNome: string;
  profissionalId: string;
  profissionalNome: string;
  profissionalEspecialidade: string;
  data: string;
  horario: string;
  duracao: number;
  tipo: string;
  status: 'agendada' | 'confirmada' | 'concluida' | 'cancelada';
  observacoes: string;
  local: string;
  criadoEm: string;
}

export const AgendaScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'todas' | 'proximas' | 'concluidas'>('proximas');

  useEffect(() => {
    loadAgendas();
  }, []);

  const loadAgendas = async () => {
    try {
      setIsLoading(true);
      const currentUser = mockAuthService.getCurrentUser();
      
      if (!currentUser) return;

      // Tentar buscar da API
      try {
        const response = await fetch(`${API_BASE_URL}/tutors/agendas/${currentUser.id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(3000),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.agendas) {
            setAgendas(data.agendas);
            setIsLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('⚠️ API erro - usando dados mockados');
      }

      // Fallback: carregar dados mockados
      const agendasData = require('../../mockup-data/agendas.json');
      setAgendas(agendasData.agendas || []);
    } catch (error) {
      console.error('Erro ao carregar agendas:', error);
      setAgendas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredAgendas = (): Agenda[] => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'proximas':
        return agendas.filter(agenda => {
          const dataAgenda = new Date(agenda.data);
          return (
            (agenda.status === 'agendada' || agenda.status === 'confirmada') &&
            dataAgenda >= hoje
          );
        }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
      
      case 'concluidas':
        return agendas.filter(agenda => 
          agenda.status === 'concluida' || agenda.status === 'cancelada'
        ).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      
      default:
        return agendas.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    }
  };

  const formatData = (dataStr: string): string => {
    const data = new Date(dataStr);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const diaSemana = diasSemana[data.getDay()];
    
    return `${diaSemana}, ${dia}/${mes}/${ano}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmada':
        return <CheckCircle size={18} color={COLORS.GREEN} />;
      case 'agendada':
        return <AlertCircle size={18} color={COLORS.YELLOW} />;
      case 'concluida':
        return <CheckCircle size={18} color={COLORS.BLUE} />;
      case 'cancelada':
        return <XCircle size={18} color={COLORS.RED} />;
      default:
        return <Calendar size={18} color={COLORS.TEXT_BLACK} />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmada':
        return COLORS.GREEN;
      case 'agendada':
        return COLORS.YELLOW;
      case 'concluida':
        return COLORS.BLUE;
      case 'cancelada':
        return COLORS.RED;
      default:
        return COLORS.TEXT_BLACK;
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'agendada':
        return 'Agendada';
      case 'concluida':
        return 'Concluída';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
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

  const filteredAgendas = getFilteredAgendas();

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Agenda"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'proximas' && styles.filterButtonActive]}
          onPress={() => setFilter('proximas')}
        >
          <Text style={[styles.filterText, filter === 'proximas' && styles.filterTextActive]}>
            Próximas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'todas' && styles.filterButtonActive]}
          onPress={() => setFilter('todas')}
        >
          <Text style={[styles.filterText, filter === 'todas' && styles.filterTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'concluidas' && styles.filterButtonActive]}
          onPress={() => setFilter('concluidas')}
        >
          <Text style={[styles.filterText, filter === 'concluidas' && styles.filterTextActive]}>
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.BLUE} />
          <Text style={styles.loadingText}>Carregando agendas...</Text>
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {filteredAgendas.length > 0 ? (
            filteredAgendas.map((agenda) => (
              <View key={agenda.id} style={[styles.agendaCard, { borderColor: getStatusColor(agenda.status) }]}>
                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agenda.status) }]}>
                  {getStatusIcon(agenda.status)}
                  <Text style={styles.statusText}>{getStatusText(agenda.status)}</Text>
                </View>

                {/* Criança */}
                <View style={styles.agendaRow}>
                  <User size={18} color={COLORS.BLUE} />
                  <Text style={styles.agendaLabel}>Criança:</Text>
                  <Text style={styles.agendaValue}>{agenda.criancaNome}</Text>
                </View>

                {/* Profissional */}
                <View style={styles.agendaRow}>
                  <User size={18} color={COLORS.GREEN} />
                  <Text style={styles.agendaLabel}>Profissional:</Text>
                  <Text style={styles.agendaValue}>{agenda.profissionalNome}</Text>
                </View>
                <Text style={styles.especialidade}>{agenda.profissionalEspecialidade}</Text>

                {/* Data e Horário */}
                <View style={styles.dateTimeContainer}>
                  <View style={styles.agendaRow}>
                    <Calendar size={18} color={COLORS.YELLOW} />
                    <Text style={styles.agendaValue}>{formatData(agenda.data)}</Text>
                  </View>
                  <View style={styles.agendaRow}>
                    <Clock size={18} color={COLORS.YELLOW} />
                    <Text style={styles.agendaValue}>{agenda.horario} ({agenda.duracao} min)</Text>
                  </View>
                </View>

                {/* Local */}
                <View style={styles.agendaRow}>
                  {agenda.tipo === 'Consulta Online' ? (
                    <Video size={18} color={COLORS.RED} />
                  ) : (
                    <MapPin size={18} color={COLORS.RED} />
                  )}
                  <Text style={styles.agendaLabel}>{agenda.tipo}:</Text>
                  <Text style={styles.agendaValue}>{agenda.local}</Text>
                </View>

                {/* Observações */}
                {agenda.observacoes && (
                  <View style={styles.observacoesContainer}>
                    <Text style={styles.observacoesLabel}>Observações:</Text>
                    <Text style={styles.observacoesText}>{agenda.observacoes}</Text>
                  </View>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Calendar size={64} color={COLORS.BLUE} />
              <Text style={styles.emptyStateTitle}>Nenhuma agenda encontrada</Text>
              <Text style={styles.emptyStateText}>
                {filter === 'proximas' && 'Não há consultas agendadas no momento.'}
                {filter === 'concluidas' && 'Não há histórico de consultas.'}
                {filter === 'todas' && 'Não há agendas cadastradas.'}
              </Text>
            </View>
          )}
        </ScrollView>
      )}

      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    backgroundColor: COLORS.TEXT_WHITE,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: COLORS.BLUE,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLUE,
  },
  filterTextActive: {
    color: COLORS.TEXT_WHITE,
  },
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
  agendaCard: {
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
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 11,
    fontWeight: 'bold',
  },
  agendaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  agendaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  agendaValue: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  especialidade: {
    fontSize: 12,
    color: COLORS.GREEN,
    marginLeft: 26,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  dateTimeContainer: {
    marginVertical: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  observacoesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  observacoesLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  observacoesText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
    paddingHorizontal: 32,
  },
});

