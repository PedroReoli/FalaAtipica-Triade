/**
 * Configuração do Google Forms - FalaAtípica Usabilidade
 */

// URL do Google Forms (trocar /viewform por /formResponse)
export const GOOGLE_FORM_USABILIDADE_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_USABILIDADE_URL ||
  "https://docs.google.com/forms/d/e/1FAIpQLSeQ0YwO0daNgjZWLm-tEve-UTMuNa4FIsEUhP7Ux6BEaB0Dpg/formResponse"

// IDs dos campos (obtidos via link pré-preenchido)
export const USABILIDADE_FORM_FIELDS = {
  nome: process.env.NEXT_PUBLIC_FORM_FIELD_NOME_USABILIDADE || "entry.1245248587",
  email: process.env.NEXT_PUBLIC_FORM_FIELD_EMAIL_USABILIDADE || "entry.1723971493",
  usoFrequencia: process.env.NEXT_PUBLIC_FORM_FIELD_USO_FREQUENCIA || "entry.508234028",
  sistemaComplexo: process.env.NEXT_PUBLIC_FORM_FIELD_COMPLEXO || "entry.616211886",
  facilidadeUso: process.env.NEXT_PUBLIC_FORM_FIELD_FACILIDADE || "entry.1260689762",
  necessidadeSuporte: process.env.NEXT_PUBLIC_FORM_FIELD_SUPORTE || "entry.1275239774",
  funcionalidadesIntegradas: process.env.NEXT_PUBLIC_FORM_FIELD_INTEGRADAS || "entry.1998707057",
  inconsistenciaInterface: process.env.NEXT_PUBLIC_FORM_FIELD_INCONSISTENCIA || "entry.1034891723",
  aprendizadoRapido: process.env.NEXT_PUBLIC_FORM_FIELD_APRENDIZADO || "entry.1718919016",
  sistemaConfuso: process.env.NEXT_PUBLIC_FORM_FIELD_CONFUSO || "entry.1210236858",
  confiancaUso: process.env.NEXT_PUBLIC_FORM_FIELD_CONFIANCA || "entry.666499506",
  necessidadesAntes: process.env.NEXT_PUBLIC_FORM_FIELD_NECESSIDADES || "entry.458616619",
  sugestoes: process.env.NEXT_PUBLIC_FORM_FIELD_SUGESTOES_USABILIDADE || "entry.280737376",
}

// Interface para os dados do formulário
export interface UsabilidadeFormData {
  nome: string
  email: string
  usoFrequencia: string
  sistemaComplexo: string
  facilidadeUso: string
  necessidadeSuporte: string
  funcionalidadesIntegradas: string
  inconsistenciaInterface: string
  aprendizadoRapido: string
  sistemaConfuso: string
  confiancaUso: string
  necessidadesAntes: string
  sugestoes: string
}

// Interface para resposta do formulário
export interface UsabilidadeFormResponse {
  success: boolean
  message: string
}

