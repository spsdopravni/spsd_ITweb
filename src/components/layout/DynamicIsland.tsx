'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useSpring, animated } from '@react-spring/web';
import {
  Home,
  Info,
  BookOpen,
  FolderOpen,
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CompactMode, SearchMode, ExpandedMode, LanguageMode } from './dynamic-island';
import { SearchEngine } from '@/lib/search/searchEngine';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { useRecentSearches } from '@/lib/search/useRecentSearches';
import type { SearchResult } from '@/types/search';

type IslandMode = 'compact' | 'expanded' | 'search' | 'language';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'page' | 'event' | 'competition' | 'project' | 'projects';
  icon: React.ComponentType<{ className?: string }>;
  url: string;
}

const AUTOCOLLAPSE_DELAY_MS = 10_000;
const SEARCH_DEBOUNCE_MS = 200;
const COMPACT_WIDTH_FALLBACK = 200;
const COMPACT_FIXED_CHROME = 152;
const COMPACT_SEARCH_BUTTON_WIDTH = 36;
const LANGUAGE_WIDTH = 400;

const getIconForCategory = (category: string): React.ComponentType<{ className?: string }> => {
  switch (category) {
    case 'page':
      return FileText;
    case 'projects':
      return FolderOpen;
    case 'event':
      return Clock;
    case 'competition':
      return TrendingUp;
    default:
      return Info;
  }
};

const convertSearchResultToSuggestion = (result: SearchResult): SearchSuggestion => {
  return {
    id: result.id,
    text: result.title,
    type: result.category as SearchSuggestion['type'],
    icon: getIconForCategory(result.category),
    url: result.url
  };
};

const getIslandHeight = (mode: IslandMode, hasResults: boolean, hasQuery: boolean): number => {
  switch (mode) {
    case 'compact':
      return 44;
    case 'expanded':
      return 64;
    case 'language':
      return 200;
    case 'search':
      if (hasResults) return 280;
      return hasQuery ? 180 : 280;
  }
};

const getIslandBorderRadius = (mode: IslandMode): number => {
  if (mode === 'compact') return 22;
  if (mode === 'expanded') return 32;
  return 24;
};

const getIslandWidth = (mode: IslandMode, parentWidth: number, compactWidth: number): number => {
  switch (mode) {
    case 'compact':
      return Math.min(compactWidth, parentWidth);
    case 'language':
      return Math.min(LANGUAGE_WIDTH, parentWidth);
    case 'expanded':
    case 'search':
      return parentWidth;
  }
};

const getNavItems = (t: (key: string, fallback?: string) => string | string[]): NavItem[] => {
  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  return [
    { id: 'home', label: tString('nav.home', 'Domů'), icon: Home, href: '/' },
    { id: 'about', label: tString('nav.about', 'O oboru'), icon: Info, href: '/about' },
    { id: 'curriculum', label: tString('nav.curriculum', 'Učební plán'), icon: BookOpen, href: '/curriculum' },
    { id: 'projects', label: tString('nav.projects', 'Projekty'), icon: FolderOpen, href: '/projects' },
  ];
};

const isEditableElement = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
};

export const DynamicIsland: React.FC = () => {
  const [mode, setMode] = useState<IslandMode>('compact');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  const pathname = usePathname();
  const { t } = useLanguage();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const islandRef = useRef<HTMLDivElement | null>(null);
  const widthMeasureRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchEngineRef = useRef<SearchEngine>(SearchEngine.getInstance());

  const [parentWidth, setParentWidth] = useState(800);
  const [compactWidth, setCompactWidth] = useState(COMPACT_WIDTH_FALLBACK);

  useEffect(() => {
    const el = widthMeasureRef.current;
    if (!el) return;
    setParentWidth(el.clientWidth);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setParentWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const prefersReducedMotion = usePrefersReducedMotion();
  const debouncedSearchQuery = useDebouncedValue(searchQuery, SEARCH_DEBOUNCE_MS);
  const { recent, add: addRecent, clear: clearRecent } = useRecentSearches();
  const loading = searchQuery !== debouncedSearchQuery;

  const tString = useCallback((key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  }, [t]);

  const navItems = getNavItems(t);
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const currentItem = navItems.find(item => item.href === normalizedPathname)
    ?? navItems.find(item => item.href !== '/' && normalizedPathname.startsWith(item.href + '/'));
  const compactLabel = currentItem?.label ?? tString('nav.home', 'Domů');

  const isSubpage = currentItem != null && currentItem.href !== '/';

  const isSearchPage = normalizedPathname === '/search';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = '500 14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
    const labelWidth = ctx.measureText(compactLabel).width;
    const breadcrumbExtra = isSubpage ? 40 : 0;
    const searchBtnWidth = isSearchPage ? 0 : COMPACT_SEARCH_BUTTON_WIDTH;
    setCompactWidth(Math.ceil(labelWidth + COMPACT_FIXED_CHROME - COMPACT_SEARCH_BUTTON_WIDTH + searchBtnWidth + breadcrumbExtra));
  }, [compactLabel, isSubpage, isSearchPage]);

  useEffect(() => {
    let cancelled = false;
    const performSearch = async () => {
      try {
        const results = await searchEngineRef.current.search(debouncedSearchQuery, {
          categories: ['all'],
          sortBy: 'relevance',
          sortOrder: 'desc'
        });
        if (cancelled) return;
        const limit = debouncedSearchQuery.trim() ? 8 : 6;
        const suggestions = results.slice(0, limit).map(convertSearchResultToSuggestion);
        setFilteredSuggestions(suggestions);
      } catch (error) {
        if (cancelled) return;
        console.error('Search error:', error);
        setFilteredSuggestions([]);
      }
    };
    performSearch();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearchQuery]);

  const islandSpring = useSpring({
    width: getIslandWidth(mode, parentWidth, compactWidth),
    height: getIslandHeight(mode, filteredSuggestions.length > 0, searchQuery.trim().length > 0),
    borderRadius: getIslandBorderRadius(mode),
    config: { tension: 300, friction: 34 },
    immediate: prefersReducedMotion,
    onStart: () => setIsAnimating(true),
    onRest: () => setIsAnimating(false),
  });

  const languageSpring = useSpring({
    opacity: mode === 'language' && !isAnimating ? 1 : 0,
    transform: mode === 'language' && !isAnimating ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 350, friction: 30 },
    immediate: prefersReducedMotion,
  });

  const searchInputSpring = useSpring({
    opacity: mode === 'search' ? 1 : 0,
    transform: mode === 'search' ? 'translateY(0px)' : 'translateY(-5px)',
    config: { tension: 320, friction: 28 },
    immediate: prefersReducedMotion,
  });

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (mode !== 'compact' && !isHovered) {
      timeoutRef.current = setTimeout(() => {
        setMode('compact');
      }, AUTOCOLLAPSE_DELAY_MS);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mode, isHovered]);

  useEffect(() => {
    if (mode === 'search') {
      searchInputRef.current?.focus();
    }
  }, [mode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mode === 'compact') return;
      if (islandRef.current && !islandRef.current.contains(event.target as Node)) {
        if (mode === 'search' || mode === 'language') {
          setMode('expanded');
        } else {
          setMode('compact');
        }
        if (mode === 'search') {
          setSearchQuery('');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMode('search');
        return;
      }

      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isEditableElement(e.target)) {
        e.preventDefault();
        setMode('search');
        return;
      }

      if (e.key === 'Escape' && mode !== 'compact') {
        if (mode === 'search' || mode === 'language') {
          setMode('expanded');
        } else {
          setMode('compact');
        }
        if (mode === 'search') {
          setSearchQuery('');
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode]);

  const handleModeChange = (newMode: IslandMode | 'compact') => {
    if (newMode === 'compact') {
      setMode('compact');
    } else if (newMode === mode) {
      setMode('compact');
    } else {
      setMode(newMode as IslandMode);
    }
  };

  const handleRecordSearch = useCallback((query: string) => {
    addRecent(query);
  }, [addRecent]);

  const handleSelectRecent = useCallback((query: string) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  }, []);

  const searchLiveMessage = mode === 'search' && !loading && debouncedSearchQuery.trim()
    ? `${filteredSuggestions.length} ${tString('search.resultsLabel', 'výsledků')}`
    : '';

  return (
    <div className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 px-2 md:px-4 w-full max-w-[95vw] md:max-w-[600px] lg:max-w-[800px]">
      <div ref={widthMeasureRef} className="w-full">
      <animated.div
        ref={islandRef}
        role="navigation"
        aria-label={tString('nav.ariaMain', 'Hlavní navigace')}
        style={{
          width: islandSpring.width.to(w => `${w}px`),
          height: islandSpring.height.to(h => `${h}px`),
          borderRadius: islandSpring.borderRadius.to(r => `${r}px`)
        }}
        className={`glass backdrop-blur-xl relative overflow-hidden mx-auto will-change-[width,height,border-radius]
          bg-white/98 border-2 border-[var(--spsd-navy)]/20 shadow-2xl shadow-[var(--spsd-navy)]/10 text-gray-900 ring-1 ring-[var(--spsd-navy)]/5`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-br from-[var(--spsd-navy)]/15 via-[var(--spsd-red)]/5 to-[var(--spsd-navy)]/15 ${mode !== 'compact' && !prefersReducedMotion ? 'animate-pulse' : ''}`} />
        </div>

        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[var(--spsd-navy)]/5 to-[var(--spsd-red)]/5 pointer-events-none" />

        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {searchLiveMessage}
        </div>

        {mode === 'compact' && (
          <div className="w-full h-full">
            <CompactMode
              currentItem={currentItem}
              pathname={pathname}
              onModeChange={handleModeChange}
            />
          </div>
        )}

        {mode === 'search' && (
          <div className="w-full h-full">
            <SearchMode
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredSuggestions={filteredSuggestions}
              recent={recent}
              loading={loading}
              onClearRecent={clearRecent}
              onSelectRecent={handleSelectRecent}
              onRecordSearch={handleRecordSearch}
              searchInputRef={searchInputRef}
              searchInputSpring={searchInputSpring}
              onModeChange={setMode}
            />
          </div>
        )}

        {mode === 'language' && (
          <div className="w-full h-full">
            <LanguageMode
              languageSpring={languageSpring}
              onModeChange={setMode}
            />
          </div>
        )}

        {mode === 'expanded' && (
          <div className="w-full h-full">
            <ExpandedMode
              navItems={navItems}
              pathname={pathname}
              onModeChange={handleModeChange}
              onLanguageModeChange={() => setMode('language')}
            />
          </div>
        )}
      </animated.div>
      </div>
    </div>
  );
};
