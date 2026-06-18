import Image from "next/image";
import anLogo from "../../../public/an-logo.svg";
import { cn } from "../../lib/utils";

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
      src={anLogo}
      alt={alt}
      width={size}
      height={Math.round(size * 0.689)}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
