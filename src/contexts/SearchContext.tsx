'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { SearchState, SearchFilters } from '@/types/search';
import { SearchEngine } from '@/lib/search/searchEngine';

interface SearchContextType extends SearchState {
  performSearch: (query: string) => Promise<void>;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  clearSearch: () => void;
  loadMoreResults: () => Promise<void>;
  addToRecentSearches: (query: string) => void;
  clearRecentSearches: () => void;
}

const initialFilters: SearchFilters = {
  categories: ['all'],
  sortBy: 'relevance',
  sortOrder: 'desc',
};

const initialState: SearchState = {
  query: '',
  results: [],
  filters: initialFilters,
  isLoading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
  resultsPerPage: 10,
  recentSearches: [],
  suggestions: [],
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SearchState>(initialState);
  const searchEngine = SearchEngine.getInstance();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setState(prev => ({
        ...prev,
        recentSearches: JSON.parse(stored),
      }));
    }
  }, []);

  // Save recent searches to localStorage
  const addToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setState(prev => {
      const updated = [query, ...prev.recentSearches.filter(q => q !== query)].slice(0, 10);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return {
        ...prev,
        recentSearches: updated,
      };
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    localStorage.removeItem('recentSearches');
    setState(prev => ({
      ...prev,
      recentSearches: [],
    }));
  }, []);

  const performSearch = useCallback(async (query: string) => {
    // Avoid searching if query is the same or empty
    if (!query.trim() || query === state.query) {
      return;
    }

    setState(prev => ({
      ...prev,
      query,
      isLoading: true,
      error: null,
    }));

    try {
      const results = await searchEngine.search(query, state.filters);
      const suggestions = await searchEngine.getSuggestions(query);

      setState(prev => ({
        ...prev,
        results,
        totalResults: results.length,
        suggestions,
        isLoading: false,
        currentPage: 1,
      }));

      if (query.trim()) {
        addToRecentSearches(query);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Search failed',
      }));
    }
  }, [state.filters, state.query, addToRecentSearches, searchEngine]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...newFilters,
      },
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      query: '',
      results: [],
      totalResults: 0,
      currentPage: 1,
      suggestions: [],
      error: null,
    }));
  }, []);

  const loadMoreResults = useCallback(async () => {
    // Implement pagination logic here
    setState(prev => ({
      ...prev,
      currentPage: prev.currentPage + 1,
    }));
  }, []);

  const contextValue: SearchContextType = {
    ...state,
    performSearch,
    updateFilters,
    clearSearch,
    loadMoreResults,
    addToRecentSearches,
    clearRecentSearches,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};