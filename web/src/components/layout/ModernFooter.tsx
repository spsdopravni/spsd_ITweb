'use client';

import React, { useState } from 'react';
import { Sparkles, Github, Twitter, Linkedin, Instagram, Heart, ChevronDown } from 'lucide-react';
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
        t('footer.legalLinks.privacy') || 'Privacy Policy',
        t('footer.legalLinks.terms') || 'Terms of Service',
        t('footer.legalLinks.cookies') || 'Cookie Policy',
        t('footer.legalLinks.gdpr') || 'GDPR',
        t('footer.legalLinks.licenses') || 'Licenses'
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Mobile: Compact header, Desktop: Full layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-red-400" />
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                {t('footer.title') || 'StudentHub'}
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm mb-4 md:mb-6">
              {t('footer.description') || 'Empowering students to achieve excellence through innovative digital solutions.'}
            </p>
            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 md:w-10 md:h-10 glass rounded-lg flex items-center justify-center
                           text-gray-400 hover:text-red-400 transition-colors"
                >
                  <social.icon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index} className="border-b border-white/10 md:border-0 pb-4 md:pb-0">
              {/* Desktop: Normal display, Mobile: Collapsible */}
              <h3 
                className="text-white font-semibold mb-2 md:mb-4 md:cursor-default cursor-pointer flex items-center justify-between md:justify-start py-2 md:py-0"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <ChevronDown 
                  className={`w-4 h-4 md:hidden transition-transform duration-200 ${
                    expandedSection === section.title ? 'rotate-180' : ''
                  }`}
                />
              </h3>
              <ul className={`space-y-2 transition-all duration-300 md:block ${
                expandedSection === section.title ? 'block mb-2 pl-4 md:pl-0' : 'hidden'
              }`}>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors block py-1">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright') || '© 2024 StudentHub. All rights reserved.'}
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

