import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Check } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type CategoriesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Categories'>;

interface Category {
  id: string;
  name: string;
  color: string;
  completed?: boolean;
}

const categories: Category[] = [
  { id: 'comidas', name: 'Comidas', color: COLORS.BLUE },
  { id: 'objetos', name: 'Objetos', color: COLORS.GREEN },
  { id: 'animais', name: 'Animais', color: COLORS.RED },
  { id: 'pessoas', name: 'Pessoas', color: COLORS.YELLOW },
];

export const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const handleSelectCategory = (category: string) => {
    console.log('Categoria selecionada:', category);
    navigation.navigate('CategoryItems', { categoryId: category });
  };

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
      <InternalHeader title="Categorias" />

      {/* Grid de Categorias */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.grid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleSelectCategory(category.id)}
            >
              <View style={styles.iconContainer}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]} />
                {category.completed && (
                  <View style={styles.completedBadge}>
                    <Check size={12} color={COLORS.TEXT_WHITE} />
                  </View>
                )}
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
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
  },
  contentContainer: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  categoryCard: {
    width: '45%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 16,
    padding: 20,
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
  iconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    // Placeholder para futuras imagens
  },
  completedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.GREEN,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
});
