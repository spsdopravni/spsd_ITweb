'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  useLanguage,
  SupportedLanguage,
  getLanguageName,
  getLanguageFlag,
} from '@/contexts/LanguageContext';
import { Check, Globe, ArrowRight } from 'lucide-react';

interface WelcomeDialogProps {
  onComplete: (preferences: { language: SupportedLanguage }) => void;
}

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ onComplete }) => {
  const { changeLanguage, t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);

  const languages: SupportedLanguage[] = ['cs', 'en', 'sk', 'uk', 'ru'];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      onComplete({ language: selectedLanguage });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      {/* SPSD gradient accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--spsd-navy)] via-[var(--spsd-red)] to-[var(--spsd-orange)]" />

      <AnimatePresence mode="wait">
        <motion.div
          key="language"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl border border-gray-200"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div
                className="bg-[var(--spsd-navy)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--spsd-navy)]/20"
                style={{ width: '3.5rem', height: '3.5rem' }}
              >
                <Globe className="w-7 h-7 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[var(--spsd-navy)] mb-1.5 tracking-tight">
              {t('welcome.selectLanguage', 'Vyberte jazyk')}
            </h2>
            <p className="text-sm text-gray-500">Select your language</p>
          </div>

          <div className="space-y-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageSelect(lang)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedLanguage === lang
                    ? 'border-[var(--spsd-red)] bg-red-50'
                    : 'border-gray-200 hover:border-[var(--spsd-navy)] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getLanguageFlag(lang)}</span>
                    <span className="font-medium text-gray-800">
                      {getLanguageName(lang)}
                    </span>
                  </div>
                  {selectedLanguage === lang && (
                    <Check className="w-5 h-5 text-[var(--spsd-red)]" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedLanguage}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              selectedLanguage
                ? 'bg-[var(--spsd-navy)] text-white hover:bg-[var(--spsd-navy-light)]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {t('welcome.continue', 'Pokračovat')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
