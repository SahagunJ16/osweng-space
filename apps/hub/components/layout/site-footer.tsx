import { AppFooter, PageContainer } from "@osweng-space/ui/components/layout";

import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <AppFooter>
      <PageContainer className="flex h-14 items-center py-0 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}
      </PageContainer>
    </AppFooter>
  );
}
