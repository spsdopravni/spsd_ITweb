'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SpringValue } from '@react-spring/web';
import { Search, Bell, User, Globe } from 'lucide-react';
import { useLanguage, getLanguageFlag } from '@/contexts/LanguageContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface ExpandedModeProps {
  navItems: NavItem[];
  pathname: string;
  onModeChange: (mode: 'search') => void;
  onLanguageModeChange: () => void;
}

export const ExpandedMode: React.FC<ExpandedModeProps> = ({
  navItems,
  pathname,
  onModeChange,
  onLanguageModeChange
}) => {
  const router = useRouter();
  const { currentLanguage } = useLanguage();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="h-full flex items-center justify-between px-5 min-w-fit">
      <div className="flex items-center gap-2 flex-wrap min-w-fit">
        {navItems.map((navItem) => {
          const isActive = pathname === navItem.href;
          
          return (
            <button
              key={navItem.id}
              onClick={() => handleNavClick(navItem.href)}
              className={`
                flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${isActive 
                  ? 'bg-gradient-to-r from-purple-500/25 to-pink-500/25 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
                }
              `}
            >
              <navItem.icon className="w-4 h-4 flex-shrink-0" />
              <span>{navItem.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
        {pathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110"
          >
            <Search className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
        )}
        
        <button
          onClick={onLanguageModeChange}
          className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110"
          title="Change Language"
        >
          <Globe className="w-4 h-4 text-white/70 hover:text-white" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110 relative">
          <Bell className="w-4 h-4 text-white/70 hover:text-white" />
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-[9px] text-white font-bold">3</span>
          </div>
        </button>
        
        <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 hover:scale-110">
          <User className="w-4 h-4 text-white/70 hover:text-white" />
        </button>
      </div>
    </div>
  );
};