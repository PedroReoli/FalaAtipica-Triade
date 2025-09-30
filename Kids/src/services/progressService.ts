// Serviço de progresso para a aplicação KIDS
export interface GameProgress {
  gameId: string;
  gameName: string;
  score: number;
  maxScore: number;
  completed: boolean;
  date: string;
  timeSpent: number; // em segundos
}

export interface CategoryProgress {
  categoryId: string;
  categoryName: string;
  totalGames: number;
  completedGames: number;
  totalScore: number;
  maxScore: number;
  lastPlayed: string;
}

export interface ChildProgress {
  childId: string;
  childName: string;
  totalScore: number;
  totalGames: number;
  completedGames: number;
  categories: CategoryProgress[];
  achievements: Achievement[];
  lastPlayed: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  requirement: {
    type: 'score' | 'games' | 'streak' | 'category';
    value: number;
    categoryId?: string;
  };
}

class ProgressService {
  private static instance: ProgressService;
  private progress: ChildProgress | null = null;

  static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  // Inicializar progresso da criança
  initializeProgress(childId: string, childName: string): void {
    this.progress = {
      childId,
      childName,
      totalScore: 0,
      totalGames: 0,
      completedGames: 0,
      categories: [
        {
          categoryId: 'animais',
          categoryName: 'Animais',
          totalGames: 10,
          completedGames: 0,
          totalScore: 0,
          maxScore: 30,
          lastPlayed: ''
        },
        {
          categoryId: 'objetos',
          categoryName: 'Objetos',
          totalGames: 10,
          completedGames: 0,
          totalScore: 0,
          maxScore: 30,
          lastPlayed: ''
        },
        {
          categoryId: 'cores',
          categoryName: 'Cores',
          totalGames: 8,
          completedGames: 0,
          totalScore: 0,
          maxScore: 24,
          lastPlayed: ''
        }
      ],
      achievements: [
        {
          id: 'first_game',
          name: 'Primeira Estrela',
          description: 'Complete seu primeiro jogo',
          icon: 'star',
          unlocked: false,
          requirement: { type: 'games', value: 1 }
        },
        {
          id: 'animal_master',
          name: 'Mestre dos Animais',
          description: 'Complete todos os jogos de animais',
          icon: 'trophy',
          unlocked: false,
          requirement: { type: 'category', value: 10, categoryId: 'animais' }
        },
        {
          id: 'perfect_score',
          name: 'Pontuação Perfeita',
          description: 'Acertar todas as perguntas de um jogo',
          icon: 'medal',
          unlocked: false,
          requirement: { type: 'score', value: 3 }
        },
        {
          id: 'streak_5',
          name: 'Sequência de 5',
          description: 'Jogar 5 jogos seguidos',
          icon: 'flame',
          unlocked: false,
          requirement: { type: 'streak', value: 5 }
        }
      ],
      lastPlayed: new Date().toISOString()
    };
    
    this.saveProgress();
  }

  // Registrar resultado de um jogo
  recordGameResult(gameId: string, gameName: string, categoryId: string, score: number, maxScore: number, timeSpent: number): void {
    if (!this.progress) return;

    const gameProgress: GameProgress = {
      gameId,
      gameName,
      score,
      maxScore,
      completed: score === maxScore,
      date: new Date().toISOString(),
      timeSpent
    };

    // Atualizar progresso geral
    this.progress.totalScore += score;
    this.progress.totalGames += 1;
    if (gameProgress.completed) {
      this.progress.completedGames += 1;
    }
    this.progress.lastPlayed = gameProgress.date;

    // Atualizar progresso da categoria
    const category = this.progress.categories.find(cat => cat.categoryId === categoryId);
    if (category) {
      category.totalScore += score;
      category.completedGames += gameProgress.completed ? 1 : 0;
      category.lastPlayed = gameProgress.date;
    }

    // Verificar conquistas
    this.checkAchievements();

    this.saveProgress();
  }

  // Verificar conquistas
  private checkAchievements(): void {
    if (!this.progress) return;

    this.progress.achievements.forEach(achievement => {
      if (achievement.unlocked) return;

      let unlocked = false;

      switch (achievement.requirement.type) {
        case 'games':
          unlocked = this.progress!.totalGames >= achievement.requirement.value;
          break;
        case 'score':
          unlocked = this.progress!.totalScore >= achievement.requirement.value;
          break;
        case 'streak':
          // Implementar lógica de sequência
          unlocked = false; // TODO: Implementar
          break;
        case 'category':
          const category = this.progress!.categories.find(cat => cat.categoryId === achievement.requirement.categoryId);
          unlocked = category ? category.completedGames >= achievement.requirement.value : false;
          break;
      }

      if (unlocked) {
        achievement.unlocked = true;
        achievement.unlockedDate = new Date().toISOString();
      }
    });
  }

  // Obter progresso atual
  getProgress(): ChildProgress | null {
    return this.progress;
  }

  // Obter progresso de uma categoria
  getCategoryProgress(categoryId: string): CategoryProgress | null {
    if (!this.progress) return null;
    return this.progress.categories.find(cat => cat.categoryId === categoryId) || null;
  }

  // Obter conquistas desbloqueadas
  getUnlockedAchievements(): Achievement[] {
    if (!this.progress) return [];
    return this.progress.achievements.filter(achievement => achievement.unlocked);
  }

  // Salvar progresso (localStorage)
  private saveProgress(): void {
    if (!this.progress) return;
    // Em uma implementação real, isso seria salvo no AsyncStorage
    console.log('Progresso salvo:', this.progress);
  }

  // Carregar progresso (localStorage)
  loadProgress(): void {
    // Em uma implementação real, isso seria carregado do AsyncStorage
    // Por enquanto, retorna null para forçar inicialização
    this.progress = null;
  }

  // Resetar progresso
  resetProgress(): void {
    this.progress = null;
    this.saveProgress();
  }
}

export default ProgressService;
