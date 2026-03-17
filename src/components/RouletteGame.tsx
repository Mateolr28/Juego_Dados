import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Plus, Trash2, RotateCcw, Play, Check, X } from 'lucide-react';
import { buttonStyles, cardStyles, inputStyles, listStyles } from '../styles/constants';

interface Segment {
  id: string;
  text: string;
  color: string;
}

/* COLORES DE LA RULETA */
const COLORS = [
  '#000000', 
  '#FF0000', 
  '#800000', 
  '#C9189E', 
  '#808000', 
  '#00FF00', 
  '#008000', 
  '#00FFFF',
  '#008080',
  '#0000FF',
  '#FF00FF',
  '#800080',
  '#5907B0', 
];

const STORAGE_KEY = 'custom_dice_game_roulette';

export function RouletteGame({ onBack }: { onBack: () => void }) {
  const [segments, setSegments] = useState<Segment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_segments');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', text: 'Opción 1', color: COLORS[0] },
      { id: '2', text: 'Opción 2', color: COLORS[1] },
      { id: '3', text: 'Opción 3', color: COLORS[2] },
      { id: '4', text: 'Opción 4', color: COLORS[3] },
    ];
  });

  const [newOption, setNewOption] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<Segment | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_segments', JSON.stringify(segments));
    drawWheel();
  }, [segments, rotation]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, size, size);

    if (segments.length === 0) {
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#f5f5f4';
      ctx.fill();
      return;
    }

    const sliceAngle = (Math.PI * 2) / segments.length;

    segments.forEach((segment, i) => {
      const angle = rotation + i * sliceAngle;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + sliceAngle);
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      
      // Truncate text if too long
      const text = segment.text.length > 15 ? segment.text.substring(0, 12) + '...' : segment.text;
      ctx.fillText(text, radius - 20, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(center, center, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const addOption = () => {
    if (newOption.trim()) {
      const newSegment: Segment = {
        id: Math.random().toString(36).substr(2, 9),
        text: newOption.trim(),
        color: COLORS[segments.length % COLORS.length]
      };
      setSegments([...segments, newSegment]);
      setNewOption('');
    }
  };

  const removeOption = (id: string) => {
    setSegments(segments.filter(s => s.id !== id));
  };

  const spin = () => {
    if (isSpinning || segments.length < 2) return;

    setIsSpinning(true);
    setWinner(null);
    setShowWinnerModal(false);

    const extraSpins = 5 + Math.random() * 5;
    const totalRotation = extraSpins * Math.PI * 2;
    const duration = 4000;
    const start = performance.now();
    const initialRotation = rotation;

    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = initialRotation + totalRotation * easeOut;
      
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // Calculate winner
        // The pointer is at the top (angle -Math.PI / 2)
        // We need to find which segment is at that position
        const normalizedRotation = (currentRotation % (Math.PI * 2));
        const sliceAngle = (Math.PI * 2) / segments.length;
        
        // The calculation needs to account for the fact that canvas angles start from 3 o'clock
        // and increase clockwise.
        // Pointer is at 12 o'clock (-PI/2)
        let winningIndex = Math.floor((Math.PI * 2 - (normalizedRotation % (Math.PI * 2)) + (Math.PI * 1.5)) % (Math.PI * 2) / sliceAngle);
        winningIndex = winningIndex % segments.length;
        
        setWinner(segments[winningIndex]);
        setShowWinnerModal(true);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleRemoveWinner = () => {
    if (winner) {
      setSegments(segments.filter(s => s.id !== winner.id));
      setShowWinnerModal(false);
      setWinner(null);
    }
  };

  const handleContinue = () => {
    setShowWinnerModal(false);
  };

  const resetWheel = () => {
    if (confirm('¿Restablecer la ruleta?')) {
      setSegments([
        { id: '1', text: 'Opción 1', color: COLORS[0] },
        { id: '2', text: 'Opción 2', color: COLORS[1] },
        { id: '3', text: 'Opción 3', color: COLORS[2] },
        { id: '4', text: 'Opción 4', color: COLORS[3] },
      ]);
      setWinner(null);
      setShowWinnerModal(false);
    }
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
        <h2 className="text-2xl font-bold italic serif">Ruleta</h2>
        <button
          onClick={resetWheel}
          className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          title="Reiniciar"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Wheel Section */}
        <div className="flex flex-col items-center justify-center relative">
          {/* Pointer */}
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-md" />
          </div>
          
          <div className="relative p-4 bg-white rounded-full shadow-2xl border-8 border-stone-100">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={spin}
              disabled={isSpinning || segments.length < 2}
              className={`${buttonStyles.primary} px-12 py-4 text-xl shadow-xl disabled:opacity-50`}
            >
              <Play size={24} fill="currentColor" />
              GIRAR
            </motion.button>
          </div>
        </div>

        {/* Options Section */}
        <div className={cardStyles.base}>
          <h3 className="text-xl font-bold italic serif mb-6">Opciones ({segments.length})</h3>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
              placeholder="Nueva opción..."
              className={inputStyles.base}
            />
            <button
              onClick={addOption}
              className={buttonStyles.add}
            >
              <Plus size={20} />
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {segments.map((segment) => (
                <motion.div
                  key={segment.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={listStyles.item}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm font-medium truncate">{segment.text}</span>
                  </div>
                  <button
                    onClick={() => removeOption(segment.id)}
                    className={listStyles.deleteBtn}
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {segments.length === 0 && (
              <p className="text-center text-stone-400 italic py-8">Agrega al menos 2 opciones para girar</p>
            )}
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      <AnimatePresence>
        {showWinnerModal && winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-white w-10 h-10" />
              </div>
              
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 block">Resultado</span>
              <h3 className="text-4xl font-black italic serif mb-8 text-stone-900">
                {winner.text}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleRemoveWinner}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-stone-100 hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-2 group-hover:bg-red-100 transition-colors">
                    <Trash2 className="text-red-500 w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-stone-600">ELIMINAR</span>
                  <span className="text-[10px] text-stone-400">No repetir</span>
                </button>

                <button
                  onClick={handleContinue}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-stone-100 hover:bg-stone-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center mb-2 group-hover:bg-stone-200 transition-colors">
                    <Play className="text-stone-900 w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-stone-600">CONTINUAR</span>
                  <span className="text-[10px] text-stone-400">Mantener</span>
                </button>
              </div>

              <button
                onClick={() => setShowWinnerModal(false)}
                className="mt-8 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
