'use client';

import React from 'react';
import { ModernFooter } from "@/components/layout/ModernFooter";
import { FloatingActionMenu } from "@/components/ui/FloatingActionMenu";
import { DynamicIsland } from "@/components/layout/DynamicIsland";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <DynamicIsland />
      <main>
        {children}
      </main>
      <FloatingActionMenu />
      <ModernFooter />
    </>
  );
};