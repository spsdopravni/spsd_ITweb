'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, type SupportedLanguage } from '@/contexts/LanguageContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useSpring, animated } from '@react-spring/web';
import {
  User,
  Lock,
  Mail,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
  Globe,
  Palette,
  Sparkles,
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { theme, setTheme } = usePreferences();
  const { classicMode, switchClassicMode } = useTheme();

  const isModern = theme === 'modern';

  const tString = (key: string, fallback: string): string => {
    const result = t(key, fallback);
    return Array.isArray(result) ? result[0] || fallback : result;
  };

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError(tString('profile.error.fillAll', 'Vyplňte všechna pole'));
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(tString('profile.error.passwordLength', 'Heslo musí mít alespoň 8 znaků'));
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(tString('profile.error.passwordMismatch', 'Hesla se neshodují'));
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.error || t('profile.error.generic', 'Chyba při změně hesla'));
        return;
      }

      // Success
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Hide success message after 5 seconds
      setTimeout(() => setPasswordSuccess(false), 5000);
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordError(tString('profile.error.generic', 'Chyba při změně hesla'));
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <animated.div style={fadeIn} className="space-y-6">
      {/* Page Header */}
      <div>
        <h1
          className={`text-4xl font-bold mb-2 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          {t('profile.title', 'Nastavení')}
        </h1>
        <p
          className={`text-lg ${
            isModern
              ? 'text-white/70'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]/70'
              : 'text-white/80'
          }`}
        >
          {t('profile.subtitle', 'Spravujte svůj účet a nastavení')}
        </p>
      </div>

      {/* Account Info & Password Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info Section */}
        <div
          className={`rounded-2xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-lg'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
          <h2
            className={`text-xl font-bold mb-4 flex items-center gap-2 ${
              isModern
                ? 'text-white'
                : classicMode === 'light'
                ? 'text-[var(--spsd-navy)]'
                : 'text-white'
            }`}
          >
            <User className="w-5 h-5" />
            {t('profile.info.title', 'Informace o účtu')}
          </h2>

          <div className="grid grid-cols-1 gap-4">
          {/* Username */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/70'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('profile.info.username', 'Uživatelské jméno')}
              </div>
            </label>
            <div
              className={`px-4 py-3 rounded-xl ${
                isModern
                  ? 'bg-white/5 text-white border border-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              {user?.username}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/70'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('profile.info.email', 'Email')}
              </div>
            </label>
            <div
              className={`px-4 py-3 rounded-xl ${
                isModern
                  ? 'bg-white/5 text-white border border-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              {user?.email}
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/70'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t('profile.info.role', 'Role')}
              </div>
            </label>
            <div
              className={`px-4 py-3 rounded-xl ${
                isModern
                  ? 'bg-white/5 text-white border border-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              {user?.role === 'ADMIN'
                ? t('profile.role.admin', 'Administrátor')
                : user?.role === 'TEACHER'
                ? t('profile.role.teacher', 'Učitel')
                : t('profile.role.student', 'Student')}
            </div>
          </div>

          {/* Account Created */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/70'
                  : classicMode === 'light'
                  ? 'text-gray-600'
                  : 'text-white/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('profile.info.created', 'Účet vytvořen')}
              </div>
            </label>
            <div
              className={`px-4 py-3 rounded-xl ${
                isModern
                  ? 'bg-white/5 text-white border border-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-50 text-[var(--spsd-navy)] border border-gray-200'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              {new Date().toLocaleDateString('cs-CZ')}
            </div>
          </div>
        </div>
        </div>

        {/* Password Change Section */}
        <div
          className={`rounded-2xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-lg'
              : 'bg-white/10 backdrop-blur-sm border border-white/20'
          }`}
        >
        <h2
          className={`text-xl font-bold mb-4 flex items-center gap-2 ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          <Lock className="w-5 h-5" />
          {t('profile.password.title', 'Změna hesla')}
        </h2>

        {/* Error/Success Messages */}
        {passwordError && (
          <div
            className={`mb-4 p-4 rounded-xl flex items-start gap-3 ${
              isModern
                ? 'bg-red-500/10 border border-red-500/30'
                : classicMode === 'light'
                ? 'bg-red-50 border border-red-200'
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <AlertCircle
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isModern
                  ? 'text-red-400'
                  : classicMode === 'light'
                  ? 'text-red-600'
                  : 'text-red-300'
              }`}
            />
            <p
              className={`text-sm ${
                isModern
                  ? 'text-red-400'
                  : classicMode === 'light'
                  ? 'text-red-700'
                  : 'text-red-300'
              }`}
            >
              {passwordError}
            </p>
          </div>
        )}

        {passwordSuccess && (
          <div
            className={`mb-4 p-4 rounded-xl flex items-start gap-3 ${
              isModern
                ? 'bg-green-500/10 border border-green-500/30'
                : classicMode === 'light'
                ? 'bg-green-50 border border-green-200'
                : 'bg-green-500/20 border border-green-500/30'
            }`}
          >
            <Check
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                isModern
                  ? 'text-green-400'
                  : classicMode === 'light'
                  ? 'text-green-600'
                  : 'text-green-300'
              }`}
            />
            <p
              className={`text-sm ${
                isModern
                  ? 'text-green-400'
                  : classicMode === 'light'
                  ? 'text-green-700'
                  : 'text-green-300'
              }`}
            >
              {t('profile.password.success', 'Heslo bylo úspěšně změněno')}
            </p>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Current Password */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/90'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white/90'
              }`}
            >
              {t('profile.password.current', 'Současné heslo')}
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`}
              />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full pl-11 pr-11 py-3 rounded-xl transition-all duration-200 ${
                  isModern
                    ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none'
                    : classicMode === 'light'
                    ? 'bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20'
                    : 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none'
                }`}
                placeholder={tString('profile.password.currentPlaceholder', 'Zadejte současné heslo')}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isModern
                    ? 'text-white/50 hover:text-white/80'
                    : classicMode === 'light'
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-white/50 hover:text-white/80'
                } transition-colors`}
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/90'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white/90'
              }`}
            >
              {t('profile.password.new', 'Nové heslo')}
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`}
              />
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full pl-11 pr-11 py-3 rounded-xl transition-all duration-200 ${
                  isModern
                    ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none'
                    : classicMode === 'light'
                    ? 'bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20'
                    : 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none'
                }`}
                placeholder={tString('profile.password.newPlaceholder', 'Zadejte nové heslo')}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isModern
                    ? 'text-white/50 hover:text-white/80'
                    : classicMode === 'light'
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-white/50 hover:text-white/80'
                } transition-colors`}
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isModern
                  ? 'text-white/90'
                  : classicMode === 'light'
                  ? 'text-[var(--spsd-navy)]'
                  : 'text-white/90'
              }`}
            >
              {t('profile.password.confirm', 'Potvrďte nové heslo')}
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  isModern
                    ? 'text-white/50'
                    : classicMode === 'light'
                    ? 'text-gray-400'
                    : 'text-white/50'
                }`}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-11 pr-11 py-3 rounded-xl transition-all duration-200 ${
                  isModern
                    ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:bg-white/10 focus:border-blue-400/50 focus:outline-none'
                    : classicMode === 'light'
                    ? 'bg-white border border-gray-300 text-[var(--spsd-navy)] placeholder-gray-400 focus:border-[var(--spsd-red)] focus:outline-none focus:ring-2 focus:ring-[var(--spsd-red)]/20'
                    : 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-white/40 focus:outline-none'
                }`}
                placeholder={tString('profile.password.confirmPlaceholder', 'Zadejte heslo znovu')}
                disabled={isChangingPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  isModern
                    ? 'text-white/50 hover:text-white/80'
                    : classicMode === 'light'
                    ? 'text-gray-400 hover:text-gray-600'
                    : 'text-white/50 hover:text-white/80'
                } transition-colors`}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isChangingPassword}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isModern
                ? 'gradient-accent text-white hover:gradient-warm hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                : classicMode === 'light'
                ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-red-light)] text-white hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
                : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {isChangingPassword ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('profile.password.changing', 'Změna hesla...')}</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>{t('profile.password.submit', 'Změnit heslo')}</span>
              </>
            )}
          </button>
        </form>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language & Theme Card */}
        <div
          className={`rounded-xl p-6 ${
            isModern
              ? 'glass border border-white/10'
              : classicMode === 'light'
              ? 'bg-white border border-gray-200 shadow-lg'
              : 'bg-white/10 border border-white/20'
          }`}
        >
          <div className="space-y-6">
            {/* Language */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-3 ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                {t('profile.settings.language', 'Jazyk')}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(['cs', 'en', 'sk', 'uk', 'ru'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang as SupportedLanguage)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentLanguage === lang
                        ? isModern
                          ? 'gradient-accent text-white'
                          : classicMode === 'light'
                          ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white'
                          : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white'
                        : isModern
                        ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                        : classicMode === 'light'
                        ? 'bg-gray-50 border border-gray-200 text-[var(--spsd-navy)] hover:bg-gray-100'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div
              className={`h-px ${
                isModern
                  ? 'bg-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-200'
                  : 'bg-white/10'
              }`}
            />

            {/* Theme */}
            <div>
              <label
                className={`flex items-center gap-2 text-sm font-semibold mb-3 ${
                  isModern
                    ? 'text-white'
                    : classicMode === 'light'
                    ? 'text-[var(--spsd-navy)]'
                    : 'text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                {t('profile.settings.theme', 'Téma')}
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme('modern')}
                    className={`p-3 rounded-lg transition-all duration-200 text-left ${
                      theme === 'modern'
                        ? 'gradient-accent text-white border-2 border-blue-400'
                        : isModern
                        ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                        : classicMode === 'light'
                        ? 'bg-gray-50 border border-gray-200 text-[var(--spsd-navy)] hover:bg-gray-100'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm font-semibold">Modern</span>
                    </div>
                    <p className={`text-xs ${theme === 'modern' ? 'text-white/70' : 'opacity-50'}`}>
                      {t('profile.settings.modernDesc', 'Futuristický')}
                    </p>
                  </button>

                  <button
                    onClick={() => setTheme('classic')}
                    className={`p-3 rounded-lg transition-all duration-200 text-left ${
                      theme === 'classic'
                        ? classicMode === 'light'
                          ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white border-2 border-[var(--spsd-red)]'
                          : 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white border-2 border-[var(--spsd-orange)]'
                        : isModern
                        ? 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                        : classicMode === 'light'
                        ? 'bg-gray-50 border border-gray-200 text-[var(--spsd-navy)] hover:bg-gray-100'
                        : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Palette className="w-4 h-4" />
                      <span className="text-sm font-semibold">Classic</span>
                    </div>
                    <p className={`text-xs ${theme === 'classic' ? 'opacity-80' : 'opacity-50'}`}>
                      {t('profile.settings.classicDesc', 'Tradiční')}
                    </p>
                  </button>
                </div>

                {/* Classic Mode Toggle */}
                {theme === 'classic' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => switchClassicMode('light')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        classicMode === 'light'
                          ? 'bg-white border-2 border-[var(--spsd-red)] text-[var(--spsd-navy)]'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      Light
                    </button>

                    <button
                      onClick={() => switchClassicMode('dark')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        classicMode === 'dark'
                          ? 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-dark)] border-2 border-white/30 text-white'
                          : classicMode === 'light'
                          ? 'bg-gray-50 border border-gray-200 text-[var(--spsd-navy)] hover:bg-gray-100'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      Dark
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </animated.div>
  );
}
