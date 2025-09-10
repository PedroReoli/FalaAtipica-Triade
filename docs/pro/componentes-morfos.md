# Componentes Morfos - Aplicação PRO

## 🧩 Visão Geral dos Componentes Morfos

Os componentes morfos são elementos reutilizáveis que se adaptam automaticamente ao tipo de profissional, aplicando cores, estilos e funcionalidades específicas de cada especialidade. Eles garantem consistência visual e funcional em toda a aplicação.

## 🎯 Princípios dos Componentes Morfos

### 1. Adaptabilidade
- Componentes se adaptam automaticamente ao tipo de profissional
- Cores e estilos mudam baseados no contexto
- Funcionalidades específicas por especialidade

### 2. Reutilização
- Um componente serve múltiplas especialidades
- Lógica centralizada com variações visuais
- Manutenção simplificada

### 3. Consistência
- Padrões visuais uniformes
- Comportamento previsível
- Identidade visual clara por área

## 🔧 Componentes Morfos Implementados

### 1. ProfessionalCard
**Descrição**: Card adaptativo para informações de profissionais

**Props**:
```typescript
interface ProfessionalCardProps {
  professionalType: ProfessionalType;
  data: {
    name: string;
    specialty: string;
    patients: number;
    sessions: number;
  };
  onClick?: () => void;
}
```

**Adaptações por Profissional**:
- **Fonoaudiólogos**: Borda verde, ícone de fala
- **Psicólogos**: Borda azul, ícone de coração
- **Psiquiatras**: Borda vermelha, ícone de medicamento
- **Pedagogos**: Borda amarela, ícone de livro
- **Psicopedagogos**: Borda roxa, ícone de cérebro

### 2. SessionCard
**Descrição**: Card para sessões com cores e informações específicas

**Props**:
```typescript
interface SessionCardProps {
  professionalType: ProfessionalType;
  session: {
    id: string;
    patient: string;
    date: string;
    duration: number;
    status: 'completed' | 'pending' | 'cancelled';
    type: string;
  };
  onEdit?: () => void;
  onView?: () => void;
}
```

**Adaptações por Profissional**:
- **Fonoaudiólogos**: Verde, foco em articulação e vocabulário
- **Psicólogos**: Azul, foco em desenvolvimento emocional
- **Psiquiatras**: Vermelho, foco em medicação e prescrições
- **Pedagogos**: Amarelo, foco em desenvolvimento educacional
- **Psicopedagogos**: Roxo, foco em dificuldades de aprendizagem

### 3. ReportCard
**Descrição**: Card para relatórios com seções específicas

**Props**:
```typescript
interface ReportCardProps {
  professionalType: ProfessionalType;
  report: {
    id: string;
    title: string;
    patient: string;
    date: string;
    type: string;
    status: 'draft' | 'completed' | 'sent';
  };
  onView?: () => void;
  onEdit?: () => void;
  onSend?: () => void;
}
```

**Adaptações por Profissional**:
- **Fonoaudiólogos**: Relatórios de progresso da fala
- **Psicólogos**: Relatórios de desenvolvimento emocional
- **Psiquiatras**: Relatórios clínicos e de medicação
- **Pedagogos**: Relatórios educacionais
- **Psicopedagogos**: Relatórios de superação de dificuldades

### 4. AlertCard
**Descrição**: Card para alertas e notificações

**Props**:
```typescript
interface AlertCardProps {
  professionalType: ProfessionalType;
  alert: {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    priority: 'low' | 'medium' | 'high';
    date: string;
  };
  onDismiss?: () => void;
  onAction?: () => void;
}
```

**Adaptações por Profissional**:
- **Fonoaudiólogos**: Alertas sobre sessões de fala
- **Psicólogos**: Alertas sobre desenvolvimento emocional
- **Psiquiatras**: Alertas sobre medicação e riscos
- **Pedagogos**: Alertas sobre progresso educacional
- **Psicopedagogos**: Alertas sobre dificuldades de aprendizagem

### 5. DashboardWidget
**Descrição**: Widget adaptativo para dashboards

**Props**:
```typescript
interface DashboardWidgetProps {
  professionalType: ProfessionalType;
  widget: {
    title: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'stable';
    icon: LucideIcon;
  };
  onClick?: () => void;
}
```

**Adaptações por Profissional**:
- **Fonoaudiólogos**: Métricas de articulação, vocabulário, comunicação
- **Psicólogos**: Métricas de autoestima, comportamento, socialização
- **Psiquiatras**: Métricas de prescrições, adesão, evolução clínica
- **Pedagogos**: Métricas de leitura, escrita, matemática, atenção
- **Psicopedagogos**: Métricas de superação, estratégias, habilidades

## 🎨 Sistema de Cores Adaptativo

### Hook de Cores
```typescript
const useProfessionalColors = (professionalType: ProfessionalType) => {
  const colors = {
    fonoaudiologo: {
      primary: '#43a047',
      secondary: '#66bb6a',
      light: '#c8e6c9',
      dark: '#2e7d32'
    },
    psicologo: {
      primary: '#1e88e5',
      secondary: '#42a5f5',
      light: '#bbdefb',
      dark: '#1565c0'
    },
    psiquiatra: {
      primary: '#e53935',
      secondary: '#ef5350',
      light: '#ffcdd2',
      dark: '#c62828'
    },
    pedagogo: {
      primary: '#fbc02d',
      secondary: '#ffeb3b',
      light: '#fff9c4',
      dark: '#f57f17'
    },
    psicopedagogo: {
      primary: '#9c27b0',
      secondary: '#ba68c8',
      light: '#e1bee7',
      dark: '#7b1fa2'
    }
  };

  return colors[professionalType] || colors.psicologo;
};
```

### Componente de Cores
```typescript
const ProfessionalColorProvider: React.FC<{
  professionalType: ProfessionalType;
  children: React.ReactNode;
}> = ({ professionalType, children }) => {
  const colors = useProfessionalColors(professionalType);
  
  return (
    <div style={{ '--professional-color': colors.primary } as React.CSSProperties}>
      {children}
    </div>
  );
};
```

## 🔄 Funcionalidades Adaptativas

### 1. Ações por Profissional
```typescript
const getProfessionalActions = (professionalType: ProfessionalType) => {
  switch (professionalType) {
    case 'fonoaudiologo':
      return [
        { label: 'Nova Sessão', icon: Mic, action: 'new-session' },
        { label: 'Avaliação', icon: FileText, action: 'assessment' },
        { label: 'Relatório', icon: BarChart3, action: 'report' }
      ];
    case 'psicologo':
      return [
        { label: 'Nova Sessão', icon: Heart, action: 'new-session' },
        { label: 'Avaliação', icon: Target, action: 'assessment' },
        { label: 'Relatório', icon: TrendingUp, action: 'report' }
      ];
    case 'psiquiatra':
      return [
        { label: 'Nova Consulta', icon: Stethoscope, action: 'new-consultation' },
        { label: 'Medicação', icon: Pill, action: 'medication' },
        { label: 'Prescrição', icon: FileText, action: 'prescription' }
      ];
    case 'pedagogo':
      return [
        { label: 'Nova Sessão', icon: BookOpen, action: 'new-session' },
        { label: 'Avaliação', icon: GraduationCap, action: 'assessment' },
        { label: 'Relatório', icon: BarChart3, action: 'report' }
      ];
    case 'psicopedagogo':
      return [
        { label: 'Nova Sessão', icon: Brain, action: 'new-session' },
        { label: 'Avaliação', icon: Target, action: 'assessment' },
        { label: 'Relatório', icon: TrendingUp, action: 'report' }
      ];
  }
};
```

### 2. Métricas por Profissional
```typescript
const getProfessionalMetrics = (professionalType: ProfessionalType) => {
  switch (professionalType) {
    case 'fonoaudiologo':
      return [
        { label: 'Pacientes', value: 24, change: '+12%' },
        { label: 'Sessões', value: 156, change: '+8%' },
        { label: 'Progresso', value: '78%', change: '+5%' },
        { label: 'Relatórios', value: 42, change: '+15%' }
      ];
    case 'psicologo':
      return [
        { label: 'Pacientes', value: 18, change: '+8%' },
        { label: 'Sessões', value: 89, change: '+12%' },
        { label: 'Progresso', value: '82%', change: '+7%' },
        { label: 'Avaliações', value: 31, change: '+20%' }
      ];
    case 'psiquiatra':
      return [
        { label: 'Pacientes', value: 32, change: '+15%' },
        { label: 'Consultas', value: 124, change: '+18%' },
        { label: 'Prescrições', value: 67, change: '+22%' },
        { label: 'Relatórios', value: 28, change: '+25%' }
      ];
    case 'pedagogo':
      return [
        { label: 'Alunos', value: 28, change: '+15%' },
        { label: 'Sessões', value: 142, change: '+12%' },
        { label: 'Progresso', value: '85%', change: '+8%' },
        { label: 'Relatórios', value: 38, change: '+20%' }
      ];
    case 'psicopedagogo':
      return [
        { label: 'Pacientes', value: 22, change: '+10%' },
        { label: 'Sessões', value: 98, change: '+8%' },
        { label: 'Progresso', value: '78%', change: '+6%' },
        { label: 'Avaliações', value: 29, change: '+18%' }
      ];
  }
};
```

## 📱 Responsividade dos Componentes

### Breakpoints Adaptativos
```typescript
const useResponsiveLayout = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return screenSize;
};
```

### Layout Adaptativo
```typescript
const AdaptiveLayout: React.FC<{
  professionalType: ProfessionalType;
  children: React.ReactNode;
}> = ({ professionalType, children }) => {
  const screenSize = useResponsiveLayout();
  const colors = useProfessionalColors(professionalType);
  
  const getLayoutClasses = () => {
    switch (screenSize) {
      case 'mobile':
        return 'flex-col space-y-4';
      case 'tablet':
        return 'grid grid-cols-2 gap-4';
      case 'desktop':
        return 'grid grid-cols-3 gap-6';
    }
  };
  
  return (
    <div 
      className={`${getLayoutClasses()}`}
      style={{ '--professional-color': colors.primary } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
```

## 🎯 Implementação de Novos Componentes

### Template Base
```typescript
interface MorphComponentProps {
  professionalType: ProfessionalType;
  data: any;
  onAction?: (action: string, data: any) => void;
  className?: string;
}

const MorphComponent: React.FC<MorphComponentProps> = ({
  professionalType,
  data,
  onAction,
  className = ''
}) => {
  const colors = useProfessionalColors(professionalType);
  const actions = getProfessionalActions(professionalType);
  
  return (
    <div 
      className={`morph-component ${className}`}
      style={{ 
        '--professional-color': colors.primary,
        '--professional-secondary': colors.secondary,
        '--professional-light': colors.light,
        '--professional-dark': colors.dark
      } as React.CSSProperties}
    >
      {/* Conteúdo do componente */}
    </div>
  );
};
```

### Estilos CSS Adaptativos
```css
.morph-component {
  border: 2px solid var(--professional-color);
  background: var(--professional-light);
  color: var(--professional-dark);
}

.morph-component:hover {
  background: var(--professional-color);
  color: white;
}

.morph-component .icon {
  color: var(--professional-color);
}

.morph-component .button {
  background: var(--professional-color);
  color: white;
}

.morph-component .button:hover {
  background: var(--professional-dark);
}
```

## 📋 Checklist de Implementação

### Componentes Base
- [ ] ProfessionalCard
- [ ] SessionCard
- [ ] ReportCard
- [ ] AlertCard
- [ ] DashboardWidget

### Sistema de Cores
- [ ] Hook useProfessionalColors
- [ ] ProfessionalColorProvider
- [ ] Cores por especialidade
- [ ] Variações de cor (primary, secondary, light, dark)

### Funcionalidades Adaptativas
- [ ] Ações por profissional
- [ ] Métricas por profissional
- [ ] Ícones por especialidade
- [ ] Textos específicos

### Responsividade
- [ ] Breakpoints adaptativos
- [ ] Layout responsivo
- [ ] Componentes móveis
- [ ] Testes de responsividade

### Documentação
- [ ] Exemplos de uso
- [ ] Guia de implementação
- [ ] Testes unitários
- [ ] Storybook (opcional)
