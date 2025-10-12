'use client';

import React from 'react';
import { Clock, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useSpring, animated } from '@react-spring/web';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  features?: string[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  icon: IconComponent,
  features,
}) => {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();

  const isModern = theme === 'modern';

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  const Icon = IconComponent || Clock;

  return (
    <animated.div style={fadeIn} className="flex items-center justify-center min-h-[60vh] p-8">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${
            isModern
              ? 'gradient-accent'
              : classicMode === 'light'
              ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
              : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
          }`}
        >
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1
          className={`text-4xl font-bold mb-4 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={`text-lg mb-8 ${
              isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-[var(--spsd-navy)]/70'
                : 'text-white/80'
            }`}
          >
            {description}
          </p>
        )}

        {/* Coming Soon Badge */}
        <div
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 ${
            isModern
              ? 'glass border border-blue-500/30'
              : classicMode === 'light'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-blue-500/20 border border-blue-500/30'
          }`}
        >
          <Rocket
            className={`w-5 h-5 ${
              isModern
                ? 'text-blue-400'
                : classicMode === 'light'
                ? 'text-blue-600'
                : 'text-blue-300'
            }`}
          />
          <span
            className={`font-semibold ${
              isModern
                ? 'text-blue-400'
                : classicMode === 'light'
                ? 'text-blue-700'
                : 'text-blue-300'
            }`}
          >
            {t('dashboard.comingSoon', 'Připravujeme pro vás')}
          </span>
        </div>

        {/* Features List */}
        {features && features.length > 0 && (
          <div
            className={`rounded-2xl p-8 ${
              isModern
                ? 'glass border border-white/10'
                : classicMode === 'light'
                ? 'bg-white border border-gray-200 shadow-lg'
                : 'bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isModern
                  ? 'text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white'
              }`}
            >
              {t('dashboard.comingSoonFeatures', 'Co můžete očekávat:')}
            </h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 text-left ${
                    isModern
                      ? 'text-white/80'
                      : classicMode === 'light'
                      ? 'text-[var(--spsd-navy)]/80'
                      : 'text-white/80'
                  }`}
                >
                  <Sparkles
                    className={`w-5 h-5 flex-shrink-0 ${
                      isModern
                        ? 'text-blue-400'
                        : classicMode === 'light'
                        ? 'text-[var(--spsd-red)]'
                        : 'text-[var(--spsd-orange)]'
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Status Message */}
        <p
          className={`mt-8 text-sm ${
            isModern
              ? 'text-white/50'
              : classicMode === 'light'
              ? 'text-gray-500'
              : 'text-white/60'
          }`}
        >
          {t(
            'dashboard.comingSoonMessage',
            'Pracujeme na integraci těchto funkcí. Budeme vás informovat, až budou dostupné.'
          )}
        </p>
      </div>
    </animated.div>
  );
};
