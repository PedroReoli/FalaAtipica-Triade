import usuariosData from '../../mockup-data/usuarios.json';

export interface MockUser {
  id: string;
  nome: string;
  idade: number;
  email: string;
  senha: string;
  avatar: string;
  responsavel: {
    nome: string;
    parentesco: string;
    telefone: string;
    email: string;
  };
  progresso: {
    pontos: number;
    nivel: number;
    jogosCompletos: number;
  };
}

export const mockUsers: MockUser[] = usuariosData.usuarios;

class MockAuthService {
  private static instance: MockAuthService;
  private currentUser: MockUser | null = null;

  private constructor() {
    // Private constructor para singleton
  }

  static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService();
    }
    return MockAuthService.instance;
  }

  login(email: string, senha: string): { success: boolean; user?: MockUser; message?: string } {
    const user = mockUsers.find(u => u.email === email && u.senha === senha);
    
    if (user) {
      this.currentUser = user;
      // Em produção, salvar no AsyncStorage aqui
      return { success: true, user };
    }
    
    return { success: false, message: 'Email ou senha incorretos' };
  }

  logout() {
    this.currentUser = null;
    // Em produção, limpar AsyncStorage aqui
  }

  getCurrentUser(): MockUser | null {
    // Em produção, buscar do AsyncStorage aqui
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const mockAuthService = MockAuthService.getInstance();

