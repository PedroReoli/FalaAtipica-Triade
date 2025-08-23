# MOCAP - Dados Mockados

## Visão Geral
Esta pasta contém todos os dados mockados utilizados pelas aplicações durante as fases 1-3 do desenvolvimento. Na fase 4, estes dados serão substituídos pelo Supabase.

## Estrutura

```
MOCAP/
├── KIDS/                    # Dados para aplicação KIDS
│   ├── categories.json     # Categorias de jogos
│   ├── items.json         # Itens/jogos por categoria
│   ├── progress.json      # Progresso das crianças
│   ├── profiles.json      # Perfis das crianças
│   ├── games.json         # Dados dos jogos
│   └── achievements.json  # Conquistas
├── TUTORS/                 # Dados para aplicação TUTORS
│   ├── children.json      # Lista de crianças
│   ├── progress.json      # Progresso detalhado
│   ├── reports.json       # Relatórios básicos
│   ├── tips.json         # Dicas para profissionais
│   ├── support.json      # Dados de suporte
│   └── profiles.json     # Perfis dos tutores
└── PRO/                   # Dados para aplicação PRO
    ├── sessions.json      # Dados de sessões
    ├── reports.json       # Relatórios avançados
    ├── analytics.json     # Dados analíticos
    ├── settings.json      # Configurações
    └── profiles.json      # Perfis dos profissionais
```

## Convenções

### Nomenclatura
- **Arquivos**: camelCase.json
- **Chaves**: camelCase
- **IDs**: UUIDs ou strings únicas
- **Datas**: ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)

### Estrutura de Dados
- **Arrays**: Para listas de itens
- **Objetos**: Para itens individuais
- **Aninhamento**: Máximo 3 níveis
- **Referências**: Usar IDs para relacionamentos

### Validação
- **Obrigatório**: Campos essenciais marcados
- **Opcional**: Campos que podem ser null/undefined
- **Tipos**: String, Number, Boolean, Object, Array

## Chaves Comuns

### IDs de Referência
- `childId`: Identificador único da criança
- `categoryId`: Identificador da categoria
- `itemId`: Identificador do item/jogo
- `tutorId`: Identificador do tutor
- `sessionId`: Identificador da sessão

### Timestamps
- `createdAt`: Data de criação
- `updatedAt`: Data de atualização
- `completedAt`: Data de conclusão
- `unlockedAt`: Data de desbloqueio

## Exemplos de Uso

### KIDS - Buscar Categorias
```javascript
// KIDS/src/services/mocapService.js
import categoriesData from '../../../MOCAP/KIDS/categories.json';

export const getCategories = () => {
  return Promise.resolve(categoriesData);
};
```

### TUTORS - Buscar Crianças
```javascript
// TUTORS/src/services/mocapService.js
import childrenData from '../../../MOCAP/TUTORS/children.json';

export const getChildrenByTutor = (tutorId) => {
  return Promise.resolve(
    childrenData.filter(child => child.tutorId === tutorId)
  );
};
```

### PRO - Buscar Sessões
```javascript
// PRO/src/services/mocapService.js
import sessionsData from '../../../MOCAP/PRO/sessions.json';

export const getSessions = () => {
  return Promise.resolve(sessionsData);
};
```

## Migração para Supabase

### Pontos de Substituição
```javascript
// Exemplo de ponto de integração
export const getCategories = async () => {
  // Fase 1-3: MOCAP
  if (process.env.REACT_APP_USE_MOCAP === 'true') {
    return Promise.resolve(categoriesData);
  }
  
  // Fase 4: Supabase
  const { data, error } = await supabase
    .from('categories')
    .select('*');
    
  if (error) throw error;
  return data;
};
```

### Estrutura de Migração
1. **Fase 1-3**: Usar dados MOCAP
2. **Fase 4**: Implementar Supabase
3. **Transição**: Manter compatibilidade
4. **Produção**: Remover MOCAP

## Manutenção

### Atualização de Dados
- Manter dados consistentes entre aplicações
- Atualizar IDs de referência
- Validar estrutura JSON
- Documentar mudanças

### Versionamento
- Commitar mudanças no Git
- Tag de versões importantes
- Backup antes de mudanças grandes
- Documentar evolução dos dados

## Troubleshooting

### Problemas Comuns
- **JSON inválido**: Validar sintaxe
- **IDs inconsistentes**: Verificar referências
- **Dados desatualizados**: Sincronizar entre apps
- **Performance**: Otimizar estrutura de dados

### Ferramentas Úteis
- **JSON Validator**: Validar sintaxe
- **JSON Schema**: Definir estrutura
- **JSON Server**: Mock API local
- **Faker.js**: Gerar dados de teste
