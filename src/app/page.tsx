import { ClassicHero } from "@/components/sections/ClassicHero";
import { ClassicProgramTimeline } from "@/components/sections/ClassicProgramTimeline";
import { ClassicCallToAction } from "@/components/sections/ClassicCallToAction";

export default function Home() {
  return (
    <>
      <ClassicHero />
      <ClassicProgramTimeline />
      <ClassicCallToAction />
    </>
  );
}
