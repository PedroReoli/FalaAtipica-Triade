import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Trash2, Check } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;
type ChildProfileRouteProp = RouteProp<RootStackParamList, 'ChildProfile'>;

const generalSettings = [
  { id: '1', title: 'Solicitar Exclusão', icon: Trash2, action: 'requestDeletion' },
];

const connectedDevices = [
  { id: '1', name: 'iPad da Escola', type: 'Tablet', lastSync: '2 horas atrás' },
  { id: '2', name: 'iPhone da Mãe', type: 'Smartphone', lastSync: '1 dia atrás' },
];

export const ChildProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChildProfileRouteProp>();
  const { childId } = route.params;

  // Mock data - em uma aplicação real, buscaríamos os dados baseado no childId
  const childData = {
    name: 'João Silva',
    age: 8,
    diagnosis: 'Transtorno do Espectro Autista',
    startDate: '15/03/2024',
    totalSessions: 47,
  };

  const handleSettingPress = (action: string) => {
    // TODO: Implementar ações das configurações
    console.log('Configuração selecionada:', action);
  };

  const handleDevicePress = (deviceId: string) => {
    // TODO: Implementar ação do dispositivo
    console.log('Dispositivo selecionado:', deviceId);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
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
        {/* Informações da Criança */}
        <View style={styles.childSection}>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>{childData.name}</Text>
            <Text style={styles.childAge}>{childData.age} anos</Text>
            <Text style={styles.childDiagnosis}>{childData.diagnosis}</Text>
          </View>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{childData.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessões Totais</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{childData.startDate}</Text>
            <Text style={styles.statLabel}>Data de Início</Text>
          </View>
        </View>

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
        onProfilesPress={() => {}}
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
