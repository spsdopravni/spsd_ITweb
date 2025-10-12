'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useSpring, animated } from '@react-spring/web';
import {
  Lock, User, Eye, EyeOff, LogIn, Sparkles,
  AlertCircle, Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { t } = useLanguage();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { login, loginWithMicrosoft, isAuthenticated, error, isLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username || !password) {
      setLocalError(tString('login.fillAllFields', 'Vyplňte všechna pole'));
      return;
    }

    const success = await login(username, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  const handleMicrosoftLogin = async () => {
    await loginWithMicrosoft();
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  const isModern = theme === 'modern';

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isModern
        ? 'bg-gradient-to-br from-black via-gray-900 to-black'
        : classicMode === 'light'
        ? 'bg-gray-50'
        : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
    }`}>
      {/* Background decoration for modern theme */}
      {isModern && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
            >
              <div
                className={`w-3 h-3 ${
                  i % 3 === 0 ? 'rounded-full gradient-accent' : i % 3 === 1 ? 'rotate-45 gradient-warm' : 'rounded-sm gradient-cool'
                } animate-pulse`}
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + i * 0.5}s`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <animated.div style={fadeIn} className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className={`rounded-2xl p-8 shadow-2xl ${
          isModern
            ? 'glass border border-white/10'
            : classicMode === 'light'
            ? 'bg-white border border-gray-200'
            : 'bg-white/10 backdrop-blur-sm border border-white/20'
        }`}>
          {/* Logo/Header */}
          <div className="text-center mb-8">
            {isModern && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-4">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white/80 font-medium">
                  {t('login.studentPortal', 'Studentský portál')}
                </span>
              </div>
            )}

            <h1 className={`text-3xl font-bold mb-2 ${
              isModern
                ? 'text-white'
                : classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}>
              {t('login.title', 'Přihlášení')}
            </h1>

            <p className={`text-sm ${
              isModern
                ? 'text-white/70'
                : classicMode === 'light'
                ? 'text-[var(--spsd-navy)]/70'
                : 'text-white/80'
            }`}>
              {t('login.subtitle', 'Bakaláři, Moodle a rozvrh na jednom místě')}
            </p>
          </div>

          {/* Error message */}
          {(error || localError) && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              isModern
                ? 'bg-red-500/10 border border-red-500/30'
                : classicMode === 'light'
                ? 'bg-red-50 border border-red-200'
                : 'bg-red-500/20 border border-red-500/30'
            }`}>
              <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isModern
                  ? 'text-red-400'
                  : classicMode === 'light'
                  ? 'text-red-600'
                  : 'text-red-400'
              }`} />
              <p className={`text-sm ${
                isModern
                  ? 'text-red-400'
                  : classicMode === 'light'
                  ? 'text-red-700'
                  : 'text-red-300'
              }`}>
                {error || localError}
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/90'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white/90'
              }`}>
                {t('login.username', 'Uživatelské jméno')}
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl transition-all duration-200 ${
                    isModern
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none'
                      : classicMode === 'light'
                      ? 'bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20'
                      : 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none'
                  }`}
                  placeholder={tString('login.usernamePlaceholder', 'Zadejte uživatelské jméno')}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/90'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white/90'
              }`}>
                {t('login.password', 'Heslo')}
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl transition-all duration-200 ${
                    isModern
                      ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none'
                      : classicMode === 'light'
                      ? 'bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20'
                      : 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none'
                  }`}
                  placeholder={tString('login.passwordPlaceholder', 'Zadejte heslo')}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isModern
                      ? 'text-white/50 hover:text-white/80'
                      : classicMode === 'light'
                      ? 'text-gray-400 hover:text-gray-600'
                      : 'text-white/50 hover:text-white/80'
                  } transition-colors`}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isModern
                  ? 'gradient-accent text-white hover:gradient-warm hover:scale-105 glow-spsd-hover disabled:opacity-50 disabled:cursor-not-allowed'
                  : classicMode === 'light'
                  ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
                  : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('login.loggingIn', 'Přihlašování...')}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t('login.submit', 'Přihlásit se')}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center ${
              isModern
                ? 'text-white/30'
                : classicMode === 'light'
                ? 'text-gray-300'
                : 'text-white/30'
            }`}>
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 ${
                isModern
                  ? 'bg-black text-white/50'
                  : classicMode === 'light'
                  ? 'bg-white text-gray-500'
                  : 'bg-[var(--spsd-navy)] text-white/70'
              }`}>
                {t('login.or', 'nebo')}
              </span>
            </div>
          </div>

          {/* Microsoft login button */}
          <button
            type="button"
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              isModern
                ? 'glass border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
                : classicMode === 'light'
                ? 'bg-white border-2 border-gray-300 text-[var(--spsd-navy)] hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="11" height="11" fill="#F25022"/>
              <rect x="12" width="11" height="11" fill="#7FBA00"/>
              <rect y="12" width="11" height="11" fill="#00A4EF"/>
              <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
            </svg>
            <span>{t('login.microsoftLogin', 'Přihlásit se přes Microsoft')}</span>
          </button>

          {/* Bakaláři credentials hint */}
          <div className={`mt-6 p-4 rounded-lg ${
            isModern
              ? 'bg-blue-500/10 border border-blue-500/30'
              : classicMode === 'light'
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-blue-500/20 border border-blue-500/30'
          }`}>
            <p className={`text-xs text-center ${
              isModern
                ? 'text-blue-400'
                : classicMode === 'light'
                ? 'text-blue-700'
                : 'text-blue-300'
            }`}>
              {t('login.bakalariHint', 'Použijte své přihlašovací údaje z Bakalářů')}
            </p>
          </div>

          {/* Back to home link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className={`text-sm transition-colors ${
                isModern
                  ? 'text-white/70 hover:text-white'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]/70 hover:text-[var(--spsd-navy)]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {t('login.backToHome', '← Zpět na hlavní stránku')}
            </Link>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
