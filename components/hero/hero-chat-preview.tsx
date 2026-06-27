import { AssistantChat } from "@components/chat/assistant-chat";

const sideCards = [
  { label: "Core", value: "Fullstack + AI Engineer", detail: "TypeScript, Python, Golang" },
  { label: "Domain", value: "System Integration", detail: "Webapp, IOT, Robotics Integration" },
];

export function HeroChatPreview() {
  return (
    <div className="relative min-h-[26rem] rounded-lg border-bold border-(--brutal-ink) bg-(--cream) p-3 shadow-(--shadow-hard) sm:p-4 lg:h-[calc(100svh-8rem)] lg:min-h-0 lg:p-5">
      <div className="absolute -right-3 -top-3 hidden rounded-md border-bold border-(--brutal-ink) bg-(--cream) px-4 py-3 text-xs font-semibold text-(--brutal-ink) shadow-(--shadow-hard-sm) lg:block">
        AI assistant preview
      </div>

      <AssistantChat
        title="Alfian Assistant"
        description="Fullstack, robotics integration, backend, AI"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about fullstack systems, robotics UI, or AI engineering..."
        className="flex h-full min-h-0 flex-col overflow-hidden"
        headerClassName="mb-3 border-b border-(--border) pb-3 sm:mb-4 sm:pb-4"
        messagesClassName="min-h-0 flex-1 overflow-y-auto space-y-3"
        messageMaxWidthClassName="max-w-[92%]"
        messageClassName="text-xs leading-5 sm:text-sm sm:leading-6"
        userMessageClassName="bg-(--text-primary) text-(--background)"
        assistantMessageClassName="bg-(--muted-surface) text-(--text-secondary)"
        quickActionsClassName="mt-3 gap-2"
        quickActionClassName="px-3 py-1.5 text-[0.7rem]"
        inputBaseClassName="mt-3 flex items-center gap-2 rounded-md border border-(--border) bg-white px-4 py-3 text-xs text-(--text-muted) sm:text-sm"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {sideCards.map((card) => (
            <div
              key={card.label}
              className="rounded-md border border-(--border) bg-(--cream) px-3 py-2.5"
            >
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-(--text-muted)">
                {card.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-(--text-primary)">{card.value}</p>
              <p className="mt-0.5 hidden text-xs text-(--text-muted) sm:block">
                {card.detail}
              </p>
            </div>
          ))}
        </div>
      </AssistantChat>
    </div>
  );
}
