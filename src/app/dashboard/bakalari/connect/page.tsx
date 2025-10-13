'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock, User, Loader2, CheckCircle2, XCircle, Database, Download } from 'lucide-react';

/**
 * Bakaláři Connection Page
 *
 * Allows users to connect their Bakaláři account and fetch all data
 */
export default function BakalariConnectPage() {
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const { t } = useLanguage();
  const router = useRouter();
  const isModern = theme === 'modern';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fetchedData, setFetchedData] = useState<unknown>(null);
  const [fetchingData, setFetchingData] = useState(false);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('/api/bakalari/connect/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details
          ? `${data.error}: ${data.details}`
          : data.error || 'Connection failed';
        throw new Error(errorMsg);
      }

      setSuccess(true);
      setPassword('');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Bakaláři';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllData = async () => {
    setFetchingData(true);
    setError(null);

    try {
      const response = await fetch('/api/bakalari/fetch-all/', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }

      setFetchedData(data.data);

      // Download data as JSON
      const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bakalari-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
    } finally {
      setFetchingData(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
            }`}
          >
            Připojit Bakaláře
          </h1>
          <p
            className={`text-sm ${
              isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/80'
            }`}
          >
            Připojte svůj účet na mot-spsd.bakalari.cz a stáhněte všechna dostupná data
          </p>
        </div>

        {/* Connection Form */}
        {!success ? (
          <form
            onSubmit={handleConnect}
            className={`rounded-2xl p-8 border ${
              isModern
                ? 'glass border-white/10'
                : classicMode === 'light'
                ? 'bg-white border-gray-200 shadow-lg'
                : 'bg-white/10 backdrop-blur-sm border-white/20'
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Database
                className={`w-6 h-6 ${
                  isModern ? 'text-blue-400' : classicMode === 'light' ? 'text-[var(--spsd-red)]' : 'text-white'
                }`}
              />
              <h2
                className={`text-xl font-bold ${
                  isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                }`}
              >
                Přihlašovací údaje
              </h2>
            </div>

            {/* Error */}
            {error && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  isModern
                    ? 'bg-red-500/10 border border-red-500/30'
                    : classicMode === 'light'
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-red-500/20 border border-red-500/30'
                }`}
              >
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className={`text-sm ${isModern ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
              </div>
            )}

            {/* Username */}
            <div className="mb-4">
              <label
                className={`block text-sm font-medium mb-2 ${
                  isModern ? 'text-white/80' : classicMode === 'light' ? 'text-gray-700' : 'text-white/80'
                }`}
              >
                Uživatelské jméno
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    isModern
                      ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500'
                      : classicMode === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 focus:ring-[var(--spsd-red)]'
                      : 'bg-white/10 border-white/20 text-white focus:ring-white'
                  }`}
                  placeholder="Vaše uživatelské jméno"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  isModern ? 'text-white/80' : classicMode === 'light' ? 'text-gray-700' : 'text-white/80'
                }`}
              >
                Heslo
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 ${
                    isModern
                      ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500'
                      : classicMode === 'light'
                      ? 'bg-white border-gray-300 text-gray-900 focus:ring-[var(--spsd-red)]'
                      : 'bg-white/10 border-white/20 text-white focus:ring-white'
                  }`}
                  placeholder="Vaše heslo"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !username || !password}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                isModern
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 disabled:opacity-50'
                  : classicMode === 'light'
                  ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white hover:opacity-90 disabled:opacity-50'
                  : 'bg-white text-[var(--spsd-navy)] hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Připojování...
                </>
              ) : (
                'Připojit účet'
              )}
            </button>

            {/* Info */}
            <p
              className={`mt-4 text-xs text-center ${
                isModern ? 'text-white/50' : classicMode === 'light' ? 'text-gray-500' : 'text-white/60'
              }`}
            >
              Vaše přihlašovací údaje jsou bezpečně uloženy a šifrovány
            </p>
          </form>
        ) : (
          /* Success State */
          <div
            className={`rounded-2xl p-8 border ${
              isModern
                ? 'glass border-white/10'
                : classicMode === 'light'
                ? 'bg-white border-gray-200 shadow-lg'
                : 'bg-white/10 backdrop-blur-sm border-white/20'
            }`}
          >
            <div className="text-center mb-6">
              <CheckCircle2
                className={`w-16 h-16 mx-auto mb-4 ${
                  isModern ? 'text-green-400' : classicMode === 'light' ? 'text-green-600' : 'text-green-400'
                }`}
              />
              <h2
                className={`text-2xl font-bold mb-2 ${
                  isModern ? 'text-white' : classicMode === 'light' ? 'text-[var(--spsd-navy)]' : 'text-white'
                }`}
              >
                Připojeno!
              </h2>
              <p
                className={`text-sm ${
                  isModern ? 'text-white/70' : classicMode === 'light' ? 'text-gray-600' : 'text-white/80'
                }`}
              >
                Váš účet Bakaláři byl úspěšně připojen
              </p>
            </div>

            {/* Fetch All Data Button */}
            <button
              onClick={handleFetchAllData}
              disabled={fetchingData}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 mb-4 ${
                isModern
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 disabled:opacity-50'
                  : classicMode === 'light'
                  ? 'bg-gradient-to-r from-[var(--spsd-red)] to-[var(--spsd-orange)] text-white hover:opacity-90 disabled:opacity-50'
                  : 'bg-white text-[var(--spsd-navy)] hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              {fetchingData ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Stahování dat...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Stáhnout všechna data
                </>
              )}
            </button>

            {/* Data Preview */}
            {fetchedData !== null && (
              <div
                className={`rounded-lg p-4 ${
                  isModern
                    ? 'bg-white/5 border border-white/10'
                    : classicMode === 'light'
                    ? 'bg-gray-50 border border-gray-200'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <p
                  className={`text-sm font-semibold mb-2 ${
                    isModern ? 'text-green-400' : classicMode === 'light' ? 'text-green-600' : 'text-green-400'
                  }`}
                >
                  ✓ Data byla úspěšně stažena
                </p>
                <p
                  className={`text-xs ${
                    isModern ? 'text-white/60' : classicMode === 'light' ? 'text-gray-500' : 'text-white/60'
                  }`}
                >
                  Soubor JSON byl stažen do složky Downloads
                </p>
              </div>
            )}

            <button
              onClick={() => router.push('/dashboard')}
              className={`w-full mt-4 py-2 rounded-lg font-medium transition-all ${
                isModern
                  ? 'bg-white/5 text-white hover:bg-white/10'
                  : classicMode === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Zpět na dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
