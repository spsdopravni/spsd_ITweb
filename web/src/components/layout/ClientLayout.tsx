'use client';

import React, { useState, useEffect } from 'react';
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
  const [showWelcome, setShowWelcome] = useState(false);

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
              <div className="hidden min-[550px]:block">
                <DynamicIsland />
              </div>
              <MobileBurgerMenu />
              <main>
                {children}
              </main>
              <ModernFooter />
            </UnifiedBackground>
          ) : (
            <div className={`min-h-screen ${getBackgroundClass()}`}>
              <div className="hidden min-[550px]:block">
                <DynamicIsland />
              </div>
              <MobileBurgerMenu />
              <main className={`classic-theme ${classicMode === 'dark' ? 'dark' : ''}`}>
                {children}
              </main>
              <ClassicFooter />
            </div>
          )}
        </ThemeTransition>
      )}
    </>
  );
};