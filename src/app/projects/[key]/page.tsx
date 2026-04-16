'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  ArrowLeft,
  Clock,
  Tag,
  ExternalLink,
  FileCode,
  Image,
  Link2,
  CheckCircle2,
  AlertCircle,
  Loader2,
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

interface ProjectData {
  key: string;
  students: string[];
  teachers: string[];
  deadline: string;
  category?: string;
}

const PROJECTS: ProjectData[] = [
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

const ICON_MAP: Record<string, React.ElementType> = {
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

// --- Placeholder data that would come from DB ---
interface ProjectDetail {
  documentation: string[];
  technologies: string[];
  links: { label: string; url: string }[];
  gallery: string[];
  status: 'planned' | 'in_progress' | 'completed';
  lastUpdated: string;
}

const PLACEHOLDER_DETAILS: Record<string, ProjectDetail> = {};

function getPlaceholderDetail(): ProjectDetail {
  return {
    documentation: [
      'Tento obsah bude načítán z databáze. Zde bude podrobný popis projektu, jeho cíle, motivace a kontext.',
      'Druhý odstavec dokumentace — může obsahovat technické detaily, požadavky na implementaci, nebo jakýkoliv jiný text, který si autor projektu přeje sdílet.',
      'Třetí odstavec — prostor pro další informace, poznámky k průběhu, nebo odkazy na související materiály.',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'Prisma'],
    links: [
      { label: 'Repozitář', url: '#' },
      { label: 'Dokumentace', url: '#' },
      { label: 'Náhled', url: '#' },
    ],
    gallery: [
      'screenshot-1.png',
      'screenshot-2.png',
      'screenshot-3.png',
    ],
    status: 'in_progress',
    lastUpdated: '2025-04-10',
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const key = params.key as string;

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tString = (k: string, fallback?: string): string => {
    const result = t(k, fallback);
    return Array.isArray(result) ? result[0] || fallback || k : result;
  };

  const project = PROJECTS.find((p) => p.key === key);
  const detail = PLACEHOLDER_DETAILS[key] || getPlaceholderDetail();
  const Icon = ICON_MAP[key] || Code2;

  const isLight = true;
  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.55)';
  const divider = isLight ? 'rgba(0,43,78,0.08)' : 'rgba(255,255,255,0.08)';
  const sectionBg = isLight
    ? COLOR.paper
    : `linear-gradient(135deg, ${COLOR.navy} 0%, #0f1a3a 50%, ${COLOR.navyLight} 100%)`;

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: isDesktop ? '3rem' : '1.5rem',
    paddingRight: isDesktop ? '3rem' : '1.5rem',
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: '14px',
    overflow: 'hidden',
    background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.82)',
    border: isLight
      ? '1px solid rgba(0, 43, 78, 0.12)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: isLight
      ? '0 24px 52px -22px rgba(0, 43, 78, 0.18)'
      : '0 24px 52px -22px rgba(0, 0, 0, 0.5)',
  };

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
      case 'maturity': return COLOR.red;
      case 'internship': return COLOR.navy;
      case 'maturity-internship': return COLOR.orange;
      case 'DOD': return COLOR.navyLight;
      default: return COLOR.navy;
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: tString('projects.detail.statusCompleted', 'Dokončeno'),
          color: '#16a34a',
          Icon: CheckCircle2,
        };
      case 'in_progress':
        return {
          label: tString('projects.detail.statusInProgress', 'Probíhá'),
          color: COLOR.orange,
          Icon: Loader2,
        };
      default:
        return {
          label: tString('projects.detail.statusPlanned', 'Plánováno'),
          color: COLOR.navyLight,
          Icon: AlertCircle,
        };
    }
  };

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: sectionBg }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: '10rem',
            paddingBottom: '4rem',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: textStrong, marginBottom: '1rem' }}>
            {tString('projects.detail.notFound', 'Projekt nenalezen')}
          </h1>
          <p style={{ color: textMuted, marginBottom: '2rem' }}>
            {tString('projects.detail.notFoundDesc', 'Tento projekt neexistuje nebo byl odstraněn.')}
          </p>
          <button
            onClick={() => router.push('/projects')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              border: 'none',
              background: COLOR.navy,
              color: COLOR.white,
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            {tString('projects.detail.backToProjects', 'Zpět na projekty')}
          </button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(detail.status);
  const StatusIcon = statusInfo.Icon;

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
            paddingTop: isDesktop ? '7rem' : '5.5rem',
            paddingBottom: isDesktop ? '3rem' : '2rem',
          }}
        >
          {/* Back button */}
          <button
            onClick={() => router.push('/projects')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: isLight
                ? '1px solid rgba(0,43,78,0.15)'
                : '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: textMuted,
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '2rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight
                ? 'rgba(0,43,78,0.05)'
                : 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = textStrong;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = textMuted;
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} />
            {tString('projects.detail.backToProjects', 'Zpět na projekty')}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem',
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
              {tString('projects.detail.eyebrow', 'Detail projektu')}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: isDesktop ? 'center' : 'flex-start',
              gap: '1.25rem',
              marginBottom: '1.5rem',
              flexDirection: isDesktop ? 'row' : 'column',
            }}
          >
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${COLOR.red} 0%, ${COLOR.orange} 100%)`,
                color: COLOR.white,
              }}
            >
              <Icon style={{ width: 30, height: 30 }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1
                style={{
                  fontSize: isDesktop
                    ? 'clamp(2rem, 3.5vw, 3rem)'
                    : 'clamp(1.75rem, 7vw, 2.5rem)',
                  lineHeight: 1.1,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  color: textStrong,
                }}
              >
                {tString(`projects.list.${key}.name`, key)}
              </h1>
            </div>
          </div>

          {/* Badges row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.category && (
              <span
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '999px',
                  background: getCategoryColor(project.category),
                  color: COLOR.white,
                  whiteSpace: 'nowrap',
                }}
              >
                {getCategoryLabel(project.category)}
              </span>
            )}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.6rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                background: statusInfo.color,
                color: COLOR.white,
                whiteSpace: 'nowrap',
              }}
            >
              <StatusIcon style={{ width: 12, height: 12 }} />
              {statusInfo.label}
            </span>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
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
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? '2rem' : '1.5rem',
              alignItems: 'flex-start',
            }}
          >
            {/* ---- Left Column: Main Content ---- */}
            <div
              style={{
                flex: isDesktop ? '1 1 0%' : '0 0 auto',
                width: isDesktop ? 'auto' : '100%',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Description Card */}
              <div style={{ ...cardStyle, padding: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '9px',
                      background: isLight
                        ? 'rgba(200, 30, 28, 0.1)'
                        : 'rgba(200, 30, 28, 0.18)',
                      color: isLight ? COLOR.red : COLOR.orange,
                      flexShrink: 0,
                    }}
                  >
                    <FileText style={{ width: 20, height: 20 }} />
                  </div>
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.about', 'O projektu')}
                  </h2>
                </div>
                <div
                  aria-hidden
                  style={{ height: '2px', background: COLOR.red, marginBottom: '1.25rem' }}
                />
                <p
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    color: textMuted,
                    marginTop: 0,
                    marginBottom: '1.5rem',
                  }}
                >
                  {tString(`projects.list.${key}.description`, '')}
                </p>
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    background: isLight
                      ? 'rgba(0,43,78,0.03)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: textSubtle,
                      fontStyle: 'italic',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {tString(
                      'projects.detail.dbPlaceholder',
                      'Krátký popis projektu — načítáno z databáze. Správce může obsah kdykoliv upravit přes dashboard.'
                    )}
                  </p>
                </div>
              </div>

              {/* Documentation Card */}
              <div style={{ ...cardStyle, padding: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '9px',
                      background: isLight
                        ? 'rgba(200, 30, 28, 0.1)'
                        : 'rgba(200, 30, 28, 0.18)',
                      color: isLight ? COLOR.red : COLOR.orange,
                      flexShrink: 0,
                    }}
                  >
                    <BookOpen style={{ width: 20, height: 20 }} />
                  </div>
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.documentation', 'Dokumentace')}
                  </h2>
                </div>
                <div
                  aria-hidden
                  style={{ height: '2px', background: COLOR.red, marginBottom: '1.25rem' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {detail.documentation.map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        color: textMuted,
                        margin: 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    background: isLight
                      ? 'rgba(0,43,78,0.03)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: textSubtle,
                      fontStyle: 'italic',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {tString(
                      'projects.detail.docPlaceholder',
                      'Dokumentace projektu — podrobný popis, cíle, postup řešení. Obsah je editovatelný z administrace.'
                    )}
                  </p>
                </div>
              </div>

              {/* Gallery Placeholder Card */}
              <div style={{ ...cardStyle, padding: '2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '9px',
                      background: isLight
                        ? 'rgba(200, 30, 28, 0.1)'
                        : 'rgba(200, 30, 28, 0.18)',
                      color: isLight ? COLOR.red : COLOR.orange,
                      flexShrink: 0,
                    }}
                  >
                    <Image style={{ width: 20, height: 20 }} />
                  </div>
                  <h2
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.gallery', 'Galerie')}
                  </h2>
                </div>
                <div
                  aria-hidden
                  style={{ height: '2px', background: COLOR.red, marginBottom: '1.25rem' }}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                    gap: '0.75rem',
                  }}
                >
                  {detail.gallery.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        aspectRatio: '16 / 10',
                        borderRadius: '10px',
                        background: isLight
                          ? 'rgba(0,43,78,0.06)'
                          : 'rgba(255,255,255,0.06)',
                        border: `1px dashed ${divider}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <Image
                        style={{
                          width: 24,
                          height: 24,
                          color: textSubtle,
                          opacity: 0.5,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: textSubtle,
                          opacity: 0.6,
                        }}
                      >
                        {img}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '10px',
                    background: isLight
                      ? 'rgba(0,43,78,0.03)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: textSubtle,
                      fontStyle: 'italic',
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {tString(
                      'projects.detail.galleryPlaceholder',
                      'Screenshoty a obrázky projektu — nahrávané přes dashboard.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* ---- Right Column: Sidebar ---- */}
            <div
              style={{
                flex: isDesktop ? '0 0 360px' : '0 0 auto',
                width: isDesktop ? '360px' : '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {/* Info Card */}
              <div style={{ ...cardStyle, overflow: 'hidden' }}>
                <div
                  style={{
                    padding: '1.15rem 1.75rem',
                    background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                    borderBottom: `3px solid ${COLOR.red}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Icon
                      style={{
                        width: 28,
                        height: 28,
                        color: COLOR.orange,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        letterSpacing: '-0.015em',
                        color: 'rgba(255, 255, 255, 0.98)',
                        lineHeight: 1.15,
                      }}
                    >
                      {tString('projects.detail.info', 'Informace')}
                    </span>
                  </div>
                </div>
                <div>
                  {[
                    {
                      icon: Users,
                      label: tString('projects.labels.students', 'Studenti'),
                      value: project.students.length > 0 ? project.students.join(', ') : '—',
                    },
                    {
                      icon: GraduationCap,
                      label: tString('projects.labels.teachers', 'Pedagogové'),
                      value: project.teachers.join(', '),
                    },
                    {
                      icon: Calendar,
                      label: tString('projects.detail.deadline', 'Termín'),
                      value: project.deadline || '—',
                    },
                    {
                      icon: Clock,
                      label: tString('projects.detail.lastUpdated', 'Poslední úprava'),
                      value: detail.lastUpdated,
                    },
                  ].map((row, i, arr) => (
                    <div
                      key={i}
                      style={{
                        padding: '1.15rem 1.75rem',
                        borderBottom: i < arr.length - 1 ? `1px solid ${divider}` : 'none',
                      }}
                    >
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
                          <row.icon style={{ width: 14, height: 14 }} />
                        </div>
                        <div>
                          <div
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.14em',
                              color: textSubtle,
                              marginBottom: '0.2rem',
                            }}
                          >
                            {row.label}
                          </div>
                          <div
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 600,
                              color: textStrong,
                              lineHeight: 1.4,
                            }}
                          >
                            {row.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Card */}
              <div style={{ ...cardStyle, padding: '1.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isLight
                        ? 'rgba(200, 30, 28, 0.1)'
                        : 'rgba(200, 30, 28, 0.18)',
                      color: isLight ? COLOR.red : COLOR.orange,
                      flexShrink: 0,
                    }}
                  >
                    <FileCode style={{ width: 16, height: 16 }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.technologies', 'Technologie')}
                  </h3>
                </div>
                <div
                  aria-hidden
                  style={{ height: '2px', background: COLOR.red, marginBottom: '1rem' }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {detail.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '8px',
                        background: isLight
                          ? 'rgba(0,43,78,0.06)'
                          : 'rgba(255,255,255,0.08)',
                        color: textStrong,
                        border: isLight
                          ? '1px solid rgba(0,43,78,0.08)'
                          : '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <Tag style={{ width: 12, height: 12, color: COLOR.red }} />
                      {tech}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isLight
                      ? 'rgba(0,43,78,0.03)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: textSubtle,
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.techPlaceholder', 'Tagy a technologie — z databáze.')}
                  </p>
                </div>
              </div>

              {/* Links Card */}
              <div style={{ ...cardStyle, padding: '1.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isLight
                        ? 'rgba(200, 30, 28, 0.1)'
                        : 'rgba(200, 30, 28, 0.18)',
                      color: isLight ? COLOR.red : COLOR.orange,
                      flexShrink: 0,
                    }}
                  >
                    <Link2 style={{ width: 16, height: 16 }} />
                  </div>
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.links', 'Odkazy')}
                  </h3>
                </div>
                <div
                  aria-hidden
                  style={{ height: '2px', background: COLOR.red, marginBottom: '1rem' }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {detail.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: isLight
                          ? 'rgba(0,43,78,0.04)'
                          : 'rgba(255,255,255,0.04)',
                        border: isLight
                          ? '1px solid rgba(0,43,78,0.08)'
                          : '1px solid rgba(255,255,255,0.08)',
                        color: textStrong,
                        textDecoration: 'none',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = isLight
                          ? 'rgba(200,30,28,0.06)'
                          : 'rgba(200,30,28,0.1)';
                        e.currentTarget.style.borderColor = isLight
                          ? 'rgba(200,30,28,0.2)'
                          : 'rgba(233,93,65,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isLight
                          ? 'rgba(0,43,78,0.04)'
                          : 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.borderColor = isLight
                          ? 'rgba(0,43,78,0.08)'
                          : 'rgba(255,255,255,0.08)';
                      }}
                    >
                      <span>{link.label}</span>
                      <ExternalLink
                        style={{
                          width: 14,
                          height: 14,
                          color: COLOR.red,
                          flexShrink: 0,
                        }}
                      />
                    </a>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isLight
                      ? 'rgba(0,43,78,0.03)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px dashed ${divider}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: textSubtle,
                      fontStyle: 'italic',
                      margin: 0,
                    }}
                  >
                    {tString('projects.detail.linksPlaceholder', 'Odkazy na repozitáře, dokumentaci, náhled — z databáze.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
