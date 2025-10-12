'use client';

import React from 'react';
import Link from 'next/link';
import { Home, BookOpen, FolderOpen, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';

export const Classic404: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

  const actions = [
    { icon: Home, label: t('notFound.backHome', 'Zpět na domovskou stránku'), href: '/' },
    { icon: BookOpen, label: t('notFound.aboutProgram', 'Informace o IT oboru'), href: '/about' },
    { icon: FolderOpen, label: t('notFound.viewProjects', 'Prohlédnout naše projekty'), href: '/projects' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      classicMode === 'dark' 
        ? 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl mx-auto">
          {/* Error Icon */}
          <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 ${
            classicMode === 'dark'
              ? 'bg-white/10 border-2 border-white/20'
              : 'bg-white border-2 border-gray-300 shadow-lg'
          }`}>
            <AlertCircle className={`w-12 h-12 ${
              classicMode === 'dark' ? 'text-[var(--spsd-red)]' : 'text-red-500'
            }`} />
          </div>

          {/* 404 Number */}
          <h1 className={`text-8xl md:text-9xl font-bold mb-6 ${
            classicMode === 'dark' 
              ? 'text-white' 
              : 'text-[var(--spsd-navy)]'
          }`}>
            404
          </h1>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              classicMode === 'dark' ? 'text-white' : 'text-[var(--spsd-navy)]'
            }`}>
              {t('notFound.subtitle', 'Jejda! Tato stránka neexistuje')}
            </h2>
            <p className={`text-lg mb-6 ${
              classicMode === 'dark' ? 'text-white/80' : 'text-gray-600'
            }`}>
              {t('notFound.description', 'Stránka, kterou hledáte, byla přesunuta, smazána nebo možná nikdy neexistovala.')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mb-12">
            <p className={`text-sm mb-6 ${
              classicMode === 'dark' ? 'text-white/70' : 'text-gray-600'
            }`}>
              {t('notFound.suggestions', 'Návrhy pro vás:')}
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`group flex items-center justify-center gap-3 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                      classicMode === 'dark'
                        ? 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30'
                        : 'bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-[var(--spsd-navy)] shadow-md hover:shadow-lg'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      classicMode === 'dark' 
                        ? 'text-white/80 group-hover:text-white' 
                        : 'text-[var(--spsd-navy)] group-hover:text-[var(--spsd-red)]'
                    }`} />
                    <span className={`text-sm font-medium ${
                      classicMode === 'dark' 
                        ? 'text-white/90 group-hover:text-white' 
                        : 'text-[var(--spsd-navy)] group-hover:text-[var(--spsd-red)]'
                    }`}>
                      {action.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className={`p-6 rounded-lg ${
            classicMode === 'dark'
              ? 'bg-white/10 border border-white/20'
              : 'bg-white border border-gray-300 shadow-md'
          }`}>
            <p className={`text-sm leading-relaxed ${
              classicMode === 'dark' ? 'text-white/80' : 'text-gray-700'
            }`}>
              {t('notFound.helpText', 'Potřebujete pomoc? Zkuste použít vyhledávání nebo se vraťte na domovskou stránku.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};