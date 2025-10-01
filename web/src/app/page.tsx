'use client';

import { ModernHero } from "@/components/sections/ModernHero";
import { ClassicHero } from "@/components/sections/ClassicHero";
import { ProgramTimeline } from "@/components/sections/ProgramTimeline";
import { ClassicProgramTimeline } from "@/components/sections/ClassicProgramTimeline";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { ClassicSuccessStories } from "@/components/sections/ClassicSuccessStories";
import { CallToAction } from "@/components/sections/CallToAction";
import { ClassicCallToAction } from "@/components/sections/ClassicCallToAction";
import { usePreferences } from "@/contexts/PreferencesContext";

export default function Home() {
  const { theme } = usePreferences();
  
  if (theme === 'modern') {
    return (
      <>
        <ModernHero />
        <ProgramTimeline />
        <SuccessStories />
        <CallToAction />
      </>
    );
  }
  
  return (
    <>
      <ClassicHero />
      <ClassicProgramTimeline />
      <ClassicSuccessStories />
      <ClassicCallToAction />
    </>
  );
}
