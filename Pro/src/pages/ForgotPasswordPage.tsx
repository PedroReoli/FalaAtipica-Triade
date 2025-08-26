import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { FillButton } from '../components/common';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de recuperação de senha
    console.log('Password reset for:', email);
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
              onClick={handleBackToLogin}
              className="flex items-center text-link mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao login
            </button>

            {!isSubmitted ? (
              <>
                {/* Cabeçalho do Formulário */}
                <div className="text-center mb-6 sm:mb-8">
                  {/* Logo e Título */}
                  <div className="flex items-center justify-center mb-4">
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
                  <p className="text-slogan mb-4 sm:mb-6">
                    Aprender, expressar e celebrar
                  </p>
                  
                  {/* Subtítulo */}
                  <p className="text-subtitle">
                    Recupere sua senha
                  </p>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Campo Email */}
                  <div>
                    <label htmlFor="email" className="block text-form-label mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Instruções */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-subtitle text-blue-800">
                      Digite o email associado à sua conta. Enviaremos um link para redefinir sua senha.
                    </p>
                  </div>

                  {/* Botão de Envio */}
                  <FillButton type="submit">
                    Enviar Link de Recuperação
                  </FillButton>
                </form>
              </>
            ) : (
              <>
                {/* Sucesso */}
                <div className="text-center mb-6 sm:mb-8">
                  {/* Logo e Título */}
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src="/assets/logo/falaatipica-logo.png" 
                      alt="FalaAtípica" 
                      className="h-10 w-10 sm:h-12 sm:w-12 mr-2 sm:mr-3"
                    />
                    <h3 className="text-title-primary">
                      FalaAtípica
                    </h3>
                  </div>
                  
                  {/* Ícone de Sucesso */}
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  
                  {/* Título de Sucesso */}
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Email Enviado!
                  </h4>
                  
                  {/* Mensagem de Sucesso */}
                  <p className="text-slogan mb-4">
                    Verifique sua caixa de entrada
                  </p>
                  
                  <p className="text-subtitle">
                    Enviamos um link de recuperação para <strong>{email}</strong>
                  </p>
                </div>

                {/* Instruções Adicionais */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-subtitle text-green-800">
                    Se não encontrar o email, verifique sua pasta de spam ou lixo eletrônico.
                  </p>
                </div>

                {/* Botão Voltar */}
                <FillButton onClick={handleBackToLogin}>
                  Voltar ao Login
                </FillButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
