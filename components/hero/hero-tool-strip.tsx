const tools = ["Next.js", "TypeScript", "Golang", "Python", "GraphQL", "AI Systems"];

export function HeroToolStrip() {
  return (
    <div className="relative z-10 flex flex-wrap gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded-full border border-[var(--border)] bg-white/68 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}
