import { MainContainer } from "@osweng-space/ui/components/layout/main-container";

import { AppGrid } from "@/components/home/app-grid";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <MainContainer className="flex flex-col gap-10 py-10">
      <HeroSection />
      <AppGrid />
    </MainContainer>
  );
}
