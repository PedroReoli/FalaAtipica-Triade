import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { FillButton } from '../components/common';
import { mockAuthService, mockUsers } from '../services/mockAuthService';
import { useProfessional } from '../contexts/ProfessionalContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setProfessionalType } = useProfessional();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await mockAuthService.login(formData.email, formData.password);
      
      if (response.success && response.user) {
        setCurrentUser(response.user);
        setProfessionalType(response.user.type);
        navigate('/dashboard');
      } else {
        setError(response.message || 'Erro no login');
      }
    } catch (err) {
      setError('Erro interno do servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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

            {/* Cabeçalho do Formulário - Estilo da Splash Screen */}
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
                Faça login para acessar sua conta
              </p>
            </div>

            {/* Credenciais de Teste */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <button
                onClick={() => setShowCredentials(!showCredentials)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Info className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  {showCredentials ? 'Ocultar' : 'Ver'} credenciais de teste
                </span>
              </button>
              
              {showCredentials && (
                <div className="mt-3 space-y-2">
                  {mockUsers.map((user, index) => (
                    <div key={index} className="text-xs text-gray-700">
                      <strong>{user.type}:</strong> {user.email} / {user.password}
                    </div>
                  ))}
                </div>
              )}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                    placeholder="seu@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Campo Senha */}
              <div>
                <label htmlFor="password" className="block text-form-label mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-form-input"
                    placeholder="Sua senha"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'var(--blue)' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Mensagem de Erro */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Opções */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-option">Lembrar de mim</span>
                </label>
                <button
                  type="button"
                  className="text-link self-start sm:self-auto"
                  onClick={() => navigate('/forgot-password')}
                  disabled={isLoading}
                >
                  Esqueceu a senha?
                </button>
              </div>

              {/* Botão de Login */}
              <FillButton type="submit" disabled={isLoading}>
                {isLoading ? 'Entrando...' : 'Entrar'}
              </FillButton>
            </form>

            {/* Link para Solicitar Acesso */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-option">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/request-access')}
                  className="text-link"
                  disabled={isLoading}
                >
                  Solicitar acesso
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
