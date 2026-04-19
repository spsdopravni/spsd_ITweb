'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';

function normalize(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const HighlightedText: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <span>{text}</span>;

  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);
  const matchIndex = normalizedText.indexOf(normalizedQuery);

  if (matchIndex === -1) return <span>{text}</span>;

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <span>
      {before}
      <strong style={{ color: COLOR.red, fontWeight: 700 }}>{match}</strong>
      {after}
    </span>
  );
};

const COLOR = {
  navy: '#002b4e',
  red: '#c81e1c',
  white: '#ffffff',
};

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: (query: string) => void;
  isDesktop?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Hledat projekty, předměty, stránky...',
  autoFocus = false,
  onSubmit,
  isDesktop = true,
}) => {
  const { query, isLoading, performSearch, clearSearch, suggestions } = useSearch();
  const [localQuery, setLocalQuery] = useState(query);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync only once on mount (for URL-driven ?q= param). Never re-sync after that.
  const hasMounted = useRef(false);
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (query) setLocalQuery(query);
    }
  }, [query]);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          performSearch(value);
        }
      }, 250);
    },
    [performSearch]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (localQuery.trim()) {
      await performSearch(localQuery);
      setShowSuggestions(false);
      onSubmit?.(localQuery);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    setFocusedIndex(-1);

    if (value.trim().length >= 2) {
      debouncedSearch(value);
      setShowSuggestions(true);
    } else {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      clearSearch();
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalQuery('');
    clearSearch();
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = async (suggestion: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLocalQuery(suggestion);
    await performSearch(suggestion);
    setShowSuggestions(false);
    onSubmit?.(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const dropdownVisible = showSuggestions && suggestions.length > 0;

  return (
    <div style={{ position: 'relative' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Search icon */}
          <div
            style={{
              position: 'absolute',
              left: '1.125rem',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <Loader2
                style={{
                  width: 20,
                  height: 20,
                  color: COLOR.red,
                  animation: 'spin 1s linear infinite',
                }}
              />
            ) : (
              <Search style={{ width: 20, height: 20, color: 'rgba(0,43,78,0.35)' }} />
            )}
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={localQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            style={{
              width: '100%',
              paddingLeft: '3.25rem',
              paddingRight: localQuery ? '3rem' : '1.25rem',
              paddingTop: '0.9rem',
              paddingBottom: '0.9rem',
              background: COLOR.white,
              border: '1px solid rgba(0,43,78,0.12)',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 400,
              color: COLOR.navy,
              outline: 'none',
              boxShadow: '0 4px 16px -4px rgba(0,43,78,0.08)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = 'rgba(200,30,28,0.35)';
              e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(0,43,78,0.08), 0 0 0 3px rgba(200,30,28,0.08)';
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,43,78,0.12)';
              e.currentTarget.style.boxShadow = '0 4px 16px -4px rgba(0,43,78,0.08)';
            }}
          />

          {/* Clear button */}
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                border: 'none',
                background: 'rgba(0,43,78,0.06)',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,43,78,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,43,78,0.06)';
              }}
            >
              <X style={{ width: 14, height: 14, color: 'rgba(0,43,78,0.45)' }} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {dropdownVisible && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '0.5rem',
            background: COLOR.white,
            border: '1px solid rgba(0,43,78,0.1)',
            borderRadius: '10px',
            boxShadow: '0 12px 32px -8px rgba(0,43,78,0.15)',
            overflow: 'hidden',
            zIndex: 50,
            maxHeight: '280px',
          }}
        >
          <div style={{ padding: '0.35rem', maxHeight: '260px', overflowY: 'auto' }}>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  background: focusedIndex === index ? 'rgba(0,43,78,0.05)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  color: COLOR.navy,
                  fontWeight: 450,
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,43,78,0.05)';
                  setFocusedIndex(index);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Search style={{ width: 14, height: 14, color: 'rgba(0,43,78,0.25)', flexShrink: 0 }} />
                <HighlightedText text={suggestion} query={localQuery} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Inline keyframe for spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
