import { motion } from 'motion/react';
import { Dices, Gamepad2 } from 'lucide-react';
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
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold tracking-tighter mb-2 italic serif">
          Dados <span className="text-stone-400">Personalizados</span>
        </h1>
        <p className="text-stone-500 font-medium">Crea tus propias reglas, lanza los dados.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('dice-game')}
          className="flex flex-col items-center justify-center p-8 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group"
        >
          <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-stone-800 transition-colors">
            <Dices className="text-white w-8 h-8" />
          </div>
          <span className="text-xl font-semibold">Juego de Dados</span>
          <span className="text-sm text-stone-400 mt-1">Configura y lanza</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('other-game')}
          className="flex flex-col items-center justify-center p-8 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group opacity-60"
        >
          <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-stone-300 transition-colors">
            <Gamepad2 className="text-stone-500 w-8 h-8" />
          </div>
          <span className="text-xl font-semibold">Otro Juego</span>
          <span className="text-sm text-stone-400 mt-1">Próximamente</span>
        </motion.button>
      </div>
    </div>
  );
}
