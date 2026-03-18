import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play } from 'lucide-react';
import { buttonStyles } from '../styles/constants';

interface BottleGameProps {
  onBack: () => void;
}

export function BottleGame({ onBack }: BottleGameProps) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinBottle = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Random rotation between 5 and 10 full turns + random angle
    const extraRotation = 1800 + Math.random() * 1800;
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 p-4 flex items-center justify-between">
        <button onClick={onBack} className={buttonStyles.secondary}>
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h2 className="text-xl font-bold italic serif">Juego de la Botella</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 p-6 flex flex-col items-center justify-center max-w-4xl mx-auto w-full space-y-12">
        {/* Game Area */}
        <div className="relative aspect-square w-full max-w-sm mx-auto flex items-center justify-center bg-white rounded-full shadow-inner border border-stone-100 overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute inset-4 border-2 border-dashed border-stone-100 rounded-full" />
          
          {/* The Bottle */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }}
            className="relative z-10 cursor-pointer"
            onClick={spinBottle}
          >
            <div className="w-12 h-40 relative">
              {/* Bottle Body */}
              <div className="absolute inset-0 bg-stone-800 rounded-full shadow-xl overflow-hidden">
                {/* Bottle Label */}
                <div className="absolute top-1/2 left-0 right-0 h-12 bg-stone-700 border-y border-stone-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-500 opacity-50" />
                </div>
              </div>
              {/* Bottle Neck */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-10 bg-stone-800 rounded-t-lg" />
              {/* Bottle Cap (The pointer) */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-stone-900 rounded-full flex items-center justify-center">
                <div className="w-1 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
          </motion.div>

          {/* Center Point */}
          <div className="absolute w-4 h-4 bg-stone-200 rounded-full z-0" />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={spinBottle}
            disabled={isSpinning}
            className={`${buttonStyles.primary} px-12 py-4 text-lg rounded-full shadow-xl disabled:opacity-50 active:scale-95 transition-transform`}
          >
            {isSpinning ? 'Girando...' : '¡Girar Botella!'}
            <Play size={20} fill="currentColor" />
          </button>
          
          <p className="text-stone-400 text-sm font-medium italic">
            Toca la botella o el botón para girar
          </p>
        </div>
      </main>
    </div>
  );
}
