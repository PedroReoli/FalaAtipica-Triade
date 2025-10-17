import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Brain, Gamepad2, Eye, Film } from 'lucide-react-native';
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

  const handleNavigateToGame = (gameType: 'igual' | 'cena' | 'adivinha' | 'palavras') => {
    if (gameType === 'igual') {
      navigation.navigate('IgualDiferente');
    } else if (gameType === 'cena') {
      navigation.navigate('CenaCerta');
    } else if (gameType === 'adivinha') {
      navigation.navigate('GuessGame');
    } else if (gameType === 'palavras') {
      // Por enquanto, sempre inicia com categoria "animais"
      // Futuramente pode ter tela de seleção de categoria
      navigation.navigate('PalavrasGame', { categoryId: 'animais' });
    }
  };

  const handleLogout = () => {
    mockAuthService.logout();
    
    // Limpa o histórico de navegação e vai para Login
    // Isso impede que o usuário volte para Dashboard ao clicar em "voltar"
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };



  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showProfile={true}
        showLogo={true}
        userName={userName}
        onLogout={handleLogout}
        onNotificationsPress={() => navigation.navigate('Reminders')}
        showNotifications={true}
      />

      {/* Conteúdo Principal - Grid 2x2 */}
      <View style={styles.content}>
        <View style={styles.gamesGrid}>
          {/* 1º - Igual-Diferente */}
          <TouchableOpacity 
            style={[styles.gameCard, { borderColor: COLORS.YELLOW }]}
            onPress={() => handleNavigateToGame('igual')}
            activeOpacity={0.7}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: '#FFF9E6' }]}>
              <Eye size={40} color={COLORS.YELLOW} />
            </View>
            <Text style={styles.gameTitle}>IGUAL-DIFERENTE</Text>
          </TouchableOpacity>

          {/* 2º - Cena Certa */}
          <TouchableOpacity 
            style={[styles.gameCard, { borderColor: COLORS.RED }]}
            onPress={() => handleNavigateToGame('cena')}
            activeOpacity={0.7}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: '#FFE8E8' }]}>
              <Film size={40} color={COLORS.RED} />
            </View>
            <Text style={styles.gameTitle}>CENA CERTA</Text>
          </TouchableOpacity>

          {/* 3º - Adivinha */}
          <TouchableOpacity 
            style={[styles.gameCard, { borderColor: COLORS.BLUE }]}
            onPress={() => handleNavigateToGame('adivinha')}
            activeOpacity={0.7}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: '#E3F2FD' }]}>
              <Gamepad2 size={40} color={COLORS.BLUE} />
            </View>
            <Text style={styles.gameTitle}>ADIVINHA</Text>
          </TouchableOpacity>

          {/* 4º - Jogo das Palavras */}
          <TouchableOpacity 
            style={[styles.gameCard, { borderColor: COLORS.GREEN }]}
            onPress={() => handleNavigateToGame('palavras')}
            activeOpacity={0.7}
          >
            <View style={[styles.gameIconContainer, { backgroundColor: '#E8F5E8' }]}>
              <Brain size={40} color={COLORS.GREEN} />
            </View>
            <Text style={styles.gameTitle}>PALAVRAS</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gameCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 16,
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
    width: '47%', // 2 cards por linha
    minHeight: 150,
    justifyContent: 'center',
    gap: 10,
  },
  gameIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
