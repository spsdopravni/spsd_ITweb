'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Palette, Check, ChevronRight, ChevronDown } from 'lucide-react';
import { THEME_CONFIGS } from '@/lib/theme/ThemeConfig';
import { useTheme } from '@/lib/theme/useTheme';
import type { ThemeType, ClassicModeType } from '@/lib/theme/ThemeConfig';

interface ThemeModeProps {
  onClose: () => void;
}

export const ThemeMode: React.FC<ThemeModeProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const { theme, classicMode, switchTheme, isCurrentTheme } = useTheme();
  const [expandedTheme, setExpandedTheme] = useState<ThemeType | null>(null);

  // Theme-aware colors
  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        muted: 'text-[var(--spsd-navy)]/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-50',
        borderColor: 'border-[var(--spsd-navy)]/10',
        themeHover: 'hover:text-blue-600'
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        muted: 'text-slate-100/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-500/10',
        borderColor: 'border-white/10',
        themeHover: 'hover:text-blue-300'
      };
    } else {
      return {
        primary: 'text-white',
        secondary: 'text-white/70',
        muted: 'text-white/50',
        accent: 'text-[var(--spsd-orange)]',
        hoverBg: 'hover:bg-blue-500/10',
        borderColor: 'border-white/10',
        themeHover: 'hover:text-blue-300'
      };
    }
  };

  const colors = getTextColors();

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const handleThemeSelect = (themeId: ThemeType, variantId?: string) => {
    switchTheme(themeId, variantId);
    setTimeout(onClose, 300);
  };

  const toggleExpanded = (themeId: ThemeType) => {
    setExpandedTheme(expandedTheme === themeId ? null : themeId);
  };

  return (
    <div className="h-full flex flex-col">
      <div className={`px-3 sm:px-5 py-2.5 sm:py-3 border-b ${colors.borderColor}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Palette className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.accent} flex-shrink-0`} />
          <span className={`${colors.primary} text-xs sm:text-sm font-medium`}>{t('theme.title', 'Choose Theme')}</span>
          <button
            onClick={onClose}
            className={`ml-auto ${colors.muted} hover:${colors.secondary} text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 hover:bg-white/10 transition-all`}
          >
            ESC
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
        {Object.values(THEME_CONFIGS).map((themeConfig) => (
          <div key={themeConfig.id} className="mb-2">
            {/* Main theme button */}
            <div className="flex">
              <button
                onClick={() => {
                  if (themeConfig.variants.length === 1) {
                    handleThemeSelect(themeConfig.id);
                  } else {
                    toggleExpanded(themeConfig.id);
                  }
                }}
                className={`flex-1 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-3 rounded-lg ${colors.hoverBg} transition-all group text-left`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <themeConfig.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.primary}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`${colors.primary} text-xs sm:text-sm font-medium ${colors.themeHover} transition-colors`}>
                        {tString(`theme.${themeConfig.id}`, themeConfig.name)}
                      </div>
                      <div className={`${colors.muted} text-[10px] sm:text-xs`}>
                        {tString(`theme.${themeConfig.id}Desc`, themeConfig.description)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-2">
                      {theme === themeConfig.id && (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      )}
                      {themeConfig.variants.length > 1 && (
                        <div>
                          {expandedTheme === themeConfig.id ? (
                            <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.secondary}`} />
                          ) : (
                            <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.secondary}`} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Variants (for classic theme) */}
            {expandedTheme === themeConfig.id && themeConfig.variants.length > 1 && (
              <div className="ml-4 mt-1 space-y-1">
                {themeConfig.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleThemeSelect(themeConfig.id, variant.id)}
                    className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md hover:bg-white/5 transition-all group text-left`}
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0">
                      <variant.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${colors.secondary}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`${colors.primary} text-[10px] sm:text-xs font-medium ${colors.themeHover} transition-colors`}>
                            {tString(`theme.${variant.id}`, variant.name)}
                          </div>
                          <div className={`${colors.muted} text-[9px] sm:text-[10px]`}>
                            {tString(`theme.${variant.id}Desc`, variant.description)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          <div className="flex space-x-0.5">
                            {variant.colors.map((color, idx) => (
                              <div 
                                key={idx}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          {isCurrentTheme(themeConfig.id, variant.id) && (
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400 ml-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};