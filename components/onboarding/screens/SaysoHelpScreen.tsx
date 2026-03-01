'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SaysoHelpScreenProps {
  onReady: () => void;
}

export function SaysoHelpScreen({ onReady }: SaysoHelpScreenProps) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
      onReady();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <div className="text-center py-4">
      {/* Status text & progress */}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Bolt icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#2367EE] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 512 512" fill="none">
                <path
                  d="M294.4 25.6L115.2 281.6H256L217.6 486.4L396.8 230.4H256L294.4 25.6Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="20"
                />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#1D4871]/60">
              Sayso is activating...
            </p>
            <div className="w-full max-w-xs h-2 rounded-full bg-[#2367EE]/15 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#2367EE]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-3"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D4871]">
              Sayso is a great fit for you!
            </h2>
            <p className="text-base text-[#1D4871]/60 font-medium">
              Sayso can help you
            </p>
            <div className="mt-2 flex flex-col items-center gap-2">
              {[
                'Book more appointments',
                'Ask better questions on calls',
                'Schedule more calls with confidence',
              ].map((text) => (
                <span key={text} className="text-base font-semibold text-[#1D4871]">
                  {text}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
