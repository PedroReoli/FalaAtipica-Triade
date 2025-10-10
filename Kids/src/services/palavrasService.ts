import palavrasData from '../../mockup-data/palavras.json';

export type TipoJogo = 'silabas' | 'completar' | 'ordenar';

export interface PalavraJogo {
  id: string;
  palavra: string;
  silabas?: string[];
  letras?: string[];
  lacunas?: number[];
  opcoes?: string[];
  imagem: string;
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
    return this.categorias[categoriaId];
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


