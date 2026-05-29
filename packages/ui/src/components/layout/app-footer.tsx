import type { ComponentProps } from "react";

import { cn } from "#lib/utils";

type AppFooterProps = ComponentProps<"footer">;

export function AppFooter({ className, ...props }: AppFooterProps) {
  return (
    <footer
      className={cn("border-t border-border bg-background", className)}
      {...props}
    />
  );
}
