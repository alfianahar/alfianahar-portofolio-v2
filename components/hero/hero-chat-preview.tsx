import { chatMessages, chatQuickActions } from "@content/chatbot";
import { ChatPanel } from "@components/chat/chat-panel";

const sideCards = [
  { label: "Profile", value: "AI + Web" },
  { label: "Mode", value: "Curated" },
  { label: "Response", value: "Clear" },
];

export function HeroChatPreview() {
  return (
    <div className="relative rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-[0_32px_120px_rgba(20,39,62,0.16)] backdrop-blur-2xl sm:p-5">
      <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-xs font-medium text-[var(--text-secondary)] shadow-[var(--shadow-soft)] sm:block">
        Portfolio assistant preview
      </div>

      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, real content"
        messages={chatMessages}
        quickActions={chatQuickActions}
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
        headerClassName="border-b border-[var(--border)] pb-4"
        userMessageClassName="bg-[var(--text-primary)] text-[var(--background)]"
        assistantMessageClassName="bg-[var(--muted-surface)] text-[var(--text-secondary)]"
        inputClassName="bg-white"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {sideCards.map((card) => (
            <div key={card.label} className="rounded-2xl bg-[var(--muted-surface)] px-3 py-3">
              <p className="text-[0.68rem] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {card.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">{card.value}</p>
            </div>
          ))}
        </div>
      </ChatPanel>
    </div>
  );
}
