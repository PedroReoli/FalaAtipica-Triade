import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Zap, Lightbulb } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type GuessGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GuessGame'>;

export const GuessGameScreen: React.FC = () => {
  const navigation = useNavigation<GuessGameScreenNavigationProp>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleNext = () => {
    // Implementar navegação para próxima tela
    console.log('Próxima tela');
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Adivinha" />

      {/* Grid de Cartões */}
      <View style={styles.content}>
        <View style={styles.grid}>
          {/* Cartão 1 */}
          <TouchableOpacity style={styles.gameCard}>
            <View style={styles.iconContainer}>
              <Zap size={24} color={COLORS.BLUE} />
              <Lightbulb size={24} color={COLORS.BLUE} />
            </View>
            <Text style={styles.gameText}>maçã</Text>
          </TouchableOpacity>

          {/* Cartão 2 */}
          <TouchableOpacity style={styles.gameCard}>
            <View style={styles.iconContainer}>
              <Zap size={24} color={COLORS.BLUE} />
              <Lightbulb size={24} color={COLORS.BLUE} />
            </View>
            <Text style={styles.gameText}>maçã</Text>
          </TouchableOpacity>

          {/* Cartão 3 */}
          <TouchableOpacity style={styles.gameCard}>
            <View style={styles.iconContainer}>
              <Zap size={24} color={COLORS.BLUE} />
              <Lightbulb size={24} color={COLORS.BLUE} />
            </View>
            <Text style={styles.gameText}>maçã</Text>
          </TouchableOpacity>

          {/* Cartão 4 */}
          <TouchableOpacity style={styles.gameCard}>
            <View style={styles.iconContainer}>
              <Zap size={24} color={COLORS.BLUE} />
              <Lightbulb size={24} color={COLORS.BLUE} />
            </View>
            <Text style={styles.gameText}>maçã</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    padding: 16,
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  gameCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
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
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  gameText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
});
