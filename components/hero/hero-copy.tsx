import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { buttonClassName } from "@components/ui/button";

// ponytail: cycling alias (fun nickname + real role), ported from three-d-sketch-web/src/hero.js.
// First pair is what SSR + the hero test see; the rest cycle in after mount.
const PAIRS = [
  { alias: "Jack of all stacks", real: "Fullstack" },
  { alias: "API blacksmith", real: "Backend" },
  { alias: "Interface crafter", real: "Frontend" },
  { alias: "Model wrangler", real: "AI Engineer" },
  { alias: "Blueprint maker", real: "Solution Architect" },
  { alias: "System weaver", real: "System Integrator" },
];
const INTERVAL = 3600;
const SWAP = 400;

export function HeroCopy() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"in" | "out" | "in-start">("in");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let inner: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setPhase("out");
      inner = setTimeout(() => {
        setI((p) => (p + 1) % PAIRS.length);
        setPhase("in-start");
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase("in")));
      }, SWAP);
    }, INTERVAL);
    return () => {
      clearInterval(id);
      clearTimeout(inner);
    };
  }, []);

  const move =
    phase === "out" ? "-translate-y-3" : phase === "in-start" ? "translate-y-3" : "translate-y-0";

  // ponytail: reserve height = tallest pair, measured live so short aliases
  // don't leave a gap and long ones don't push the layout. Re-measures on resize.
  const measureRef = useRef<HTMLSpanElement>(null);
  const [slotH, setSlotH] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const measure = () => {
      let max = 0;
      for (const child of el.children) max = Math.max(max, (child as HTMLElement).offsetHeight);
      setSlotH(max);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative z-10 max-w-3xl">
      <p className="mb-8 inline-flex items-center gap-2 rounded-full border-bold border-(--brutal-ink) bg-(--cream) px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-(--brutal-ink) shadow-(--shadow-hard-sm)">
        <span aria-hidden="true">✦</span>
        FULLSTACK AI-POWERED ENGINEERING
      </p>
      <h1 className="relative max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.075em] text-(--text-primary) sm:text-6xl lg:text-7xl xl:text-8xl">
        <span className="sr-only">
          I'm Alfian, the {PAIRS[0].alias} — {PAIRS[0].real}.
        </span>
        <span
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute inset-x-0 top-0"
        >
          {PAIRS.map((p) => (
            <span key={p.alias} className="block">
              <span className="block">{p.alias}</span>
              <span className="mt-2 block font-mono text-xs uppercase tracking-[0.22em] text-(--text-muted) sm:text-sm">
                {p.real}
              </span>
            </span>
          ))}
        </span>
        <span aria-hidden="true">
          <span className="mb-2 block text-2xl font-medium tracking-tight text-(--text-secondary) sm:text-3xl">
            I'm Alfian, the
          </span>
          <span
            className={`block transition-[opacity,transform] duration-[400ms] ease-out ${phase === "in" ? "opacity-100" : "opacity-0"} ${move}`}
            style={{ minHeight: slotH }}
          >
            <span className="block">{PAIRS[i].alias}</span>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.22em] text-(--text-muted) sm:text-sm">
              {PAIRS[i].real}
            </span>
          </span>
        </span>
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-(--text-secondary) sm:text-xl sm:leading-9">
        Reliable Systems. Practical AI. I build fullstack web apps, robotics interfaces, backend
        APIs, and realtime integrations that turn rough ideas into shipped products.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="/chat"
          className={buttonClassName({
            variant: "brutal",
            size: "lg",
            className: "h-14 px-7 sm:hidden",
          })}
        >
          Chat with my AI
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href="mailto:alfian.aswinda@gmail.com"
          className={buttonClassName({
            variant: "brutal",
            size: "lg",
            className: "h-14 px-7",
          })}
        >
          Let's Build Something
          <span aria-hidden="true">↗</span>
        </a>
        <a
          href="/work"
          className={buttonClassName({
            variant: "secondary",
            size: "lg",
            className: "h-14 px-7",
          })}
        >
          View My Work
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
