import type { ComponentProps } from "react";

import { cn } from "#lib/utils";

type AppHeaderProps = ComponentProps<"header">;

export function AppHeader({ className, ...props }: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
      {...props}
    />
  );
}
