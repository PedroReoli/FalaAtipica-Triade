# 🎮 Imagens do Jogo: ADIVINHA

## 📁 Estrutura de Pastas

```
adivinha/
├── sombras/          # Sombras dos objetos
│   ├── cachorro.png
│   ├── gato.png
│   ├── casa.png
│   └── ...
├── objetos/          # Objetos completos (respostas)
│   ├── cachorro.png
│   ├── gato.png
│   ├── casa.png
│   └── ...
└── README.md
```

## 🎯 Propósito

O jogo **Adivinha** mostra uma **sombra** de um objeto e a criança deve escolher qual objeto corresponde à sombra entre várias alternativas.

## 📊 Especificações das Imagens

### **Sombras:**

- **Tamanho**: 200x200px
- **Formato**: PNG com fundo transparente
- **Cor**: Preto (#000000) com 80% de opacidade
- **Estilo**: Silhueta simples e reconhecível

### **Objetos:**

- **Tamanho**: 200x200px
- **Formato**: PNG com fundo transparente
- **Estilo**: Colorido, flat design ou realista
- **Cores**: Vibrantes e atraentes para crianças

## 📝 Lista de Imagens Necessárias

### **Animais:**

- cachorro.png (sombra + objeto)
- gato.png (sombra + objeto)
- cavalo.png (sombra + objeto)
- vaca.png (sombra + objeto)
- porco.png (sombra + objeto)
- galinha.png (sombra + objeto)
- pato.png (sombra + objeto)
- coelho.png (sombra + objeto)

### **Objetos:**

- casa.png (sombra + objeto)
- carro.png (sombra + objeto)
- arvore.png (sombra + objeto)
- bola.png (sombra + objeto)
- livro.png (sombra + objeto)
- mesa.png (sombra + objeto)
- cadeira.png (sombra + objeto)
- telefone.png (sombra + objeto)

## 🎨 Exemplo de Uso

```typescript
// No código:
import sombra from './adivinha/sombras/cachorro.png';
import objeto from './adivinha/objetos/cachorro.png';

<Image source={sombra} style={styles.shadowImage} />
<Image source={objeto} style={styles.objectImage} />
```

## 📋 Checklist

- [ ] Criar subpastas `sombras/` e `objetos/`
- [ ] Gerar 16 pares de imagens (sombra + objeto)
- [ ] Validar tamanhos e formatos
- [ ] Testar no app

---

**Total de Imagens**: 32 (16 sombras + 16 objetos)

