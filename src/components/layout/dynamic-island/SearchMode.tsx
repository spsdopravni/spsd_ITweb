'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { animated, SpringValue } from '@react-spring/web';
import { Search, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'page' | 'event' | 'competition' | 'project';
  icon: React.ComponentType<{ className?: string }>;
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
  suggestionSprings: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  }[];
  onModeChange: (mode: 'compact' | 'expanded') => void;
  onEscape: (e: React.KeyboardEvent) => void;
}

export const SearchMode: React.FC<SearchModeProps> = ({
  searchQuery,
  setSearchQuery,
  filteredSuggestions,
  searchInputRef,
  searchInputSpring,
  suggestionSprings,
  onModeChange,
  onEscape
}) => {
  const router = useRouter();
  const { theme, classicMode } = useTheme();

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
        borderColor: 'border-[var(--spsd-navy)]/10'
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
        borderColor: 'border-white/10'
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
        borderColor: 'border-white/10'
      };
    }
  };

  const colors = getTextColors();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      onModeChange('expanded');
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    onModeChange('compact');
    setSearchQuery('');
  };

  return (
    <div className="h-full flex flex-col">
      <animated.div style={searchInputSpring} className={`px-3 sm:px-5 py-2.5 sm:py-3 border-b ${colors.borderColor}`}>
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:gap-3">
          <Search className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.accent} flex-shrink-0`} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onEscape}
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
        </form>
      </animated.div>
      
      {/* Search Suggestions */}
      {filteredSuggestions.length > 0 && (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-2">
          {suggestionSprings.map((style, index) => {
            const suggestion = filteredSuggestions[index];
            if (!suggestion) return null;
            
            return (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg ${colors.hoverBg} transition-all group text-left mb-1`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg ${colors.suggestionBg} transition-colors`}>
                  <suggestion.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.suggestionIcon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs sm:text-sm ${colors.primary} font-medium truncate`}>{suggestion.text}</p>
                  <p className={`text-[10px] sm:text-xs ${colors.muted} capitalize`}>{suggestion.type}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.muted} -rotate-90`} />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};