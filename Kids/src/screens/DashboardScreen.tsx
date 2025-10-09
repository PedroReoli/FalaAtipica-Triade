import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Brain, Gamepad2, Route, Eye } from 'lucide-react-native';
import { Header } from '../components/Header';
import { HomeFooter } from '../components/HomeFooter';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { mockAuthService } from '../services/mockAuthService';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [userName, setUserName] = useState('Criança');

  useEffect(() => {
    // Buscar nome do usuário logado
    const currentUser = mockAuthService.getCurrentUser();
    if (currentUser) {
      setUserName(currentUser.nome);
    }
  }, []);

  const handleNavigateToGame = (gameType: 'trilha' | 'adivinha' | 'palavras') => {
    if (gameType === 'trilha') {
      navigation.navigate('IgualDiferente');
    } else if (gameType === 'adivinha') {
      navigation.navigate('GuessGame');
    } else {
      navigation.navigate('Categories');
    }
  };

  const handleLogout = () => {
    mockAuthService.logout();
    navigation.navigate('Login');
  };



  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showProfile={true}
        showLogo={true}
        userName={userName}
        onLogout={handleLogout}
      />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* 1º - Trilha do Aprendizado (Igual-Diferente) */}
        <TouchableOpacity 
          style={[styles.gameCard, { borderColor: COLORS.YELLOW }]}
          onPress={() => handleNavigateToGame('trilha')}
          activeOpacity={0.7}
        >
          <View style={[styles.gameIconContainer, { backgroundColor: '#FFF9E6' }]}>
            <Eye size={48} color={COLORS.YELLOW} />
          </View>
          <Text style={styles.gameTitle}>IGUAL-DIFERENTE</Text>
        </TouchableOpacity>

        {/* 2º - Adivinha */}
        <TouchableOpacity 
          style={[styles.gameCard, { borderColor: COLORS.BLUE }]}
          onPress={() => handleNavigateToGame('adivinha')}
          activeOpacity={0.7}
        >
          <View style={[styles.gameIconContainer, { backgroundColor: '#E3F2FD' }]}>
            <Gamepad2 size={48} color={COLORS.BLUE} />
          </View>
          <Text style={styles.gameTitle}>ADIVINHA</Text>
        </TouchableOpacity>

        {/* 3º - Jogo das Palavras */}
        <TouchableOpacity 
          style={[styles.gameCard, { borderColor: COLORS.GREEN }]}
          onPress={() => handleNavigateToGame('palavras')}
          activeOpacity={0.7}
        >
          <View style={[styles.gameIconContainer, { backgroundColor: '#E8F5E8' }]}>
            <Brain size={48} color={COLORS.GREEN} />
          </View>
          <Text style={styles.gameTitle}>PALAVRAS</Text>
        </TouchableOpacity>
      </View>

      <HomeFooter />
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
    paddingVertical: 32,
    gap: 24,
    justifyContent: 'center',
  },
  gameCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 140,
    justifyContent: 'center',
    gap: 12,
  },
  gameIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    letterSpacing: 1,
  },
});
