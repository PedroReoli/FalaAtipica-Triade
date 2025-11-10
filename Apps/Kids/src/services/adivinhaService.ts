import adivinhaData from '../../mockup-data/adivinha.json';

// Importar todas as imagens do jogo Adivinha (7 imagens disponíveis)
const IMAGES = {
  // Animais
  'cachorro.png': require('../assets/images/adivinha/cachorro.png'),
  'gato.png': require('../assets/images/adivinha/gato.png'),
  'passaro.png': require('../assets/images/adivinha/passaro.png'),
  // Frutas
  'banana.png': require('../assets/images/adivinha/banana.png'),
  'maca.png': require('../assets/images/adivinha/maca.png'),
  // Objetos
  'bola.png': require('../assets/images/adivinha/bola.png'),
};

export interface Alternativa {
  id: string;
  nome: string;
  imagem: any; // ImageSourcePropType (require)
  correta: boolean;
}

export interface ItemAdivinha {
  id: string;
  nome: string;
  sombra: string;
  imagem: any; // ImageSourcePropType (require)
  alternativas: Alternativa[];
}

export interface CategoriaAdivinha {
  id: string;
  nome: string;
  itens: ItemAdivinha[];
}

class AdivinhaService {
  private categorias: CategoriaAdivinha[];

  constructor() {
    this.categorias = adivinhaData.categorias;
  }

  getCategorias(): CategoriaAdivinha[] {
    return this.categorias;
  }

  getCategoria(id: string): CategoriaAdivinha | undefined {
    const categoria = this.categorias.find(cat => cat.id === id);
    
    // Mapear imagens para todos os itens da categoria
    if (categoria) {
      return {
        ...categoria,
        itens: categoria.itens.map(item => ({
          ...item,
          imagem: this.getImageSource(item.imagem),
          alternativas: item.alternativas.map(alt => ({
            ...alt,
            imagem: this.getImageSource(alt.imagem)
          }))
        }))
      };
    }
    
    return undefined;
  }

  getRandomItem(categoriaId: string): ItemAdivinha | null {
    const categoria = this.getCategoria(categoriaId);
    if (!categoria || categoria.itens.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * categoria.itens.length);
    const item = categoria.itens[randomIndex];
    
    // Mapear imagem para o require real
    return {
      ...item,
      imagem: this.getImageSource(item.imagem),
      alternativas: item.alternativas.map(alt => ({
        ...alt,
        imagem: this.getImageSource(alt.imagem)
      }))
    };
  }

  private getImageSource(imageName: string): any {
    // Retornar a imagem real ou placeholder
    return IMAGES[imageName as keyof typeof IMAGES] || null;
  }

  getAlternativasEmbaralhadas(item: ItemAdivinha, quantidade: number = 4): Alternativa[] {
    const alternativas = [...item.alternativas];
    
    // Shuffle
    for (let i = alternativas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [alternativas[i], alternativas[j]] = [alternativas[j], alternativas[i]];
    }
    
    // Garantir que a resposta correta está incluída
    const correta = item.alternativas.find(alt => alt.correta);
    const embaralhadas = alternativas.slice(0, quantidade);
    
    if (correta && !embaralhadas.find(alt => alt.correta)) {
      embaralhadas[Math.floor(Math.random() * embaralhadas.length)] = correta;
    }
    
    return embaralhadas;
  }
}

export const adivinhaService = new AdivinhaService();

