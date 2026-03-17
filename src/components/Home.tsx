import { motion, AnimatePresence } from 'motion/react';
import { Dices, Gamepad2, Disc, Sparkles, Heart, ArrowLeft, BedDouble } from 'lucide-react';
import { ReactNode, useState } from 'react';
import type { View, GameCategory } from '../types';

interface HomeProps {
  onNavigate: (view: View, category?: GameCategory) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);

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
        <p className="text-sm md:text-base text-stone-500 font-medium px-4">
          {selectedCategory ? 'Elige un juego para empezar.' : 'Elige tu categoría favorita.'}
        </p>
      </motion.div>

      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <CategoryCard
                title="Juegos de Azar"
                description="Cada jugada es una oportunidad, cada giro puede cambiarlo todo"
                icon={<Sparkles className="text-white w-8 h-8" />}
                onClick={() => setSelectedCategory('azar')}
                color="bg-stone-900"
              />
              <CategoryCard
                title="Juegos para Pareja"
                description="Explora, juega y diviértete juntos"
                icon={<Heart className="text-white w-8 h-8" />}
                onClick={() => setSelectedCategory('pareja')}
                color="bg-red-500"
              />
            </motion.div>
          ) : (
            <motion.div
              key="games"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium mb-4"
              >
                <ArrowLeft size={20} />
                Volver a categorías
              </button>

              {selectedCategory === 'azar' && (
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
              )}

              {selectedCategory === 'pareja' && (
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
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CategoryCard({ title, description, icon, onClick, color }: { title: string, description: string, icon: ReactNode, onClick: () => void, color: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center p-10 bg-white border border-stone-200 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group w-full text-center"
    >
      <div className={`w-20 h-20 ${color} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-stone-400 max-w-[200px]">{description}</p>
    </motion.button>
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