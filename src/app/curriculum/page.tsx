'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { BookOpen, Clock, GraduationCap, Laptop } from 'lucide-react';

interface SubjectRow {
  key: string;
  year1: string;
  year2: string;
  year3: string;
  year4: string;
  total: string;
  isIT?: boolean;
}

export default function Curriculum() {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();

  // Data z učebního plánu
  const subjectData: SubjectRow[] = [
    { key: 'czech', year1: '4', year2: '3', year3: '3', year4: '4', total: '14' },
    { key: 'english', year1: '3/3', year2: '3/3', year3: '3/3', year4: '3/3', total: '12' },
    { key: 'german', year1: '2/2', year2: '2/2', year3: '2/2', year4: '2/2', total: '8' },
    { key: 'civics', year1: '1', year2: '1', year3: '1', year4: '1', total: '4' },
    { key: 'history', year1: '1', year2: '-', year3: '-', year4: '-', total: '1' },
    { key: 'law', year1: '-', year2: '-', year3: '1', year4: '-', total: '1' },
    { key: 'physics', year1: '2', year2: '2', year3: '-', year4: '-', total: '4' },
    { key: 'chemistry', year1: '1', year2: '-', year3: '-', year4: '-', total: '1' },
    { key: 'ecology', year1: '-', year2: '1', year3: '-', year4: '-', total: '1' },
    { key: 'math', year1: '4', year2: '3', year3: '3', year4: '4', total: '14' },
    { key: 'pe', year1: '2/2', year2: '2/2', year3: '2/2', year4: '2/2', total: '8' },
    { key: 'it', year1: '2/2', year2: '2/2', year3: '-', year4: '-', total: '4', isIT: true },
    { key: 'economics', year1: '-', year2: '-', year3: '3/1', year4: '-', total: '3', isIT: true },
    { key: 'hardware', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true },
    { key: 'os', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true },
    { key: 'software', year1: '2/2', year2: '2/2', year3: '-', year4: '-', total: '4', isIT: true },
    { key: 'networks', year1: '-', year2: '2', year3: '3/1', year4: '3', total: '8', isIT: true },
    { key: 'programming', year1: '1/1', year2: '2/2', year3: '3/3', year4: '2/2', total: '8', isIT: true },
    { key: 'digital', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true },
    { key: 'electronics', year1: '2', year2: '-', year3: '-', year4: '-', total: '2', isIT: true },
    { key: 'cad', year1: '-', year2: '3/3', year3: '3/3', year4: '-', total: '6', isIT: true },
    { key: 'databases', year1: '-', year2: '2/2', year3: '2/2', year4: '2/2', total: '6', isIT: true },
    { key: 'webdesign', year1: '-', year2: '-', year3: '-', year4: '2/2', total: '2', isIT: true },
    { key: 'graphics', year1: '-', year2: '2/2', year3: '2/2', year4: '3/3', total: '7', isIT: true },
    { key: 'virtualization', year1: '-', year2: '-', year3: '-', year4: '2/1', total: '2', isIT: true },
    { key: 'seminar', year1: '-', year2: '-', year3: '-', year4: '1', total: '1', isIT: true },
    { key: 'practice', year1: '2/2', year2: '3/3', year3: '2/2', year4: '2/2', total: '9', isIT: true }
  ];

  if (theme === 'modern') {
    return (
      <div className="min-h-screen pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero sekce */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full glass border border-blue-500/30 mb-6">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/80 font-medium">
                {t('curriculum.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('curriculum.title')}
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('curriculum.subtitle')}
            </p>
          </div>

          {/* Info box */}
          <div className="glass rounded-2xl p-6 mb-8 border border-white/10">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-white/60">{t('curriculum.info.rvpCode')}:</span>
                <p className="text-white font-semibold">{t('curriculum.info.rvpValue')}</p>
              </div>
              <div>
                <span className="text-sm text-white/60">{t('curriculum.info.svpName')}:</span>
                <p className="text-white font-semibold">{t('curriculum.info.svpValue')}</p>
              </div>
              <div>
                <span className="text-sm text-white/60">{t('curriculum.info.duration')}:</span>
                <p className="text-white font-semibold">{t('curriculum.info.durationValue')}</p>
              </div>
              <div>
                <span className="text-sm text-white/60">{t('curriculum.info.validity')}:</span>
                <p className="text-white font-semibold">{t('curriculum.info.validityValue')}</p>
              </div>
            </div>
          </div>

          {/* Tabulka - desktop */}
          <div className="hidden md:block glass rounded-2xl p-6 border border-white/10 mb-8 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-6">{t('curriculum.table.title')}</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.subject')}</th>
                  <th className="text-center py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.year1')}</th>
                  <th className="text-center py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.year2')}</th>
                  <th className="text-center py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.year3')}</th>
                  <th className="text-center py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.year4')}</th>
                  <th className="text-center py-3 px-2 text-white/80 font-semibold">{t('curriculum.table.total')}</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((subject, index) => (
                  <tr
                    key={subject.key}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                      subject.isIT ? 'bg-blue-500/10' : ''
                    }`}
                  >
                    <td className="py-3 px-2 text-white">
                      {t(`curriculum.subjects.${subject.key}`)}
                      {subject.isIT && <span className="ml-2 text-xs text-blue-400">●</span>}
                    </td>
                    <td className="text-center py-3 px-2 text-white/70">{subject.year1}</td>
                    <td className="text-center py-3 px-2 text-white/70">{subject.year2}</td>
                    <td className="text-center py-3 px-2 text-white/70">{subject.year3}</td>
                    <td className="text-center py-3 px-2 text-white/70">{subject.year4}</td>
                    <td className="text-center py-3 px-2 text-white font-semibold">{subject.total}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-white/20 font-bold">
                  <td className="py-3 px-2 text-white">{t('curriculum.subjects.total')}</td>
                  <td className="text-center py-3 px-2 text-white">35</td>
                  <td className="text-center py-3 px-2 text-white">35</td>
                  <td className="text-center py-3 px-2 text-white">33</td>
                  <td className="text-center py-3 px-2 text-white">33</td>
                  <td className="text-center py-3 px-2 text-white text-lg">136</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobilní verze - karty */}
          <div className="md:hidden space-y-4 mb-8">
            {subjectData.map((subject) => (
              <div
                key={subject.key}
                className={`glass rounded-xl p-4 border border-white/10 ${
                  subject.isIT ? 'border-blue-500/30' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">
                    {t(`curriculum.subjects.${subject.key}`)}
                  </h3>
                  {subject.isIT && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                      IT
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-sm">
                  <div>
                    <div className="text-white/60 text-xs mb-1">1.</div>
                    <div className="text-white">{subject.year1}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">2.</div>
                    <div className="text-white">{subject.year2}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">3.</div>
                    <div className="text-white">{subject.year3}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">4.</div>
                    <div className="text-white">{subject.year4}</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs mb-1">Σ</div>
                    <div className="text-white font-bold">{subject.total}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="glass rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white/70">Legenda:</span>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span className="text-white/70">{t('curriculum.categories.it')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/70">● = IT předmět</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Classic theme layout
  return (
    <div className={`min-h-screen py-16 transition-colors duration-300 ${
      classicMode === 'light' ? 'bg-gray-50' : ''
    }`}>
      <div className="container mx-auto px-4">
        {/* Hero sekce */}
        <div className="mb-12">
          <div className={`max-w-6xl mx-auto p-8 rounded-2xl transition-all duration-300 ${
            classicMode === 'light'
              ? 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}>
            <div className="text-center">
              <div className={`w-24 h-1 mx-auto mb-6 rounded-full ${
                classicMode === 'light'
                  ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
                  : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
              }`}></div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}>
                {t('curriculum.title')}
              </h1>
              <p className={`text-lg md:text-xl ${
                classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/80'
                  : 'text-white/90'
              }`}>
                {t('curriculum.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Info box */}
        <div className={`max-w-6xl mx-auto p-6 rounded-2xl mb-8 ${
          classicMode === 'light'
            ? 'bg-white border border-gray-200 shadow-md'
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className={`text-sm ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/60' : 'text-white/60'
              }`}>{t('curriculum.info.rvpCode')}:</span>
              <p className={`font-semibold ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
              }`}>{t('curriculum.info.rvpValue')}</p>
            </div>
            <div>
              <span className={`text-sm ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/60' : 'text-white/60'
              }`}>{t('curriculum.info.svpName')}:</span>
              <p className={`font-semibold ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
              }`}>{t('curriculum.info.svpValue')}</p>
            </div>
            <div>
              <span className={`text-sm ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/60' : 'text-white/60'
              }`}>{t('curriculum.info.duration')}:</span>
              <p className={`font-semibold ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
              }`}>{t('curriculum.info.durationValue')}</p>
            </div>
            <div>
              <span className={`text-sm ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]/60' : 'text-white/60'
              }`}>{t('curriculum.info.validity')}:</span>
              <p className={`font-semibold ${
                classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
              }`}>{t('curriculum.info.validityValue')}</p>
            </div>
          </div>
        </div>

        {/* Tabulka */}
        <div className={`max-w-6xl mx-auto rounded-2xl p-6 mb-8 overflow-x-auto ${
          classicMode === 'light'
            ? 'bg-white border border-gray-200 shadow-md'
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${
            classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
          }`}>{t('curriculum.table.title')}</h2>

          {/* Desktop verze */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b-2 ${
                  classicMode === 'light' ? 'border-gray-300' : 'border-white/20'
                }`}>
                  <th className={`text-left py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.subject')}</th>
                  <th className={`text-center py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.year1')}</th>
                  <th className={`text-center py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.year2')}</th>
                  <th className={`text-center py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.year3')}</th>
                  <th className={`text-center py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.year4')}</th>
                  <th className={`text-center py-3 px-2 font-semibold ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white/80'
                  }`}>{t('curriculum.table.total')}</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((subject) => (
                  <tr
                    key={subject.key}
                    className={`border-b transition-colors ${
                      classicMode === 'light'
                        ? `border-gray-200 ${subject.isIT ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'}`
                        : `border-white/5 ${subject.isIT ? 'bg-blue-500/10 hover:bg-blue-500/20' : 'hover:bg-white/5'}`
                    }`}
                  >
                    <td className={`py-3 px-2 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                    }`}>
                      {t(`curriculum.subjects.${subject.key}`)}
                      {subject.isIT && <span className={`ml-2 text-xs ${
                        classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-blue-400'
                      }`}>●</span>}
                    </td>
                    <td className={`text-center py-3 px-2 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                    }`}>{subject.year1}</td>
                    <td className={`text-center py-3 px-2 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                    }`}>{subject.year2}</td>
                    <td className={`text-center py-3 px-2 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                    }`}>{subject.year3}</td>
                    <td className={`text-center py-3 px-2 ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'
                    }`}>{subject.year4}</td>
                    <td className={`text-center py-3 px-2 font-semibold ${
                      classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                    }`}>{subject.total}</td>
                  </tr>
                ))}
                <tr className={`border-t-2 font-bold ${
                  classicMode === 'light' ? 'border-gray-400' : 'border-white/30'
                }`}>
                  <td className={`py-3 px-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>{t('curriculum.subjects.total')}</td>
                  <td className={`text-center py-3 px-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>35</td>
                  <td className={`text-center py-3 px-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>35</td>
                  <td className={`text-center py-3 px-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>33</td>
                  <td className={`text-center py-3 px-2 ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>33</td>
                  <td className={`text-center py-3 px-2 text-lg ${
                    classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-white'
                  }`}>136</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobilní verze */}
          <div className="md:hidden space-y-3">
            {subjectData.map((subject) => (
              <div
                key={subject.key}
                className={`rounded-lg p-3 ${
                  classicMode === 'light'
                    ? `${subject.isIT ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200'}`
                    : `${subject.isIT ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-white/5 border border-white/10'}`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold text-sm ${
                    classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                  }`}>
                    {t(`curriculum.subjects.${subject.key}`)}
                  </h3>
                  {subject.isIT && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      classicMode === 'light'
                        ? 'bg-[var(--spsd-red)]/10 text-[var(--spsd-red)]'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      IT
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/60 mb-1' : 'text-white/60 mb-1'}>1.</div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'}>{subject.year1}</div>
                  </div>
                  <div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/60 mb-1' : 'text-white/60 mb-1'}>2.</div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'}>{subject.year2}</div>
                  </div>
                  <div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/60 mb-1' : 'text-white/60 mb-1'}>3.</div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'}>{subject.year3}</div>
                  </div>
                  <div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/60 mb-1' : 'text-white/60 mb-1'}>4.</div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'}>{subject.year4}</div>
                  </div>
                  <div>
                    <div className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/60 mb-1' : 'text-white/60 mb-1'}>Σ</div>
                    <div className={`font-bold ${
                      classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-white'
                    }`}>{subject.total}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div className={`max-w-6xl mx-auto rounded-xl p-4 ${
          classicMode === 'light'
            ? 'bg-white border border-gray-200'
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}>
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'}>
              Legenda:
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                classicMode === 'light' ? 'bg-[var(--spsd-red)]' : 'bg-blue-500'
              }`}></span>
              <span className={classicMode === 'light' ? 'text-[var(--spsd-navy)]/70' : 'text-white/70'}>
                {t('curriculum.categories.it')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
