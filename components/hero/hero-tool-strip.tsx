// ponytail: ordered languages → domains → frameworks/infra, flat strip.
const tools = [
  "TypeScript",
  "Python",
  "Golang",
  "AI Systems",
  "Web Apps",
  "Next.js",
  "GraphQL",
  "AWS",
];

export function HeroToolStrip() {
  return (
    <div className="relative z-10 space-y-4 mt-8">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-(--text-muted)">
        Core stack and domains
      </p>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-sm border border-(--brutal-ink) bg-(--cream) px-3 py-1.5 text-xs font-semibold text-(--brutal-ink) shadow-(--shadow-hard-sm) sm:px-4 sm:py-2 sm:text-sm"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
