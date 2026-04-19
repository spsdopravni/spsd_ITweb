'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, BookOpen, Wrench, GraduationCap, ListChecks } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  redLight: '#dc3530',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

interface SubjectDetail {
  description: string;
  topics: string[];
  weight?: string;
  exam?: string;
  tools?: string[];
}

interface SubjectRow {
  key: string;
  year1: string;
  year2: string;
  year3: string;
  year4: string;
  total: string;
  isIT?: boolean;
  detail?: SubjectDetail;
}

const itSubjectDetails: Record<string, SubjectDetail> = {
  it: {
    description: 'Základy informačních technologií, práce s operačními systémy, kancelářskými aplikacemi a základy algoritmického myšlení.',
    topics: ['Základy OS Windows/Linux', 'Kancelářský software (MS Office)', 'Základy algoritmizace', 'Bezpečnost dat a sítí'],
    weight: 'Klasifikace: průběžné testy + praktická cvičení',
    tools: ['MS Office', 'Windows', 'Linux'],
  },
  economics: {
    description: 'Ekonomické základy pro IT — podnikání, marketing, management projektů a kalkulace nákladů v IT.',
    topics: ['Základy ekonomie a podnikání', 'Marketing a management', 'Kalkulace IT projektů', 'Legislativa v IT'],
    weight: 'Klasifikace: písemné testy + semestrální projekt',
    tools: ['MS Excel', 'Google Sheets'],
  },
  hardware: {
    description: 'Architektura počítačů, komponenty, diagnostika a opravy HW. Základy elektrotechniky pro IT.',
    topics: ['Architektura PC', 'Komponenty a periférie', 'Diagnostika a servis', 'Základy elektrotechniky'],
    weight: 'Klasifikace: praktické testy + teoretické zkoušky',
    tools: ['Diagnostické nástroje', 'Servisní software'],
  },
  os: {
    description: 'Instalace, konfigurace a správa operačních systémů. Windows Server i Linuxové distribuce.',
    topics: ['Windows Server', 'Linuxové distribuce', 'Správa uživatelů a oprávnění', 'Síťové služby OS'],
    weight: 'Klasifikace: praktické úlohy + písemné testy',
    tools: ['Windows Server', 'Ubuntu/Debian', 'VMware'],
  },
  software: {
    description: 'Práce se softwarovými nástroji, instalace, správa a konfigurace aplikací. Licenční modely.',
    topics: ['Instalace a správa SW', 'Licenční modely', 'Virtualizace aplikací', 'Automatizace nasazení'],
    weight: 'Klasifikace: praktická cvičení + testy',
    tools: ['Správce balíčků', 'Virtualizační nástroje'],
  },
  networks: {
    description: 'Počítačové sítě od základů po pokročilé konfigurace. Cisco technologie, routing, switching a bezpečnost sítí.',
    topics: ['Síťové modely (OSI, TCP/IP)', 'Routing a switching', 'Cisco IOS konfigurace', 'Bezpečnost sítí', 'Bezdrátové sítě'],
    weight: 'Klasifikace: praktické konfigurace + Cisco testy + laboratorní cvičení',
    exam: 'Volitelný maturitní předmět',
    tools: ['Cisco Packet Tracer', 'Wireshark', 'Cisco zařízení'],
  },
  programming: {
    description: 'Programování v moderních jazycích — od základů algoritmizace po objektově orientované programování a vývoj aplikací.',
    topics: ['Algoritmy a datové struktury', 'C/C++', 'Python', 'Objektově orientované programování', 'Základy vývoje aplikací'],
    weight: 'Klasifikace: praktické projekty + písemné testy + semestrální práce',
    exam: 'Volitelný maturitní předmět',
    tools: ['Visual Studio', 'VS Code', 'Python IDLE', 'Git'],
  },
  digital: {
    description: 'Digitální technika, číslicové obvody, logické funkce a základy mikroprocesorové techniky.',
    topics: ['Číselné soustavy', 'Logické obvody', 'Kombinační a sekvenční obvody', 'Základy mikroprocesorů'],
    weight: 'Klasifikace: testy + laboratorní cvičení',
  },
  electronics: {
    description: 'Základy elektroniky — pasivní a aktivní součástky, měření elektrických veličin.',
    topics: ['Pasivní součástky (R, L, C)', 'Aktivní součástky (diody, tranzistory)', 'Měřicí technika', 'Základní zapojení'],
    weight: 'Klasifikace: laboratorní měření + testy',
  },
  cad: {
    description: 'Počítačem podporované projektování — 2D výkresy, 3D modelování a technická dokumentace.',
    topics: ['2D technické kreslení', '3D modelování', 'Výkresová dokumentace', 'Vizualizace a rendering'],
    weight: 'Klasifikace: praktické projekty + výkresy',
    tools: ['AutoCAD', 'Inventor', 'Fusion 360'],
  },
  databases: {
    description: 'Návrh a správa databází — relační model, SQL dotazy, normalizace a databázové servery.',
    topics: ['Relační datový model', 'SQL (SELECT, JOIN, poddotazy)', 'Normalizace', 'Databázové servery (MySQL, Oracle)'],
    weight: 'Klasifikace: SQL testy + praktické návrhy + semestrální projekt',
    exam: 'Volitelný maturitní předmět',
    tools: ['MySQL', 'Oracle', 'phpMyAdmin', 'SQL Developer'],
  },
  webdesign: {
    description: 'Tvorba moderních webových stránek — HTML5, CSS3, JavaScript a responzivní design.',
    topics: ['HTML5 a sémantické značkování', 'CSS3 a Flexbox/Grid', 'JavaScript a DOM', 'Responzivní design', 'UX/UI principy'],
    weight: 'Klasifikace: praktické projekty (weby)',
    tools: ['VS Code', 'Chrome DevTools', 'Figma'],
  },
  graphics: {
    description: 'Grafický design — rastrová i vektorová grafika, Adobe Creative Suite, digitální zpracování obrazu.',
    topics: ['Rastrová grafika (Photoshop)', 'Vektorová grafika (Illustrator)', 'Typografie a layout', 'Digitální fotografie', 'Příprava pro tisk a web'],
    weight: 'Klasifikace: grafické projekty + portfolio',
    exam: 'Volitelný maturitní předmět',
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
  },
  virtualization: {
    description: 'Virtualizační technologie — vytváření a správa virtuálních strojů, kontejnery a základy cloud computingu.',
    topics: ['Hypervisory (VMware, Hyper-V)', 'Správa virtuálních strojů', 'Kontejnery (Docker)', 'Základy cloud computingu'],
    weight: 'Klasifikace: praktické konfigurace + testy',
    tools: ['VMware Workstation', 'VirtualBox', 'Docker'],
  },
  seminar: {
    description: 'Příprava na maturitní zkoušku z odborných IT předmětů — opakování, procvičování a konzultace.',
    topics: ['Opakování klíčových témat', 'Příprava na ústní zkoušku', 'Konzultace maturitních prací'],
    weight: 'Klasifikace: průběžné hodnocení aktivity',
  },
  practice: {
    description: 'Odborná praxe v IT firmách a školních projektech — reálné nasazení znalostí v praxi.',
    topics: ['Práce v IT firmách', 'Školní projekty', 'Týmová spolupráce', 'Dokumentace a prezentace'],
    weight: 'Klasifikace: hodnocení z praxe + zpráva z praxe',
    exam: 'Praktická maturitní zkouška',
  },
};

export default function Curriculum() {
  const { t } = useLanguage();

  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tStr = (key: string, fallback?: string): string => {
    const r = t(key, fallback);
    return Array.isArray(r) ? r[0] || fallback || key : (r as string);
  };

  const subjectData: SubjectRow[] = [
    { key: 'czech', year1: '4', year2: '3', year3: '3', year4: '4', total: '14' },
    { key: 'english', year1: '3/3', year2: '3/3', year3: '3/3', year4: '3/3', total: '12' },
    { key: 'german', year1: '2/2', year2: '2/2', year3: '2/2', year4: '2/2', total: '8' },
    { key: 'civics', year1: '1', year2: '1', year3: '1', year4: '1', total: '4' },
    { key: 'history', year1: '1', year2: '-', year3: '-', year4: '-', total: '1' },
    { key: 'law', year1: '-', year2: '-', year3: '1', year4: '-', total: '1' },
    { key: 'physics', year1: '2', year2: '2', year3: '-', year4: '-', total: '4' },
    { key: 'chemistry', year1: '1', year2: '-', year3: '-', year4: '-', total: '1' },
    { key: 'ecology', year1: '-', year2: '1', year3: '-', year4: '-', total: '1' },
    { key: 'math', year1: '4', year2: '3', year3: '3', year4: '4', total: '14' },
    { key: 'pe', year1: '2/2', year2: '2/2', year3: '2/2', year4: '2/2', total: '8' },
    { key: 'it', year1: '2/2', year2: '2/2', year3: '-', year4: '-', total: '4', isIT: true, detail: itSubjectDetails.it },
    { key: 'economics', year1: '-', year2: '-', year3: '3/1', year4: '-', total: '3', isIT: true, detail: itSubjectDetails.economics },
    { key: 'hardware', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true, detail: itSubjectDetails.hardware },
    { key: 'os', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true, detail: itSubjectDetails.os },
    { key: 'software', year1: '2/2', year2: '2/2', year3: '-', year4: '-', total: '4', isIT: true, detail: itSubjectDetails.software },
    { key: 'networks', year1: '-', year2: '2', year3: '3/1', year4: '3', total: '8', isIT: true, detail: itSubjectDetails.networks },
    { key: 'programming', year1: '1/1', year2: '2/2', year3: '3/3', year4: '2/2', total: '8', isIT: true, detail: itSubjectDetails.programming },
    { key: 'digital', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true, detail: itSubjectDetails.digital },
    { key: 'electronics', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true, detail: itSubjectDetails.electronics },
    { key: 'cad', year1: '-', year2: '3/3', year3: '3/3', year4: '-', total: '6', isIT: true, detail: itSubjectDetails.cad },
    { key: 'databases', year1: '-', year2: '2/2', year3: '2/2', year4: '2/2', total: '6', isIT: true, detail: itSubjectDetails.databases },
    { key: 'webdesign', year1: '-', year2: '-', year3: '-', year4: '2/2', total: '2', isIT: true, detail: itSubjectDetails.webdesign },
    { key: 'graphics', year1: '-', year2: '2/2', year3: '2/2', year4: '3/3', total: '7', isIT: true, detail: itSubjectDetails.graphics },
    { key: 'virtualization', year1: '-', year2: '-', year3: '-', year4: '2/1', total: '2', isIT: true, detail: itSubjectDetails.virtualization },
    { key: 'seminar', year1: '-', year2: '-', year3: '-', year4: '1', total: '1', isIT: true, detail: itSubjectDetails.seminar },
    { key: 'practice', year1: '2/2', year2: '3/3', year3: '2/2', year4: '2/2', total: '9', isIT: true, detail: itSubjectDetails.practice },
  ];

  const isLight = true;

  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.55)';
  const divider = isLight ? 'rgba(0,43,78,0.1)' : 'rgba(255,255,255,0.1)';
  const dividerSoft = isLight ? 'rgba(0,43,78,0.06)' : 'rgba(255,255,255,0.06)';

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

  const yearTotals = {
    year1: 35,
    year2: 35,
    year3: 33,
    year4: 33,
    total: 136,
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
              {tStr('curriculum.eyebrow', 'Učební plán · ŠVP 18-20-M/01')}
            </span>
          </div>

          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(3rem, 5.2vw, 5rem)'
                : 'clamp(2.25rem, 9vw, 3.5rem)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginTop: 0,
              marginBottom: '2rem',
              color: textStrong,
              maxWidth: '56rem',
            }}
          >
            {tStr('curriculum.title', 'Učební plán')}
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
            {tStr(
              'curriculum.heroDesc',
              'Kompletní přehled všech vyučovacích předmětů v průběhu čtyřletého studia včetně hodinové dotace. Celkem 136 týdenních hodin — odborné IT předměty i všeobecné vzdělávání.'
            )}
          </p>
        </div>
      </section>

      {/* ========== INFO CARDS (ŠVP metadata) ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1.5rem',
            paddingBottom: isDesktop ? '5rem' : '3.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(4, 1fr)' : '1fr 1fr',
              gap: '1.25rem',
            }}
          >
            {[
              {
                label: tStr('curriculum.info.rvpCode', 'RVP kód'),
                value: tStr('curriculum.info.rvpValue', '18-20-M/01'),
              },
              {
                label: tStr('curriculum.info.svpName', 'Název ŠVP'),
                value: tStr(
                  'curriculum.info.svpValue',
                  'Aplikace, grafika a webdesign'
                ),
              },
              {
                label: tStr('curriculum.info.duration', 'Délka studia'),
                value: tStr('curriculum.info.durationValue', '4 roky, maturita'),
              },
              {
                label: tStr('curriculum.info.validity', 'Platnost'),
                value: tStr('curriculum.info.validityValue', 'od 1. 9. 2023'),
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '1.25rem 1.4rem',
                  borderLeft: `3px solid ${COLOR.red}`,
                  background: isLight
                    ? 'rgba(0, 43, 78, 0.03)'
                    : 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    color: textSubtle,
                    marginBottom: '0.45rem',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: textStrong,
                    lineHeight: 1.35,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TABLE ========== */}
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
            paddingBottom: isDesktop ? '8rem' : '5rem',
          }}
        >
          {/* Section heading — full width */}
          <div
            style={{
              marginBottom: isDesktop ? '2.5rem' : '2rem',
            }}
          >
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
                {tStr('curriculum.tableEyebrow', 'Hodinová dotace')}
              </span>
            </div>
            <h2
              style={{
                fontSize: isDesktop
                  ? 'clamp(1.875rem, 3.2vw, 2.5rem)'
                  : 'clamp(1.5rem, 5.5vw, 1.875rem)',
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: '-0.015em',
                marginTop: 0,
                marginBottom: '1.15rem',
                color: textStrong,
                whiteSpace: isDesktop ? 'nowrap' : 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {tStr('curriculum.table.title', 'Počet vyučovacích hodin za studium týdenních')}
            </h2>
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.65,
                color: textMuted,
                margin: 0,
                maxWidth: '52rem',
              }}
            >
              {tStr(
                'curriculum.tableDesc',
                'Souhrnná tabulka všech vyučovacích předmětů a jejich hodinových dotací napříč čtyřmi ročníky studia. Součet za celé čtyřleté studium činí 136 týdenních hodin.'
              )}{' '}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: COLOR.red,
                  }}
                />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                  {tStr(
                    'curriculum.legend',
                    'červeně označené předměty patří do IT bloku'
                  )}
                </span>
              </span>
            </p>
          </div>

          {/* Desktop table */}
          {isDesktop ? (
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.82)',
                border: isLight
                  ? '1px solid rgba(0, 43, 78, 0.12)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isLight
                  ? '0 32px 64px -20px rgba(0, 43, 78, 0.22)'
                  : '0 32px 64px -20px rgba(0, 0, 0, 0.55)',
              }}
            >
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                      borderBottom: `3px solid ${COLOR.red}`,
                    }}
                  >
                    <th
                      style={{
                        textAlign: 'left',
                        padding: '1.1rem 1.5rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      {tStr('curriculum.table.subject', 'Předmět')}
                    </th>
                    {['1', '2', '3', '4'].map((n) => (
                      <th
                        key={n}
                        style={{
                          textAlign: 'center',
                          padding: '1.1rem 0.5rem',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.16em',
                          color: 'rgba(255,255,255,0.9)',
                          width: '72px',
                        }}
                      >
                        {n}. ročník
                      </th>
                    ))}
                    <th
                      style={{
                        textAlign: 'center',
                        padding: '1.1rem 1rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        color: COLOR.orange,
                        width: '88px',
                      }}
                    >
                      Celkem
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subjectData.map((s, i) => {
                    const isExpanded = expandedSubject === s.key;
                    const hasDetail = !!s.detail;
                    return (
                      <React.Fragment key={s.key}>
                        <tr
                          onClick={hasDetail ? () => setExpandedSubject(isExpanded ? null : s.key) : undefined}
                          style={{
                            borderBottom:
                              i < subjectData.length - 1 && !isExpanded
                                ? `1px solid ${dividerSoft}`
                                : isExpanded ? 'none' : 'none',
                            background: isExpanded
                              ? isLight ? 'rgba(200, 30, 28, 0.07)' : 'rgba(200, 30, 28, 0.15)'
                              : s.isIT
                                ? isLight ? 'rgba(200, 30, 28, 0.035)' : 'rgba(200, 30, 28, 0.08)'
                                : 'transparent',
                            cursor: hasDetail ? 'pointer' : 'default',
                            transition: 'background 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (hasDetail && !isExpanded) {
                              e.currentTarget.style.background = isLight
                                ? 'rgba(200, 30, 28, 0.06)'
                                : 'rgba(200, 30, 28, 0.12)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (hasDetail && !isExpanded) {
                              e.currentTarget.style.background = s.isIT
                                ? isLight ? 'rgba(200, 30, 28, 0.035)' : 'rgba(200, 30, 28, 0.08)'
                                : 'transparent';
                            }
                          }}
                        >
                          <td
                            style={{
                              padding: '0.9rem 1.5rem',
                              color: textStrong,
                              fontWeight: s.isIT ? 600 : 500,
                              position: 'relative',
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                              }}
                            >
                              {s.isIT && (
                                <span
                                  aria-hidden
                                  style={{
                                    display: 'inline-block',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: COLOR.red,
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                              {!s.isIT && (
                                <span
                                  aria-hidden
                                  style={{
                                    display: 'inline-block',
                                    width: '6px',
                                    height: '6px',
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                              {tStr(`curriculum.subjects.${s.key}`, s.key)}
                              {hasDetail && (
                                <ChevronDown
                                  style={{
                                    width: 14,
                                    height: 14,
                                    color: isExpanded ? COLOR.red : textSubtle,
                                    transition: 'transform 0.25s ease, color 0.2s',
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 0.5rem', color: textMuted, fontFeatureSettings: '"tnum"' }}>{s.year1}</td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 0.5rem', color: textMuted, fontFeatureSettings: '"tnum"' }}>{s.year2}</td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 0.5rem', color: textMuted, fontFeatureSettings: '"tnum"' }}>{s.year3}</td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 0.5rem', color: textMuted, fontFeatureSettings: '"tnum"' }}>{s.year4}</td>
                          <td style={{ textAlign: 'center', padding: '0.9rem 1rem', color: textStrong, fontWeight: 700, fontFeatureSettings: '"tnum"' }}>{s.total}</td>
                        </tr>
                        {isExpanded && s.detail && (
                          <tr
                            style={{
                              background: isLight ? 'rgba(200, 30, 28, 0.03)' : 'rgba(200, 30, 28, 0.06)',
                              borderBottom: i < subjectData.length - 1 ? `1px solid ${dividerSoft}` : 'none',
                            }}
                          >
                            <td colSpan={6} style={{ padding: 0 }}>
                              <div
                                style={{
                                  padding: '1.25rem 1.5rem 1.5rem 2.85rem',
                                  display: 'grid',
                                  gridTemplateColumns: '1fr 1fr',
                                  gap: '1.25rem 2rem',
                                }}
                              >
                                {/* Description */}
                                <div style={{ gridColumn: '1 / -1' }}>
                                  <p style={{
                                    fontSize: '0.9rem',
                                    lineHeight: 1.65,
                                    color: textMuted,
                                    margin: 0,
                                  }}>
                                    {s.detail.description}
                                  </p>
                                </div>

                                {/* Topics */}
                                <div>
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.6rem',
                                  }}>
                                    <ListChecks style={{ width: 14, height: 14, color: COLOR.red }} />
                                    <span style={{
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.12em',
                                      color: textStrong,
                                    }}>
                                      Hlavní témata
                                    </span>
                                  </div>
                                  <ul style={{
                                    margin: 0,
                                    paddingLeft: '1.1rem',
                                    listStyle: 'none',
                                  }}>
                                    {s.detail.topics.map((topic, ti) => (
                                      <li key={ti} style={{
                                        fontSize: '0.825rem',
                                        color: textMuted,
                                        lineHeight: 1.7,
                                        position: 'relative',
                                        paddingLeft: '0.1rem',
                                      }}>
                                        <span style={{
                                          position: 'absolute',
                                          left: '-0.9rem',
                                          color: COLOR.red,
                                          fontWeight: 700,
                                        }}>
                                          ·
                                        </span>
                                        {topic}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Right column: weight, exam, tools */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                  {/* Weight/grading */}
                                  {s.detail.weight && (
                                    <div>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.35rem',
                                      }}>
                                        <GraduationCap style={{ width: 14, height: 14, color: COLOR.red }} />
                                        <span style={{
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.12em',
                                          color: textStrong,
                                        }}>
                                          Hodnocení
                                        </span>
                                      </div>
                                      <p style={{
                                        fontSize: '0.825rem',
                                        color: textMuted,
                                        margin: 0,
                                        lineHeight: 1.5,
                                      }}>
                                        {s.detail.weight}
                                      </p>
                                    </div>
                                  )}

                                  {/* Exam info */}
                                  {s.detail.exam && (
                                    <div>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.35rem',
                                      }}>
                                        <BookOpen style={{ width: 14, height: 14, color: COLOR.red }} />
                                        <span style={{
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.12em',
                                          color: textStrong,
                                        }}>
                                          Maturita
                                        </span>
                                      </div>
                                      <span style={{
                                        display: 'inline-block',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        padding: '0.25rem 0.65rem',
                                        borderRadius: '6px',
                                        background: 'rgba(200, 30, 28, 0.08)',
                                        color: COLOR.red,
                                      }}>
                                        {s.detail.exam}
                                      </span>
                                    </div>
                                  )}

                                  {/* Tools */}
                                  {s.detail.tools && s.detail.tools.length > 0 && (
                                    <div>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.4rem',
                                      }}>
                                        <Wrench style={{ width: 14, height: 14, color: COLOR.red }} />
                                        <span style={{
                                          fontSize: '0.7rem',
                                          fontWeight: 700,
                                          textTransform: 'uppercase',
                                          letterSpacing: '0.12em',
                                          color: textStrong,
                                        }}>
                                          Nástroje
                                        </span>
                                      </div>
                                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                        {s.detail.tools.map((tool, ti) => (
                                          <span key={ti} style={{
                                            fontSize: '0.725rem',
                                            fontWeight: 500,
                                            padding: '0.2rem 0.55rem',
                                            borderRadius: '5px',
                                            background: isLight ? 'rgba(0, 43, 78, 0.06)' : 'rgba(255,255,255,0.08)',
                                            color: textMuted,
                                          }}>
                                            {tool}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <tr
                    style={{
                      background: isLight
                        ? 'rgba(0, 43, 78, 0.05)'
                        : 'rgba(255, 255, 255, 0.05)',
                      borderTop: `2px solid ${COLOR.red}`,
                    }}
                  >
                    <td
                      style={{
                        padding: '1.15rem 1.5rem 1.15rem 2.4rem',
                        color: textStrong,
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                      }}
                    >
                      {tStr('curriculum.subjects.total', 'Celkem hodin')}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '1.15rem 0.5rem',
                        color: textStrong,
                        fontWeight: 700,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {yearTotals.year1}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '1.15rem 0.5rem',
                        color: textStrong,
                        fontWeight: 700,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {yearTotals.year2}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '1.15rem 0.5rem',
                        color: textStrong,
                        fontWeight: 700,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {yearTotals.year3}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '1.15rem 0.5rem',
                        color: textStrong,
                        fontWeight: 700,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {yearTotals.year4}
                    </td>
                    <td
                      style={{
                        textAlign: 'center',
                        padding: '1.15rem 1rem',
                        color: COLOR.red,
                        fontWeight: 900,
                        fontSize: '1.1rem',
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {yearTotals.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            // Mobile card list
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {subjectData.map((s) => {
                const isExpanded = expandedSubject === s.key;
                const hasDetail = !!s.detail;
                return (
                  <div
                    key={s.key}
                    onClick={hasDetail ? () => setExpandedSubject(isExpanded ? null : s.key) : undefined}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: '10px',
                      background: isLight
                        ? isExpanded
                          ? 'rgba(200, 30, 28, 0.07)'
                          : s.isIT
                            ? 'rgba(200, 30, 28, 0.05)'
                            : COLOR.white
                        : isExpanded
                          ? 'rgba(200, 30, 28, 0.18)'
                          : s.isIT
                            ? 'rgba(200, 30, 28, 0.12)'
                            : 'rgba(10, 21, 48, 0.6)',
                      border: isLight
                        ? isExpanded
                          ? '1px solid rgba(200, 30, 28, 0.4)'
                          : s.isIT
                            ? '1px solid rgba(200, 30, 28, 0.3)'
                            : '1px solid rgba(0, 43, 78, 0.1)'
                        : isExpanded
                          ? '1px solid rgba(200, 30, 28, 0.5)'
                          : s.isIT
                            ? '1px solid rgba(200, 30, 28, 0.4)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: hasDetail ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.925rem',
                          fontWeight: 700,
                          color: textStrong,
                          lineHeight: 1.3,
                        }}
                      >
                        {tStr(`curriculum.subjects.${s.key}`, s.key)}
                        {hasDetail && (
                          <ChevronDown
                            style={{
                              width: 14,
                              height: 14,
                              color: isExpanded ? COLOR.red : textSubtle,
                              transition: 'transform 0.25s ease',
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                      {s.isIT && (
                        <span
                          style={{
                            fontSize: '0.6rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            background: COLOR.red,
                            color: COLOR.white,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            flexShrink: 0,
                          }}
                        >
                          IT
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '0.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {[
                        { label: '1', val: s.year1 },
                        { label: '2', val: s.year2 },
                        { label: '3', val: s.year3 },
                        { label: '4', val: s.year4 },
                        { label: 'Σ', val: s.total, emphasis: true },
                      ].map((c, i) => (
                        <div key={i}>
                          <div
                            style={{
                              fontSize: '0.65rem',
                              color: textSubtle,
                              marginBottom: '0.2rem',
                              fontWeight: 600,
                            }}
                          >
                            {c.label}
                          </div>
                          <div
                            style={{
                              fontSize: '0.875rem',
                              color: c.emphasis ? COLOR.red : textStrong,
                              fontWeight: c.emphasis ? 800 : 500,
                              fontFeatureSettings: '"tnum"',
                            }}
                          >
                            {c.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Expanded detail for mobile */}
                    {isExpanded && s.detail && (
                      <div
                        style={{
                          marginTop: '1rem',
                          paddingTop: '1rem',
                          borderTop: `1px solid rgba(200, 30, 28, 0.15)`,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                        }}
                      >
                        <p style={{
                          fontSize: '0.85rem',
                          lineHeight: 1.65,
                          color: textMuted,
                          margin: 0,
                        }}>
                          {s.detail.description}
                        </p>

                        {/* Topics */}
                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            marginBottom: '0.45rem',
                          }}>
                            <ListChecks style={{ width: 13, height: 13, color: COLOR.red }} />
                            <span style={{
                              fontSize: '0.65rem',
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              color: textStrong,
                            }}>Hlavní témata</span>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '1rem', listStyle: 'none' }}>
                            {s.detail.topics.map((topic, ti) => (
                              <li key={ti} style={{
                                fontSize: '0.8rem',
                                color: textMuted,
                                lineHeight: 1.7,
                                position: 'relative',
                                paddingLeft: '0.1rem',
                              }}>
                                <span style={{
                                  position: 'absolute',
                                  left: '-0.8rem',
                                  color: COLOR.red,
                                  fontWeight: 700,
                                }}>·</span>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Weight */}
                        {s.detail.weight && (
                          <div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              marginBottom: '0.3rem',
                            }}>
                              <GraduationCap style={{ width: 13, height: 13, color: COLOR.red }} />
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: textStrong,
                              }}>Hodnocení</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: textMuted, margin: 0, lineHeight: 1.5 }}>
                              {s.detail.weight}
                            </p>
                          </div>
                        )}

                        {/* Exam */}
                        {s.detail.exam && (
                          <div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              marginBottom: '0.3rem',
                            }}>
                              <BookOpen style={{ width: 13, height: 13, color: COLOR.red }} />
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: textStrong,
                              }}>Maturita</span>
                            </div>
                            <span style={{
                              display: 'inline-block',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '0.2rem 0.55rem',
                              borderRadius: '5px',
                              background: 'rgba(200, 30, 28, 0.08)',
                              color: COLOR.red,
                            }}>
                              {s.detail.exam}
                            </span>
                          </div>
                        )}

                        {/* Tools */}
                        {s.detail.tools && s.detail.tools.length > 0 && (
                          <div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              marginBottom: '0.35rem',
                            }}>
                              <Wrench style={{ width: 13, height: 13, color: COLOR.red }} />
                              <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                color: textStrong,
                              }}>Nástroje</span>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                              {s.detail.tools.map((tool, ti) => (
                                <span key={ti} style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 500,
                                  padding: '0.18rem 0.5rem',
                                  borderRadius: '5px',
                                  background: isLight ? 'rgba(0, 43, 78, 0.06)' : 'rgba(255,255,255,0.08)',
                                  color: textMuted,
                                }}>
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Total row for mobile */}
              <div
                style={{
                  padding: '1.1rem 1.15rem',
                  borderRadius: '10px',
                  background: isLight
                    ? 'rgba(0, 43, 78, 0.06)'
                    : 'rgba(255, 255, 255, 0.06)',
                  border: `2px solid ${COLOR.red}`,
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: textStrong,
                    marginBottom: '0.75rem',
                  }}
                >
                  {tStr('curriculum.subjects.total', 'Celkem hodin')}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  {[
                    yearTotals.year1,
                    yearTotals.year2,
                    yearTotals.year3,
                    yearTotals.year4,
                    yearTotals.total,
                  ].map((v, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: i === 4 ? '1.1rem' : '0.95rem',
                        color: i === 4 ? COLOR.red : textStrong,
                        fontWeight: i === 4 ? 900 : 700,
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {v}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
