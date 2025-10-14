import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Linking, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Mail, Lock, Eye, EyeOff, Info, CheckCircle, X } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Navbar } from '../components/Navbar';
import { ToastContainer } from '../components/Toast';
import { COLORS } from '../constants/colors';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { mockAuthService, mockTutors } from '../services/mockAuthService';
import { useToast } from '../hooks/useToast';
import { API_BASE_URL } from '../config/api';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { toasts, removeToast, success, error: showError, warning } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);

  const handleLogin = async () => {
    // Validações
    if (!email || !password) {
      warning('Por favor, preencha todos os campos');
      return;
    }

    if (!email.includes('@')) {
      showError('Email inválido');
      return;
    }

    if (password.length < 6) {
      showError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ TENTAR LOGIN VIA API PRIMEIRO
      console.log('🔍 [LOGIN] Tentando API:', `${API_BASE_URL}/auth/login`);
      const apiResponse = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          senha: password,
          appType: 'tutors'
        }),
        signal: AbortSignal.timeout(3000) // 3 segundos timeout
      });

      if (apiResponse.ok) {
        const result = await apiResponse.json();
        
        if (result.success && result.data.user) {
          // Login via API bem-sucedido
          console.log('✅ [LOGIN] API OK:', result.data.user.nome);
          
          // Salvar usuário no mockAuthService (compatibilidade)
          const user = {
            id: result.data.user.id,
            nome: result.data.user.nome,
            email: result.data.user.email,
            senha: password,
            telefone: result.data.user.telefone || '',
            relacionamento: result.data.user.relacionamento || '',
            dataCadastro: result.data.user.dataCadastro || new Date().toISOString(),
            ultimoAcesso: new Date().toISOString(),
            criancasIds: result.data.user.criancasIds || [],
            profissionalId: result.data.user.profissionalId || '',
            configuracoes: result.data.user.configuracoes || {}
          };
          
          mockAuthService['currentUser'] = user;
          
          success(`Bem-vindo(a), ${user.nome}!`, true);
          
          setTimeout(() => {
            navigation.navigate('Dashboard');
          }, 2200);
          
          setIsLoading(false);
          return;
        }
      }
    } catch (apiError) {
      console.log('⚠️ [LOGIN] API erro - usando local');
    }

    // ✅ FALLBACK: LOGIN LOCAL (mockAuthService)
    setTimeout(() => {
      const response = mockAuthService.login(email, password);
      
      if (response.success && response.user) {
        console.log('✅ [LOGIN] Local OK:', response.user.nome);
        success(`Bem-vindo(a), ${response.user.nome}!`, true);
        
        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 2200);
      } else {
        showError(response.message || 'Email ou senha incorretos');
      }
      
      setIsLoading(false);
    }, 500);
  };

  const handleQuickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setShowCredentialsModal(false);
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
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Botão de Credenciais - Canto Superior Esquerdo */}
      <TouchableOpacity
        style={styles.credentialsButton}
        onPress={() => setShowCredentialsModal(true)}
      >
        <Info size={24} color={COLORS.BLUE} />
      </TouchableOpacity>

      {/* Modal de Credenciais */}
      <Modal
        visible={showCredentialsModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCredentialsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header do Modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}>
                <View style={styles.modalIconContainer}>
                  <Info size={24} color={COLORS.TEXT_WHITE} />
                </View>
                <View>
                  <Text style={styles.modalTitle}>Contas de Teste</Text>
                  <Text style={styles.modalSubtitle}>Clique para preencher</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setShowCredentialsModal(false)}
                style={styles.modalCloseButton}
              >
                <X size={24} color={COLORS.TEXT_WHITE} />
              </TouchableOpacity>
            </View>

            {/* Lista de Usuários */}
            <ScrollView style={styles.modalScroll}>
              <View style={styles.usersGrid}>
                {mockTutors.map((user) => (
                  <TouchableOpacity
                    key={user.id}
                    style={styles.userCard}
                    onPress={() => handleQuickLogin(user.email, user.senha)}
                  >
                    <View style={styles.userHeader}>
                      <Text style={styles.userName}>{user.nome}</Text>
                      <CheckCircle size={16} color={COLORS.GREEN} />
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userLabel}>Email:</Text>
                      <Text style={styles.userValue}>{user.email}</Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userLabel}>Senha:</Text>
                      <Text style={styles.userValue}>{user.senha}</Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userLabel}>Relação:</Text>
                      <Text style={styles.userValue}>{user.relacionamento}</Text>
                    </View>
                    <View style={styles.userFooter}>
                      <Text style={styles.userClickHint}>✨ Toque para preencher</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              
              <View style={styles.modalTip}>
                <Text style={styles.modalTipText}>
                  💡 Toque em qualquer conta para preencher automaticamente
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Navbar 
        title="Login"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        {/* Campo Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <View style={styles.inputContainer}>
            <Mail size={20} color={COLORS.BLUE} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>
        </View>

        {/* Campo Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA</Text>
          <View style={styles.inputContainer}>
            <Lock size={20} color={COLORS.BLUE} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              editable={!isLoading}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? (
                <EyeOff size={20} color={COLORS.BLUE} />
              ) : (
                <Eye size={20} color={COLORS.BLUE} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de Login */}
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Text>
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
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  // Botão de Credenciais
  credentialsButton: {
    position: 'absolute',
    top: 54,
    left: 16,
    zIndex: 100,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.TEXT_WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  
  // Modal de Credenciais
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 20,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    backgroundColor: COLORS.BLUE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_WHITE,
  },
  modalSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  modalCloseButton: {
    padding: 8,
  },
  modalScroll: {
    maxHeight: 500,
  },
  usersGrid: {
    padding: 16,
    gap: 12,
  },
  userCard: {
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 16,
    gap: 8,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  userLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.TEXT_BLACK,
  },
  userValue: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    fontFamily: 'monospace',
  },
  userFooter: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  userClickHint: {
    fontSize: 11,
    color: COLORS.BLUE,
    textAlign: 'center',
    fontWeight: '500',
  },
  modalTip: {
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
  },
  modalTipText: {
    fontSize: 12,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
  },
  
  // Formulário
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.TEXT_WHITE,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.6,
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
