'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Attendance Page
 *
 * Displays student attendance/absence records from Bakaláři system.
 * Shows absences, late arrivals, and attendance statistics.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/attendance
 */

export default function BakalariAttendancePage() {
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { t } = useLanguage();
  const isModern = theme === 'modern';

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-3 rounded-xl ${
              isModern
                ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <Users
              className={`w-6 h-6 ${
                isModern
                  ? 'text-orange-400'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-red)]'
                  : 'text-white'
              }`}
            />
          </div>
          <div>
            <h1
              className={`text-3xl font-bold ${
                isModern
                  ? 'text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}
            >
              {tString('dashboard.bakalari.attendance.title', 'Docházka')}
            </h1>
            <p
              className={`text-sm ${
                isModern
                  ? 'text-white/60'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/60'
              }`}
            >
              {tString('dashboard.bakalari.attendance.subtitle', 'Přehled docházky a absencí')}
            </p>
          </div>
        </div>
      </div>

      <ComingSoon
        title="Docházka Bakaláři"
        description="Zde se zobrazí váš přehled docházky, absence a omluvení ze systému Bakaláři."
        features={[
          'Přehled všech absencí',
          'Omluvené a neomluvené absence',
          'Statistiky docházky',
          'Absence podle předmětů',
          'Pozdní příchody',
          'Žádosti o omluvenky',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/attendance',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />
    </div>
  );
}
