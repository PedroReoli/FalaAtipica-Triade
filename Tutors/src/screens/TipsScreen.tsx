import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BookOpen, Book, BookMarked, Lightbulb } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const books = [
  { id: '1', title: 'Desenvolvimento da Linguagem', author: 'Maria Silva', icon: BookOpen },
  { id: '2', title: 'Fonoaudiologia Infantil', author: 'João Santos', icon: Book },
  { id: '3', title: 'Técnicas de Estimulação', author: 'Ana Costa', icon: BookMarked },
];

export const TipsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleBookPress = (bookId: string) => {
    // TODO: Implementar ação do livro
    console.log('Livro selecionado:', bookId);
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
        title="Dicas"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Recursos Educativos</Text>

        {/* Seção de Livros */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Livros Recomendados</Text>
          <View style={styles.booksList}>
            {books.map((book) => {
              const IconComponent = book.icon;
              return (
                <TouchableOpacity
                  key={book.id}
                  style={styles.bookCard}
                  onPress={() => handleBookPress(book.id)}
                >
                  <IconComponent size={20} color={COLORS.GREEN} />
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>{book.author}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Lembrete */}
        <View style={styles.reminderSection}>
          <View style={styles.reminderHeader}>
            <Lightbulb size={20} color={COLORS.TEXT_BLACK} />
            <Text style={styles.reminderTitle}>Lembrete</Text>
          </View>
          <Text style={styles.reminderText}>
            Cada criança tem seu próprio ritmo de desenvolvimento. 
            Seja paciente e mantenha a consistência nas atividades.
          </Text>
        </View>
      </View>

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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  booksList: {
    gap: 8,
  },
  bookCard: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.GREEN,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
    color: COLORS.GREEN,
  },
  reminderSection: {
    backgroundColor: COLORS.YELLOW,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginLeft: 8,
  },
  reminderText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    lineHeight: 20,
  },
});
