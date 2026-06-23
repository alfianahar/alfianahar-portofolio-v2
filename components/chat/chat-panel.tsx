import type { ReactNode } from "react";
import type { ChatMessage as ChatMessageType, ChatQuickAction } from "@app-types/content";
import { cn } from "@lib/utils";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { ChatQuickActions } from "./chat-quick-actions";

type ChatPanelProps = {
  title: string;
  description: string;
  messages: ChatMessageType[];
  quickActions: ChatQuickAction[];
  inputLabel: string;
  inputPlaceholder: string;
  avatar?: string | null;
  statusLabel?: string;
  quickActionMode?: "button" | "chip";
  framed?: boolean;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  avatarClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  statusClassName?: string;
  statusIndicatorClassName?: string;
  messagesClassName?: string;
  messageMaxWidthClassName?: string;
  messageClassName?: string;
  userMessageClassName?: string;
  assistantMessageClassName?: string;
  quickActionsClassName?: string;
  quickActionBaseClassName?: string;
  quickActionClassName?: string;
  inputBaseClassName?: string;
  inputClassName?: string;
  inputIndicatorBaseClassName?: string;
  inputIndicatorClassName?: string;
  inputSlot?: ReactNode;
  onQuickActionSelect?: (action: ChatQuickAction) => void;
  quickActionsDisabled?: boolean;
};

export function ChatPanel({
  title,
  description,
  messages,
  quickActions,
  inputLabel,
  inputPlaceholder,
  avatar = "AN",
  statusLabel,
  quickActionMode = "button",
  framed = true,
  children,
  className,
  headerClassName,
  avatarClassName,
  titleClassName,
  descriptionClassName,
  statusClassName,
  statusIndicatorClassName,
  messagesClassName,
  messageMaxWidthClassName,
  messageClassName,
  userMessageClassName,
  assistantMessageClassName,
  quickActionsClassName,
  quickActionBaseClassName,
  quickActionClassName,
  inputBaseClassName,
  inputClassName,
  inputIndicatorBaseClassName,
  inputIndicatorClassName,
  inputSlot,
  onQuickActionSelect,
  quickActionsDisabled,
}: ChatPanelProps) {
  return (
    <div
      className={cn(
        framed && "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5",
        className,
      )}
    >
      <div className={cn("mb-5 flex items-center justify-between gap-4", headerClassName)}>
        <div className="flex items-center gap-3">
          {avatar ? (
            <div
              className={cn(
                "grid size-11 place-items-center rounded-[var(--radius-md)] bg-[var(--text-primary)] text-sm font-semibold text-[var(--background)]",
                avatarClassName,
              )}
            >
              {avatar}
            </div>
          ) : null}
          <div>
            <p className={cn("text-sm font-semibold text-[var(--text-primary)]", titleClassName)}>
              {title}
            </p>
            <p className={cn("text-xs text-[var(--text-muted)]", descriptionClassName)}>
              {description}
            </p>
          </div>
        </div>

        {statusLabel ? (
          <div
            className={cn(
              "flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200",
              statusClassName,
            )}
          >
            <span className={cn("size-2 rounded-full bg-emerald-300", statusIndicatorClassName)} />
            {statusLabel}
          </div>
        ) : (
          <div
            aria-hidden="true"
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.6)]",
              statusClassName,
            )}
          />
        )}
      </div>

      {children}

      <div className={cn(children ? "mt-5" : undefined, "space-y-3", messagesClassName)}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            maxWidthClassName={messageMaxWidthClassName}
            className={messageClassName}
            userClassName={userMessageClassName}
            assistantClassName={assistantMessageClassName}
          />
        ))}
      </div>

      <ChatQuickActions
        actions={quickActions}
        mode={quickActionMode}
        className={quickActionsClassName}
        itemBaseClassName={quickActionBaseClassName}
        itemClassName={quickActionClassName}
        onActionSelect={onQuickActionSelect}
        disabled={quickActionsDisabled}
      />

      {inputSlot ?? (
        <ChatInput
          label={inputLabel}
          placeholder={inputPlaceholder}
          baseClassName={inputBaseClassName}
          className={inputClassName}
          indicatorBaseClassName={inputIndicatorBaseClassName}
          indicatorClassName={inputIndicatorClassName}
        />
      )}
    </div>
  );
}
