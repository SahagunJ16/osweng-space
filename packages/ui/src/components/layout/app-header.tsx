import type { ComponentProps } from "react";

import { cn } from "#lib/utils";

type AppHeaderProps = ComponentProps<"header">;

export function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header
      className={cn("border-b border-border bg-background/95", className)}
      {...props}
    />
  );
}
