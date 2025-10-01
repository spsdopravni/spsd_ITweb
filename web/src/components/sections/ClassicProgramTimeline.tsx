'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Code, Database, Globe } from 'lucide-react';

export const ClassicProgramTimeline: React.FC = () => {
  const { t } = useLanguage();

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
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="accent-bar w-24 mx-auto"></div>
          <h2 className="text-4xl font-bold mb-4">{t('timeline.title', 'Studijní program')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('timeline.description', 'Čtyřletý vzdělávací program zaměřený na praktické dovednosti v IT')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((item, index) => (
            <div key={index} className="card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-[var(--spsd-navy)] text-white flex items-center justify-center mr-3">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm text-[var(--spsd-red)] font-semibold">{item.year}</div>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
              </div>
              <ul className="space-y-2">
                {item.subjects.map((subject, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-600">{subject}</span>
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