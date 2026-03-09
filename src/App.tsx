import { useState } from 'react';
import { Home } from './components/Home';
import { DiceGame } from './components/DiceGame';
import { KamasutraGame } from './components/KamasutraGame';
import type { View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {view === 'home' && <Home onNavigate={setView} />}
      {view === 'dice-game' && <DiceGame onBack={() => setView('home')} />}
      {view === 'kama-game' && <KamasutraGame onBack={() => setView('home')} />}
    </div>
  );
}
