/**
 * Serviço para envio do formulário de usabilidade
 */

import { GOOGLE_FORM_USABILIDADE_URL, USABILIDADE_FORM_FIELDS, UsabilidadeFormData, UsabilidadeFormResponse } from '@/config/usabilidadeFormConfig'

/**
 * Envia dados do formulário para o Google Forms
 * @param formData - Dados do formulário
 * @returns Promise<UsabilidadeFormResponse>
 */
export async function submitUsabilidadeForm(formData: UsabilidadeFormData): Promise<UsabilidadeFormResponse> {
  try {
    console.log('🚀 Enviando formulário de usabilidade:', formData)

    // Validação de URL
    if (!GOOGLE_FORM_USABILIDADE_URL) {
      throw new Error('URL do Google Forms não configurada')
    }

    // Preparar dados para envio
    const formBody = new URLSearchParams()
    formBody.append(USABILIDADE_FORM_FIELDS.nome, formData.nome || '')
    formBody.append(USABILIDADE_FORM_FIELDS.email, formData.email || '')
    formBody.append(USABILIDADE_FORM_FIELDS.usoFrequencia, formData.usoFrequencia || '')
    formBody.append(USABILIDADE_FORM_FIELDS.sistemaComplexo, formData.sistemaComplexo || '')
    formBody.append(USABILIDADE_FORM_FIELDS.facilidadeUso, formData.facilidadeUso || '')
    formBody.append(USABILIDADE_FORM_FIELDS.necessidadeSuporte, formData.necessidadeSuporte || '')
    formBody.append(USABILIDADE_FORM_FIELDS.funcionalidadesIntegradas, formData.funcionalidadesIntegradas || '')
    formBody.append(USABILIDADE_FORM_FIELDS.inconsistenciaInterface, formData.inconsistenciaInterface || '')
    formBody.append(USABILIDADE_FORM_FIELDS.aprendizadoRapido, formData.aprendizadoRapido || '')
    formBody.append(USABILIDADE_FORM_FIELDS.sistemaConfuso, formData.sistemaConfuso || '')
    formBody.append(USABILIDADE_FORM_FIELDS.confiancaUso, formData.confiancaUso || '')
    formBody.append(USABILIDADE_FORM_FIELDS.necessidadesAntes, formData.necessidadesAntes || '')
    formBody.append(USABILIDADE_FORM_FIELDS.sugestoes, formData.sugestoes || '')

    console.log('📡 Enviando para Google Forms:', {
      url: GOOGLE_FORM_USABILIDADE_URL,
      fields: USABILIDADE_FORM_FIELDS,
      data: formData
    })

    // Envio para Google Forms
    await fetch(GOOGLE_FORM_USABILIDADE_URL, {
      method: 'POST',
      body: formBody,
      mode: 'no-cors', // CRÍTICO: Google Forms requer no-cors
    })

    console.log('✅ Formulário enviado com sucesso para Google Forms')
    console.log('✅ Dados enviados:', formData)

    return {
      success: true,
      message: 'Questionário enviado com sucesso! Obrigado pela sua participação.'
    }

  } catch (error) {
    console.error('❌ Erro ao enviar formulário:', error)
    throw new Error('Erro ao enviar questionário. Tente novamente.')
  }
}

/**
 * Valida os dados do formulário
 * @param formData - Dados do formulário
 * @returns boolean
 */
export function validateUsabilidadeFormData(formData: UsabilidadeFormData): boolean {
  // Campos obrigatórios
  const requiredFields = [
    formData.nome,
    formData.email,
    formData.usoFrequencia,
    formData.sistemaComplexo,
    formData.facilidadeUso,
    formData.necessidadeSuporte,
    formData.funcionalidadesIntegradas,
    formData.inconsistenciaInterface,
    formData.aprendizadoRapido,
    formData.sistemaConfuso,
    formData.confiancaUso,
    formData.necessidadesAntes,
  ]

  return requiredFields.every(field => field && field !== '')
}

/**
 * Formata os dados do formulário para envio
 * @param formData - Dados do formulário
 * @returns UsabilidadeFormData
 */
export function formatUsabilidadeFormData(formData: UsabilidadeFormData): UsabilidadeFormData {
  return {
    nome: formData.nome,
    email: formData.email,
    usoFrequencia: formData.usoFrequencia,
    sistemaComplexo: formData.sistemaComplexo,
    facilidadeUso: formData.facilidadeUso,
    necessidadeSuporte: formData.necessidadeSuporte,
    funcionalidadesIntegradas: formData.funcionalidadesIntegradas,
    inconsistenciaInterface: formData.inconsistenciaInterface,
    aprendizadoRapido: formData.aprendizadoRapido,
    sistemaConfuso: formData.sistemaConfuso,
    confiancaUso: formData.confiancaUso,
    necessidadesAntes: formData.necessidadesAntes,
    sugestoes: formData.sugestoes || '',
  }
}

