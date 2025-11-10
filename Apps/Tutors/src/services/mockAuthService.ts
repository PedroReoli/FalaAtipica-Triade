import usuariosData from '../../mockup-data/usuarios.json';

export interface MockTutor {
  id: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  relacionamento: string;
  dataCadastro: string;
  ultimoAcesso: string;
  criancasIds: string[];
  profissionalId: string;
  configuracoes: {
    notificacoes: boolean;
    relatoriosAutomaticos: boolean;
    lembretes: boolean;
    idioma: string;
  };
}

export const mockTutors: MockTutor[] = usuariosData.tutores;

class MockAuthService {
  private static instance: MockAuthService;
  private currentUser: MockTutor | null = null;

  private constructor() {
    // Private constructor para singleton
  }

  static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService();
    }
    return MockAuthService.instance;
  }

  login(email: string, senha: string): { success: boolean; user?: MockTutor; message?: string } {
    const user = mockTutors.find(u => u.email === email && u.senha === senha);
    
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

  getCurrentUser(): MockTutor | null {
    // Em produção, buscar do AsyncStorage aqui
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getAllTutors(): MockTutor[] {
    return mockTutors;
  }
}

export const mockAuthService = MockAuthService.getInstance();

