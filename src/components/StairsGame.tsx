import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Dices, Trophy, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { buttonStyles, cardStyles } from '../styles/constants';

interface StairsGameProps {
  onBack: () => void;
}

interface Square {
  id: number;
  action: string;
  type?: 'ladder' | 'snake' | 'forward' | 'backward';
  target?: number;
}

interface Player {
  id: number;
  name: string;
  color: string;
  position: number;
}

const BOARD_SIZE = 30;
const PLAYER_COLORS = ['bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];

const SQUARES: Square[] = [
  { id: 1, action: "¡Inicio! Prepárate para la diversión." },
  { id: 2, action: "Beso suave en el cuello." },
  { id: 3, action: "¡Escalera! Sube a la casilla 10.", type: 'ladder', target: 10 },
  { id: 4, action: "Masaje relajante en los hombros." },
  { id: 5, action: "¡Oh no! Resbala a la casilla 2.", type: 'snake', target: 2 },
  { id: 6, action: "Muerde sus partes intimas sobre la ropa." },
  { id: 7, action: "Quítate una prenda de ropa." },
  { id: 8, action: "¡Suerte! Avanza 2 casillas.", type: 'forward', target: 10 },
  { id: 9, action: "Un beso francés apasionado." },
  { id: 10, action: "Besa, muerde y lame el cuello de tu pareja." },
  { id: 11, action: "¡Mala suerte! Retrocede 3 casillas.", type: 'backward', target: 8 },
  { id: 12, action: "¡Escalera real! Sube a la casilla 22.", type: 'ladder', target: 22 },
  { id: 13, action: "Cubre sus ojos sopla y lame suavemente sus genitales." },
  { id: 14, action: "¡Resbalón! Baja a la casilla 4.", type: 'snake', target: 4 },
  { id: 15, action: "Pon a tu pareja de pie sobre la pared y dale un oral." },
  { id: 16, action: "Cubre sus ojos, ata sus manos y hazle un oral." },
  { id: 17, action: "¡Bonus! Avanza 3 casillas.", type: 'forward', target: 20 },
  { id: 18, action: "Lame y muerde suavemente las tetillas o pezones de tu pareja." },
  { id: 19, action: "¡Cuidado! Baja a la casilla 9.", type: 'snake', target: 9 },
  { id: 20, action: "Masturbate frente a tu pareja." },
  { id: 21, action: "Acaricia la vagina o el pene con los dedos mientras se besan." },
  { id: 22, action: "Tengan sexo por 1 minuto." },
  { id: 23, action: "¡Trampa! Vuelve a la casilla 15.", type: 'backward', target: 15 },
  { id: 24, action: "¡Casi llegas! Sube a la casilla 29.", type: 'ladder', target: 29 },
  { id: 25, action: "¡Ups! Baja a la casilla 18.", type: 'snake', target: 18 },
  { id: 26, action: "Lame el ano de tu pareja suave y despacio." },
  { id: 27, action: "Haz la posicion del 69." },
  { id: 28, action: "¡Vuelo directo! Ve a la casilla 30.", type: 'forward', target: 30 },
  { id: 29, action: "¡Último obstáculo! Baja a la 21.", type: 'snake', target: 21 },
  { id: 30, action: "¡HAZ GANADO! Decide que premio quieres." },
];

export function StairsGame({ onBack }: StairsGameProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [showWin, setShowWin] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const startGame = () => {
    const initialPlayers = Array.from({ length: numPlayers }).map((_, i) => ({
      id: i + 1,
      name: `Jugador ${i + 1}`,
      color: PLAYER_COLORS[i],
      position: 1,
    }));
    setPlayers(initialPlayers);
    setGameStarted(true);
    setMessage(SQUARES[0].action);
  };

  const rollDice = () => {
    if (isRolling || showWin) return;
    
    setIsRolling(true);
    setDiceValue(null);
    
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
      movePlayer(newValue);
    }, 1000);
  };

  const movePlayer = (steps: number) => {
    const currentPlayer = players[currentPlayerIndex];
    let newPos = currentPlayer.position + steps;
    
    if (newPos >= BOARD_SIZE) {
      newPos = BOARD_SIZE;
      updatePlayerPosition(currentPlayerIndex, newPos);
      setMessage(`${currentPlayer.name}: ${SQUARES[newPos - 1].action}`);
      setWinner(currentPlayer);
      setShowWin(true);
      return;
    }

    updatePlayerPosition(currentPlayerIndex, newPos);
    const currentSquare = SQUARES[newPos - 1];
    setMessage(`${currentPlayer.name}: ${currentSquare.action}`);

    // Handle special squares after a short delay
    if (currentSquare.type && currentSquare.target) {
      setTimeout(() => {
        const targetPos = currentSquare.target!;
        updatePlayerPosition(currentPlayerIndex, targetPos);
        setMessage(`¡Especial para ${currentPlayer.name}! ${SQUARES[targetPos - 1].action}`);
        if (targetPos === BOARD_SIZE) {
          setWinner(currentPlayer);
          setShowWin(true);
        }
      }, 1500);
    }
    
    // Next turn
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const updatePlayerPosition = (index: number, pos: number) => {
    setPlayers((prev) => {
      const newPlayers = [...prev];
      newPlayers[index] = { ...newPlayers[index], position: pos };
      return newPlayers;
    });
  };

  const resetGame = () => {
    setGameStarted(false);
    setPlayers([]);
    setCurrentPlayerIndex(0);
    setDiceValue(null);
    setMessage("");
    setShowWin(false);
    setWinner(null);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col min-h-screen bg-stone-50">
        <header className="sticky top-0 z-20 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 p-4 flex items-center justify-between">
          <button onClick={onBack} className={buttonStyles.secondary}>
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Volver</span>
          </button>
          <h2 className="text-xl font-bold italic serif">Escalera del Deseo</h2>
          <div className="w-10" />
        </header>

        <main className="flex-1 p-6 flex flex-col items-center justify-center max-w-md mx-auto w-full gap-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold italic serif">Configuración</h3>
            <p className="text-stone-500">¿Cuántos jugadores van a participar?</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setNumPlayers(n)}
                className={`py-4 rounded-2xl border-2 transition-all ${
                  numPlayers === n 
                    ? 'bg-stone-900 border-stone-900 text-white shadow-lg' 
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                <span className="text-2xl font-bold">{n}</span>
                <p className="text-xs uppercase tracking-widest opacity-70">Jugadores</p>
              </button>
            ))}
          </div>

          <button
            onClick={startGame}
            className={`${buttonStyles.primary} w-full py-4 text-lg rounded-2xl shadow-xl`}
          >
            Empezar Juego
          </button>
        </main>
      </div>
    );
  }

  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <header className="sticky top-0 z-20 bg-stone-50/80 backdrop-blur-md border-b border-stone-200 p-4 flex items-center justify-between">
        <button onClick={onBack} className={buttonStyles.secondary}>
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h2 className="text-xl font-bold italic serif">Escalera del Deseo</h2>
        <div className="w-10" />
      </header>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full flex flex-col gap-6">
        {/* Turn Indicator */}
        <div className="flex justify-center gap-2">
          {players.map((p, i) => (
            <div
              key={p.id}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                currentPlayerIndex === i 
                  ? `${p.color} text-white shadow-md scale-110` 
                  : 'bg-stone-200 text-stone-400 opacity-50'
              }`}
            >
              {p.name}
            </div>
          ))}
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-5 gap-2 bg-stone-200 p-2 rounded-2xl shadow-inner">
          {Array.from({ length: BOARD_SIZE }).map((_, i) => {
            const squareId = i + 1;
            const square = SQUARES[squareId - 1];
            const playersHere = players.filter(p => p.position === squareId);

            return (
              <div
                key={squareId}
                className={`relative flex items-center justify-center rounded-xl border transition-all duration-300 bg-white border-stone-100`}
                style={{ minHeight: '60px' }}
              >
                <span className="text-xs font-bold text-stone-300 absolute top-1 left-1">
                  {squareId}
                </span>
                
                {square.type === 'ladder' && (
                  <ArrowUpRight className="absolute top-1 right-1 text-emerald-400 opacity-50" size={14} />
                )}
                {square.type === 'snake' && (
                  <ArrowDownRight className="absolute top-1 right-1 text-red-400 opacity-50" size={14} />
                )}
                
                <div className="flex flex-wrap gap-1 justify-center p-1">
                  {playersHere.map((p) => (
                    <motion.div
                      key={p.id}
                      layoutId={`player-${p.id}`}
                      className={`w-4 h-4 sm:w-6 sm:h-6 ${p.color} rounded-full border-2 border-white shadow-sm`}
                      initial={false}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Game Controls */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-center w-20 h-20 text-3xl font-bold ${isRolling ? 'animate-bounce' : ''}`}>
              {diceValue || '?'}
            </div>
            
            <button
              onClick={rollDice}
              disabled={isRolling || showWin}
              className={`${buttonStyles.primary} px-8 py-4 rounded-full shadow-xl disabled:opacity-50 flex items-center gap-2 ${currentPlayer.color.replace('bg-', 'hover:bg-').replace('500', '600')}`}
            >
              <Dices size={24} />
              {isRolling ? 'Lanzando...' : `Turno de ${currentPlayer.name}`}
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`${cardStyles.base} w-full text-center p-6 border-stone-900 border-2`}
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-stone-400 uppercase tracking-widest text-xs font-bold">
                <AlertCircle size={14} />
                Última Acción
              </div>
              <p className="text-xl font-medium italic serif text-stone-800">
                {message || "¡Lanza el dado para empezar!"}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {showWin && winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl"
              >
                <div className={`w-20 h-20 ${winner.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-12`}>
                  <Trophy className="text-white w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold italic serif mb-2">¡Felicidades!</h2>
                <p className="text-stone-500 mb-8">¡{winner.name} ha ganado el juego! Reclama tu premio especial.</p>
                <button
                  onClick={resetGame}
                  className={`${buttonStyles.primary} w-full py-4 rounded-2xl`}
                >
                  Jugar de nuevo
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
