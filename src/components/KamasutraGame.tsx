import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, RefreshCw, RotateCcw } from 'lucide-react';
import { buttonStyles, cardStyles } from '../styles/constants';

interface Position {
  name: string;
  description: string;
  image: string;
}

const POSITIONS: Position[] = [
  {
    name: "Lanzadera",
    description:
      "El hombre se acuesta de espaldas, con las piernas ligeramente dobladas en las rodillas y tirando de los lados. La mujer está encima de la pareja masculina con la cara hacia él de manera que una pierna está entre las piernas de ella. Una de las manos de la mujer está recta y se apoya en el suelo, la segunda está doblada en el codo y está sobre el pecho de la pareja masculina. El hombre pone sus manos en las nalgas de la pareja femenina y es capaz de controlar el ritmo.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/1_3_3.png",
  },
  {
    name: "Sirena",
    description:
      "El hombre se acuesta de espaldas con las piernas ligeramente dobladas por las rodillas y las separa ampliamente. La mujer se tumba encima de su pareja, las piernas están apretadas y ligeramente dobladas por las rodillas, con las manos se sujeta las pantorrillas y levanta un poco el cuerpo hacia las piernas, de manera que está sentada en el suelo. El hombre pone su mano en el pecho de su pareja femenina y lo acaricia durante el sexo.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/2_4_4.png",
  },
  {
    name: "Gato",
    description:
      "La mujer se tumba de espaldas, sobre los codos levanta la parte superior de su cuerpo, las piernas están rectas, pero separadas. El hombre se acuesta sobre su compañera cara a cara, mantiene la parte superior del cuerpo sobre los brazos extendidos, las piernas están juntas y situadas entre las piernas de la compañera. Parece estar colgado sobre su dama y puede besar su cuello, sus labios en el proceso.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/3_2_3.png",
  },
  {
    name: "Batiente",
    description:
      " La mujer se pone de rodillas y se inclina completamente hacia delante, estirando los brazos por encima de la cabeza, dándoles forma de halo. El hombre se sitúa a la pareja femenina de tal manera, que sus nalgas se encuentran sobre los pies de la mujer, las piernas están muy separadas y la mujer se encuentra entre sus piernas. Las manos del hombre se echan hacia atrás, se ponen sobre sus manos y se hace el apoyo principal sobre ellas.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/4_1_3.png",
  },
  {
    name: "Acuario",
    description:
      "La mujer se tumba abriendo las piernas, y el hombre se coloca entre ellas de rodillas para levantar a la compañera por la cintura, de modo que sólo la cabeza y el antebrazo puedan ser su apoyo. La mujer lanza sus piernas a los muslos del hombre, doblándolas por las rodillas, apoya sus nalgas con los brazos, ayudando a la pareja masculina a mantener el ritmo del sexo. En esta posición ambos miembros de la pareja tienen las manos ocupadas, pero tienen los ojos para mirarse y a veces eso es más que suficiente.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/5_7.png",
  },
  {
    name: "A horcajadas",
    description:
      "El hombre se tumba de espaldas y dobla ligeramente una pierna por la rodilla. La pareja femenina se sienta sobre el pene de forma que sus piernas queden en un lado junto a la pierna doblada de su pareja masculina, que la pareja femenina coge con la mano por la rodilla y la otra mano la pone en el pecho del hombre. La pareja masculina pone su brazo en el cuello de la mujer y toma su rodilla por la otra. La mujer se desplaza en esta posición.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/6_1_2.png",
  },
  {
    name: "Vela",
    description:
      "El hombre se queda quieto y su mujer se coloca a su lado de espaldas. Si es necesario, la mujer puede ponerse de puntillas para que las penetraciones sean más profundas. Ella puede colocar su cabeza en el hombro de él para acariciar su cuello. La pareja masculina debe aprovechar la posibilidad de tocar a su amante, acariciar sus suaves pechos y sus firmes nalgas, ya que esta es la posición más adecuada para obtener el máximo placer.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/7_1.png",
  },
  {
    name: "Barco",
    description:
      "La mujer se tumba cómodamente sobre el vientre, abre las piernas y levanta sexualmente la parte superior de su cuerpo, apoyándose con confianza en los codos. El hombre está encima, colocando sus piernas entre las de la pareja femenina apoyándose en sus rodillas y colgando sobre ella, apoyándose en sus manos que están a los lados de sus hombros. La pareja es libre de estar besándose el hombre tiene acceso a los hombros de su ama y por supuesto, los gemidos se mezclan con el aliento caliente.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/8_2.png",
  },
  {
    name: "Disco",
    description:
      "La mujer está de pie, los pies están a la anchura de los hombros y las rodillas están ligeramente dobladas. La pareja masculina se sitúa a su lado de manera que sus rodillas forzadas y ligeramente dobladas queden entre las de ella. Los miembros de la pareja ponen sus manos en los muslos del otro, el pecho femenino acaricia el torso masculino y sus ojos se miran a los ojos. Alternativamente, uno de los miembros de la pareja puede colocarse junto a la pared para hacer un apoyo adicional.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/9_1_2.png",
  },
  {
    name: "Círculo",
    description:
      "El hombre y la mujer se acuestan de lado para que sus caras estén a la altura de las zonas íntimas del otro y sus piernas estén ligeramente dobladas por las rodillas. El hombre toma la pierna de su amante con una mano y la levanta, accediendo a la entrepierna de su compañera, acariciando sus nalgas con la segunda mano. La mujer tiene la capacidad de estimular el pene de su pareja masculina con sus manos, de acariciar sus testículos, nalgas y muslos, todo depende de su experiencia e imaginación. Esta es una posición definitivamente buena.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/10_1.png",
  },
  {
    name: "Inquisidor",
    description:
      "La mujer se tumba cómodamente de espaldas, abre las piernas y dobla ligeramente las rodillas. La pareja masculina se sitúa entre las piernas de ella tumbada sobre su vientre, sus piernas también están dobladas por las rodillas y están levantadas, sujeta las nalgas de su amante con sus brazos, y en cuanto al resto, todo depende del vuelo de su imaginación. El hombre puede atormentar a su tentadora en esa posición durante mucho tiempo, sin permitirle sentir un orgasmo o actuar con más decisión y claridad, llevándola deliberadamente al éxtasis.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/11_1.png",
  },
  {
    name: "Susurro",
    description:
      "El hombre se acuesta en la almohada con la espalda, por lo que estaba en la posición de medio sentado, los brazos se estiran a lo largo del cuerpo, las piernas están rectas, conducido aparte. La mujer se tumba boca abajo, su cara está delante del pene de la pareja masculina, con sus manos ayuda a acariciar su pene, las piernas están juntas y dobladas en las rodillas. El hombre puede mover la cabeza de su pareja femenina, tomarla por el pelo o simplemente observar la admirable imagen",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/12_1_3.png",
  },
  {
    name: "Cuchara",
    description:
      "La mujer está cómodamente tumbada de lado; su pierna derecha está ligeramente doblada por la rodilla. El hombre está detrás de ella, un brazo rodea la cintura de su pareja femenina o palpa su vagina, las piernas del hombre están a lo largo de las piernas de la mujer, es decir, la pierna izquierda está recta y la derecha cruzada. Si no está familiarizado con esta cómoda posición, ahora tiene el motivo perfecto para el sexo matutino.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/13_1.png",
  },
  {
    name: "Tulipán",
    description:
      "En esta posición, la pareja masculina se acuesta y se pone a horcajadas para que la pareja femenina se acueste entre sus piernas y se acurruque fuertemente con sus caderas apoyándose en sus brazos para ver a su hombre y poder besarlo. Esta posición es muy sensible, los cuerpos están abrazados el uno al otro, la pareja masculina puede tocar a la mujer, besarla y mover sus caderas en sintonía para hacer la penetración más profunda.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/1_5.png",
  },
  {
    name: "Columpio",
    description:
      "El hombre se tumba de espaldas y abre las piernas. La mujer se sienta sobre el pene, ligeramente inclinada hacia atrás, se apoya en las manos separadas junto a los antebrazos del hombre. Ella dobla las rodillas y lanza una pierna sobre la otra, de modo que la pierna derecha queda en caída libre. La pareja masculina toma a su amante por las nalgas y la ayuda a moverse, al mismo tiempo que puede observar el proceso.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/2_7_2.png",
  },
  {
    name: "Tornado",
    description:
      "La mujer se tumba de espaldas, con los brazos y las piernas abiertos hacia los lados y una pierna doblada en la rodilla. La pareja masculina se tumba encima de la dama un poco oblicuamente, de modo que sus piernas abiertas y rectas quedan debajo de la pierna doblada de su querida. El hombre mantiene la parte superior de su cuerpo en la longitud del brazo recto, penetra en su dama de lado, es una posición muy singular, pruébala en la práctica.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/3_4_3.png",
  },
  {
    name: "Zombie",
    description:
      "El hombre se sienta, con las piernas ligeramente dobladas por las rodillas y separadas. La mujer se pone de espaldas a él y se inclina completamente hacia delante para que su cabeza quede entre los pies de la pareja masculina y las manos se apoyen en las palmas de las manos cerca de las rodillas de él, y los pies queden por fuera de las caderas del hombre. Él pone sus manos en la espalda de su amante y la pareja tiene sexo oral original.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/10_16_4.png",
  },
  {
    name: "En 4 (en cuatro)",
    description:
      "En la pose en 4, la mujer se pone a cuatro patas, los pies juntos, las manos a la altura de los hombros, apoyadas en las palmas, la espalda ligeramente arqueada, la cabeza echada hacia atrás. El hombre se pone de rodillas detrás de su compañera de tal manera, que sus piernas están entre los pies de ella, una mano la pone en la cintura, con la otra coge el capullo de su querida y la empuja al ritmo de sus movimientos. Esta posición en cuatro es una de las más excitantes y placenteras.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/4_4_3.png",
  },
  {
    name: "Libro",
    description:
      " La mujer se sienta con las nalgas sobre el pecho de él, como máximo cerca de su cuello y se inclina completamente hacia su pene. Las manos de la pareja femenina se apoyan en las caderas de él, su cabeza está entre las piernas de él. El hombre levanta la cabeza y acaricia la entrepierna de su dama, las manos se ponen en las nalgas de ella, o una de ellas puede usarse para satisfacer a la pareja femenina.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/10_2_2.png",
  },
  {
    name: "Jinete",
    description:
      "El hombre apoya la cabeza en la almohada y estira las piernas por delante; la mujer cabalga sobre el pene, manteniéndose en ancas. Para un mayor equilibrio, ella pone las manos en el pecho del hombre, haciendo un poco de apoyo. La pareja masculina sujeta a su amante por las piernas, pero también puede sentir su pecho agitado, acariciar el cuerpo o simplemente mirar.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/1_10_2.png",
  },
  {
    name: "Cáncer",
    description:
      "La mujer se tumba de lado, con una pierna estirada, la otra totalmente doblada por la rodilla y el brazo doblado por el codo para apoyarse. El hombre se sitúa entre las piernas de su pareja femenina de forma que una pierna está ligeramente doblada y se sitúa junto a la pierna recta de su pareja femenina, y la otra está sobre el regazo de la mujer de piernas dobladas, él la penetra por detrás. Se apoya con los brazos, uno cerca de la espalda y el otro en el pecho de la compañera.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/8_6_2.png",
  },
  {
    name: "Cleopatra",
    description:
      "La pareja femenina se sienta sobre sus piernas dobladas y ligeramente abiertas y echándose ligeramente hacia atrás se apoya en su brazo. La pareja masculina se sienta de rodillas frente a ella, sus brazos están cerca de los pies de ella y su cara está frente a la zona genital de la amante. En esta posición la chica lidera, puede dirigir a su pareja masculina en la dirección en la que tiene que moverse, y si él lo sabe todo por sí mismo, entonces como opción, ella puede acariciar suavemente su pecho.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/11_5.png",
  },
  {
    name: "Monja",
    description:
      "El hombre se acuesta de espaldas sobre una almohada, la parte superior de su cuerpo está en posición elevada y las piernas están rectas y separadas. La mujer se arrodilla entre las piernas de su pareja masculina de espaldas a él, de modo que sus espinillas queden bajo las caderas del hombre. Su cabeza está bajada, los brazos están rectos y situados cerca de sus rodillas. Sus manos están en las nalgas de la pareja femenina, las mueve al compás de las sacudidas.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/2_9_3.png",
  },
  {
    name: "Precipicio",
    description:
      "El hombre se tumba de espaldas y dobla las rodillas. La mujer monta el pene en posición de cara a su pareja masculina, dobla las piernas y separa las manos; su espalda se apoya en las piernas de su pareja masculina y echa la cabeza hacia atrás. Esta posición no sólo ofrece una vista magnífica a la pareja masculina, sino que también le permite acariciar el pecho y la entrepierna de su amante y aumentar el placer.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/1_18_2.png",
  },
  {
    name: "Mariposa",
    description:
      "La mujer se tumba convenientemente de lado, dobla ligeramente las rodillas y las acerca al cuerpo para poder coger sus pies con los brazos extendidos. El hombre se acuesta detrás de ella de lado, dobla un poco las rodillas, toma la cintura de su amante con una mano y pone la otra mano doblada en el codo debajo de la cabeza usándola como soporte. No encontrará nada complicado en esta posición, pero la condición obligatoria para el éxito del experimento es al menos el tamaño medio del pene de su pareja masculina.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/13_10.png",
  },
  {
    name: "Posición Vaquera Inversa (invertida)",
    description:
      "El hombre se acuesta de espaldas y la mujer se sienta encima, al igual que en la posición de vaquera regular, solo que ahora ella le da la espalda a su pareja.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/2_41_3.png",
  },
];

const STORAGE_KEY_KAMA = 'custom_dice_game_kama';

export function KamasutraGame({ onBack }: { onBack: () => void }) {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_KAMA + '_current');
    return saved ? JSON.parse(saved) : null;
  });
  const [shownPositions, setShownPositions] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_KAMA + '_shown');
    return saved ? JSON.parse(saved) : [];
  });
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KAMA + '_current', JSON.stringify(currentPosition));
  }, [currentPosition]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_KAMA + '_shown', JSON.stringify(shownPositions));
  }, [shownPositions]);

  const availablePositions = POSITIONS.filter(p => !shownPositions.includes(p.name));

  const roll = () => {
    if (isRolling || availablePositions.length === 0) return;
    setIsRolling(true);
    
    // Simulate a roll effect
    let count = 0;
    const interval = setInterval(() => {
      // During rolling, show any position for visual effect
      setCurrentPosition(POSITIONS[Math.floor(Math.random() * POSITIONS.length)]);
      count++;
      
      if (count > 10) {
        clearInterval(interval);
        
        // Pick a final position only from available ones
        const finalPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
        setCurrentPosition(finalPosition);
        setShownPositions(prev => [...prev, finalPosition.name]);
        setIsRolling(false);
      }
    }, 100);
  };

  const reset = () => {
    setShownPositions([]);
    setCurrentPosition(null);
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
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold italic serif">Explorador de Posiciones</h2>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
            {shownPositions.length} / {POSITIONS.length} descubiertas
          </span>
        </div>
        <button
          onClick={reset}
          className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          title="Reiniciar"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {availablePositions.length === 0 && !isRolling ? (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8 bg-white border border-stone-200 rounded-3xl shadow-sm"
            >
              <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="text-white w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold italic serif mb-2">¡Has descubierto todas!</h3>
              <p className="text-stone-500 mb-6">Reinicia para volver a empezar el ciclo.</p>
              <button
                onClick={reset}
                className={`${buttonStyles.primary} mx-auto`}
              >
                Reiniciar Ciclo
              </button>
            </motion.div>
          ) : currentPosition ? (
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

      {availablePositions.length > 0 && (
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
      )}
    </div>
  );
}

/*
{
    name: "Lanzadera",
    description:
      "El hombre se acuesta de espaldas, con las piernas ligeramente dobladas en las rodillas y tirando de los lados. La mujer está encima de la pareja masculina con la cara hacia él de manera que una pierna está entre las piernas de ella. Una de las manos de la mujer está recta y se apoya en el suelo, la segunda está doblada en el codo y está sobre el pecho de la pareja masculina. El hombre pone sus manos en las nalgas de la pareja femenina y es capaz de controlar el ritmo.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/1_3_3.png",
  },
  {
    name: "Sirena",
    description:
      "El hombre se acuesta de espaldas con las piernas ligeramente dobladas por las rodillas y las separa ampliamente. La mujer se tumba encima de su pareja, las piernas están apretadas y ligeramente dobladas por las rodillas, con las manos se sujeta las pantorrillas y levanta un poco el cuerpo hacia las piernas, de manera que está sentada en el suelo. El hombre pone su mano en el pecho de su pareja femenina y lo acaricia durante el sexo.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/2_4_4.png",
  },
  {
    name: "Gato",
    description:
      "La mujer se tumba de espaldas, sobre los codos levanta la parte superior de su cuerpo, las piernas están rectas, pero separadas. El hombre se acuesta sobre su compañera cara a cara, mantiene la parte superior del cuerpo sobre los brazos extendidos, las piernas están juntas y situadas entre las piernas de la compañera. Parece estar colgado sobre su dama y puede besar su cuello, sus labios en el proceso.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/3_2_3.png",
  },
  {
    name: "Batiente",
    description:
      " La mujer se pone de rodillas y se inclina completamente hacia delante, estirando los brazos por encima de la cabeza, dándoles forma de halo. El hombre se sitúa a la pareja femenina de tal manera, que sus nalgas se encuentran sobre los pies de la mujer, las piernas están muy separadas y la mujer se encuentra entre sus piernas. Las manos del hombre se echan hacia atrás, se ponen sobre sus manos y se hace el apoyo principal sobre ellas.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/4_1_3.png",
  },
  {
    name: "Acuario",
    description:
      "La mujer se tumba abriendo las piernas, y el hombre se coloca entre ellas de rodillas para levantar a la compañera por la cintura, de modo que sólo la cabeza y el antebrazo puedan ser su apoyo. La mujer lanza sus piernas a los muslos del hombre, doblándolas por las rodillas, apoya sus nalgas con los brazos, ayudando a la pareja masculina a mantener el ritmo del sexo. En esta posición ambos miembros de la pareja tienen las manos ocupadas, pero tienen los ojos para mirarse y a veces eso es más que suficiente.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/5_7.png",
  },
  {
    name: "A horcajadas",
    description:
      "El hombre se tumba de espaldas y dobla ligeramente una pierna por la rodilla. La pareja femenina se sienta sobre el pene de forma que sus piernas queden en un lado junto a la pierna doblada de su pareja masculina, que la pareja femenina coge con la mano por la rodilla y la otra mano la pone en el pecho del hombre. La pareja masculina pone su brazo en el cuello de la mujer y toma su rodilla por la otra. La mujer se desplaza en esta posición.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/6_1_2.png",
  },
  {
    name: "Vela",
    description:
      "El hombre se queda quieto y su mujer se coloca a su lado de espaldas. Si es necesario, la mujer puede ponerse de puntillas para que las penetraciones sean más profundas. Ella puede colocar su cabeza en el hombro de él para acariciar su cuello. La pareja masculina debe aprovechar la posibilidad de tocar a su amante, acariciar sus suaves pechos y sus firmes nalgas, ya que esta es la posición más adecuada para obtener el máximo placer.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/7_1.png",
  },
  {
    name: "Barco",
    description:
      "La mujer se tumba cómodamente sobre el vientre, abre las piernas y levanta sexualmente la parte superior de su cuerpo, apoyándose con confianza en los codos. El hombre está encima, colocando sus piernas entre las de la pareja femenina apoyándose en sus rodillas y colgando sobre ella, apoyándose en sus manos que están a los lados de sus hombros. La pareja es libre de estar besándose el hombre tiene acceso a los hombros de su ama y por supuesto, los gemidos se mezclan con el aliento caliente.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/8_2.png",
  },
  {
    name: "Disco",
    description:
      "La mujer está de pie, los pies están a la anchura de los hombros y las rodillas están ligeramente dobladas. La pareja masculina se sitúa a su lado de manera que sus rodillas forzadas y ligeramente dobladas queden entre las de ella. Los miembros de la pareja ponen sus manos en los muslos del otro, el pecho femenino acaricia el torso masculino y sus ojos se miran a los ojos. Alternativamente, uno de los miembros de la pareja puede colocarse junto a la pared para hacer un apoyo adicional.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/9_1_2.png",
  },
  {
    name: "Círculo",
    description:
      "El hombre y la mujer se acuestan de lado para que sus caras estén a la altura de las zonas íntimas del otro y sus piernas estén ligeramente dobladas por las rodillas. El hombre toma la pierna de su amante con una mano y la levanta, accediendo a la entrepierna de su compañera, acariciando sus nalgas con la segunda mano. La mujer tiene la capacidad de estimular el pene de su pareja masculina con sus manos, de acariciar sus testículos, nalgas y muslos, todo depende de su experiencia e imaginación. Esta es una posición definitivamente buena.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/10_1.png",
  },
  {
    name: "Inquisidor",
    description:
      "La mujer se tumba cómodamente de espaldas, abre las piernas y dobla ligeramente las rodillas. La pareja masculina se sitúa entre las piernas de ella tumbada sobre su vientre, sus piernas también están dobladas por las rodillas y están levantadas, sujeta las nalgas de su amante con sus brazos, y en cuanto al resto, todo depende del vuelo de su imaginación. El hombre puede atormentar a su tentadora en esa posición durante mucho tiempo, sin permitirle sentir un orgasmo o actuar con más decisión y claridad, llevándola deliberadamente al éxtasis.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/11_1.png",
  },
  {
    name: "Susurro",
    description:
      "El hombre se acuesta en la almohada con la espalda, por lo que estaba en la posición de medio sentado, los brazos se estiran a lo largo del cuerpo, las piernas están rectas, conducido aparte. La mujer se tumba boca abajo, su cara está delante del pene de la pareja masculina, con sus manos ayuda a acariciar su pene, las piernas están juntas y dobladas en las rodillas. El hombre puede mover la cabeza de su pareja femenina, tomarla por el pelo o simplemente observar la admirable imagen",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/12_1_3.png",
  },
  {
    name: "Cuchara",
    description:
      "La mujer está cómodamente tumbada de lado; su pierna derecha está ligeramente doblada por la rodilla. El hombre está detrás de ella, un brazo rodea la cintura de su pareja femenina o palpa su vagina, las piernas del hombre están a lo largo de las piernas de la mujer, es decir, la pierna izquierda está recta y la derecha cruzada. Si no está familiarizado con esta cómoda posición, ahora tiene el motivo perfecto para el sexo matutino.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/13_1.png",
  },
  {
    name: "Tulipán",
    description:
      "En esta posición, la pareja masculina se acuesta y se pone a horcajadas para que la pareja femenina se acueste entre sus piernas y se acurruque fuertemente con sus caderas apoyándose en sus brazos para ver a su hombre y poder besarlo. Esta posición es muy sensible, los cuerpos están abrazados el uno al otro, la pareja masculina puede tocar a la mujer, besarla y mover sus caderas en sintonía para hacer la penetración más profunda.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/1_5.png",
  },
  {
    name: "Columpio",
    description:
      "El hombre se tumba de espaldas y abre las piernas. La mujer se sienta sobre el pene, ligeramente inclinada hacia atrás, se apoya en las manos separadas junto a los antebrazos del hombre. Ella dobla las rodillas y lanza una pierna sobre la otra, de modo que la pierna derecha queda en caída libre. La pareja masculina toma a su amante por las nalgas y la ayuda a moverse, al mismo tiempo que puede observar el proceso.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/2_7_2.png",
  },
  {
    name: "Tornado",
    description:
      "La mujer se tumba de espaldas, con los brazos y las piernas abiertos hacia los lados y una pierna doblada en la rodilla. La pareja masculina se tumba encima de la dama un poco oblicuamente, de modo que sus piernas abiertas y rectas quedan debajo de la pierna doblada de su querida. El hombre mantiene la parte superior de su cuerpo en la longitud del brazo recto, penetra en su dama de lado, es una posición muy singular, pruébala en la práctica.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/3_4_3.png",
  },
  {
    name: "Zombie",
    description:
      "El hombre se sienta, con las piernas ligeramente dobladas por las rodillas y separadas. La mujer se pone de espaldas a él y se inclina completamente hacia delante para que su cabeza quede entre los pies de la pareja masculina y las manos se apoyen en las palmas de las manos cerca de las rodillas de él, y los pies queden por fuera de las caderas del hombre. Él pone sus manos en la espalda de su amante y la pareja tiene sexo oral original.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/10_16_4.png",
  },
  {
    name: "En 4 (en cuatro)",
    description:
      "En la pose en 4, la mujer se pone a cuatro patas, los pies juntos, las manos a la altura de los hombros, apoyadas en las palmas, la espalda ligeramente arqueada, la cabeza echada hacia atrás. El hombre se pone de rodillas detrás de su compañera de tal manera, que sus piernas están entre los pies de ella, una mano la pone en la cintura, con la otra coge el capullo de su querida y la empuja al ritmo de sus movimientos. Esta posición en cuatro es una de las más excitantes y placenteras.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/4_4_3.png",
  },
  {
    name: "Libro",
    description:
      " La mujer se sienta con las nalgas sobre el pecho de él, como máximo cerca de su cuello y se inclina completamente hacia su pene. Las manos de la pareja femenina se apoyan en las caderas de él, su cabeza está entre las piernas de él. El hombre levanta la cabeza y acaricia la entrepierna de su dama, las manos se ponen en las nalgas de ella, o una de ellas puede usarse para satisfacer a la pareja femenina.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/02/10_2_2.png",
  },
  {
    name: "Jinete",
    description:
      "El hombre apoya la cabeza en la almohada y estira las piernas por delante; la mujer cabalga sobre el pene, manteniéndose en ancas. Para un mayor equilibrio, ella pone las manos en el pecho del hombre, haciendo un poco de apoyo. La pareja masculina sujeta a su amante por las piernas, pero también puede sentir su pecho agitado, acariciar el cuerpo o simplemente mirar.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/1_10_2.png",
  },
  {
    name: "Cáncer",
    description:
      "La mujer se tumba de lado, con una pierna estirada, la otra totalmente doblada por la rodilla y el brazo doblado por el codo para apoyarse. El hombre se sitúa entre las piernas de su pareja femenina de forma que una pierna está ligeramente doblada y se sitúa junto a la pierna recta de su pareja femenina, y la otra está sobre el regazo de la mujer de piernas dobladas, él la penetra por detrás. Se apoya con los brazos, uno cerca de la espalda y el otro en el pecho de la compañera.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/8_6_2.png",
  },
  {
    name: "Cleopatra",
    description:
      "La pareja femenina se sienta sobre sus piernas dobladas y ligeramente abiertas y echándose ligeramente hacia atrás se apoya en su brazo. La pareja masculina se sienta de rodillas frente a ella, sus brazos están cerca de los pies de ella y su cara está frente a la zona genital de la amante. En esta posición la chica lidera, puede dirigir a su pareja masculina en la dirección en la que tiene que moverse, y si él lo sabe todo por sí mismo, entonces como opción, ella puede acariciar suavemente su pecho.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/11_5.png",
  },
  {
    name: "Monja",
    description:
      "El hombre se acuesta de espaldas sobre una almohada, la parte superior de su cuerpo está en posición elevada y las piernas están rectas y separadas. La mujer se arrodilla entre las piernas de su pareja masculina de espaldas a él, de modo que sus espinillas queden bajo las caderas del hombre. Su cabeza está bajada, los brazos están rectos y situados cerca de sus rodillas. Sus manos están en las nalgas de la pareja femenina, las mueve al compás de las sacudidas.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/2_9_3.png",
  },
  {
    name: "Precipicio",
    description:
      "El hombre se tumba de espaldas y dobla las rodillas. La mujer monta el pene en posición de cara a su pareja masculina, dobla las piernas y separa las manos; su espalda se apoya en las piernas de su pareja masculina y echa la cabeza hacia atrás. Esta posición no sólo ofrece una vista magnífica a la pareja masculina, sino que también le permite acariciar el pecho y la entrepierna de su amante y aumentar el placer.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/1_18_2.png",
  },
  {
    name: "Mariposa",
    description:
      "La mujer se tumba convenientemente de lado, dobla ligeramente las rodillas y las acerca al cuerpo para poder coger sus pies con los brazos extendidos. El hombre se acuesta detrás de ella de lado, dobla un poco las rodillas, toma la cintura de su amante con una mano y pone la otra mano doblada en el codo debajo de la cabeza usándola como soporte. No encontrará nada complicado en esta posición, pero la condición obligatoria para el éxito del experimento es al menos el tamaño medio del pene de su pareja masculina.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/13_10.png",
  },
  {
    name: "Posición Vaquera Inversa (invertida)",
    description:
      "El hombre se acuesta de espaldas y la mujer se sienta encima, al igual que en la posición de vaquera regular, solo que ahora ella le da la espalda a su pareja.",
    image:
      "https://sexpositions.club/es/wp-content/uploads/sites/2/2016/03/2_41_3.png",
  },*/