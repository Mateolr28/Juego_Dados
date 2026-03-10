import { motion } from 'motion/react';
import { Dices, Gamepad2, BedDouble } from 'lucide-react';
import type { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 italic serif">
          Juego <span className="text-stone-400">Dados</span>
        </h1>
        <p className="text-sm md:text-base text-stone-500 font-medium px-4">Crea tus propias reglas, lanza los dados.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-2xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('dice-game')}
          className="flex flex-col items-center justify-center p-6 md:p-8 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-900 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-stone-800 transition-colors">
            <Dices className="text-white w-7 h-7 md:w-8 md:h-8" />
          </div>
          <span className="text-lg md:text-xl font-semibold">Juego de Dados</span>
          <span className="text-xs md:text-sm text-stone-400 mt-1">Configura y lanza</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('kama-game')}
          className="flex flex-col items-center justify-center p-6 md:p-8 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 bg-stone-900 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-stone-800 transition-colors">
            <BedDouble className="text-white w-7 h-7 md:w-8 md:h-8" />
          </div>
          <span className="text-lg md:text-xl font-semibold">Explorador Kama</span>
          <span className="text-xs md:text-sm text-stone-400 mt-1">Descubre posiciones</span>
        </motion.button>
      </div>
    </div>
  );
}
