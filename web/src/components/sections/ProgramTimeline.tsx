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
  const [activeYear, setActiveYear] = useState<number>(1);
  const [ref, inView] = useInView({ once: true });

  const yearsData: YearData[] = [
    {
      year: 1,
      title: t('timeline.year1.title') || 'Základní technologie',
      description: t('timeline.year1.desc') || 'Programové vybavení, Hardware, Základy elektrotechniky',
      subjects: ['Programové vybavení', 'Hardware', 'Základy elektrotechniky', 'Matematika'],
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      detailedInfo: {
        goals: t('timeline.year1Details.goals') || ['Osvojit si základy práce s počítačem', 'Pochopení hardwarových komponent', 'Základy elektrotechniky'],
        projects: t('timeline.year1Details.projects') || ['Sestavení PC', 'Základní elektrotechnické obvody', 'První programy v MS Office'],
        certifications: t('timeline.year1Details.certifications') || ['ECDL Start', 'Základy IT'],
        skills: t('timeline.year1Details.skills') || ['MS Office', 'Základy Windows', 'Elektrotechnické měření', 'Logické myšlení']
      }
    },
    {
      year: 2,
      title: t('timeline.year2.title') || 'Programování a systémy',
      description: t('timeline.year2.desc') || 'Operační systémy, Programování, CAD systémy',
      subjects: ['Operační systémy', 'Programování', 'CAD systémy', 'Databázové systémy'],
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      detailedInfo: {
        goals: t('timeline.year2Details.goals') || ['Naučit se programovat v C++', 'Ovládání operačních systémů', 'CAD modelování'],
        projects: t('timeline.year2Details.projects') || ['Kalkulačka v C++', 'Správa Windows/Linux', '3D modely v AutoCAD'],
        certifications: t('timeline.year2Details.certifications') || ['Microsoft Office Specialist', 'AutoCAD User'],
        skills: t('timeline.year2Details.skills') || ['C++ programování', 'Windows/Linux admin', 'AutoCAD', 'Databáze']
      }
    },
    {
      year: 3,
      title: t('timeline.year3.title') || 'Sítě a databáze',
      description: t('timeline.year3.desc') || 'Datové sítě, Databázové systémy, Cisco kurzy',
      subjects: ['Datové sítě', 'Databázové systémy', 'Cisco kurzy', 'Python workshop'],
      icon: Palette,
      color: 'from-blue-500 to-blue-400',
      gradient: 'bg-gradient-to-br from-blue-500/10 to-blue-400/10',
      detailedInfo: {
        goals: t('timeline.year3Details.goals') || ['Konfigurace síťových zařízení', 'Pokročilé databáze', 'Python scripting'],
        projects: t('timeline.year3Details.projects') || ['Konfigurace VLAN', 'Webová aplikace s databází', 'Automatizační skripty'],
        certifications: t('timeline.year3Details.certifications') || ['Cisco CCNA Discovery', 'Oracle Database'],
        skills: t('timeline.year3Details.skills') || ['Cisco IOS', 'SQL/MySQL', 'Python', 'Síťová bezpečnost']
      }
    },
    {
      year: 4,
      title: t('timeline.year4.title') || 'Maturita a certifikace',
      description: t('timeline.year4.desc') || 'Maturitní zkouška, Oracle, MSDN AA, praxe v DPP',
      subjects: ['Maturitní zkouška', 'Oracle certifikace', 'MSDN AA', 'Praxe v DPP'],
      icon: GraduationCap,
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
      detailedInfo: {
        goals: t('timeline.year4Details.goals') || ['Úspěšná maturita', 'Profesionální certifikace', 'Praktické zkušenosti'],
        projects: t('timeline.year4Details.projects') || ['Maturitní projekt', 'Stáž v DPP', 'Portfolio projektů'],
        certifications: t('timeline.year4Details.certifications') || ['Maturitní vysvědčení', 'Oracle Database Associate', 'Microsoft Certified'],
        skills: t('timeline.year4Details.skills') || ['Projektové řízení', 'Profesionální komunikace', 'Komplexní IT řešení']
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
                    onClick={() => setActiveYear(isActive ? 0 : yearData.year)}
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
              {(t('timeline.careers') || [
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