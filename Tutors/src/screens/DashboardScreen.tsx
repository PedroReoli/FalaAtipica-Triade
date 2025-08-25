import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const features = [
  { id: '1', title: 'Imagens e Sons', icon: '🖼️', screen: 'ImagesAndSounds' },
  { id: '2', title: 'Progresso', icon: '📊', screen: 'Progress' },
  { id: '3', title: 'Suporte', icon: '🆘', screen: 'Support' },
  { id: '4', title: 'Dicas', icon: '💡', screen: 'Tips' },
];

const children = [
  { id: '1', name: 'João Silva', age: 8, lastActivity: '2 horas atrás' },
  { id: '2', name: 'Maria Santos', age: 6, lastActivity: '1 dia atrás' },
  { id: '3', name: 'Pedro Costa', age: 7, lastActivity: '3 dias atrás' },
];

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleFeaturePress = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const handleChildPress = (childId: string) => {
    navigation.navigate('ChildProfile', { childId });
  };

  const handleHome = () => {
    // Já estamos no dashboard, não faz nada
  };

  const renderFeature = ({ item }: { item: typeof features[0] }) => (
    <TouchableOpacity
      style={styles.featureCard}
      onPress={() => handleFeaturePress(item.screen as keyof RootStackParamList)}
    >
      <Text style={styles.featureIcon}>{item.icon}</Text>
      <Text style={styles.featureTitle}>{item.title}</Text>
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
      <InternalHeader title="Dashboard" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Seção de Perfil */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Dr. Ana Silva</Text>
            <Text style={styles.profileRole}>Fonoaudióloga</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileButtonText}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Pesquisar crianças..."
            placeholderTextColor={COLORS.GREEN}
          />
        </View>

        {/* Grid de Funcionalidades */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <View key={feature.id} style={styles.featureWrapper}>
                {renderFeature({ item: feature })}
              </View>
            ))}
          </View>
        </View>

        {/* Lista de Crianças */}
        <View style={styles.childrenSection}>
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
        homeActive={true}
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.YELLOW,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  profileRole: {
    fontSize: 14,
    color: COLORS.GREEN,
    marginTop: 2,
  },
  profileButton: {
    padding: 8,
  },
  profileButtonText: {
    fontSize: 24,
  },
  searchContainer: {
    marginVertical: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.TEXT_WHITE,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureWrapper: {
    width: '48%',
  },
  featureCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  childrenSection: {
    marginBottom: 24,
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
