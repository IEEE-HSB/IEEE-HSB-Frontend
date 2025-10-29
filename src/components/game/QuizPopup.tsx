import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';
import type { BuildingData } from './Game3DScene';

interface QuizPopupProps {
  building: BuildingData;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
}

export function QuizPopup({ building, onAnswer, onClose }: QuizPopupProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer === building.correctAnswer);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-lg w-full mx-4 border-2 shadow-2xl relative overflow-hidden"
        style={{ borderColor: building.color }}
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 opacity-10 blur-3xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${building.color}, transparent)` }}
        ></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Building Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: building.color }}
            >
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white">{building.name}</h3>
              <p className="text-white/60">Answer the question</p>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
            <p className="text-white text-center">{building.question}</p>
          </div>

          {/* Answers */}
          <div className="space-y-3 mb-6">
            {building.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  selectedAnswer === index
                    ? 'border-white bg-white/10 shadow-lg'
                    : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40'
                }`}
                style={selectedAnswer === index ? { borderColor: building.color } : {}}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedAnswer === index ? 'border-white' : 'border-white/40'
                    }`}
                    style={selectedAnswer === index ? { backgroundColor: building.color } : {}}
                  >
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-white">{answer}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full py-4 rounded-xl text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            style={{ 
              backgroundColor: selectedAnswer !== null ? building.color : '#666',
            }}
          >
            Submit Answer
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
