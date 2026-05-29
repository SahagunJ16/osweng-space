import type { ReactNode } from "react";

import { AppShell } from "@osweng-space/ui/components/layout/app-shell";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@osweng-space/ui/components/providers/theme-provider";

import "./globals.css";

export { metadata } from "@/lib/metadata";
export { viewport } from "@/lib/viewport";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
