import cenaCertaData from '../../mockup-data/cena-certa.json';

// Importar todas as imagens do Cena Certa (11 imagens)
const IMAGES = {
  // Nível 1 - Relações Espaciais
  'gato_sobre_caixa.png': require('../assets/images/cena-certa/gato_sobre_caixa.png'),
  'cachorro_embaixo_mesa.png': require('../assets/images/cena-certa/cachorro_embaixo_mesa.png'),
  'menino_ao_lado_arvore.png': require('../assets/images/cena-certa/menino_ao_lado_arvore.png'),
  
  // Nível 2 - Ações Simples
  'menina_empurra_carrinho.png': require('../assets/images/cena-certa/menina_empurra_carrinho.png'),
  'menino_chuta_bola.png': require('../assets/images/cena-certa/menino_chuta_bola.png'),
  'cachorro_corre_parque.png': require('../assets/images/cena-certa/cachorro_corre_parque.png'),
  'menina_pula_corda.png': require('../assets/images/cena-certa/menina_pula_corda.png'),
  
  // Nível 3 - Ações com Objeto Indireto
  'menino_da_maca_professora.png': require('../assets/images/cena-certa/menino_da_maca_professora.png'),
  'menina_mostra_desenho_mae.png': require('../assets/images/cena-certa/menina_mostra_desenho_mae.png'),
  'pai_le_livro_crianca.png': require('../assets/images/cena-certa/pai_le_livro_crianca.png'),
  'avo_entrega_presente_neto.png': require('../assets/images/cena-certa/avo_entrega_presente_neto.png'),
};

export interface CenaCerta {
  id: string;
  imagem: any; // ImageSourcePropType (require)
  descricao: string;
  fraseCerta: string;
  frasesErradas: string[];
  dificuldade: 1 | 2 | 3;
  conceito: string;
}

export interface NivelCena {
  nome: string;
  descricao: string;
  itens: CenaCerta[];
}

class CenaCertaService {
  private niveis: Record<string, NivelCena>;
  private config: any;

  constructor() {
    this.niveis = {
      nivel1: cenaCertaData.cenas.nivel1,
      nivel2: cenaCertaData.cenas.nivel2,
      nivel3: cenaCertaData.cenas.nivel3,
    };
    this.config = cenaCertaData.configuracoes;
  }

  getNivel(nivel: 1 | 2 | 3): NivelCena {
    const nivelData = this.niveis[`nivel${nivel}`];
    
    // Mapear imagens
    return {
      ...nivelData,
      itens: nivelData.itens.map(item => ({
        ...item,
        imagem: this.getImageSource(item.imagem)
      }))
    };
  }

  getCenasEmbaralhadas(nivel: 1 | 2 | 3): CenaCerta[] {
    const nivelData = this.getNivel(nivel);
    const cenas = [...nivelData.itens];
    
    // Embaralhar
    for (let i = cenas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cenas[i], cenas[j]] = [cenas[j], cenas[i]];
    }
    
    return cenas;
  }

  getCenasMisturadas(quantidade: number = 12): CenaCerta[] {
    // Mistura cenas de todos os níveis
    const todasAsCenas: any[] = [
      ...this.niveis.nivel1.itens,
      ...this.niveis.nivel2.itens,
      ...this.niveis.nivel3.itens,
    ];

    // Mapear imagens
    const cenasMapeadas = todasAsCenas.map(cena => ({
      ...cena,
      imagem: this.getImageSource(cena.imagem)
    }));

    // Embaralhar
    for (let i = cenasMapeadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cenasMapeadas[i], cenasMapeadas[j]] = [cenasMapeadas[j], cenasMapeadas[i]];
    }

    return cenasMapeadas.slice(0, quantidade) as CenaCerta[];
  }

  private getImageSource(imageName: string): any {
    return IMAGES[imageName as keyof typeof IMAGES] || null;
  }

  getFrasesEmbaralhadas(cena: CenaCerta): string[] {
    const frases = [cena.fraseCerta, ...cena.frasesErradas];
    
    // Embaralhar
    for (let i = frases.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [frases[i], frases[j]] = [frases[j], frases[i]];
    }
    
    return frases;
  }

  getConfig() {
    return this.config;
  }
}

export const cenaCertaService = new CenaCertaService();

