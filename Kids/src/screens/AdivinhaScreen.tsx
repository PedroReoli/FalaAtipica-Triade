import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type AdivinhaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Adivinha'>;

// Mockup de dados para o jogo
const adivinhaData = {
  categorias: [
    {
      id: "animais",
      nome: "Animais",
      itens: [
        {
          id: "cachorro",
          nome: "Cachorro",
          sombra: "sombra_cachorro.png",
          imagem: "cachorro.png",
          alternativas: [
            { id: "cachorro", nome: "Cachorro", imagem: "cachorro.png", correta: true },
            { id: "gato", nome: "Gato", imagem: "gato.png", correta: false },
            { id: "cavalo", nome: "Cavalo", imagem: "cavalo.png", correta: false },
            { id: "vaca", nome: "Vaca", imagem: "vaca.png", correta: false },
            { id: "porco", nome: "Porco", imagem: "porco.png", correta: false },
            { id: "galinha", nome: "Galinha", imagem: "galinha.png", correta: false },
            { id: "pato", nome: "Pato", imagem: "pato.png", correta: false },
            { id: "coelho", nome: "Coelho", imagem: "coelho.png", correta: false }
          ]
        }
      ]
    }
  ]
};

export const AdivinhaScreen: React.FC = () => {
  const navigation = useNavigation<AdivinhaScreenNavigationProp>();
  const [currentItem, setCurrentItem] = useState(adivinhaData.categorias[0].itens[0]);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleAlternativePress = (alternativeId: string) => {
    setSelectedAlternative(alternativeId);
    setShowResult(true);
    
    // Reset após 2 segundos
    setTimeout(() => {
      setSelectedAlternative(null);
      setShowResult(false);
    }, 2000);
  };

  const isCorrectAnswer = (alternativeId: string) => {
    return currentItem.alternativas.find(alt => alt.id === alternativeId)?.correta;
  };

  const getAlternativeStyle = (alternativeId: string) => {
    if (!showResult) return styles.alternativeCard;
    
    const isCorrect = isCorrectAnswer(alternativeId);
    const isSelected = selectedAlternative === alternativeId;
    
    if (isSelected && isCorrect) {
      return [styles.alternativeCard, styles.correctAnswer];
    } else if (isSelected && !isCorrect) {
      return [styles.alternativeCard, styles.wrongAnswer];
    } else if (isCorrect) {
      return [styles.alternativeCard, styles.correctAnswer];
    }
    
    return styles.alternativeCard;
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Adivinha" />

      <View style={styles.gameContainer}>
        {/* Área do Jogo - Sombra */}
        <View style={styles.shadowArea}>
          <View style={styles.shadowPlaceholder}>
            <Image size={100} color={COLORS.BLUE} />
            <Text style={styles.shadowText}>Área da Sombra</Text>
            <Text style={styles.shadowSubtext}>Você fará as sombras aqui</Text>
          </View>
        </View>

        {/* Área de Alternativas */}
        <View style={styles.alternativesArea}>
          <View style={styles.alternativesGrid}>
            {currentItem.alternativas.slice(0, 6).map((alternative) => (
              <TouchableOpacity
                key={alternative.id}
                style={getAlternativeStyle(alternative.id)}
                onPress={() => handleAlternativePress(alternative.id)}
                disabled={showResult}
              >
                <View style={styles.alternativeImage}>
                  <Image size={50} color={COLORS.BLUE} />
                </View>
                <Text style={styles.alternativeText}>{alternative.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <BottomNavigation 
        onHome={handleHome}
        homeActive={false}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_WHITE,
  },
  gameContainer: {
    flex: 1,
    padding: 16,
  },
  
  // Área da Sombra
  shadowArea: {
    height: 280,
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    marginBottom: 6,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  shadowText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  shadowSubtext: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    opacity: 0.7,
  },
  
  // Área de Alternativas
  alternativesArea: {
    flex: 1,
  },
  alternativesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 4,
  },
  alternativeCard: {
    width: (width - 40) / 3, // 3 colunas - mais largos
    aspectRatio: 0.85, // Mais "gordinho"
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    gap: 12,
    marginBottom: 4,
  },
  alternativeImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.BACKGROUND_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BLUE,
  },
  alternativeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  correctAnswer: {
    backgroundColor: COLORS.GREEN,
    borderWidth: 3,
    borderColor: COLORS.GREEN,
  },
  wrongAnswer: {
    backgroundColor: COLORS.RED,
    borderWidth: 3,
    borderColor: COLORS.RED,
  },
});
