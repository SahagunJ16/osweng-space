import Link from "next/link";

import { AppHeader } from "@repo/ui/components/layout/app-header";
import { MainContainer } from "@repo/ui/components/layout/main-container";
import { ThemeToggle } from "@repo/ui/components/theme/theme-toggle";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <AppHeader>
      <MainContainer className="flex items-center justify-between py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <ThemeToggle />
      </MainContainer>
    </AppHeader>
  );
}
