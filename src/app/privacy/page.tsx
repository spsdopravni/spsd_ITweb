'use client';

import React, { useEffect, useState } from 'react';
import { Database, Lock, Eye, FileText, Shield, Mail } from 'lucide-react';
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

export default function PrivacyPage() {
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

  const textStrong = COLOR.navy;
  const textMuted = 'rgba(0,43,78,0.72)';
  const textSubtle = 'rgba(0,43,78,0.55)';

  const sections = [
    {
      Icon: Database,
      title: tStr('privacy.sections.collect.title', 'Jaká data sbíráme'),
      items: [
        tStr('privacy.sections.collect.i1', 'Informace, které nám poskytneš dobrovolně (např. kontaktní formulář)'),
        tStr('privacy.sections.collect.i2', 'Automaticky sbíraná data o návštěvě webu (cookies, IP adresa)'),
        tStr('privacy.sections.collect.i3', 'Informace o zařízení a prohlížeči'),
        tStr('privacy.sections.collect.i4', 'Data o interakci s webem (čas na stránce, kliknutí)'),
      ],
    },
    {
      Icon: Lock,
      title: tStr('privacy.sections.protect.title', 'Jak chráníme tvá data'),
      items: [
        tStr('privacy.sections.protect.i1', 'Používáme šifrované připojení (HTTPS)'),
        tStr('privacy.sections.protect.i2', 'Data jsou uložena na zabezpečených serverech'),
        tStr('privacy.sections.protect.i3', 'Přístup k datům mají pouze oprávněné osoby'),
        tStr('privacy.sections.protect.i4', 'Pravidelně provádíme bezpečnostní audity'),
      ],
    },
    {
      Icon: Eye,
      title: tStr('privacy.sections.use.title', 'Jak data používáme'),
      items: [
        tStr('privacy.sections.use.i1', 'Ke zlepšení funkčnosti a obsahu webu'),
        tStr('privacy.sections.use.i2', 'K analýze návštěvnosti a chování uživatelů'),
        tStr('privacy.sections.use.i3', 'K zodpovězení dotazů a poskytnutí informací'),
        tStr('privacy.sections.use.i4', 'K zasílání novinek (pouze se souhlasem)'),
      ],
    },
    {
      Icon: FileText,
      title: tStr('privacy.sections.rights.title', 'Tvá práva'),
      items: [
        tStr('privacy.sections.rights.i1', 'Právo na přístup k tvým osobním údajům'),
        tStr('privacy.sections.rights.i2', 'Právo na opravu nebo výmaz údajů'),
        tStr('privacy.sections.rights.i3', 'Právo vznést námitku proti zpracování'),
        tStr('privacy.sections.rights.i4', 'Právo na přenositelnost údajů'),
      ],
    },
  ];

  const cookies = [
    {
      title: tStr('privacy.cookies.essential.title', 'Nezbytné cookies'),
      desc: tStr('privacy.cookies.essential.desc', 'Zajišťují základní funkce webu jako přihlášení a bezpečnost.'),
    },
    {
      title: tStr('privacy.cookies.analytics.title', 'Analytické cookies'),
      desc: tStr('privacy.cookies.analytics.desc', 'Pomáhají nám pochopit, jak návštěvníci používají web.'),
    },
    {
      title: tStr('privacy.cookies.prefs.title', 'Preferenční cookies'),
      desc: tStr('privacy.cookies.prefs.desc', 'Ukládají tvé preference jako jazyk nebo téma.'),
    },
  ];

  const gdprBases = [
    tStr('privacy.gdpr.base1', 'Tvůj souhlas (čl. 6 odst. 1 písm. a) GDPR)'),
    tStr('privacy.gdpr.base2', 'Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)'),
    tStr('privacy.gdpr.base3', 'Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)'),
    tStr('privacy.gdpr.base4', 'Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)'),
  ];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: isDesktop ? '3rem' : '1.5rem',
    paddingRight: isDesktop ? '3rem' : '1.5rem',
  };

  const lastUpdated = new Date().toLocaleDateString('cs-CZ');

  return (
    <div style={{ minHeight: '100vh', background: COLOR.paper }}>
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
            opacity: 0.2,
          }}
        />
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '8rem' : '6rem',
            paddingBottom: isDesktop ? '5rem' : '3rem',
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
                color: COLOR.red,
              }}
            >
              {tStr('privacy.eyebrow', 'Právní dokument')}
            </span>
          </div>

          <h1
            style={{
              fontSize: isDesktop
                ? 'clamp(2.75rem, 4.6vw, 4rem)'
                : 'clamp(2rem, 8vw, 2.75rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              marginTop: 0,
              marginBottom: '2rem',
              color: textStrong,
              maxWidth: '48rem',
            }}
          >
            {tStr('privacy.title', 'Ochrana ')}
            <span style={{ color: COLOR.red }}>
              {tStr('privacy.titleHighlight', 'soukromí')}
            </span>
          </h1>

          <p
            style={{
              fontSize: isDesktop ? '1.25rem' : '1.0625rem',
              lineHeight: 1.7,
              color: textMuted,
              maxWidth: '44rem',
              marginTop: 0,
              marginBottom: '1rem',
            }}
          >
            {tStr(
              'privacy.description',
              'Tvoje soukromí je pro nás prioritou. Níže najdeš informace o tom, jak zpracováváme a chráníme tvoje osobní údaje.'
            )}
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              color: textSubtle,
              margin: 0,
              fontWeight: 500,
            }}
          >
            {tStr('privacy.lastUpdated', 'Poslední aktualizace')}: {lastUpdated}
          </p>
        </div>
      </section>

      {/* ========== SECTIONS GRID ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '3rem' : '2rem',
            paddingBottom: isDesktop ? '5rem' : '3.5rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
              gap: '1.5rem',
            }}
          >
            {sections.map(({ Icon, title, items }, i) => (
              <div
                key={i}
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: COLOR.white,
                  border: '1px solid rgba(0, 43, 78, 0.12)',
                  boxShadow: '0 24px 52px -22px rgba(0, 43, 78, 0.18)',
                }}
              >
                <div
                  style={{
                    padding: '1.6rem 1.75rem',
                    background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                    borderBottom: `3px solid ${COLOR.red}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
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
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: 'rgba(255, 255, 255, 0.98)',
                        lineHeight: 1.2,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: '1.25rem 1.75rem 1.5rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  {items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: COLOR.red,
                          flexShrink: 0,
                          transform: 'translateY(-2px)',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.975rem',
                          lineHeight: 1.6,
                          color: textMuted,
                        }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COOKIES ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '3rem' : '2rem',
            paddingBottom: isDesktop ? '5rem' : '3.5rem',
          }}
        >
          <div style={{ marginBottom: '2.5rem', maxWidth: '44rem' }}>
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
                  color: COLOR.red,
                }}
              >
                {tStr('privacy.cookiesEyebrow', 'Cookies')}
              </span>
            </div>
            <h2
              style={{
                fontSize: isDesktop
                  ? 'clamp(2rem, 3.4vw, 2.75rem)'
                  : 'clamp(1.625rem, 6vw, 2.25rem)',
                lineHeight: 1.1,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginTop: 0,
                marginBottom: '1.25rem',
                color: textStrong,
              }}
            >
              {tStr('privacy.cookiesTitle', 'Cookies a sledovací technologie')}
            </h2>
            <p
              style={{
                fontSize: isDesktop ? '1.125rem' : '1rem',
                lineHeight: 1.7,
                color: textMuted,
                margin: 0,
              }}
            >
              {tStr(
                'privacy.cookiesDescription',
                'Web používá cookies a podobné technologie ke zlepšení tvého zážitku. Cookies jsou malé textové soubory, které se ukládají do tvého prohlížeče.'
              )}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
              gap: '1.25rem',
            }}
          >
            {cookies.map(({ title, desc }, i) => (
              <div
                key={i}
                style={{
                  padding: '1.75rem',
                  borderRadius: '12px',
                  background: COLOR.white,
                  border: '1px solid rgba(0, 43, 78, 0.12)',
                  borderLeft: `3px solid ${COLOR.red}`,
                  boxShadow: '0 16px 36px -18px rgba(0, 43, 78, 0.14)',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 800,
                    color: textStrong,
                    letterSpacing: '-0.01em',
                    marginTop: 0,
                    marginBottom: '0.65rem',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    lineHeight: 1.6,
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

      {/* ========== GDPR ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '3rem' : '2rem',
            paddingBottom: isDesktop ? '5rem' : '3.5rem',
          }}
        >
          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              background: COLOR.white,
              border: '1px solid rgba(0, 43, 78, 0.12)',
              boxShadow: '0 24px 52px -22px rgba(0, 43, 78, 0.18)',
            }}
          >
            <div
              style={{
                padding: '1.6rem 1.75rem',
                background: `linear-gradient(135deg, ${COLOR.navy} 0%, ${COLOR.navyLight} 100%)`,
                borderBottom: `3px solid ${COLOR.red}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <Shield
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
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: 'rgba(255, 255, 255, 0.98)',
                    lineHeight: 1.2,
                  }}
                >
                  {tStr('privacy.gdprTitle', 'GDPR a právní základ')}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.75rem' }}>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: textMuted,
                  marginTop: 0,
                  marginBottom: '1rem',
                }}
              >
                {tStr(
                  'privacy.gdprDescription',
                  'Zpracování osobních údajů provádíme v souladu s nařízením GDPR (General Data Protection Regulation) a dalšími platnými právními předpisy.'
                )}
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: textStrong,
                  marginTop: 0,
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                {tStr('privacy.gdprLegalBasis', 'Právní základ zpracování')}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {gdprBases.map((base, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.85rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        color: COLOR.red,
                        fontFeatureSettings: '"tnum"',
                        flexShrink: 0,
                        minWidth: '1.5rem',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        lineHeight: 1.55,
                        color: textMuted,
                      }}
                    >
                      {base}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
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
            opacity: 0.2,
          }}
        />
        <div
          style={{
            ...containerStyle,
            position: 'relative',
            paddingTop: isDesktop ? '2rem' : '1rem',
            paddingBottom: isDesktop ? '8rem' : '5rem',
            zIndex: 2,
          }}
        >
          <div
            style={{
              maxWidth: '42rem',
              padding: '2.5rem 2.25rem',
              borderRadius: '14px',
              background: COLOR.white,
              border: '1px solid rgba(0, 43, 78, 0.12)',
              borderLeft: `4px solid ${COLOR.red}`,
              boxShadow: '0 32px 64px -20px rgba(0, 43, 78, 0.18)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                marginBottom: '1rem',
              }}
            >
              <Mail
                style={{ width: 28, height: 28, color: COLOR.red, flexShrink: 0 }}
              />
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: textStrong,
                  letterSpacing: '-0.015em',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {tStr('privacy.contactTitle', 'Máš dotazy?')}
              </h3>
            </div>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: textMuted,
                marginTop: 0,
                marginBottom: '1.5rem',
              }}
            >
              {tStr(
                'privacy.contactDescription',
                'Pokud máš jakékoliv dotazy ohledně ochrany osobních údajů, napiš nám.'
              )}
            </p>
            <a
              href="mailto:studijnioddeleni@sps-dopravni.cz"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.875rem 1.5rem',
                borderRadius: '8px',
                background: COLOR.red,
                color: COLOR.white,
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                boxShadow: '0 12px 28px -10px rgba(200, 30, 28, 0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLOR.redLight;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 18px 38px -10px rgba(200, 30, 28, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = COLOR.red;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 28px -10px rgba(200, 30, 28, 0.4)';
              }}
            >
              <Mail style={{ width: 18, height: 18, color: COLOR.white }} />
              <span>studijnioddeleni@sps-dopravni.cz</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
