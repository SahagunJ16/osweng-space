import Link from "next/link";

import { AppSidebar } from "@osweng-space/ui/components/layout";

const navItems = [
  { title: "Dashboard", href: "/" },
  { title: "Links", href: "/links" },
  { title: "Tools", href: "/tools" },
];

export function SiteSidebar() {
  return (
    <AppSidebar>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {item.title}
        </Link>
      ))}
    </AppSidebar>
  );
}
