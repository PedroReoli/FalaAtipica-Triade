# 🚀 Rotas da Aplicação FalaAtípica

## 📋 Visão Geral

Este diretório centraliza todas as rotas da aplicação, organizadas de forma lógica e documentada para facilitar a manutenção e desenvolvimento.

## 🏗️ Estrutura

```
src/Routes/
├── index.tsx          # Arquivo principal com todas as rotas
└── README.md          # Esta documentação
```

## 📱 Páginas Públicas (Sem Autenticação)

### 🔐 Autenticação
- **`/login`** - Tela de login
- **`/request-access`** - Solicitação de acesso
- **`/forgot-password`** - Recuperação de senha

## 🏠 Páginas Privadas (Após Login)

### 📊 Dashboard e Apps
- **`/dashboard`** - Dashboard principal
- **`/apps`** - Gerenciamento de aplicativos

### 👥 Gestão de Pacientes
- **`/patients`** - Lista de pacientes
- **`/patients/new`** - Novo paciente
- **`/patients/:id`** - Detalhes do paciente
- **`/patients/:id/edit`** - Editar paciente

### 📅 Gestão de Sessões
- **`/sessions`** - Lista de sessões
- **`/sessions/new`** - Nova sessão
- **`/sessions/:id`** - Detalhes da sessão
- **`/sessions/:id/edit`** - Editar sessão
- **`/sessions/:id/report/edit`** - Editar relatório
- **`/sessions/:id/notes`** - Anotações da sessão

### 📋 Relatórios
- **`/reports`** - Lista de relatórios
- **`/reports/detailed`** - Relatórios detalhados
- **`/reports/generate`** - Gerar relatório (placeholder)
- **`/reports/:id`** - Visualizar relatório (placeholder)

### 🧪 Avaliações
- **`/assessments`** - Lista de avaliações
- **`/assessments/new`** - Nova avaliação (placeholder)
- **`/assessments/:id`** - Detalhes da avaliação (placeholder)

### 💊 Medicações (Psiquiatras)
- **`/medications`** - Lista de medicações
- **`/medications/new`** - Nova prescrição (placeholder)
- **`/medications/:id`** - Editar medicação (placeholder)

### 📋 Prescrições (Psiquiatras)
- **`/prescriptions`** - Lista de prescrições
- **`/prescriptions/new`** - Nova prescrição (placeholder)
- **`/prescriptions/:id`** - Visualizar prescrição (placeholder)

### 📅 Calendário
- **`/full-calendar`** - Calendário completo

### 👤 Perfil e Configurações
- **`/profile`** - Perfil do usuário
- **`/settings`** - Configurações
- **`/contact`** - Contato (placeholder)

## 🎯 Status das Rotas

### ✅ Implementadas e Funcionais
- Todas as rotas de pacientes
- Todas as rotas de sessões
- Dashboard e Apps
- Relatórios básicos
- Perfil e configurações

### ⏳ Em Desenvolvimento
- Relatórios detalhados
- Avaliações completas
- Medicações e prescrições

### ❌ Placeholder (Não Implementadas)
- Geração de relatórios
- Visualização de relatórios
- Nova avaliação
- Detalhes da avaliação
- Nova prescrição
- Editar medicação
- Visualizar prescrição
- Página de contato

## 🔧 Como Adicionar Novas Rotas

1. **Importe o componente** no topo do arquivo `index.tsx`
2. **Adicione a rota** na seção apropriada (pública ou privada)
3. **Documente a rota** na seção de documentação
4. **Atualize este README** se necessário

### Exemplo:
```tsx
// 1. Importar
import { NewPage } from '../pages/NewPage';

// 2. Adicionar rota
<Route path="/new-page" element={<NewPage />} />

// 3. Documentar
/**
 * 📄 Nova Página
 * - /new-page - Descrição da página
 */
```

## 📚 Benefícios da Organização

- **Manutenibilidade**: Fácil localização e edição de rotas
- **Documentação**: Rotas bem documentadas e organizadas
- **Escalabilidade**: Fácil adição de novas rotas
- **Clareza**: Separação lógica entre páginas públicas e privadas
- **Consistência**: Padrão uniforme para todas as rotas

## 🚀 Próximos Passos

1. Implementar rotas placeholder
2. Adicionar middleware de autenticação
3. Implementar lazy loading para otimização
4. Adicionar tratamento de erros 404
5. Implementar breadcrumbs automáticos
