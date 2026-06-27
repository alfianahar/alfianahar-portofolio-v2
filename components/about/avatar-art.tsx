export function AvatarArt() {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center rounded-lg border border-(--border) bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.18),transparent_30%),linear-gradient(135deg,#fff,var(--muted-surface))] p-8 shadow-(--shadow-soft)">
      <div className="absolute inset-6 rounded-lg border border-white/80" />
      <div className="absolute left-8 top-8 h-20 w-20 rounded-full border border-(--border) bg-white/60" />
      <div className="absolute bottom-10 right-8 h-28 w-28 rounded-full border border-(--border) bg-white/70" />
      <div className="relative grid size-48 place-items-center rounded-lg bg-(--text-primary) text-5xl font-semibold tracking-[-0.08em] text-(--background) shadow-[0_32px_80px_rgba(20,39,62,0.24)]">
        AN
      </div>
    </div>
  );
}
