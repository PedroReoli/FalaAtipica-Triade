import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const books = [
  { id: '1', title: 'Desenvolvimento da Linguagem', author: 'Maria Silva', icon: '📚' },
  { id: '2', title: 'Fonoaudiologia Infantil', author: 'João Santos', icon: '📖' },
  { id: '3', title: 'Técnicas de Estimulação', author: 'Ana Costa', icon: '📘' },
];

const instagramPages = [
  { id: '1', title: '@falaatipica', description: 'Dicas diárias', icon: '📱' },
  { id: '2', title: '@fonoinfantil', description: 'Especialistas', icon: '👨‍⚕️' },
  { id: '3', title: '@desenvolvimentoinfantil', description: 'Educação', icon: '🎓' },
];

export const TipsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBookPress = (bookId: string) => {
    // TODO: Implementar ação do livro
    console.log('Livro selecionado:', bookId);
  };

  const handleInstagramPress = (pageId: string) => {
    // TODO: Implementar ação do Instagram
    console.log('Instagram selecionado:', pageId);
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="Dicas" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Recursos Educativos</Text>
        <Text style={styles.subtitle}>
          Livros, páginas do Instagram e dicas para melhorar seu trabalho.
        </Text>

        {/* Seção de Livros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Livros Recomendados</Text>
          <View style={styles.booksList}>
            {books.map((book) => (
              <TouchableOpacity
                key={book.id}
                style={styles.bookCard}
                onPress={() => handleBookPress(book.id)}
              >
                <Text style={styles.bookIcon}>{book.icon}</Text>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Seção do Instagram */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📱 Páginas do Instagram</Text>
          <View style={styles.instagramList}>
            {instagramPages.map((page) => (
              <TouchableOpacity
                key={page.id}
                style={styles.instagramCard}
                onPress={() => handleInstagramPress(page.id)}
              >
                <Text style={styles.instagramIcon}>{page.icon}</Text>
                <View style={styles.instagramInfo}>
                  <Text style={styles.instagramTitle}>{page.title}</Text>
                  <Text style={styles.instagramDescription}>{page.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lembrete */}
        <View style={styles.reminderSection}>
          <Text style={styles.reminderTitle}>💡 Lembrete</Text>
          <Text style={styles.reminderText}>
            Cada criança tem seu próprio ritmo de desenvolvimento. 
            Seja paciente e mantenha a consistência nas atividades.
          </Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  booksList: {
    gap: 12,
  },
  bookCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: COLORS.GREEN,
  },
  instagramList: {
    gap: 12,
  },
  instagramCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  instagramInfo: {
    flex: 1,
  },
  instagramTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  instagramDescription: {
    fontSize: 14,
    color: COLORS.BLUE,
  },
  reminderSection: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  reminderText: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
  },
});
