import type { ReactNode } from "react";

import { cn } from "#lib/utils";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  className?: string;
  mainClassName?: string;
};

export function AppShell({
  children,
  header,
  sidebar,
  footer,
  className,
  mainClassName,
}: AppShellProps) {
  return (
    <div className={cn("min-h-svh bg-background text-foreground", className)}>
      <div className="flex min-h-svh flex-col">
        {header}

        <div className="flex flex-1">
          {sidebar ? (
            <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
              {sidebar}
            </aside>
          ) : null}

          <main className={cn("min-w-0 flex-1", mainClassName)}>
            {children}
          </main>
        </div>

        {footer}
      </div>
    </div>
  );
}
