'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { animated, SpringValue } from '@react-spring/web';
import { Search, ChevronDown, Clock, X } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'page' | 'event' | 'competition' | 'project' | 'projects';
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

type SearchItem =
  | { kind: 'recent'; id: string; query: string }
  | { kind: 'suggestion'; id: string; suggestion: SearchSuggestion };

interface SearchModeProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredSuggestions: SearchSuggestion[];
  recent: string[];
  loading: boolean;
  onClearRecent: () => void;
  onSelectRecent: (query: string) => void;
  onRecordSearch: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchInputSpring: {
    opacity: SpringValue<number>;
    transform: SpringValue<string>;
  };
  onModeChange: (mode: 'compact' | 'expanded') => void;
}

const LISTBOX_ID = 'dynamic-island-listbox';

export const SearchMode: React.FC<SearchModeProps> = ({
  searchQuery,
  setSearchQuery,
  filteredSuggestions,
  recent,
  loading,
  onClearRecent,
  onSelectRecent,
  onRecordSearch,
  searchInputRef,
  searchInputSpring,
  onModeChange,
}) => {
  const router = useRouter();
  const { theme, classicMode } = useTheme();
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const showRecent = !searchQuery.trim() && recent.length > 0;

  const items = useMemo<SearchItem[]>(() => {
    const list: SearchItem[] = [];
    if (showRecent) {
      recent.forEach((q, i) => list.push({ kind: 'recent', id: `di-recent-${i}`, query: q }));
    }
    filteredSuggestions.forEach((s) =>
      list.push({ kind: 'suggestion', id: `di-sug-${s.id}`, suggestion: s })
    );
    return list;
  }, [showRecent, recent, filteredSuggestions]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items.length]);

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
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
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
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
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
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    }
  };

  const colors = getTextColors();

  const handleActivate = (item: SearchItem) => {
    if (item.kind === 'recent') {
      onSelectRecent(item.query);
      return;
    }
    if (searchQuery.trim()) {
      onRecordSearch(searchQuery);
    }
    router.push(item.suggestion.url);
    onModeChange('compact');
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (items.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (searchQuery.trim()) {
          onRecordSearch(searchQuery);
          router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
          onModeChange('compact');
          setSearchQuery('');
        } else if (items[selectedIndex]) {
          handleActivate(items[selectedIndex]);
        }
        break;
    }
  };

  const activeItemId = items[selectedIndex]?.id;

  const renderRow = (item: SearchItem, flatIndex: number) => {
    const isSelected = flatIndex === selectedIndex;
    const rowBase = `w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all group text-left mb-1 ${colors.focusRing}`;
    const rowState = isSelected
      ? `${colors.activeBg} ${colors.activeBorder} border ${colors.activeShadow}`
      : `${colors.hoverBg} border border-transparent`;

    const RowIcon = item.kind === 'recent' ? Clock : item.suggestion.icon;
    const rowText = item.kind === 'recent' ? item.query : item.suggestion.text;

    return (
      <button
        key={item.id}
        id={item.id}
        role="option"
        aria-selected={isSelected}
        onClick={() => handleActivate(item)}
        onMouseEnter={() => setSelectedIndex(flatIndex)}
        className={`${rowBase} ${rowState}`}
      >
        <div className={`p-1.5 sm:p-2 rounded-lg ${colors.suggestionBg} transition-colors`}>
          <RowIcon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.suggestionIcon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs sm:text-sm ${colors.primary} font-medium truncate`}>{rowText}</p>
        </div>
        <div className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <ChevronDown className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.muted} -rotate-90`} />
        </div>
      </button>
    );
  };

  let flatIdx = 0;
  const recentStart = flatIdx;
  const recentCount = showRecent ? recent.length : 0;
  flatIdx += recentCount;
  const suggestionStart = flatIdx;

  return (
    <div className="h-full flex flex-col">
      <animated.div style={searchInputSpring} className={`px-3 sm:px-5 py-2.5 sm:py-3 border-b ${colors.borderColor}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <Search className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${colors.accent} flex-shrink-0`} />
          <input
            ref={searchInputRef}
            type="text"
            role="combobox"
            aria-expanded={items.length > 0}
            aria-controls={LISTBOX_ID}
            aria-autocomplete="list"
            aria-activedescendant={activeItemId}
            aria-label={tString('search.placeholderShort', 'Hledat...')}
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
            aria-label={tString('common.close', 'Zavřít')}
            className={`${colors.muted} text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/5 hover:bg-white/10 transition-all ${colors.focusRing}`}
          >
            ESC
          </button>
        </div>
      </animated.div>

      <div
        id={LISTBOX_ID}
        role="listbox"
        aria-label={tString('search.suggestions', 'Návrhy')}
        className={`flex-1 overflow-y-auto custom-scrollbar px-3 py-2 transition-opacity ${loading ? 'opacity-60' : 'opacity-100'}`}
      >
        {showRecent && (
          <div className="mb-2">
            <div className={`flex items-center justify-between px-2 pt-1 pb-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${colors.muted}`}>
              <span>{tString('search.recent', 'Poslední vyhledávání')}</span>
              <button
                type="button"
                onClick={onClearRecent}
                aria-label={tString('search.clearRecent', 'Vymazat historii')}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-all normal-case ${colors.focusRing}`}
              >
                <X className="w-3 h-3" />
                <span>{tString('search.clear', 'Vymazat')}</span>
              </button>
            </div>
            {recent.map((_, i) => renderRow(items[recentStart + i], recentStart + i))}
          </div>
        )}

        {filteredSuggestions.length > 0 && (
          <div>
            {showRecent && (
              <div className={`px-2 pt-2 pb-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${colors.muted}`}>
                {tString('search.defaultTitle', 'Rychlé odkazy')}
              </div>
            )}
            {filteredSuggestions.map((_, i) => renderRow(items[suggestionStart + i], suggestionStart + i))}
          </div>
        )}

        {items.length === 0 && searchQuery.trim() && !loading && (
          <div className={`text-center py-8 ${colors.muted}`}>
            <p className="text-sm">{tString('search.noResults', 'Žádné výsledky')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
