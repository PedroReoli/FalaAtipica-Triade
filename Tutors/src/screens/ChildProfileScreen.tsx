import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Trash2, Check } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { getCurrentYear } from '../utils/dateUtils';
import { mockAuthService } from '../services/mockAuthService';
import { emailService } from '../utils/emailService';
import { apiService } from '../services/apiService';
import { socketService } from '../services/socketService';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ChildProfileRouteProp = RouteProp<RootStackParamList, 'ChildProfile'>;

const generalSettings = [
  { id: '1', title: 'Solicitar Exclusão', icon: Trash2, action: 'requestDeletion' },
];

export const ChildProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChildProfileRouteProp>();
  const { childId } = route.params;
  const currentYear = getCurrentYear();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [childData, setChildData] = useState<{
    nome: string;
    idade: number;
    diagnostico: string;
    dataInicio: string;
    totalSessoes: number;
    ultimoAcesso: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    loadChildData();
    setupRealtimeUpdates();

    return () => {
      // Limpar listeners ao desmontar
      socketService.off('child-game-completed');
      socketService.off('child-game-started');
    };
  }, [childId]);

  const loadUserData = () => {
    // Buscar dados do usuário logado
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.nome);
      setUserEmail(currentUser.email);
    }
  };

  const loadChildData = async () => {
    try {
      setIsLoading(true);
      
      // Tentar buscar dados da API
      const response = await fetch(`${apiService['apiBaseUrl']}/tutors/child/${childId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Formatar data de início
          const dataInicioFormatada = formatDate(data.data.dataInicio);
          
          setChildData({
            nome: data.data.nome,
            idade: data.data.idade,
            diagnostico: data.data.diagnostico,
            dataInicio: dataInicioFormatada,
            totalSessoes: data.data.totalSessoes,
            ultimoAcesso: data.data.ultimoAcesso,
          });
          return;
        }
      }
    } catch (error) {
      console.log('⚠️ API erro - usando dados mockados');
    } finally {
      setIsLoading(false);
    }

    // Fallback: dados mockados
    setChildData({
      nome: 'João Silva',
      idade: 8,
      diagnostico: 'Atraso no desenvolvimento da linguagem',
      dataInicio: `15/03/${getCurrentYear()}`,
      totalSessoes: 47,
      ultimoAcesso: null,
    });
    setIsLoading(false);
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const loadDevices = async () => {
    try {
      // Tentar buscar dispositivos da API
      const response = await fetch(`${apiService['apiBaseUrl']}/tutors/devices/${childId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.devices) {
          // Formatar timestamps
          const formattedDevices = data.devices.map((device: any) => ({
            id: device.id,
            name: device.name,
            type: device.type,
            lastSync: formatTimestamp(device.lastSync),
          }));
          setConnectedDevices(formattedDevices);
          return;
        }
      }
    } catch (error) {
      console.log('⚠️ API erro - usando dados locais');
    }

    // Fallback: dados mockados
    setConnectedDevices([
      { id: '1', name: 'iPad da Escola', type: 'Tablet', lastSync: 'Há 2 horas' },
      { id: '2', name: 'iPhone da Mãe', type: 'Smartphone', lastSync: 'Há 1 dia' },
    ]);
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `Há ${diffMins} ${diffMins === 1 ? 'minuto' : 'minutos'}`;
    if (diffHours < 24) return `Há ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    return `Há ${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  };

  const setupRealtimeUpdates = () => {
    // Conectar WebSocket se ainda não conectou
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser && !socketService.isSocketConnected()) {
      socketService.connect(currentUser.id, currentUser.nome);
    }

    // Escutar quando criança completa jogo
    socketService.on('child-game-completed', (data: any) => {
      console.log('🎮 Jogo completado em tempo real:', data);
      
      // Verificar se é a criança atual
      if (data.userId === childId) {
        console.log('✅ Atualizando perfil da criança:', data.userName);
        
        // Recarregar dados da criança e dispositivos
        loadChildData();
        loadDevices();
        
        // Opcional: Mostrar notificação
        Alert.alert(
          '🎉 Jogo Completado!',
          `${data.userName} completou ${data.gameName} com ${data.score}% de acertos!`,
          [{ text: 'OK' }]
        );
      }
    });

    // Escutar quando criança inicia jogo
    socketService.on('child-game-started', (data: any) => {
      console.log('🎮 Jogo iniciado em tempo real:', data);
      
      // Verificar se é a criança atual
      if (data.userId === childId) {
        console.log('✅ Criança iniciou jogo:', data.gameName);
        
        // Recarregar dispositivos e dados
        loadChildData();
        loadDevices();
      }
    });
  };


  const handleSettingPress = (action: string) => {
    if (action === 'requestDeletion') {
      if (!childData) return;
      
      Alert.alert(
        'Solicitar Exclusão',
        `Deseja solicitar a exclusão do perfil de ${childData.nome}?\n\nEsta ação não pode ser desfeita.`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Solicitar Exclusão',
            style: 'destructive',
            onPress: async () => {
              const success = await emailService.requestChildDeletion(
                userName,
                userEmail,
                childData.nome,
                childId
              );
              if (success) {
                Alert.alert(
                  'Solicitação enviada!',
                  'A equipe FalaAtípica analisará sua solicitação e entrará em contato.',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.goBack()
                    }
                  ]
                );
              }
            }
          }
        ]
      );
    }
  };

  const handleDevicePress = (deviceId: string) => {
    // TODO: Implementar ação do dispositivo
    console.log('Dispositivo selecionado:', deviceId);
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

  const renderSetting = ({ item }: { item: typeof generalSettings[0] }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        style={styles.settingCard}
        onPress={() => handleSettingPress(item.action)}
      >
        <IconComponent size={20} color={COLORS.GREEN} />
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingArrow}>→</Text>
      </TouchableOpacity>
    );
  };

  const renderDevice = ({ item }: { item: typeof connectedDevices[0] }) => (
    <TouchableOpacity
      style={styles.deviceCard}
      onPress={() => handleDevicePress(item.id)}
    >
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={styles.deviceType}>{item.type}</Text>
      </View>
      <Text style={styles.deviceSync}>{item.lastSync}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Perfil da Criança"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.BLUE} />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        ) : childData ? (
          <>
            {/* Informações da Criança */}
            <View style={styles.childSection}>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{childData.nome}</Text>
                <Text style={styles.childAge}>{childData.idade} anos</Text>
                <Text style={styles.childDiagnosis}>{childData.diagnostico}</Text>
              </View>
            </View>

            {/* Estatísticas */}
            <View style={styles.statsSection}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{childData.totalSessoes}</Text>
                <Text style={styles.statLabel}>Sessões Totais</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{childData.dataInicio}</Text>
                <Text style={styles.statLabel}>Data de Início</Text>
              </View>
            </View>
          </>
        ) : null}

        {/* Configurações Gerais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações Gerais</Text>
          <FlatList
            data={generalSettings}
            renderItem={renderSetting}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Dispositivos Conectados */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dispositivos Conectados</Text>
          <FlatList
            data={connectedDevices}
            renderItem={renderDevice}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      <Footer 
        activeTab="profiles"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
  },
  childSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.YELLOW,
    marginBottom: 24,
  },
  childInfo: {
    alignItems: 'center',
  },
  childName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  childAge: {
    fontSize: 16,
    color: COLORS.GREEN,
    marginBottom: 8,
  },
  childDiagnosis: {
    fontSize: 14,
    color: COLORS.BLUE,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLUE,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    flex: 1,
    marginLeft: 16,
  },
  settingArrow: {
    fontSize: 16,
    color: COLORS.GREEN,
  },
  deviceCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 1,
    borderColor: COLORS.YELLOW,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  deviceType: {
    fontSize: 14,
    color: COLORS.GREEN,
    marginTop: 2,
  },
  deviceSync: {
    fontSize: 12,
    color: COLORS.GREEN,
  },
});
