import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ProfessionalType } from '../types';
import { mockAuthService, type MockUser } from '../services/mockAuthService';

interface ProfessionalContextType {
  professionalType: ProfessionalType;
  setProfessionalType: (type: ProfessionalType) => void;
  professionalData: any;
  setProfessionalData: (data: any) => void;
  currentUser: MockUser | null;
  setCurrentUser: (user: MockUser | null) => void;
}

const ProfessionalContext = createContext<ProfessionalContextType | undefined>(undefined);

interface ProfessionalProviderProps {
  children: ReactNode;
}

export const ProfessionalProvider: React.FC<ProfessionalProviderProps> = ({ children }) => {
  const [professionalType, setProfessionalType] = useState<ProfessionalType>('fonoaudiologo');
  const [currentUser, setCurrentUser] = useState<MockUser | null>(null);
  const [professionalData, setProfessionalData] = useState({
    id: 'prof_001', // ID padrão
    name: 'Dr. Silva',
    license: 'CRFa 12345',
    specialty: 'Fonoaudiologia Infantil',
    patients: 24,
    sessions: 156,
  });

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const user = mockAuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setProfessionalType(user.type);
      setProfessionalData({
        id: user.id, // Usar ID do usuário logado
        name: user.name,
        license: user.license,
        specialty: user.specialty,
        patients: user.type === 'fonoaudiologo' ? 24 : user.type === 'psicologo' ? 18 : 32,
        sessions: user.type === 'fonoaudiologo' ? 156 : user.type === 'psicologo' ? 89 : 124,
      });
    }
  }, []);

  // Atualizar dados quando o tipo de profissional mudar
  useEffect(() => {
    if (currentUser) {
      const getProfessionalData = (type: ProfessionalType) => {
        switch (type) {
          case 'fonoaudiologo':
            return { patients: 24, sessions: 156 };
          case 'psicologo':
            return { patients: 18, sessions: 89 };
          case 'psiquiatra':
            return { patients: 32, sessions: 124 };
          case 'pedagogo':
            return { patients: 28, sessions: 142 };
          case 'psicopedagogo':
            return { patients: 22, sessions: 98 };
          default:
            return { patients: 18, sessions: 89 };
        }
      };

      const data = getProfessionalData(professionalType);
      setProfessionalData(prev => ({
        ...prev,
        id: currentUser.id, // Garantir que o ID está sempre presente
        name: currentUser.name,
        license: currentUser.license,
        specialty: currentUser.specialty,
        patients: data.patients,
        sessions: data.sessions,
      }));
    }
  }, [professionalType, currentUser]);

  const value = {
    professionalType,
    setProfessionalType,
    professionalData,
    setProfessionalData,
    currentUser,
    setCurrentUser,
  };

  return (
    <ProfessionalContext.Provider value={value}>
      {children}
    </ProfessionalContext.Provider>
  );
};

export const useProfessional = () => {
  const context = useContext(ProfessionalContext);
  if (context === undefined) {
    throw new Error('useProfessional must be used within a ProfessionalProvider');
  }
  return context;
};
