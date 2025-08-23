# Assets - FalaAtípica KIDS

## Logo do FalaAtípica

### Como Adicionar a Logo Real

**APENAS UMA LOGO NECESSÁRIA:**

1. **Formato da Logo**: 
   - PNG com fundo transparente
   - SVG (recomendado para melhor qualidade)
   - **Tamanho**: 512x512px (alta resolução)

2. **Localização**:
   ```
   src/assets/images/
   └── falaatipica-logo.png    # ÚNICA LOGO NECESSÁRIA
   ```

3. **Nomenclatura**:
   - `falaatipica-logo.png` (recomendado)
   - Ou qualquer nome que você preferir

### Componente Logo Atual

O componente `Logo.tsx` atualmente usa uma representação visual do cérebro. Para usar a logo real:

1. **Substituir no Logo.tsx**:
   ```tsx
   import { Image } from 'react-native';
   import logoImage from '../assets/images/falaatipica-logo.png';
   
   // Substituir o View do brainIcon por:
   <Image 
     source={logoImage} 
     style={{ width: icon, height: icon }}
     resizeMode="contain"
   />
   ```

### Cores da Logo

A logo deve ser compatível com:
- **Fundo azul** (`#054776`): Logo branca
- **Fundo branco** (`#f4f6ff`): Logo azul (`#1e88e5`)

**OU** uma logo que funciona bem em ambos os fundos.

### Uso nos Componentes

```tsx
// Logo pequena no header
<Logo size="small" showText={false} />

// Logo média com texto
<Logo size="medium" showText={true} />

// Logo grande para splash
<Logo size="large" showText={true} />
```

### Estrutura de Pastas

```
src/assets/
├── images/
│   ├── falaatipica-logo.png    # ÚNICA LOGO
│   ├── icons/                  # Ícones específicos
│   └── backgrounds/            # Imagens de fundo
├── sounds/                     # Sons e áudios
└── fonts/                      # Fontes customizadas
```

### Checklist para Logo

- [ ] Logo em alta resolução (512x512px)
- [ ] Fundo transparente
- [ ] Funciona bem em fundos claros e escuros
- [ ] Teste em diferentes tamanhos (o React Native redimensiona automaticamente)
- [ ] Otimização para mobile (tamanho do arquivo < 100KB)
