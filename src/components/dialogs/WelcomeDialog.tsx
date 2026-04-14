'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, SupportedLanguage, getLanguageName, getLanguageFlag } from '@/contexts/LanguageContext';
import { Check, Globe, BookOpen, Zap, ArrowRight, Sun, Moon } from 'lucide-react';

interface WelcomeDialogProps {
  onComplete: (preferences: { theme: 'modern' | 'classic'; language: SupportedLanguage; classicMode?: 'light' | 'dark' }) => void;
}

export const WelcomeDialog: React.FC<WelcomeDialogProps> = ({ onComplete }) => {
  const { changeLanguage, t } = useLanguage();
  const [selectedTheme, setSelectedTheme] = useState<'modern' | 'classic' | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const [step, setStep] = useState<'language' | 'theme'>('language');
  const [previewTheme, setPreviewTheme] = useState<'modern' | 'classic' | null>(null);
  const [classicMode, setClassicMode] = useState<'light' | 'dark'>('light');

  const languages: SupportedLanguage[] = ['cs', 'en', 'sk', 'uk', 'ru'];

  useEffect(() => {
    // Disable scrolling when dialog is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    changeLanguage(lang);
  };

  const handleThemeSelect = (theme: 'modern' | 'classic') => {
    if (selectedTheme !== theme) {
      setSelectedTheme(theme);
      setPreviewTheme(theme);
    }
  };

  const handleLanguageContinue = () => {
    if (selectedLanguage) {
      setStep('theme');
    }
  };

  const handleThemeContinue = () => {
    if (selectedTheme && selectedLanguage) {
      onComplete({ 
        theme: selectedTheme, 
        language: selectedLanguage, 
        classicMode: selectedTheme === 'classic' ? classicMode : undefined 
      });
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${
      step === 'theme' && previewTheme === 'modern'
        ? 'bg-gradient-to-br from-gray-900 via-purple-900/20 to-black'
        : step === 'theme' && previewTheme === 'classic' && classicMode === 'dark'
        ? 'bg-gray-900'
        : 'bg-white'
    }`}>
      {/* Classic SPSD gradient accent bar at top */}
      {(!previewTheme || previewTheme === 'classic' || step === 'language') && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--spsd-navy)] via-[var(--spsd-red)] to-[var(--spsd-orange)]" />
      )}
      
      {/* Modern animated gradient orbs for modern theme */}
      {step === 'theme' && previewTheme === 'modern' && (
        <>
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-75" />
        </>
      )}
      
      <AnimatePresence mode="wait">
        {step === 'language' && (
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
                      <span className="font-medium text-gray-800">{getLanguageName(lang)}</span>
                    </div>
                    {selectedLanguage === lang && (
                      <Check className="w-5 h-5 text-[var(--spsd-red)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleLanguageContinue}
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
        )}

        {step === 'theme' && (
          <motion.div
            key="theme"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-lg p-8 rounded-lg transition-colors duration-500 relative ${
              previewTheme === 'modern' 
                ? 'bg-gradient-to-br from-gray-900 to-black border-2 border-purple-500/30 shadow-[0_0_40px_rgba(139,92,246,0.3)]'
                : previewTheme === 'classic' && classicMode === 'dark'
                ? 'bg-gray-800 shadow-2xl border border-gray-700'
                : 'bg-white shadow-2xl border border-gray-200'
            }`}
          >
            <div className="text-center mb-8 relative">
              <div className="flex justify-center mb-4">
                <div
                  className={`rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${
                    previewTheme === 'modern'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/30'
                      : classicMode === 'dark'
                      ? 'bg-gradient-to-br from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] shadow-[var(--spsd-navy)]/30'
                      : 'bg-[var(--spsd-navy)] shadow-[var(--spsd-navy)]/20'
                  }`}
                  style={{ width: '3.5rem', height: '3.5rem' }}
                >
                  {previewTheme === 'modern' ? (
                    <Zap className="w-7 h-7 text-white" />
                  ) : (
                    <BookOpen className="w-7 h-7 text-white" />
                  )}
                </div>
              </div>
              <h2 className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
                previewTheme === 'modern' 
                  ? 'text-white' 
                  : classicMode === 'dark'
                  ? 'text-white'
                  : 'text-[var(--spsd-navy)]'
              }`}>
                {t('welcome.chooseStyle', 'Vyberte styl')}
              </h2>
              <p className={`transition-colors duration-500 ${
                previewTheme === 'modern' 
                  ? 'text-gray-300' 
                  : classicMode === 'dark'
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}>
                {t('welcome.selectTheme', 'Vyberte preferovaný vzhled')}
              </p>
            </div>

            {/* Dark/Light mode toggle for Classic theme */}
            {selectedTheme === 'classic' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6"
              >
                <div className={`inline-flex p-1 rounded-full ${
                  classicMode === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <button
                    onClick={() => setClassicMode('light')}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                      classicMode === 'light'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : classicMode === 'dark'
                        ? 'text-gray-400 hover:text-gray-300'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('welcome.light', 'Světlý')}</span>
                  </button>
                  <button
                    onClick={() => setClassicMode('dark')}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
                      classicMode === 'dark'
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('welcome.dark', 'Tmavý')}</span>
                  </button>
                </div>
              </motion.div>
            )}

            <div className="space-y-3 mb-6 relative">
              <button
                onClick={() => handleThemeSelect('classic')}
                className={`w-full p-5 rounded-lg border-2 transition-all ${
                  previewTheme === 'modern'
                    ? selectedTheme === 'classic'
                      ? 'border-blue-500 bg-white/10'
                      : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    : previewTheme === 'classic' && classicMode === 'dark'
                    ? selectedTheme === 'classic'
                      ? 'border-[var(--spsd-red)] bg-[var(--spsd-red)]/10'
                      : 'border-gray-600 hover:border-[var(--spsd-navy-light)] hover:bg-gray-700'
                    : selectedTheme === 'classic'
                      ? 'border-[var(--spsd-red)] bg-red-50'
                      : 'border-gray-200 hover:border-[var(--spsd-navy)] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--spsd-navy)] flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-semibold ${
                        previewTheme === 'modern' 
                          ? 'text-white' 
                          : classicMode === 'dark'
                          ? 'text-white'
                          : 'text-gray-800'
                      }`}>
                        {t('welcome.classic', 'Klasický')}
                      </h3>
                      <p className={`text-sm ${
                        previewTheme === 'modern' 
                          ? 'text-gray-300' 
                          : classicMode === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}>
                        {t('welcome.classicDesc', 'Tradiční, čistý, soustředěný')}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full bg-[var(--spsd-navy)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--spsd-red)]" />
                        <div className="w-3 h-3 rounded-full bg-[var(--spsd-orange)]" />
                      </div>
                    </div>
                  </div>
                  {selectedTheme === 'classic' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-5 h-5 ${
                        previewTheme === 'modern' ? 'text-green-400' : 'text-[var(--spsd-red)]'
                      }`}
                    >
                      <Check />
                    </motion.div>
                  )}
                </div>
              </button>

              <button
                onClick={() => handleThemeSelect('modern')}
                className={`w-full p-5 rounded-lg border-2 transition-all ${
                  previewTheme === 'modern'
                    ? selectedTheme === 'modern'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-white/20 hover:border-purple-400 hover:bg-purple-500/10'
                    : previewTheme === 'classic' && classicMode === 'dark'
                    ? selectedTheme === 'modern'
                      ? 'border-[var(--spsd-red)] bg-[var(--spsd-red)]/10'
                      : 'border-gray-600 hover:border-[var(--spsd-navy-light)] hover:bg-gray-700'
                    : selectedTheme === 'modern'
                      ? 'border-[var(--spsd-red)] bg-red-50'
                      : 'border-gray-200 hover:border-[var(--spsd-navy)] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className={`text-lg font-semibold ${
                        previewTheme === 'modern' 
                          ? 'text-white' 
                          : classicMode === 'dark'
                          ? 'text-white'
                          : 'text-gray-800'
                      }`}>
                        {t('welcome.modern', 'Moderní')}
                      </h3>
                      <p className={`text-sm ${
                        previewTheme === 'modern' 
                          ? 'text-gray-300' 
                          : classicMode === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}>
                        {t('welcome.modernDesc', 'Dynamický, animovaný, futuristický')}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <div className="w-3 h-3 rounded-full bg-pink-500" />
                      </div>
                    </div>
                  </div>
                  {selectedTheme === 'modern' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-5 h-5 ${
                        previewTheme === 'modern' ? 'text-green-400' : 'text-[var(--spsd-red)]'
                      }`}
                    >
                      <Check />
                    </motion.div>
                  )}
                </div>
              </button>
            </div>

            <button
              onClick={handleThemeContinue}
              disabled={!selectedTheme}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2 relative ${
                previewTheme === 'modern'
                  ? selectedTheme
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-gray-400 cursor-not-allowed border border-white/20'
                  : previewTheme === 'classic' && classicMode === 'dark'
                  ? selectedTheme
                    ? 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] text-white hover:from-[var(--spsd-navy-light)] hover:to-[var(--spsd-red)]'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : selectedTheme
                    ? 'bg-[var(--spsd-navy)] text-white hover:bg-[var(--spsd-navy-light)]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('welcome.continue', 'Pokračovat')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};