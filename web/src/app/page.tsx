import { ModernHero } from "@/components/sections/ModernHero";
import { ProgramTimeline } from "@/components/sections/ProgramTimeline";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <ModernHero />
      <ProgramTimeline />
      <SuccessStories />
      <CallToAction />
    </>
  );
}
