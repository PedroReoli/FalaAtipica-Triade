import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const generalSettings = [
  { id: '1', title: 'Alterar Senha', icon: '🔒', action: 'changePassword' },
  { id: '2', title: 'Nova Conta', icon: '➕', action: 'newAccount' },
  { id: '3', title: 'Sobre o App', icon: 'ℹ️', action: 'aboutApp' },
  { id: '4', title: 'Termos de Uso', icon: '📄', action: 'terms' },
  { id: '5', title: 'Assinatura', icon: '💳', action: 'subscription' },
];

const children = [
  { id: '1', name: 'João Silva', age: 8, lastActivity: '2 horas atrás' },
  { id: '2', name: 'Maria Santos', age: 6, lastActivity: '1 dia atrás' },
  { id: '3', name: 'Pedro Costa', age: 7, lastActivity: '3 dias atrás' },
];

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSettingPress = (action: string) => {
    // TODO: Implementar ações das configurações
    console.log('Configuração selecionada:', action);
  };

  const handleChildPress = (childId: string) => {
    navigation.navigate('ChildProfile', { childId });
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const renderSetting = ({ item }: { item: typeof generalSettings[0] }) => (
    <TouchableOpacity
      style={styles.settingCard}
      onPress={() => handleSettingPress(item.action)}
    >
      <Text style={styles.settingIcon}>{item.icon}</Text>
      <Text style={styles.settingTitle}>{item.title}</Text>
      <Text style={styles.settingArrow}>→</Text>
    </TouchableOpacity>
  );

  const renderChild = ({ item }: { item: typeof children[0] }) => (
    <TouchableOpacity
      style={styles.childCard}
      onPress={() => handleChildPress(item.id)}
    >
      <View style={styles.childInfo}>
        <Text style={styles.childName}>{item.name}</Text>
        <Text style={styles.childAge}>{item.age} anos</Text>
      </View>
      <Text style={styles.childActivity}>{item.lastActivity}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Perfil" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Informações do Usuário */}
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Dr. Ana Silva</Text>
            <Text style={styles.userRole}>Fonoaudióloga</Text>
            <Text style={styles.userEmail}>ana.silva@email.com</Text>
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

        {/* Lista de Crianças */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crianças</Text>
          <FlatList
            data={children}
            renderItem={renderChild}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
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
  },
  userSection: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.YELLOW,
    marginBottom: 24,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: COLORS.GREEN,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.BLUE,
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
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    flex: 1,
  },
  settingArrow: {
    fontSize: 16,
    color: COLORS.GREEN,
  },
  childCard: {
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
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  childAge: {
    fontSize: 14,
    color: COLORS.GREEN,
    marginTop: 2,
  },
  childActivity: {
    fontSize: 12,
    color: COLORS.GREEN,
  },
});
