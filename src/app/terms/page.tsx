'use client';

import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Users, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme/useTheme';

export default function TermsPage() {
  const { theme, classicMode } = useTheme();

  const isDark = theme === 'modern' || (theme === 'classic' && classicMode === 'dark');

  const sections = [
    {
      icon: CheckCircle,
      title: 'Použití webu',
      content: [
        'Web slouží výhradně pro informační a vzdělávací účely',
        'Obsah je určen pro zájemce o studium na SPŠD Praha',
        'Neposkytujeme žádné záruky ohledně přesnosti informací',
        'Vyhrazujeme si právo změnit obsah webu bez předchozího upozornění'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Omezení odpovědnosti',
      content: [
        'Neneseme odpovědnost za škody vzniklé používáním webu',
        'Neručíme za dostupnost a funkčnost webu 24/7',
        'Externí odkazy vedou na weby třetích stran, za které neneseme odpovědnost',
        'Informace na webu nepředstavují právní poradenství'
      ]
    },
    {
      icon: Scale,
      title: 'Duševní vlastnictví',
      content: [
        'Veškerý obsah webu je chráněn autorskými právy',
        'Texty, obrázky a grafika jsou majetkem SPŠD Praha',
        'Jakékoliv kopírování obsahu vyžaduje předchozí souhlas',
        'Logo a název školy jsou registrované ochranné známky'
      ]
    },
    {
      icon: Users,
      title: 'Chování uživatelů',
      content: [
        'Uživatelé se zavazují používat web v souladu se zákonem',
        'Je zakázáno nahrávat škodlivý obsah nebo malware',
        'Nepokoušejte se neoprávněně přistupovat k systémům',
        'Respektujte soukromí ostatních uživatelů'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'}`}>
      <div className="container mx-auto px-4 py-24 md:py-32">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Podmínky použití
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Používáním našeho webu souhlasíte s těmito podmínkami. Přečtěte si je prosím pozorně před pokračováním.
          </p>
          <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Platné od: {new Date().toLocaleDateString('cs-CZ')}
          </p>
        </div>

        {/* Notice Banner */}
        <div className={`p-6 rounded-2xl mb-16 backdrop-blur-lg border-l-4 ${
          isDark
            ? 'bg-blue-900/20 border-blue-500'
            : 'bg-blue-50 border-blue-500'
        }`}>
          <div className="flex items-start gap-4">
            <Zap className={`w-6 h-6 flex-shrink-0 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <div>
              <h3 className={`font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Důležité upozornění
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                Používáním tohoto webu potvrzujete, že jste si tyto podmínky přečetli a souhlasíte s nimi. Pokud nesouhlasíte s některou částí těchto podmínek, prosíme, nepoužívejte náš web.
              </p>
            </div>
          </div>
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
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
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                    <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 mb-16">
          {/* Section 1 */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/80 border border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              1. Akceptace podmínek
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                Tyto podmínky použití upravují přístup a používání webových stránek Střední průmyslové školy dopravní, Praha 1, Masná 18 (dále jen &quot;SPŠD&quot; nebo &quot;my&quot;).
              </p>
              <p>
                Přístupem na web nebo jeho používáním souhlasíte s tím, že budete vázáni těmito podmínkami. Pokud nesouhlasíte s některou částí podmínek, nemáte oprávnění k přístupu na web.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/80 border border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              2. Změny podmínek
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                Vyhrazujeme si právo kdykoliv upravit nebo nahradit tyto podmínky. Změny budou zveřejněny na této stránce s uvedením data poslední aktualizace.
              </p>
              <p>
                Je vaší povinností pravidelně kontrolovat tyto podmínky. Pokračováním v používání webu po zveřejnění změn vyjadřujete souhlas s novými podmínkami.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/80 border border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              3. Licence k používání
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                Pokud není uvedeno jinak, SPŠD a/nebo její poskytovatelé licence vlastní práva duševního vlastnictví k veškerému materiálu na webu.
              </p>
              <p>
                Smíte prohlížet, stahovat pro účely ukládání do mezipaměti a tisknout stránky z webu pro vlastní osobní použití, s dodržením následujících omezení:
              </p>
              <ul className="space-y-2 ml-6">
                <li>• Nesmíte publikovat materiál z webu</li>
                <li>• Nesmíte prodávat, pronajímat nebo sublicencovat materiál z webu</li>
                <li>• Nesmíte reprodukovat, kopírovat nebo znovu distribuovat materiál z webu pro komerční účely</li>
                <li>• Nesmíte upravovat nebo jinak měnit jakýkoliv materiál na webu</li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className={`p-8 rounded-2xl backdrop-blur-lg ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white/80 border border-gray-200'
          }`}>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              4. Ukončení použití
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                Můžeme okamžitě ukončit nebo pozastavit váš přístup k našemu webu bez předchozího upozornění nebo odpovědnosti z jakéhokoli důvodu, včetně porušení těchto podmínek.
              </p>
              <p>
                Všechna ustanovení podmínek, která by měla ze své podstaty přetrvat ukončení, přetrvají ukončení, včetně vlastnických ustanovení, zřeknutí se záruk a omezení odpovědnosti.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`p-8 rounded-2xl backdrop-blur-lg text-center ${
          isDark
            ? 'bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20'
            : 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200'
        }`}>
          <Scale className={`w-12 h-12 mx-auto mb-4 ${
            isDark ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
          <h2 className={`text-2xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Máte právní dotazy?
          </h2>
          <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Pro otázky týkající se těchto podmínek použití nás kontaktujte.
          </p>
          <div className="space-y-2">
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Střední průmyslová škola dopravní
            </p>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Masná 18, 110 00 Praha 1
            </p>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Email: info@spsd.cz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
