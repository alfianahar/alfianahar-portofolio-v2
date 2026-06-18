import { LogoMark } from "../brand/logo-mark";
import { cn } from "../../lib/utils";

type PageLoaderProps = {
  label?: string;
  variant?: "light" | "dark";
};

export function PageLoader({ label = "Preparing interface", variant = "light" }: PageLoaderProps) {
  return (
    <div
      data-theme={variant === "dark" ? "dark" : undefined}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 grid min-h-dvh place-items-center overflow-hidden bg-[var(--background)] text-[var(--text-primary)]"
    >
      <div className="page-loader__panel" aria-hidden="true" />
      <div className="page-loader__mark relative z-10 flex flex-col items-center gap-4">
        <LogoMark priority size={56} />
        <p
          className={cn("text-sm font-medium tracking-[0.24em] text-[var(--text-muted)] uppercase")}
        >
          {label}
        </p>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
