import type { ChatMessage as ChatMessageType } from "@app-types/content";
import { cn } from "@lib/utils";

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
      {message.content}
    </div>
  );
}
