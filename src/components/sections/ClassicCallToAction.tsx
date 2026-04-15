'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/lib/theme/useTheme';
import { ArrowRight, Phone, Mail, MapPin, Building2 } from 'lucide-react';

const COLOR = {
  navy: '#002b4e',
  navyLight: '#133f64',
  red: '#c81e1c',
  redLight: '#dc3530',
  orange: '#e95d41',
  white: '#ffffff',
  paper: '#fafaf7',
};

export const ClassicCallToAction: React.FC = () => {
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

  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const textStrong = isLight ? COLOR.navy : COLOR.white;
  const textMuted = isLight ? 'rgba(0,43,78,0.72)' : 'rgba(255,255,255,0.72)';
  const textSubtle = isLight ? 'rgba(0,43,78,0.55)' : 'rgba(255,255,255,0.6)';
  const dividerSoft = isLight ? 'rgba(0,43,78,0.08)' : 'rgba(255,255,255,0.08)';

  const contacts = [
    {
      Icon: MapPin,
      label: tStr('cta.addressLabel', 'Adresa'),
      value: tStr('contact.realAddress', 'Plzeňská 298/217a, 150 00 Praha 5 – Motol'),
      href: 'https://maps.google.com/?q=Plzeňská+298/217a+Praha+5',
    },
    {
      Icon: Phone,
      label: tStr('cta.phoneLabel', 'Telefon'),
      value: tStr('contact.realPhone', '+420 725 044 828'),
      href: 'tel:+420725044828',
    },
    {
      Icon: Mail,
      label: tStr('cta.emailLabel', 'E-mail'),
      value: tStr('contact.realEmail', 'studijnioddeleni@sps-dopravni.cz'),
      href: 'mailto:studijnioddeleni@sps-dopravni.cz',
    },
  ];

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
      {/* Red corner wedge — bottom right */}
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
          {/* ============ LEFT COLUMN — CTA copy ============ */}
          <div
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
                {tStr('cta.eyebrow', 'Přihlášky a kontakt')}
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: isDesktop
                  ? 'clamp(2.5rem, 4.8vw, 4.5rem)'
                  : 'clamp(2rem, 8vw, 3rem)',
                lineHeight: 1.02,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                marginTop: 0,
                marginBottom: '2rem',
                color: textStrong,
              }}
            >
              <span style={{ display: 'block' }}>
                {tStr('cta.title', 'Začni svoji')}
              </span>
              <span
                style={{
                  display: 'block',
                  color: COLOR.red,
                  marginTop: '0.1em',
                }}
              >
                {tStr('cta.titleHighlight', 'IT cestu už dnes.')}
              </span>
            </h2>

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
                'cta.description',
                'Zajímá tě obor IT? Přijď na den otevřených dveří nebo nás rovnou kontaktuj. Rádi ti vysvětlíme vše kolem studia, přijímacího řízení i možností uplatnění.'
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
                <span style={{ color: COLOR.white }}>
                  {tStr('cta.applyButton', 'Více o oboru')}
                </span>
                <ArrowRight
                  style={{
                    width: 16,
                    height: 16,
                    color: COLOR.white,
                    transition: 'transform 0.3s ease',
                    transform: primaryHover
                      ? 'translateX(4px)'
                      : 'translateX(0)',
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
                  boxShadow: isLight
                    ? '0 6px 18px rgba(0, 43, 78, 0.08)'
                    : 'none',
                  transform: secondaryHover ? 'translateY(-2px)' : 'translateY(0)',
                  transition:
                    'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, color 0.3s ease',
                }}
              >
                <span>{tStr('cta.contactButton', 'Studentské projekty')}</span>
              </Link>
            </div>
          </div>

          {/* ============ RIGHT COLUMN — Contact card ============ */}
          <div
            style={{
              flex: isDesktop ? '0 0 420px' : '0 0 auto',
              width: isDesktop ? '420px' : '100%',
              position: 'relative',
            }}
          >
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
                  <Building2
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
                    {tStr('cta.cardLabel', 'Kontakt na školu')}
                  </span>
                </div>
              </div>

              {/* Contact list */}
              <div>
                {contacts.map(({ Icon, label, value, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={i === 0 ? '_blank' : undefined}
                    rel={i === 0 ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.25rem 1.75rem',
                      borderBottom:
                        i < contacts.length - 1
                          ? `1px solid ${dividerSoft}`
                          : 'none',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'background 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isLight
                        ? 'rgba(0,43,78,0.025)'
                        : 'rgba(255,255,255,0.03)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
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
                      }}
                    >
                      <Icon style={{ width: 18, height: 18 }} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1, paddingTop: '0.15rem' }}>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.14em',
                          color: textSubtle,
                          marginBottom: '0.3rem',
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: '0.925rem',
                          fontWeight: 500,
                          color: textStrong,
                          lineHeight: 1.4,
                          wordBreak: 'break-word',
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
