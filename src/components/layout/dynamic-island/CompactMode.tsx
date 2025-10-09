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

  // Theme-aware colors
  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        hover: 'hover:text-blue-600',
        hoverBg: 'hover:bg-blue-50',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-500'
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        hover: 'hover:text-blue-300',
        hoverBg: 'hover:bg-blue-500/10',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-400'
      };
    } else {
      return {
        primary: 'text-white/90',
        secondary: 'text-white/70',
        hover: 'hover:text-blue-300',
        hoverBg: 'hover:bg-blue-500/10',
        accent: 'text-[var(--spsd-orange)]',
        actionIcon: 'text-blue-400'
      };
    }
  };

  const colors = getTextColors();

  // Normalize pathname for comparison
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  return (
    <div className="h-full flex items-center justify-between px-3 md:px-5 min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {currentItem && (
          <>
            <currentItem.icon className={`w-4 h-4 ${colors.accent} flex-shrink-0`} />
            <span className={`text-sm font-medium ${colors.primary} whitespace-nowrap`}>{currentItem.label}</span>
          </>
        )}
        {!currentItem && (
          <button
            onClick={() => router.push('/')}
            className={`flex items-center gap-2 ${colors.hover} transition-opacity cursor-pointer min-w-0`}
          >
            <Home className={`w-4 h-4 ${colors.secondary} flex-shrink-0`} />
            <span className={`text-sm font-medium ${colors.secondary} whitespace-nowrap`}>{t('nav.home', 'Domů')}</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 flex-shrink-0 ml-3">
        {normalizedPathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            className={`p-2 rounded-full ${colors.hoverBg} hover:scale-110 transition-all duration-200`}
          >
            <Search className={`w-4 h-4 ${colors.actionIcon} ${colors.hover}`} />
          </button>
        )}
        
        <button
          onClick={() => onModeChange('expanded')}
          className={`p-2 rounded-full ${colors.hoverBg} hover:scale-110 transition-all duration-200`}
        >
          <ChevronDown className={`w-4 h-4 ${colors.actionIcon} ${colors.hover}`} />
        </button>
      </div>
    </div>
  );
};