import type { ChatQuickAction } from "@app-types/content";
import { cn } from "@lib/utils";

type ChatQuickActionsProps = {
  actions: ChatQuickAction[];
  mode?: "button" | "chip";
  className?: string;
  itemBaseClassName?: string;
  itemClassName?: string;
  onActionSelect?: (action: ChatQuickAction) => void;
  disabled?: boolean;
};

const defaultButtonClassName =
  "rounded-sm border border-(--border) bg-white px-3 py-2 text-xs font-medium text-(--text-secondary) transition hover:border-(--text-primary) hover:text-(--text-primary)";

const defaultChipClassName =
  "rounded-sm border border-(--border) px-3 py-2 text-xs font-medium text-(--text-secondary)";

export function ChatQuickActions({
  actions,
  mode = "button",
  className,
  itemBaseClassName,
  itemClassName,
  onActionSelect,
  disabled,
}: ChatQuickActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  const defaultItemClassName = mode === "button" ? defaultButtonClassName : defaultChipClassName;

  return (
    <div className={cn("mt-5 flex flex-wrap gap-2", className)}>
      {actions.map((action) => {
        const key = action.href ?? action.prompt;
        const classes = cn(itemBaseClassName ?? defaultItemClassName, itemClassName);

        if (mode === "chip") {
          return (
            <span key={key} className={classes}>
              {action.label}
            </span>
          );
        }

        if (action.href) {
          return (
            <a key={key} href={action.href} className={cn(classes, "inline-block no-underline")}>
              {action.label}
            </a>
          );
        }

        return (
          <button
            key={key}
            type="button"
            className={classes}
            onClick={() => onActionSelect?.(action)}
            disabled={disabled}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
