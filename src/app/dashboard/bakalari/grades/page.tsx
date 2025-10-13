'use client';

import React, { useState } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, TrendingUp, Calendar, Filter } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';

/**
 * Bakaláři Grades Page
 *
 * Displays student grades from Bakaláři system.
 * Shows grades by subject, semester, and provides grade statistics.
 *
 * TODO: Connect to Bakaláři API via /api/bakalari/grades
 */

export default function BakalariGradesPage() {
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { t } = useLanguage();
  const isModern = theme === 'modern';

  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Helper to get string from t()
  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  // Mock data structure (will be replaced with API data)
  const mockSubjects = [
    { id: 'all', name: 'Všechny předměty' },
    { id: 'math', name: 'Matematika' },
    { id: 'programming', name: 'Programování' },
    { id: 'databases', name: 'Databáze' },
    { id: 'networks', name: 'Počítačové sítě' },
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`p-3 rounded-xl ${
              isModern
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)]/10 to-[var(--spsd-orange)]/10 border border-[var(--spsd-red)]/20'
                : 'bg-white/10 border border-white/20'
            }`}
          >
            <Award
              className={`w-6 h-6 ${
                isModern
                  ? 'text-blue-400'
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
              {tString('dashboard.bakalari.grades.title', 'Známky')}
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
              {tString('dashboard.bakalari.grades.subtitle', 'Přehled známek ze systému Bakaláři')}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`p-6 rounded-2xl mb-6 ${
          isModern
            ? 'glass border border-white/10'
            : classicMode === 'light'
            ? 'bg-white border border-gray-200 shadow-sm'
            : 'bg-white/5 border border-white/10'
        }`}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter
              className={`w-4 h-4 ${
                isModern
                  ? 'text-white/70'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/70'
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isModern
                  ? 'text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}
            >
              Filtry:
            </span>
          </div>

          {/* Semester Selection */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedSemester(1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSemester === 1
                  ? isModern
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : classicMode === 'light'
                    ? 'bg-[var(--spsd-red)]/10 text-[var(--spsd-red)] border border-[var(--spsd-red)]/20'
                    : 'bg-white/20 text-white border border-white/30'
                  : isModern
                  ? 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
                  : 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
              }`}
            >
              1. Pololetí
            </button>
            <button
              onClick={() => setSelectedSemester(2)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSemester === 2
                  ? isModern
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : classicMode === 'light'
                    ? 'bg-[var(--spsd-red)]/10 text-[var(--spsd-red)] border border-[var(--spsd-red)]/20'
                    : 'bg-white/20 text-white border border-white/30'
                  : isModern
                  ? 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
                  : 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
              }`}
            >
              2. Pololetí
            </button>
          </div>

          {/* Subject Selection */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              isModern
                ? 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                : classicMode === 'light'
                ? 'bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200'
                : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
            }`}
          >
            {mockSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Coming Soon Component */}
      <ComingSoon
        title="Systém známek Bakaláři"
        description="Zde se zobrazí vaše známky ze systému Bakaláři včetně průměrů, statistik a časové osy hodnocení."
        features={[
          'Přehled známek podle předmětů',
          'Průměr známek za pololetí',
          'Detaily každé známky (datum, typ, váha)',
          'Grafy vývoje známek v čase',
          'Export známek do PDF/CSV',
          'Porovnání s třídním průměrem',
        ]}
        technicalDetails={{
          status: 'pending',
          apiEndpoint: '/api/bakalari/grades',
          dataSource: 'Bakaláři API',
          estimatedCompletion: 'Q2 2025',
        }}
      />

      {/* Mock UI Structure (commented out for now) */}
      {/*
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="glass p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-white/70">Celkový průměr</span>
          </div>
          <div className="text-3xl font-bold text-white">1.85</div>
          <div className="text-xs text-green-400 mt-1">↑ +0.15 oproti minulému pololetí</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-white/70">Počet známek</span>
          </div>
          <div className="text-3xl font-bold text-white">42</div>
          <div className="text-xs text-white/50 mt-1">v tomto pololetí</div>
        </div>

        <div className="glass p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-white/70">Poslední známka</span>
          </div>
          <div className="text-3xl font-bold text-white">1</div>
          <div className="text-xs text-white/50 mt-1">Programování, před 2 dny</div>
        </div>
      </div>
      */}
    </div>
  );
}
