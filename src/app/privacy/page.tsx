'use client';

import React from 'react';
import { Shield, Lock, Eye, Database, Mail, FileText } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';

export default function PrivacyPage() {
  const { theme, classicMode } = useTheme();

  const isDark = theme === 'modern' || (theme === 'classic' && classicMode === 'dark');

  const sections = [
    {
      icon: Database,
      title: 'Jaká data sbíráme',
      content: [
        'Informace, které nám poskytnete dobrovolně (např. kontaktní formulář)',
        'Automaticky sbíraná data o návštěvě webu (cookies, IP adresa)',
        'Informace o zařízení a prohlížeči',
        'Data o interakci s webem (čas na stránce, kliknutí)'
      ]
    },
    {
      icon: Lock,
      title: 'Jak chráníme vaše data',
      content: [
        'Používáme šifrované připojení (HTTPS)',
        'Data jsou uložena na zabezpečených serverech',
        'Přístup k datům mají pouze oprávněné osoby',
        'Pravidelně provádíme bezpečnostní audity'
      ]
    },
    {
      icon: Eye,
      title: 'Jak data používáme',
      content: [
        'Ke zlepšení funkčnosti a obsahu webu',
        'K analýze návštěvnosti a chování uživatelů',
        'K zodpovězení dotazů a poskytnutí informací',
        'K zasílání novinek (pouze se souhlasem)'
      ]
    },
    {
      icon: FileText,
      title: 'Vaše práva',
      content: [
        'Právo na přístup k vašim osobním údajům',
        'Právo na opravu nebo výmaz údajů',
        'Právo vznést námitku proti zpracování',
        'Právo na přenositelnost údajů'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'}`}>
      <div className="container mx-auto px-4 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Ochrana soukromí
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Vaše soukromí je pro nás prioritou. Níže naleznete informace o tom, jak zpracováváme a chráníme vaše osobní údaje.
          </p>
          <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}
          </p>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 ${
                isDark
                  ? 'bg-white/5 border border-white/10 hover:bg-white/10'
                  : 'bg-white/80 border border-gray-200 hover:shadow-xl'
              }`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className={`text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {section.title}
                </h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cookies Section */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg mb-16 ${
          isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/80 border border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Cookies a sledovací technologie
          </h2>
          <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              Náš web používá cookies a podobné technologie ke zlepšení vašeho zážitku. Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Nezbytné cookies
                </h3>
                <p className="text-sm">
                  Zajišťují základní funkce webu jako přihlášení a bezpečnost.
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Analytické cookies
                </h3>
                <p className="text-sm">
                  Pomáhají nám pochopit, jak návštěvníci používají web.
                </p>
              </div>
              <div className={`p-4 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Preferenční cookies
                </h3>
                <p className="text-sm">
                  Ukládají vaše preference jako jazyk nebo téma.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GDPR Section */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg mb-16 ${
          isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/80 border border-gray-200'
        }`}>
          <h2 className={`text-3xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            GDPR a právní základ
          </h2>
          <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              Zpracování osobních údajů provádíme v souladu s nařízením GDPR (General Data Protection Regulation) a dalšími platnými právními předpisy.
            </p>
            <p>
              Právním základem zpracování je:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Váš souhlas (čl. 6 odst. 1 písm. a) GDPR)</li>
              <li>• Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)</li>
              <li>• Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR)</li>
              <li>• Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg text-center ${
          isDark
            ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20'
            : 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200'
        }`}>
          <Mail className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Máte dotazy?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Pokud máte jakékoliv dotazy ohledně ochrany osobních údajů, neváhejte nás kontaktovat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@spsd.cz"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              info@spsd.cz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
