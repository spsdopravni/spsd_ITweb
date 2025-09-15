'use client';

import React from 'react';
import { animated, SpringValue } from '@react-spring/web';
import { Globe, Check } from 'lucide-react';
import { useLanguage, getLanguageFlag, getLanguageName, type SupportedLanguage } from '@/contexts/LanguageContext';

interface LanguageModeProps {
  languageSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onModeChange: (mode: 'compact' | 'expanded') => void;
  onEscape: (e: React.KeyboardEvent) => void;
}

export const LanguageMode: React.FC<LanguageModeProps> = ({
  languageSpring,
  onModeChange,
  onEscape
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const languages: SupportedLanguage[] = ['cs', 'en', 'uk', 'ru'];

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    onModeChange('expanded');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-b border-white/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <Globe className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-purple-400 flex-shrink-0" />
          <span className="text-white text-xs sm:text-sm font-medium">Select Language</span>
          <button
            onClick={() => onModeChange('expanded')}
            className="ml-auto text-white/40 hover:text-white/60 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 hover:bg-white/10 transition-all"
          >
            ESC
          </button>
        </div>
      </div>
      
<div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
  {languages.map((lang) => (
    <button
      key={lang}
      onClick={() => handleLanguageSelect(lang)}
      className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg hover:bg-white/10 transition-all group text-left mb-1"
    >
      <div className="p-1.5 sm:p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
        <span className="text-base sm:text-lg">{getLanguageFlag(lang)}</span>
      </div>
      <div className="flex-1">
        <p className="text-xs sm:text-sm text-white/90 font-medium">{getLanguageName(lang)}</p>
        <p className="text-[10px] sm:text-xs text-white/50 uppercase">{lang}</p>
      </div>
      {currentLanguage === lang && (
        <div className="text-purple-400">
          <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
        </div>
      )}
    </button>
  ))}
</div>
    </div>
  );
};