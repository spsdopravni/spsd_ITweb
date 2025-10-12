'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated, useInView, useTrail } from '@react-spring/web';
import {
  Code2, Database, Palette,
  Award, Briefcase, GraduationCap, ChevronRight
} from 'lucide-react';

interface YearData {
  year: number;
  title: string;
  description: string;
  subjects: string[];
  icon: React.ElementType;
  color: string;
  gradient: string;
  detailedInfo?: {
    goals: string[];
    projects: string[];
    certifications: string[];
    skills: string[];
  };
}

export const ProgramTimeline: React.FC = () => {
  const { t } = useLanguage();

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [ref, inView] = useInView({ once: true });

  const yearsData: YearData[] = [
    {
      year: 1,
      title: tString('timeline.year1.title', 'Základy IT a technologie'),
      description: tString('timeline.year1.desc', 'Úvod do IT světa - hardware, software, elektrotechnika a programování'),
      subjects: ['Informační technologie (2 hod)', 'Hardware (2 hod)', 'Programové vybavení (4 hod)', 'Operační systémy (2 hod)', 'Základy elektrotechniky (2 hod)', 'Číslicová technika (2 hod)', 'Programování (2 hod)', 'Praxe (2 hod)'],
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      detailedInfo: {
        goals: Array.isArray(t('timeline.year1Details.goals')) ? t('timeline.year1Details.goals') as string[] : ['Pochopit základy hardware a sestavení PC', 'Naučit se pracovat s operačními systémy', 'Získat základy elektrotechniky a číslicové techniky', 'Osvojit si základy programování'],
        projects: Array.isArray(t('timeline.year1Details.projects')) ? t('timeline.year1Details.projects') as string[] : ['Sestavení a konfigurace PC', 'Základní elektrotechnické obvody', 'První programy', 'Práce se software nástroji'],
        certifications: Array.isArray(t('timeline.year1Details.certifications')) ? t('timeline.year1Details.certifications') as string[] : ['ECDL Start'],
        skills: Array.isArray(t('timeline.year1Details.skills')) ? t('timeline.year1Details.skills') as string[] : ['Hardware diagnostika', 'Instalace OS', 'MS Office', 'Základy programování', 'Elektrotechnické měření']
      }
    },
    {
      year: 2,
      title: tString('timeline.year2.title', 'Programování a CAD systémy'),
      description: tString('timeline.year2.desc', 'Pokročilé programování, databáze, CAD návrhy a grafická tvorba'),
      subjects: ['Informační technologie (2 hod)', 'Programové vybavení (4 hod)', 'Programování (4 hod)', 'CAD systémy (6 hod)', 'Databázové systémy (4 hod)', 'Grafická tvorba (4 hod)', 'Datové sítě (2 hod)', 'Praxe (3 hod)'],
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      detailedInfo: {
        goals: Array.isArray(t('timeline.year2Details.goals')) ? t('timeline.year2Details.goals') as string[] : ['Pokročilé programování v C/C++', 'Návrhy v CAD systémech', 'Práce s databázemi', 'Grafická tvorba a design'],
        projects: Array.isArray(t('timeline.year2Details.projects')) ? t('timeline.year2Details.projects') as string[] : ['Aplikace v C++', '3D modely v CAD', 'Databázové aplikace', 'Grafické návrhy', 'Síťová konfigurace'],
        certifications: Array.isArray(t('timeline.year2Details.certifications')) ? t('timeline.year2Details.certifications') as string[] : ['AutoCAD User', 'Microsoft Office Specialist'],
        skills: Array.isArray(t('timeline.year2Details.skills')) ? t('timeline.year2Details.skills') as string[] : ['C/C++ programování', 'AutoCAD', 'SQL databáze', 'Adobe/Grafika', 'Základy sítí']
      }
    },
    {
      year: 3,
      title: tString('timeline.year3.title', 'Sítě, databáze a pokročilé technologie'),
      description: tString('timeline.year3.desc', 'Datové sítě, pokročilé databáze, CAD a grafika, ekonomika'),
      subjects: ['Programování (6 hod)', 'Datové sítě (4 hod)', 'Databázové systémy (4 hod)', 'CAD systémy (6 hod)', 'Grafická tvorba (4 hod)', 'Ekonomika (4 hod)', 'Praxe (2 hod)'],
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      detailedInfo: {
        goals: Array.isArray(t('timeline.year3Details.goals')) ? t('timeline.year3Details.goals') as string[] : ['Pokročilá správa sítí', 'Databázové systémy a optimalizace', 'Profesionální CAD návrhy', 'Grafický design'],
        projects: Array.isArray(t('timeline.year3Details.projects')) ? t('timeline.year3Details.projects') as string[] : ['Síťová infrastruktura', 'Webová aplikace s DB', 'Komplexní CAD projekty', 'Profesionální grafika', 'Business case studies'],
        certifications: Array.isArray(t('timeline.year3Details.certifications')) ? t('timeline.year3Details.certifications') as string[] : ['Cisco CCNA', 'Oracle Database'],
        skills: Array.isArray(t('timeline.year3Details.skills')) ? t('timeline.year3Details.skills') as string[] : ['Cisco networking', 'SQL/MySQL pokročilé', 'Python/Java', 'CAD pokročilé', 'Adobe Suite', 'Ekonomické myšlení']
      }
    },
    {
      year: 4,
      title: tString('timeline.year4.title', 'Specializace a maturita'),
      description: tString('timeline.year4.desc', 'Pokročilé technologie, webdesign, virtualizace a příprava na maturitu'),
      subjects: ['Programování (4 hod)', 'Datové sítě (3 hod)', 'Databázové systémy (4 hod)', 'Webdesign (4 hod)', 'Grafická tvorba (6 hod)', 'Virtualizace (3 hod)', 'Seminář k maturitě (1 hod)', 'Praxe (2 hod)'],
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      detailedInfo: {
        goals: Array.isArray(t('timeline.year4Details.goals')) ? t('timeline.year4Details.goals') as string[] : ['Úspěšná maturitní zkouška', 'Realizace maturitního projektu', 'Praktické zkušenosti', 'Příprava na praxi nebo VŠ'],
        projects: Array.isArray(t('timeline.year4Details.projects')) ? t('timeline.year4Details.projects') as string[] : ['Maturitní projekt', 'Komplexní webové stránky', 'Virtualizované prostředí', 'Portfolio prací', 'Firemní praxe'],
        certifications: Array.isArray(t('timeline.year4Details.certifications')) ? t('timeline.year4Details.certifications') as string[] : ['Maturitní vysvědčení', 'Oracle Database', 'Cisco CCNA', 'Adobe Certified'],
        skills: Array.isArray(t('timeline.year4Details.skills')) ? t('timeline.year4Details.skills') as string[] : ['Full-stack development', 'HTML/CSS/JS/PHP', 'Virtualizace (VMware/Docker)', 'Profesionální komunikace', 'Projektové řízení']
      }
    },
  ];

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
  });

  const timelineTrail = useTrail(yearsData.length, {
    from: { opacity: 0, transform: 'translateX(-30px)' },
    to: { opacity: inView ? 1 : 0, transform: inView ? 'translateX(0px)' : 'translateX(-30px)' },
    delay: 300,
  });

  return (
    <section className="py-20 relative overflow-hidden">

      <animated.div ref={ref} style={containerSpring} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass border border-blue-500/30 mb-4 md:mb-6">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-white/80 font-medium">
              {t('timeline.badge') || 'Studijní program'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
            {t('timeline.title') || 'Cesta k IT odborníkovi'}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            {t('timeline.subtitle') || 'Čtyřletý program, který vás postupně provede od základů až po pokročilé technologie'}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-orange-500 opacity-30" />

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timelineTrail.map((style, index) => {
              const yearData = yearsData[index];
              const Icon = yearData.icon;
              const isActive = activeYear === yearData.year;
              const isEven = index % 2 === 0;

              return (
                <animated.div
                  key={yearData.year}
                  style={style}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 sm:left-8 md:left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full border-2 sm:border-4 border-black z-10" />

                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ml-12 sm:ml-16 md:ml-0 pr-4 sm:pr-0 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    } cursor-pointer group`}
                    onClick={() => setActiveYear(isActive ? null : yearData.year)}
                  >
                    <div className={`glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
                      isActive
                        ? 'border-blue-400/50 md:scale-105'
                        : 'border-white/10 hover:border-blue-400/30 md:hover:scale-102'
                    }`}>
                      {/* Year badge */}
                      <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full mb-3 sm:mb-4 bg-gradient-to-r ${yearData.color}`}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {yearData.year}. ročník
                        </span>
                      </div>

                      {/* Title and description */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {yearData.title}
                      </h3>

                      <p className="text-white/70 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                        {yearData.description}
                      </p>

                      {/* Subjects */}
                      <div className="space-y-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-white/80 mb-2">
                          Klíčové předměty:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                          {yearData.subjects.map((subject, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-1.5 sm:gap-2 text-xs text-white/60"
                            >
                              <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span className="leading-tight">{subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detailed info when active */}
                      {isActive && yearData.detailedInfo && (
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 space-y-3 sm:space-y-4 animate-in slide-in-from-top duration-300">
                          <div className="grid grid-cols-1 gap-3 sm:gap-4">
                            <div>
                              <h5 className="text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">🎯 {t('timeline.detailHeaders.goals') || 'Cíle ročníku'}:</h5>
                              <ul className="space-y-1">
                                {yearData.detailedInfo.goals.map((goal, idx) => (
                                  <li key={idx} className="text-xs text-white/70 flex items-start gap-1.5 sm:gap-2">
                                    <span className="text-blue-400 mt-0.5">•</span>
                                    <span className="leading-tight">{goal}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">🛠️ {t('timeline.detailHeaders.projects') || 'Praktické projekty'}:</h5>
                              <ul className="space-y-1">
                                {yearData.detailedInfo.projects.map((project, idx) => (
                                  <li key={idx} className="text-xs text-white/70 flex items-start gap-1.5 sm:gap-2">
                                    <span className="text-green-400 mt-0.5">•</span>
                                    <span className="leading-tight">{project}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">📜 {t('timeline.detailHeaders.certifications') || 'Certifikace'}:</h5>
                              <ul className="space-y-1">
                                {yearData.detailedInfo.certifications.map((cert, idx) => (
                                  <li key={idx} className="text-xs text-white/70 flex items-start gap-1.5 sm:gap-2">
                                    <span className="text-orange-400 mt-0.5">•</span>
                                    <span className="leading-tight">{cert}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="text-xs sm:text-sm font-semibold text-white/90 mb-1.5 sm:mb-2">💡 {t('timeline.detailHeaders.skills') || 'Získané dovednosti'}:</h5>
                              <ul className="space-y-1">
                                {yearData.detailedInfo.skills.map((skill, idx) => (
                                  <li key={idx} className="text-xs text-white/70 flex items-start gap-1.5 sm:gap-2">
                                    <span className="text-red-400 mt-0.5">•</span>
                                    <span className="leading-tight">{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Expand indicator */}
                      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/50">
                            {isActive ? t('timeline.hideDetails') || 'Skrýt detaily' : t('timeline.showMore') || 'Klikněte pro více'}
                          </span>
                          <ChevronRight
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 transition-transform duration-300 ${
                              isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12" />
                </animated.div>
              );
            })}
          </div>
        </div>

        {/* Career outcomes */}
        <div className="mt-12 md:mt-20 text-center px-4">
          <div className="glass rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {t('timeline.outcomes') || 'Kariérní možnosti'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
              {(Array.isArray(t('timeline.careers')) ? t('timeline.careers') as string[] : [
                'Programátor',
                'Správce sítí a OS',
                'Vývojář webových řešení',
                'Databázový specialista'
              ]).map((career, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm text-white/80">{career}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
};
