'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, Trophy, Settings, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const MobileNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: t('nav.home', 'Home'), icon: Home, href: '/' },
    { id: 'events', label: t('nav.events', 'Events'), icon: Calendar, href: '/events' },
    { id: 'competitions', label: t('nav.competitions', 'Competitions'), icon: Trophy, href: '/competitions' },
    { id: 'settings', label: t('nav.settings', 'Settings'), icon: Settings, href: '/settings' },
  ];

  return (
    <>
      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
        <div className="glass backdrop-blur-xl bg-black/80 border-t border-white/20">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all ${
                    isActive 
                      ? 'text-purple-400' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] mt-1">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center justify-center p-2 rounded-lg text-white/60 hover:text-white transition-all"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[10px] mt-1">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="absolute bottom-16 left-4 right-4 glass backdrop-blur-xl bg-black/90 border border-white/20 rounded-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 text-sm transition-all">
                Search
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 text-sm transition-all">
                Notifications
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 text-sm transition-all">
                Profile
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/10 text-white/80 text-sm transition-all">
                Language
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};