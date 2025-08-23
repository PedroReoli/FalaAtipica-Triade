# API - FalaAtípica

## Visão Geral
Este documento descreve a estrutura da API e integrações do sistema FalaAtípica.

## Fases de Desenvolvimento

### Fase 1-3: MOCAP (Dados Mockados)
Durante as primeiras fases, todas as aplicações consomem dados de arquivos JSON mockados localizados em `MOCAP/`.

### Fase 4: Supabase (Backend Real)
Na fase final, os dados mockados serão substituídos por um backend real usando Supabase.

## Estrutura MOCAP

### MOCAP/KIDS/
```
MOCAP/KIDS/
├── categories.json      # Categorias de jogos
├── items.json          # Itens/jogos por categoria
├── progress.json       # Progresso das crianças
├── profiles.json       # Perfis das crianças
├── games.json          # Dados dos jogos
└── achievements.json   # Conquistas
```

### MOCAP/TUTORS/
```
MOCAP/TUTORS/
├── children.json       # Lista de crianças
├── progress.json       # Progresso detalhado
├── reports.json        # Relatórios básicos
├── tips.json          # Dicas para profissionais
├── support.json       # Dados de suporte
└── profiles.json      # Perfis dos tutores
```

### MOCAP/PRO/
```
MOCAP/PRO/
├── sessions.json       # Dados de sessões
├── reports.json        # Relatórios avançados
├── analytics.json      # Dados analíticos
├── settings.json       # Configurações
└── profiles.json       # Perfis dos profissionais
```

## Esquemas de Dados

### Criança (Child)
```json
{
  "id": "string",
  "name": "string",
  "age": "number",
  "responsible": "string",
  "contact": "string",
  "tutorId": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### Categoria (Category)
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "icon": "string",
  "color": "string",
  "difficulty": "number",
  "items": ["string"]
}
```

### Item/Jogo (Item)
```json
{
  "id": "string",
  "categoryId": "string",
  "name": "string",
  "description": "string",
  "type": "string",
  "content": "object",
  "difficulty": "number",
  "estimatedTime": "number"
}
```

### Progresso (Progress)
```json
{
  "id": "string",
  "childId": "string",
  "itemId": "string",
  "categoryId": "string",
  "score": "number",
  "completed": "boolean",
  "timeSpent": "number",
  "attempts": "number",
  "completedAt": "date"
}
```

### Conquista (Achievement)
```json
{
  "id": "string",
  "childId": "string",
  "type": "string",
  "title": "string",
  "description": "string",
  "icon": "string",
  "unlockedAt": "date"
}
```

## Pontos de Integração

### KIDS App
```typescript
// Pontos onde MOCAP será substituído por Supabase
interface KidsDataService {
  // Categorias
  getCategories(): Promise<Category[]>;
  
  // Itens por categoria
  getItemsByCategory(categoryId: string): Promise<Item[]>;
  
  // Progresso
  getChildProgress(childId: string): Promise<Progress[]>;
  saveProgress(progress: Progress): Promise<void>;
  
  // Conquistas
  getChildAchievements(childId: string): Promise<Achievement[]>;
  unlockAchievement(childId: string, achievementId: string): Promise<void>;
}
```

### TUTORS App
```typescript
// Pontos onde MOCAP será substituído por Supabase
interface TutorsDataService {
  // Crianças
  getChildrenByTutor(tutorId: string): Promise<Child[]>;
  getChildDetails(childId: string): Promise<Child>;
  
  // Progresso
  getChildrenProgress(tutorId: string): Promise<Progress[]>;
  getChildProgress(childId: string): Promise<Progress[]>;
  
  // Relatórios
  generateBasicReport(childId: string): Promise<Report>;
  
  // Dicas e Suporte
  getTips(): Promise<Tip[]>;
  getSupportInfo(): Promise<SupportInfo>;
}
```

### PRO App
```typescript
// Pontos onde MOCAP será substituído por Supabase
interface ProDataService {
  // Sessões
  getSessions(): Promise<Session[]>;
  createSession(session: Session): Promise<void>;
  
  // Relatórios Avançados
  generateAdvancedReport(filters: ReportFilters): Promise<AdvancedReport>;
  exportReport(reportId: string, format: string): Promise<Blob>;
  
  // Analytics
  getAnalytics(filters: AnalyticsFilters): Promise<Analytics>;
  
  // Configurações
  getSettings(): Promise<Settings>;
  updateSettings(settings: Settings): Promise<void>;
}
```

## Migração para Supabase

### Estrutura do Banco
```sql
-- Tabelas principais
CREATE TABLE children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  age INTEGER NOT NULL,
  responsible VARCHAR NOT NULL,
  contact VARCHAR NOT NULL,
  tutor_id UUID REFERENCES tutors(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR,
  color VARCHAR,
  difficulty INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name VARCHAR NOT NULL,
  description TEXT,
  type VARCHAR NOT NULL,
  content JSONB,
  difficulty INTEGER DEFAULT 1,
  estimated_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES children(id),
  item_id UUID REFERENCES items(id),
  category_id UUID REFERENCES categories(id),
  score INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  time_spent INTEGER,
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Autenticação
```typescript
// Supabase Auth
interface AuthService {
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, userData: any): Promise<User>;
  signOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
```

### Real-time Updates
```typescript
// Supabase Realtime
interface RealtimeService {
  subscribeToProgress(childId: string, callback: (progress: Progress) => void): void;
  subscribeToAchievements(childId: string, callback: (achievement: Achievement) => void): void;
  unsubscribe(channel: string): void;
}
```

## Segurança

### Controle de Acesso
- **KIDS**: Acesso apenas aos próprios dados
- **TUTORS**: Acesso aos dados das crianças que acompanham
- **PRO**: Acesso completo ao sistema

### Validação de Dados
- Validação de entrada em todas as APIs
- Sanitização de dados
- Rate limiting
- CORS configurado adequadamente

## Performance

### Otimizações
- Cache de dados frequentes
- Paginação para listas grandes
- Compressão de respostas
- CDN para assets estáticos

### Monitoramento
- Logs de erro
- Métricas de performance
- Alertas de downtime
- Análise de uso

## Documentação Swagger

### Quando Implementar
- **Fase 4**: Implementar Swagger para documentação completa da API
- **Fases 1-3**: Documentação básica em markdown

### Estrutura Swagger
```yaml
openapi: 3.0.0
info:
  title: FalaAtípica API
  version: 1.0.0
  description: API para sistema de auxílio para crianças com atraso de fala

paths:
  /children:
    get:
      summary: Lista crianças
      security:
        - bearerAuth: []
    post:
      summary: Cria nova criança
      
  /progress:
    get:
      summary: Obtém progresso
    post:
      summary: Salva progresso
```

## Testes de API

### Estratégia de Testes
- **Unit Tests**: Para funções de negócio
- **Integration Tests**: Para endpoints da API
- **E2E Tests**: Para fluxos completos

### Ferramentas
- Jest para testes unitários
- Supertest para testes de API
- Cypress para testes E2E
