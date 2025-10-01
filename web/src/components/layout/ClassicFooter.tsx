'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Github } from 'lucide-react';

export const ClassicFooter: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = usePreferences();

  const footerLinks = [
    {
      title: t('footer.about', 'O škole'),
      links: [
        { label: t('footer.history', 'Historie'), href: '/history' },
        { label: t('footer.faculty', 'Fakultní škola'), href: '/faculty' },
        { label: t('footer.teachers', 'Pedagogové'), href: '/teachers' },
        { label: t('footer.facilities', 'Vybavení'), href: '/facilities' }
      ]
    },
    {
      title: t('footer.education', 'Vzdělávání'),
      links: [
        { label: t('footer.curriculum', 'Učební plán'), href: '/curriculum' },
        { label: t('footer.projects', 'Projekty'), href: '/projects' },
        { label: t('footer.competitions', 'Soutěže'), href: '/competitions' },
        { label: t('footer.events', 'Akce'), href: '/events' }
      ]
    },
    {
      title: t('footer.students', 'Pro studenty'),
      links: [
        { label: t('footer.admission', 'Přijímací řízení'), href: '/admission' },
        { label: t('footer.scholarships', 'Stipendia'), href: '/scholarships' },
        { label: t('footer.resources', 'Zdroje'), href: '/resources' },
        { label: t('footer.career', 'Kariéra'), href: '/career' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Github, href: '#', label: 'GitHub' }
  ];

  return (
    <footer className={`border-t transition-colors duration-300 ${
      classicMode === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* School info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-6">
              <h3 className={`text-lg md:text-xl font-bold mb-2 ${
                classicMode === 'dark' ? 'text-white' : 'text-[var(--spsd-navy)]'
              }`}>
                IT Obor SPŠD
              </h3>
              <p className={`text-sm ${
                classicMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('footer.description', 'Střední průmyslová škola dopravní, Praha 5 - Motol')}
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className={`w-4 h-4 ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Praha 5 - Motol
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className={`w-4 h-4 ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  +420 123 456 789
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className={`w-4 h-4 ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  classicMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  info@spsd.cz
                </span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className={`text-lg font-semibold mb-4 ${
                classicMode === 'dark' ? 'text-white' : 'text-[var(--spsd-navy)]'
              }`}>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className={`text-sm transition-colors ${
                        classicMode === 'dark' 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-gray-600 hover:text-[var(--spsd-red)]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section */}
      <div className={`border-t py-6 ${
        classicMode === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <p className={`text-sm text-center lg:text-left ${
              classicMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © 2024 IT Obor SPŠD. {t('footer.rights', 'Všechna práva vyhrazena.')}.
            </p>

            {/* Social links */}
            <div className="flex space-x-3 order-last lg:order-none">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`p-2 rounded-lg transition-colors ${
                    classicMode === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                      : 'text-gray-500 hover:text-[var(--spsd-navy)] hover:bg-gray-100'
                  }`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center">
              <Link 
                href="/privacy"
                className={`text-sm transition-colors ${
                  classicMode === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-[var(--spsd-red)]'
                }`}
              >
                {t('footer.privacy', 'Ochrana osobních údajů')}
              </Link>
              <Link 
                href="/terms"
                className={`text-sm transition-colors ${
                  classicMode === 'dark' 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-[var(--spsd-red)]'
                }`}
              >
                {t('footer.terms', 'Podmínky použití')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};