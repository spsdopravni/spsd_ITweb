'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  X, 
  Home, 
  Info, 
  BookOpen, 
  FolderOpen, 
  Search,
  Globe,
  ChevronRight
} from 'lucide-react';
import { useLanguage, getLanguageFlag, getLanguageName, type SupportedLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated } from '@react-spring/web';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const MobileBurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const languages: SupportedLanguage[] = ['cs', 'en', 'sk', 'uk', 'ru'];

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const navItems: NavItem[] = [
    { id: 'home', label: tString('nav.home', 'Domů'), icon: Home, href: '/' },
    { id: 'about', label: tString('nav.about', 'O oboru'), icon: Info, href: '/about' },
    { id: 'curriculum', label: tString('nav.curriculum', 'Učební plán'), icon: BookOpen, href: '/curriculum' },
    { id: 'projects', label: tString('nav.projects', 'Projekty'), icon: FolderOpen, href: '/projects' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animation springs
  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 280, friction: 30 }
  });

  const drawerSpring = useSpring({
    transform: isOpen ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 280, friction: 30 }
  });

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* Burger Button - Hidden when menu is open */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-3 rounded-full glass backdrop-blur-xl bg-black/60 border border-white/20 shadow-xl min-[550px]:hidden hover:bg-black/70 transition-all duration-200"
          aria-label="Open menu"
        >
          <div className="w-6 h-6 relative flex items-center justify-center">
            <div className="absolute w-6 h-0.5 bg-white -translate-y-2" />
            <div className="absolute w-6 h-0.5 bg-white" />
            <div className="absolute w-6 h-0.5 bg-white translate-y-2" />
          </div>
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <animated.div
          style={overlaySpring}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 min-[550px]:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <animated.div
        style={drawerSpring}
        className="fixed top-0 left-0 h-full w-[280px] glass backdrop-blur-xl bg-black/90 border-r border-white/20 shadow-2xl z-[45] min-[550px]:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              SPŠD IT
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-white/10">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push('/search');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              <Search className="w-4 h-4 text-white/60" />
              <span className="text-sm text-white/60">Search...</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-white/70'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/80'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-blue-400 ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10 space-y-2">
            {/* Language Section */}
            {!showLanguages ? (
              <button
                onClick={() => setShowLanguages(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
              >
                <Globe className="w-5 h-5 text-white/70" />
                <span className="text-sm text-white/80">Language</span>
                <span className="ml-auto text-sm">{getLanguageFlag(currentLanguage)}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setShowLanguages(false)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/60 hover:text-white/80 transition-all"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setShowLanguages(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      currentLanguage === lang
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg">{getLanguageFlag(lang)}</span>
                    <span className="text-sm text-white/80">{getLanguageName(lang)}</span>
                    <span className="text-xs text-white/50 uppercase ml-auto">{lang}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Notifications - Commented out for now */}
            {/* <button
              onClick={() => {
                setIsOpen(false);
                router.push('/notifications');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all relative"
            >
              <Bell className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/80">Notifications</span>
              <div className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                3
              </div>
            </button> */}

            {/* Profile - Commented out for now */}
            {/* <button
              onClick={() => {
                setIsOpen(false);
                router.push('/profile');
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-all"
            >
              <User className="w-5 h-5 text-white/70" />
              <span className="text-sm text-white/80">Profile</span>
            </button> */}
          </div>
        </div>
      </animated.div>
    </>
  );
};