import type { ChatQuickAction } from "@app-types/content";
import { cn } from "@lib/utils";

type ChatQuickActionsProps = {
  actions: ChatQuickAction[];
  mode?: "button" | "chip";
  className?: string;
  itemBaseClassName?: string;
  itemClassName?: string;
};

const defaultButtonClassName =
  "rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]";

const defaultChipClassName =
  "rounded-full border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]";

export function ChatQuickActions({
  actions,
  mode = "button",
  className,
  itemBaseClassName,
  itemClassName,
}: ChatQuickActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  const defaultItemClassName = mode === "button" ? defaultButtonClassName : defaultChipClassName;

  return (
    <div className={cn("mt-5 flex flex-wrap gap-2", className)}>
      {actions.map((action) =>
        mode === "button" ? (
          <button
            key={action.prompt}
            type="button"
            className={cn(itemBaseClassName ?? defaultItemClassName, itemClassName)}
          >
            {action.label}
          </button>
        ) : (
          <span
            key={action.prompt}
            className={cn(itemBaseClassName ?? defaultItemClassName, itemClassName)}
          >
            {action.label}
          </span>
        ),
      )}
    </div>
  );
}
