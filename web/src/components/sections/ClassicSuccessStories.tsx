'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { Star, Award, Briefcase } from 'lucide-react';

export const ClassicSuccessStories: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

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
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      classicMode === 'light'
        ? 'bg-white'
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
            {t('stories.title', 'Naši absolventi mění svět')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/70'
              : 'text-white/80'
          }`}>
            {t('stories.description', 'Naši studenti dosahují výjimečných výsledků již během studia i po jeho dokončení')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              classicMode === 'light'
                ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
            }`}>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white flex items-center justify-center mr-4">
                  {story.icon}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]'
                      : 'text-white'
                  }`}>{story.name}</h3>
                  <p className={`text-sm ${
                    classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]/70'
                      : 'text-white/90'
                  }`}>Absolvent {story.year}</p>
                </div>
              </div>
              <h4 className={`font-semibold mb-2 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}>{story.achievement}</h4>
              <p className={`text-sm leading-relaxed ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/70'
                  : 'text-white/80'
              }`}>{story.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className={`rounded-2xl p-8 shadow-lg ${
            classicMode === 'light'
              ? 'bg-gradient-to-br from-gray-50 to-white border border-gray-200'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`group text-center rounded-xl p-6 transition-all duration-300 ${
                classicMode === 'light'
                  ? 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-sm hover:shadow-md'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}>
                <div className={`text-4xl font-bold mb-2 group-hover:text-[var(--spsd-red)] transition-colors duration-300 ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}>95%</div>
                <div className={`text-sm font-medium ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]/70'
                    : 'text-white/80'
                }`}>Úspěšnost u maturity</div>
              </div>
              <div className={`group text-center rounded-xl p-6 transition-all duration-300 ${
                classicMode === 'light'
                  ? 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-sm hover:shadow-md'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}>
                <div className={`text-4xl font-bold mb-2 group-hover:text-[var(--spsd-red)] transition-colors duration-300 ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}>82%</div>
                <div className={`text-sm font-medium ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]/70'
                    : 'text-white/80'
                }`}>Pokračuje na VŠ</div>
              </div>
              <div className={`group text-center rounded-xl p-6 transition-all duration-300 ${
                classicMode === 'light'
                  ? 'bg-white hover:bg-gray-50 border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-sm hover:shadow-md'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}>
                <div className={`text-4xl font-bold mb-2 group-hover:text-[var(--spsd-red)] transition-colors duration-300 ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}>73%</div>
                <div className={`text-sm font-medium ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]/70'
                    : 'text-white/80'
                }`}>Práce v oboru</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};