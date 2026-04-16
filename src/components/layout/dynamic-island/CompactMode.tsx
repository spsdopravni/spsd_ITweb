'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, ChevronDown } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface CompactModeProps {
  currentItem: NavItem | undefined;
  pathname: string;
  onModeChange: (mode: 'search' | 'expanded') => void;
}

export const CompactMode: React.FC<CompactModeProps> = ({
  currentItem,
  pathname,
  onModeChange
}) => {
  const router = useRouter();
  const { theme, classicMode } = useTheme();
  const { t } = useLanguage();

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        hover: 'hover:text-blue-600',
        hoverBg: 'hover:bg-blue-50',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-500',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        hover: 'hover:text-blue-300',
        hoverBg: 'hover:bg-blue-500/10',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-400',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else {
      return {
        primary: 'text-white/90',
        secondary: 'text-white/70',
        hover: 'hover:text-blue-300',
        hoverBg: 'hover:bg-blue-500/10',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-400',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    }
  };

  const colors = getTextColors();

  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  return (
    <div className="h-full flex items-center justify-between px-3 md:px-5 min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {currentItem && currentItem.href !== '/' ? (
          <>
            <button
              onClick={() => router.push('/')}
              aria-label={tString('nav.home', 'Domů')}
              className={`flex items-center gap-1 ${colors.hover} transition-opacity cursor-pointer rounded-md ${colors.focusRing} flex-shrink-0`}
            >
              <Home className={`w-4 h-4 ${colors.secondary}`} aria-hidden="true" />
            </button>
            <span className={`text-xs ${colors.secondary} flex-shrink-0`} aria-hidden="true">/</span>
            <currentItem.icon className={`w-4 h-4 ${colors.accent} flex-shrink-0`} aria-hidden="true" />
            <span className={`text-sm font-medium ${colors.primary} whitespace-nowrap`}>{currentItem.label}</span>
          </>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <Home className={`w-4 h-4 ${colors.accent} flex-shrink-0`} aria-hidden="true" />
            <span className={`text-sm font-medium ${colors.primary} whitespace-nowrap`}>{tString('nav.home', 'Domů')}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 ml-3">
        {normalizedPathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            aria-label={tString('nav.ariaSearch', 'Vyhledávání')}
            aria-keyshortcuts="Control+K Meta+K Slash"
            className={`p-2 rounded-full ${colors.hoverBg} hover:scale-110 transition-colors duration-200 ${colors.focusRing}`}
          >
            <Search className={`w-4 h-4 ${colors.actionIcon} ${colors.hover}`} aria-hidden="true" />
          </button>
        )}

        <button
          onClick={() => onModeChange('expanded')}
          aria-label={tString('nav.openMenu', 'Otevřít menu')}
          aria-expanded={false}
          className={`p-2 rounded-full ${colors.hoverBg} hover:scale-110 transition-colors duration-200 ${colors.focusRing}`}
        >
          <ChevronDown className={`w-4 h-4 ${colors.actionIcon} ${colors.hover}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
