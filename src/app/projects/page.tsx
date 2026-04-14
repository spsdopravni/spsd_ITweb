'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users,
  GraduationCap,
  Calendar,
  Code2,
  BookOpen,
  Trophy,
  MessageSquare,
  Video,
  Monitor,
  Cpu,
  FileText,
  BarChart,
  Gamepad2,
  Award,
  Bot,
  HelpCircle,
  Server,
  Presentation,
} from 'lucide-react';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  redLight: '#dc3530',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

interface Project {
  key: string;
  students: string[];
  teachers: string[];
  deadline: string;
  category?: string;
}

export default function ProjectsPage() {
  const { t } = useLanguage();

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tString = (key: string, fallback?: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback || key : result;
  };

  const projects: Project[] = [
    { key: 'itCertifications', students: [], teachers: ['J.T', 'VEDENÍ'], deadline: 'ongoing' },
    { key: 'digitalLiteracyTest', students: ['M.N', 'IŠ'], teachers: ['J.T', 'VEDENÍ'], deadline: '10/2025' },
    { key: 'specializedTest', students: ['M.N'], teachers: ['J.T', 'VEDENÍ'], deadline: '11/2025' },
    { key: 'interactiveGame', students: ['Š.B', 'D.K'], teachers: ['L.B'], deadline: '11/2025', category: 'DOD' },
    { key: 'thesisEvidence', students: [], teachers: ['J.T'], deadline: '2026' },
    { key: 'surveySystem', students: ['A.B'], teachers: ['J.T', 'VEDENÍ', 'L.B'], deadline: '10/2025' },
    { key: 'itCompetition', students: [], teachers: ['J.T'], deadline: '12/2025' },
    { key: 'classroomDesign', students: [], teachers: ['J.T'], deadline: '2026', category: 'maturity' },
    { key: 'departureBoard', students: ['A.B', 'V.F'], teachers: ['J.T', 'M.H'], deadline: '10/2025' },
    { key: 'departureBoardHW', students: ['A.B', 'V.F'], teachers: ['M.H'], deadline: '10/2025', category: 'internship' },
    { key: 'chatbot', students: ['O.B', 'D.Z'], teachers: ['J.T'], deadline: '2026' },
    { key: 'promoVideo', students: ['O.P.L.T'], teachers: ['J.T'], deadline: '11/2025', category: 'maturity' },
    { key: 'competitionsOverview', students: ['V.G'], teachers: ['J.T'], deadline: '12/2025' },
    { key: 'antivandalPC', students: ['ČERNÍK'], teachers: ['M.M', 'M.H'], deadline: '', category: 'maturity-internship' },
    { key: 'graphicPresentation', students: ['ZAJÍČEK'], teachers: ['V.B', 'J.T'], deadline: '', category: 'maturity' },
    { key: 'attendanceTracking', students: ['J.S'], teachers: ['J.T'], deadline: '2026' },
  ];

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

  const isLight = true;

  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.55)';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: isDesktop ? '3rem' : '1.5rem',
    paddingRight: isDesktop ? '3rem' : '1.5rem',
  };

  const sectionBg = isLight
    ? COLOR.paper
    : `linear-gradient(135deg, ${COLOR.navy} 0%, #0f1a3a 50%, ${COLOR.navyLight} 100%)`;

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'maturity':
        return tString('projects.labels.maturity', 'Maturitní práce');
      case 'internship':
        return tString('projects.labels.internship', 'Praxe');
      case 'maturity-internship':
        return `${tString('projects.labels.maturity', 'MP')} + ${tString('projects.labels.internship', 'Praxe')}`;
      case 'DOD':
        return 'Den otevřených dveří';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'maturity':
        return COLOR.red;
      case 'internship':
        return COLOR.navy;
      case 'maturity-internship':
        return COLOR.orange;
      case 'DOD':
        return COLOR.navyLight;
      default:
        return COLOR.navy;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: sectionBg }}>
      {/* ========== HERO ========== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: isDesktop ? '460px' : '220px',
            height: isDesktop ? '460px' : '220px',
            pointerEvents: 'none',
            background: `linear-gradient(135deg, ${COLOR.red} 0%, ${COLOR.orange} 55%, transparent 82%)`,
            clipPath: 'polygon(0 0, 72% 0, 0 55%)',
            opacity: isLight ? 0.2 : 0.35,
          }}
        />
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '8rem' : '6rem',
            paddingBottom: isDesktop ? '4rem' : '3rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '56px',
                height: '2px',
                background: COLOR.red,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: isLight ? COLOR.red : COLOR.orange,
              }}
            >
              {tString('projects.eyebrow', 'Studentské práce')}
            </span>
          </div>

          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(2.25rem, 4vw, 3.75rem)'
                : 'clamp(1.875rem, 7.5vw, 2.75rem)',
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginTop: 0,
              marginBottom: '2rem',
              color: textStrong,
              whiteSpace: isDesktop ? 'nowrap' : 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {tString('projects.title', 'Projekty IT oboru')}{' '}
            <span style={{ color: COLOR.red }}>
              {tString('projects.titleHighlight', 'na kterých děláme.')}
            </span>
          </h1>

          <p
            style={{
              fontSize: isDesktop ? '1.2rem' : '1.0625rem',
              lineHeight: 1.7,
              color: textMuted,
              maxWidth: '42rem',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {tString(
              'projects.subtitle',
              'Aktuální a plánované projekty studentů a pedagogů IT oboru. Od maturitních prací přes praxi až po školní prezentace a interaktivní aplikace.'
            )}
          </p>
        </div>
      </section>

      {/* ========== PROJECTS GRID ========== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Corner wedge — bottom right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: isDesktop ? '460px' : '220px',
            height: isDesktop ? '460px' : '220px',
            pointerEvents: 'none',
            background: `linear-gradient(45deg, ${COLOR.red} 0%, ${COLOR.orange} 55%, transparent 82%)`,
            clipPath: 'polygon(100% 100%, 100% 45%, 28% 100%)',
            opacity: isLight ? 0.2 : 0.35,
          }}
        />
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1.5rem',
            paddingBottom: isDesktop ? '8rem' : '5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop
                ? 'repeat(2, 1fr)'
                : '1fr',
              gap: isDesktop ? '1.5rem' : '1.25rem',
            }}
          >
            {projects.map((project) => {
              const Icon = getProjectIcon(project.key);
              const hasCategory = Boolean(project.category);
              const categoryLabel = hasCategory
                ? getCategoryLabel(project.category!)
                : '';
              const categoryColor = hasCategory
                ? getCategoryColor(project.category!)
                : COLOR.navy;

              return (
                <article
                  key={project.key}
                  style={{
                    position: 'relative',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.75rem 1.75rem 1.85rem 1.75rem',
                    background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.82)',
                    border: isLight
                      ? '1px solid rgba(0, 43, 78, 0.12)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isLight
                      ? '0 24px 52px -22px rgba(0, 43, 78, 0.18)'
                      : '0 24px 52px -22px rgba(0, 0, 0, 0.5)',
                    transition:
                      'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = isLight
                      ? '0 32px 64px -22px rgba(0, 43, 78, 0.25)'
                      : '0 32px 64px -22px rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.borderColor = isLight
                      ? 'rgba(200, 30, 28, 0.35)'
                      : 'rgba(233, 93, 65, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isLight
                      ? '0 24px 52px -22px rgba(0, 43, 78, 0.18)'
                      : '0 24px 52px -22px rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.borderColor = isLight
                      ? 'rgba(0, 43, 78, 0.12)'
                      : 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {/* Optional category pill */}
                  {hasCategory && (
                    <span
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        padding: '0.4rem 0.75rem',
                        borderRadius: '999px',
                        background: categoryColor,
                        color: COLOR.white,
                        whiteSpace: 'nowrap',
                        marginBottom: '1rem',
                      }}
                    >
                      {categoryLabel}
                    </span>
                  )}

                  {/* Title row — title on left, icon on right */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <h3
                      style={{
                        flex: 1,
                        minWidth: 0,
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        letterSpacing: '-0.015em',
                        color: textStrong,
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {tString(`projects.list.${project.key}.name`, project.key)}
                    </h3>
                    <div
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        borderRadius: '10px',
                        background: isLight
                          ? 'rgba(200, 30, 28, 0.09)'
                          : 'rgba(200, 30, 28, 0.16)',
                        color: isLight ? COLOR.red : COLOR.orange,
                      }}
                    >
                      <Icon style={{ width: 22, height: 22 }} />
                    </div>
                  </div>

                  {/* Red accent line */}
                  <div
                    aria-hidden
                    style={{
                      width: '40px',
                      height: '2px',
                      background: COLOR.red,
                      marginBottom: '1rem',
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '0.925rem',
                      lineHeight: 1.6,
                      color: textMuted,
                      marginTop: 0,
                      marginBottom: '1.5rem',
                      flex: 1,
                    }}
                  >
                    {tString(
                      `projects.list.${project.key}.description`,
                      ''
                    )}
                  </p>

                  {/* Metadata rows */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      paddingTop: '1rem',
                      borderTop: isLight
                        ? '1px solid rgba(0, 43, 78, 0.08)'
                        : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <MetaRow
                      Icon={Users}
                      label={tString('projects.labels.students', 'Studenti')}
                      value={
                        project.students.length > 0
                          ? project.students.join(', ')
                          : '—'
                      }
                      isLight={isLight}
                      textStrong={textStrong}
                      textSubtle={textSubtle}
                    />
                    <MetaRow
                      Icon={GraduationCap}
                      label={tString('projects.labels.teachers', 'Pedagogové')}
                      value={project.teachers.join(', ')}
                      isLight={isLight}
                      textStrong={textStrong}
                      textSubtle={textSubtle}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// Reusable metadata row
interface MetaRowProps {
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string;
  value: string;
  isLight: boolean;
  textStrong: string;
  textSubtle: string;
}

const MetaRow: React.FC<MetaRowProps> = ({
  Icon,
  label,
  value,
  isLight,
  textStrong,
  textSubtle,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        borderRadius: '6px',
        background: isLight
          ? 'rgba(200, 30, 28, 0.08)'
          : 'rgba(200, 30, 28, 0.15)',
        color: isLight ? COLOR.red : COLOR.orange,
        flexShrink: 0,
      }}
    >
      <Icon style={{ width: 14, height: 14 }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', minWidth: 0 }}>
      <span
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          color: textSubtle,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: textStrong,
          lineHeight: 1.4,
          wordBreak: 'break-word',
        }}
      >
        {value}
      </span>
    </div>
  </div>
);
