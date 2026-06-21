import { Image } from "@components/ui/next-image";
import { cn } from "@lib/utils";

type LogoMarkProps = {
  alt?: string;
  className?: string;
  priority?: boolean;
  size?: number;
};

export function LogoMark({
  alt = "Alfian Nahar logo",
  className,
  priority = false,
  size = 48,
}: LogoMarkProps) {
  return (
    <Image
      src="/an-logo.svg"
      alt={alt}
      width={size}
      height={Math.round(size * 0.689)}
      priority={priority}
      style={{ width: size, height: "auto" }}
      className={cn("h-auto w-auto", className)}
    />
  );
}
