'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ModernFooter } from "@/components/layout/ModernFooter";
import { ClassicFooter } from "@/components/layout/ClassicFooter";
import { DynamicIsland } from "@/components/layout/DynamicIsland";
import { MobileBurgerMenu } from "@/components/layout/MobileBurgerMenu";
import { UnifiedBackground } from "@/components/ui/UnifiedBackground";
import { ThemeTransition } from "@/components/ui/ThemeTransition";
import { WelcomeDialog } from "@/components/dialogs/WelcomeDialog";
import { usePreferences } from "@/contexts/PreferencesContext";
import { SupportedLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/lib/theme/useTheme";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { hasSeenWelcome, savePreferences, theme, classicMode } = usePreferences();
  const { getBackgroundClass } = useTheme();
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(false);

  // Check if we're on a dashboard page (no footer/dynamic island/burger menu)
  const isDashboard = pathname?.startsWith('/dashboard') ?? false;
  const isLogin = pathname?.startsWith('/login') ?? false;
  // Check if we're on dashboard or login page (no footer only)
  const isDashboardOrLogin = isDashboard || isLogin;

  useEffect(() => {
    setShowWelcome(!hasSeenWelcome);
  }, [hasSeenWelcome]);

  const handleWelcomeComplete = (preferences: { theme: 'modern' | 'classic'; language: SupportedLanguage; classicMode?: 'light' | 'dark' }) => {
    savePreferences(preferences);
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && (
        <WelcomeDialog onComplete={handleWelcomeComplete} />
      )}
      {!showWelcome && (
        <ThemeTransition>
          {theme === 'modern' ? (
            <UnifiedBackground>
              {!isDashboard && (
                <div className="hidden min-[1024px]:block">
                  <DynamicIsland />
                </div>
              )}
              {!isDashboard && <MobileBurgerMenu />}
              <main>
                {children}
              </main>
              {!isDashboardOrLogin && <ModernFooter />}
            </UnifiedBackground>
          ) : (
            <div className={`min-h-screen ${getBackgroundClass()}`}>
              {!isDashboard && (
                <div className="hidden min-[1024px]:block">
                  <DynamicIsland />
                </div>
              )}
              {!isDashboard && <MobileBurgerMenu />}
              <main className={`classic-theme ${classicMode === 'dark' ? 'dark' : ''}`}>
                {children}
              </main>
              {!isDashboardOrLogin && <ClassicFooter />}
            </div>
          )}
        </ThemeTransition>
      )}
    </>
  );
};