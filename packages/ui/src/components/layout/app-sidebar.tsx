import type { ComponentProps } from "react";

import { cn } from "#lib/utils";

type AppSidebarProps = ComponentProps<"nav">;

export function AppSidebar({ className, ...props }: AppSidebarProps) {
  return (
    <nav
      className={cn("flex h-full flex-col gap-1 p-3", className)}
      {...props}
    />
  );
}
