import { motion } from 'motion/react';
import { Dices, Gamepad2, Disc, Sparkles, Heart, BedDouble } from 'lucide-react';
import { ReactNode } from 'react';
import type { View, GameCategory } from '../types';

interface HomeProps {
  onNavigate: (view: View, category?: GameCategory) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 italic serif">
          Dados <span className="text-stone-400">Personalizados</span>
        </h1>
        <p className="text-sm md:text-base text-stone-500 font-medium px-4">Elige tu categoría y empieza a jugar.</p>
      </motion.div>

      <div className="w-full max-w-4xl space-y-12">
        {/* Juegos de Azar */}
        <section>
          <div className="flex items-center gap-2 mb-6 px-2">
            <Sparkles className="text-stone-400" size={20} />
            <h2 className="text-xl font-bold italic serif">Juegos de Azar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GameCard
              title="Juego de Dados"
              description="Configura y lanza tus dados"
              icon={<Dices className="text-white w-7 h-7" />}
              onClick={() => onNavigate('dice-game', 'azar')}
            />
            <GameCard
              title="Ruleta de Decisiones"
              description="Gira y elimina opciones"
              icon={<Disc className="text-white w-7 h-7" />}
              onClick={() => onNavigate('roulette-game', 'azar')}
            />
          </div>
        </section>

        {/* Juegos para Pareja */}
        <section>
          <div className="flex items-center gap-2 mb-6 px-2">
            <Heart className="text-red-400" size={20} />
            <h2 className="text-xl font-bold italic serif">Juegos para Pareja</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GameCard
              title="Explorador Kama"
              description="Descubre nuevas posiciones"
              icon={<BedDouble className="text-white w-7 h-7 md:w-8 md:h-8" />}
              onClick={() => onNavigate('kama-game')}
            />
            <GameCard
              title="Dados Picantes"
              description="Acciones y lugares"
              icon={<Dices className="text-white w-7 h-7" />}
              onClick={() => onNavigate('dice-game', 'pareja')}
            />
            <GameCard
              title="Ruleta del Deseo"
              description="Retos y premios"
              icon={<Disc className="text-white w-7 h-7" />}
              onClick={() => onNavigate('roulette-game', 'pareja')}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function GameCard({ title, description, icon, onClick }: { title: string, description: string, icon: ReactNode, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all group w-full"
    >
      <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-stone-800 transition-colors">
        {icon}
      </div>
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-xs text-stone-400 mt-1">{description}</span>
    </motion.button>
  );
}



/* import { Dices, Gamepad2, Disc, BedDouble} from 'lucide-react';
 <BedDouble className="text-white w-7 h-7 md:w-8 md:h-8" />
*/