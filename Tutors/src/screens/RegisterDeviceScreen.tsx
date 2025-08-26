import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Smartphone, Plus, Check } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const RegisterDeviceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [deviceName, setDeviceName] = useState('');
  const [deviceCode, setDeviceCode] = useState('');

  const handleRegisterDevice = () => {
    if (!deviceName || !deviceCode) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (deviceCode.length < 6) {
      Alert.alert('Erro', 'O código deve ter pelo menos 6 caracteres');
      return;
    }

    // TODO: Implementar cadastro de dispositivo
    Alert.alert('Sucesso', 'Dispositivo cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleGenerateCode = () => {
    // Gerar código aleatório de 8 caracteres
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setDeviceCode(result);
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
        title="Cadastrar Nova Conta"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Smartphone size={48} color={COLORS.BLUE} />
          <Text style={styles.title}>Cadastrar Novo Aparelho</Text>
          <Text style={styles.subtitle}>
            Adicione um novo dispositivo para acessar a conta.
          </Text>
        </View>

        {/* Nome do Dispositivo */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome do Dispositivo</Text>
          <TextInput
            style={styles.input}
            value={deviceName}
            onChangeText={setDeviceName}
            placeholder="Ex: iPhone da Maria"
            placeholderTextColor="#999"
          />
        </View>

        {/* Código de Acesso */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Código de Acesso</Text>
          <View style={styles.codeContainer}>
            <TextInput
              style={styles.codeInput}
              value={deviceCode}
              onChangeText={setDeviceCode}
              placeholder="Digite ou gere um código"
              placeholderTextColor="#999"
              maxLength={8}
            />
            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerateCode}
            >
              <Plus size={20} color={COLORS.TEXT_WHITE} />
            </TouchableOpacity>
          </View>
          <Text style={styles.codeHint}>
            Use este código para conectar o novo dispositivo
          </Text>
        </View>

        {/* Instruções */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Como usar:</Text>
          <Text style={styles.instructionText}>
            1. Digite um nome para identificar o dispositivo
          </Text>
          <Text style={styles.instructionText}>
            2. Gere ou digite um código de acesso
          </Text>
          <Text style={styles.instructionText}>
            3. Use este código no novo dispositivo para conectar
          </Text>
        </View>

        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegisterDevice}
        >
          <Check size={20} color={COLORS.TEXT_WHITE} />
          <Text style={styles.registerButtonText}>Cadastrar Dispositivo</Text>
        </TouchableOpacity>
      </View>

      <Footer 
        activeTab="profiles"
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
    paddingTop: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    backgroundColor: COLORS.TEXT_WHITE,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    backgroundColor: COLORS.TEXT_WHITE,
    marginRight: 12,
  },
  generateButton: {
    backgroundColor: COLORS.GREEN,
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  instructionsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
    marginBottom: 12,
  },
  instructionText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    marginBottom: 8,
    lineHeight: 20,
  },
  registerButton: {
    backgroundColor: COLORS.BLUE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  registerButtonText: {
    color: COLORS.TEXT_WHITE,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
