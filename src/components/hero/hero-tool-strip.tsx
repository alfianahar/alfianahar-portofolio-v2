const tools = ["Next.js", "React", "TypeScript", "Tailwind", "Bun", "Vercel", "AI workflows"];

export function HeroToolStrip() {
  return (
    <div className="relative z-10 flex flex-wrap gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="rounded-full border border-[var(--border)] bg-white/68 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] shadow-sm backdrop-blur"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}
