'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, ChevronDown } from 'lucide-react';

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

  return (
    <div className="h-full flex items-center justify-between px-3 md:px-5 min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {currentItem && (
          <>
            <currentItem.icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span className="text-sm font-medium text-white/90 whitespace-nowrap">{currentItem.label}</span>
          </>
        )}
        {!currentItem && (
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer min-w-0"
          >
            <Home className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-400 whitespace-nowrap">Home</span>
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-1 flex-shrink-0 ml-3">
        {pathname !== '/search' && (
          <button
            onClick={() => onModeChange('search')}
            className="p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200"
          >
            <Search className="w-4 h-4 text-white/70 hover:text-white" />
          </button>
        )}
        
        <button
          onClick={() => onModeChange('expanded')}
          className="p-2 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-200"
        >
          <ChevronDown className="w-4 h-4 text-white/70 hover:text-white" />
        </button>
      </div>
    </div>
  );
};