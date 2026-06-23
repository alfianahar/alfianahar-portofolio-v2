import { buttonClassName } from "@components/ui/button";

export function HeroCopy() {
  return (
    <div className="relative z-10 max-w-3xl">
      <p className="mb-8 inline-flex items-center gap-2 rounded-full border-[length:var(--border-bold)] border-[var(--brutal-ink)] bg-[var(--cream)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--brutal-ink)] shadow-[var(--shadow-hard-sm)]">
        <span aria-hidden="true">✦</span>
        AI-POWERED ENGINEERING
      </p>
      <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.075em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl xl:text-8xl">
        Reliable Systems. Practical AI.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl sm:leading-9">
        I build fullstack web systems, robotics interfaces, backend APIs, realtime integrations, and
        practical AI-assisted workflows that turn rough ideas into reliable products.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <a
          href="/bio"
          className={buttonClassName({ variant: "brutal", size: "lg", className: "h-14 px-7" })}
        >
          Let's Build Something
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href="/work"
          className={buttonClassName({ variant: "secondary", size: "lg", className: "h-14 px-7" })}
        >
          View My Work
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
