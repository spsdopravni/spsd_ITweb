'use client';

import { MessageSquare } from 'lucide-react';
import { ComingSoon } from '@/components/dashboard/ComingSoon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CommunicationPage() {
  const { t } = useLanguage();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  return (
    <ComingSoon
      title={tString('dashboard.sidebar.communication', 'Komunikace')}
      description={tString(
        'dashboard.communication.comingSoonDescription',
        'Systém pro komunikaci se školou bude brzy k dispozici'
      )}
      icon={MessageSquare}
      features={[
        tString('dashboard.communication.feature1', 'Zprávy od učitelů a školy'),
        tString('dashboard.communication.feature2', 'Oznámení o akcích a změnách'),
        tString('dashboard.communication.feature3', 'Omluvenky a žádosti online'),
        tString('dashboard.communication.feature4', 'Komunikace s třídním učitelem'),
        tString('dashboard.communication.feature5', 'Historie komunikace'),
      ]}
    />
  );
}
