'use client';

import React, { useState, useEffect } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Award,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Eye,
  EyeOff,
  Shield,
  AlertTriangle,
  Lock
} from 'lucide-react';
import type { Grade, SubjectGradeSummary } from '@/types/bakalari';
import { GradeType } from '@/types/bakalari';

/**
 * Bakaláři Grades Page - Enhanced UI
 *
 * Modern, visual grade display with:
 * - Card-based subject layout
 * - Grade trends and statistics
 * - Visual indicators (colors, charts)
 * - Smart filtering
 * - Performance insights
 */

export default function BakalariGradesPage() {
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { t } = useLanguage();
  const { user } = useAuth();
  const isModern = theme === 'modern';

  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [selectedSubject] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'detailed'>('cards');
  const [showOnlyRecent, setShowOnlyRecent] = useState(false);

  // State for grades data (will come from API)
  const [gradesData, setGradesData] = useState<SubjectGradeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Check if user is admin (Testing Interface restriction)
  const isAdmin = user?.role === 'administrator' || user?.role === 'ADMIN';

  // Helper to get string from t()
  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  // Fetch grades data
  useEffect(() => {
    async function fetchGrades() {
      // Check admin access before fetching
      if (!isAdmin) {
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/bakalari/grades');

        // Handle 403 Forbidden (non-admin access)
        if (response.status === 403) {
          setAccessDenied(true);
          setLoading(false);
          return;
        }

        const { data } = await response.json();

        if (data && !data.mockData) {
          setGradesData(data);
        } else {
          // Use mock data for development
          setGradesData(getMockGradesData());
        }
      } catch (error) {
        console.error('Failed to fetch grades:', error);
        setGradesData(getMockGradesData());
      } finally {
        setLoading(false);
      }
    }

    fetchGrades();
  }, [selectedSemester, isAdmin]);

  // Calculate statistics
  const calculateStats = () => {
    if (gradesData.length === 0) return { average: '0.00', best: '-', worst: '-', total: 0 };

    const allGrades = gradesData.flatMap(s => s.grades.map(g => parseInt(g.grade))).filter(g => !isNaN(g));
    const average = allGrades.reduce((a, b) => a + b, 0) / allGrades.length;
    const best = Math.min(...allGrades);
    const worst = Math.max(...allGrades);

    return {
      average: average.toFixed(2),
      best: best.toString(),
      worst: worst.toString(),
      total: allGrades.length
    };
  };

  const stats = calculateStats();

  // Filter subjects
  const filteredSubjects = selectedSubject === 'all'
    ? gradesData
    : gradesData.filter(s => s.subjectId === selectedSubject);

  // Access Denied UI
  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              isModern
                ? 'bg-red-500/20 border border-red-500/30'
                : classicMode === 'light'
                ? 'bg-red-50 border border-red-200'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <Lock className={`w-10 h-10 ${
              isModern ? 'text-red-400' : classicMode === 'light' ? 'text-red-600' : 'text-red-300'
            }`} />
          </div>
          <h1
            className={`text-2xl font-bold mb-4 ${
              isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
            }`}
          >
            Přístup odepřen
          </h1>
          <p
            className={`text-base mb-8 ${
              isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/80'
            }`}
          >
            Toto je testovací rozhraní dostupné pouze pro administrátory. Pro přístup kontaktujte
            správce systému.
          </p>
          <div
            className={`rounded-xl p-4 ${
              isModern
                ? 'glass border border-yellow-500/30'
                : classicMode === 'light'
                ? 'bg-yellow-50 border border-yellow-200'
                : 'bg-yellow-500/20 border border-yellow-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                isModern ? 'text-yellow-400' : classicMode === 'light' ? 'text-yellow-600' : 'text-yellow-300'
              }`} />
              <div className="text-left">
                <p className={`text-sm font-semibold mb-1 ${
                  isModern ? 'text-yellow-400' : classicMode === 'light' ? 'text-yellow-700' : 'text-yellow-300'
                }`}>
                  Informace o testovacím režimu
                </p>
                <p className={`text-xs ${
                  isModern ? 'text-white/70' : classicMode === 'light' ? 'text-yellow-700/80' : 'text-yellow-200/90'
                }`}>
                  Integrace s Bakaláři je v testovací fázi. Data jsou dostupná pouze administrátorům
                  pro účely testování a vývoje.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Testing Interface Banner - Admin Only */}
      {isAdmin && (
        <div
          className={`mb-6 rounded-2xl p-4 border-2 ${
            isModern
              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/30'
              : classicMode === 'light'
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
              : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              isModern
                ? 'bg-blue-500/20 border border-blue-500/30'
                : classicMode === 'light'
                ? 'bg-blue-100 border border-blue-200'
                : 'bg-blue-500/30 border border-blue-400/40'
            }`}>
              <Shield className={`w-6 h-6 ${
                isModern ? 'text-blue-400' : classicMode === 'light' ? 'text-blue-600' : 'text-blue-300'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`font-bold ${
                  isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                }`}>
                  Testovací rozhraní - Pouze pro administrátory
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  isModern
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : classicMode === 'light'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-blue-500/30 text-blue-300 border border-blue-400/40'
                }`}>
                  READ-ONLY
                </span>
              </div>
              <p className={`text-sm ${
                isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/80'
              }`}>
                Toto je testovací prostředí pro integraci s Bakaláři. Data jsou pouze pro čtení a slouží
                k vývoji a testování nových funkcí. Žádné změny nejsou možné.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
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
                {tString('dashboard.bakalari.grades.subtitle', '1. pololetí šk. roku 2025/26')}
              </p>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'cards'
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
              Karty
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'detailed'
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
              Detailní
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={TrendingUp}
          label="Průměr"
          value={stats.average}
          change="+0.15"
          isPositive={true}
          isModern={isModern}
          classicMode={classicMode}
        />
        <StatCard
          icon={Award}
          label="Nejlepší známka"
          value={stats.best}
          isModern={isModern}
          classicMode={classicMode}
        />
        <StatCard
          icon={Award}
          label="Nejhorší známka"
          value={stats.worst}
          isModern={isModern}
          classicMode={classicMode}
        />
        <StatCard
          icon={Calendar}
          label="Počet známek"
          value={stats.total.toString()}
          subtitle="v tomto pololetí"
          isModern={isModern}
          classicMode={classicMode}
        />
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

          {/* Recent Only Toggle */}
          <button
            onClick={() => setShowOnlyRecent(!showOnlyRecent)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showOnlyRecent
                ? isModern
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : classicMode === 'light'
                  ? 'bg-purple-100 text-purple-700 border border-purple-200'
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : isModern
                ? 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
                : classicMode === 'light'
                ? 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
                : 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
            }`}
          >
            {showOnlyRecent ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            Pouze poslední měsíc
          </button>

          {/* Export Button */}
          <button
            className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isModern
                ? 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10 hover:text-white'
                : classicMode === 'light'
                ? 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
                : 'bg-white/5 text-white/70 border border-transparent hover:bg-white/10'
            }`}
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Grades Display */}
      {loading ? (
        <div className="text-center py-20">
          <div className={`text-lg ${isModern ? 'text-white' : classicMode === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Načítám známky...
          </div>
        </div>
      ) : viewMode === 'cards' ? (
        <SubjectCardsView subjects={filteredSubjects} isModern={isModern} classicMode={classicMode} />
      ) : (
        <DetailedGradesView subjects={filteredSubjects} isModern={isModern} classicMode={classicMode} />
      )}
    </div>
  );
}

// Statistics Card Component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  isModern: boolean;
  classicMode: 'light' | 'dark';
}

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  isPositive,
  subtitle,
  isModern,
  classicMode
}: StatCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        isModern
          ? 'glass border-white/10'
          : classicMode === 'light'
          ? 'bg-white border-gray-200 shadow-sm'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon
          className={`w-5 h-5 ${
            isModern
              ? 'text-blue-400'
              : classicMode === 'light'
              ? 'text-[var(--spsd-red)]'
              : 'text-white'
          }`}
        />
        <span
          className={`text-sm ${
            isModern
              ? 'text-white/70'
              : classicMode === 'light'
              ? 'text-gray-600'
              : 'text-white/70'
          }`}
        >
          {label}
        </span>
      </div>
      <div
        className={`text-3xl font-bold ${
          isModern
            ? 'text-white'
            : classicMode === 'light'
            ? 'text-[var(--spsd-navy)]'
            : 'text-white'
        }`}
      >
        {value}
      </div>
      {change && (
        <div className={`text-xs mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {change} oproti minulému pololetí
        </div>
      )}
      {subtitle && (
        <div
          className={`text-xs mt-1 ${
            isModern ? 'text-white/50' : classicMode === 'light' ? 'text-gray-500' : 'text-white/50'
          }`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

// Subject Cards View
interface SubjectCardsViewProps {
  subjects: SubjectGradeSummary[];
  isModern: boolean;
  classicMode: 'light' | 'dark';
}

function SubjectCardsView({ subjects, isModern, classicMode }: SubjectCardsViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {subjects.map((subject: SubjectGradeSummary) => (
        <SubjectCard key={subject.subjectId} subject={subject} isModern={isModern} classicMode={classicMode} />
      ))}
    </div>
  );
}

// Single Subject Card
interface SubjectCardProps {
  subject: SubjectGradeSummary;
  isModern: boolean;
  classicMode: 'light' | 'dark';
}

function SubjectCard({ subject, isModern, classicMode }: SubjectCardProps) {
  const getGradeColor = (grade: string) => {
    const numGrade = parseInt(grade);
    if (numGrade === 1) return 'bg-green-500';
    if (numGrade === 2) return 'bg-blue-500';
    if (numGrade === 3) return 'bg-yellow-500';
    if (numGrade === 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAverageColor = (avg: number) => {
    if (avg <= 1.5) return 'text-green-400';
    if (avg <= 2.5) return 'text-blue-400';
    if (avg <= 3.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div
      className={`p-6 rounded-2xl border transition-all hover:scale-105 ${
        isModern
          ? 'glass border-white/10 hover:border-blue-500/30'
          : classicMode === 'light'
          ? 'bg-white border-gray-200 shadow-sm hover:shadow-md'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      {/* Subject Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3
            className={`text-lg font-bold mb-1 ${
              isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
            }`}
          >
            {subject.subjectName}
          </h3>
          <p
            className={`text-sm ${
              isModern ? 'text-white/60' : classicMode === 'light' ? 'text-gray-600' : 'text-white/60'
            }`}
          >
            {subject.teacherName}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getAverageColor(subject.averageGrade)}`}>
            {subject.averageGrade.toFixed(2)}
          </div>
          <div
            className={`text-xs ${
              isModern ? 'text-white/50' : classicMode === 'light' ? 'text-gray-500' : 'text-white/50'
            }`}
          >
            průměr
          </div>
        </div>
      </div>

      {/* Grades Timeline */}
      <div className="flex flex-wrap gap-2 mb-4">
        {subject.grades.slice(-8).map((grade: Grade) => (
          <div
            key={grade.id}
            className="group relative"
            title={`${grade.description || grade.gradeType} - ${new Date(grade.date).toLocaleDateString('cs-CZ')}`}
          >
            <div
              className={`w-10 h-10 rounded-lg ${getGradeColor(grade.grade)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
            >
              {grade.grade}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {grade.description || grade.gradeType}
              <br />
              {new Date(grade.date).toLocaleDateString('cs-CZ')}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm pt-4 border-t border-white/10">
        <span
          className={`${
            isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/70'
          }`}
        >
          Známek: {subject.grades.length}
        </span>
        <span
          className={`${
            isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/70'
          }`}
        >
          Váha: {subject.totalWeight}
        </span>
      </div>
    </div>
  );
}

// Detailed Grades View (Table)
interface DetailedGradesViewProps {
  subjects: SubjectGradeSummary[];
  isModern: boolean;
  classicMode: 'light' | 'dark';
}

function DetailedGradesView({ subjects, isModern, classicMode }: DetailedGradesViewProps) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isModern
          ? 'glass border-white/10'
          : classicMode === 'light'
          ? 'bg-white border-gray-200 shadow-sm'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className={`border-b ${
                isModern
                  ? 'border-white/10 bg-white/5'
                  : classicMode === 'light'
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <th className="text-left p-4 font-semibold">Předmět</th>
              <th className="text-left p-4 font-semibold">Učitel</th>
              <th className="text-center p-4 font-semibold">Průměr</th>
              <th className="text-left p-4 font-semibold">Známky</th>
              <th className="text-center p-4 font-semibold">Počet</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject: SubjectGradeSummary) => (
              <tr
                key={subject.subjectId}
                className={`border-b ${
                  isModern
                    ? 'border-white/5 hover:bg-white/5'
                    : classicMode === 'light'
                    ? 'border-gray-100 hover:bg-gray-50'
                    : 'border-white/5 hover:bg-white/5'
                } transition-colors`}
              >
                <td className="p-4 font-medium">{subject.subjectName}</td>
                <td className="p-4 text-sm opacity-70">{subject.teacherName}</td>
                <td className="p-4 text-center">
                  <span className="text-2xl font-bold">{subject.averageGrade.toFixed(2)}</span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {subject.grades.map((grade: Grade) => (
                      <span
                        key={grade.id}
                        className="px-2 py-1 rounded text-sm font-medium bg-blue-500/20 text-blue-400"
                        title={`${grade.description} - ${new Date(grade.date).toLocaleDateString('cs-CZ')}`}
                      >
                        {grade.grade}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-center opacity-70">{subject.grades.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Mock data for development
function getMockGradesData(): SubjectGradeSummary[] {
  return [
    {
      subjectId: 'prog',
      subjectName: 'Programování',
      subjectAbbreviation: 'PRG',
      averageGrade: 1.33,
      grades: [
        {
          id: '1',
          subjectId: 'prog',
          subjectName: 'Programování',
          subjectAbbreviation: 'PRG',
          grade: '1',
          gradeType: GradeType.WRITTEN,
          weight: 3,
          date: '2025-09-15T00:00:00Z',
          description: 'Test z OOP',
          teacherId: 't1',
          teacherName: 'Mgr. Novák',
          isTemporary: false,
        },
        {
          id: '2',
          subjectId: 'prog',
          subjectName: 'Programování',
          subjectAbbreviation: 'PRG',
          grade: '1',
          gradeType: GradeType.PROJECT,
          weight: 5,
          date: '2025-10-01T00:00:00Z',
          description: 'Projekt: Kalkulačka',
          teacherId: 't1',
          teacherName: 'Mgr. Novák',
          isTemporary: false,
        },
        {
          id: '3',
          subjectId: 'prog',
          subjectName: 'Programování',
          subjectAbbreviation: 'PRG',
          grade: '2',
          gradeType: GradeType.ORAL,
          weight: 1,
          date: '2025-10-08T00:00:00Z',
          description: 'Odpověď u tabule',
          teacherId: 't1',
          teacherName: 'Mgr. Novák',
          isTemporary: false,
        },
      ],
      teacherName: 'Mgr. Novák',
      totalWeight: 9,
    },
    {
      subjectId: 'mat',
      subjectName: 'Matematika',
      subjectAbbreviation: 'MAT',
      averageGrade: 2.0,
      grades: [
        {
          id: '4',
          subjectId: 'mat',
          subjectName: 'Matematika',
          subjectAbbreviation: 'MAT',
          grade: '2',
          gradeType: GradeType.TEST,
          weight: 3,
          date: '2025-09-20T00:00:00Z',
          description: 'Test z derivací',
          teacherId: 't2',
          teacherName: 'Mgr. Svobodová',
          isTemporary: false,
        },
        {
          id: '5',
          subjectId: 'mat',
          subjectName: 'Matematika',
          subjectAbbreviation: 'MAT',
          grade: '2',
          gradeType: GradeType.WRITTEN,
          weight: 2,
          date: '2025-10-05T00:00:00Z',
          description: 'Písemka',
          teacherId: 't2',
          teacherName: 'Mgr. Svobodová',
          isTemporary: false,
        },
      ],
      teacherName: 'Mgr. Svobodová',
      totalWeight: 5,
    },
    {
      subjectId: 'db',
      subjectName: 'Databázové systémy',
      subjectAbbreviation: 'DBS',
      averageGrade: 1.5,
      grades: [
        {
          id: '6',
          subjectId: 'db',
          subjectName: 'Databázové systémy',
          subjectAbbreviation: 'DBS',
          grade: '1',
          gradeType: GradeType.PROJECT,
          weight: 4,
          date: '2025-09-25T00:00:00Z',
          description: 'Projekt: ER diagram',
          teacherId: 't3',
          teacherName: 'Ing. Dvořák',
          isTemporary: false,
        },
        {
          id: '7',
          subjectId: 'db',
          subjectName: 'Databázové systémy',
          subjectAbbreviation: 'DBS',
          grade: '2',
          gradeType: GradeType.TEST,
          weight: 3,
          date: '2025-10-10T00:00:00Z',
          description: 'Test z SQL',
          teacherId: 't3',
          teacherName: 'Ing. Dvořák',
          isTemporary: false,
        },
      ],
      teacherName: 'Ing. Dvořák',
      totalWeight: 7,
    },
  ];
}
