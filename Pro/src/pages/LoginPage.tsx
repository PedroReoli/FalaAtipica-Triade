import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Info, CheckCircle, X } from 'lucide-react';
import { FillButton, ToastContainer } from '../components/common';
import { mockAuthService, mockUsers } from '../services/mockAuthService';
import { useProfessional } from '../contexts/ProfessionalContext';
import { useToast } from '../hooks/useToast';
import { API_BASE_URL } from '../config/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentUser, setProfessionalType } = useProfessional();
  const { toasts, removeToast, success, error: showError, warning } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.email || !formData.password) {
      warning('Por favor, preencha todos os campos');
      return;
    }

    if (!formData.email.includes('@')) {
      showError('Email inválido');
      return;
    }

    if (formData.password.length < 6) {
      showError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    setIsLoading(true);

    try {
      // ✅ TENTAR LOGIN VIA API PRIMEIRO
      try {
        console.log('🔍 [LOGIN] Tentando API:', `${API_BASE_URL}/auth/login`);
        const apiResponse = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            senha: formData.password,
            appType: 'pro'
          }),
          signal: AbortSignal.timeout(3000) // 3 segundos timeout
        });

        if (apiResponse.ok) {
          const result = await apiResponse.json();
          
          if (result.success && result.data.user) {
            // Login via API bem-sucedido
            console.log('✅ [LOGIN] API OK:', result.data.user.nome);
            
            // Converter para formato do Pro
            const user = {
              email: result.data.user.email,
              password: formData.password,
              name: result.data.user.nome,
              type: result.data.user.tipo || 'fonoaudiologo',
              license: result.data.user.licenca || '',
              specialty: result.data.user.especialidade || ''
            };
            
            success(`Bem-vindo(a), ${user.name}!`, true);
            setCurrentUser(user);
            setProfessionalType(user.type);
            
            setTimeout(() => {
              navigate('/dashboard');
            }, 2200);
            
            setIsLoading(false);
            return;
          }
        }
      } catch (apiError) {
        console.log('⚠️ [LOGIN] API erro - usando local');
      }

      // ✅ FALLBACK: LOGIN LOCAL (mockAuthService)
      const response = await mockAuthService.login(formData.email, formData.password);
      
      if (response.success && response.user) {
        console.log('✅ [LOGIN] Local OK:', response.user.name);
        success(`Bem-vindo(a), ${response.user.name}!`, true);
        setCurrentUser(response.user);
        setProfessionalType(response.user.type);
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2200);
      } else {
        showError(response.message || 'Email ou senha incorretos');
      }
    } catch (err) {
      showError('Erro ao conectar com o servidor. Tente novamente.');
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

  const handleQuickLogin = (email: string, password: string) => {
    setFormData({ email, password, rememberMe: false });
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      {/* Botão Credenciais de Teste - Canto Superior Direito */}
      <button
        onClick={() => setShowCredentialsModal(true)}
        className="fixed top-4 right-4 z-50 p-3 bg-white border-2 border-blue-500 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
        title="Ver credenciais de teste"
      >
        <Info className="w-5 h-5 text-blue-600" />
        <span className="absolute -bottom-8 right-0 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Credenciais de teste
        </span>
      </button>

      {/* Modal de Credenciais */}
      {showCredentialsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowCredentialsModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
              <button
                onClick={() => setShowCredentialsModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Info className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Credenciais de Teste</h2>
                  <p className="text-blue-100 text-sm mt-1">
                    Clique em uma conta para preencher automaticamente
                  </p>
                </div>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockUsers.map((user, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => {
                      handleQuickLogin(user.email, user.password);
                      setShowCredentialsModal(false);
                    }}
                  >
                    {/* Header do Card */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ 
                            backgroundColor: 
                              user.type === 'fonoaudiologo' ? 'var(--green)' :
                              user.type === 'psicologo' ? 'var(--blue)' :
                              user.type === 'psiquiatra' ? 'var(--red)' :
                              user.type === 'pedagogo' ? 'var(--yellow)' :
                              'var(--purple)'
                          }}
                        >
                          {user.type.toUpperCase()}
                        </span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>

                    {/* Informações */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Nome</p>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Email</p>
                        <p className="text-sm text-gray-700 font-mono">{user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Senha</p>
                        <p className="text-sm text-gray-700 font-mono">{user.password}</p>
                      </div>
                    </div>

                    {/* Hover Action */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <p className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity text-center">
                        ✨ Clique para preencher
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer do Modal */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-center text-gray-700">
                  💡 <strong>Dica:</strong> Clique em qualquer conta para preencher o formulário automaticamente
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Lado Esquerdo - Imagem com fundo branco (70%) */}
      <div className="hidden lg:flex lg:w-[70%] bg-white">
        <img 
          src="/assets/login.png" 
          alt="FalaAtípica" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Lado Direito - Formulário com fundo azul (30%) */}
      <div 
        className="w-full lg:w-[30%] flex items-center justify-center p-4 sm:p-6 lg:p-8"
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
