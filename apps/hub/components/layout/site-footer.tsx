import { AppFooter } from "@repo/ui/components/layout/app-footer";
import { MainContainer } from "@repo/ui/components/layout/main-container";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <AppFooter>
      <MainContainer className="py-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}
      </MainContainer>
    </AppFooter>
  );
}
