'use client';

import React, { useState } from 'react';
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
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Users,
  CreditCard,
  FileText,
  Video,
  FolderOpen,
  Bell,
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
  children?: NavItem[];
}

export const DashboardSidebar: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isModern = theme === 'modern';

  // Track expanded sections
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    bakalari: true, // Default open
    moodle: false,
  });

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
      children: [
        {
          id: 'bakalari-grades',
          label: tString('dashboard.sidebar.grades', 'Známky'),
          icon: Award,
          href: '/dashboard/bakalari/grades',
          comingSoon: true,
        },
        {
          id: 'bakalari-schedule',
          label: tString('dashboard.sidebar.schedule', 'Rozvrh'),
          icon: Calendar,
          href: '/dashboard/bakalari/schedule',
          comingSoon: true,
        },
        {
          id: 'bakalari-tasks',
          label: tString('dashboard.sidebar.tasks', 'Úkoly'),
          icon: ClipboardList,
          href: '/dashboard/bakalari/tasks',
          comingSoon: true,
        },
        {
          id: 'bakalari-communication',
          label: tString('dashboard.sidebar.communication', 'Komunikace'),
          icon: MessageSquare,
          href: '/dashboard/bakalari/communication',
          comingSoon: true,
        },
        {
          id: 'bakalari-attendance',
          label: tString('dashboard.sidebar.attendance', 'Docházka'),
          icon: Users,
          href: '/dashboard/bakalari/attendance',
          comingSoon: true,
        },
        {
          id: 'bakalari-payments',
          label: tString('dashboard.sidebar.payments', 'Platby'),
          icon: CreditCard,
          href: '/dashboard/bakalari/payments',
          comingSoon: true,
        },
      ],
    },
    {
      id: 'moodle',
      label: tString('dashboard.sidebar.moodle', 'Moodle'),
      icon: GraduationCap,
      href: '/dashboard/moodle',
      children: [
        {
          id: 'moodle-courses',
          label: tString('dashboard.sidebar.courses', 'Kurzy'),
          icon: FolderOpen,
          href: '/dashboard/moodle/courses',
          comingSoon: true,
        },
        {
          id: 'moodle-assignments',
          label: tString('dashboard.sidebar.assignments', 'Úkoly'),
          icon: FileText,
          href: '/dashboard/moodle/assignments',
          comingSoon: true,
        },
        {
          id: 'moodle-calendar',
          label: tString('dashboard.sidebar.calendar', 'Kalendář'),
          icon: Calendar,
          href: '/dashboard/moodle/calendar',
          comingSoon: true,
        },
        {
          id: 'moodle-messages',
          label: tString('dashboard.sidebar.messages', 'Zprávy'),
          icon: MessageSquare,
          href: '/dashboard/moodle/messages',
          comingSoon: true,
        },
        {
          id: 'moodle-notifications',
          label: tString('dashboard.sidebar.notifications', 'Notifikace'),
          icon: Bell,
          href: '/dashboard/moodle/notifications',
          comingSoon: true,
        },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const renderNavItem = (item: NavItem, depth: number = 0) => {
    const Icon = item.icon;
    const isActive = pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections[item.id];
    const isParent = hasChildren;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              handleNavClick(item.href);
            }
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
            depth > 0 ? 'ml-4' : ''
          } ${
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
            className={`text-sm font-medium flex-1 text-left ${
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
          {item.comingSoon && !isParent && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
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
          {hasChildren && (
            <div
              className={`transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              {isExpanded ? (
                <ChevronDown
                  className={`w-4 h-4 ${
                    isModern
                      ? 'text-white/70'
                      : classicMode === 'light'
                      ? 'text-gray-600'
                      : 'text-white/70'
                  }`}
                />
              ) : (
                <ChevronRight
                  className={`w-4 h-4 ${
                    isModern
                      ? 'text-white/70'
                      : classicMode === 'light'
                      ? 'text-gray-600'
                      : 'text-white/70'
                  }`}
                />
              )}
            </div>
          )}
        </button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
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
        {navItems.map((item) => renderNavItem(item))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* User Info */}
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
          <div className="flex flex-col items-start flex-1 min-w-0">
            <span
              className={`text-sm font-medium truncate w-full ${
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
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.displayName || user?.username || tString('dashboard.sidebar.profile', 'Profil')}
            </span>
            {user?.email && (
              <span
                className={`text-xs truncate w-full ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-500'
                    : 'text-white/50'
                }`}
              >
                {user.email}
              </span>
            )}
          </div>
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
