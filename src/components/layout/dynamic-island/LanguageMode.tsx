'use client';

import React from 'react';
import { SpringValue } from '@react-spring/web';
import { Globe, Check } from 'lucide-react';
import { useLanguage, getLanguageFlag, getLanguageName, type SupportedLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';

interface LanguageModeProps {
  languageSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onModeChange: (mode: 'compact' | 'expanded') => void;
}

export const LanguageMode: React.FC<LanguageModeProps> = ({
  onModeChange,
}) => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const { theme, classicMode } = useTheme();
  const languages: SupportedLanguage[] = ['cs', 'en', 'sk', 'uk', 'ru'];

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        muted: 'text-[var(--spsd-navy)]/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-50',
        suggestionBg: 'bg-blue-50 group-hover:bg-blue-100',
        borderColor: 'border-[var(--spsd-navy)]/10',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        muted: 'text-slate-100/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-500/10',
        suggestionBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        borderColor: 'border-white/10',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else {
      return {
        primary: 'text-white/90',
        secondary: 'text-white/70',
        muted: 'text-white/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-500/10',
        suggestionBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        borderColor: 'border-white/10',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    }
  };

  const colors = getTextColors();

  const handleLanguageSelect = (lang: SupportedLanguage) => {
    changeLanguage(lang);
    onModeChange('expanded');
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`px-3 sm:px-5 py-2.5 sm:py-3 border-b ${colors.borderColor}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Globe className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.accent} flex-shrink-0`} aria-hidden="true" />
          <span className={`${colors.primary} text-xs sm:text-sm font-medium`}>{tString('nav.selectLanguage', 'Vyberte jazyk')}</span>
          <button
            onClick={() => onModeChange('expanded')}
            aria-label={tString('common.close', 'Zavřít')}
            className={`ml-auto ${colors.muted} text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 hover:bg-white/10 transition-all ${colors.focusRing}`}
          >
            ESC
          </button>
        </div>
      </div>

      <div
        role="menu"
        aria-label={tString('nav.selectLanguage', 'Vyberte jazyk')}
        className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2"
      >
        {languages.map((lang) => {
          const isCurrent = currentLanguage === lang;
          return (
            <button
              key={lang}
              role="menuitemradio"
              aria-checked={isCurrent}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg ${colors.hoverBg} transition-all group text-left mb-1 ${colors.focusRing}`}
            >
              <div className={`p-1.5 sm:p-2 rounded-lg ${colors.suggestionBg} transition-colors`}>
                <span aria-hidden="true">{React.createElement(getLanguageFlag(lang), { size: 20 })}</span>
              </div>
              <div className="flex-1">
                <p className={`text-xs sm:text-sm ${colors.primary} font-medium`}>{getLanguageName(lang)}</p>
                <p className={`text-[10px] sm:text-xs ${colors.muted} uppercase`}>{lang}</p>
              </div>
              {isCurrent && (
                <div className={colors.accent} aria-hidden="true">
                  <Check className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
