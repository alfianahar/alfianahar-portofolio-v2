import { chatMessages, chatQuickActions } from "@content/chatbot";
import { ChatPanel } from "@components/chat/chat-panel";

const sideCards = [
  { label: "Core", value: "Fullstack", detail: "Next.js + Golang" },
  { label: "Domain", value: "Robotics UI", detail: "ROS + realtime ops" },
  { label: "Backend", value: "APIs", detail: "REST, GraphQL, gRPC" },
  { label: "Now", value: "AI Engineering", detail: "Automation systems" },
];

export function HeroChatPreview() {
  return (
    <div className="relative min-h-0 h-full rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-[0_32px_120px_rgba(20,39,62,0.16)] backdrop-blur-2xl sm:p-4 lg:p-5">
      <div className="absolute -right-3 -top-3 hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-medium text-[var(--text-secondary)] shadow-[var(--shadow-soft)] lg:block">
        AI assistant preview
      </div>

      <ChatPanel
        title="Alfian Assistant"
        description="Fullstack, robotics, backend, AI"
        messages={chatMessages}
        quickActions={chatQuickActions}
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about fullstack systems, robotics UI, or AI engineering..."
        className="flex h-full min-h-0 flex-col overflow-hidden"
        headerClassName="mb-3 border-b border-[var(--border)] pb-3 sm:mb-4 sm:pb-4"
        messagesClassName="min-h-0 flex-1 overflow-hidden space-y-3"
        messageMaxWidthClassName="max-w-[92%]"
        messageClassName="text-xs leading-5 sm:text-sm sm:leading-6"
        userMessageClassName="bg-[var(--text-primary)] text-[var(--background)]"
        assistantMessageClassName="bg-[var(--muted-surface)] text-[var(--text-secondary)]"
        quickActionsClassName="mt-3 gap-2"
        quickActionClassName="px-3 py-1.5 text-[0.7rem]"
        inputBaseClassName="mt-3 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-xs text-[var(--text-muted)] sm:text-sm"
      >
        <div className="grid gap-2 sm:grid-cols-2">
          {sideCards.map((card) => (
            <div key={card.label} className="rounded-2xl bg-[var(--muted-surface)] px-3 py-2.5">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {card.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{card.value}</p>
              <p className="mt-0.5 hidden text-xs text-[var(--text-muted)] sm:block">{card.detail}</p>
            </div>
          ))}
        </div>
      </ChatPanel>
    </div>
  );
}
