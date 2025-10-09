'use client';

import React, { useState } from 'react';
import { Sparkles, Github, Facebook, Youtube, Instagram, Heart, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ModernFooter: React.FC = () => {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const footerLinks = [
    {
      title: t('footer.platform') || 'Platform',
      links: [
        t('footer.platformLinks.dashboard') || 'Dashboard',
        t('footer.platformLinks.projects') || 'Projects',
        t('footer.platformLinks.events') || 'Events',
        t('footer.platformLinks.resources') || 'Resources',
        t('footer.platformLinks.analytics') || 'Analytics'
      ]
    },
    {
      title: t('footer.community') || 'Community',
      links: [
        t('footer.communityLinks.studyGroups') || 'Study Groups',
        t('footer.communityLinks.forums') || 'Forums',
        t('footer.communityLinks.mentorship') || 'Mentorship',
        t('footer.communityLinks.successStories') || 'Success Stories',
        t('footer.communityLinks.blog') || 'Blog'
      ]
    },
    {
      title: t('footer.support') || 'Support',
      links: [
        t('footer.supportLinks.helpCenter') || 'Help Center',
        t('footer.supportLinks.documentation') || 'Documentation',
        t('footer.supportLinks.api') || 'API',
        t('footer.supportLinks.status') || 'Status',
        t('footer.supportLinks.contact') || 'Contact'
      ]
    },
    {
      title: t('footer.legal') || 'Legal',
      links: [
        { text: t('footer.legalLinks.privacy') || 'Privacy Policy', href: '/privacy' },
        { text: t('footer.legalLinks.terms') || 'Terms of Service', href: '/terms' },
        { text: t('footer.legalLinks.cookies') || 'Cookie Policy', href: '#' },
        { text: t('footer.legalLinks.gdpr') || 'GDPR', href: '#' },
        { text: t('footer.legalLinks.licenses') || 'Licenses', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/spsdopravni' },
    { icon: Instagram, href: 'https://www.instagram.com/spsdopravni/' },
    { icon: Youtube, href: 'https://www.youtube.com/@stredniprumyslovaskoladopr4784' },
    { icon: Github, href: 'https://github.com/spsdopravni' },
  ];

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        {/* Mobile: Compact header, Desktop: Full layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 mb-8 lg:mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 lg:mb-4">
              <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-red-400" />
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {t('footer.title') || 'StudentHub'}
              </span>
            </div>
            <p className="text-gray-400 text-xs lg:text-sm mb-4 lg:mb-6">
              {t('footer.description') || 'Empowering students to achieve excellence through innovative digital solutions.'}
            </p>
            <div className="flex gap-2 lg:gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 lg:w-10 lg:h-10 glass rounded-lg flex items-center justify-center
                             text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="border-b border-white/10 lg:border-0 pb-4 lg:pb-0">
              {/* Desktop: Normal display, Mobile: Collapsible */}
              <h3 
                className="text-white font-semibold mb-2 lg:mb-4 lg:cursor-default cursor-pointer flex items-center justify-between lg:justify-start py-2 lg:py-0"
                onClick={() => toggleSection(Array.isArray(section.title) ? section.title[0] || '' : section.title)}
              >
                {section.title}
                <ChevronDown 
                  className={`w-4 h-4 lg:hidden transition-transform duration-200 ${
                    expandedSection === (Array.isArray(section.title) ? section.title[0] || '' : section.title) ? 'rotate-180' : ''
                  }`}
                />
              </h3>
              <ul className={`space-y-2 transition-all duration-300 lg:block ${
                expandedSection === (Array.isArray(section.title) ? section.title[0] || '' : section.title) ? 'block mb-2 pl-4 lg:pl-0' : 'hidden'
              }`}>
                {section.links.map((link, linkIndex) => {
                  const linkText = typeof link === 'object' && link !== null && 'text' in link ? link.text : link;
                  const linkHref = typeof link === 'object' && link !== null && 'href' in link ? link.href : '#';
                  return (
                    <li key={linkIndex}>
                      <a href={linkHref} className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                        {linkText}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright') || '© 2025 StudentHub. All rights reserved.'}
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              {t('footer.madeWith') || 'Made with'} <Heart className="w-4 h-4 text-red-500 fill-current" /> {t('footer.byStudents') || 'by students, for students'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

