'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import {
  Users, GraduationCap, Calendar, Code2,
  BookOpen, Trophy, MessageSquare, Video,
  Monitor, Cpu, FileText, BarChart, Gamepad2,
  Award, Bot, HelpCircle, Server, Presentation
} from 'lucide-react';

interface Project {
  key: string;
  students: string[];
  teachers: string[];
  deadline: string;
  category?: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();

  const isModern = theme === 'modern';

  // Helper function to get string from translation
  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  // Project data matching the provided list
  const projects: Project[] = [
    {
      key: 'itCertifications',
      students: [],
      teachers: ['J.T', 'VEDENÍ'],
      deadline: 'ongoing',
    },
    {
      key: 'digitalLiteracyTest',
      students: ['M.N', 'IŠ'],
      teachers: ['J.T', 'VEDENÍ'],
      deadline: '10/2025',
    },
    {
      key: 'specializedTest',
      students: ['M.N'],
      teachers: ['J.T', 'VEDENÍ'],
      deadline: '11/2025',
    },
    {
      key: 'interactiveGame',
      students: ['Š.B', 'D.K'],
      teachers: ['L.B'],
      deadline: '11/2025',
      category: 'DOD',
    },
    {
      key: 'thesisEvidence',
      students: [],
      teachers: ['J.T'],
      deadline: '2026',
    },
    {
      key: 'surveySystem',
      students: ['A.B'],
      teachers: ['J.T', 'VEDENÍ', 'L.B'],
      deadline: '10/2025',
    },
    {
      key: 'itCompetition',
      students: [],
      teachers: ['J.T'],
      deadline: '12/2025',
    },
    {
      key: 'classroomDesign',
      students: [],
      teachers: ['J.T'],
      deadline: '2026',
      category: 'maturity',
    },
    {
      key: 'departureBoard',
      students: ['A.B', 'V.F'],
      teachers: ['J.T', 'M.H'],
      deadline: '10/2025',
    },
    {
      key: 'departureBoardHW',
      students: ['A.B', 'V.F'],
      teachers: ['M.H'],
      deadline: '10/2025',
      category: 'internship',
    },
    {
      key: 'chatbot',
      students: ['O.B', 'D.Z'],
      teachers: ['J.T'],
      deadline: '2026',
    },
    {
      key: 'promoVideo',
      students: ['O.P.L.T'],
      teachers: ['J.T'],
      deadline: '11/2025',
      category: 'maturity',
    },
    {
      key: 'competitionsOverview',
      students: ['V.G'],
      teachers: ['J.T'],
      deadline: '12/2025',
    },
    {
      key: 'antivandalPC',
      students: ['ČERNÍK'],
      teachers: ['M.M', 'M.H'],
      deadline: '',
      category: 'maturity-internship',
    },
    {
      key: 'graphicPresentation',
      students: ['ZAJÍČEK'],
      teachers: ['V.B', 'J.T'],
      deadline: '',
      category: 'maturity',
    },
    {
      key: 'attendanceTracking',
      students: ['J.S'],
      teachers: ['J.T'],
      deadline: '2026',
    },
  ];

  // Icon mapping for different project types
  const getProjectIcon = (key: string) => {
    const iconMap: Record<string, React.ElementType> = {
      itCertifications: Award,
      digitalLiteracyTest: BookOpen,
      specializedTest: FileText,
      itWebsite: Code2,
      interactiveGame: Gamepad2,
      thesisEvidence: FileText,
      surveySystem: BarChart,
      itCompetition: Trophy,
      classroomDesign: Presentation,
      departureBoard: Monitor,
      departureBoardHW: Cpu,
      chatbot: Bot,
      promoVideo: Video,
      studentCounseling: HelpCircle,
      competitionsOverview: Trophy,
      discordServer: MessageSquare,
      antivandalPC: Server,
      graphicPresentation: Presentation,
      attendanceTracking: Calendar,
    };
    return iconMap[key] || Code2;
  };

  const renderModernProjects = () => (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-red-950/20 to-transparent border-b border-white/10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10 mb-6">
              <Code2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-white/70">{tString('projects.badge', 'Studentské projekty')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {tString('projects.title', 'Projekty IT oboru')}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              {tString('projects.subtitle', 'Přehled aktuálních a plánovaných projektů studentů a pedagogů')}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = getProjectIcon(project.key);
            return (
              <div
                key={project.key}
                className="glass rounded-2xl border border-white/10 hover:border-red-400/50 transition-all duration-300 group overflow-hidden"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-red-950/40 to-orange-950/40 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Category badge overlay */}
                  {project.category && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white backdrop-blur-sm border border-white/20 shadow-lg">
                        {project.category === 'maturity' && tString('projects.labels.maturity', 'Maturitní práce')}
                        {project.category === 'internship' && tString('projects.labels.internship', 'Praxe')}
                        {project.category === 'maturity-internship' && `${tString('projects.labels.maturity', 'MP')} + ${tString('projects.labels.internship', 'Praxe')}`}
                        {project.category === 'DOD' && 'DOD'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {tString(`projects.list.${project.key}.name`, project.key)}
                  </h3>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {tString(`projects.list.${project.key}.description`, '')}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Students */}
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-xs text-white/50">{tString('projects.labels.students', 'Studenti')}: </span>
                      <span className="text-sm text-white/90">
                        {project.students.length > 0 ? project.students.join(', ') : '-'}
                      </span>
                    </div>

                    {/* Separator */}
                    <span className="text-white/20">•</span>

                    {/* Teachers */}
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-xs text-white/50">{tString('projects.labels.teachers', 'Pedagogové')}: </span>
                      <span className="text-sm text-white/90">{project.teachers.join(', ')}</span>
                    </div>

                    {/* Separator */}
                    {project.deadline && <span className="text-white/20">•</span>}

                    {/* Deadline */}
                    {project.deadline && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs text-white/50">{tString('projects.labels.deadline', 'Termín')}: </span>
                        <span className="text-sm text-white/90">
                          {project.deadline === 'ongoing'
                            ? tString('projects.labels.ongoing', 'průběžně')
                            : project.deadline}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderClassicProjects = () => (
    <div className={`min-h-screen transition-colors duration-300 ${
      classicMode === 'light' ? 'bg-white' : 'bg-gradient-to-br from-[var(--spsd-navy)] via-[var(--spsd-navy-light)] to-[var(--spsd-navy)]'
    }`}>
      {/* Header */}
      <div className={`border-b ${
        classicMode === 'light' ? 'border-[var(--spsd-navy)]/10' : 'border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 ${
              classicMode === 'light'
                ? 'bg-[var(--spsd-navy)]/5 border-[var(--spsd-navy)]/20'
                : 'bg-white/5 border-white/20'
            }`}>
              <Code2 className={`w-4 h-4 ${
                classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-red-400'
              }`} />
              <span className={`text-sm ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
              }`}>
                {tString('projects.badge', 'Studentské projekty')}
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 ${
              classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
            }`}>
              {tString('projects.title', 'Projekty IT oboru')}
            </h1>

            <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${
              classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
            }`}>
              {tString('projects.subtitle', 'Přehled aktuálních a plánovaných projektů studentů a pedagogů')}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = getProjectIcon(project.key);
            return (
              <div
                key={project.key}
                className={`rounded-2xl border transition-all duration-300 group overflow-hidden ${
                  classicMode === 'light'
                    ? 'bg-white border-[var(--spsd-navy)]/10 hover:border-[var(--spsd-red)]/50 shadow-sm hover:shadow-md'
                    : 'bg-white/5 border-white/10 hover:border-red-400/50'
                }`}
              >
                {/* Image Placeholder */}
                <div className={`relative h-48 overflow-hidden ${
                  classicMode === 'light'
                    ? 'bg-gradient-to-br from-[var(--spsd-red)]/10 to-[var(--spsd-navy)]/10'
                    : 'bg-gradient-to-br from-red-950/40 to-orange-950/40'
                }`}>
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className={`w-16 h-16 group-hover:scale-110 transition-transform duration-300 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]/20' : 'text-white/30'
                    }`} />
                  </div>
                  {/* Category badge overlay */}
                  {project.category && (
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border shadow-lg ${
                        classicMode === 'light'
                          ? 'bg-purple-500 text-white border-purple-600'
                          : 'bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border-white/20'
                      }`}>
                        {project.category === 'maturity' && tString('projects.labels.maturity', 'Maturitní práce')}
                        {project.category === 'internship' && tString('projects.labels.internship', 'Praxe')}
                        {project.category === 'maturity-internship' && `${tString('projects.labels.maturity', 'MP')} + ${tString('projects.labels.internship', 'Praxe')}`}
                        {project.category === 'DOD' && 'DOD'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>
                    {tString(`projects.list.${project.key}.name`, project.key)}
                  </h3>

                  <p className={`text-sm mb-4 line-clamp-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                  }`}>
                    {tString(`projects.list.${project.key}.description`, '')}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Students */}
                    <div className="flex items-center gap-1.5">
                      <Users className={`w-4 h-4 flex-shrink-0 ${
                        classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-red-400'
                      }`} />
                      <span className={`text-xs ${
                        classicMode === 'light' ? 'text-[var(--spsd-navy)]/50' : 'text-white/50'
                      }`}>{tString('projects.labels.students', 'Studenti')}: </span>
                      <span className={`text-sm ${
                        classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                      }`}>
                        {project.students.length > 0 ? project.students.join(', ') : '-'}
                      </span>
                    </div>

                    {/* Separator */}
                    <span className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/20' : 'text-white/20'}>•</span>

                    {/* Teachers */}
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className={`w-4 h-4 flex-shrink-0 ${
                        classicMode === 'light' ? 'text-blue-600' : 'text-blue-400'
                      }`} />
                      <span className={`text-xs ${
                        classicMode === 'light' ? 'text-[var(--spsd-navy)]/50' : 'text-white/50'
                      }`}>{tString('projects.labels.teachers', 'Pedagogové')}: </span>
                      <span className={`text-sm ${
                        classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                      }`}>
                        {project.teachers.join(', ')}
                      </span>
                    </div>

                    {/* Separator */}
                    {project.deadline && (
                      <span className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/20' : 'text-white/20'}>•</span>
                    )}

                    {/* Deadline */}
                    {project.deadline && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className={`w-4 h-4 flex-shrink-0 ${
                          classicMode === 'light' ? 'text-green-600' : 'text-green-400'
                        }`} />
                        <span className={`text-xs ${
                          classicMode === 'light' ? 'text-[var(--spsd-navy)]/50' : 'text-white/50'
                        }`}>{tString('projects.labels.deadline', 'Termín')}: </span>
                        <span className={`text-sm ${
                          classicMode === 'light' ? 'text-[var(--spsd-navy)]/90' : 'text-white/90'
                        }`}>
                          {project.deadline === 'ongoing'
                            ? tString('projects.labels.ongoing', 'průběžně')
                            : project.deadline}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return isModern ? renderModernProjects() : renderClassicProjects();
}
