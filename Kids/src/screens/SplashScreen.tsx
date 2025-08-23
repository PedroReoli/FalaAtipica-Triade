import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Logo } from '../components/Logo';
import { COLORS } from '../constants/colors';
import { RootStackParamList } from '../navigation/AppNavigator';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const handleEnter = () => {
    navigation.navigate('Login');
  };

  const handleRequestAccess = () => {
    navigation.navigate('RequestAccess');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo e Título */}
      <View style={styles.logoSection}>
        <Logo size="large" showText={true} color={COLORS.TEXT_WHITE} />
        <Text style={styles.slogan}>Aprender, expressar e celebrar</Text>
      </View>



      {/* Botões */}
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleEnter}>
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleRequestAccess}>
          <Text style={styles.secondaryButtonText}>Solicitar Acesso</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Entenda mais sobre{' '}
          <Text style={styles.linkText} onPress={handleRequestAccess}>
            "Solicitar Acesso"
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_BLUE,
    justifyContent: 'space-between',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  slogan: {
    fontSize: 16,
    color: COLORS.TEXT_WHITE,
    marginTop: 20,
    textAlign: 'center',
  },

  buttonSection: {
    paddingHorizontal: 32,
    paddingBottom: 60,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
