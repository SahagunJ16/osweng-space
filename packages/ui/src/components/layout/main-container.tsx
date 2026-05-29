import type { ComponentProps } from "react";

import { cn } from "~/lib/utils";

type MainContainerProps = ComponentProps<"div">;

export function MainContainer({ className, ...props }: MainContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-6", className)}
      {...props}
    />
  );
}
