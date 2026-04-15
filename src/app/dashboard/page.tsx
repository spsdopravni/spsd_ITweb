'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated } from '@react-spring/web';
import { FolderOpen, Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={fadeIn}>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[var(--spsd-navy)] mb-2">
          {tString('dashboard.welcome', 'Vítejte')}, {user?.firstName || user?.username}!
        </h1>
        <p className="text-lg text-[var(--spsd-navy)]/70">
          {tString('dashboard.subtitle', 'Spravuj projekty oboru IT.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => router.push('/dashboard/projects')}
          className="group rounded-2xl p-8 text-left bg-white border border-gray-200 shadow-md hover:shadow-xl hover:border-[var(--spsd-red)]/30 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <FolderOpen className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--spsd-navy)] mb-2">
            {tString('dashboard.projects.title', 'Projekty')}
          </h3>
          <p className="text-[var(--spsd-navy)]/70 mb-4">
            {tString('dashboard.projects.description', 'Spravuj seznam projektů — vytvoř, uprav nebo smaž.')}
          </p>
          <div className="inline-flex items-center gap-2 text-[var(--spsd-red)] font-semibold group-hover:gap-3 transition-all">
            <span>{tString('dashboard.projects.cta', 'Otevřít přehled')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button
          onClick={() => router.push('/dashboard/projects/new')}
          className="group rounded-2xl p-8 text-left bg-gradient-to-br from-[var(--spsd-navy)] to-[var(--spsd-navy-light)] shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Plus className="w-7 h-7 text-[var(--spsd-orange)]" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {tString('dashboard.projects.newTitle', 'Nový projekt')}
          </h3>
          <p className="text-white/70 mb-4">
            {tString('dashboard.projects.newDescription', 'Přidej nový projekt s názvem, popisem, autorem a stavem.')}
          </p>
          <div className="inline-flex items-center gap-2 text-[var(--spsd-orange)] font-semibold group-hover:gap-3 transition-all">
            <span>{tString('dashboard.projects.newCta', 'Vytvořit')}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>
    </animated.div>
  );
}
