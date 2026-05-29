import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-4 text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
