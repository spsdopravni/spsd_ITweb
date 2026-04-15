'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  FolderOpen,
  User,
  LogOut,
  GraduationCap,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const DashboardSidebar: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

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
      id: 'projects',
      label: tString('dashboard.sidebar.projects', 'Projekty'),
      icon: FolderOpen,
      href: '/dashboard/projects',
    },
  ];

  const isActiveHref = (href: string): boolean => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch {
      // Ignore — local state is cleared next
    }
    logout();
    router.push('/login');
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = isActiveHref(item.href);

    return (
      <button
        key={item.id}
        onClick={() => handleNavClick(item.href)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
          isActive
            ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
            : 'hover:bg-gray-50 border border-transparent'
        }`}
      >
        <Icon
          className={`w-5 h-5 flex-shrink-0 ${
            isActive ? 'text-[var(--spsd-red)]' : 'text-gray-600 group-hover:text-[var(--spsd-navy)]'
          }`}
        />
        <span
          className={`text-sm font-medium flex-1 text-left ${
            isActive ? 'text-[var(--spsd-navy)]' : 'text-gray-700 group-hover:text-[var(--spsd-navy)]'
          }`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col bg-white border-r border-gray-200 shadow-sm">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-[var(--spsd-navy)] truncate">SPŠD Portal</h1>
            <p className="text-xs text-gray-500 truncate">{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => handleNavClick('/dashboard/profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            pathname === '/dashboard/profile'
              ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
              : 'hover:bg-gray-50 border border-transparent'
          }`}
        >
          <User
            className={`w-5 h-5 ${
              pathname === '/dashboard/profile' ? 'text-[var(--spsd-red)]' : 'text-gray-600'
            }`}
          />
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span className="text-sm font-medium truncate w-full text-[var(--spsd-navy)]">
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.displayName || user?.username || tString('dashboard.sidebar.profile', 'Profil')}
            </span>
            {user?.email && (
              <span className="text-xs truncate w-full text-gray-500">{user.email}</span>
            )}
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-50 border border-transparent hover:border-red-200 text-gray-700 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">{tString('dashboard.logout', 'Odhlásit se')}</span>
        </button>
      </div>
    </aside>
  );
};
