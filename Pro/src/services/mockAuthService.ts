import type { ProfessionalType } from '../types';

export interface MockUser {
  email: string;
  password: string;
  name: string;
  type: ProfessionalType;
  license: string;
  specialty: string;
}

// Usuários mockados para teste
export const mockUsers: MockUser[] = [
  // Fonoaudiólogo
  {
    email: 'fono@teste.com',
    password: '123456',
    name: 'Dra. Maria Silva',
    type: 'fonoaudiologo',
    license: 'CRFa 12345',
    specialty: 'Fonoaudiologia Infantil'
  },
  // Psicólogo
  {
    email: 'psico@teste.com',
    password: '123456',
    name: 'Dr. João Santos',
    type: 'psicologo',
    license: 'CRP 67890',
    specialty: 'Psicologia Infantil'
  },
  // Psiquiatra
  {
    email: 'psiqui@teste.com',
    password: '123456',
    name: 'Dra. Ana Costa',
    type: 'psiquiatra',
    license: 'CRM 54321',
    specialty: 'Psiquiatria Infantil'
  },
  // Pedagogo
  {
    email: 'pedagogo@teste.com',
    password: '123456',
    name: 'Prof. Maria Santos',
    type: 'pedagogo',
    license: 'CREF 12345',
    specialty: 'Pedagogia Infantil'
  },
  // Psicopedagogo
  {
    email: 'psicopedagogo@teste.com',
    password: '123456',
    name: 'Dra. Ana Costa',
    type: 'psicopedagogo',
    license: 'CRP 67890',
    specialty: 'Psicopedagogia Clínica'
  }
];

export interface AuthResponse {
  success: boolean;
  user?: MockUser;
  message?: string;
}

export const mockAuthService = {
  // Simular login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Simular token de autenticação
      localStorage.setItem('mockToken', 'mock-jwt-token');
      localStorage.setItem('mockUser', JSON.stringify(user));
      
      return {
        success: true,
        user
      };
    }
    
    return {
      success: false,
      message: 'Email ou senha incorretos'
    };
  },

  // Verificar se está logado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('mockToken');
  },

  // Obter usuário atual
  getCurrentUser: (): MockUser | null => {
    const userStr = localStorage.getItem('mockUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('mockToken');
    localStorage.removeItem('mockUser');
  },

  // Obter credenciais de teste
  getTestCredentials: (): MockUser[] => {
    return mockUsers;
  }
};
