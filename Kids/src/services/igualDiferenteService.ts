import igualDiferenteData from '../../mockup-data/igual-diferente.json';

// Importar imagens reutilizadas do Adivinha
const IMAGES_FROM_ADIVINHA = {
  'cachorro.png': require('../assets/images/adivinha/cachorro.png'),
  'gato.png': require('../assets/images/adivinha/gato.png'),
  'bola.png': require('../assets/images/adivinha/bola.png'),
};

// Imagens específicas do Igual-Diferente
const IMAGES_IGUAL_DIFERENTE = {
  'casa.png': require('../assets/images/igual-diferente/casa.png'),
  'bolo_chocolate.png': require('../assets/images/igual-diferente/bolo_chocolate.png'),
  'bolo_morango.png': require('../assets/images/igual-diferente/bolo_morango.png'),
  'arvore_verde.png': require('../assets/images/igual-diferente/arvore-verde.png'), // Arquivo tem hífen
  'cavalo.png': require('../assets/images/igual-diferente/cavalo.png'),
  'flor.png': require('../assets/images/igual-diferente/flor.png'),
  'cadeira_esquerda.png': require('../assets/images/igual-diferente/cadeira_esquerda.png'),
  'cadeira_direita.png': require('../assets/images/igual-diferente/cadeira_direita.png'),
  'bicicleta_vermelha.png': require('../assets/images/igual-diferente/bicicleta_vermelha.png'),
  'elefante.png': require('../assets/images/igual-diferente/elefante.png'),
  'borboleta.png': require('../assets/images/igual-diferente/borboleta.png'),
  'formiga.png': require('../assets/images/igual-diferente/formiga.png'),
};

// Mesclar os dois objetos
const ALL_IMAGES = {
  ...IMAGES_FROM_ADIVINHA,
  ...IMAGES_IGUAL_DIFERENTE,
};

export interface ItemComparacao {
  conteudo: string | any; // string para texto, any (require) para imagem
  tipo: 'texto' | 'imagem';
}

export interface ParIgualDiferente {
  id: string;
  tipo: 'palavra-palavra' | 'imagem-imagem' | 'imagem-palavra';
  item1: ItemComparacao;
  item2: ItemComparacao;
  resposta: 'igual' | 'diferente';
  dificuldade: 1 | 2 | 3;
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
    return this.niveis[`nivel${nivel}`];
  }

  getParesEmbaralhados(nivel: 1 | 2 | 3): ParIgualDiferente[] {
    const nivelData = this.getNivel(nivel);
    const pares: any[] = [...nivelData.pares];
    
    // Mapear imagens para requires
    const paresMapeados = pares.map(par => ({
      ...par,
      item1: this.mapItemWithImage(par.item1),
      item2: this.mapItemWithImage(par.item2),
    }));
    
    // Embaralhar
    for (let i = paresMapeados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paresMapeados[i], paresMapeados[j]] = [paresMapeados[j], paresMapeados[i]];
    }
    
    return paresMapeados as ParIgualDiferente[];
  }

  private mapItemWithImage(item: ItemComparacao): ItemComparacao {
    if (item.tipo === 'imagem') {
      const imageSource = this.getImageSource(item.conteudo);
      return {
        ...item,
        conteudo: imageSource || item.conteudo
      };
    }
    return item;
  }

  private getImageSource(imageName: string): any {
    // Retornar a imagem real (do Adivinha ou Igual-Diferente)
    return ALL_IMAGES[imageName as keyof typeof ALL_IMAGES] || null;
  }

  getParesMisturados(quantidade: number = 12): ParIgualDiferente[] {
    // Mistura pares de todos os níveis
    const todosOsPares: any[] = [
      ...this.niveis.nivel1.pares,
      ...this.niveis.nivel2.pares,
      ...this.niveis.nivel3.pares,
    ];

    // Mapear imagens para requires
    const paresMapeados = todosOsPares.map(par => ({
      ...par,
      item1: this.mapItemWithImage(par.item1),
      item2: this.mapItemWithImage(par.item2),
    }));

    // Embaralhar
    for (let i = paresMapeados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paresMapeados[i], paresMapeados[j]] = [paresMapeados[j], paresMapeados[i]];
    }

    return paresMapeados.slice(0, quantidade) as ParIgualDiferente[];
  }

  getConfig() {
    return this.config;
  }
}

export const igualDiferenteService = new IgualDiferenteService();

