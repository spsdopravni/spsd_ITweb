'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/contexts/SearchContext';
import { TrendingUp, Clock, Sparkles } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { performSearch, recentSearches, clearRecentSearches } = useSearch();
  const queryParam = searchParams.get('q');

  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam, performSearch]);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  });

  const handleRecentSearch = (query: string) => {
    performSearch(query);
  };

  // Mock trending searches - replace with actual API call
  const trendingSearches = [
    'Machine Learning',
    'Hackathon 2025',
    'Python Programming',
    'Career Fair',
    'Research Papers',
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <animated.div style={headerAnimation} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-gradient">Discover</span> Everything
          </h1>
          <p className="text-gray-400 text-lg">
            Search through projects, events, resources, and more
          </p>
        </animated.div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <SearchBar autoFocus />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <SearchFilters />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="glass rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-gray-500 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearch(search)}
                      className="
                        w-full text-left px-3 py-2 rounded-lg
                        text-sm text-gray-400 hover:text-white
                        hover:bg-white/5 transition-colors
                      "
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Trending Now
              </h3>
              <div className="space-y-1">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => performSearch(search)}
                    className="
                      w-full text-left px-3 py-2 rounded-lg
                      text-sm text-gray-400 hover:text-white
                      hover:bg-white/5 transition-colors
                      flex items-center gap-2
                    "
                  >
                    <span className="text-green-400 text-xs">#{index + 1}</span>
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Search Tips
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>• Use quotes for exact matches</li>
                <li>• Filter by category for better results</li>
                <li>• Try different keywords</li>
                <li>• Use tags to narrow down results</li>
              </ul>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <SearchResults />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
      <SearchPageContent />
    </Suspense>
  );
}