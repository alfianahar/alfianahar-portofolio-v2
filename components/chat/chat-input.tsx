import { cn } from "@lib/utils";

type ChatInputProps = {
  label: string;
  placeholder: string;
  baseClassName?: string;
  className?: string;
  indicatorBaseClassName?: string;
  indicatorClassName?: string;
};

const defaultInputClassName =
  "mt-5 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]";

const defaultIndicatorClassName = "h-2 w-2 rounded-full bg-[var(--text-muted)]";

export function ChatInput({
  label,
  placeholder,
  baseClassName,
  className,
  indicatorBaseClassName,
  indicatorClassName,
}: ChatInputProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(baseClassName ?? defaultInputClassName, className)}
    >
      <span
        className={cn(indicatorBaseClassName ?? defaultIndicatorClassName, indicatorClassName)}
      />
      {placeholder}
    </div>
  );
}
