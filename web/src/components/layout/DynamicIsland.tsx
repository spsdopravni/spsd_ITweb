'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSpring, animated, useSprings } from '@react-spring/web';
import { 
  Home, 
  Info,
  BookOpen,
  FolderOpen,
  FileText,
  Briefcase,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { CompactMode, SearchMode, ExpandedMode, LanguageMode, ThemeMode } from './dynamic-island';

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
  type: 'page' | 'event' | 'competition' | 'project';
  icon: React.ComponentType<{ className?: string }>;
}

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

const searchSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'Informace o oboru', type: 'page', icon: Info },
  { id: '2', text: 'Učební plán', type: 'page', icon: BookOpen },
  { id: '3', text: 'Studentské projekty', type: 'project', icon: FolderOpen },
  { id: '4', text: 'Výukové materiály', type: 'page', icon: FileText },
  { id: '5', text: 'Kariérní možnosti', type: 'page', icon: Briefcase },
  { id: '6', text: 'Aktuality oboru', type: 'page', icon: Clock },
  { id: '7', text: 'Úspěchy absolventů', type: 'page', icon: TrendingUp },
];

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

  const navItems = getNavItems(t);
  const currentItem = navItems.find(item => item.href === pathname);

  // Filter search suggestions based on query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(searchSuggestions.slice(0, 4));
    }
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
    height: mode === 'compact' ? 44 : mode === 'search' ? (filteredSuggestions.length > 0 ? (isMobile ? 240 : 280) : 56) : mode === 'language' ? (isMobile ? 180 : 200) : mode === 'theme' ? (isMobile ? 140 : 215) : (isMobile ? 'auto' : 64),
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

  // Search suggestions springs for parallel animation
  const suggestionSprings = useSprings(
    filteredSuggestions.length,
    filteredSuggestions.map(() => ({
      opacity: mode === 'search' && !isAnimating ? 1 : 0,
      transform: mode === 'search' && !isAnimating ? 'translateX(0px)' : 'translateX(-10px)',
      config: { tension: 350, friction: 30 },
      delay: mode === 'search' ? 80 : 0
    }))
  );

  // Language options spring animation
  const languageSpring = useSpring({
    opacity: mode === 'language' && !isAnimating ? 1 : 0,
    transform: mode === 'language' && !isAnimating ? 'translateY(0px)' : 'translateY(-10px)',
    config: { tension: 350, friction: 30 }
  });
  
  // Theme options spring animation
  const themeSpring = useSpring({
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


  const handleModeChange = (newMode: IslandMode) => {
    if (newMode === mode) {
      setMode('compact');
    } else {
      setMode(newMode);
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
            ? 'bg-white/95 border-2 border-gray-300 shadow-lg text-gray-900' 
            : theme === 'classic' && classicMode === 'dark'
            ? 'bg-slate-800/95 border-2 border-slate-600 shadow-2xl text-slate-100'
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
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className={`absolute inset-0 animate-pulse ${
            theme === 'classic' && classicMode === 'light'
              ? 'bg-gradient-to-br from-[var(--spsd-navy)]/10 via-transparent to-[var(--spsd-red)]/10'
              : theme === 'classic' && classicMode === 'dark'
              ? 'bg-gradient-to-br from-blue-400/20 via-transparent to-slate-400/20'
              : 'bg-gradient-to-br from-blue-600/20 via-transparent to-blue-400/20'
          }`} />
        </div>

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
              suggestionSprings={suggestionSprings}
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