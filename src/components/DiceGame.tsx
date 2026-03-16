import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Play, Timer, ArrowLeft, Trash2, RotateCcw } from 'lucide-react';
import type { Die, TimeDie } from '../types';
import { cardStyles, buttonStyles, inputStyles, listStyles } from '../styles/constants';

interface DieCardProps {
  die: Die;
  onUpdate: (id: string, values: string[]) => void;
  onRemove: (id: string) => void;
  isRolling: boolean;
}

function DieCard({ die, onUpdate, onRemove, isRolling }: DieCardProps) {
  const [inputValue, setInputValue] = useState('');

  const addValue = () => {
    if (inputValue.trim()) {
      onUpdate(die.id, [...die.values, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeValue = (index: number) => {
    const newValues = [...die.values];
    newValues.splice(index, 1);
    onUpdate(die.id, newValues);
  };

  return (
    <div className={cardStyles.base}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg italic serif">{die.name}</h3>
        <button
          onClick={() => onRemove(die.id)}
          className="p-2 text-stone-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 max-h-40 space-y-2 pr-2 custom-scrollbar">
        {die.values.map((val, idx) => (
          <div key={idx} className={listStyles.item}>
            <span className="text-sm font-medium truncate">{val}</span>
            <button
              onClick={() => removeValue(idx)}
              className={listStyles.deleteBtn}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {die.values.length === 0 && (
          <p className="text-xs text-stone-400 italic text-center py-4">Sin valores</p>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addValue()}
          placeholder="Añadir..."
          className={inputStyles.base}
        />
        <button
          onClick={addValue}
          className={buttonStyles.add}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-auto pt-4 border-t border-stone-100 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">Resultado</span>
        <motion.div
          animate={isRolling ? {
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 0.2 }
          } : {}}
          className={`text-2xl font-black h-12 flex items-center justify-center text-center w-full ${die.currentResult ? 'text-stone-900' : 'text-stone-200'}`}
        >
          {die.currentResult || '—'}
        </motion.div>
      </div>
    </div>
  );
}

interface TimeDieCardProps {
  timeDie: TimeDie;
  onUpdate: (values: number[]) => void;
  isRolling: boolean;
}

function TimeDieCard({ timeDie, onUpdate, isRolling }: TimeDieCardProps) {
  const [inputValue, setInputValue] = useState('');

  const addValue = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val) && val > 0) {
      onUpdate([...timeDie.values, val]);
      setInputValue('');
    }
  };

  const removeValue = (index: number) => {
    const newValues = [...timeDie.values];
    newValues.splice(index, 1);
    onUpdate(newValues);
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs === 0 ? `${mins}min` : `${mins}m ${secs}s`;
  };

  return (
    <div className={cardStyles.dark}>
      <div className="flex items-center gap-2 mb-4">
        <Timer size={20} className="text-stone-400" />
        <h3 className="font-bold text-lg italic serif">Dado de Tiempo</h3>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 max-h-40 space-y-2 pr-2 custom-scrollbar">
        {timeDie.values.map((val, idx) => (
          <div key={idx} className={listStyles.itemDark}>
            <span className="text-sm font-medium">{formatTime(val)}</span>
            <button
              onClick={() => removeValue(idx)}
              className={listStyles.deleteBtnDark}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {timeDie.values.length === 0 && (
          <p className="text-xs text-stone-500 italic text-center py-4">Sin tiempos</p>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addValue()}
          placeholder="Segs..."
          className={inputStyles.dark}
        />
        <button
          onClick={addValue}
          className={buttonStyles.addLight}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-auto pt-4 border-t border-stone-800 flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Tiempo Seleccionado</span>
        <motion.div
          animate={isRolling ? {
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.05, 1],
            transition: { repeat: Infinity, duration: 0.25 }
          } : {}}
          className={`text-3xl font-black h-12 flex items-center justify-center ${timeDie.currentResult ? 'text-white' : 'text-stone-800'}`}
        >
          {timeDie.currentResult ? formatTime(timeDie.currentResult) : '—'}
        </motion.div>
      </div>
    </div>
  );
}

const STORAGE_KEY_DICE = 'custom_dice_game_dice_v2';
const STORAGE_KEY_TIME = 'custom_dice_game_time_v2';

const DEFAULT_DICE: Die[] = [
  {
    id: 'default-1',
    name: 'Acción',
    values: ['Correr', 'Saltar', 'Bailar', 'Cantar', 'Girar'],
    currentResult: null
  },
  {
    id: 'default-2',
    name: 'Lugar',
    values: ['Cocina', 'Sala', 'Patio', 'Habitación', 'Baño'],
    currentResult: null
  }
];

const DEFAULT_TIME_VALUES = [30, 45, 60, 120];

export function DiceGame({ onBack }: { onBack: () => void }) {
  const [dice, setDice] = useState<Die[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_DICE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved dice", e);
      }
    }
    return DEFAULT_DICE;
  });

  const [timeDie, setTimeDie] = useState<TimeDie>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TIME);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved time values", e);
      }
    }
    return {
      values: DEFAULT_TIME_VALUES,
      currentResult: null
    };
  });

  const [isRolling, setIsRolling] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showFinishedMessage, setShowFinishedMessage] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const bellAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DICE, JSON.stringify(dice));
  }, [dice]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TIME, JSON.stringify(timeDie));
  }, [timeDie]);

  const resetToDefault = () => {
    if (confirm('¿Estás seguro de que quieres restablecer todos los dados a los valores predeterminados?')) {
      setDice(DEFAULT_DICE);
      setTimeDie({
        values: DEFAULT_TIME_VALUES,
        currentResult: null
      });
      localStorage.removeItem(STORAGE_KEY_DICE);
      localStorage.removeItem(STORAGE_KEY_TIME);
    }
  };

  useEffect(() => {
    // Initialize bell sound
    // Using a public bell sound URL
    bellAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const addDie = () => {
    const newDie: Die = {
      id: Math.random().toString(36).substr(2, 9),
      name: `Dado ${dice.length + 1}`,
      values: [],
      currentResult: null
    };
    setDice([...dice, newDie]);
  };

  const updateDie = (id: string, values: string[]) => {
    setDice(dice.map(d => d.id === id ? { ...d, values } : d));
  };

  const removeDie = (id: string) => {
    setDice(dice.filter(d => d.id !== id));
  };

  const updateTimeDie = (values: number[]) => {
    setTimeDie({ ...timeDie, values });
  };

  const play = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setShowFinishedMessage(false);
    setIsTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);

    // Simulate rolling for 1.5 seconds
    setTimeout(() => {
      setDice(prevDice => prevDice.map(d => ({
        ...d,
        currentResult: d.values.length > 0 ? d.values[Math.floor(Math.random() * d.values.length)] : null
      })));

      setTimeDie(prev => ({
        ...prev,
        currentResult: prev.values.length > 0 ? prev.values[Math.floor(Math.random() * prev.values.length)] : null
      }));

      setIsRolling(false);
    }, 1500);
  };

  const startTimer = () => {
    if (!timeDie.currentResult || isTimerActive) return;
    
    setTimeLeft(timeDie.currentResult);
    setIsTimerActive(true);
    setShowFinishedMessage(false);

    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsTimerActive(false);
          setShowFinishedMessage(true);
          bellAudioRef.current?.play().catch(e => console.log("Audio play failed", e));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen flex flex-col">
      <header className="flex justify-between items-center mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <h2 className="text-2xl font-bold italic serif">Configuración de Dados</h2>
        <button
          onClick={resetToDefault}
          className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          title="Restablecer predeterminados"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Time Die is always first */}
          <TimeDieCard
            timeDie={timeDie}
            onUpdate={updateTimeDie}
            isRolling={isRolling}
          />

          {/* Custom Dice */}
          <AnimatePresence mode="popLayout">
            {dice.map(die => (
              <motion.div
                key={die.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <DieCard
                  die={die}
                  onUpdate={updateDie}
                  onRemove={removeDie}
                  isRolling={isRolling}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Die Button Card */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addDie}
            className={cardStyles.dashed}
          >
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-2">
              <Plus size={24} />
            </div>
            <span className="font-semibold">Agregar dado</span>
          </motion.button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="sticky bottom-4 md:bottom-8 left-0 right-0 flex flex-col items-center gap-4 md:gap-6 z-50">
        <AnimatePresence>
          {(timeLeft !== null || showFinishedMessage) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl flex items-center gap-4 md:gap-6 border ${showFinishedMessage ? 'bg-red-500 text-white border-red-400' : 'bg-white text-stone-900 border-stone-100'}`}
            >
              {showFinishedMessage ? (
                <div className="flex items-center gap-3">
                  <span className="text-lg md:text-xl font-black uppercase tracking-tighter">Tiempo Finalizado</span>
                  <button 
                    onClick={() => setShowFinishedMessage(false)}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold opacity-50">Contador</span>
                    <span className="text-2xl md:text-3xl font-black tabular-nums">{formatTimer(timeLeft || 0)}</span>
                  </div>
                  <div className="w-px h-6 md:h-8 bg-stone-200" />
                  <button
                    onClick={() => {
                      setIsTimerActive(false);
                      if (timerRef.current) clearInterval(timerRef.current);
                      setTimeLeft(null);
                    }}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 md:gap-4 p-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full shadow-lg">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={play}
            disabled={isRolling}
            className={buttonStyles.primary}
          >
            <Play size={18} fill="currentColor" className="md:w-5 md:h-5" />
            JUGAR
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTimer}
            disabled={!timeDie.currentResult || isTimerActive || isRolling}
            className={buttonStyles.secondary}
          >
            <Timer size={18} className="md:w-5 md:h-5" />
            <span className="hidden min-[400px]:inline">INICIAR</span> CONTADOR
          </motion.button>
        </div>
      </div>
    </div>
  );
}
