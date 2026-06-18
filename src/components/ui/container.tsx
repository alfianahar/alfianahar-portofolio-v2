import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "default" | "wide";
};

const sizes = {
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-6 sm:px-8", sizes[size], className)} {...props} />;
}
