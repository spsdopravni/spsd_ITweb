'use client';

import React from 'react';
import { SearchCategory } from '@/types/search';
import { useSearch } from '@/contexts/SearchContext';

const COLOR = {
  navy: '#002b4e',
  white: '#ffffff',
};

const categories: { value: SearchCategory; label: string }[] = [
  { value: 'all', label: 'Vše' },
  { value: 'projects', label: 'Projekty' },
  { value: 'events', label: 'Události' },
  { value: 'resources', label: 'Zdroje' },
  { value: 'announcements', label: 'Oznámení' },
];

interface SearchFiltersProps {
  isDesktop?: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = () => {
  const { filters, updateFilters, totalResults, query } = useSearch();
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null);

  const handleCategoryToggle = (category: SearchCategory) => {
    if (category === 'all') {
      updateFilters({ categories: ['all'] });
    } else {
      const current = filters.categories.filter((c) => c !== 'all');
      const updated = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];

      updateFilters({
        categories: updated.length === 0 ? ['all'] : updated,
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
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {categories.map(({ value, label }) => {
        const active = isActiveCategory(value);
        const hovered = hoveredCategory === value;
        return (
          <button
            key={value}
            onClick={() => handleCategoryToggle(value)}
            onMouseEnter={() => setHoveredCategory(value)}
            onMouseLeave={() => setHoveredCategory(null)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.01em',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: active
                ? COLOR.navy
                : hovered
                  ? 'rgba(0,43,78,0.08)'
                  : 'rgba(0,43,78,0.04)',
              color: active ? COLOR.white : 'rgba(0,43,78,0.65)',
            }}
          >
            {label}
          </button>
        );
      })}

      {/* Result count */}
      {query && (
        <span
          style={{
            marginLeft: '0.5rem',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'rgba(0,43,78,0.4)',
          }}
        >
          {totalResults} {totalResults === 1 ? 'výsledek' : totalResults < 5 ? 'výsledky' : 'výsledků'}
        </span>
      )}
    </div>
  );
};
