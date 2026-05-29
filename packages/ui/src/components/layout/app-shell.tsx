import type { ReactNode } from "react";

import { cn } from "#lib/utils";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AppShell({
  children,
  header,
  sidebar,
  footer,
  className,
}: AppShellProps) {
  return (
    <div className={cn("min-h-svh bg-background text-foreground", className)}>
      <div className="flex min-h-svh flex-col">
        {header}

        <div className="flex flex-1">
          {sidebar}

          <main className="min-w-0 flex-1">{children}</main>
        </div>

        {footer}
      </div>
    </div>
  );
}
