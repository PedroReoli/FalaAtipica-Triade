import adivinhaData from '../../mockup-data/adivinha.json';

export interface Alternativa {
  id: string;
  nome: string;
  imagem: string;
  correta: boolean;
}

export interface ItemAdivinha {
  id: string;
  nome: string;
  sombra: string;
  imagem: string;
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
    return this.categorias.find(cat => cat.id === id);
  }

  getRandomItem(categoriaId: string): ItemAdivinha | null {
    const categoria = this.getCategoria(categoriaId);
    if (!categoria || categoria.itens.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * categoria.itens.length);
    return categoria.itens[randomIndex];
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

