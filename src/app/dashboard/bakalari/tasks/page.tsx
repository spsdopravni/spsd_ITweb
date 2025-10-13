'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { ClipboardList } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Tasks Page
 *
 * Displays student tasks/assignments from Bakaláři system.
 * Shows homework, upcoming tasks, and submission status.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/tasks
 */

export default function BakalariTasksPage() {
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
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <ClipboardList
              className={`w-6 h-6 ${
                isModern
                  ? 'text-green-400'
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
              {tString('dashboard.bakalari.tasks.title', 'Úkoly')}
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
              {tString('dashboard.bakalari.tasks.subtitle', 'Domácí úkoly a zadání ze systému Bakaláři')}
            </p>
          </div>
        </div>
      </div>

      <ComingSoon
        title="Úkoly Bakaláři"
        description="Zde se zobrazí vaše domácí úkoly a zadání ze systému Bakaláři včetně termínů odevzdání a stavu splnění."
        features={[
          'Seznam všech aktivních úkolů',
          'Termíny odevzdání a upozornění',
          'Stav splnění úkolů',
          'Detaily zadání úkolů',
          'Historie odevzdaných úkolů',
          'Filtrování podle předmětů a stavu',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/tasks',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />
    </div>
  );
}
