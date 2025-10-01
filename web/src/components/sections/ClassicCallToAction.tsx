'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export const ClassicCallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="section bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            {t('cta.title', 'Připoj se k nám')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('cta.description', 'Staň se součástí naší školy a rozviň svůj potenciál v IT')}
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <Phone className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Telefon</h3>
              <p className="opacity-90">+420 123 456 789</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <Mail className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="opacity-90">info@spsd.cz</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <MapPin className="w-8 h-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Adresa</h3>
              <p className="opacity-90">Plzeň, Česká republika</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link 
              href="/apply"
              className="bg-white text-[var(--spsd-navy)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              {t('cta.applyButton', 'Podat přihlášku')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t('cta.contactButton', 'Kontaktovat školu')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};