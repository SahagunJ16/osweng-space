import type { ReactNode } from "react";

import { AppShell } from "@osweng-space/ui/components/layout/app-shell";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteSidebar } from "@/components/layout/site-sidebar";
import { ThemeProvider } from "@osweng-space/ui/components/providers/theme-provider";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@osweng-space/ui/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export { metadata } from "@/lib/metadata";
export { viewport } from "@/lib/viewport";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppShell
            header={<SiteHeader />}
            footer={<SiteFooter />}
            sidebar={<SiteSidebar />}
          >
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
