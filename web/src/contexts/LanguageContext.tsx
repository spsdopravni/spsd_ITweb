'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SupportedLanguage = 'cs' | 'en' | 'sk' | 'uk' | 'ru';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  translations: Record<string, unknown>;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const LANGUAGE_STORAGE_KEY = 'preferred-language';

const languageNames: Record<SupportedLanguage, string> = {
  cs: 'Čeština',
  en: 'English',
  sk: 'Slovenčina',
  uk: 'Українська',
  ru: 'Русский',
};

const languageFlags: Record<SupportedLanguage, string> = {
  cs: '🇨🇿',
  en: '🇬🇧',
  sk: '🇸🇰',
  uk: '🇺🇦',
  ru: '🇷🇺',
};

export const getLanguageName = (lang: SupportedLanguage): string => languageNames[lang];
export const getLanguageFlag = (lang: SupportedLanguage): string => languageFlags[lang];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('cs');
  const [translations, setTranslations] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations for a specific language
  const loadTranslations = useCallback(async (lang: SupportedLanguage) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/locales/${lang}.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      } else {
        console.warn(`Failed to load translations for ${lang}, falling back to English`);
        if (lang !== 'en') {
          const fallbackResponse = await fetch('/locales/en.json');
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json();
            setTranslations(fallbackData);
          }
        }
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to empty translations
      setTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as SupportedLanguage;
    let initialLanguage: SupportedLanguage = 'cs'; // Default to Czech

    if (savedLanguage && ['cs', 'en', 'sk', 'uk', 'ru'].includes(savedLanguage)) {
      initialLanguage = savedLanguage;
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('cs')) initialLanguage = 'cs';
      else if (browserLang.startsWith('en')) initialLanguage = 'en';
      else if (browserLang.startsWith('sk')) initialLanguage = 'sk';
      else if (browserLang.startsWith('uk')) initialLanguage = 'uk';
      else if (browserLang.startsWith('ru')) initialLanguage = 'ru';
    }

    setCurrentLanguage(initialLanguage);
    loadTranslations(initialLanguage);
  }, [loadTranslations]);

  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    await loadTranslations(lang);
  }, [loadTranslations]);

  // Translation function with dot notation support
  const t = useCallback((key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  }, [translations]);

  const contextValue: LanguageContextType = {
    currentLanguage,
    translations,
    changeLanguage,
    t,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};