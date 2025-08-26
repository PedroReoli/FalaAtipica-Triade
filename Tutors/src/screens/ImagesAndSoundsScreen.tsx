import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Apple, Dog, Shirt, Toy, Running, Users, Star, Utensils, Heart, Baby, Activity } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const categories = [
  { id: '1', title: 'Comidas', icon: Utensils, color: COLORS.BLUE },
  { id: '2', title: 'Animais', icon: Dog, color: COLORS.GREEN },
  { id: '3', title: 'Roupas', icon: Shirt, color: COLORS.RED },
  { id: '4', title: 'Brinquedos', icon: Baby, color: COLORS.YELLOW },
  { id: '5', title: 'Ações', icon: Activity, color: COLORS.BLUE },
  { id: '6', title: 'Família', icon: Heart, color: COLORS.GREEN },
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Imagens e Sons"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Grid de Categorias */}
        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderColor: category.color }]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <IconComponent size={32} color={category.color} />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botão Premium */}
        <View style={styles.premiumSection}>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={handlePremiumPress}
          >
            <Star size={32} color={COLORS.TEXT_BLACK} />
            <Text style={styles.premiumTitle}>Versão Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Acesse conteúdo exclusivo e recursos avançados
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={() => {}}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
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
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    marginTop: 12,
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
  premiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 8,
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    lineHeight: 20,
  },
});
