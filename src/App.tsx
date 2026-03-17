import { useState } from 'react';
import { Home } from './components/Home';
import { DiceGame } from './components/DiceGame';
import { KamasutraGame } from './components/KamasutraGame';
import { RouletteGame } from './components/RouletteGame';
import type { View, GameCategory } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState<GameCategory>('azar');

  const handleNavigate = (newView: View, newCategory?: GameCategory) => {
    if (newCategory) setCategory(newCategory);
    setView(newView);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {view === 'home' && <Home onNavigate={handleNavigate} />}
      {view === 'dice-game' && <DiceGame category={category} onBack={() => setView('home')} />}
      {view === 'kama-game' && <KamasutraGame onBack={() => setView('home')} />}
      {view === 'roulette-game' && <RouletteGame category={category} onBack={() => setView('home')} />}
    </div>
  );
}
