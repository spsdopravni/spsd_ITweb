'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('about.title')} <span className="text-gradient">Informační technologie</span>
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
              <h3 className="text-xl font-semibold text-white mb-3">Zaměření oboru</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Vývoj webových a mobilních aplikací</li>
                <li>• Programování v moderních jazycích</li>
                <li>• Databázové systémy a Big Data</li>
                <li>• Počítačové sítě a kybernetická bezpečnost</li>
                <li>• Grafický design a UX/UI</li>
                <li>• Internet věcí (IoT)</li>
              </ul>
            </div>

            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Uplatnění absolventů</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Programátor / Vývojář aplikací</li>
                <li>• Webový developer</li>
                <li>• Databázový specialista</li>
                <li>• IT technik / Správce sítí</li>
                <li>• Grafický designer</li>
                <li>• Kybernetický bezpečnostní analytik</li>
              </ul>
            </div>
          </div>

          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Proč si vybrat náš obor?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Moderní vybavení</h4>
                <p className="text-gray-300 text-sm">
                  Nejnovější hardware a software, profesionální vývojová prostředí
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Praxe v firmách</h4>
                <p className="text-gray-300 text-sm">
                  Spolupráce s předními IT firmami, stáže a projektová práce
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Zkušení lektoři</h4>
                <p className="text-gray-300 text-sm">
                  Učitelé s praxí v IT oboru a průběžným vzděláváním
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}