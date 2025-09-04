'use client';

import React from 'react';
import { Sparkles, Github, Twitter, Linkedin, Instagram, Heart } from 'lucide-react';

export const ModernFooter: React.FC = () => {
  const footerLinks = [
    {
      title: 'Platform',
      links: ['Dashboard', 'Projects', 'Events', 'Resources', 'Analytics']
    },
    {
      title: 'Community',
      links: ['Study Groups', 'Forums', 'Mentorship', 'Success Stories', 'Blog']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Documentation', 'API', 'Status', 'Contact']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Licenses']
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-gradient" />
              <span className="text-xl font-bold text-gradient">StudentHub</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Empowering students to achieve excellence through innovative digital solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center
                           text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
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
              © 2024 StudentHub. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-pink-500 fill-current" /> by students, for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

