import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { 
  FileImage, 
  BarChart3, 
  HelpCircle, 
  Lightbulb, 
  User
} from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleNavigateToFeature = (feature: keyof RootStackParamList) => {
    if (feature === 'ChildProfile') {
      navigation.navigate('ChildProfile', { childId: '1' });
    } else {
      navigation.navigate(feature);
    }
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleProfiles = () => {
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Profile Area */}
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <User size={20} color={COLORS.TEXT_WHITE} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Olá</Text>
            <Text style={styles.userName}>[NOME]</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Funcionalidades Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          <View style={styles.functionalitiesGrid}>
            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('ImagesAndSounds')}
            >
              <View style={styles.cardIcon}>
                <FileImage size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Imagens e sons</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Progress')}
            >
              <View style={styles.cardIcon}>
                <BarChart3 size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Progresso</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Support')}
            >
              <View style={styles.cardIcon}>
                <HelpCircle size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Suporte</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.functionalityCard}
              onPress={() => handleNavigateToFeature('Tips')}
            >
              <View style={styles.cardIcon}>
                <Lightbulb size={24} color={COLORS.BLUE} />
              </View>
              <Text style={styles.cardText}>Dicas</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Crianças Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crianças</Text>
          <View style={styles.childrenList}>
            <TouchableOpacity 
              style={styles.childCard}
              onPress={() => handleNavigateToFeature('ChildProfile')}
            >
              <View style={styles.childImage}>
                <User size={20} color={COLORS.TEXT_WHITE} />
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>[Nome Criança 01]</Text>
                <Text style={styles.childDescription}>[NEUROATIPICIDADE]</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.childCard}
              onPress={() => handleNavigateToFeature('ChildProfile')}
            >
              <View style={styles.childImage}>
                <User size={20} color={COLORS.TEXT_WHITE} />
              </View>
              <View style={styles.childInfo}>
                <Text style={styles.childName}>[Nome Criança 02]</Text>
                <Text style={styles.childDescription}>[NEUROATIPICIDADE]</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer 
        activeTab="home"
        onHomePress={handleHome}
        onProfilesPress={handleProfiles}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.BACKGROUND_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userName: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 16,
  },
  functionalitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  functionalityCard: {
    width: '48%',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  childrenList: {
    gap: 12,
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  childImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  childDescription: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    opacity: 0.7,
  },
});
