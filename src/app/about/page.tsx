'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  BookOpen,
  Users,
  Building,
  Code,
  Database,
  Briefcase,
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

export default function About() {
  const { t } = useLanguage();

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

  const isLight = true;

  const textStrong = COLOR.navy;
  const textMuted = 'rgba(0,43,78,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.55)';
  const divider = isLight ? 'rgba(0,43,78,0.1)' : 'rgba(255,255,255,0.1)';

  const focusItems = [
    'Programování (Python, C/C++, Java)',
    'Datové sítě a Cisco technologie',
    'Databázové systémy (SQL)',
    'Webdesign a grafická tvorba',
    'CAD systémy a 3D modelování',
    'Hardware a operační systémy',
    'Virtualizace a cloud',
  ];

  const employmentItems = [
    'Software developer',
    'Správce IT systémů',
    'Webový vývojář',
    'Databázový specialista',
    'IT konzultant',
    'Pokračování na VŠ',
  ];

  const whyItems = [
    {
      Icon: Database,
      title: tStr('about.whyChooseUs.modernEquipment.title', 'Moderní vybavení'),
      desc: tStr(
        'about.whyChooseUs.modernEquipment.description',
        'Počítačové učebny s aktuálním hardwarem a softwarem pro praktickou výuku.'
      ),
    },
    {
      Icon: Briefcase,
      title: tStr('about.whyChooseUs.companiesPractice.title', 'Praxe ve firmách'),
      desc: tStr(
        'about.whyChooseUs.companiesPractice.description',
        'Odborné stáže ve spolupráci s předními IT společnostmi.'
      ),
    },
    {
      Icon: Users,
      title: tStr('about.whyChooseUs.experiencedTeachers.title', 'Zkušení pedagogové'),
      desc: tStr(
        'about.whyChooseUs.experiencedTeachers.description',
        'Učitelé s praxí z IT prostředí, individuální přístup a konzultace.'
      ),
    },
  ];

  // Section heading reusable block
  const SectionHeading: React.FC<{
    eyebrow: string;
    title: React.ReactNode;
    subtitle?: string;
    maxWidth?: string;
  }> = ({ eyebrow, title, subtitle, maxWidth = '44rem' }) => (
    <div style={{ maxWidth, marginBottom: isDesktop ? '4rem' : '3rem' }}>
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
          {eyebrow}
        </span>
      </div>
      <h2
        style={{
          fontSize: isDesktop
            ? 'clamp(2.25rem, 3.8vw, 3.25rem)'
            : 'clamp(1.875rem, 7vw, 2.5rem)',
          lineHeight: 1.05,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginTop: 0,
          marginBottom: subtitle ? '1.25rem' : 0,
          color: textStrong,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: isDesktop ? '1.125rem' : '1rem',
            lineHeight: 1.7,
            color: textMuted,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

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

  return (
    <div
      style={{
        minHeight: '100vh',
        background: sectionBg,
      }}
    >
      {/* ========== HERO ========== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Corner wedge — top left */}
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
          {/* Eyebrow */}
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
              {tStr('about.eyebrow', 'O oboru IT')}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(3rem, 5.2vw, 5rem)'
                : 'clamp(2.25rem, 9vw, 3.5rem)',
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginTop: 0,
              marginBottom: 0,
              color: textStrong,
              maxWidth: '56rem',
            }}
          >
            {tStr('about.heroTitle', 'O oboru')}
          </h1>
        </div>
      </section>

      {/* ========== WHAT IS IT — editorial split ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '6rem' : '4rem',
            paddingBottom: isDesktop ? '6rem' : '4rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? '4.5rem' : '3rem',
              alignItems: 'flex-start',
            }}
          >
            {/* Left — heading + description */}
            <div
              style={{
                flex: isDesktop ? '1 1 0%' : '0 0 auto',
                width: isDesktop ? 'auto' : '100%',
                minWidth: 0,
              }}
            >
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
                  }}
                >
                  {tStr('about.whatIsEyebrow', 'Charakteristika oboru')}
                </span>
              </div>
              <h2
                style={{
                  fontSize: isDesktop
                    ? 'clamp(2.25rem, 3.6vw, 3rem)'
                    : 'clamp(1.75rem, 7vw, 2.25rem)',
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  marginTop: 0,
                  marginBottom: '1.5rem',
                  color: textStrong,
                }}
              >
                {tStr('about.whatIs', 'Co tě obor IT naučí')}
              </h2>
              <p
                style={{
                  fontSize: isDesktop ? '1.0625rem' : '1rem',
                  lineHeight: 1.75,
                  color: textMuted,
                  maxWidth: '36rem',
                  marginTop: 0,
                  marginBottom: '1.25rem',
                }}
              >
                {tStr(
                  'about.description1',
                  'Obor Informační technologie (ŠVP 18-20-M/01) připravuje studenty na práci v dynamicky se rozvíjející oblasti IT. Během čtyřletého studia projdeš programováním, počítačovými sítěmi, databázemi, grafikou i hardwarem.'
                )}
              </p>
              <p
                style={{
                  fontSize: isDesktop ? '1.0625rem' : '1rem',
                  lineHeight: 1.75,
                  color: textMuted,
                  maxWidth: '36rem',
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {tStr(
                  'about.description2',
                  'Důraz klademe na praktické dovednosti, reálné projekty a spolupráci s firmami. Absolvent je připraven jak na pokračování na vysoké škole, tak na nástup do IT praxe.'
                )}
              </p>
            </div>

            {/* Right — info card */}
            <div
              style={{
                flex: isDesktop ? '0 0 380px' : '0 0 auto',
                width: isDesktop ? '380px' : '100%',
              }}
            >
              <div
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.88)',
                  border: isLight
                    ? '1px solid rgba(0, 43, 78, 0.12)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isLight
                    ? '0 32px 64px -20px rgba(0, 43, 78, 0.22)'
                    : '0 32px 64px -20px rgba(0, 0, 0, 0.55)',
                }}
              >
                <div
                  style={{
                    padding: '1.35rem 1.75rem',
                    background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                    borderBottom: `3px solid ${COLOR.red}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BookOpen
                      style={{
                        width: 20,
                        height: 20,
                        color: COLOR.orange,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        color: 'rgba(255, 255, 255, 0.95)',
                      }}
                    >
                      {tStr('about.infoCardLabel', 'Základní informace')}
                    </span>
                  </div>
                </div>

                {/* Info rows */}
                <div>
                  {[
                    {
                      label: tStr('about.info.code', 'Kód oboru'),
                      value: '18-20-M/01',
                    },
                    {
                      label: tStr('about.info.name', 'Název ŠVP'),
                      value: 'Aplikace, grafika a webdesign',
                    },
                    {
                      label: tStr('about.info.duration', 'Délka studia'),
                      value: '4 roky, maturitní obor',
                    },
                    {
                      label: tStr('about.info.form', 'Forma'),
                      value: 'denní studium',
                    },
                  ].map((row, i, arr) => (
                    <div
                      key={i}
                      style={{
                        padding: '1.15rem 1.75rem',
                        borderBottom:
                          i < arr.length - 1 ? `1px solid ${divider}` : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.16em',
                          color: textSubtle,
                          marginBottom: '0.35rem',
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOCUS + EMPLOYMENT (two columns) ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '5rem' : '3.5rem',
            paddingBottom: isDesktop ? '6rem' : '4rem',
          }}
        >
          <SectionHeading
            eyebrow={tStr('about.focusEyebrow', 'Náplň studia')}
            title={
              <>
                {tStr('about.focusTitle', 'Zaměření oboru a ')}
                <span style={{ color: COLOR.red }}>
                  {tStr('about.focusTitleHighlight', 'uplatnění absolventů')}
                </span>
              </>
            }
          />

          <div
            style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? '4rem' : '3rem',
              alignItems: 'flex-start',
            }}
          >
            {/* Column 1 — Focus */}
            <div
              style={{
                flex: isDesktop ? '1 1 0%' : '0 0 auto',
                width: isDesktop ? 'auto' : '100%',
                minWidth: 0,
              }}
            >
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
                  <Code style={{ width: 20, height: 20 }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: textStrong,
                    letterSpacing: '-0.015em',
                    margin: 0,
                  }}
                >
                  {tStr('about.fieldFocus.title', 'Zaměření oboru')}
                </h3>
              </div>
              <div
                aria-hidden
                style={{
                  height: '2px',
                  background: COLOR.red,
                  marginBottom: '1.25rem',
                }}
              />
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {focusItems.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: isLight
                          ? 'rgba(0,43,78,0.32)'
                          : 'rgba(255,255,255,0.32)',
                        flexShrink: 0,
                        minWidth: '1.4rem',
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Employment */}
            <div
              style={{
                flex: isDesktop ? '1 1 0%' : '0 0 auto',
                width: isDesktop ? 'auto' : '100%',
                minWidth: 0,
              }}
            >
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
                  <Building style={{ width: 20, height: 20 }} />
                </div>
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: textStrong,
                    letterSpacing: '-0.015em',
                    margin: 0,
                  }}
                >
                  {tStr('about.graduateEmployment.title', 'Uplatnění absolventů')}
                </h3>
              </div>
              <div
                aria-hidden
                style={{
                  height: '2px',
                  background: COLOR.red,
                  marginBottom: '1.25rem',
                }}
              />
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {employmentItems.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: isLight
                          ? 'rgba(0,43,78,0.32)'
                          : 'rgba(255,255,255,0.32)',
                        flexShrink: 0,
                        minWidth: '1.4rem',
                        fontFeatureSettings: '"tnum"',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: '0.975rem',
                        fontWeight: 500,
                        color: textMuted,
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US (3 features) ========== */}
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
            paddingTop: isDesktop ? '5rem' : '3.5rem',
            paddingBottom: isDesktop ? '8rem' : '5rem',
          }}
        >
          <SectionHeading
            eyebrow={tStr('about.whyEyebrow', 'Proč si nás vybrat')}
            title={
              <>
                {tStr('about.whyTitle', 'Co u nás')}
                <span style={{ color: COLOR.red }}>
                  {tStr('about.whyTitleHighlight', ' dostaneš')}
                </span>
                .
              </>
            }
            subtitle={tStr(
              'about.whyDesc',
              'Kombinace moderního vybavení, praxe v reálných firmách a zkušených pedagogů. To je naše tři hlavní výhody.'
            )}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            {whyItems.map(({ Icon, title, desc }, i) => (
              <div
                key={i}
                style={{
                  flex: isDesktop ? '1 1 0%' : '0 0 auto',
                  width: isDesktop ? 'auto' : '100%',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  borderRadius: '14px',
                  background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.82)',
                  border: isLight
                    ? '1px solid rgba(0, 43, 78, 0.12)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isLight
                    ? '0 24px 52px -22px rgba(0, 43, 78, 0.18)'
                    : '0 24px 52px -22px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${COLOR.red} 0%, ${COLOR.orange} 100%)`,
                    color: COLOR.white,
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon style={{ width: 26, height: 26 }} />
                </div>
                <h4
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: textStrong,
                    letterSpacing: '-0.015em',
                    marginTop: 0,
                    marginBottom: '0.75rem',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    color: textMuted,
                    margin: 0,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
