'use client';

import React, { useState } from 'react';
import { X, Mail, KeyRound, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { animated, useSpring } from '@react-spring/web';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMicrosoftReset: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onMicrosoftReset,
}) => {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  // Animation
  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  const modalSpring = useSpring({
    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 25 },
  });

  const isModern = theme === 'modern';

  const handleMicrosoftReset = async () => {
    setIsLoading(true);
    try {
      await onMicrosoftReset();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <animated.div
        style={overlaySpring}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <animated.div
        style={modalSpring}
        className={`relative w-full max-w-md rounded-2xl shadow-2xl ${
          isModern
            ? 'glass border border-white/20'
            : classicMode === 'light'
            ? 'bg-white border border-gray-200'
            : 'bg-gradient-to-br from-[var(--spsd-navy)] to-[var(--spsd-navy-dark)] border border-white/20'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
            isModern
              ? 'hover:bg-white/10 text-white/70 hover:text-white'
              : classicMode === 'light'
              ? 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              : 'hover:bg-white/10 text-white/70 hover:text-white'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 text-center">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isModern
                ? 'gradient-accent'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
                : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
            }`}
          >
            <KeyRound className="w-8 h-8 text-white" />
          </div>

          <h2
            className={`text-2xl font-bold mb-2 ${
              isModern
                ? 'text-white'
                : classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}
          >
            {t('forgotPassword.title', 'Zapomenuté heslo')}
          </h2>

          <p
            className={`text-sm ${
              isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-gray-600'
                : 'text-white/80'
            }`}
          >
            {t('forgotPassword.subtitle', 'Zvolte způsob obnovení hesla')}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Microsoft Reset (Recommended) */}
          <button
            onClick={handleMicrosoftReset}
            disabled={isLoading}
            className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
              isModern
                ? 'bg-white/5 hover:bg-white/10 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                : classicMode === 'light'
                ? 'bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-white/10 hover:bg-white/20 border-2 border-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            ) : (
              <svg
                className="w-6 h-6 flex-shrink-0"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="11" height="11" fill="#F25022" />
                <rect x="12" width="11" height="11" fill="#7FBA00" />
                <rect y="12" width="11" height="11" fill="#00A4EF" />
                <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
              </svg>
            )}
            <div className="flex-1 text-left">
              <p
                className={`font-semibold mb-0.5 ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                {t('forgotPassword.microsoft', 'Přihlásit přes Microsoft')}
              </p>
              <p
                className={`text-xs ${
                  isModern
                    ? 'text-white/60'
                    : classicMode === 'light'
                    ? 'text-gray-500'
                    : 'text-white/70'
                }`}
              >
                {t('forgotPassword.microsoftDesc', 'Doporučeno - vygenerujeme nové heslo')}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isModern
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : classicMode === 'light'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}
            >
              {t('forgotPassword.recommended', 'Doporučeno')}
            </div>
          </button>

          {/* Email Reset (Coming soon) */}
          <button
            disabled
            className={`w-full p-4 rounded-xl transition-all duration-300 flex items-center gap-4 opacity-50 cursor-not-allowed ${
              isModern
                ? 'bg-white/5 border border-white/20'
                : classicMode === 'light'
                ? 'bg-white border-2 border-gray-300'
                : 'bg-white/10 border-2 border-white/20'
            }`}
          >
            <Mail
              className={`w-6 h-6 flex-shrink-0 ${
                isModern
                  ? 'text-white/50'
                  : classicMode === 'light'
                  ? 'text-gray-400'
                  : 'text-white/50'
              }`}
            />
            <div className="flex-1 text-left">
              <p
                className={`font-semibold mb-0.5 ${
                  isModern
                    ? 'text-white/60'
                    : classicMode === 'light'
                    ? 'text-gray-500'
                    : 'text-white/70'
                }`}
              >
                {t('forgotPassword.email', 'Zaslat email')}
              </p>
              <p
                className={`text-xs ${
                  isModern
                    ? 'text-white/40'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`}
              >
                {t('forgotPassword.emailDesc', 'Připravujeme...')}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isModern
                  ? 'bg-white/5 text-white/40 border border-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-100 text-gray-400 border border-gray-200'
                  : 'bg-white/5 text-white/50 border border-white/10'
              }`}
            >
              {t('forgotPassword.soon', 'Brzy')}
            </div>
          </button>

          {/* Info */}
          <div
            className={`p-4 rounded-xl ${
              isModern
                ? 'bg-blue-500/10 border border-blue-500/30'
                : classicMode === 'light'
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-blue-500/20 border border-blue-500/30'
            }`}
          >
            <p
              className={`text-xs ${
                isModern
                  ? 'text-blue-400/80'
                  : classicMode === 'light'
                  ? 'text-blue-700'
                  : 'text-blue-300/80'
              }`}
            >
              {t(
                'forgotPassword.info',
                'Po úspěšném přihlášení přes Microsoft vám vygenerujeme nové heslo, které se zobrazí v popup okně.'
              )}
            </p>
          </div>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isModern
                ? 'glass border border-white/20 text-white hover:bg-white/10'
                : classicMode === 'light'
                ? 'bg-gray-100 text-[var(--spsd-navy)] hover:bg-gray-200 border border-gray-300'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {t('forgotPassword.cancel', 'Zrušit')}
          </button>
        </div>
      </animated.div>
    </div>
  );
};
