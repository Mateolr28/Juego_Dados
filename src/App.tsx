import { useState } from 'react';
import { Home } from './components/Home';
import { DiceGame } from './components/DiceGame';
import type { View } from './types';

export default function App() {
  const [view, setView] = useState<View>('home');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {view === 'home' && <Home onNavigate={setView} />}
      {view === 'dice-game' && <DiceGame onBack={() => setView('home')} />}
      {view === 'other-game' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-3xl font-bold mb-4">Próximamente</h1>
          <button
            onClick={() => setView('home')}
            className="px-6 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors"
          >
            Volver
          </button>
        </div>
      )}
    </div>
  );
}
