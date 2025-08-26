import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Building, ArrowLeft } from 'lucide-react';
import { FillButton } from '../components/common';

const RequestAccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    institution: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de solicitação de acesso
    console.log('Request access:', formData);
    alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Esquerdo - Vazio */}
      <div className="hidden lg:flex lg:w-1/2 bg-white"></div>

      {/* Lado Direito - Formulário com fundo azul */}
      <div 
        className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8"
        style={{ backgroundColor: 'var(--background-blue)' }}
      >
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Card do Formulário - Estilo similar ao Kids */}
          <div 
            className="bg-white rounded-xl p-6 sm:p-8 shadow-lg relative"
            style={{ 
              border: '3px solid white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Borda azul por fora */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{ 
                border: '3px solid var(--blue)',
                margin: '-3px',
                zIndex: -1
              }}
            ></div>

            {/* Botão Voltar */}
            <button
              onClick={() => navigate('/login')}
              className="flex items-center text-link mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao login
            </button>

            {/* Cabeçalho do Formulário */}
            <div className="text-center mb-4 sm:mb-6">
              {/* Logo e Título */}
              <div className="flex items-center justify-center mb-3">
                <img 
                  src="/assets/logo/falaatipica-logo.png" 
                  alt="FalaAtípica" 
                  className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3"
                />
                <h3 className="text-title-primary">
                  FalaAtípica
                </h3>
              </div>
              
              {/* Slogan */}
              <p className="text-slogan mb-3 sm:mb-4">
                Aprender, expressar e celebrar
              </p>
              
              {/* Subtítulo */}
              <p className="text-subtitle">
                Solicite acesso à plataforma profissional
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Campo Nome */}
              <div>
                <label htmlFor="name" className="block text-form-label mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
              </div>

              {/* Campo Email */}
              <div>
                <label htmlFor="email" className="block text-form-label mb-1">
                  Email Profissional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Campo Profissão */}
              <div>
                <label htmlFor="profession" className="block text-form-label mb-1">
                  Profissão
                </label>
                <select
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="block w-full py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                  required
                >
                  <option value="">Selecione sua profissão</option>
                  <option value="fonoaudiologo">Fonoaudiólogo</option>
                  <option value="psicologo">Psicólogo</option>
                  <option value="psiquiatra">Psiquiatra</option>
                  <option value="pedagogo">Pedagogo</option>
                  <option value="terapeuta">Terapeuta Ocupacional</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              {/* Campo Instituição */}
              <div>
                <label htmlFor="institution" className="block text-form-label mb-1">
                  Instituição
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                  </div>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                    placeholder="Nome da instituição"
                    required
                  />
                </div>
              </div>

              {/* Campo Mensagem */}
              <div>
                <label htmlFor="message" className="block text-form-label mb-1">
                  Mensagem (Opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={2}
                  className="block w-full py-2.5 sm:py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input resize-none"
                  placeholder="Conte-nos um pouco sobre como pretende usar a plataforma..."
                />
              </div>

              {/* Botão de Envio */}
              <FillButton type="submit">
                Enviar Solicitação
              </FillButton>
            </form>

            {/* Informações Adicionais */}
            <div className="mt-3 sm:mt-4 text-center">
              <p className="text-subtitle">
                Analisaremos sua solicitação e entraremos em contato em até 48 horas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAccessPage;
