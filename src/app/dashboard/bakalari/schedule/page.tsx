'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Schedule Page
 *
 * Displays student schedule from Bakaláři system.
 * Shows weekly schedule with lessons, teachers, and classrooms.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/schedule
 */

export default function BakalariSchedulePage() {
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
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <Calendar
              className={`w-6 h-6 ${
                isModern
                  ? 'text-purple-400'
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
              {tString('dashboard.bakalari.schedule.title', 'Rozvrh')}
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
              {tString('dashboard.bakalari.schedule.subtitle', 'Týdenní rozvrh ze systému Bakaláři')}
            </p>
          </div>
        </div>
      </div>

      <ComingSoon
        title="Rozvrh Bakaláři"
        description="Zde se zobrazí váš týdenní rozvrh hodin ze systému Bakaláři včetně učitelů, místností a případných suplování."
        features={[
          'Týdenní přehled rozvrhu',
          'Informace o učitelích a místnostech',
          'Upozornění na změny a suplování',
          'Speciální poznámky k hodinám',
          'Export rozvrhu do kalendáře (iCal)',
          'Oznámení o změnách v reálném čase',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/schedule',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />
    </div>
  );
}
