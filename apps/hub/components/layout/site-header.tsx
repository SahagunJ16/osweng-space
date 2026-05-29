import Link from "next/link";

import { AppHeader, PageContainer } from "@osweng-space/ui/components/layout";
import { ThemeToggle } from "@osweng-space/ui/components/theme/theme-toggle";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <AppHeader>
      <PageContainer className="flex h-14 items-center justify-between py-0">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <ThemeToggle />
      </PageContainer>
    </AppHeader>
  );
}
