'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  BookOpen,
  Award,
  Calendar,
  MessageSquare,
  User,
  LogOut,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  comingSoon?: boolean;
}

export const DashboardSidebar: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isModern = theme === 'modern';

  // Helper to ensure string return from t()
  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: tString('dashboard.sidebar.overview', 'Přehled'),
      icon: Home,
      href: '/dashboard',
    },
    {
      id: 'bakalari',
      label: tString('dashboard.sidebar.bakalari', 'Bakaláři'),
      icon: BookOpen,
      href: '/dashboard/bakalari',
      comingSoon: true,
    },
    {
      id: 'grades',
      label: tString('dashboard.sidebar.grades', 'Známky'),
      icon: Award,
      href: '/dashboard/grades',
      comingSoon: true,
    },
    {
      id: 'schedule',
      label: tString('dashboard.sidebar.schedule', 'Rozvrh'),
      icon: Calendar,
      href: '/dashboard/schedule',
      comingSoon: true,
    },
    {
      id: 'moodle',
      label: tString('dashboard.sidebar.moodle', 'Moodle'),
      icon: GraduationCap,
      href: '/dashboard/moodle',
      comingSoon: true,
    },
    {
      id: 'communication',
      label: tString('dashboard.sidebar.communication', 'Komunikace'),
      icon: MessageSquare,
      href: '/dashboard/communication',
      comingSoon: true,
    },
  ];

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 flex flex-col transition-colors duration-300 ${
        isModern
          ? 'glass border-r border-white/10 bg-black/40 backdrop-blur-xl'
          : classicMode === 'light'
          ? 'bg-white border-r border-gray-200 shadow-sm'
          : 'bg-gradient-to-b from-[var(--spsd-navy)] to-[var(--spsd-navy-dark)] border-r border-white/10'
      }`}
    >
      {/* Logo/Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          {isModern && (
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          )}
          {!isModern && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h1
              className={`text-lg font-bold ${
                isModern
                  ? 'text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}
            >
              SPŠD Portal
            </h1>
            <p
              className={`text-xs ${
                isModern
                  ? 'text-white/50'
                  : classicMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white/60'
              }`}
            >
              {user?.username}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? isModern
                    ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30'
                    : classicMode === 'light'
                    ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                    : 'bg-white/10 border border-white/20'
                  : isModern
                  ? 'hover:bg-white/5 border border-transparent'
                  : classicMode === 'light'
                  ? 'hover:bg-gray-50 border border-transparent'
                  : 'hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive
                    ? isModern
                      ? 'text-blue-400'
                      : classicMode === 'light'
                      ? 'text-[var(--spsd-red)]'
                      : 'text-white'
                    : isModern
                    ? 'text-white/70 group-hover:text-white'
                    : classicMode === 'light'
                    ? 'text-gray-600 group-hover:text-[var(--spsd-navy)]'
                    : 'text-white/70 group-hover:text-white'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isActive
                    ? isModern
                      ? 'text-white'
                      : classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]'
                      : 'text-white'
                    : isModern
                    ? 'text-white/80 group-hover:text-white'
                    : classicMode === 'light'
                    ? 'text-gray-700 group-hover:text-[var(--spsd-navy)]'
                    : 'text-white/80 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
              {item.comingSoon && (
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                    isModern
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      : classicMode === 'light'
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}
                >
                  {tString('dashboard.sidebar.soon', 'Brzy')}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* Profile Settings */}
        <button
          onClick={() => handleNavClick('/dashboard/profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            pathname === '/dashboard/profile'
              ? isModern
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
              : isModern
              ? 'hover:bg-white/5 border border-transparent'
              : classicMode === 'light'
              ? 'hover:bg-gray-50 border border-transparent'
              : 'hover:bg-white/5 border border-transparent'
          }`}
        >
          <User
            className={`w-5 h-5 ${
              pathname === '/dashboard/profile'
                ? isModern
                  ? 'text-purple-400'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-red)]'
                  : 'text-white'
                : isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-gray-600'
                : 'text-white/70'
            }`}
          />
          <span
            className={`text-sm font-medium ${
              pathname === '/dashboard/profile'
                ? isModern
                  ? 'text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
                : isModern
                ? 'text-white/80'
                : classicMode === 'light'
                ? 'text-gray-700'
                : 'text-white/80'
            }`}
          >
            {tString('dashboard.sidebar.profile', 'Profil')}
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isModern
              ? 'hover:bg-red-500/10 border border-transparent hover:border-red-500/30 text-white/70 hover:text-red-400'
              : classicMode === 'light'
              ? 'hover:bg-red-50 border border-transparent hover:border-red-200 text-gray-700 hover:text-red-600'
              : 'hover:bg-red-500/10 border border-transparent hover:border-red-500/30 text-white/70 hover:text-red-400'
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">{tString('dashboard.logout', 'Odhlásit se')}</span>
        </button>
      </div>
    </aside>
  );
};
