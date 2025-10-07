'use client';

import React from 'react';
import { useSpring, animated, useInView } from '@react-spring/web';
import { GraduationCap, Code, Users, Award, Briefcase, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const AnimatedFeatures: React.FC = () => {
  const [ref, inView] = useInView({ once: true });
  const { t } = useLanguage();

  const features = [
    {
      icon: GraduationCap,
      title: t('features.education.title') || 'Moderní vzdělávání',
      description: t('features.education.desc') || 'Komplexní IT vzdělání s praktickým zaměřením',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: Code,
      title: t('features.programming.title') || 'Programování',
      description: t('features.programming.desc') || 'Výuka moderních programovacích jazyků a technologií',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: Users,
      title: t('features.teamwork.title') || 'Týmová práce',
      description: t('features.teamwork.desc') || 'Rozvoj komunikačních dovedností a práce v týmu',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: Award,
      title: t('features.certification.title') || 'Certifikace',
      description: t('features.certification.desc') || 'Příprava na IT certifikace a mezinárodní standardy',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      icon: Briefcase,
      title: t('features.career.title') || 'Kariérní růst',
      description: t('features.career.desc') || 'Přímé propojení s praxí a budoucími zaměstnavateli',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      icon: TrendingUp,
      title: t('features.future.title') || 'Budoucnost IT',
      description: t('features.future.desc') || 'Příprava na technologie budoucnosti a inovace',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    },
  ];

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
  });

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <animated.div ref={ref} style={containerSpring} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('features.title') || 'Proč studovat IT na SPSD'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            {t('features.subtitle') || 'Naše přednosti, které nás odlišují od ostatních škol'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-2xl blur-xl"
                  style={{ background: feature.gradient, opacity: 0.3 }}
                />
              </div>
              
              <div className="relative glass-dark rounded-2xl p-6 sm:p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <div 
                  className="inline-flex p-4 rounded-xl mb-6"
                  style={{ background: feature.gradient }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full animate-pulse-slow"
                      style={{ 
                        width: '75%',
                        background: feature.gradient 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{t('features.active') || 'Aktivní'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </animated.div>
    </section>
  );
};