'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage } from './LanguageContext';

interface PreferencesContextType {
  theme: 'modern' | 'classic';
  classicMode: 'light' | 'dark';
  hasSeenWelcome: boolean;
  setTheme: (theme: 'modern' | 'classic') => void;
  setClassicMode: (mode: 'light' | 'dark') => void;
  setHasSeenWelcome: (seen: boolean) => void;
  savePreferences: (preferences: { language: SupportedLanguage }) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

const WELCOME_SEEN_KEY = 'welcome-dialog-seen';

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const welcomeSeen = localStorage.getItem(WELCOME_SEEN_KEY);
      setHasSeenWelcome(welcomeSeen === 'true');
      setIsInitialized(true);
    }
  }, []);

  const savePreferences = (_preferences: { language: SupportedLanguage }) => {
    setHasSeenWelcome(true);
    localStorage.setItem(WELCOME_SEEN_KEY, 'true');
  };

  const updateHasSeenWelcome = (seen: boolean) => {
    setHasSeenWelcome(seen);
    localStorage.setItem(WELCOME_SEEN_KEY, seen ? 'true' : 'false');
  };

  const noop = () => {};

  return (
    <PreferencesContext.Provider
      value={{
        theme: 'classic',
        classicMode: 'light',
        hasSeenWelcome: isInitialized ? hasSeenWelcome : true,
        setTheme: noop,
        setClassicMode: noop,
        setHasSeenWelcome: updateHasSeenWelcome,
        savePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
