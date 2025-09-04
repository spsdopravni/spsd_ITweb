'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import { useSpring, animated } from '@react-spring/web';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search projects, events, resources...',
  autoFocus = false,
  onSubmit,
  className = '',
}) => {
  const { query, isLoading, performSearch, clearSearch, suggestions } = useSearch();
  const [localQuery, setLocalQuery] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      await performSearch(localQuery);
      setShowSuggestions(false);
      onSubmit?.(localQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    if (value.trim()) {
      performSearch(value);
      setShowSuggestions(true);
    } else {
      clearSearch();
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = async (suggestion: string) => {
    setLocalQuery(suggestion);
    await performSearch(suggestion);
    setShowSuggestions(false);
    onSubmit?.(suggestion);
  };

  const animation = useSpring({
    opacity: showSuggestions && suggestions.length > 0 ? 1 : 0,
    transform: showSuggestions && suggestions.length > 0 
      ? 'translateY(0px) scaleY(1)' 
      : 'translateY(-10px) scaleY(0.95)',
  });

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon or Loader */}
          <div className="absolute left-4 pointer-events-none">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-purple-400" />
            )}
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="
              w-full pl-12 pr-24 py-3 
              bg-white/5 backdrop-blur-xl
              border border-white/10 rounded-2xl
              text-white placeholder-gray-400
              focus:outline-none focus:border-purple-500/50
              focus:bg-white/10 transition-all
            "
          />

          {/* Right Actions */}
          <div className="absolute right-2 flex items-center gap-1">
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            )}
            
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <animated.div
          style={animation}
          className="absolute top-full mt-2 w-full glass-dark rounded-xl overflow-hidden z-50"
        >
          <div className="py-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="
                  w-full px-4 py-2 text-left
                  text-gray-300 hover:text-white
                  hover:bg-white/10 transition-colors
                  flex items-center gap-2
                "
              >
                <Search className="w-4 h-4 text-gray-500" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </animated.div>
      )}
    </div>
  );
};