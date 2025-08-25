import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { InternalHeader } from '../components/InternalHeader';
import { BottomNavigation } from '../components/BottomNavigation';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    // Já estamos na splash, não faz nada
  };

  return (
    <SafeAreaView style={styles.container}>
      <InternalHeader title="FalaAtípica" />
      
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>FalaAtípica</Text>
          <Text style={styles.subtitle}>Tutores</Text>
        </View>

        {/* Botões */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => navigation.navigate('RequestAccess')}
          >
            <Text style={styles.requestButtonText}>Solicitar Acesso</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavigation 
        onHome={handleHome}
        homeActive={true}
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
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.BLUE,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.GREEN,
    marginTop: 8,
  },
  buttonContainer: {
    gap: 16,
  },
  loginButton: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: '600',
  },
  requestButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    alignItems: 'center',
  },
  requestButtonText: {
    color: COLORS.BLUE,
    fontSize: 16,
    fontWeight: '600',
  },
});
