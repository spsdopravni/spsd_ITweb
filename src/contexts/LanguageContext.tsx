'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SupportedLanguage = 'cs' | 'en' | 'sk' | 'uk' | 'ru';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  translations: Record<string, unknown>;
  changeLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string | string[];
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

const FlagCZ = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 640 480" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="640" height="480" fill="#d7141a" />
    <rect width="640" height="240" fill="#fff" />
    <path d="M0 0l320 240L0 480z" fill="#11457e" />
  </svg>
);
const FlagGB = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 640 480" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="640" height="480" fill="#012169" />
    <path d="M0 0l640 480M640 0L0 480" stroke="#fff" strokeWidth="80" />
    <path d="M0 0l640 480M640 0L0 480" stroke="#C8102E" strokeWidth="53" clipPath="url(#gbClip)" />
    <clipPath id="gbClip"><path d="M320 0v240H0v60h320v180h60V300h260v-60H380V0z" /></clipPath>
    <path d="M320 0v480M0 240h640" stroke="#fff" strokeWidth="120" />
    <path d="M320 0v480M0 240h640" stroke="#C8102E" strokeWidth="72" />
  </svg>
);
const FlagSK = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 640 480" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="640" height="480" fill="#ee1c25" />
    <rect width="640" height="320" fill="#0b4ea2" />
    <rect width="640" height="160" fill="#fff" />
    <path d="M103 112c0 72 36 138 113 170 77-32 113-98 113-170H103z" fill="#fff" />
    <path d="M113 120c0 64 32 126 103 156 71-30 103-92 103-156H113z" fill="#ee1c25" />
    <path d="M160 208h112M216 152v112" stroke="#fff" strokeWidth="14" />
    <path d="M175 280c14 12 28 18 41 20 13-2 27-8 41-20" fill="none" stroke="#0b4ea2" strokeWidth="10" />
  </svg>
);
const FlagUA = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 640 480" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="640" height="240" fill="#005bbb" />
    <rect width="640" height="240" y="240" fill="#ffd500" />
  </svg>
);
const FlagRU = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 640 480" style={{ borderRadius: 3, display: 'block' }}>
    <rect width="640" height="160" fill="#fff" />
    <rect width="640" height="160" y="160" fill="#0039a6" />
    <rect width="640" height="160" y="320" fill="#d52b1e" />
  </svg>
);

const languageFlags: Record<SupportedLanguage, React.FC<{ size?: number }>> = {
  cs: FlagCZ,
  en: FlagGB,
  sk: FlagSK,
  uk: FlagUA,
  ru: FlagRU,
};

export const getLanguageName = (lang: SupportedLanguage): string => languageNames[lang];
export const getLanguageFlag = (lang: SupportedLanguage): React.FC<{ size?: number }> => languageFlags[lang];

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
  const t = useCallback((key: string, fallback?: string): string | string[] => {
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback || key;
      }
    }
    
    // Return arrays as is, strings as is, or fallback
    if (Array.isArray(value)) {
      return value;
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