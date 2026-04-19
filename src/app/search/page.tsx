'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchFilters } from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { useSearch } from '@/contexts/SearchContext';
import { Search } from 'lucide-react';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const { performSearch, query } = useSearch();
  const queryParam = searchParams.get('q');

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam, performSearch]);

  const textStrong = COLOR.navy;
  const textMuted = 'rgba(0,43,78,0.72)';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: isDesktop ? '3rem' : '1.5rem',
    paddingRight: isDesktop ? '3rem' : '1.5rem',
  };

  return (
    <div style={{ minHeight: '100vh', background: COLOR.paper, display: 'flex', flexDirection: 'column' }}>
      {/* ========== HERO ========== */}
      <section style={{ position: 'relative' }}>
        {/* Corner wedge — top left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: isDesktop ? '460px' : '220px',
            height: isDesktop ? '460px' : '220px',
            pointerEvents: 'none',
            background: `linear-gradient(135deg, ${COLOR.red} 0%, ${COLOR.orange} 55%, transparent 82%)`,
            clipPath: 'polygon(0 0, 72% 0, 0 55%)',
            opacity: 0.2,
          }}
        />

        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '8rem' : '6rem',
            paddingBottom: isDesktop ? '3rem' : '2rem',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '56px',
                height: '2px',
                background: COLOR.red,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: COLOR.red,
              }}
            >
              Vyhledávání
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(2.25rem, 4vw, 3.75rem)'
                : 'clamp(1.875rem, 7.5vw, 2.75rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginTop: 0,
              marginBottom: '1.5rem',
              color: textStrong,
            }}
          >
            Najděte{' '}
            <span style={{ color: COLOR.red }}>cokoliv.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: isDesktop ? '1.2rem' : '1.0625rem',
              lineHeight: 1.7,
              color: textMuted,
              maxWidth: '42rem',
              marginTop: 0,
              marginBottom: '2.5rem',
            }}
          >
            Prohledejte projekty, předměty, stránky a další obsah IT oboru.
          </p>

          {/* Search Bar */}
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 20 }}>
            <SearchBar autoFocus isDesktop={isDesktop} />
          </div>
        </div>
      </section>

      {/* ========== RESULTS SECTION ========== */}
      <section style={{ position: 'relative', zIndex: 1, flex: 1 }}>
        {/* Corner wedge — bottom right */}
        {!query && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: isDesktop ? '460px' : '220px',
              height: isDesktop ? '460px' : '220px',
              pointerEvents: 'none',
              background: `linear-gradient(45deg, ${COLOR.red} 0%, ${COLOR.orange} 55%, transparent 82%)`,
              clipPath: 'polygon(100% 100%, 100% 45%, 28% 100%)',
              opacity: 0.2,
              overflow: 'hidden',
            }}
          />
        )}

        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1.5rem',
            paddingBottom: isDesktop ? '8rem' : '5rem',
          }}
        >
          {/* Category pills */}
          <SearchFilters isDesktop={isDesktop} />

          {/* Divider */}
          <div
            style={{
              height: '1px',
              background: 'rgba(0,43,78,0.08)',
              marginTop: '1.5rem',
              marginBottom: '2rem',
            }}
          />

          {/* Results */}
          <SearchResults isDesktop={isDesktop} />
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: COLOR.paper,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <Search style={{ width: 24, height: 24, color: 'rgba(0,43,78,0.25)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(0,43,78,0.4)' }}>Načítání...</span>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
