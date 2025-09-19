'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

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