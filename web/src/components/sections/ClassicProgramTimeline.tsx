'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { Calendar, Code, Database, Globe } from 'lucide-react';

export const ClassicProgramTimeline: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

  const timeline = [
    {
      year: '1. ročník',
      icon: <Code className="w-6 h-6" />,
      title: 'Základy programování',
      subjects: ['Algoritmizace', 'HTML/CSS', 'JavaScript základy', 'Databáze úvod']
    },
    {
      year: '2. ročník',
      icon: <Database className="w-6 h-6" />,
      title: 'Pokročilé technologie',
      subjects: ['OOP programování', 'SQL databáze', 'React/Vue', 'Git verzování']
    },
    {
      year: '3. ročník',
      icon: <Globe className="w-6 h-6" />,
      title: 'Profesionální vývoj',
      subjects: ['Full-stack development', 'Cloud technologie', 'DevOps', 'Týmové projekty']
    },
    {
      year: '4. ročník',
      icon: <Calendar className="w-6 h-6" />,
      title: 'Specializace a maturita',
      subjects: ['Maturitní projekt', 'Firemní praxe', 'Specializační předměty', 'Příprava na VŠ']
    }
  ];

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      classicMode === 'light'
        ? 'bg-gray-50'
        : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${
            classicMode === 'light'
              ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
              : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
          }`}></div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}>
            {t('timeline.title', '4 roky k IT odborníkovi')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/70'
              : 'text-white/80'
          }`}>
            {t('timeline.description', 'Čtyřletý vzdělávací program zaměřený na praktické dovednosti v IT')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {timeline.map((item, index) => (
            <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              classicMode === 'light'
                ? 'bg-white border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md hover:shadow-xl'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
            }`}>
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-3 ${
                  classicMode === 'light'
                    ? 'bg-gradient-to-br from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white'
                    : 'bg-white/20 backdrop-blur text-white'
                }`}>
                  {item.icon}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${
                    classicMode === 'light'
                      ? 'text-[var(--spsd-red)]'
                      : 'text-white/90'
                  }`}>{item.year}</div>
                  <h3 className={`font-semibold ${
                    classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]'
                      : 'text-white'
                  }`}>{item.title}</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {item.subjects.map((subject, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${
                      classicMode === 'light'
                        ? 'bg-[var(--spsd-orange)]'
                        : 'bg-[var(--spsd-orange)]'
                    }`}></span>
                    <span className={`text-sm ${
                      classicMode === 'light'
                        ? 'text-[var(--spsd-navy)]/70'
                        : 'text-white/80'
                    }`}>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};