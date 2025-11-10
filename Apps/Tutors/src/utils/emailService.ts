import { Linking, Alert } from 'react-native';

const SUPPORT_EMAIL = 'pedrosousa2160@gmail.com';

interface EmailOptions {
  subject: string;
  body: string;
}

export const emailService = {
  /**
   * Envia email para suporte
   * @param subject - Assunto do email
   * @param body - Corpo do email
   */
  sendSupportEmail: async (subject: string, body: string): Promise<boolean> => {
    try {
      const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
        return true;
      } else {
        Alert.alert(
          'Erro ao abrir email',
          `Por favor, envie um email manualmente para: ${SUPPORT_EMAIL}\n\nAssunto: ${subject}`,
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      Alert.alert(
        'Erro',
        `Não foi possível abrir o cliente de email. Por favor, envie manualmente para: ${SUPPORT_EMAIL}`,
        [{ text: 'OK' }]
      );
      return false;
    }
  },

  /**
   * Solicita mudança de senha
   */
  requestPasswordChange: async (userName: string, userEmail: string) => {
    const subject = 'Solicitação de Mudança de Senha - FalaAtípica Tutors';
    const body = `Olá equipe FalaAtípica,

Solicito a mudança de senha para minha conta.

Dados da conta:
- Nome: ${userName}
- Email: ${userEmail}

Por favor, me enviem as instruções para redefinir minha senha.

Atenciosamente,
${userName}`;

    return await emailService.sendSupportEmail(subject, body);
  },

  /**
   * Solicita upgrade para premium
   */
  requestPremiumUpgrade: async (userName: string, userEmail: string) => {
    const subject = 'Solicitação de Upgrade para Premium - FalaAtípica Tutors';
    const body = `Olá equipe FalaAtípica,

Gostaria de fazer upgrade para o plano Premium.

Dados da conta:
- Nome: ${userName}
- Email: ${userEmail}

Por favor, me enviem as instruções de pagamento e ativação.

Atenciosamente,
${userName}`;

    return await emailService.sendSupportEmail(subject, body);
  },

  /**
   * Solicita exclusão de perfil de criança
   */
  requestChildDeletion: async (userName: string, userEmail: string, childName: string, childId: string) => {
    const subject = 'Solicitação de Exclusão de Perfil - FalaAtípica Tutors';
    const body = `Olá equipe FalaAtípica,

Solicito a exclusão do perfil da criança abaixo.

Dados da conta do responsável:
- Nome: ${userName}
- Email: ${userEmail}

Dados da criança:
- Nome: ${childName}
- ID: ${childId}

Por favor, processem esta solicitação de exclusão.

Atenciosamente,
${userName}`;

    return await emailService.sendSupportEmail(subject, body);
  },
};

