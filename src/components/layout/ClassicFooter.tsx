'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { Facebook, Instagram, Youtube, Github, LucideIcon } from 'lucide-react';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  redLight: '#dc3530',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

type NavColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type Social = { Icon: LucideIcon; href: string; label: string };

export const ClassicFooter: React.FC = () => {
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

  const columns: NavColumn[] = [
    {
      title: tStr('footer.about', 'O škole'),
      links: [
        { label: tStr('footer.history', 'Historie'), href: '/about' },
        { label: tStr('footer.teachers', 'Pedagogové'), href: '/about' },
        { label: tStr('footer.facilities', 'Vybavení'), href: '/about' },
      ],
    },
    {
      title: tStr('footer.education', 'Studium'),
      links: [
        { label: tStr('footer.curriculum', 'Učební plán'), href: '/curriculum' },
        { label: tStr('footer.projects', 'Projekty'), href: '/projects' },
        {
          label: tStr('footer.admission', 'Přijímací řízení'),
          href: '/about',
        },
      ],
    },
    {
      title: tStr('footer.legal', 'Dokumenty'),
      links: [
        { label: tStr('footer.privacy', 'Ochrana údajů'), href: '/privacy' },
        { label: tStr('footer.terms', 'Podmínky použití'), href: '/terms' },
      ],
    },
  ];

  const socials: Social[] = [
    {
      Icon: Facebook,
      href: 'https://www.facebook.com/spsdopravni',
      label: 'Facebook',
    },
    {
      Icon: Instagram,
      href: 'https://www.instagram.com/spsdopravni/',
      label: 'Instagram',
    },
    {
      Icon: Youtube,
      href: 'https://www.youtube.com/@stredniprumyslovaskoladopr4784',
      label: 'YouTube',
    },
    {
      Icon: Github,
      href: 'https://github.com/spsdopravni',
      label: 'GitHub',
    },
  ];

  // Theme-derived colors
  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.68)' : 'rgba(255,255,255,0.7)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.5)' : 'rgba(255,255,255,0.5)';
  const divider = isLight ? 'rgba(0,43,78,0.1)' : 'rgba(255,255,255,0.1)';

  // Social hover state (index of hovered icon)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  return (
    <footer
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: isLight
          ? COLOR.paper
          : `linear-gradient(135deg, ${COLOR.navy} 0%, #0f1a3a 50%, ${COLOR.navyLight} 100%)`,
        borderTop: isLight
          ? '1px solid rgba(0,43,78,0.1)'
          : '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: isDesktop ? '3rem' : '1.5rem',
          paddingRight: isDesktop ? '3rem' : '1.5rem',
          paddingTop: isDesktop ? '4.5rem' : '3.5rem',
          paddingBottom: isDesktop ? '2.5rem' : '2rem',
        }}
      >
        {/* Top area — brand + nav columns */}
        <div
          style={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            gap: isDesktop ? '5rem' : '3rem',
            alignItems: 'flex-start',
            marginBottom: isDesktop ? '4rem' : '3rem',
          }}
        >
          {/* Brand block */}
          <div
            style={{
              flex: isDesktop ? '0 0 auto' : '0 0 auto',
              maxWidth: isDesktop ? '340px' : '100%',
              width: isDesktop ? 'auto' : '100%',
            }}
          >
            {/* Eyebrow line */}
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
                  width: '48px',
                  height: '2px',
                  background: COLOR.red,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: isLight ? COLOR.red : COLOR.orange,
                }}
              >
                {tStr('footer.eyebrow', 'Obor IT')}
              </span>
            </div>

            {/* School name */}
            <div
              style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.015em',
                lineHeight: 1.2,
                color: textStrong,
                marginBottom: '0.35rem',
              }}
            >
              {tStr('footer.schoolName', 'SPŠ dopravní')}
            </div>
            <div
              style={{
                fontSize: '0.95rem',
                fontWeight: 500,
                color: textMuted,
                marginBottom: '1.25rem',
              }}
            >
              {tStr('footer.schoolLocation', 'Praha 5 – Motol')}
            </div>

            {/* Social links */}
            <div
              style={{
                display: 'flex',
                gap: '0.625rem',
              }}
            >
              {socials.map(({ Icon, href, label }, i) => {
                const isHover = hoveredSocial === i;
                return (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '9px',
                      background: isHover
                        ? COLOR.red
                        : isLight
                        ? 'rgba(0,43,78,0.05)'
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${
                        isHover
                          ? COLOR.red
                          : isLight
                          ? 'rgba(0,43,78,0.1)'
                          : 'rgba(255,255,255,0.12)'
                      }`,
                      color: isHover
                        ? COLOR.white
                        : isLight
                        ? 'rgba(0,43,78,0.7)'
                        : 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      transition:
                        'transform 0.25s ease, background 0.25s ease, border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
                      transform: isHover
                        ? 'translateY(-2px)'
                        : 'translateY(0)',
                      boxShadow: isHover
                        ? '0 10px 24px -10px rgba(200, 30, 28, 0.55)'
                        : 'none',
                    }}
                  >
                    <Icon style={{ width: 17, height: 17 }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Nav columns */}
          <div
            style={{
              flex: '1 1 0%',
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: isDesktop ? '3rem' : '2.25rem',
              width: '100%',
              minWidth: 0,
              justifyContent: isDesktop ? 'flex-end' : 'flex-start',
            }}
          >
            {columns.map((col, i) => (
              <div
                key={i}
                style={{
                  flex: isDesktop ? '0 0 auto' : '0 0 auto',
                  minWidth: isDesktop ? '160px' : 'auto',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: isLight ? COLOR.red : COLOR.orange,
                    marginBottom: '1.1rem',
                    paddingBottom: '0.7rem',
                    borderBottom: `1px solid ${divider}`,
                  }}
                >
                  {col.title}
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem',
                  }}
                >
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <Link
                        href={l.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.55rem',
                          fontSize: '0.92rem',
                          fontWeight: 500,
                          color: textMuted,
                          textDecoration: 'none',
                          transition: 'color 0.2s ease, transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = isLight
                            ? COLOR.navy
                            : COLOR.white;
                          e.currentTarget.style.transform =
                            'translateX(3px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textMuted;
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            display: 'inline-block',
                            width: '8px',
                            height: '1px',
                            background: COLOR.red,
                            flexShrink: 0,
                          }}
                        />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          style={{
            height: '1px',
            background: divider,
            marginBottom: '1.75rem',
          }}
        />

        {/* Bottom row — copyright + address */}
        <div
          style={{
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            justifyContent: 'space-between',
            alignItems: isDesktop ? 'center' : 'flex-start',
            gap: '1rem',
          }}
        >
          <div
            style={{
              fontSize: '0.825rem',
              color: textSubtle,
              fontWeight: 500,
            }}
          >
            © 2026 SPŠ dopravní, Praha – Motol.{' '}
            {tStr('footer.rights', 'Všechna práva vyhrazena.')}
          </div>
          <div
            style={{
              fontSize: '0.825rem',
              color: textSubtle,
              fontWeight: 500,
            }}
          >
            Plzeňská 298/217a, 150 00 Praha 5
          </div>
        </div>
      </div>
    </footer>
  );
};
