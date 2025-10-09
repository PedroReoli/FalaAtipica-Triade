import igualDiferenteData from '../../mockup-data/igual-diferente.json';

export interface ParIgualDiferente {
  id: string;
  tipo: 'palavra' | 'imagem';
  item1: string;
  item2: string;
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
    const pares = [...nivelData.pares];
    
    // Embaralhar
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    
    return pares;
  }

  getParesMisturados(quantidade: number = 12): ParIgualDiferente[] {
    // Mistura pares de todos os níveis
    const todosOsPares: ParIgualDiferente[] = [
      ...this.niveis.nivel1.pares,
      ...this.niveis.nivel2.pares,
      ...this.niveis.nivel3.pares,
    ];

    // Embaralhar
    for (let i = todosOsPares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [todosOsPares[i], todosOsPares[j]] = [todosOsPares[j], todosOsPares[i]];
    }

    return todosOsPares.slice(0, quantidade);
  }

  getConfig() {
    return this.config;
  }
}

export const igualDiferenteService = new IgualDiferenteService();

