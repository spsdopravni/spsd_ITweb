'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Award, Briefcase } from 'lucide-react';

export const ClassicSuccessStories: React.FC = () => {
  const { t } = useLanguage();

  const stories = [
    {
      name: 'Jan Novák',
      year: '2023',
      achievement: 'Frontend Developer v Google',
      description: 'Po absolvování školy získal pozici junior developera v prestižní technologické společnosti.',
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      name: 'Marie Svobodová',
      year: '2022',
      achievement: 'Vítězka národního hackathonu',
      description: 'Se svým týmem vytvořila inovativní řešení pro zdravotnictví a získala první místo.',
      icon: <Award className="w-6 h-6" />
    },
    {
      name: 'Petr Dvořák',
      year: '2023',
      achievement: 'Založení vlastního startupu',
      description: 'Během studia založil úspěšný startup zaměřený na AI a strojové učení.',
      icon: <Star className="w-6 h-6" />
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="accent-bar w-24 mx-auto"></div>
          <h2 className="text-4xl font-bold mb-4">{t('stories.title', 'Úspěchy našich absolventů')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('stories.description', 'Naši studenti dosahují výjimečných výsledků již během studia i po jeho dokončení')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="card">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white flex items-center justify-center mr-4">
                  {story.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-sm text-[var(--spsd-red)]">Absolvent {story.year}</p>
                </div>
              </div>
              <h4 className="font-semibold mb-2 text-[var(--spsd-navy)]">{story.achievement}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{story.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] text-white px-8 py-4 rounded-lg">
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm opacity-90">Úspěšnost u maturity</div>
              </div>
              <div>
                <div className="text-3xl font-bold">82%</div>
                <div className="text-sm opacity-90">Pokračuje na VŠ</div>
              </div>
              <div>
                <div className="text-3xl font-bold">73%</div>
                <div className="text-sm opacity-90">Práce v oboru</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};