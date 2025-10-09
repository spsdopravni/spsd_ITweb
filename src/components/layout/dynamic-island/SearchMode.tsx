'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { animated, SpringValue } from '@react-spring/web';
import { Search, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'page' | 'event' | 'competition' | 'project' | 'projects';
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

interface SearchModeProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredSuggestions: SearchSuggestion[];
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchInputSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onModeChange: (mode: 'compact' | 'expanded') => void;
  onEscape: (e: React.KeyboardEvent) => void;
}

export const SearchMode: React.FC<SearchModeProps> = ({
  searchQuery,
  setSearchQuery,
  filteredSuggestions,
  searchInputRef,
  searchInputSpring,
  onModeChange,
  onEscape
}) => {
  const router = useRouter();
  const { theme, classicMode } = useTheme();
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredSuggestions]);

  // Theme-aware colors
  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        muted: 'text-[var(--spsd-navy)]/50',
        accent: 'text-[var(--spsd-orange)]',
        placeholder: 'placeholder-[var(--spsd-navy)]/40',
        hoverBg: 'hover:bg-blue-50',
        suggestionBg: 'bg-blue-50 group-hover:bg-blue-100',
        suggestionIcon: 'text-blue-500',
        borderColor: 'border-[var(--spsd-navy)]/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20'
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        muted: 'text-slate-100/50',
        accent: 'text-[var(--spsd-orange)]',
        placeholder: 'placeholder-slate-100/40',
        hoverBg: 'hover:bg-blue-500/10',
        suggestionBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        suggestionIcon: 'text-blue-400',
        borderColor: 'border-white/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20'
      };
    } else {
      return {
        primary: 'text-white',
        secondary: 'text-white/70',
        muted: 'text-white/50',
        accent: 'text-[var(--spsd-orange)]',
        placeholder: 'placeholder-white/40',
        hoverBg: 'hover:bg-blue-500/10',
        suggestionBg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
        suggestionIcon: 'text-blue-400',
        borderColor: 'border-white/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20'
      };
    }
  };

  const colors = getTextColors();

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    // Direct navigation to page
    router.push(suggestion.url);
    onModeChange('compact');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSuggestions.length === 0) {
      onEscape(e);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredSuggestions.length > 0 && filteredSuggestions[selectedIndex]) {
          handleSuggestionSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        onEscape(e);
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <animated.div style={searchInputSpring} className={`px-3 sm:px-5 py-2.5 sm:py-3 border-b ${colors.borderColor}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Search className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.accent} flex-shrink-0`} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={tString('search.placeholderShort', 'Hledat...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 bg-transparent ${colors.primary} ${colors.placeholder} text-xs sm:text-sm outline-none min-w-0`}
          />
          <button
            type="button"
            onClick={() => {
              onModeChange('expanded');
              setSearchQuery('');
            }}
            className={`${colors.muted} hover:${colors.secondary} text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 hover:bg-white/10 transition-all`}
          >
            ESC
          </button>
        </div>
      </animated.div>

      {/* Search Suggestions */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
        {filteredSuggestions.length > 0 ? (
          filteredSuggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;

            return (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionSelect(suggestion)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all group text-left mb-1 ${
                  isSelected
                    ? `${colors.activeBg} ${colors.activeBorder} border ${colors.activeShadow}`
                    : `${colors.hoverBg} border border-transparent`
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg ${colors.suggestionBg} transition-colors`}>
                  <suggestion.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.suggestionIcon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm ${colors.primary} font-medium truncate`}>{suggestion.text}</p>
                </div>
                <div className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <ChevronDown className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.muted} -rotate-90`} />
                </div>
              </button>
            );
          })
        ) : (
          searchQuery.trim() && (
            <div className={`text-center py-8 ${colors.muted}`}>
              <p className="text-sm">{tString('search.noResults', 'Žádné výsledky')}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};