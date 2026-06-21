import type { ChatMessage as ChatMessageType } from "@app-types/content";
import { cn } from "@lib/utils";
import { ChatMarkdown } from "./chat-markdown";

type ChatMessageProps = {
  message: ChatMessageType;
  maxWidthClassName?: string;
  className?: string;
  userClassName?: string;
  assistantClassName?: string;
};

export function ChatMessage({
  message,
  maxWidthClassName = "max-w-[88%]",
  className,
  userClassName,
  assistantClassName,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        maxWidthClassName,
        "rounded-2xl px-4 py-3 text-sm leading-6",
        message.role === "user" ? cn("ml-auto", userClassName) : assistantClassName,
        className,
      )}
    >
      <ChatMarkdown content={message.content} />
      {message.actions?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {message.actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
               className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--text-primary)]"
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
