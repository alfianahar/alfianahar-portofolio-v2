import { chatMessages, chatQuickActions } from "@content/chatbot";
import { ChatPanel } from "@components/chat/chat-panel";

export function BioChatPreview() {
  return (
    <section
      className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl sm:p-6"
      aria-label="Assistant preview"
    >
      <ChatPanel
        title="Alfian Assistant"
        description="Static preview, curated answers"
        messages={chatMessages}
        quickActions={chatQuickActions.slice(0, 2)}
        quickActionMode="chip"
        inputLabel="Ask Alfian Assistant"
        inputPlaceholder="Ask about projects, skills, or collaboration..."
        avatar={null}
        statusLabel="Preview"
        framed={false}
        messageMaxWidthClassName="max-w-[90%]"
        userMessageClassName="bg-white text-[#14273e]"
        assistantMessageClassName="bg-white/[0.08] text-[var(--text-secondary)]"
        quickActionBaseClassName="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]"
        inputBaseClassName="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[var(--text-muted)]"
        inputIndicatorBaseClassName="size-2 rounded-full bg-[#7cb8fc]"
      />
    </section>
  );
}
