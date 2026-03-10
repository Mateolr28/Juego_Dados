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
    name: "Lanzadera",
    description: "El hombre se acuesta de espaldas, con las piernas ligeramente dobladas en las rodillas y tirando de los lados. La mujer está encima de la pareja masculina con la cara hacia él de manera que una pierna está entre las piernas de ella. Una de las manos de la mujer está recta y se apoya en el suelo, la segunda está doblada en el codo y está sobre el pecho de la pareja masculina. El hombre pone sus manos en las nalgas de la pareja femenina y es capaz de controlar el ritmo.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/1_3_3.png"
  },
  {
    name: "Sirena",
    description: "El hombre se acuesta de espaldas con las piernas ligeramente dobladas por las rodillas y las separa ampliamente. La mujer se tumba encima de su pareja, las piernas están apretadas y ligeramente dobladas por las rodillas, con las manos se sujeta las pantorrillas y levanta un poco el cuerpo hacia las piernas, de manera que está sentada en el suelo. El hombre pone su mano en el pecho de su pareja femenina y lo acaricia durante el sexo.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/2_4_4.png"
  },
  {
    name: "Gato",
    description: "La mujer se tumba de espaldas, sobre los codos levanta la parte superior de su cuerpo, las piernas están rectas, pero separadas. El hombre se acuesta sobre su compañera cara a cara, mantiene la parte superior del cuerpo sobre los brazos extendidos, las piernas están juntas y situadas entre las piernas de la compañera. Parece estar colgado sobre su dama y puede besar su cuello, sus labios en el proceso.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/3_2_3.png"
  },
  {
    name: "Batiente",
    description: " La mujer se pone de rodillas y se inclina completamente hacia delante, estirando los brazos por encima de la cabeza, dándoles forma de halo. El hombre se sitúa a la pareja femenina de tal manera, que sus nalgas se encuentran sobre los pies de la mujer, las piernas están muy separadas y la mujer se encuentra entre sus piernas. Las manos del hombre se echan hacia atrás, se ponen sobre sus manos y se hace el apoyo principal sobre ellas.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/4_1_3.png"
  },
  {
    name: "Acuario",
    description: "La mujer se tumba abriendo las piernas, y el hombre se coloca entre ellas de rodillas para levantar a la compañera por la cintura, de modo que sólo la cabeza y el antebrazo puedan ser su apoyo. La mujer lanza sus piernas a los muslos del hombre, doblándolas por las rodillas, apoya sus nalgas con los brazos, ayudando a la pareja masculina a mantener el ritmo del sexo. En esta posición ambos miembros de la pareja tienen las manos ocupadas, pero tienen los ojos para mirarse y a veces eso es más que suficiente.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/5_7.png"
  },
  {
    name: "A horcajadas",
    description: "El hombre se tumba de espaldas y dobla ligeramente una pierna por la rodilla. La pareja femenina se sienta sobre el pene de forma que sus piernas queden en un lado junto a la pierna doblada de su pareja masculina, que la pareja femenina coge con la mano por la rodilla y la otra mano la pone en el pecho del hombre. La pareja masculina pone su brazo en el cuello de la mujer y toma su rodilla por la otra. La mujer se desplaza en esta posición.",
    image: "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/6_1_2.png"
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
