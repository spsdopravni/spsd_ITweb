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
  savePreferences: (preferences: { theme: 'modern' | 'classic'; language: SupportedLanguage; classicMode?: 'light' | 'dark' }) => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};

const PREFERENCES_KEY = 'user-preferences';
const WELCOME_SEEN_KEY = 'welcome-dialog-seen';

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'modern' | 'classic'>('classic');
  const [classicMode, setClassicMode] = useState<'light' | 'dark'>('light');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPreferences = localStorage.getItem(PREFERENCES_KEY);
      const welcomeSeen = localStorage.getItem(WELCOME_SEEN_KEY);
      
      if (savedPreferences) {
        try {
          const prefs = JSON.parse(savedPreferences);
          if (prefs.theme) {
            setTheme(prefs.theme);
          }
          if (prefs.classicMode) {
            setClassicMode(prefs.classicMode);
          }
        } catch (error) {
          console.error('Error parsing preferences:', error);
        }
      }
      
      setHasSeenWelcome(welcomeSeen === 'true');
      setIsInitialized(true);
    }
  }, []);

  const savePreferences = (preferences: { theme: 'modern' | 'classic'; language: SupportedLanguage; classicMode?: 'light' | 'dark' }) => {
    setTheme(preferences.theme);
    if (preferences.classicMode) {
      setClassicMode(preferences.classicMode);
    }
    setHasSeenWelcome(true);
    
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    localStorage.setItem(WELCOME_SEEN_KEY, 'true');
  };

  const updateTheme = (newTheme: 'modern' | 'classic') => {
    setTheme(newTheme);
    const currentPrefs = localStorage.getItem(PREFERENCES_KEY);
    if (currentPrefs) {
      try {
        const prefs = JSON.parse(currentPrefs);
        prefs.theme = newTheme;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
      } catch (error) {
        console.error('Error updating theme:', error);
      }
    }
  };

  const updateClassicMode = (newMode: 'light' | 'dark') => {
    setClassicMode(newMode);
    const currentPrefs = localStorage.getItem(PREFERENCES_KEY);
    if (currentPrefs) {
      try {
        const prefs = JSON.parse(currentPrefs);
        prefs.classicMode = newMode;
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
      } catch (error) {
        console.error('Error updating classic mode:', error);
      }
    }
  };

  const updateHasSeenWelcome = (seen: boolean) => {
    setHasSeenWelcome(seen);
    localStorage.setItem(WELCOME_SEEN_KEY, seen ? 'true' : 'false');
  };

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        classicMode,
        hasSeenWelcome: isInitialized ? hasSeenWelcome : true,
        setTheme: updateTheme,
        setClassicMode: updateClassicMode,
        setHasSeenWelcome: updateHasSeenWelcome,
        savePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};