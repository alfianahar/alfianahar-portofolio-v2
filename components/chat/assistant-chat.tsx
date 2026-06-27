import { useState, useRef, useCallback } from "react";
import { chatMessages, chatQuickActions } from "@content/chatbot";
import type { ChatMessage, ChatQuickAction } from "@app-types/content";
import { ChatPanel } from "./chat-panel";

type AssistantChatProps = {
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  messagesClassName?: string;
  messageMaxWidthClassName?: string;
  messageClassName?: string;
  userMessageClassName?: string;
  assistantMessageClassName?: string;
  quickActionsClassName?: string;
  quickActionClassName?: string;
  inputBaseClassName?: string;
};

function createMessage(
  role: ChatMessage["role"],
  content: string,
  actions?: ChatMessage["actions"],
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    content,
    actions,
  };
}

function parseSSEChunk(chunk: string): Array<Record<string, unknown>> {
  const events: Array<Record<string, unknown>> = [];
  const lines = chunk.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.startsWith("data: ")) continue;

    try {
      events.push(JSON.parse(trimmed.slice(6)));
    } catch {
      // skip malformed
    }
  }

  return events;
}

function drainSSEBuffer(buffer: string): { events: Array<Record<string, unknown>>; rest: string } {
  const lines = buffer.split("\n");
  const rest = lines.pop() ?? "";
  const events = parseSSEChunk(lines.join("\n"));
  return { events, rest };
}

const contactFallbackActions = [
  { label: "Send me a message", href: "https://wa.me/6285725359530" },
  { label: "Email Alfian", href: "mailto:alfian.aswinda@gmail.com" },
];

export function AssistantChat({
  title,
  description,
  inputLabel,
  inputPlaceholder,
  children,
  className,
  headerClassName,
  messagesClassName,
  messageMaxWidthClassName,
  messageClassName,
  userMessageClassName,
  assistantMessageClassName,
  quickActionsClassName,
  quickActionClassName,
  inputBaseClassName,
}: AssistantChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const appendFallback = useCallback(() => {
    setMessages((current) => [
      ...current,
      createMessage(
        "assistant",
        "The assistant is unavailable right now. Send Alfian a message directly instead.",
        contactFallbackActions,
      ),
    ]);
  }, []);

  async function submitPrompt(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed || isSubmitting) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsSubmitting(true);

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          stream: true,
        }),
        signal: abort.signal,
      });

      if (!response.ok || !response.body) {
        appendFallback();
        return;
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("application/json")) {
        const data = (await response.json()) as {
          reply?: string;
          actions?: ChatMessage["actions"];
        };
        setMessages((current) => [
          ...current,
          createMessage("assistant", data.reply ?? "", data.actions ?? []),
        ]);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const streamingId = `assistant-${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setMessages((current) => [...current, { id: streamingId, role: "assistant", content: "" }]);

      let buffer = "";
      let hasContent = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { events, rest } = drainSSEBuffer(buffer);
        buffer = rest;

        for (const event of events) {
          if (event.delta && typeof event.delta === "string") {
            hasContent = true;
            setMessages((current) =>
              current.map((msg) =>
                msg.id === streamingId ? { ...msg, content: msg.content + event.delta } : msg,
              ),
            );
          } else if (event.reply && typeof event.reply === "string") {
            hasContent = true;
            setMessages((current) =>
              current.map((msg) =>
                msg.id === streamingId
                  ? {
                      ...msg,
                      content: event.reply as string,
                      actions: (event.actions as ChatMessage["actions"]) ?? [],
                    }
                  : msg,
              ),
            );
          } else if (event.error) {
            setMessages((current) => current.filter((msg) => msg.id !== streamingId));
            appendFallback();
          }
        }
      }

      if (!hasContent) {
        setMessages((current) => current.filter((msg) => msg.id !== streamingId));
        appendFallback();
      }
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      appendFallback();
    } finally {
      setIsSubmitting(false);
      abortRef.current = null;
    }
  }

  function handleQuickAction(action: ChatQuickAction) {
    if (action.href) return;

    if (action.label === "Show Work") {
      setMessages((current) => [
        ...current,
        createMessage("user", action.prompt),
        createMessage("assistant", "You can check out Alfian's selected work here:", [
          { label: "View Work", href: "/work" },
        ]),
      ]);
      return;
    }

    if (action.label === "Discuss new project") {
      setMessages((current) => [
        ...current,
        createMessage("user", action.prompt),
        createMessage(
          "assistant",
          "Happy to hear that! Let's discuss your project. Reach out via:",
          contactFallbackActions,
        ),
      ]);
      return;
    }

    void submitPrompt(action.prompt);
  }

  return (
    <ChatPanel
      title={title}
      description={isSubmitting ? "Thinking from resume context..." : description}
      messages={messages}
      quickActions={chatQuickActions}
      inputLabel={inputLabel}
      inputPlaceholder={inputPlaceholder}
      className={className}
      headerClassName={headerClassName}
      messagesClassName={messagesClassName}
      messageMaxWidthClassName={messageMaxWidthClassName}
      messageClassName={messageClassName}
      userMessageClassName={userMessageClassName}
      assistantMessageClassName={assistantMessageClassName}
      quickActionsClassName={quickActionsClassName}
      quickActionClassName={quickActionClassName}
      quickActionsDisabled={isSubmitting}
      onQuickActionSelect={handleQuickAction}
      inputSlot={
        <form
          className={inputBaseClassName}
          onSubmit={(event) => {
            event.preventDefault();
            void submitPrompt(input);
          }}
        >
          <input
            aria-label={inputLabel}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={inputPlaceholder}
            className="min-w-0 flex-1 bg-transparent text-(--text-primary) outline-none placeholder:text-(--text-muted)"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || input.trim().length === 0}
            className="rounded-full bg-(--text-primary) px-3 py-1.5 text-xs font-semibold text-(--background) transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            {isSubmitting ? "..." : "Send"}
          </button>
        </form>
      }
    >
      {children}
    </ChatPanel>
  );
}
