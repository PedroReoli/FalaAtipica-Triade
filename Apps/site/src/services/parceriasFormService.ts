/**
 * Serviço para envio do formulário de parcerias
 * Baseado na documentação técnica do Google Forms
 */

import { GOOGLE_FORM_URL, FORM_FIELDS, FormData, FormResponse } from '@/config/formConfig';

/**
 * Envia dados do formulário para o Google Forms
 * @param formData - Dados do formulário
 * @returns Promise<FormResponse>
 */
export async function submitParceriasForm(formData: FormData): Promise<FormResponse> {
  try {
    console.log('🚀 Enviando formulário de parcerias:', formData);

    // Validação de URL
    if (!GOOGLE_FORM_URL) {
      throw new Error('URL do Google Forms não configurada');
    }

    // Preparar dados para envio
    const formBody = new URLSearchParams();
    formBody.append(FORM_FIELDS.nomeEmpresa, formData.nomeEmpresa || '');
    formBody.append(FORM_FIELDS.email, formData.email);
    formBody.append(FORM_FIELDS.endereco, formData.endereco || '');
    formBody.append(FORM_FIELDS.telefone, formData.telefone);
    formBody.append(FORM_FIELDS.doQueGostou, formData.doQueGostou);
    formBody.append(FORM_FIELDS.sugestoes, formData.sugestoes || '');
    formBody.append(FORM_FIELDS.motivoParceria, formData.motivoParceria);

    console.log('📡 Enviando para Google Forms:', {
      url: GOOGLE_FORM_URL,
      fields: FORM_FIELDS,
      data: formData
    });

    // Envio para Google Forms
    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      body: formBody,
      mode: 'no-cors', // CRÍTICO: Google Forms requer no-cors
    });

    console.log('✅ Formulário enviado com sucesso para Google Forms');
    console.log('✅ Dados enviados:', formData);

    return {
      success: true,
      message: 'Formulário enviado com sucesso! Entraremos em contato em breve.'
    };

  } catch (error) {
    console.error('❌ Erro ao enviar formulário:', error);
    throw new Error('Erro ao enviar solicitação. Tente novamente ou entre em contato diretamente.');
  }
}

/**
 * Valida os dados do formulário
 * @param formData - Dados do formulário
 * @returns boolean
 */
export function validateFormData(formData: FormData): boolean {
  const requiredFields = ['nomeEmpresa', 'email', 'telefone', 'doQueGostou', 'motivoParceria'];
  
  for (const field of requiredFields) {
    if (!formData[field as keyof FormData]?.trim()) {
      console.error(`❌ Campo obrigatório não preenchido: ${field}`);
      return false;
    }
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    console.error('❌ Email inválido');
    return false;
  }

  console.log('✅ Validação do formulário aprovada');
  return true;
}

/**
 * Formata os dados do formulário para envio
 * @param formData - Dados do formulário
 * @returns FormData formatado
 */
export function formatFormData(formData: FormData): FormData {
  return {
    nomeEmpresa: formData.nomeEmpresa.trim(),
    email: formData.email.trim().toLowerCase(),
    endereco: formData.endereco.trim(),
    telefone: formData.telefone.trim(),
    doQueGostou: formData.doQueGostou.trim(),
    sugestoes: formData.sugestoes.trim(),
    motivoParceria: formData.motivoParceria.trim()
  };
}
