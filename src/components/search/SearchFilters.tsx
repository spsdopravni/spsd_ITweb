'use client';

import React from 'react';
import { Filter, Calendar, Tag, SortAsc, X } from 'lucide-react';
import { SearchCategory } from '@/types/search';
import { useSearch } from '@/contexts/SearchContext';

const categories: { value: SearchCategory; label: string; color: string }[] = [
  { value: 'all', label: 'All', color: 'bg-gray-500' },
  { value: 'projects', label: 'Projects', color: 'bg-purple-500' },
  { value: 'events', label: 'Events', color: 'bg-blue-500' },
  { value: 'resources', label: 'Resources', color: 'bg-green-500' },
  { value: 'announcements', label: 'Announcements', color: 'bg-yellow-500' },
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Title' },
];

export const SearchFilters: React.FC = () => {
  const { filters, updateFilters, totalResults } = useSearch();
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handleCategoryToggle = (category: SearchCategory) => {
    if (category === 'all') {
      updateFilters({ categories: ['all'] });
    } else {
      const current = filters.categories.filter(c => c !== 'all');
      const updated = current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category];
      
      updateFilters({ 
        categories: updated.length === 0 ? ['all'] : updated 
      });
    }
  };

  const isActiveCategory = (category: SearchCategory) => {
    if (category === 'all') {
      return filters.categories.includes('all') || filters.categories.length === 0;
    }
    return filters.categories.includes(category);
  };

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() => handleCategoryToggle(value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all
              ${isActiveCategory(value)
                ? `${color} bg-opacity-20 text-white border-2 border-current`
                : 'glass text-gray-400 hover:text-white border-2 border-transparent'
              }
            `}
          >
            {label}
            {value !== 'all' && isActiveCategory(value) && (
              <span className="ml-2 text-xs opacity-70">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Results Count */}
          <span className="text-sm text-gray-400">
            {totalResults} results found
          </span>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SortAsc className="w-4 h-4 text-gray-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilters({ sortBy: e.target.value as 'relevance' | 'date' | 'title' })}
              className="
                px-3 py-1 bg-white/5 border border-white/10 rounded-lg
                text-sm text-white focus:outline-none focus:border-purple-500/50
              "
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="glass rounded-xl p-4 space-y-4">
          {/* Date Range */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                className="
                  flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-sm text-white focus:outline-none focus:border-purple-500/50
                "
                onChange={(e) => {
                  if (e.target.value) {
                    updateFilters({
                      dateRange: {
                        start: new Date(e.target.value),
                        end: filters.dateRange?.end || new Date(),
                      }
                    });
                  }
                }}
              />
              <span className="text-gray-400 self-center">to</span>
              <input
                type="date"
                className="
                  flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                  text-sm text-white focus:outline-none focus:border-purple-500/50
                "
                onChange={(e) => {
                  if (e.target.value) {
                    updateFilters({
                      dateRange: {
                        start: filters.dateRange?.start || new Date(0),
                        end: new Date(e.target.value),
                      }
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Tag className="w-4 h-4" />
              Tags
            </label>
            <input
              type="text"
              placeholder="Enter tags separated by commas"
              className="
                w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg
                text-sm text-white placeholder-gray-400
                focus:outline-none focus:border-purple-500/50
              "
              onChange={(e) => {
                const tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                updateFilters({ tags });
              }}
            />
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => updateFilters({ 
              categories: ['all'],
              dateRange: undefined,
              tags: [],
              sortBy: 'relevance',
              sortOrder: 'desc'
            })}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};