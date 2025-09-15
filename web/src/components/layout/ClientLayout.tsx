'use client';

import React from 'react';
import { ModernFooter } from "@/components/layout/ModernFooter";
import { FloatingActionMenu } from "@/components/ui/FloatingActionMenu";
import { DynamicIsland } from "@/components/layout/DynamicIsland";
import { MobileBurgerMenu } from "@/components/layout/MobileBurgerMenu";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="hidden min-[550px]:block">
        <DynamicIsland />
      </div>
      <MobileBurgerMenu />
      <main>
        {children}
      </main>
      <FloatingActionMenu />
      <ModernFooter />
    </>
  );
};