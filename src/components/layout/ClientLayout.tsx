'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ClassicFooter } from "@/components/layout/ClassicFooter";
import { DynamicIsland } from "@/components/layout/DynamicIsland";
import { MobileBurgerMenu } from "@/components/layout/MobileBurgerMenu";
import { WelcomeDialog } from "@/components/dialogs/WelcomeDialog";
import { usePreferences } from "@/contexts/PreferencesContext";
import { SupportedLanguage } from "@/contexts/LanguageContext";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { hasSeenWelcome, savePreferences } = usePreferences();
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(false);

  const isDashboard = pathname?.startsWith('/dashboard') ?? false;
  const isLogin = pathname?.startsWith('/login') ?? false;
  const isDashboardOrLogin = isDashboard || isLogin;

  useEffect(() => {
    setShowWelcome(!hasSeenWelcome);
  }, [hasSeenWelcome]);

  const handleWelcomeComplete = (preferences: { language: SupportedLanguage }) => {
    savePreferences(preferences);
    setShowWelcome(false);
  };

  return (
    <>
      {showWelcome && <WelcomeDialog onComplete={handleWelcomeComplete} />}
      {!showWelcome && (
        <div style={{ minHeight: '100vh', background: '#fafaf7' }}>
          {!isDashboard && (
            <div className="hidden min-[1024px]:block">
              <DynamicIsland />
            </div>
          )}
          {!isDashboard && <MobileBurgerMenu />}
          <main>{children}</main>
          {!isDashboardOrLogin && <ClassicFooter />}
        </div>
      )}
    </>
  );
};
