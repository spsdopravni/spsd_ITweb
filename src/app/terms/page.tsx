'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, Scale, Users, Zap, FileText } from 'lucide-react';
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

export default function TermsPage() {
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
      Icon: CheckCircle,
      title: tStr('terms.sections.use.title', 'Použití webu'),
      items: [
        tStr('terms.sections.use.i1', 'Web slouží výhradně pro informační a vzdělávací účely'),
        tStr('terms.sections.use.i2', 'Obsah je určen pro zájemce o studium na SPŠD Praha'),
        tStr('terms.sections.use.i3', 'Neposkytujeme žádné záruky ohledně přesnosti informací'),
        tStr('terms.sections.use.i4', 'Vyhrazujeme si právo změnit obsah webu bez předchozího upozornění'),
      ],
    },
    {
      Icon: AlertTriangle,
      title: tStr('terms.sections.liability.title', 'Omezení odpovědnosti'),
      items: [
        tStr('terms.sections.liability.i1', 'Neneseme odpovědnost za škody vzniklé používáním webu'),
        tStr('terms.sections.liability.i2', 'Neručíme za dostupnost a funkčnost webu 24/7'),
        tStr('terms.sections.liability.i3', 'Externí odkazy vedou na weby třetích stran'),
        tStr('terms.sections.liability.i4', 'Informace na webu nepředstavují právní poradenství'),
      ],
    },
    {
      Icon: Scale,
      title: tStr('terms.sections.ip.title', 'Duševní vlastnictví'),
      items: [
        tStr('terms.sections.ip.i1', 'Veškerý obsah webu je chráněn autorskými právy'),
        tStr('terms.sections.ip.i2', 'Texty, obrázky a grafika jsou majetkem SPŠD Praha'),
        tStr('terms.sections.ip.i3', 'Kopírování obsahu vyžaduje předchozí souhlas'),
        tStr('terms.sections.ip.i4', 'Logo a název školy jsou registrované ochranné známky'),
      ],
    },
    {
      Icon: Users,
      title: tStr('terms.sections.conduct.title', 'Chování uživatelů'),
      items: [
        tStr('terms.sections.conduct.i1', 'Uživatelé se zavazují používat web v souladu se zákonem'),
        tStr('terms.sections.conduct.i2', 'Je zakázáno nahrávat škodlivý obsah nebo malware'),
        tStr('terms.sections.conduct.i3', 'Nepokoušej se neoprávněně přistupovat k systémům'),
        tStr('terms.sections.conduct.i4', 'Respektuj soukromí ostatních uživatelů'),
      ],
    },
  ];

  const detailSections = [
    {
      num: '01',
      title: tStr('terms.detail.acceptance.title', 'Akceptace podmínek'),
      paragraphs: [
        tStr(
          'terms.detail.acceptance.p1',
          'Tyto podmínky použití upravují přístup a používání webových stránek Střední průmyslové školy dopravní, Plzeňská 298/217a, Praha 5 – Motol (dále jen „SPŠD" nebo „my").'
        ),
        tStr(
          'terms.detail.acceptance.p2',
          'Přístupem na web nebo jeho používáním souhlasíš s tím, že budeš vázán těmito podmínkami. Pokud nesouhlasíš s některou částí podmínek, nemáš oprávnění k přístupu na web.'
        ),
      ],
    },
    {
      num: '02',
      title: tStr('terms.detail.changes.title', 'Změny podmínek'),
      paragraphs: [
        tStr(
          'terms.detail.changes.p1',
          'Vyhrazujeme si právo kdykoliv upravit nebo nahradit tyto podmínky. Změny budou zveřejněny na této stránce s uvedením data poslední aktualizace.'
        ),
        tStr(
          'terms.detail.changes.p2',
          'Je tvojí povinností pravidelně kontrolovat tyto podmínky. Pokračováním v používání webu po zveřejnění změn vyjadřuješ souhlas s novými podmínkami.'
        ),
      ],
    },
    {
      num: '03',
      title: tStr('terms.detail.license.title', 'Licence k používání'),
      paragraphs: [
        tStr(
          'terms.detail.license.p1',
          'Pokud není uvedeno jinak, SPŠD a/nebo její poskytovatelé licence vlastní práva duševního vlastnictví k veškerému materiálu na webu.'
        ),
        tStr(
          'terms.detail.license.p2',
          'Smíš prohlížet, stahovat pro účely ukládání do mezipaměti a tisknout stránky z webu pro vlastní osobní použití. Nesmíš publikovat, prodávat, reprodukovat ani jinak distribuovat obsah pro komerční účely.'
        ),
      ],
    },
    {
      num: '04',
      title: tStr('terms.detail.termination.title', 'Ukončení použití'),
      paragraphs: [
        tStr(
          'terms.detail.termination.p1',
          'Můžeme okamžitě ukončit nebo pozastavit tvůj přístup k našemu webu bez předchozího upozornění z jakéhokoliv důvodu, včetně porušení těchto podmínek.'
        ),
        tStr(
          'terms.detail.termination.p2',
          'Všechna ustanovení podmínek, která by měla ze své podstaty přetrvat ukončení, přetrvají ukončení — včetně vlastnických ustanovení, zřeknutí se záruk a omezení odpovědnosti.'
        ),
      ],
    },
  ];

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: '1280px',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: isDesktop ? '3rem' : '1.5rem',
    paddingRight: isDesktop ? '3rem' : '1.5rem',
  };

  const validFrom = new Date().toLocaleDateString('cs-CZ');

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
              {tStr('terms.eyebrow', 'Právní dokument')}
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
            {tStr('terms.title', 'Podmínky ')}
            <span style={{ color: COLOR.red }}>
              {tStr('terms.titleHighlight', 'použití')}
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
              'terms.description',
              'Používáním našeho webu souhlasíš s těmito podmínkami. Přečti si je prosím pozorně před pokračováním.'
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
            {tStr('terms.validFrom', 'Platné od')}: {validFrom}
          </p>
        </div>
      </section>

      {/* ========== NOTICE BANNER ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1.5rem',
            paddingBottom: isDesktop ? '3rem' : '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1.75rem 2rem',
              borderRadius: '14px',
              background: COLOR.white,
              border: '1px solid rgba(0, 43, 78, 0.12)',
              borderLeft: `4px solid ${COLOR.red}`,
              boxShadow: '0 24px 52px -22px rgba(0, 43, 78, 0.14)',
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
                background: 'rgba(200, 30, 28, 0.1)',
                color: COLOR.red,
              }}
            >
              <Zap style={{ width: 22, height: 22 }} />
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: textStrong,
                  letterSpacing: '-0.01em',
                  marginTop: 0,
                  marginBottom: '0.5rem',
                }}
              >
                {tStr('terms.noticeTitle', 'Důležité upozornění')}
              </h3>
              <p
                style={{
                  fontSize: '0.975rem',
                  lineHeight: 1.65,
                  color: textMuted,
                  margin: 0,
                }}
              >
                {tStr(
                  'terms.noticeDescription',
                  'Používáním tohoto webu potvrzuješ, že jsi tyto podmínky přečetl/a a souhlasíš s nimi. Pokud nesouhlasíš s některou částí těchto podmínek, prosíme, nepoužívej náš web.'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTIONS GRID ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1rem',
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

      {/* ========== DETAIL SECTIONS ========== */}
      <section style={{ position: 'relative' }}>
        <div
          style={{
            ...containerStyle,
            paddingTop: isDesktop ? '2rem' : '1rem',
            paddingBottom: isDesktop ? '5rem' : '3.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {detailSections.map(({ num, title, paragraphs }, i) => (
              <div
                key={i}
                style={{
                  padding: '2.25rem 2.25rem',
                  borderRadius: '14px',
                  background: COLOR.white,
                  border: '1px solid rgba(0, 43, 78, 0.12)',
                  boxShadow: '0 16px 36px -18px rgba(0, 43, 78, 0.14)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: COLOR.red,
                      letterSpacing: '-0.03em',
                      fontFeatureSettings: '"tnum"',
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </span>
                  <h2
                    style={{
                      fontSize: isDesktop ? '1.625rem' : '1.375rem',
                      fontWeight: 800,
                      color: textStrong,
                      letterSpacing: '-0.015em',
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </h2>
                </div>
                <div
                  aria-hidden
                  style={{
                    height: '2px',
                    background: COLOR.red,
                    width: '100%',
                    marginBottom: '1.25rem',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {paragraphs.map((p, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        color: textMuted,
                        margin: 0,
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
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
              <FileText
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
                {tStr('terms.contactTitle', 'Máš právní dotazy?')}
              </h3>
            </div>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: textMuted,
                marginTop: 0,
                marginBottom: '1.25rem',
              }}
            >
              {tStr(
                'terms.contactDescription',
                'Pro otázky týkající se těchto podmínek použití nás kontaktuj.'
              )}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: textStrong,
                  margin: 0,
                }}
              >
                {tStr('terms.contactSchool', 'Střední průmyslová škola dopravní')}
              </p>
              <p style={{ fontSize: '0.95rem', color: textMuted, margin: 0 }}>
                {tStr('terms.contactAddress', 'Plzeňská 298/217a, 150 00 Praha 5 – Motol')}
              </p>
              <p style={{ fontSize: '0.95rem', color: textMuted, margin: 0 }}>
                {tStr('terms.contactEmail', 'studijnioddeleni@sps-dopravni.cz')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
