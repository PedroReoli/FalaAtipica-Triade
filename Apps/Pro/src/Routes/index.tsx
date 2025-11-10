import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { InternalLayout } from '../layouts/InternalLayout';

// ========================================
// 📱 PÁGINAS PÚBLICAS (SEM AUTENTICAÇÃO)
// ========================================
import LoginPage from '../pages/LoginPage';
import RequestAccessPage from '../pages/RequestAccessPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

// ========================================
// 🏠 PÁGINAS PRIVADAS (APÓS LOGIN)
// ========================================

// 📊 Dashboard e Apps
import { DashboardPage } from '../pages/DashboardPage';
import { AppsManagementPage } from '../pages/AppsManagementPage';

// 👥 Gestão de Pacientes
import { PatientsPage } from '../pages/PatientsPage';
import { PatientDetailsPage } from '../pages/PatientDetailsPage';
import { NewPatientPage } from '../pages/NewPatientPage';
import { EditPatientPage } from '../pages/EditPatientPage';
import { DeletePatientPage } from '../pages/DeletePatientPage';

// 📅 Gestão de Sessões
import { SessionsPage } from '../pages/SessionsPage';
import { SessionDetailsPage } from '../pages/SessionDetailsPage';
import { EditSessionPage } from '../pages/EditSessionPage';
import { EditSessionReportPage } from '../pages/EditSessionReportPage';
import { SessionNotesPage } from '../pages/SessionNotesPage';
import { NewSessionPage } from '../pages/NewSessionPage';

// 📋 Relatórios
import { ReportsPage } from '../pages/ReportsPage';
import { DetailedReportsPage } from '../pages/DetailedReportsPage';
import { ReportEditPage } from '../pages/ReportEditPage';
import { ReportViewPage } from '../pages/ReportViewPage';

// 🧪 Avaliações
import { AssessmentsPage } from '../pages/AssessmentsPage';

// 💊 Medicações (Psiquiatras)
import { MedicationsPage } from '../pages/MedicationsPage';

// 📋 Prescrições (Psiquiatras)
import { PrescriptionsPage } from '../pages/PrescriptionsPage';

// 📅 Calendário - REMOVIDO (refatoração para grid de cards)

// 👤 Perfil e Configurações
import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';

/**
 * 🚀 ROTAS DA APLICAÇÃO FALAATÍPICA
 * 
 * Este arquivo centraliza todas as rotas da aplicação, organizadas por:
 * - Páginas Públicas (sem autenticação)
 * - Páginas Privadas (após login)
 * 
 * 📋 ESTRUTURA:
 * ├── Públicas (RootLayout)
 * │   ├── /login
 * │   ├── /request-access
 * │   └── /forgot-password
 * └── Privadas (InternalLayout)
 *     ├── Dashboard (/dashboard)
 *     ├── Apps (/apps)
 *     ├── Pacientes (/patients/*)
 *     ├── Sessões (/sessions/*)
 *     ├── Relatórios (/reports/*)
 *     ├── Avaliações (/assessments/*)
 *     ├── Medicações (/medications/*)
 *     ├── Prescrições (/prescriptions/*)
 *     ├── Calendário (/full-calendar)
 *     └── Perfil (/profile, /settings)
 * 
 * 🎯 BENEFÍCIOS:
 * - Organização clara das rotas
 * - Fácil manutenção e adição de novas rotas
 * - Separação lógica entre páginas públicas e privadas
 * - Documentação integrada
 */

export const AppRoutes = () => {
  return (
    <Routes>
      {/* ======================================== */}
      {/* 🏠 ROTA RAIZ - REDIRECIONA PARA LOGIN */}
      {/* ======================================== */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* ======================================== */}
      {/* 📱 PÁGINAS PÚBLICAS (SEM AUTENTICAÇÃO) */}
      {/* ======================================== */}
      <Route element={<RootLayout />}>
        {/* 🔐 Autenticação */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/request-access" element={<RequestAccessPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      
      {/* ======================================== */}
      {/* 🏠 PÁGINAS PRIVADAS (APÓS LOGIN) */}
      {/* ======================================== */}
      <Route element={<InternalLayout />}>
        
        {/* 📊 DASHBOARD E APPS */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/apps" element={<AppsManagementPage />} />
        
        {/* 👥 GESTÃO DE PACIENTES */}
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/new" element={<NewPatientPage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
        <Route path="/patients/:id/edit" element={<EditPatientPage />} />
        <Route path="/patients/:id/delete" element={<DeletePatientPage />} />
        
        {/* 📅 GESTÃO DE SESSÕES */}
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/sessions/new" element={<NewSessionPage />} />
        <Route path="/sessions/:id" element={<SessionDetailsPage />} />
        <Route path="/sessions/:id/edit" element={<EditSessionPage />} />
        <Route path="/sessions/:id/report/edit" element={<EditSessionReportPage />} />
        <Route path="/sessions/:id/notes" element={<SessionNotesPage />} />
        
        {/* 📋 RELATÓRIOS */}
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/detailed" element={<DetailedReportsPage />} />
        <Route path="/reports/edit" element={<ReportEditPage />} />
        <Route path="/reports/:id" element={<ReportViewPage />} />
        <Route path="/reports/:id/edit" element={<ReportEditPage />} />
        
        {/* 🧪 AVALIAÇÕES */}
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/assessments/new" element={<div className="p-8 text-center">Nova Avaliação - Em desenvolvimento</div>} />
        <Route path="/assessments/:id" element={<div className="p-8 text-center">Detalhes da Avaliação - Em desenvolvimento</div>} />
        
        {/* 💊 MEDICAÇÕES (PSIQUIATRAS) */}
        <Route path="/medications" element={<MedicationsPage />} />
        <Route path="/medications/new" element={<div className="p-8 text-center">Nova Prescrição - Em desenvolvimento</div>} />
        <Route path="/medications/:id" element={<div className="p-8 text-center">Editar Medicação - Em desenvolvimento</div>} />
        
        {/* 📋 PRESCRIÇÕES (PSIQUIATRAS) */}
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route path="/prescriptions/new" element={<div className="p-8 text-center">Nova Prescrição - Em desenvolvimento</div>} />
        <Route path="/prescriptions/:id" element={<div className="p-8 text-center">Visualizar Prescrição - Em desenvolvimento</div>} />
        
        {/* 📅 CALENDÁRIO - REMOVIDO (refatoração para grid de cards) */}
        
        {/* 👤 PERFIL E CONFIGURAÇÕES */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* 📞 CONTATO */}
        <Route path="/contact" element={<div className="p-8 text-center">Página de Contato - Em desenvolvimento</div>} />
        
      </Route>
    </Routes>
  );
};

/**
 * 📚 DOCUMENTAÇÃO DAS ROTAS
 * 
 * 🔐 PÁGINAS PÚBLICAS:
 * - /login - Tela de autenticação
 * - /request-access - Solicitação de acesso
 * - /forgot-password - Recuperação de senha
 * 
 * 🏠 PÁGINAS PRIVADAS:
 * 
 * 📊 DASHBOARD E APPS:
 * - /dashboard - Dashboard principal
 * - /apps - Gerenciamento de aplicativos
 * 
 * 👥 GESTÃO DE PACIENTES:
 * - /patients - Lista de pacientes
 * - /patients/new - Novo paciente
 * - /patients/:id - Detalhes do paciente
 * - /patients/:id/edit - Editar paciente
 * 
 * 📅 GESTÃO DE SESSÕES:
 * - /sessions - Lista de sessões
 * - /sessions/new - Nova sessão
 * - /sessions/:id - Detalhes da sessão
 * - /sessions/:id/edit - Editar sessão
 * - /sessions/:id/report/edit - Editar relatório
 * - /sessions/:id/notes - Anotações da sessão
 * 
 * 📋 RELATÓRIOS:
 * - /reports - Lista de relatórios
 * - /reports/detailed - Relatórios detalhados
 * - /reports/generate - Gerar relatório (placeholder)
 * - /reports/:id - Visualizar relatório (placeholder)
 * 
 * 🧪 AVALIAÇÕES:
 * - /assessments - Lista de avaliações
 * - /assessments/new - Nova avaliação (placeholder)
 * - /assessments/:id - Detalhes da avaliação (placeholder)
 * 
 * 💊 MEDICAÇÕES (PSIQUIATRAS):
 * - /medications - Lista de medicações
 * - /medications/new - Nova prescrição (placeholder)
 * - /medications/:id - Editar medicação (placeholder)
 * 
 * 📋 PRESCRIÇÕES (PSIQUIATRAS):
 * - /prescriptions - Lista de prescrições
 * - /prescriptions/new - Nova prescrição (placeholder)
 * - /prescriptions/:id - Visualizar prescrição (placeholder)
 * 
 * 📅 CALENDÁRIO:
 * - /full-calendar - Calendário completo
 * 
 * 👤 PERFIL E CONFIGURAÇÕES:
 * - /profile - Perfil do usuário
 * - /settings - Configurações
 * - /contact - Contato (placeholder)
 * 
 * 🎯 STATUS DAS ROTAS:
 * ✅ Implementadas e funcionais
 * ⏳ Em desenvolvimento
 * ❌ Placeholder (não implementadas)
 */
