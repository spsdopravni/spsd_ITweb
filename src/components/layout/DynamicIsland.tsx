'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import { useTheme } from '@/lib/theme/useTheme';
import { CompactMode, SearchMode, ExpandedMode, LanguageMode, ThemeMode } from './dynamic-island';
import { SearchEngine } from '@/lib/search/searchEngine';
import type { SearchResult } from '@/types/search';

type IslandMode = 'compact' | 'expanded' | 'search' | 'language' | 'theme';

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

// Icon mapping for different content types
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

// Convert SearchResult to SearchSuggestion
const convertSearchResultToSuggestion = (result: SearchResult): SearchSuggestion => {
  return {
    id: result.id,
    text: result.title,
    type: result.category as SearchSuggestion['type'],
    icon: getIconForCategory(result.category),
    url: result.url
  };
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

export const DynamicIsland: React.FC = () => {
  const [mode, setMode] = useState<IslandMode>('compact');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  const pathname = usePathname();
  const { t } = useLanguage();
  const { theme, classicMode } = useTheme();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const islandRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const searchEngineRef = useRef<SearchEngine>(SearchEngine.getInstance());

  const navItems = getNavItems(t);
  // Normalize pathname by removing trailing slash for comparison
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const currentItem = navItems.find(item => item.href === normalizedPathname);

  // Filter search suggestions based on query using SearchEngine
  useEffect(() => {
    const performSearch = async () => {
      try {
        const searchEngine = searchEngineRef.current;

        // If search query is empty, show popular/default results
        if (!searchQuery.trim()) {
          const defaultResults = await searchEngine.search('', {
            categories: ['all'],
            sortBy: 'relevance',
            sortOrder: 'desc'
          });

          // Show first 6 default results
          const suggestions = defaultResults
            .slice(0, 6)
            .map(convertSearchResultToSuggestion);

          setFilteredSuggestions(suggestions);
          return;
        }

        // Search with query
        const results = await searchEngine.search(searchQuery, {
          categories: ['all'],
          sortBy: 'relevance',
          sortOrder: 'desc'
        });

        // Convert search results to suggestions and limit to 8
        const suggestions = results
          .slice(0, 8)
          .map(convertSearchResultToSuggestion);

        setFilteredSuggestions(suggestions);
      } catch (error) {
        console.error('Search error:', error);
        setFilteredSuggestions([]);
      }
    };

    performSearch();
  }, [searchQuery]);


  // Detect if mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Island container animation - height and border radius only
  const islandSpring = useSpring({
    height: mode === 'compact' ? 44 : mode === 'search' ? (filteredSuggestions.length > 0 ? (isMobile ? 240 : 280) : (searchQuery.trim() ? 180 : (isMobile ? 240 : 280))) : mode === 'language' ? (isMobile ? 180 : 200) : mode === 'theme' ? (isMobile ? 140 : 215) : (isMobile ? 'auto' : 64),
    borderRadius: mode === 'compact' ? 22 : mode === 'search' ? 24 : mode === 'language' ? 24 : mode === 'theme' ? 24 : (isMobile ? 24 : 32),
    config: { 
      tension: 0,
      friction: 10,
      precision: 0.001
    },
    onStart: () => {
      setIsAnimating(true);
    },
    onRest: () => {
      setIsAnimating(false);
    }
  });

  // Language options spring animation
  const languageSpring = useSpring({
    opacity: mode === 'language' && !isAnimating ? 1 : 0,
    transform: mode === 'language' && !isAnimating ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 350, friction: 30 }
  });
  
  // Theme options spring animation
  const _themeSpring = useSpring({
    opacity: mode === 'theme' && !isAnimating ? 1 : 0,
    transform: mode === 'theme' && !isAnimating ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 350, friction: 30 }
  });

  // Search input animation
  const searchInputSpring = useSpring({
    opacity: mode === 'search' ? 1 : 0,
    transform: mode === 'search' ? 'translateY(0px)' : 'translateY(-5px)',
    config: { tension: 320, friction: 28 }
  });



  // Auto-collapse after inactivity
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (mode !== 'compact' && !isHovered) {
      timeoutRef.current = setTimeout(() => {
        setMode('compact');
      }, 5000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [mode, isHovered]);

  // Focus search input when entering search mode
  useEffect(() => {
    if (mode === 'search' && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [mode]);

  // Click away handler for search, expanded, and language modes
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((mode === 'search' || mode === 'expanded' || mode === 'language' || mode === 'theme') && islandRef.current && !islandRef.current.contains(event.target as Node)) {
        if (mode === 'search' || mode === 'language' || mode === 'theme') {
          setMode('expanded');
        } else {
          setMode('compact');
        }
        if (mode === 'search') {
          setSearchQuery('');
        }
      }
    };

    if (mode === 'search' || mode === 'expanded' || mode === 'language' || mode === 'theme') {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const handleEscape = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (mode === 'search' || mode === 'language' || mode === 'theme') {
        setMode('expanded');
      } else {
        setMode('compact');
      }
      if (mode === 'search') {
        setSearchQuery('');
      }
    }
  };

  return (
    <div className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 px-2 md:px-4 w-full max-w-[95vw] md:max-w-[600px] lg:max-w-[800px]">
      <animated.div
        ref={islandRef}
        style={{
          height: isMobile && mode === 'expanded' ? 'auto' : islandSpring.height.to(h => typeof h === 'string' ? h : `${h}px`),
          borderRadius: islandSpring.borderRadius.to(r => `${r}px`)
        }}
        // Dynamic theme-aware styling
        className={`glass backdrop-blur-xl relative overflow-hidden mx-auto transition-all duration-300
          ${theme === 'classic' && classicMode === 'light' 
            ? 'bg-white/98 border-2 border-[var(--spsd-navy)]/20 shadow-2xl shadow-[var(--spsd-navy)]/10 text-gray-900 ring-1 ring-[var(--spsd-navy)]/5' 
            : theme === 'classic' && classicMode === 'dark'
            ? 'bg-slate-800/95 border-2 border-slate-500 shadow-2xl text-slate-100'
            : 'bg-black/60 border border-white/20 shadow-2xl text-white'
          }
          ${mode === 'compact' ? 'w-fit min-w-[160px] max-w-full' : ''}
          ${mode === 'expanded' ? 'w-full max-w-full' : ''}
          ${mode === 'search' ? 'w-full max-w-full' : ''}
          ${mode === 'language' ? 'w-full max-w-[400px]' : ''}
          ${mode === 'theme' ? 'w-full max-w-[400px]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient - theme aware */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className={`absolute inset-0 animate-pulse ${
            theme === 'classic' && classicMode === 'light'
              ? 'bg-gradient-to-br from-[var(--spsd-navy)]/15 via-[var(--spsd-red)]/5 to-[var(--spsd-navy)]/15'
              : theme === 'classic' && classicMode === 'dark'
              ? 'bg-gradient-to-br from-blue-400/20 via-transparent to-slate-400/20'
              : 'bg-gradient-to-br from-blue-600/20 via-transparent to-blue-400/20'
          }`} />
        </div>

        {/* Additional outline for light mode visibility */}
        {theme === 'classic' && classicMode === 'light' && (
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[var(--spsd-navy)]/5 to-[var(--spsd-red)]/5 pointer-events-none" />
        )}

        {/* Compact Mode */}
        {mode === 'compact' && (
          <div className="w-full h-full">
            <CompactMode
              currentItem={currentItem}
              pathname={pathname}
              onModeChange={handleModeChange}
            />
          </div>
        )}
        
        {/* Search Mode */}
        {mode === 'search' && (
          <div className="w-full h-full">
            <SearchMode
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredSuggestions={filteredSuggestions}
              searchInputRef={searchInputRef}
              searchInputSpring={searchInputSpring}
              onModeChange={setMode}
              onEscape={handleEscape}
            />
          </div>
        )}

        {/* Language Mode */}
        {mode === 'language' && (
          <div className="w-full h-full">
            <LanguageMode
              languageSpring={languageSpring}
              onModeChange={setMode}
              onEscape={handleEscape}
            />
          </div>
        )}
        
        {/* Theme Mode */}
        {mode === 'theme' && (
          <div className="w-full h-full">
            <ThemeMode
              onClose={() => setMode('expanded')}
            />
          </div>
        )}

        {/* Expanded Mode */}
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
  );
};