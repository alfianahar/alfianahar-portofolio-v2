import { cn } from "@lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "brutal";
type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-(--text-primary) text-(--background) shadow-(--shadow-soft)",
  secondary:
    "border border-(--border) bg-(--surface-elevated) text-(--text-primary) backdrop-blur-xl",
  ghost: "text-(--text-secondary) hover:text-(--text-primary)",
  brutal:
    "brutal-press border-bold border-(--brutal-ink) bg-(--cream) text-(--brutal-ink) shadow-(--shadow-hard)",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--text-primary) disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}
