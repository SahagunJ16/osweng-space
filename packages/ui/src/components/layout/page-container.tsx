import type { ComponentProps } from "react";

import { cn } from "#lib/utils";

type PageContainerProps = ComponentProps<"div">;

export function PageContainer({ className, ...props }: PageContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  );
}
