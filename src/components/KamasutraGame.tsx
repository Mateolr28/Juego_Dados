import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { buttonStyles, cardStyles } from '../styles/constants';

interface Position {
  name: string;
  description: string;
  image: string;
}

const POSITIONS: Position[] = [
  {
    name: "El Misionero",
    description: "Una posición clásica que permite un contacto visual íntimo y cercanía emocional.",
    image: "https://picsum.photos/seed/kama1/600/400"
  },
  {
    name: "La Cuchara",
    description: "Ideal para la relajación y la ternura, permitiendo un contacto corporal total.",
    image: "https://picsum.photos/seed/kama2/600/400"
  },
  {
    name: "El Puente",
    description: "Una posición que requiere flexibilidad y ofrece una perspectiva única.",
    image: "https://picsum.photos/seed/kama3/600/400"
  },
  {
    name: "La Flor de Loto",
    description: "Fomenta la conexión espiritual y el equilibrio entre ambos.",
    image: "https://picsum.photos/seed/kama4/600/400"
  },
  {
    name: "El Columpio",
    description: "Añade un elemento de juego y dinamismo a la experiencia.",
    image: "https://picsum.photos/seed/kama5/600/400"
  },
  {
    name: "La Mariposa",
    description: "Enfocada en la suavidad y el ritmo pausado.",
    image: "https://picsum.photos/seed/kama6/600/400"
  }
];

export function KamasutraGame({ onBack }: { onBack: () => void }) {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const roll = () => {
    if (isRolling) return;
    setIsRolling(true);
    
    // Simulate a roll effect
    let count = 0;
    const interval = setInterval(() => {
      setCurrentPosition(POSITIONS[Math.floor(Math.random() * POSITIONS.length)]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsRolling(false);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <h2 className="text-2xl font-bold italic serif">Explorador de Posiciones</h2>
        <div className="w-20"></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentPosition ? (
            <motion.div
              key={currentPosition.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl"
            >
              <div className={`${cardStyles.base} overflow-hidden p-0`}>
                <div className="aspect-video w-full relative bg-stone-100">
                  <img
                    src={currentPosition.image}
                    alt={currentPosition.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-black text-white italic serif mb-2">
                      {currentPosition.name}
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-stone-600 text-lg leading-relaxed font-medium">
                    {currentPosition.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="text-stone-300 w-12 h-12" />
              </div>
              <p className="text-stone-400 font-medium italic">Presiona el botón para descubrir una posición</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={roll}
          disabled={isRolling}
          className={`${buttonStyles.primary} px-12 py-5 text-lg shadow-2xl`}
        >
          {isRolling ? (
            <RefreshCw className="animate-spin" size={24} />
          ) : (
            <Sparkles size={24} />
          )}
          {currentPosition ? 'DESCUBRIR OTRA' : 'DESCUBRIR POSICIÓN'}
        </motion.button>
      </div>
    </div>
  );
}
