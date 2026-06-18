import { chatMessages, chatQuickActions } from "../../content/chatbot";
import { cn } from "../../lib/utils";

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

      <div className="rounded-[1.55rem] border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-[var(--text-primary)] text-sm font-semibold text-[var(--background)]">
              AN
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Alfian Assistant</p>
              <p className="text-xs text-[var(--text-muted)]">Static preview, real content</p>
            </div>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.6)]" />
        </div>

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

        <div className="mt-5 space-y-3">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
                message.role === "user"
                  ? "ml-auto bg-[var(--text-primary)] text-[var(--background)]"
                  : "bg-[var(--muted-surface)] text-[var(--text-secondary)]",
              )}
            >
              {message.content}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {chatQuickActions.map((action) => (
            <button
              key={action.prompt}
              type="button"
              className="rounded-full border border-[var(--border)] bg-white px-3 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--text-muted)]" />
          Ask about projects, skills, or collaboration...
        </div>
      </div>
    </div>
  );
}
