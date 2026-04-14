'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { Code, Database, Globe, Calendar } from 'lucide-react';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

type Year = {
  year: string;
  label: string;
  Icon: React.ComponentType<{ style?: React.CSSProperties }>;
  title: string;
  subjects: string[];
};

export const ClassicProgramTimeline: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();
  const isLight = classicMode === 'light';

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const tStr = (key: string, fallback: string): string => {
    const r = t(key, fallback);
    return Array.isArray(r) ? r[0] || fallback : (r as string);
  };

  const years: Year[] = [
    {
      year: '01',
      label: tStr('timeline.year1', '1. ročník'),
      Icon: Code,
      title: tStr('timeline.year1Title', 'Základy IT a hardware'),
      subjects: [
        'Informační technologie',
        'Hardware',
        'Programové vybavení',
        'Operační systémy',
        'Základy elektrotechniky',
        'Programování',
      ],
    },
    {
      year: '02',
      label: tStr('timeline.year2', '2. ročník'),
      Icon: Database,
      title: tStr('timeline.year2Title', 'Programování a databáze'),
      subjects: [
        'Programování',
        'CAD systémy',
        'Databázové systémy',
        'Grafická tvorba',
        'Datové sítě',
      ],
    },
    {
      year: '03',
      label: tStr('timeline.year3', '3. ročník'),
      Icon: Globe,
      title: tStr('timeline.year3Title', 'Sítě a pokročilé technologie'),
      subjects: [
        'Datové sítě',
        'Databázové systémy',
        'CAD systémy',
        'Grafická tvorba',
        'Ekonomika',
      ],
    },
    {
      year: '04',
      label: tStr('timeline.year4', '4. ročník'),
      Icon: Calendar,
      title: tStr('timeline.year4Title', 'Specializace a maturita'),
      subjects: [
        'Webdesign',
        'Virtualizace',
        'Grafická tvorba',
        'Databázové systémy',
        'Seminář k maturitě',
      ],
    },
  ];

  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isLight
          ? COLOR.paper
          : `linear-gradient(135deg, ${COLOR.navy} 0%, #0f1a3a 50%, ${COLOR.navyLight} 100%)`,
      }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: isDesktop ? '3rem' : '1.5rem',
          paddingRight: isDesktop ? '3rem' : '1.5rem',
          paddingTop: isDesktop ? '7rem' : '5rem',
          paddingBottom: isDesktop ? '7rem' : '5rem',
        }}
      >
        {/* Section heading */}
        <div
          style={{
            maxWidth: '44rem',
            marginBottom: isDesktop ? '4.5rem' : '3.5rem',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
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
                whiteSpace: 'nowrap',
              }}
            >
              {tStr('timeline.eyebrow', 'Studijní plán')}
            </span>
          </div>

          <h2
            style={{
              fontSize: isDesktop
                ? 'clamp(2.25rem, 3.8vw, 3.5rem)'
                : 'clamp(1.875rem, 7vw, 2.5rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginTop: 0,
              marginBottom: '1.25rem',
              color: textStrong,
            }}
          >
            {tStr('timeline.title', 'Čtyři ročníky')}
            <span style={{ color: COLOR.red }}>
              {tStr('timeline.titleHighlight', ', čtyři etapy.')}
            </span>
          </h2>

          <p
            style={{
              fontSize: isDesktop ? '1.125rem' : '1rem',
              lineHeight: 1.7,
              color: textMuted,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            {tStr(
              'timeline.description',
              'Studium začíná u základů hardwaru a programování a postupně se prohlubuje do sítí, databází a pokročilých technologií. Ve čtvrtém ročníku si student vybírá specializaci a připravuje se k maturitě.'
            )}
          </p>
        </div>

        {/* Year cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'stretch',
            gap: '1.5rem',
            flexWrap: 'nowrap',
          }}
        >
          {years.map(({ year, label, Icon, title, subjects }, idx) => (
            <div
              key={idx}
              style={{
                flex: isDesktop ? '1 1 0%' : '0 0 auto',
                minWidth: 0,
                width: isDesktop ? 'auto' : '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Big year number — sits above card, editorial style */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  marginBottom: '1.25rem',
                  paddingLeft: '0.25rem',
                  paddingRight: '0.25rem',
                }}
              >
                <div
                  style={{
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    lineHeight: 0.85,
                    letterSpacing: '-0.05em',
                    color: COLOR.red,
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {year}
                </div>
                <Icon
                  style={{
                    width: 20,
                    height: 20,
                    color: isLight
                      ? 'rgba(0, 43, 78, 0.3)'
                      : 'rgba(255, 255, 255, 0.35)',
                    marginBottom: '0.5rem',
                  }}
                />
              </div>

              {/* Red separator line */}
              <div
                aria-hidden
                style={{
                  height: '2px',
                  background: COLOR.red,
                  marginBottom: '1rem',
                }}
              />

              {/* Eyebrow label */}
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: isLight
                    ? 'rgba(0, 43, 78, 0.5)'
                    : 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '0.55rem',
                  paddingLeft: '0.25rem',
                }}
              >
                {label}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.015em',
                  color: textStrong,
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                  minHeight: '2.6em',
                  paddingLeft: '0.25rem',
                }}
              >
                {title}
              </div>

              {/* Subjects list — clean, no dividers, no markers */}
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  flex: 1,
                }}
              >
                {subjects.map((subject, sIdx) => (
                  <li
                    key={sIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                      paddingLeft: '0.25rem',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: isLight
                          ? 'rgba(0, 43, 78, 0.32)'
                          : 'rgba(255, 255, 255, 0.32)',
                        fontFeatureSettings: '"tnum"',
                        flexShrink: 0,
                        minWidth: '1.25rem',
                      }}
                    >
                      {String(sIdx + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        color: textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {subject}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
