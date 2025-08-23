# Imagens das Categorias - KIDS

## Como Adicionar Imagens das Categorias

### Estrutura Atual
Atualmente, as categorias usam um círculo azul simples como placeholder:
```tsx
<View style={styles.categoryIcon} />
```

### Como Substituir por Imagens

1. **Adicionar as imagens nesta pasta:**
   ```
   src/assets/images/
   ├── categoria-agua.png
   ├── categoria-suco.png
   ├── categoria-maca.png
   ├── categoria-banana.png
   ├── categoria-pao.png
   └── categoria-arroz.png
   ```

2. **Atualizar o CategoriesScreen.tsx:**
   ```tsx
   // Importar as imagens
   import aguaImage from '../assets/images/categoria-agua.png';
   import sucoImage from '../assets/images/categoria-suco.png';
   // ... outras imagens

   // Atualizar o array de categorias
   const categories: Category[] = [
     { id: 'agua', name: 'água', image: aguaImage },
     { id: 'suco', name: 'suco', image: sucoImage },
     // ... outras categorias
   ];

   // Substituir o View por Image
   <Image
     source={category.image}
     style={styles.categoryIcon}
     resizeMode="contain"
   />
   ```

### Especificações das Imagens

- **Formato**: PNG com fundo transparente
- **Tamanho**: 64x64px (2x para retina)
- **Estilo**: Simples e colorido
- **Cores**: Compatível com a paleta do app

### Categorias Disponíveis

- `agua` - água
- `suco` - suco
- `maca` - maçã
- `banana` - banana
- `pao` - pão (tem badge de completado)
- `arroz` - arroz

### Exemplo de Uso Final

```tsx
interface Category {
  id: string;
  name: string;
  image: any; // Tipo da imagem
  completed?: boolean;
}

// No render:
<Image
  source={category.image}
  style={styles.categoryIcon}
  resizeMode="contain"
/>
```

### Estilo Atual (Placeholder)

```tsx
categoryIcon: {
  width: 32,
  height: 32,
  borderRadius: 16,
  backgroundColor: COLORS.BLUE,
  // Placeholder para futuras imagens
},
```

### Estilo Final (Com Imagens)

```tsx
categoryIcon: {
  width: 32,
  height: 32,
  // borderRadius removido para imagens quadradas
  // backgroundColor removido
},
```
