'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  User,
  Tag,
  ArrowRight,
  FileText,
  Folder,
  BookOpen,
  Megaphone,
  Search,
} from 'lucide-react';
import { SearchResult, SearchCategory } from '@/types/search';
import { useSearch } from '@/contexts/SearchContext';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  orange: '#e95d41',
  white: '#ffffff',
};

const categoryConfig: Record<
  SearchCategory,
  { icon: React.ElementType; color: string; bg: string; label: string }
> = {
  all: { icon: FileText, color: COLOR.navy, bg: 'rgba(0,43,78,0.08)', label: 'Stránka' },
  page: { icon: FileText, color: COLOR.navy, bg: 'rgba(0,43,78,0.08)', label: 'Stránka' },
  projects: { icon: Folder, color: COLOR.red, bg: 'rgba(200,30,28,0.08)', label: 'Projekt' },
  events: { icon: Calendar, color: '#2563eb', bg: 'rgba(37,99,235,0.08)', label: 'Událost' },
  resources: { icon: BookOpen, color: '#059669', bg: 'rgba(5,150,105,0.08)', label: 'Zdroj' },
  students: { icon: User, color: COLOR.orange, bg: 'rgba(233,93,65,0.08)', label: 'Student' },
  announcements: { icon: Megaphone, color: '#d97706', bg: 'rgba(217,119,6,0.08)', label: 'Oznámení' },
};

interface SearchResultCardProps {
  result: SearchResult;
  isDesktop: boolean;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, isDesktop }) => {
  const config = categoryConfig[result.category];
  const Icon = config.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={result.url}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <article
        style={{
          position: 'relative',
          borderRadius: '14px',
          overflow: 'hidden',
          padding: isDesktop ? '1.5rem 1.75rem' : '1.25rem',
          background: COLOR.white,
          border: hovered
            ? '1px solid rgba(200,30,28,0.25)'
            : '1px solid rgba(0,43,78,0.1)',
          boxShadow: hovered
            ? '0 24px 52px -22px rgba(0,43,78,0.2)'
            : '0 4px 16px -8px rgba(0,43,78,0.08)',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          {/* Icon */}
          <div
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: config.bg,
              color: config.color,
            }}
          >
            <Icon style={{ width: 22, height: 22 }} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: COLOR.navy,
                    lineHeight: 1.3,
                    margin: 0,
                    transition: 'color 0.2s',
                    ...(hovered ? { color: COLOR.red } : {}),
                  }}
                >
                  {result.title}
                </h3>
                {result.description && (
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'rgba(0,43,78,0.6)',
                      marginTop: '0.3rem',
                      marginBottom: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {result.description}
                  </p>
                )}
              </div>

              {/* Arrow */}
              <ArrowRight
                style={{
                  width: 18,
                  height: 18,
                  flexShrink: 0,
                  marginTop: '0.15rem',
                  color: hovered ? COLOR.red : 'rgba(0,43,78,0.15)',
                  transition: 'all 0.2s',
                  transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                }}
              />
            </div>

            {/* Meta row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.75rem',
                marginTop: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(0,43,78,0.06)',
              }}
            >
              {/* Category badge */}
              <span
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  padding: '0.3rem 0.6rem',
                  borderRadius: '999px',
                  background: config.bg,
                  color: config.color,
                }}
              >
                {config.label}
              </span>

              {result.author && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    color: 'rgba(0,43,78,0.45)',
                  }}
                >
                  <User style={{ width: 12, height: 12 }} />
                  {result.author}
                </span>
              )}
              {result.date && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    color: 'rgba(0,43,78,0.45)',
                  }}
                >
                  <Calendar style={{ width: 12, height: 12 }} />
                  {new Date(result.date).toLocaleDateString('cs-CZ')}
                </span>
              )}
              {result.tags && result.tags.length > 0 && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    color: 'rgba(0,43,78,0.45)',
                  }}
                >
                  <Tag style={{ width: 12, height: 12 }} />
                  {result.tags.slice(0, 3).join(', ')}
                  {result.tags.length > 3 && ` +${result.tags.length - 3}`}
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

interface SearchResultsProps {
  isDesktop?: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ isDesktop = true }) => {
  const { results, isLoading, error, query } = useSearch();

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ fontSize: '0.9rem', color: COLOR.red, fontWeight: 600 }}>
          Chyba: {error}
        </p>
      </div>
    );
  }

  if (isLoading && results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div
          style={{
            display: 'inline-block',
            width: '28px',
            height: '28px',
            border: '2px solid rgba(0,43,78,0.1)',
            borderTop: `2px solid ${COLOR.red}`,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p style={{ fontSize: '0.85rem', color: 'rgba(0,43,78,0.4)', marginTop: '1rem' }}>
          Hledám...
        </p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!query && results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(0,43,78,0.05)',
            marginBottom: '1rem',
          }}
        >
          <Search style={{ width: 24, height: 24, color: 'rgba(0,43,78,0.2)' }} />
        </div>
        <p
          style={{
            fontSize: '0.95rem',
            fontWeight: 500,
            color: 'rgba(0,43,78,0.4)',
            margin: 0,
          }}
        >
          Začněte psát a vyhledávejte...
        </p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(0,43,78,0.05)',
            marginBottom: '1rem',
          }}
        >
          <Search style={{ width: 24, height: 24, color: 'rgba(0,43,78,0.2)' }} />
        </div>
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: COLOR.navy,
            margin: 0,
          }}
        >
          Žádné výsledky pro &bdquo;{query}&ldquo;
        </p>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(0,43,78,0.45)',
            marginTop: '0.5rem',
          }}
        >
          Zkuste jiný výraz nebo upravte filtry
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} isDesktop={isDesktop} />
      ))}
    </div>
  );
};
