import cenaCertaData from '../../mockup-data/cena-certa.json';

export interface CenaCerta {
  id: string;
  imagem: string;
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
    return this.niveis[`nivel${nivel}`];
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
    const todasAsCenas: CenaCerta[] = [
      ...this.niveis.nivel1.itens,
      ...this.niveis.nivel2.itens,
      ...this.niveis.nivel3.itens,
    ];

    // Embaralhar
    for (let i = todasAsCenas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todasAsCenas[i], todasAsCenas[j]] = [todasAsCenas[j], todasAsCenas[i]];
    }

    return todasAsCenas.slice(0, quantidade);
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

