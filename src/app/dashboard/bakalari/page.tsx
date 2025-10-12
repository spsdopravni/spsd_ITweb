'use client';

import { BookOpen } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BakalariPage() {
  const { t } = useLanguage();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <ComingSoon
      title={tString('dashboard.bakalari.title', 'Bakaláři')}
      description={tString(
        'dashboard.bakalari.comingSoonDescription',
        'Integrace s Bakaláři systémem bude brzy k dispozici'
      )}
      icon={BookOpen}
      features={[
        tString('dashboard.bakalari.feature1', 'Přehled známek a hodnocení'),
        tString('dashboard.bakalari.feature2', 'Evidence absence a omluvenky'),
        tString('dashboard.bakalari.feature3', 'Rozvrh hodin a změny'),
        tString('dashboard.bakalari.feature4', 'Komunikace s učiteli'),
        tString('dashboard.bakalari.feature5', 'Přístup ke školním dokumentům'),
      ]}
    />
  );
}
