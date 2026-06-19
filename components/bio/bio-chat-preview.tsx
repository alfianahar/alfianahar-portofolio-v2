import { chatMessages, chatQuickActions } from "@content/chatbot";
import { cn } from "@lib/utils";

export function BioChatPreview() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-2xl sm:p-6" aria-label="Assistant preview">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Alfian Assistant</p>
          <p className="text-xs text-[var(--text-muted)]">Static preview, curated answers</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
          <span className="size-2 rounded-full bg-emerald-300" />
          Preview
        </div>
      </div>

      <div className="space-y-3">
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-6",
              message.role === "user"
                ? "ml-auto bg-white text-[#14273e]"
                : "bg-white/[0.08] text-[var(--text-secondary)]",
            )}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {chatQuickActions.slice(0, 2).map((action) => (
          <span
            key={action.prompt}
            className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-[var(--text-secondary)]"
          >
            {action.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[var(--text-muted)]">
        <span className="size-2 rounded-full bg-[#7cb8fc]" />
        Ask about projects, skills, or collaboration...
      </div>
    </section>
  );
}
