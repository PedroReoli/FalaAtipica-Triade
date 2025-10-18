import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Calendar, Clock, MapPin, Video, User, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { ChildSelector } from '../components/ChildSelector';
import { mockAuthService } from '../services/mockAuthService';
import { socketService } from '../services/socketService';
import { API_BASE_URL } from '../config/api';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Child {
  id: string;
  nome: string;
  idade: number;
  progressoGeral?: number;
}

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
  status: 'pendente' | 'confirmada' | 'concluida' | 'cancelada';
  observacoes: string;
  local: string;
  criadoEm: string;
}

export const AgendaScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [agendas, setAgendas] = useState<Agenda[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'todas' | 'proximas' | 'concluidas' | 'pendentes'>('proximas');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [availableChildren, setAvailableChildren] = useState<Child[]>([]);

  useEffect(() => {
    loadAvailableChildren();
    loadAgendas();
    
    // DESABILITADO - Sistema de agenda
    /*
    // Socket.IO: escutar novas agendas criadas pelo Pro
    socketService.on('agenda-created', (data: any) => {
      console.log('📅 Nova agenda recebida do Pro:', data);
      const currentUser = mockAuthService.getCurrentUser();
      if (currentUser && data.tutorId === currentUser.id) {
        // Adicionar nova agenda na lista
        setAgendas(prevAgendas => [data.agenda, ...prevAgendas]);
      }
    });

    return () => {
      socketService.off('agenda-created');
    };
    */
  }, []);

  useEffect(() => {
    if (selectedChild) {
      loadAgendas();
    }
  }, [selectedChild]);

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

  // DESABILITADO - Sistema de agenda
  /*
  const loadAgendas = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setIsLoading(true);
      const currentUser = mockAuthService.getCurrentUser();
      
      if (!currentUser) return;

      // Usar criança selecionada ou primeira criança
      const childIdToFilter = selectedChild || currentUser.criancasIds?.[0];

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
            // Filtrar por criança selecionada
            const agendasFiltradas = childIdToFilter
              ? data.agendas.filter((a: any) => a.criancaId === childIdToFilter)
              : data.agendas;
            setAgendas(agendasFiltradas);
            if (!isRefreshing) setIsLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('⚠️ API erro - usando dados do arquivo shared/agendas.json');
      }

      // Fallback: carregar dados do arquivo mockup-data/agendas.json
      try {
        const agendasData = require('../../mockup-data/agendas.json');
        const todasAgendas = agendasData.agendas || [];
        
        // Filtrar agendas do tutor atual
        const agendasDoTutor = todasAgendas.filter((agenda: any) => 
          agenda.tutorId === currentUser.id
        );

        // Filtrar por criança selecionada se houver
        const agendasFiltradas = childIdToFilter
          ? agendasDoTutor.filter((agenda: any) => agenda.criancaId === childIdToFilter)
          : agendasDoTutor;
        
        console.log('✅ Agendas mockadas carregadas:', agendasFiltradas.length);
        setAgendas(agendasFiltradas);
      } catch (mockError) {
        console.error('❌ Erro ao carregar agendas mockadas:', mockError);
        setAgendas([]);
      }
    } catch (error) {
      console.error('Erro ao carregar agendas:', error);
      setAgendas([]);
    } finally {
      if (!isRefreshing) setIsLoading(false);
    }
  };
  */

  // Função simplificada - sem agenda por enquanto
  const loadAgendas = async (isRefreshing = false) => {
    setIsLoading(true);
    setAgendas([]); // Lista vazia por enquanto
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAgendas(true);
    setRefreshing(false);
  };

  const toggleCardExpansion = (agendaId: string) => {
    setExpandedCard(expandedCard === agendaId ? null : agendaId);
  };

  const getFilteredAgendas = (): Agenda[] => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'proximas':
        // Apenas confirmadas E futuras (data >= hoje)
        return agendas.filter(agenda => {
          const dataAgenda = new Date(agenda.data);
          dataAgenda.setHours(0, 0, 0, 0);
          return agenda.status === 'confirmada' && dataAgenda >= hoje;
        }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
      
      case 'pendentes':
        // Apenas pendentes (independente da data)
        return agendas.filter(agenda => agenda.status === 'pendente')
          .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
      
      case 'concluidas':
        // Histórico: concluídas, canceladas OU qualquer agenda que já passou (exceto pendentes)
        return agendas.filter(agenda => {
          const dataAgenda = new Date(agenda.data);
          dataAgenda.setHours(0, 0, 0, 0);
          
          // Já marcadas como concluídas ou canceladas
          if (agenda.status === 'concluida' || agenda.status === 'cancelada') {
            return true;
          }
          
          // Confirmadas que já passaram vão para histórico automaticamente
          if (agenda.status === 'confirmada' && dataAgenda < hoje) {
            return true;
          }
          
          return false;
        }).sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      
      default:
        // Todas (ordenadas por data, mais recentes primeiro)
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
        return <CheckCircle size={18} color={COLORS.TEXT_WHITE} />;
      case 'pendente':
        return <AlertCircle size={18} color={COLORS.TEXT_WHITE} />;
      case 'concluida':
        return <CheckCircle size={18} color={COLORS.TEXT_WHITE} />;
      case 'cancelada':
        return <XCircle size={18} color={COLORS.TEXT_WHITE} />;
      default:
        return <Calendar size={18} color={COLORS.TEXT_WHITE} />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'confirmada':
        return COLORS.GREEN;
      case 'pendente':
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
      case 'pendente':
        return 'Aguardando Confirmação';
      case 'concluida':
        return 'Concluída';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const handleConfirmarAgenda = async (agendaId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tutors/agenda/${agendaId}/confirmar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Atualizar estado local
          setAgendas(prevAgendas =>
            prevAgendas.map(agenda =>
              agenda.id === agendaId
                ? { ...agenda, status: 'confirmada', confirmedAt: new Date().toISOString() }
                : agenda
            )
          );
          console.log('✅ Agenda confirmada com sucesso!');
          return;
        }
      }
    } catch (error) {
      console.log('⚠️ API erro ao confirmar - atualizando localmente');
    }

    // Fallback: atualizar apenas localmente se API falhar
    setAgendas(prevAgendas =>
      prevAgendas.map(agenda =>
        agenda.id === agendaId
          ? { ...agenda, status: 'confirmada', confirmedAt: new Date().toISOString() }
          : agenda
      )
    );
    console.log('✅ Agenda confirmada localmente (sem API)');
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

      {/* Seletor de Criança - Apenas se tiver 2+ crianças */}
      <ChildSelector
        children={availableChildren}
        selectedChildId={selectedChild}
        onSelectChild={setSelectedChild}
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
          style={[styles.filterButton, filter === 'pendentes' && styles.filterButtonActive]}
          onPress={() => setFilter('pendentes')}
        >
          <Text style={[styles.filterText, filter === 'pendentes' && styles.filterTextActive]}>
            Pendentes
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
        <FlatList
          data={filteredAgendas}
          keyExtractor={(item) => item.id}
          renderItem={({ item: agenda }) => {
            const isExpanded = expandedCard === agenda.id;
            
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleCardExpansion(agenda.id)}
                style={[
                  isExpanded ? styles.agendaCardExpanded : styles.agendaCardCompact,
                  { borderLeftColor: getStatusColor(agenda.status) }
                ]}
              >
                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agenda.status) }]}>
                  {getStatusIcon(agenda.status)}
                  <Text style={styles.statusText}>{getStatusText(agenda.status)}</Text>
                </View>

                {/* Cabeçalho Compacto - SEMPRE VISÍVEL */}
                <View style={styles.compactHeader}>
                  <View style={styles.compactInfo}>
                    <Text style={styles.compactNome}>{agenda.criancaNome}</Text>
                    <Text style={styles.compactData}>{formatData(agenda.data)} • {agenda.horario}</Text>
                  </View>
                  <View style={styles.expandIcon}>
                    {isExpanded ? (
                      <ChevronUp size={24} color={COLORS.BLUE} />
                    ) : (
                      <ChevronDown size={24} color={COLORS.BLUE} />
                    )}
                  </View>
                </View>

                {/* Detalhes Expandidos - CONDICIONAL */}
                {isExpanded && (
                  <View style={styles.expandedContent}>
                    {/* Profissional */}
                    <View style={styles.agendaRow}>
                      <User size={20} color={COLORS.GREEN} />
                      <Text style={styles.agendaLabel}>Profissional</Text>
                      <Text style={styles.agendaValue}>{agenda.profissionalNome}</Text>
                    </View>
                    <Text style={styles.especialidade}>• {agenda.profissionalEspecialidade}</Text>

                    {/* Data e Horário Detalhado */}
                    <View style={styles.dateTimeContainer}>
                      <View style={styles.agendaRow}>
                        <Calendar size={18} color={COLORS.YELLOW} />
                        <Text style={styles.agendaValue}>{formatData(agenda.data)}</Text>
                      </View>
                      <View style={styles.agendaRow}>
                        <Clock size={18} color={COLORS.YELLOW} />
                        <Text style={styles.agendaValue}>{agenda.horario} • {agenda.duracao} minutos</Text>
                      </View>
                    </View>

                    {/* Local */}
                    <View style={styles.agendaRow}>
                      {agenda.tipo === 'Consulta Online' ? (
                        <Video size={20} color={COLORS.RED} />
                      ) : (
                        <MapPin size={20} color={COLORS.RED} />
                      )}
                      <Text style={styles.agendaLabel}>{agenda.tipo}</Text>
                      <Text style={styles.agendaValue}>{agenda.local}</Text>
                    </View>

                    {/* Observações */}
                    {agenda.observacoes && (
                      <View style={styles.observacoesContainer}>
                        <Text style={styles.observacoesLabel}>📝 Observações</Text>
                        <Text style={styles.observacoesText}>{agenda.observacoes}</Text>
                      </View>
                    )}

                    {/* Botão Confirmar - Apenas para agendas pendentes */}
                    {agenda.status === 'pendente' && (
                      <TouchableOpacity
                        style={styles.confirmarButton}
                        onPress={(e) => {
                          e.stopPropagation();
                          handleConfirmarAgenda(agenda.id);
                        }}
                      >
                        <CheckCircle size={20} color={COLORS.TEXT_WHITE} />
                        <Text style={styles.confirmarButtonText}>Confirmar Agenda</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.BLUE]}
              tintColor={COLORS.BLUE}
              title="Atualizando agendas..."
              titleColor={COLORS.BLUE}
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Calendar size={72} color={COLORS.BLUE} opacity={0.3} />
              <Text style={styles.emptyStateTitle}>Nenhuma agenda encontrada</Text>
              <Text style={styles.emptyStateText}>
                {filter === 'proximas' && 'Não há consultas confirmadas no momento.\nAgendas confirmadas aparecerão aqui.'}
                {filter === 'pendentes' && 'Não há agendas aguardando confirmação.\nAgendas criadas pelo profissional aparecerão aqui.'}
                {filter === 'concluidas' && 'Não há histórico de consultas.\nConsultas concluídas aparecerão aqui.'}
                {filter === 'todas' && 'Não há agendas cadastradas.\nEntre em contato com o profissional.'}
              </Text>
            </View>
          )}
        />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    backgroundColor: COLORS.TEXT_WHITE,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterButtonActive: {
    backgroundColor: COLORS.BLUE,
    elevation: 3,
    shadowOpacity: 0.15,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.BLUE,
    letterSpacing: 0.3,
  },
  filterTextActive: {
    color: COLORS.TEXT_WHITE,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
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
  agendaCardCompact: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
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
    elevation: 2,
    position: 'relative',
  },
  agendaCardExpanded: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 5,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#F0F0F0',
    borderRightColor: '#F0F0F0',
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    position: 'relative',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactInfo: {
    flex: 1,
    paddingRight: 12,
  },
  compactNome: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  compactData: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  expandIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    borderRadius: 16,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  statusBadge: {
    position: 'absolute',
    top: -8,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  statusText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  agendaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
    paddingVertical: 2,
  },
  agendaLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    minWidth: 80,
  },
  agendaValue: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    flex: 1,
    fontWeight: '500',
  },
  especialidade: {
    fontSize: 12,
    color: COLORS.GREEN,
    marginLeft: 34,
    marginTop: -6,
    marginBottom: 10,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  dateTimeContainer: {
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.YELLOW,
  },
  observacoesContainer: {
    marginTop: 14,
    paddingTop: 14,
    paddingHorizontal: 12,
    paddingBottom: 4,
    borderTopWidth: 2,
    borderTopColor: '#E8E8E8',
    backgroundColor: '#FAFBFC',
    borderRadius: 8,
    marginHorizontal: -6,
  },
  observacoesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  observacoesText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    fontWeight: '400',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.TEXT_BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  confirmarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.GREEN,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    gap: 8,
  },
  confirmarButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

