import { PageContainer } from "@osweng-space/ui/components/layout";

import { AppGrid } from "@/components/home/app-grid";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <PageContainer className="flex flex-col gap-10 py-10">
      <HeroSection />
      <AppGrid />
    </PageContainer>
  );
}
