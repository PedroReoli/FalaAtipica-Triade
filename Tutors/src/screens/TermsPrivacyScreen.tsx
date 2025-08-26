import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FileText, Shield, Lock } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { COLORS } from '../constants/colors';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export const TermsPrivacyScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={COLORS.BACKGROUND_WHITE}>
      <Navbar 
        title="Termos e Privacidade"
        onBack={handleBack}
        showBackButton={true}
        showLogo={true}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerSection}>
          <FileText size={64} color={COLORS.BLUE} />
          <Text style={styles.title}>Termos de Uso e Política de Privacidade</Text>
          <Text style={styles.subtitle}>
            Última atualização: Janeiro 2024
          </Text>
        </View>

        {/* Termos de Uso */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color={COLORS.BLUE} />
            <Text style={styles.sectionTitle}>Termos de Uso</Text>
          </View>
          
          <Text style={styles.paragraph}>
            Ao usar o aplicativo FalaAtípica Tutors, você concorda com os seguintes termos:
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>1. Uso do Aplicativo:</Text> O FalaAtípica Tutors é destinado 
            exclusivamente para uso educacional e de desenvolvimento infantil. O uso deve ser 
            responsável e adequado à idade das crianças.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>2. Responsabilidade:</Text> Os pais e responsáveis são 
            responsáveis pelo uso adequado do aplicativo pelas crianças sob sua supervisão.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3. Conteúdo:</Text> Todo o conteúdo educativo é fornecido 
            "como está" e não substitui a orientação profissional de fonoaudiólogos ou outros 
            especialistas.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>4. Modificações:</Text> Reservamo-nos o direito de modificar 
            estes termos a qualquer momento, notificando os usuários sobre mudanças significativas.
          </Text>
        </View>

        {/* Política de Privacidade */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={COLORS.GREEN} />
            <Text style={styles.sectionTitle}>Política de Privacidade</Text>
          </View>

          <Text style={styles.paragraph}>
            Sua privacidade é importante para nós. Esta política descreve como coletamos, 
            usamos e protegemos suas informações:
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>1. Informações Coletadas:</Text> Coletamos apenas informações 
            necessárias para o funcionamento do aplicativo, como dados de perfil das crianças 
            e progresso educacional.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>2. Uso das Informações:</Text> Utilizamos suas informações 
            exclusivamente para fornecer e melhorar nossos serviços educacionais.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>3. Compartilhamento:</Text> Não vendemos, alugamos ou 
            compartilhamos suas informações pessoais com terceiros, exceto quando exigido por lei.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>4. Segurança:</Text> Implementamos medidas de segurança 
            adequadas para proteger suas informações contra acesso não autorizado.
          </Text>
        </View>

        {/* Proteção de Dados */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lock size={24} color={COLORS.RED} />
            <Text style={styles.sectionTitle}>Proteção de Dados</Text>
          </View>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Criptografia:</Text> Todos os dados são criptografados 
            durante a transmissão e armazenamento.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Acesso Limitado:</Text> Apenas funcionários autorizados 
            têm acesso aos dados, e apenas quando necessário.
          </Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Backup Seguro:</Text> Realizamos backups regulares e 
            seguros de todos os dados.
          </Text>
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.paragraph}>
            Se você tiver dúvidas sobre estes termos ou nossa política de privacidade, 
            entre em contato conosco:
          </Text>
          <Text style={styles.contactEmail}>privacidade@falaatipica.com</Text>
        </View>

        {/* Aceitação */}
        <View style={styles.acceptanceSection}>
          <Text style={styles.acceptanceText}>
            Ao continuar usando o aplicativo, você confirma que leu, entendeu e concorda 
            com estes Termos de Uso e Política de Privacidade.
          </Text>
        </View>
      </ScrollView>

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
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_BLACK,
    marginLeft: 12,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.TEXT_BLACK,
    lineHeight: 24,
    marginBottom: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  contactEmail: {
    fontSize: 16,
    color: COLORS.BLUE,
    fontWeight: '600',
    marginTop: 8,
  },
  acceptanceSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  acceptanceText: {
    fontSize: 14,
    color: COLORS.TEXT_BLACK,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
