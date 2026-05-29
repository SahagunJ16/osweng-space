import { AppGrid } from "@/components/home/app-grid";
import { HeroSection } from "@/components/home/hero-section";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-10">
      <HeroSection />
      <AppGrid />
    </div>
  );
}
