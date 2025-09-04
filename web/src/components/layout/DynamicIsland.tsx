'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSpring, animated, useSprings } from '@react-spring/web';
import { 
  Home, 
  Calendar,
  Trophy,
  Settings,
  Sparkles,
  FileText,
  Users,
  Briefcase,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CompactMode, SearchMode, ExpandedMode, LanguageMode } from './dynamic-island';

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
  type: 'page' | 'event' | 'competition' | 'project';
  icon: React.ComponentType<{ className?: string }>;
}

const getNavItems = (t: (key: string, fallback?: string) => string): NavItem[] => [
  { id: 'home', label: t('nav.home', 'Home'), icon: Home, href: '/' },
  { id: 'events', label: t('nav.events', 'Events'), icon: Calendar, href: '/events' },
  { id: 'competitions', label: t('nav.competitions', 'Competitions'), icon: Trophy, href: '/competitions' },
  { id: 'settings', label: t('nav.settings', 'Settings'), icon: Settings, href: '/settings' },
];

const searchSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'Upcoming Events', type: 'page', icon: Calendar },
  { id: '2', text: 'Hackathon 2024', type: 'event', icon: Sparkles },
  { id: '3', text: 'Study Groups', type: 'page', icon: Users },
  { id: '4', text: 'Project Submissions', type: 'project', icon: FileText },
  { id: '5', text: 'Career Fair', type: 'event', icon: Briefcase },
  { id: '6', text: 'Recent Activities', type: 'page', icon: Clock },
  { id: '7', text: 'Leaderboard', type: 'competition', icon: TrendingUp },
];

export const DynamicIsland: React.FC = () => {
  const [mode, setMode] = useState<IslandMode>('compact');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const islandRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const { t } = useLanguage();

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


  // Island container animation - height and border radius only
  const islandSpring = useSpring({
    height: mode === 'compact' ? 44 : mode === 'search' ? (filteredSuggestions.length > 0 ? 280 : 56) : mode === 'language' ? 200 : 64,
    borderRadius: mode === 'compact' ? 22 : mode === 'search' ? 24 : mode === 'language' ? 24 : 32,
    config: { 
      tension: 280,
      friction: 30,
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
      if ((mode === 'search' || mode === 'expanded' || mode === 'language') && islandRef.current && !islandRef.current.contains(event.target as Node)) {
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

    if (mode === 'search' || mode === 'expanded' || mode === 'language') {
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

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <animated.div
        ref={islandRef}
        style={{
          height: islandSpring.height.to(h => `${h}px`),
          borderRadius: islandSpring.borderRadius.to(r => `${r}px`)
        }}
        className={`glass backdrop-blur-xl bg-black/60 border border-white/20 shadow-2xl relative overflow-hidden
          ${mode === 'compact' ? 'min-w-[200px] max-w-[600px]' : ''}
          ${mode === 'expanded' ? 'min-w-[400px] max-w-[95vw]' : ''}
          ${mode === 'search' ? 'min-w-[400px] max-w-[600px]' : ''}
          ${mode === 'language' ? 'min-w-[300px] max-w-[400px]' : ''}
          w-fit`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20 animate-pulse" />
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