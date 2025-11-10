import palavrasData from '../../mockup-data/palavras.json';

// ✅ IMAGENS: Todas na pasta palavras/ (SEM subpastas!)
// Usando APENAS imagens que já existem (sem gerar novas)

const IMAGES: Record<string, any> = {
  // Animais (9 imagens)
  'gato.png': require('../assets/images/palavras/gato.png'),
  'pato.png': require('../assets/images/palavras/pato.png'),
  'sapo.png': require('../assets/images/palavras/sapo.png'),
  'urso.png': require('../assets/images/palavras/urso.png'),
  'cavalo.png': require('../assets/images/palavras/cavalo.png'),
  'macaco.png': require('../assets/images/palavras/macaco.png'),
  'cachorro.png': require('../assets/images/palavras/cachorro.png'),
  'coelho.png': require('../assets/images/palavras/coelho.png'),
  'elefante.png': require('../assets/images/palavras/elefante.png'),
  
  // Alimentos (4 imagens)
  'ovo.png': require('../assets/images/palavras/ovo.png'),
  'uva.png': require('../assets/images/palavras/uva.png'),
  'arroz.png': require('../assets/images/palavras/arroz.png'),
  'sorvete.png': require('../assets/images/palavras/sorvete.png'),
  
  // Objetos (3 imagens)
  'mesa.png': require('../assets/images/palavras/mesa.png'),
  'cama.png': require('../assets/images/palavras/cama.png'),
  'sofa.png': require('../assets/images/palavras/sofa.png'),
};

export type TipoJogo = 'silabas' | 'completar' | 'ordenar';

export interface PalavraJogo {
  id: string;
  palavra: string;
  silabas?: string[];
  letras?: string[];
  lacunas?: number[];
  opcoes?: string[];
  imagem: any; // ImageSourcePropType (require)
  imagemNome: string; // Nome original do arquivo
  dificuldade: 1 | 2 | 3;
  tipo: TipoJogo;
}

export interface CategoriaPalavras {
  nome: string;
  cor: string;
  nivel1: PalavraJogo[];
  nivel2: PalavraJogo[];
  nivel3: PalavraJogo[];
}

class PalavrasService {
  private categorias: Record<string, CategoriaPalavras>;
  private config: any;

  constructor() {
    this.categorias = palavrasData.categorias as any;
    this.config = palavrasData.configuracoes;
  }

  getCategoria(categoriaId: string): CategoriaPalavras | undefined {
    const categoria = this.categorias[categoriaId];
    if (!categoria) return undefined;
    
    // Mapear imagens para cada nível
    return {
      ...categoria,
      nivel1: this.mapPalavrasComImagens(categoria.nivel1),
      nivel2: this.mapPalavrasComImagens(categoria.nivel2),
      nivel3: this.mapPalavrasComImagens(categoria.nivel3),
    };
  }

  private mapPalavrasComImagens(palavras: any[]): PalavraJogo[] {
    return palavras.map(palavra => ({
      ...palavra,
      imagemNome: palavra.imagem,
      imagem: this.getImageSource(palavra.imagem),
    }));
  }

  private getImageSource(imageName: string): any {
    return IMAGES[imageName as keyof typeof IMAGES] || null;
  }

  getCategorias(): string[] {
    return Object.keys(this.categorias);
  }

  getPalavrasPorNivel(categoriaId: string, nivel: 1 | 2 | 3): PalavraJogo[] {
    const categoria = this.getCategoria(categoriaId);
    if (!categoria) return [];
    return categoria[`nivel${nivel}`];
  }

  getPalavrasMisturadas(categoriaId: string, quantidade: number = 8): PalavraJogo[] {
    const categoria = this.getCategoria(categoriaId);
    if (!categoria) return [];

    // Pegar de todos os níveis
    const todasPalavras: PalavraJogo[] = [
      ...categoria.nivel1,
      ...categoria.nivel2,
      ...categoria.nivel3,
    ];

    // Embaralhar
    for (let i = todasPalavras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todasPalavras[i], todasPalavras[j]] = [todasPalavras[j], todasPalavras[i]];
    }

    return todasPalavras.slice(0, quantidade);
  }

  embaralharSilabas(silabas: string[]): string[] {
    const embaralhadas = [...silabas];
    for (let i = embaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [embaralhadas[i], embaralhadas[j]] = [embaralhadas[j], embaralhadas[i]];
    }
    return embaralhadas;
  }

  embaralharLetras(letras: string[]): string[] {
    const embaralhadas = [...letras];
    for (let i = embaralhadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [embaralhadas[i], embaralhadas[j]] = [embaralhadas[j], embaralhadas[i]];
    }
    return embaralhadas;
  }

  getPalavraComLacunas(palavra: PalavraJogo): string[] {
    if (palavra.tipo !== 'completar' || !palavra.letras || !palavra.lacunas) {
      return [];
    }

    return palavra.letras.map((letra, index) => {
      if (palavra.lacunas!.includes(index)) {
        return '_';
      }
      return letra;
    });
  }

  getConfig() {
    return this.config;
  }
}

export const palavrasService = new PalavrasService();
