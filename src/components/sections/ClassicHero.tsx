'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { BookOpen, Users, Trophy, ArrowRight, FolderOpen, School } from 'lucide-react';

export const ClassicHero: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      classicMode === 'light'
        ? 'bg-white'
        : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
    }`}>
      <div className="container mx-auto px-4">
        {/* Accent bar */}
        <div className={`w-24 h-1 mx-auto mb-12 rounded-full ${
          classicMode === 'light'
            ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
            : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
        }`}></div>
        
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}>
            {t('hero.title', 'IT Obor SPŠD')}
          </h1>
          <p className={`text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/80'
              : 'text-white/90'
          }`}>
            {t('hero.subtitle', 'Kvalitní technické vzdělání pro budoucnost')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/about"
              className="group relative overflow-hidden bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              <School className="w-5 h-5" />
              <span>{t('hero.aboutButton', 'O škole')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/projects"
              className={`group relative overflow-hidden px-8 py-4 rounded-xl font-semibold transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-3 ${
                classicMode === 'light'
                  ? 'bg-white border-2 border-[var(--spsd-navy)] text-[var(--spsd-navy)] hover:bg-[var(--spsd-navy)] hover:text-white shadow-lg hover:shadow-xl'
                  : 'bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-xl hover:shadow-2xl'
              }`}
            >
              <FolderOpen className="w-5 h-5" />
              <span>{t('hero.projectsButton', 'Projekty')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                classicMode === 'light'
                  ? 'bg-gradient-to-r from-[var(--spsd-navy)]/10 to-transparent'
                  : 'bg-gradient-to-r from-white/10 to-transparent'
              }`}></div>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            classicMode === 'light'
              ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
          }`}>
            <BookOpen className={`w-12 h-12 mx-auto mb-4 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-red)]'
                : 'text-white'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}>
              {t('hero.feature1Title', 'Kvalitní výuka')}
            </h3>
            <p className={`text-sm ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]/70'
                : 'text-white/80'
            }`}>
              {t('hero.feature1Desc', 'Moderní učebny a zkušení pedagogové')}
            </p>
          </div>
          <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            classicMode === 'light'
              ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
          }`}>
            <Users className={`w-12 h-12 mx-auto mb-4 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-red)]'
                : 'text-white'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}>
              {t('hero.feature2Title', 'Praxe ve firmách')}
            </h3>
            <p className={`text-sm ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]/70'
                : 'text-white/80'
            }`}>
              {t('hero.feature2Desc', 'Spolupráce s předními IT společnostmi')}
            </p>
          </div>
          <div className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
            classicMode === 'light'
              ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
          }`}>
            <Trophy className={`w-12 h-12 mx-auto mb-4 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-red)]'
                : 'text-white'
            }`} />
            <h3 className={`text-lg font-semibold mb-2 ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}>
              {t('hero.feature3Title', 'Úspěchy studentů')}
            </h3>
            <p className={`text-sm ${
              classicMode === 'light'
                ? 'text-[var(--spsd-navy)]/70'
                : 'text-white/80'
            }`}>
              {t('hero.feature3Desc', 'Vítězství v soutěžích a hackathonech')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};