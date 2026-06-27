const arcs = [
  "top-16 left-8 h-56 w-56",
  "bottom-10 right-12 h-72 w-72",
  "top-1/3 right-1/3 h-40 w-40",
];

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(244,250,255,0.94),rgba(241,241,230,0.58)_48%,rgba(244,250,255,0.9))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(20,39,62,0.12),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(0,149,250,0.16),transparent_26%),radial-gradient(circle_at_70%_82%,rgba(0,149,250,0.12),transparent_30%)]" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[linear-gradient(to_bottom,transparent,var(--border),transparent)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(to_right,transparent,var(--border),transparent)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:72px_72px]" />
      {arcs.map((className) => (
        <div
          key={className}
          className={`absolute rounded-full border border-(--border) bg-white/20 shadow-[0_0_80px_rgba(20,39,62,0.05)] ${className}`}
        />
      ))}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-(--background)/88 to-transparent lg:block" />
    </div>
  );
}
