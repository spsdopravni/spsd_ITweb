'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export const ClassicCallToAction: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

  return (
    <section className={`py-16 md:py-24 transition-colors duration-300 ${
      classicMode === 'light'
        ? 'bg-gray-50'
        : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`w-24 h-1 mx-auto mb-8 rounded-full ${
            classicMode === 'light'
              ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
              : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
          }`}></div>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}>
            {t('cta.title', 'Připoj se k nám')}
          </h2>
          <p className={`text-lg md:text-xl mb-12 ${
            classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/70'
              : 'text-white/90'
          }`}>
            {t('cta.description', 'Staň se součástí naší školy a rozviň svůj potenciál v IT')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              classicMode === 'light'
                ? 'bg-white border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
            }`}>
              <Phone className={`w-8 h-8 mx-auto mb-3 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-red)]'
                  : 'text-white'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}>Telefon</h3>
              <p className={`${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/70'
                  : 'text-white/90'
              }`}>{t('contact.realPhone', '+420 725 044 828')}</p>
            </div>
            <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              classicMode === 'light'
                ? 'bg-white border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
            }`}>
              <Mail className={`w-8 h-8 mx-auto mb-3 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-red)]'
                  : 'text-white'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}>Email</h3>
              <p className={`${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/70'
                  : 'text-white/90'
              }`}>{t('contact.realEmail', 'studijnioddeleni@sps-dopravni.cz')}</p>
            </div>
            <div className={`rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              classicMode === 'light'
                ? 'bg-white border border-gray-200 hover:border-[var(--spsd-red)]/30 shadow-md'
                : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
            }`}>
              <MapPin className={`w-8 h-8 mx-auto mb-3 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-red)]'
                  : 'text-white'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}>Adresa</h3>
              <p className={`${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/70'
                  : 'text-white/90'
              }`}>{t('contact.realAddress', 'Plzeňská 298/217a, 150 00 Praha 5 - Motol')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/apply"
              className="bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              {t('cta.applyButton', 'Podat přihlášku')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact"
              className={`px-8 py-4 rounded-xl font-semibold border-2 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                classicMode === 'light'
                  ? 'bg-white border-[var(--spsd-navy)] text-[var(--spsd-navy)] hover:bg-[var(--spsd-navy)] hover:text-white shadow-lg hover:shadow-xl'
                  : 'bg-transparent border-white text-white hover:bg-white hover:text-[var(--spsd-navy)] hover:shadow-xl'
              }`}
            >
              {t('cta.contactButton', 'Kontaktovat školu')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};