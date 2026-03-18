import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Plus, Trash2, Users } from 'lucide-react';
import { buttonStyles, cardStyles, inputStyles } from '../styles/constants';

interface BottleGameProps {
  onBack: () => void;
}

export function BottleGame({ onBack }: BottleGameProps) {
  const [participants, setParticipants] = useState<string[]>(() => {
    const saved = localStorage.getItem('bottle_game_participants');
    return saved ? JSON.parse(saved) : ['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4'];
  });
  const [newParticipant, setNewParticipant] = useState('');
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const saveParticipants = (newParticipants: string[]) => {
    setParticipants(newParticipants);
    localStorage.setItem('bottle_game_participants', JSON.stringify(newParticipants));
  };

  const addParticipant = () => {
    if (newParticipant.trim() && participants.length < 12) {
      saveParticipants([...participants, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 2) {
      const updated = participants.filter((_, i) => i !== index);
      saveParticipants(updated);
    }
  };

  const spinBottle = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    
    // Random rotation between 5 and 10 full turns + random angle
    const extraRotation = 1800 + Math.random() * 1800;
    const newRotation = rotation + extraRotation;
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      // Calculate who it points to
      // The bottle points "up" (0 degrees)
      // We need to find which participant is at the top after rotation
      // Normalize rotation to 0-360
      const normalizedRotation = newRotation % 360;
      
      // The participants are distributed evenly around the circle
      // Index 0 is at the top (0 degrees)
      // The bottle rotates clockwise, so if it rotates 90 degrees, it points to someone 90 degrees counter-clockwise from the top?
      // Actually, let's just use the angle to find the index.
      // Each participant takes 360 / length degrees.
      const segmentSize = 360 / participants.length;
      
      // The bottle points to (360 - normalizedRotation) index
      const winnerIndex = Math.floor(((360 - (normalizedRotation % 360)) % 360) / segmentSize);
      setWinner(participants[winnerIndex]);
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-md border-bottom border-stone-200 p-4 flex items-center justify-between">
        <button onClick={onBack} className={buttonStyles.secondary}>
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Volver</span>
        </button>
        <h2 className="text-xl font-bold italic serif">Juego de la Botella</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <main className="flex-1 p-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Game Area */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center bg-white rounded-full shadow-inner border border-stone-100 overflow-hidden">
          {/* Participants around the circle */}
          {participants.map((name, index) => {
            const angle = (index * 360) / participants.length;
            const radius = 40; // percentage
            return (
              <div
                key={index}
                className="absolute text-center transition-all duration-500"
                style={{
                  transform: `rotate(${angle}deg) translateY(-${radius}%) rotate(-${angle}deg)`,
                  width: '80px',
                }}
              >
                <span className={`text-xs font-bold px-2 py-1 rounded-full truncate block max-w-full ${winner === name ? 'bg-stone-900 text-white scale-110 shadow-lg' : 'bg-stone-100 text-stone-600'}`}>
                  {name}
                </span>
              </div>
            );
          })}

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
                <div className="w-1 h-2 bg-red-500 rounded-full animate-pulse" />
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
            className={`${buttonStyles.primary} px-12 py-4 text-lg rounded-full shadow-xl disabled:opacity-50`}
          >
            {isSpinning ? 'Girando...' : '¡Girar Botella!'}
            <Play size={20} fill="currentColor" />
          </button>

          <AnimatePresence>
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-stone-900 text-white rounded-2xl shadow-2xl"
              >
                <p className="text-sm uppercase tracking-widest opacity-70 mb-1">Le toca a:</p>
                <h3 className="text-3xl font-black italic serif">{winner}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Participants List */}
        <div className={cardStyles.base}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-stone-400" size={20} />
            <h3 className="font-bold">Participantes ({participants.length}/12)</h3>
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
              placeholder="Nombre del jugador..."
              className={inputStyles.base}
              maxLength={15}
            />
            <button
              onClick={addParticipant}
              disabled={participants.length >= 12}
              className={buttonStyles.secondary}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {participants.map((name, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-stone-50 rounded-xl border border-stone-100 group">
                <span className="text-sm font-medium truncate">{name}</span>
                <button
                  onClick={() => removeParticipant(index)}
                  className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
