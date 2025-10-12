'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTheme } from '@/lib/theme/useTheme';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = usePreferences();
  const { classicMode } = useTheme();
  const router = useRouter();

  const isModern = theme === 'modern';

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking auth
  if (isLoading || !isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isModern
            ? 'bg-gradient-to-br from-black via-gray-900 to-black'
            : classicMode === 'light'
            ? 'bg-gray-50'
            : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
        }`}
      >
        <div
          className={`text-lg ${
            isModern
              ? 'text-white'
              : classicMode === 'light'
              ? 'text-[var(--spsd-navy)]'
              : 'text-white'
          }`}
        >
          Načítání...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isModern
          ? 'bg-gradient-to-br from-black via-gray-900 to-black'
          : classicMode === 'light'
          ? 'bg-gray-50'
          : 'bg-gradient-to-r from-[var(--spsd-navy)] to-[var(--spsd-navy-light)]'
      }`}
    >
      {/* Background decoration for modern theme */}
      {isModern && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
                  i % 3 === 0
                    ? 'rounded-full gradient-accent'
                    : i % 3 === 1
                    ? 'rotate-45 gradient-warm'
                    : 'rounded-sm gradient-cool'
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

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="ml-64 min-h-screen relative z-10">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
