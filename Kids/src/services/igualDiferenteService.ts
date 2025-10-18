import igualDiferenteData from '../../mockup-data/igual-diferente.json';

// ⚠️ NOVA LÓGICA: Mesmo objeto = IGUAL | Objetos diferentes = DIFERENTE
// Estrutura: objetos com múltiplas variações (embaralha entre elas)

const IMAGES: Record<string, any> = {
  // Nível 1
  'casa.png': require('../assets/images/igual-diferente/casa.png'),
  'realistas/casa2.png': require('../assets/images/igual-diferente/realistas/casa2.png'),
  'realistas/casa3.png': require('../assets/images/igual-diferente/realistas/casa3.png'),
  
  // Nível 2
  'arvore-verde.png': require('../assets/images/igual-diferente/arvore-verde.png'),
  'realistas/arvore2.png': require('../assets/images/igual-diferente/realistas/arvore2.png'),
  'realistas/arvore3.png': require('../assets/images/igual-diferente/realistas/arvore3.png'),
  'bicicleta_vermelha.png': require('../assets/images/igual-diferente/bicicleta_vermelha.png'),
  'realistas/bicicleta2.png': require('../assets/images/igual-diferente/realistas/bicicleta2.png'),
  'realistas/bicicleta3.png': require('../assets/images/igual-diferente/realistas/bicicleta3.png'),
  
  // Nível 3
  'borboleta.png': require('../assets/images/igual-diferente/borboleta.png'),
  'realistas/borboleta2.png': require('../assets/images/igual-diferente/realistas/borboleta2.png'),
  'realistas/borboleta3.png': require('../assets/images/igual-diferente/realistas/borboleta3.png'),
};

export interface ObjetoComVariacoes {
  id: string;
  nome: string;
  variacoes: string[];
}

export interface ParIgualDiferente {
  id: string;
  item1: {
    imagem: any;
    objetoId: string;
  };
  item2: {
    imagem: any;
    objetoId: string;
  };
  resposta: 'igual' | 'diferente';
  dificuldade: 1 | 2 | 3;
}

export interface NivelJogo {
  nome: string;
  descricao: string;
  objetos: ObjetoComVariacoes[];
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

  /**
   * Gera pares para jogar com 55% de chance de IGUAL e 45% de DIFERENTE
   */
  gerarParesParaJogar(nivel: 1 | 2 | 3 | 'tudo', quantidade: number = 10): ParIgualDiferente[] {
    const config = this.config;
    const porcentagemIguais = config.porcentagemIguais / 100;
    const quantidadeIguais = Math.round(quantidade * porcentagemIguais);
    const quantidadeDiferentes = quantidade - quantidadeIguais;
    
    let objetosDisponiveis: ObjetoComVariacoes[] = [];
    
    // Selecionar objetos baseado no nível
    if (nivel === 'tudo') {
      objetosDisponiveis = [
        ...this.niveis.nivel1.objetos,
        ...this.niveis.nivel2.objetos,
        ...this.niveis.nivel3.objetos,
      ];
    } else {
      objetosDisponiveis = this.niveis[`nivel${nivel}`].objetos;
    }
    
    const pares: ParIgualDiferente[] = [];
    
    // Gerar pares IGUAIS (55%)
    for (let i = 0; i < quantidadeIguais; i++) {
      const objetoAleatorio = objetosDisponiveis[Math.floor(Math.random() * objetosDisponiveis.length)];
      const par = this.gerarParIgual(objetoAleatorio);
      pares.push(par);
    }
    
    // Gerar pares DIFERENTES (45%)
    for (let i = 0; i < quantidadeDiferentes; i++) {
      const par = this.gerarParDiferente(objetosDisponiveis);
      pares.push(par);
    }
    
    // Embaralhar pares
    for (let i = pares.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pares[i], pares[j]] = [pares[j], pares[i]];
    }
    
    return pares;
  }

  /**
   * Gera um par IGUAL (mesmo objeto, VARIAÇÕES DIFERENTES - nunca a mesma imagem!)
   */
  private gerarParIgual(objeto: ObjetoComVariacoes): ParIgualDiferente {
    // Garantir que tem pelo menos 2 variações
    if (objeto.variacoes.length < 2) {
      console.warn(`⚠️ Objeto ${objeto.id} tem apenas 1 variação!`);
    }
    
    // Selecionar 2 variações DIFERENTES
    const indice1 = Math.floor(Math.random() * objeto.variacoes.length);
    let indice2 = Math.floor(Math.random() * objeto.variacoes.length);
    
    // Garantir que são variações diferentes (não a mesma imagem!)
    while (indice2 === indice1 && objeto.variacoes.length > 1) {
      indice2 = Math.floor(Math.random() * objeto.variacoes.length);
    }
    
    const variacaoAleatoria1 = objeto.variacoes[indice1];
    const variacaoAleatoria2 = objeto.variacoes[indice2];
    
    return {
      id: `${objeto.id}_igual_${Date.now()}_${Math.random()}`,
      item1: {
        imagem: this.getImageSource(variacaoAleatoria1),
        objetoId: objeto.id
      },
      item2: {
        imagem: this.getImageSource(variacaoAleatoria2),
        objetoId: objeto.id
      },
      resposta: 'igual',
      dificuldade: 1
    };
  }

  /**
   * Gera um par DIFERENTE (objetos diferentes)
   */
  private gerarParDiferente(objetos: ObjetoComVariacoes[]): ParIgualDiferente {
    if (objetos.length < 2) {
      // Se tiver menos de 2 objetos, retorna um par igual mesmo
      return this.gerarParIgual(objetos[0]);
    }
    
    // Selecionar 2 objetos diferentes
    const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, objetos.length);
    const indice1 = indices[Math.floor(Math.random() * indices.length)];
    let indice2 = indices[Math.floor(Math.random() * indices.length)];
    
    // Garantir que são objetos diferentes
    while (indice2 === indice1 && objetos.length > 1) {
      indice2 = indices[Math.floor(Math.random() * indices.length)];
    }
    
    const objeto1 = objetos[indice1];
    const objeto2 = objetos[indice2];
    
    const variacaoAleatoria1 = objeto1.variacoes[Math.floor(Math.random() * objeto1.variacoes.length)];
    const variacaoAleatoria2 = objeto2.variacoes[Math.floor(Math.random() * objeto2.variacoes.length)];
    
    return {
      id: `${objeto1.id}_vs_${objeto2.id}_${Date.now()}_${Math.random()}`,
      item1: {
        imagem: this.getImageSource(variacaoAleatoria1),
        objetoId: objeto1.id
      },
      item2: {
        imagem: this.getImageSource(variacaoAleatoria2),
        objetoId: objeto2.id
      },
      resposta: 'diferente',
      dificuldade: 1
    };
  }

  private getImageSource(imageName: string): any {
    return IMAGES[imageName as keyof typeof IMAGES] || null;
  }

  getConfig() {
    return this.config;
  }
  
  getNiveis() {
    return [
      { id: 1, nome: 'Nível 1 - Fácil', descricao: 'Objetos grandes e fáceis' },
      { id: 2, nome: 'Nível 2 - Médio', descricao: 'Objetos com mais detalhes' },
      { id: 3, nome: 'Nível 3 - Difícil', descricao: 'Objetos com detalhes sutis' },
      { id: 'tudo', nome: 'Tudo Misturado', descricao: 'Todos os níveis juntos' },
    ];
  }
}

export const igualDiferenteService = new IgualDiferenteService();
