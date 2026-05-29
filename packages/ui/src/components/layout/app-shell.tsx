import type { ComponentProps } from "react";

import { cn } from "~/lib/utils";

type AppShellProps = ComponentProps<"div">;

export function AppShell({ className, ...props }: AppShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground",
        className,
      )}
      {...props}
    />
  );
}
