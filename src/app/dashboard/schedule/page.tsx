'use client';

import { Calendar } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SchedulePage() {
  const { t } = useLanguage();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <ComingSoon
      title={tString('dashboard.schedule.title', 'Rozvrh hodin')}
      description={tString(
        'dashboard.schedule.comingSoonDescription',
        'Interaktivní rozvrh s aktuálními změnami bude brzy k dispozici'
      )}
      icon={Calendar}
      features={[
        tString('dashboard.schedule.feature1', 'Aktuální rozvrh hodin'),
        tString('dashboard.schedule.feature2', 'Změny v rozvrhu v reálném čase'),
        tString('dashboard.schedule.feature3', 'Suplovací rozvrh'),
        tString('dashboard.schedule.feature4', 'Připomínky před hodinou'),
        tString('dashboard.schedule.feature5', 'Export rozvrhu do kalendáře'),
      ]}
    />
  );
}
