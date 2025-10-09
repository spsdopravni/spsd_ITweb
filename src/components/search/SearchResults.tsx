'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowRight, FileText, Folder, BookOpen, Megaphone } from 'lucide-react';
import { SearchResult, SearchCategory } from '@/types/search';
import { useSearch } from '@/contexts/SearchContext';
import { useSpring, animated } from '@react-spring/web';

const categoryIcons: Record<SearchCategory, React.ElementType> = {
  all: FileText,
  page: FileText,
  projects: Folder,
  events: Calendar,
  resources: BookOpen,
  students: User,
  announcements: Megaphone,
};

const categoryColors: Record<SearchCategory, string> = {
  all: 'from-gray-500 to-gray-600',
  page: 'from-blue-400 to-blue-500',
  projects: 'from-purple-500 to-purple-600',
  events: 'from-blue-500 to-blue-600',
  resources: 'from-green-500 to-green-600',
  students: 'from-pink-500 to-pink-600',
  announcements: 'from-yellow-500 to-yellow-600',
};

interface SearchResultCardProps {
  result: SearchResult;
  index: number;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, index }) => {
  const Icon = categoryIcons[result.category];
  const gradientColor = categoryColors[result.category];

  const animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: index * 50,
  });

  return (
    <animated.div style={animation}>
      <Link
        href={result.url}
        className="
          block glass rounded-xl p-6 
          border border-white/10 hover:border-purple-500/50
          transition-all hover:scale-[1.02] hover:bg-white/5
          group
        "
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`
            p-3 rounded-xl bg-gradient-to-br ${gradientColor}
            bg-opacity-20 group-hover:bg-opacity-30 transition-all
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {result.title}
                </h3>
                <p className="text-gray-400 mt-1 line-clamp-2">
                  {result.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-all group-hover:translate-x-1" />
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {result.author && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{result.author}</span>
                </div>
              )}
              {result.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
              )}
              {result.tags && result.tags.length > 0 && (
                <div className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <div className="flex gap-1">
                    {result.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/5 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                    {result.tags.length > 3 && (
                      <span className="text-xs text-gray-600">
                        +{result.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </animated.div>
  );
};

export const SearchResults: React.FC = () => {
  const { results, isLoading, error, query } = useSearch();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (isLoading && results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        <p className="text-gray-400 mt-4">Searching...</p>
      </div>
    );
  }

  if (!query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Start typing to search...</p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No results found for &quot;{query}&quot;</p>
        <p className="text-gray-500 text-sm mt-2">Try different keywords or filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <SearchResultCard key={result.id} result={result} index={index} />
      ))}
    </div>
  );
};