'use client';

import React from 'react';
import { animated, SpringValue } from '@react-spring/web';
import { useLanguage, getLanguageFlag, getLanguageName, type SupportedLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  showLanguageMenu: boolean;
  setShowLanguageMenu: (show: boolean) => void;
  languageMenuSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  showLanguageMenu,
  setShowLanguageMenu,
  languageMenuSpring
}) => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const languages: SupportedLanguage[] = ['cs', 'en', 'uk', 'ru'];
  

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowLanguageMenu(!showLanguageMenu);
        }}
        className="flex items-center gap-1 p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110"
      >
        <span className="text-lg cursor-pointer">{getLanguageFlag(currentLanguage)}</span>
      </button>
      
      {showLanguageMenu && (
        <animated.div 
          style={{
            ...languageMenuSpring,
            position: 'fixed',
            top: '70px',
            right: '20px'
          }}
          className="glass-dark rounded-xl overflow-hidden z-[100] min-w-[120px] shadow-xl border border-white/20"
        >
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                changeLanguage(lang);
                setShowLanguageMenu(false);
              }}
              className={`
                w-full px-3 py-2 text-left flex items-center gap-2
                hover:bg-white/10 transition-colors text-sm
                ${currentLanguage === lang ? 'bg-purple-500/20 text-purple-300' : 'text-gray-300'}
              `}
            >
              <span>{getLanguageFlag(lang)}</span>
              <span>{getLanguageName(lang)}</span>
            </button>
          ))}
        </animated.div>
      )}
    </div>
  );
};