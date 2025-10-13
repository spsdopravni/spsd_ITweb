'use client';

import React from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { CreditCard } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Payments Page
 *
 * Displays student payment information from Bakaláři system.
 * Shows school fees, payment status, and payment history.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/payments
 */

export default function BakalariPaymentsPage() {
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
                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <CreditCard
              className={`w-6 h-6 ${
                isModern
                  ? 'text-yellow-400'
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
              {tString('dashboard.bakalari.payments.title', 'Platby')}
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
              {tString('dashboard.bakalari.payments.subtitle', 'Školní poplatky a platby')}
            </p>
          </div>
        </div>
      </div>

      <ComingSoon
        title="Platby Bakaláři"
        description="Zde se zobrazí přehled školních poplatků, stav plateb a historie transakcí ze systému Bakaláři."
        features={[
          'Přehled čekajících plateb',
          'Historie uhrazených plateb',
          'Stav účtu a dlužné částky',
          'Platební údaje a instrukce',
          'Export platební historie',
          'Upozornění na blížící se termíny',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/payments',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />
    </div>
  );
}
