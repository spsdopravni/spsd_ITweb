'use client';

import { Award } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GradesPage() {
  const { t } = useLanguage();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <ComingSoon
      title={tString('dashboard.sidebar.grades', 'Známky')}
      description={tString(
        'dashboard.grades.comingSoonDescription',
        'Detailní přehled známek bude brzy k dispozici'
      )}
      icon={Award}
      features={[
        tString('dashboard.grades.feature1', 'Přehled známek podle předmětů'),
        tString('dashboard.grades.feature2', 'Váhy a průměry známek'),
        tString('dashboard.grades.feature3', 'Grafické zobrazení vývoje'),
        tString('dashboard.grades.feature4', 'Srovnání s celkovým průměrem třídy'),
        tString('dashboard.grades.feature5', 'Export známek do PDF'),
      ]}
    />
  );
}
