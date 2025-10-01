import { BrowserRouter as Router } from 'react-router-dom';
import { ProfessionalProvider } from './contexts/ProfessionalContext';
import { AppRoutes } from './Routes';

/**
 * 🚀 APLICAÇÃO FALAATÍPICA
 * 
 * Este é o componente principal da aplicação que:
 * - Configura o roteador (BrowserRouter)
 * - Fornece o contexto profissional
 * - Importa as rotas centralizadas
 * 
 * 📋 ESTRUTURA:
 * ├── ProfessionalProvider (Contexto global)
 * ├── Router (Roteamento)
 * └── AppRoutes (Rotas centralizadas)
 * 
 * 🎯 BENEFÍCIOS:
 * - Código mais limpo e organizado
 * - Rotas centralizadas em arquivo separado
 * - Fácil manutenção e adição de novas rotas
 * - Documentação integrada
 */

function App() {
  return (
    <ProfessionalProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ProfessionalProvider>
  );
}

export default App;
