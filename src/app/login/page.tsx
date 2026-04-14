'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSpring, animated } from '@react-spring/web';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { t } = useLanguage();
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

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: '#fafaf7' }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background:
            'linear-gradient(90deg, var(--spsd-navy) 0%, var(--spsd-red) 50%, var(--spsd-orange) 100%)',
          zIndex: 5,
        }}
      />

      <animated.div style={fadeIn} className="w-full max-w-md relative z-10">
        <div className="rounded-2xl p-8 shadow-2xl bg-white border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[var(--spsd-navy)]">
              {t('login.title', 'Přihlášení')}
            </h1>
            <p className="text-sm text-[var(--spsd-navy)]/70">
              {t('login.subtitle', 'Bakaláři, Moodle a rozvrh na jednom místě')}
            </p>
          </div>

          {(error || localError) && (
            <div className="mb-6 p-4 rounded-lg flex items-start gap-3 bg-red-50 border border-red-200">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
              <p className="text-sm text-red-700">{error || localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--spsd-navy)]">
                {t('login.username', 'Uživatelské jméno')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20 transition-all duration-200"
                  placeholder={tString(
                    'login.usernamePlaceholder',
                    'Zadejte uživatelské jméno'
                  )}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--spsd-navy)]">
                {t('login.password', 'Heslo')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20 transition-all duration-200"
                  placeholder={tString(
                    'login.passwordPlaceholder',
                    'Zadejte heslo'
                  )}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center text-gray-300">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                {t('login.or', 'nebo')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-[var(--spsd-navy)] hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="11" height="11" fill="#F25022" />
              <rect x="12" width="11" height="11" fill="#7FBA00" />
              <rect y="12" width="11" height="11" fill="#00A4EF" />
              <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
            </svg>
            <span>
              {t('login.microsoftLogin', 'Přihlásit se přes Microsoft')}
            </span>
          </button>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-xs text-center text-blue-700">
              {t(
                'login.bakalariHint',
                'Použijte své přihlašovací údaje z Bakalářů'
              )}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[var(--spsd-navy)]/70 hover:text-[var(--spsd-navy)] transition-colors"
            >
              {t('login.backToHome', '← Zpět na hlavní stránku')}
            </Link>
          </div>
        </div>
      </animated.div>
    </div>
  );
}
