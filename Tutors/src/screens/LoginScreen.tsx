import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Mail } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { COLORS } from '../constants/colors';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Login mockado - qualquer email/senha funciona
    navigation.navigate('Dashboard');
  };

  const handleHome = () => {
    navigation.navigate('Splash');
  };

  const handleSupport = () => {
    const email = 'pedrosousa2160@gmail.com';
    const subject = 'Problema no Login - FalaAtípica';
    const body = 'Olá, estou com problemas para fazer login no FalaAtípica.';
    
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl).catch(err => {
      console.error('Erro ao abrir email:', err);
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Login"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="hello@reallygreatsite.com"
            placeholderTextColor={COLORS.TEXT_BLACK}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="******"
            placeholderTextColor={COLORS.TEXT_BLACK}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Card de Suporte */}
        <TouchableOpacity style={styles.supportCard} onPress={handleSupport}>
          <View style={styles.supportIcon}>
            <Mail size={20} color={COLORS.TEXT_WHITE} />
          </View>
          <View style={styles.supportInfo}>
            <Text style={styles.supportTitle}>Problemas com login?</Text>
            <Text style={styles.supportEmail}>Clique aqui para enviar uma mensagem</Text>
          </View>
        </TouchableOpacity>
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 24,
  },

  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
  },
  input: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    borderWidth: 1,
    borderColor: COLORS.BLUE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    gap: 12,
    borderWidth: 3,
    borderColor: COLORS.BLUE,
  },
  supportIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.BACKGROUND_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginBottom: 4,
  },
  supportEmail: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
  },
});
