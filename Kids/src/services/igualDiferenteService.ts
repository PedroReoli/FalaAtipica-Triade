import igualDiferenteData from '../../mockup-data/igual-diferente.json';

// ⚠️ NOVA LÓGICA: Comparar objetos SEMELHANTES (objeto.png vs objeto2.png)
// Padrão de nomenclatura: sempre "objeto.png" e "objeto2.png"

// ⏳ TEMPORÁRIO: Imagens comentadas até serem geradas
// Descomente após gerar todas as 21 imagens em Kids/src/assets/images/igual-diferente/

const IMAGES = {
  // // Nível 1 - Diferenças Grandes
  // 'flor.png': require('../assets/images/igual-diferente/flor.png'),
  // 'flor2.png': require('../assets/images/igual-diferente/flor2.png'),
  // 'casa.png': require('../assets/images/igual-diferente/casa.png'),
  // 'casa2.png': require('../assets/images/igual-diferente/casa2.png'),
  // 'carro.png': require('../assets/images/igual-diferente/carro.png'),
  // 'carro2.png': require('../assets/images/igual-diferente/carro2.png'),
  // 'cachorro.png': require('../assets/images/igual-diferente/cachorro.png'),
  
  // // Nível 2 - Diferenças Médias
  // 'arvore.png': require('../assets/images/igual-diferente/arvore.png'),
  // 'arvore2.png': require('../assets/images/igual-diferente/arvore2.png'),
  // 'bicicleta.png': require('../assets/images/igual-diferente/bicicleta.png'),
  // 'bicicleta2.png': require('../assets/images/igual-diferente/bicicleta2.png'),
  // 'passaro.png': require('../assets/images/igual-diferente/passaro.png'),
  // 'passaro2.png': require('../assets/images/igual-diferente/passaro2.png'),
  // 'bola.png': require('../assets/images/igual-diferente/bola.png'),
  
  // // Nível 3 - Diferenças Sutis
  // 'borboleta.png': require('../assets/images/igual-diferente/borboleta.png'),
  // 'borboleta2.png': require('../assets/images/igual-diferente/borboleta2.png'),
  // 'estrela.png': require('../assets/images/igual-diferente/estrela.png'),
  // 'estrela2.png': require('../assets/images/igual-diferente/estrela2.png'),
  // 'gato.png': require('../assets/images/igual-diferente/gato.png'),
  // 'gato2.png': require('../assets/images/igual-diferente/gato2.png'),
  // 'livro.png': require('../assets/images/igual-diferente/livro.png'),
};

export interface ParIgualDiferente {
  id: string;
  item1: {
    imagem: any; // ImageSourcePropType (require)
  };
  item2: {
    imagem: any; // ImageSourcePropType (require)
  };
  resposta: 'igual' | 'diferente';
  dificuldade: 1 | 2 | 3;
  descricao: string;
}

export interface NivelJogo {
  nome: string;
  descricao: string;
  pares: ParIgualDiferente[];
}

class IgualDiferenteService {
  private niveis: Record<string, NivelJogo>;
  private config: any;

  constructor() {
    this.niveis = {
      nivel1: igualDiferenteData.jogos.nivel1,
      nivel2: igualDiferenteData.jogos.nivel2,
      nivel3: igualDiferenteData.jogos.nivel3,
    };
    this.config = igualDiferenteData.configuracoes;
  }

  getNivel(nivel: 1 | 2 | 3): NivelJogo {
    const nivelData = this.niveis[`nivel${nivel}`];
    
    // Mapear imagens
    return {
      ...nivelData,
      pares: nivelData.pares.map(par => ({
        ...par,
        item1: {
          imagem: this.getImageSource(par.item1.imagem)
        },
        item2: {
          imagem: this.getImageSource(par.item2.imagem)
        }
      }))
    };
  }

  getParesEmbaralhados(nivel: 1 | 2 | 3): ParIgualDiferente[] {
    const nivelData = this.getNivel(nivel);
    const pares = [...nivelData.pares];
    
    // Embaralhar (Fisher-Yates)
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    
    return pares;
  }

  getParesMisturados(quantidade: number = 12): ParIgualDiferente[] {
    // Mistura pares de todos os níveis
    const todosOsPares: any[] = [
      ...this.niveis.nivel1.pares,
      ...this.niveis.nivel2.pares,
      ...this.niveis.nivel3.pares,
    ];

    // Mapear imagens
    const paresMapeados = todosOsPares.map(par => ({
      ...par,
      item1: {
        imagem: this.getImageSource(par.item1.imagem)
      },
      item2: {
        imagem: this.getImageSource(par.item2.imagem)
      }
    }));

    // Embaralhar (Fisher-Yates)
    for (let i = paresMapeados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paresMapeados[i], paresMapeados[j]] = [paresMapeados[j], paresMapeados[i]];
    }

    return paresMapeados.slice(0, quantidade) as ParIgualDiferente[];
  }

  private getImageSource(imageName: string): any {
    return IMAGES[imageName as keyof typeof IMAGES] || null;
  }

  getConfig() {
    return this.config;
  }
}

export const igualDiferenteService = new IgualDiferenteService();
