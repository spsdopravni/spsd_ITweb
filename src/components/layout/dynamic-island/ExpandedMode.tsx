'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Globe, UserCog } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface ExpandedModeProps {
  navItems: NavItem[];
  pathname: string;
  onModeChange: (mode: 'search' | 'compact') => void;
  onLanguageModeChange: () => void;
}

export const ExpandedMode: React.FC<ExpandedModeProps> = ({
  navItems,
  pathname,
  onModeChange,
  onLanguageModeChange
}) => {
  const router = useRouter();
  const { t } = useLanguage();

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };
  const { theme, classicMode } = useTheme();
  const { isAuthenticated, user } = useAuth();

  const getTextColors = () => {
    if (theme === 'classic' && classicMode === 'light') {
      return {
        primary: 'text-[var(--spsd-navy)]',
        secondary: 'text-[var(--spsd-navy)]/70',
        hover: 'hover:text-[var(--spsd-red)]',
        hoverBg: 'hover:bg-[var(--spsd-navy)]/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        actionIcon: 'text-blue-500',
        actionHover: 'hover:text-blue-600',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else if (theme === 'classic' && classicMode === 'dark') {
      return {
        primary: 'text-slate-100',
        secondary: 'text-slate-100/70',
        hover: 'hover:text-white',
        hoverBg: 'hover:bg-white/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        actionIcon: 'text-blue-400',
        actionHover: 'hover:text-blue-300',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    } else {
      return {
        primary: 'text-white',
        secondary: 'text-white/70',
        hover: 'hover:text-white',
        hoverBg: 'hover:bg-white/10',
        activeBg: 'bg-gradient-to-r from-[var(--spsd-orange)]/25 to-[var(--spsd-red)]/25',
        activeBorder: 'border-[var(--spsd-orange)]/30',
        activeShadow: 'shadow-lg shadow-[var(--spsd-orange)]/20',
        actionIcon: 'text-blue-400',
        actionHover: 'hover:text-blue-300',
        focusRing: 'focus-visible:ring-2 focus-visible:ring-[var(--spsd-orange)] focus-visible:outline-none',
      };
    }
  };

  const colors = getTextColors();

  const handleNavClick = (href: string) => {
    router.push(href);
    setTimeout(() => onModeChange('compact'), 100);
  };

  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  return (
    <div className="h-full flex flex-row items-center justify-between px-3 md:px-5 py-0 gap-2 min-w-0 overflow-x-auto">
      <ul role="list" className="flex items-center gap-1 md:gap-2 flex-nowrap min-w-0 m-0 p-0 list-none">
        {navItems.map((navItem) => {
          const isActive = normalizedPathname === navItem.href;

          return (
            <li key={navItem.id} className="flex-shrink-0">
              <button
                onClick={() => handleNavClick(navItem.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  flex items-center gap-1 md:gap-2 px-2 md:px-3.5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${colors.focusRing}
                  ${isActive
                    ? `${colors.activeBg} ${colors.primary} border ${colors.activeBorder} ${colors.activeShadow}`
                    : `${colors.secondary} ${colors.hover} ${colors.hoverBg} border border-transparent`
                  }
                `}
              >
                <navItem.icon className="w-3.5 md:w-4 h-3.5 md:h-4 flex-shrink-0" aria-hidden="true" />
                <span className="hidden min-[400px]:inline">{navItem.label}</span>
              </button>
            </li>
          );
        })}
      </ul>


      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 ml-2 md:ml-3">
        {normalizedPathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            aria-label={tString('nav.ariaSearch', 'Vyhledávání')}
            aria-keyshortcuts="Control+K Meta+K Slash"
            className={`p-1.5 md:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110 ${colors.focusRing}`}
          >
            <Search className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} aria-hidden="true" />
          </button>
        )}

        <button
          onClick={onLanguageModeChange}
          aria-label={tString('nav.selectLanguage', 'Vyberte jazyk')}
          className={`p-1.5 sm:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110 ${colors.focusRing}`}
        >
          <Globe className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} aria-hidden="true" />
        </button>

        <button
          onClick={() => {
            if (isAuthenticated) {
              router.push('/dashboard');
            } else {
              router.push('/login');
            }
            setTimeout(() => onModeChange('compact'), 100);
          }}
          aria-label={isAuthenticated ? user?.username || tString('nav.login', 'Přihlásit se') : tString('nav.login', 'Přihlásit se')}
          className={`p-1.5 sm:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110 ${colors.focusRing}`}
        >
          <UserCog className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
