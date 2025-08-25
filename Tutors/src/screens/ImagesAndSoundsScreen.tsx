import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const categories = [
  { id: '1', title: 'Comidas', icon: '🍎', color: COLORS.BLUE },
  { id: '2', title: 'Animais', icon: '🐶', color: COLORS.GREEN },
  { id: '3', title: 'Roupas', icon: '👕', color: COLORS.RED },
  { id: '4', title: 'Brinquedos', icon: '🧸', color: COLORS.YELLOW },
  { id: '5', title: 'Ações', icon: '🏃', color: COLORS.BLUE },
  { id: '6', title: 'Família', icon: '👨‍👩‍👧‍👦', color: COLORS.GREEN },
];

export const ImagesAndSoundsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCategoryPress = (categoryId: string) => {
    // TODO: Implementar navegação para categoria específica
    console.log('Categoria selecionada:', categoryId);
  };

  const handlePremiumPress = () => {
    // TODO: Implementar funcionalidade premium
    console.log('Premium selecionado');
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Imagens e Sons" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Categorias</Text>
        <Text style={styles.subtitle}>
          Selecione uma categoria para acessar imagens e sons educativos.
        </Text>

        {/* Grid de Categorias */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderColor: category.color }]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão Premium */}
        <View style={styles.premiumSection}>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={handlePremiumPress}
          >
            <Text style={styles.premiumIcon}>⭐</Text>
            <Text style={styles.premiumTitle}>Versão Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Acesse conteúdo exclusivo e recursos avançados
            </Text>
          </TouchableOpacity>
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
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    marginBottom: 24,
    lineHeight: 24,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  premiumSection: {
    marginBottom: 24,
  },
  premiumButton: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.BLUE,
  },
  premiumIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    lineHeight: 20,
  },
});
