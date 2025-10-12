'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { animated, useSpring } from '@react-spring/web';

interface PasswordPopupProps {
  password: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordPopup: React.FC<PasswordPopupProps> = ({
  password,
  username,
  isOpen,
  onClose,
}) => {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
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
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isModern
              ? 'gradient-accent'
              : classicMode === 'light'
              ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
              : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)]'
          }`}>
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}>
            {t('passwordPopup.title', 'Vaše nové heslo')}
          </h2>

          <p className={`text-sm ${
            isModern
              ? 'text-white/70'
              : classicMode === 'light'
              ? 'text-gray-600'
              : 'text-white/80'
          }`}>
            {t('passwordPopup.subtitle', 'Uložte si heslo na bezpečné místo')}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Username */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${
              isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-gray-600'
                : 'text-white/70'
            }`}>
              {t('passwordPopup.username', 'Uživatelské jméno')}
            </label>
            <div className={`px-4 py-3 rounded-xl font-mono text-sm ${
              isModern
                ? 'bg-white/5 text-white border border-white/10'
                : classicMode === 'light'
                ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                : 'bg-white/10 text-white border border-white/20'
            }`}>
              {username}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${
              isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-gray-600'
                : 'text-white/70'
            }`}>
              {t('passwordPopup.password', 'Heslo')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                className={`w-full px-4 py-3 pr-24 rounded-xl font-mono text-sm ${
                  isModern
                    ? 'bg-white/5 text-white border border-white/10'
                    : classicMode === 'light'
                    ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                    : 'bg-white/10 text-white border border-white/20'
                }`}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className={`p-2 rounded-lg transition-all ${
                    isModern
                      ? 'hover:bg-white/10 text-white/50 hover:text-white'
                      : classicMode === 'light'
                      ? 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                      : 'hover:bg-white/10 text-white/50 hover:text-white'
                  }`}
                  title={showPassword ? 'Skrýt heslo' : 'Zobrazit heslo'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={handleCopy}
                  className={`p-2 rounded-lg transition-all ${
                    isModern
                      ? 'hover:bg-white/10 text-white/50 hover:text-white'
                      : classicMode === 'light'
                      ? 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                      : 'hover:bg-white/10 text-white/50 hover:text-white'
                  }`}
                  title="Kopírovat"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className={`p-4 rounded-xl flex items-start gap-3 ${
            isModern
              ? 'bg-yellow-500/10 border border-yellow-500/30'
              : classicMode === 'light'
              ? 'bg-yellow-50 border border-yellow-200'
              : 'bg-yellow-500/20 border border-yellow-500/30'
          }`}>
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              isModern
                ? 'text-yellow-400'
                : classicMode === 'light'
                ? 'text-yellow-600'
                : 'text-yellow-300'
            }`} />
            <div className="flex-1">
              <p className={`text-sm font-medium mb-1 ${
                isModern
                  ? 'text-yellow-400'
                  : classicMode === 'light'
                  ? 'text-yellow-800'
                  : 'text-yellow-300'
              }`}>
                {t('passwordPopup.warningTitle', 'Důležité!')}
              </p>
              <p className={`text-xs ${
                isModern
                  ? 'text-yellow-400/80'
                  : classicMode === 'light'
                  ? 'text-yellow-700'
                  : 'text-yellow-300/80'
              }`}>
                {t(
                  'passwordPopup.warningText',
                  'Toto heslo se zobrazí pouze jednou. Zapište si ho nebo uložte do správce hesel.'
                )}
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              isModern
                ? 'gradient-accent text-white hover:gradient-warm hover:scale-105'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white hover:shadow-xl hover:-translate-y-1'
                : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {t('passwordPopup.understood', 'Rozumím, zavřít')}
          </button>
        </div>
      </animated.div>
    </div>
  );
};
