import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { InternalLayout } from './layouts/InternalLayout';
import LoginPage from './pages/LoginPage';
import RequestAccessPage from './pages/RequestAccessPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { AppsManagementPage } from './pages/AppsManagementPage';
import { NewSessionPage } from './pages/NewSessionPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { ReportsPage } from './pages/ReportsPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { FullCalendarPage } from './pages/FullCalendarPage';
import { DetailedReportsPage } from './pages/DetailedReportsPage';
import { ProfessionalProvider } from './contexts/ProfessionalContext';

function App() {
  return (
    <ProfessionalProvider>
      <Router>
        <Routes>
          {/* Rota raiz - redireciona para login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Layout raiz */}
          <Route element={<RootLayout />}>
            {/* Páginas públicas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/request-access" element={<RequestAccessPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Layout interno (com navbar) */}
            <Route element={<InternalLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/apps" element={<AppsManagementPage />} />
              
              {/* Rotas de Sessões */}
              <Route path="/sessions/new" element={<NewSessionPage />} />
              
              {/* Rotas de Avaliações */}
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/assessments/new" element={<div className="p-8 text-center">Nova Avaliação - Em desenvolvimento</div>} />
              <Route path="/assessments/:id" element={<div className="p-8 text-center">Detalhes da Avaliação - Em desenvolvimento</div>} />
              
                                 {/* Rotas de Relatórios */}
                   <Route path="/reports" element={<ReportsPage />} />
                   <Route path="/reports/detailed" element={<DetailedReportsPage />} />
                   <Route path="/reports/generate" element={<div className="p-8 text-center">Gerar Relatório - Em desenvolvimento</div>} />
                   <Route path="/reports/:id" element={<div className="p-8 text-center">Visualizar Relatório - Em desenvolvimento</div>} />

                   {/* Rotas de Calendário */}
                   <Route path="/full-calendar" element={<FullCalendarPage />} />
              
              {/* Rotas de Medicações (Psiquiatras) */}
              <Route path="/medications" element={<MedicationsPage />} />
              <Route path="/medications/new" element={<div className="p-8 text-center">Nova Prescrição - Em desenvolvimento</div>} />
              <Route path="/medications/:id" element={<div className="p-8 text-center">Editar Medicação - Em desenvolvimento</div>} />
              
              {/* Rotas de Prescrições (Psiquiatras) */}
              <Route path="/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/prescriptions/new" element={<div className="p-8 text-center">Nova Prescrição - Em desenvolvimento</div>} />
              <Route path="/prescriptions/:id" element={<div className="p-8 text-center">Visualizar Prescrição - Em desenvolvimento</div>} />
              
              {/* Rotas placeholder para outras páginas */}
              <Route path="/patients" element={<div className="p-8 text-center">Página de Pacientes - Em desenvolvimento</div>} />
              <Route path="/sessions" element={<div className="p-8 text-center">Página de Sessões - Em desenvolvimento</div>} />
              <Route path="/settings" element={<div className="p-8 text-center">Página de Configurações - Em desenvolvimento</div>} />
              <Route path="/contact" element={<div className="p-8 text-center">Página de Contato - Em desenvolvimento</div>} />
              <Route path="/profile" element={<div className="p-8 text-center">Página de Perfil - Em desenvolvimento</div>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ProfessionalProvider>
  );
}

export default App;
