'use client';

import { GraduationCap } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MoodlePage() {
  const { t } = useLanguage();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <ComingSoon
      title={tString('dashboard.moodle.title', 'Moodle')}
      description={tString(
        'dashboard.moodle.comingSoonDescription',
        'Integrace s Moodle pro přístup k výukovým materiálům bude brzy k dispozici'
      )}
      icon={GraduationCap}
      features={[
        tString('dashboard.moodle.feature1', 'Přístup ke kurzům a materiálům'),
        tString('dashboard.moodle.feature2', 'Odevzdávání úkolů'),
        tString('dashboard.moodle.feature3', 'Hodnocení a zpětná vazba'),
        tString('dashboard.moodle.feature4', 'Diskusní fóra'),
        tString('dashboard.moodle.feature5', 'Kalendář s termíny odevzdání'),
      ]}
    />
  );
}
