'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useSpring, animated } from '@react-spring/web';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Award,
  MessageSquare,
  TrendingUp,
  Clock,
  Bell,
} from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const isModern = theme === 'modern';

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  const quickActions = [
    {
      id: 'bakalari',
      title: t('dashboard.bakalari.title', 'Bakaláři'),
      description: t('dashboard.bakalari.description', 'Známky, absence a školní informace'),
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500',
      href: '/dashboard/bakalari',
    },
    {
      id: 'grades',
      title: t('dashboard.sidebar.grades', 'Známky'),
      description: t('dashboard.grades.description', 'Přehled známek a hodnocení'),
      icon: Award,
      gradient: 'from-yellow-500 to-orange-500',
      href: '/dashboard/grades',
    },
    {
      id: 'schedule',
      title: t('dashboard.schedule.title', 'Rozvrh hodin'),
      description: t('dashboard.schedule.description', 'Aktuální rozvrh a změny hodin'),
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-500',
      href: '/dashboard/schedule',
    },
    {
      id: 'moodle',
      title: t('dashboard.moodle.title', 'Moodle'),
      description: t('dashboard.moodle.description', 'Výukové materiály a úkoly'),
      icon: GraduationCap,
      gradient: 'from-green-500 to-emerald-500',
      href: '/dashboard/moodle',
    },
    {
      id: 'communication',
      title: t('dashboard.sidebar.communication', 'Komunikace'),
      description: t('dashboard.communication.description', 'Zprávy a oznámení'),
      icon: MessageSquare,
      gradient: 'from-red-500 to-pink-500',
      href: '/dashboard/communication',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'grade',
      message: t('dashboard.activity.newGrade', 'Nová známka z Programování'),
      time: '2 hodiny',
      icon: Award,
    },
    {
      id: 2,
      type: 'schedule',
      message: t('dashboard.activity.scheduleChange', 'Změna rozvrhu - zrušena 3. hodina'),
      time: '5 hodin',
      icon: Calendar,
    },
    {
      id: 3,
      type: 'moodle',
      message: t('dashboard.activity.newAssignment', 'Nový úkol v Moodle - Databáze'),
      time: '1 den',
      icon: GraduationCap,
    },
  ];

  return (
    <animated.div style={fadeIn}>
      {/* Welcome Header */}
      <div className="mb-8">
        <h1
          className={`text-4xl font-bold mb-2 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          {t('dashboard.welcome', 'Vítejte')}, {user?.username}! 👋
        </h1>
        <p
          className={`text-lg ${
            isModern
              ? 'text-white/70'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/70'
              : 'text-white/80'
          }`}
        >
          {t('dashboard.subtitle', 'Vše, co potřebujete pro studium, na jednom místě')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          className={`rounded-2xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isModern
                    ? 'text-white/60'
                    : classicMode === 'light'
                    ? 'text-gray-600'
                    : 'text-white/70'
                }`}
              >
                {t('dashboard.stats.average', 'Průměr známek')}
              </p>
              <p
                className={`text-2xl font-bold ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                1.8
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isModern
                    ? 'text-white/60'
                    : classicMode === 'light'
                    ? 'text-gray-600'
                    : 'text-white/70'
                }`}
              >
                {t('dashboard.stats.attendance', 'Docházka')}
              </p>
              <p
                className={`text-2xl font-bold ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                96%
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <p
                className={`text-sm ${
                  isModern
                    ? 'text-white/60'
                    : classicMode === 'light'
                    ? 'text-gray-600'
                    : 'text-white/70'
                }`}
              >
                {t('dashboard.stats.notifications', 'Nové zprávy')}
              </p>
              <p
                className={`text-2xl font-bold ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                3
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="mb-8">
        <h2
          className={`text-2xl font-bold mb-4 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          {t('dashboard.quickActions', 'Rychlé akce')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => router.push(action.href)}
                className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 text-left group ${
                  isModern
                    ? 'glass border border-white/10 hover:border-blue-400/30'
                    : classicMode === 'light'
                    ? 'bg-white border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md hover:shadow-xl'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isModern
                      ? 'text-white'
                      : classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]'
                      : 'text-white'
                  }`}
                >
                  {action.title}
                </h3>
                <p
                  className={`text-sm ${
                    isModern
                      ? 'text-white/70'
                      : classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]/70'
                      : 'text-white/80'
                  }`}
                >
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2
          className={`text-2xl font-bold mb-4 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          {t('dashboard.recentActivity', 'Poslední aktivita')}
        </h2>
        <div
          className={`rounded-2xl p-6 space-y-4 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          {recentActivity.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                  isModern
                    ? 'hover:bg-white/5'
                    : classicMode === 'light'
                    ? 'hover:bg-gray-50'
                    : 'hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isModern
                      ? 'bg-white/10'
                      : classicMode === 'light'
                      ? 'bg-gray-100'
                      : 'bg-white/10'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isModern
                        ? 'text-blue-400'
                        : classicMode === 'light'
                        ? 'text-[var(--spsd-red)]'
                        : 'text-white'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      isModern
                        ? 'text-white'
                        : classicMode === 'light'
                        ? 'text-[var(--spsd-navy)]'
                        : 'text-white'
                    }`}
                  >
                    {activity.message}
                  </p>
                  <p
                    className={`text-xs ${
                      isModern
                        ? 'text-white/50'
                        : classicMode === 'light'
                        ? 'text-gray-500'
                        : 'text-white/60'
                    }`}
                  >
                    Před {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div
            className={`text-center pt-4 border-t ${
              isModern
                ? 'border-white/10'
                : classicMode === 'light'
                ? 'border-gray-200'
                : 'border-white/10'
            }`}
          >
            <p
              className={`text-sm ${
                isModern
                  ? 'text-white/50'
                  : classicMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white/60'
              }`}
            >
              {t('dashboard.mockData', '* Ukázková data - připravujeme integraci s Bakaláři')}
            </p>
          </div>
        </div>
      </div>
    </animated.div>
  );
}
