'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { BookOpen, Users, Award, Building, Code, Database, Globe } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const { theme } = usePreferences();

  if (theme === 'modern') {
    return (
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">{t('about.whatIs')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('about.description1')}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {t('about.description2')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3">{t('about.fieldFocus.title')}</h3>
                <ul className="space-y-2 text-gray-300">
                  {(Array.isArray(t('about.fieldFocus.items')) ? (t('about.fieldFocus.items') as unknown as string[]) : []).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3">{t('about.graduateEmployment.title')}</h3>
                <ul className="space-y-2 text-gray-300">
                  {(Array.isArray(t('about.graduateEmployment.items')) ? (t('about.graduateEmployment.items') as unknown as string[]) : []).map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold text-white mb-4">{t('about.whyChooseUs.title')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">{t('about.whyChooseUs.modernEquipment.title')}</h4>
                  <p className="text-gray-300 text-sm">
                    {t('about.whyChooseUs.modernEquipment.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">{t('about.whyChooseUs.companiesPractice.title')}</h4>
                  <p className="text-gray-300 text-sm">
                    {t('about.whyChooseUs.companiesPractice.description')}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">{t('about.whyChooseUs.experiencedTeachers.title')}</h4>
                  <p className="text-gray-300 text-sm">
                    {t('about.whyChooseUs.experiencedTeachers.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Classic theme layout
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero section */}
        <div className="hero-section mb-16">
          <div className="text-center">
            <div className="accent-bar w-24 mx-auto mb-6"></div>
            <h1 className="text-5xl font-bold mb-4">
              {t('about.title', 'O oboru Informační technologie')}
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t('about.subtitle', 'Střední průmyslová škola dopravní - moderní vzdělání v oblasti IT')}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="section">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* What is IT field */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[var(--spsd-navy)] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{t('about.whatIs', 'Co je obor IT?')}</h2>
                </div>
              </div>
              <div className="space-y-4">
                <p>
                  {t('about.description1', 'Obor Informační technologie je čtyřletý maturitní obor, který připravuje studenty na práci v dynamicky se rozvíjející oblasti informačních technologií. Zaměřujeme se na praktické dovednosti kombinované s teoretickými základy.')}
                </p>
                <p>
                  {t('about.description2', 'Naši studenti získávají znalosti v programování, správě sítí, databázových systémech a moderních technologiích. Důraz klademe na týmovou práci a reálné projekty.')}
                </p>
              </div>
            </div>

            {/* Key areas */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-8 h-8 text-[var(--spsd-red)]" />
                  <h3 className="text-xl font-semibold">{t('about.fieldFocus.title', 'Zaměření oboru')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Programování a vývoj aplikací</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Správa sítí a serverů</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Databázové systémy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Webové technologie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Kybernetická bezpečnost</span>
                  </li>
                </ul>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <Building className="w-8 h-8 text-[var(--spsd-red)]" />
                  <h3 className="text-xl font-semibold">{t('about.graduateEmployment.title', 'Uplatnění absolventů')}</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Software developer</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Správce IT systémů</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Webový vývojář</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Databázový specialista</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-[var(--spsd-orange)] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>IT konzultant</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Why choose us */}
            <div className="card">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-12 h-12 rounded-lg bg-[var(--spsd-navy)] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{t('about.whyChooseUs.title', 'Proč si vybrat náš obor?')}</h2>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] rounded-full flex items-center justify-center">
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{t('about.whyChooseUs.modernEquipment.title', 'Moderní vybavení')}</h4>
                  <p className="text-sm">
                    {t('about.whyChooseUs.modernEquipment.description', 'Nejnovější hardware a software pro praktickou výuku')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{t('about.whyChooseUs.companiesPractice.title', 'Praxe ve firmách')}</h4>
                  <p className="text-sm">
                    {t('about.whyChooseUs.companiesPractice.description', 'Spolupráce s předními IT společnostmi v regionu')}
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] rounded-full flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{t('about.whyChooseUs.experiencedTeachers.title', 'Zkušení pedagogové')}</h4>
                  <p className="text-sm">
                    {t('about.whyChooseUs.experiencedTeachers.description', 'Učitelé s praxí z IT prostředí')}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-center mb-8">Naše výsledky</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">150+</div>
                  <div className="text-sm opacity-90">Absolventů ročně</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm opacity-90">Úspěšnost u maturity</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">80%</div>
                  <div className="text-sm opacity-90">Pokračuje na VŠ</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">75%</div>
                  <div className="text-sm opacity-90">Práce v oboru</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}