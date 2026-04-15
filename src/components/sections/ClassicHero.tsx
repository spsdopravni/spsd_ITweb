'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import {
  ArrowRight,
  FolderOpen,
  School,
  GraduationCap,
  Cpu,
  Award,
  LucideIcon,
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

type Feature = { Icon: LucideIcon; title: string; desc: string };

export const ClassicHero: React.FC = () => {
  const { t } = useLanguage();
  const { classicMode } = useTheme();
  const isLight = classicMode === 'light';

  // Viewport detection via matchMedia — bulletproof, no Tailwind responsive
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

  const features: Feature[] = [
    {
      Icon: Cpu,
      title: tStr('hero.feature1Title', 'Moderní technologie'),
      desc: tStr(
        'hero.feature1Desc',
        'Python, TypeScript, sítě, Linux, Docker, databáze.'
      ),
    },
    {
      Icon: School,
      title: tStr('hero.feature2Title', 'Praxe ve firmách'),
      desc: tStr(
        'hero.feature2Desc',
        'Odborné stáže a spolupráce s reálnými firmami, kde si vyzkoušíš skutečné projekty.'
      ),
    },
    {
      Icon: Award,
      title: tStr('hero.feature3Title', 'Soutěže a projekty'),
      desc: tStr(
        'hero.feature3Desc',
        'Hackathony, maturitní práce a zadání z praxe, které tě připraví na reálný svět IT.'
      ),
    },
  ];

  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const [titleFontPx, setTitleFontPx] = useState(64);

  const titleText = tStr('hero.title', 'Technologie, které tě');
  const highlightText = tStr('hero.titleHighlight', 'připraví na budoucnost.');

  useLayoutEffect(() => {
    const el = leftColumnRef.current;
    if (!el) return;

    const LETTER_SPACING_EM = -0.025;
    const REF_SIZE = 100;
    const letterSpacingPx = LETTER_SPACING_EM * REF_SIZE;

    const compute = () => {
      const containerWidth = el.clientWidth;
      if (!containerWidth) return;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.font = `800 ${REF_SIZE}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      const line1 =
        ctx.measureText(titleText).width +
        Math.max(0, titleText.length - 1) * letterSpacingPx;
      const line2 =
        ctx.measureText(highlightText).width +
        Math.max(0, highlightText.length - 1) * letterSpacingPx;
      const widest = Math.max(line1, line2);
      if (widest <= 0) return;

      const target = containerWidth * 0.96;
      const raw = REF_SIZE * (target / widest);

      const maxFont = isDesktop ? 80 : 56;
      const minFont = isDesktop ? 40 : 30;
      const clamped = Math.min(maxFont, Math.max(minFont, raw));
      setTitleFontPx(Math.round(clamped));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [titleText, highlightText, isDesktop]);

  // Theme-derived colors
  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.55)';
  const dividerSoft = isLight ? 'rgba(0,43,78,0.08)' : 'rgba(255,255,255,0.08)';

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
      {/* Red corner wedge — top left */}
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

      {/* Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: isDesktop ? '3rem' : '1.5rem',
          paddingRight: isDesktop ? '3rem' : '1.5rem',
          paddingTop: isDesktop ? '8rem' : '5.5rem',
          paddingBottom: isDesktop ? '8rem' : '5rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            alignItems: 'flex-start',
            gap: isDesktop ? '4.5rem' : '3.5rem',
            width: '100%',
          }}
        >
          {/* ============ LEFT COLUMN ============ */}
          <div
            ref={leftColumnRef}
            style={{
              flex: isDesktop ? '1 1 0%' : '0 0 auto',
              minWidth: 0,
              width: isDesktop ? 'auto' : '100%',
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
                  whiteSpace: 'nowrap',
                }}
              >
                {tStr('hero.eyebrow', 'SPŠD Praha Motol · Obor IT')}
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: `${titleFontPx}px`,
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginTop: 0,
                marginBottom: '2rem',
                color: textStrong,
              }}
            >
              <span style={{ display: 'block' }}>
                {tStr('hero.title', 'Technologie, které tě')}
              </span>
              <span
                style={{
                  display: 'block',
                  color: COLOR.red,
                  marginTop: '0.1em',
                }}
              >
                {tStr('hero.titleHighlight', 'připraví na budoucnost.')}
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: isDesktop ? '1.15rem' : '1.0625rem',
                lineHeight: 1.7,
                color: textMuted,
                maxWidth: '38rem',
                marginTop: 0,
                marginBottom: '2.75rem',
                fontWeight: 400,
              }}
            >
              {tStr(
                'hero.subtitle',
                'Obor Informační technologie je čtyřletý maturitní program zaměřený na programování, počítačové sítě, kyberbezpečnost a moderní webové technologie. U nás se neučíš jen teorii — pracuješ s tím, co se skutečně používá v praxi.'
              )}
            </p>

            {/* CTA row */}
            <div
              style={{
                display: 'flex',
                flexDirection: isDesktop ? 'row' : 'column',
                gap: '0.875rem',
                alignItems: isDesktop ? 'center' : 'stretch',
              }}
            >
              {/* Primary CTA */}
              <Link
                href="/about"
                onMouseEnter={() => setPrimaryHover(true)}
                onMouseLeave={() => setPrimaryHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  padding: '1rem 1.875rem',
                  borderRadius: '8px',
                  background: primaryHover ? COLOR.redLight : COLOR.red,
                  color: COLOR.white,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: primaryHover
                    ? '0 18px 38px -10px rgba(200, 30, 28, 0.55)'
                    : '0 12px 28px -10px rgba(200, 30, 28, 0.4)',
                  transform: primaryHover ? 'translateY(-2px)' : 'translateY(0)',
                  transition:
                    'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                }}
              >
                <School style={{ width: 20, height: 20, color: COLOR.white }} />
                <span style={{ color: COLOR.white }}>
                  {tStr('hero.aboutButton', 'Zjistit více o oboru')}
                </span>
                <ArrowRight
                  style={{
                    width: 16,
                    height: 16,
                    color: COLOR.white,
                    transition: 'transform 0.3s ease',
                    transform: primaryHover ? 'translateX(4px)' : 'translateX(0)',
                  }}
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="/projects"
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.625rem',
                  padding: '1rem 1.875rem',
                  borderRadius: '8px',
                  background: isLight
                    ? secondaryHover
                      ? COLOR.navy
                      : COLOR.white
                    : secondaryHover
                    ? 'rgba(255,255,255,0.12)'
                    : 'rgba(255,255,255,0.05)',
                  color: isLight
                    ? secondaryHover
                      ? COLOR.white
                      : COLOR.navy
                    : COLOR.white,
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  border: isLight
                    ? `2px solid ${secondaryHover ? COLOR.navy : 'rgba(0,43,78,0.2)'}`
                    : `2px solid ${
                        secondaryHover
                          ? 'rgba(255,255,255,0.5)'
                          : 'rgba(255,255,255,0.22)'
                      }`,
                  boxShadow: isLight ? '0 6px 18px rgba(0, 43, 78, 0.08)' : 'none',
                  transform: secondaryHover ? 'translateY(-2px)' : 'translateY(0)',
                  transition:
                    'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                }}
              >
                <FolderOpen
                  style={{
                    width: 20,
                    height: 20,
                    color: isLight
                      ? secondaryHover
                        ? COLOR.white
                        : COLOR.navy
                      : COLOR.white,
                  }}
                />
                <span>{tStr('hero.projectsButton', 'Projekty studentů')}</span>
              </Link>
            </div>
          </div>

          {/* ============ RIGHT COLUMN — Feature Card ============ */}
          <div
            style={{
              flex: isDesktop ? '0 0 420px' : '0 0 auto',
              width: isDesktop ? '420px' : '100%',
              position: 'relative',
            }}
          >
            {/* Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                background: isLight ? COLOR.white : 'rgba(10, 21, 48, 0.88)',
                border: isLight
                  ? '1px solid rgba(0, 43, 78, 0.12)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isLight
                  ? '0 32px 64px -20px rgba(0, 43, 78, 0.25)'
                  : '0 32px 64px -20px rgba(0, 0, 0, 0.55)',
                backdropFilter: isLight ? 'none' : 'blur(8px)',
              }}
            >
              {/* Header band */}
              <div
                style={{
                  padding: '1.15rem 1.75rem',
                  background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                  borderBottom: `3px solid ${COLOR.red}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <GraduationCap
                    style={{
                      width: 32,
                      height: 32,
                      color: COLOR.orange,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      letterSpacing: '-0.015em',
                      color: 'rgba(255, 255, 255, 0.98)',
                      lineHeight: 1.15,
                    }}
                  >
                    {tStr('hero.cardLabel', 'Co tě čeká')}
                  </span>
                </div>
              </div>

              {/* Feature items */}
              <div>
                {features.map(({ Icon, title, desc }, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.4rem 1.75rem',
                      borderBottom:
                        i < features.length - 1
                          ? `1px solid ${dividerSoft}`
                          : 'none',
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '44px',
                        height: '44px',
                        borderRadius: '9px',
                        background: isLight
                          ? 'rgba(200, 30, 28, 0.1)'
                          : 'rgba(200, 30, 28, 0.18)',
                        color: isLight ? COLOR.red : COLOR.orange,
                      }}
                    >
                      <Icon style={{ width: 22, height: 22 }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          marginBottom: '0.4rem',
                          color: textStrong,
                          lineHeight: 1.3,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          color: textSubtle,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
