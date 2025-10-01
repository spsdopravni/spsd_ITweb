'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, BookOpen, Users, Trophy } from 'lucide-react';

export const ClassicHero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <div className="container mx-auto px-4">
        <div className="accent-bar w-24 mx-auto"></div>
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            {t('hero.title', 'IT Obor SPŠD')}
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            {t('hero.subtitle', 'Kvalitní technické vzdělání pro budoucnost')}
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link 
              href="/about"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t('hero.aboutButton', 'O škole')}
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/projects"
              className="btn-secondary inline-flex items-center gap-2"
            >
              {t('hero.projectsButton', 'Projekty')}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="card text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-[var(--spsd-navy)]" />
            <h3 className="text-lg font-semibold mb-2">Kvalitní výuka</h3>
            <p className="text-sm">Moderní učebny a zkušení pedagogové</p>
          </div>
          <div className="card text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-[var(--spsd-navy)]" />
            <h3 className="text-lg font-semibold mb-2">Praxe ve firmách</h3>
            <p className="text-sm">Spolupráce s předními IT společnostmi</p>
          </div>
          <div className="card text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-[var(--spsd-navy)]" />
            <h3 className="text-lg font-semibold mb-2">Úspěchy studentů</h3>
            <p className="text-sm">Vítězství v soutěžích a hackathonech</p>
          </div>
        </div>
      </div>
    </section>
  );
};