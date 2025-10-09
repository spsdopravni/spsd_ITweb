'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Github, Sparkles, Heart } from 'lucide-react';

export const ClassicFooter: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();

  const footerLinks = [
    {
      title: t('footer.about', 'O škole'),
      links: [
        { label: t('footer.history', 'Historie'), href: '/history' },
        { label: t('footer.teachers', 'Pedagogové'), href: '/teachers' },
        { label: t('footer.facilities', 'Vybavení'), href: '/facilities' }
      ]
    },
    {
      title: t('footer.education', 'Vzdělávání'),
      links: [
        { label: t('footer.curriculum', 'Učební plán'), href: '/curriculum' },
        { label: t('footer.projects', 'Projekty'), href: '/projects' },
        { label: t('footer.events', 'Akce'), href: '/events' }
      ]
    },
    {
      title: t('footer.students', 'Pro studenty'),
      links: [
        { label: t('footer.admission', 'Přijímací řízení'), href: '/admission' },
        { label: t('footer.resources', 'Zdroje'), href: '/resources' },
        { label: t('footer.career', 'Kariéra'), href: '/career' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/spsdopravni', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/spsdopravni/', label: 'Instagram' },
    { icon: Youtube, href: 'https://www.youtube.com/@stredniprumyslovaskoladopr4784', label: 'YouTube' },
    { icon: Github, href: 'https://github.com/spsdopravni', label: 'GitHub' }
  ];

  return (
    <footer className={`relative transition-colors duration-300 overflow-hidden ${
      classicMode === 'light'
        ? 'bg-white text-[var(--spsd-navy)]'
        : 'bg-gradient-to-br from-[var(--spsd-navy)] via-[var(--spsd-navy-light)] to-[var(--spsd-navy)] text-white'
    }`}>
      {/* Animated background elements */}
      <div className={`absolute inset-0 ${classicMode === 'light' ? 'opacity-2' : 'opacity-5'}`}>
        <div className={`absolute top-0 left-0 w-96 h-96 bg-[var(--spsd-red)] rounded-full blur-3xl animate-pulse ${
          classicMode === 'light' ? 'opacity-30' : ''
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl animate-pulse delay-1000 ${
          classicMode === 'light' ? 'bg-[var(--spsd-navy)] opacity-20' : 'bg-white'
        }`}></div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* School info */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-gradient-to-br from-[var(--spsd-red)] to-[var(--spsd-red-light)] w-12 h-12 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>
                    IT Obor SPŠD
                  </h3>
                  <p className={`text-xs ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                  }`}>
                    Excellence in IT Education
                  </p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/80' : 'text-white/80'
              }`}>
                {t('footer.description', 'Střední průmyslová škola dopravní, Praha 5 - Motol')}
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-1">
              <div className={`flex items-center space-x-3 group p-2 rounded-lg transition-colors duration-200 ${
                classicMode === 'light' ? 'hover:bg-[var(--spsd-navy)]/5' : 'hover:bg-white/5'
              }`}>
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  classicMode === 'light'
                    ? 'bg-[var(--spsd-navy)]/10 group-hover:bg-[var(--spsd-navy)]/20'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <MapPin className={`w-4 h-4 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                }`}>
                  {t('contact.realAddress', 'Plzeňská 298/217a, 150 00 Praha 5 - Motol')}
                </span>
              </div>
              <div className={`flex items-center space-x-3 group p-2 rounded-lg transition-colors duration-200 ${
                classicMode === 'light' ? 'hover:bg-[var(--spsd-navy)]/5' : 'hover:bg-white/5'
              }`}>
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  classicMode === 'light'
                    ? 'bg-[var(--spsd-navy)]/10 group-hover:bg-[var(--spsd-navy)]/20'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <Phone className={`w-4 h-4 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                }`}>
                  {t('contact.realPhone', '+420 725 044 828')}
                </span>
              </div>
              <div className={`flex items-center space-x-3 group p-2 rounded-lg transition-colors duration-200 ${
                classicMode === 'light' ? 'hover:bg-[var(--spsd-navy)]/5' : 'hover:bg-white/5'
              }`}>
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  classicMode === 'light'
                    ? 'bg-[var(--spsd-navy)]/10 group-hover:bg-[var(--spsd-navy)]/20'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <Mail className={`w-4 h-4 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                }`}>
                  {t('contact.realEmail', 'studijnioddeleni@sps-dopravni.cz')}
                </span>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className={`text-lg font-bold pb-2 border-b ${
                classicMode === 'light' 
                  ? 'text-[var(--spsd-navy)] border-[var(--spsd-navy)]/20' 
                  : 'text-white border-white/20'
              }`}>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className={`group text-sm transition-all duration-200 flex items-center gap-2 p-1 rounded ${
                        classicMode === 'light'
                          ? 'text-[var(--spsd-navy)]/80 hover:text-[var(--spsd-navy)] hover:bg-[var(--spsd-navy)]/5'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="w-1 h-1 bg-[var(--spsd-red)] rounded-full group-hover:scale-150 transition-transform duration-200"></div>
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
      <div className={`py-6 relative z-10 border-t ${
        classicMode === 'light' ? 'border-[var(--spsd-navy)]/10' : 'border-white/10'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-center lg:text-left">
              <p className={`text-sm font-medium ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
              }`}>
                © 2025 IT Obor SPŠD. {t('footer.rights', 'Všechna práva vyhrazena.')}.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-[var(--spsd-red)] hover:to-[var(--spsd-red-light)] hover:scale-95 hover:-translate-y-1 shadow-lg hover:shadow-xl ${
                        classicMode === 'light'
                          ? 'bg-[var(--spsd-navy)]/10 text-[var(--spsd-navy)]/80 hover:text-white'
                          : 'bg-white/10 text-white/80 hover:text-white'
                      }`}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Legal links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-center">
              <Link 
                href="/privacy"
                className={`text-sm transition-colors hover:underline ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]/70 hover:text-[var(--spsd-navy)]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t('footer.privacy', 'Ochrana osobních údajů')}
              </Link>
              <Link 
                href="/terms"
                className={`text-sm transition-colors hover:underline ${
                  classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]/70 hover:text-[var(--spsd-navy)]'
                    : 'text-white/70 hover:text-white'
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