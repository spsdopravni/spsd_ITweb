'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { animated, SpringValue } from '@react-spring/web';
import { Search, ChevronDown } from 'lucide-react';

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
      <animated.div style={searchInputSpring} className="px-5 py-3 border-b border-white/10">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
          <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={onEscape}
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => {
              onModeChange('expanded');
              setSearchQuery('');
            }}
            className="text-white/40 hover:text-white/60 text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all"
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
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-all group text-left mb-1"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                  <suggestion.icon className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90 font-medium">{suggestion.text}</p>
                  <p className="text-xs text-white/50 capitalize">{suggestion.type}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronDown className="w-4 h-4 text-white/30 -rotate-90" />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};