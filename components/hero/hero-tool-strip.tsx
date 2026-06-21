const tools = ["Next.js", "Golang", "GraphQL", "ROS", "Python", "AI Systems"];

export function HeroToolStrip() {
  return (
    <div className="relative z-10 space-y-4">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]">
        Core stack and domains
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-[var(--border)] bg-white/68 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
