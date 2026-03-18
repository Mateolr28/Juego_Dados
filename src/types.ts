export interface Die {
  id: string;
  name: string;
  values: string[];
  currentResult: string | null;
}

export interface TimeDie {
  values: number[]; // in seconds
  currentResult: number | null;
}

export type GameCategory = 'azar' | 'pareja';

export type View = 'home' | 'dice-game' | 'kama-game' | 'roulette-game' | 'bottle-game';
