'use client';

import React from 'react';
import { ModernFooter } from "@/components/layout/ModernFooter";
import { DynamicIsland } from "@/components/layout/DynamicIsland";
import { MobileBurgerMenu } from "@/components/layout/MobileBurgerMenu";
import { UnifiedBackground } from "@/components/ui/UnifiedBackground";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
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
  );
};