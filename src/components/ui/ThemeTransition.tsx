'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme/useTheme';

interface ThemeTransitionProps {
  children: React.ReactNode;
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({ children }) => {
  const { theme, classicMode } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionKey, setTransitionKey] = useState(`${theme}-${classicMode}`);

  useEffect(() => {
    const newKey = `${theme}-${classicMode}`;
    if (newKey !== transitionKey) {
      setIsTransitioning(true);
      
      // Start transition after a short delay to ensure state is updated
      const timer = setTimeout(() => {
        setTransitionKey(newKey);
        setIsTransitioning(false);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [theme, classicMode, transitionKey]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};