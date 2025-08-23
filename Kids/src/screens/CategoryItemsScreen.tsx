import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Check } from 'lucide-react-native';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type CategoryItemsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryItems'>;
type CategoryItemsScreenRouteProp = RouteProp<RootStackParamList, 'CategoryItems'>;

interface CategoryItem {
  id: string;
  name: string;
  color: string;
  completed?: boolean;
}

const getCategoryItems = (categoryId: string): CategoryItem[] => {
  switch (categoryId) {
    case 'comidas':
      return [
        { id: 'arroz', name: 'Arroz', color: COLORS.BLUE },
        { id: 'feijao', name: 'Feijão', color: COLORS.GREEN },
        { id: 'pao', name: 'Pão', color: COLORS.RED },
        { id: 'leite', name: 'Leite', color: COLORS.YELLOW },
        { id: 'banana', name: 'Banana', color: COLORS.BLUE },
        { id: 'maca', name: 'Maçã', color: COLORS.GREEN },
      ];
    case 'objetos':
      return [
        { id: 'copo', name: 'Copo', color: COLORS.BLUE },
        { id: 'garfo', name: 'Garfo', color: COLORS.GREEN },
        { id: 'faca', name: 'Faca', color: COLORS.RED },
        { id: 'prato', name: 'Prato', color: COLORS.YELLOW },
        { id: 'cadeira', name: 'Cadeira', color: COLORS.BLUE },
        { id: 'mesa', name: 'Mesa', color: COLORS.GREEN },
      ];
    case 'animais':
      return [
        { id: 'cachorro', name: 'Cachorro', color: COLORS.BLUE },
        { id: 'gato', name: 'Gato', color: COLORS.GREEN },
        { id: 'passaro', name: 'Pássaro', color: COLORS.RED },
        { id: 'peixe', name: 'Peixe', color: COLORS.YELLOW },
        { id: 'vaca', name: 'Vaca', color: COLORS.BLUE },
        { id: 'galinha', name: 'Galinha', color: COLORS.GREEN },
      ];
    case 'pessoas':
      return [
        { id: 'pai', name: 'Pai', color: COLORS.BLUE },
        { id: 'mae', name: 'Mãe', color: COLORS.GREEN },
        { id: 'avo', name: 'Avô', color: COLORS.RED },
        { id: 'avo2', name: 'Avó', color: COLORS.YELLOW },
        { id: 'tio', name: 'Tio', color: COLORS.BLUE },
        { id: 'tia', name: 'Tia', color: COLORS.GREEN },
      ];
    default:
      return [];
  }
};

const getCategoryTitle = (categoryId: string): string => {
  switch (categoryId) {
    case 'comidas': return 'Comidas';
    case 'objetos': return 'Objetos';
    case 'animais': return 'Animais';
    case 'pessoas': return 'Pessoas';
    default: return 'Categoria';
  }
};

export const CategoryItemsScreen: React.FC = () => {
  const navigation = useNavigation<CategoryItemsScreenNavigationProp>();
  const route = useRoute<CategoryItemsScreenRouteProp>();
  const { categoryId } = route.params;

  const items = getCategoryItems(categoryId);
  const categoryTitle = getCategoryTitle(categoryId);

  const handleSelectItem = (item: string) => {
    console.log('Item selecionado:', item);
    // Aqui você pode implementar a lógica do jogo
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
      <InternalHeader title={categoryTitle} />

      {/* Grid de Itens */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.grid}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.itemCard}
              onPress={() => handleSelectItem(item.id)}
            >
              <View style={styles.iconContainer}>
                <View style={[styles.itemIcon, { backgroundColor: item.color }]} />
                {item.completed && (
                  <View style={styles.completedBadge}>
                    <Check size={12} color={COLORS.TEXT_WHITE} />
                  </View>
                )}
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
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
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  itemCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 12,
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
    minHeight: 90,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
});
