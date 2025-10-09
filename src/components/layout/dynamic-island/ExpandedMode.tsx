'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Globe, Palette } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface ExpandedModeProps {
  navItems: NavItem[];
  pathname: string;
  onModeChange: (mode: 'search' | 'theme' | 'compact') => void;
  onLanguageModeChange: () => void;
}

export const ExpandedMode: React.FC<ExpandedModeProps> = ({
  navItems,
  pathname,
  onModeChange,
  onLanguageModeChange
}) => {
  const router = useRouter();
  const { theme, classicMode } = useTheme();

  // Theme-aware colors
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
        actionHover: 'hover:text-blue-600'
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
        actionHover: 'hover:text-blue-300'
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
        actionHover: 'hover:text-blue-300'
      };
    }
  };

  const colors = getTextColors();

  const handleNavClick = (href: string) => {
    router.push(href);
    // Close the island after navigation
    setTimeout(() => onModeChange('compact'), 100);
  };

  // Normalize pathname by removing trailing slash for comparison
  const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;

  return (
    <div className="h-full flex flex-row items-center justify-between px-3 md:px-5 py-0 gap-2 min-w-0 overflow-x-auto">
      <div className="flex items-center gap-1 md:gap-2 flex-nowrap min-w-0">
        {navItems.map((navItem) => {
          const isActive = normalizedPathname === navItem.href;
          
          return (
            <button
              key={navItem.id}
              onClick={() => handleNavClick(navItem.href)}
              className={`
                flex items-center gap-1 md:gap-2 px-2 md:px-3.5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0
                ${isActive 
                  ? `${colors.activeBg} ${colors.primary} border ${colors.activeBorder} ${colors.activeShadow}` 
                  : `${colors.secondary} ${colors.hover} ${colors.hoverBg} border border-transparent`
                }
              `}
            >
              <navItem.icon className="w-3.5 md:w-4 h-3.5 md:h-4 flex-shrink-0" />
              <span className="hidden min-[400px]:inline">{navItem.label}</span>
            </button>
          );
        })}
      </div>


      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 ml-2 md:ml-3">
        {normalizedPathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            className={`p-1.5 md:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110`}
          >
            <Search className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} />
          </button>
        )}
        
        <button
          onClick={() => onModeChange('theme')}
          className={`p-1.5 sm:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110`}
          title="Change Theme"
        >
          <Palette className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} />
        </button>
        
        <button
          onClick={onLanguageModeChange}
          className={`p-1.5 sm:p-2 rounded-full ${colors.hoverBg} transition-all duration-200 hover:scale-110`}
          title="Change Language"
        >
          <Globe className={`w-3.5 md:w-4 h-3.5 md:h-4 ${colors.actionIcon} ${colors.actionHover}`} />
        </button>
        
        {/* Notifications - Commented out for now */}
        {/* <button className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110 relative">
          <Bell className="w-3.5 md:w-4 h-3.5 md:h-4 text-white/70 hover:text-white" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 md:w-3 h-2.5 md:h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-[8px] md:text-[9px] text-white font-bold">3</span>
          </div>
        </button> */}
        
        {/* Profile - Commented out for now */}
        {/* <button className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110">
          <User className="w-3.5 md:w-4 h-3.5 md:h-4 text-white/70 hover:text-white" />
        </button> */}
      </div>
    </div>
  );
};