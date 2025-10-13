'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Communication Page
 *
 * Displays communication with teachers from Bakaláři system.
 * Shows messages, announcements, and enables teacher communication.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/communication
 */

export default function BakalariCommunicationPage() {
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
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <MessageSquare
              className={`w-6 h-6 ${
                isModern
                  ? 'text-cyan-400'
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
              {tString('dashboard.bakalari.communication.title', 'Komunikace')}
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
              {tString('dashboard.bakalari.communication.subtitle', 'Zprávy a komunikace s učiteli')}
            </p>
          </div>
        </div>
      </div>

      <ComingSoon
        title="Komunikace Bakaláři"
        description="Zde budete moci komunikovat s učiteli prostřednictvím systému Bakaláři, číst oznámení a zprávy."
        features={[
          'Přijímání a odesílání zpráv učitelům',
          'Školní oznámení a informace',
          'Historie konverzací',
          'Připojení souborů ke zprávám',
          'Oznámení o nových zprávách',
          'Organizace zpráv podle předmětů',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/communication',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />
    </div>
  );
}
