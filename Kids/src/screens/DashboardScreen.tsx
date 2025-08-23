import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Wrench, Droplets } from 'lucide-react-native';
import { Header } from '../components/Header';
import { HomeFooter } from '../components/HomeFooter';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleNavigateToGame = (gameType: 'words' | 'guess') => {
    if (gameType === 'words') {
      navigation.navigate('Categories');
    } else {
      navigation.navigate('Adivinha');
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <Header 
        showProfile={true}
        showLogo={true}
      />

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        {/* Cartão do Jogo das Palavras */}
        <TouchableOpacity 
          style={styles.gameCard}
          onPress={() => handleNavigateToGame('words')}
        >
          <View style={styles.gameIcon}>
            <Wrench size={32} color={COLORS.BLUE} />
            <Droplets size={32} color={COLORS.BLUE} />
          </View>
          <Text style={styles.gameTitle}>JOGO DAS PALAVRAS</Text>
        </TouchableOpacity>

        {/* Cartão do Jogo Adivinha */}
        <TouchableOpacity 
          style={styles.gameCard}
          onPress={() => handleNavigateToGame('guess')}
        >
          <View style={styles.gameIcon}>
            <Wrench size={32} color={COLORS.BLUE} />
            <Droplets size={32} color={COLORS.BLUE} />
          </View>
          <Text style={styles.gameTitle}>ADVINHA</Text>
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
    padding: 24,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
    justifyContent: 'center',
  },
  gameIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
});
