import Link from "next/link";
import { ThemeToggle } from "@repo/ui/components/theme/theme-toggle";

import { siteConfig } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
