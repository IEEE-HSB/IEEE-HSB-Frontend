import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FeedbackPopupProps {
  type: 'success' | 'error';
  message: string;
}

export function FeedbackPopup({ type, message }: FeedbackPopupProps) {
  const isSuccess = type === 'success';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="absolute top-24 left-1/2 -translate-x-1/2 z-40"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        className={`rounded-2xl p-6 shadow-2xl backdrop-blur-lg border-2 ${
          isSuccess
            ? 'bg-green-600 border-emerald-300'
            : 'bg-red-800 border-red-300'
        }`}
      >
        <div className="flex items-center gap-4">
          {isSuccess ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CheckCircle2 className="w-8 h-8 text-white" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 }}
            >
              <XCircle className="w-8 h-8 text-white" />
            </motion.div>
          )}
          <div>
            <p className="text-white">{message}</p>
          </div>
        </div>

        {/* Animated progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3, ease: 'linear' }}
          className="h-1 bg-white/30 rounded-full mt-4 origin-left"
        ></motion.div>
      </motion.div>

      {/* Confetti effect for success */}
      {isSuccess && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: 1 
              }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: Math.random() * 100 + 50,
                opacity: 0,
                scale: 0
              }}
              transition={{
                duration: 1,
                delay: i * 0.05,
                ease: 'easeOut'
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FFD100', '#00629B', '#009CA6', '#ffffff'][i % 4]
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
