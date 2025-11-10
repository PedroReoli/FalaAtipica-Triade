/**
 * Configuração do Google Forms - FalaAtípica Parcerias
 * Baseado na documentação técnica fornecida
 */

// URL do Google Forms (trocar /viewform por /formResponse)
export const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || 
  "https://docs.google.com/forms/d/e/1FAIpQLScFAaA4nSu-3sgfVpiPeubZXcsRnUa7upch6uuFs7QE22ORQA/formResponse";

// IDs dos campos (obtidos via link pré-preenchido)
export const FORM_FIELDS = {
  nomeEmpresa: process.env.NEXT_PUBLIC_FORM_FIELD_NOME_EMPRESA || "entry.176801527",
  email: process.env.NEXT_PUBLIC_FORM_FIELD_EMAIL || "entry.1213378608",
  endereco: process.env.NEXT_PUBLIC_FORM_FIELD_ENDERECO || "entry.1975365640",
  telefone: process.env.NEXT_PUBLIC_FORM_FIELD_TELEFONE || "entry.1131483063",
  doQueGostou: process.env.NEXT_PUBLIC_FORM_FIELD_DO_QUE_GOSTOU || "entry.844015958",
  sugestoes: process.env.NEXT_PUBLIC_FORM_FIELD_SUGESTOES || "entry.834064701",
  motivoParceria: process.env.NEXT_PUBLIC_FORM_FIELD_MOTIVO_PARCERIA || "entry.762848011"
};

// Interface para os dados do formulário
export interface FormData {
  nomeEmpresa: string;
  email: string;
  endereco: string;
  telefone: string;
  doQueGostou: string;
  sugestoes: string;
  motivoParceria: string;
}

// Interface para resposta do formulário
export interface FormResponse {
  success: boolean;
  message: string;
}
