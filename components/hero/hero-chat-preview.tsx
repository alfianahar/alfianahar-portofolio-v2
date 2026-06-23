import { AssistantChat } from "@components/chat/assistant-chat";

const sideCards = [
  { label: "Core", value: "Fullstack + AI Engineer", detail: "TypeScript, Python, Golang" },
  { label: "Domain", value: "System Integration", detail: "Webapp, IOT, Robotics Integration" },
];

export function HeroChatPreview() {
  return (
    <div className="relative min-h-[26rem] rounded-[var(--radius-lg)] border-[length:var(--border-bold)] border-[var(--brutal-ink)] bg-[var(--cream)] p-3 shadow-[var(--shadow-hard)] sm:p-4 lg:h-full lg:min-h-0 lg:p-5">
      <div className="absolute -right-3 -top-3 hidden rounded-[var(--radius-md)] border-[length:var(--border-bold)] border-[var(--brutal-ink)] bg-[var(--cream)] px-4 py-3 text-xs font-semibold text-[var(--brutal-ink)] shadow-[var(--shadow-hard-sm)] lg:block">
        AI assistant preview
      </div>

      <AssistantChat
        title="Alfian Assistant"
        description="Fullstack, robotics integration, backend, AI"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about fullstack systems, robotics UI, or AI engineering..."
        className="flex h-full min-h-0 flex-col overflow-hidden"
        headerClassName="mb-3 border-b border-[var(--border)] pb-3 sm:mb-4 sm:pb-4"
        messagesClassName="min-h-0 flex-1 overflow-y-auto space-y-3"
        messageMaxWidthClassName="max-w-[92%]"
        messageClassName="text-xs leading-5 sm:text-sm sm:leading-6"
        userMessageClassName="bg-[var(--text-primary)] text-[var(--background)]"
        assistantMessageClassName="bg-[var(--muted-surface)] text-[var(--text-secondary)]"
        quickActionsClassName="mt-3 gap-2"
        quickActionClassName="px-3 py-1.5 text-[0.7rem]"
        inputBaseClassName="mt-3 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-white px-4 py-3 text-xs text-[var(--text-muted)] sm:text-sm"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {sideCards.map((card) => (
            <div
              key={card.label}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--cream)] px-3 py-2.5"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {card.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{card.value}</p>
              <p className="mt-0.5 hidden text-xs text-[var(--text-muted)] sm:block">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </AssistantChat>
    </div>
  );
}
