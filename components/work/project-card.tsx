import { useState } from "react";
import Markdown from "react-markdown";
import type { Project } from "@app-types/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="group overflow-hidden rounded-[var(--radius-lg)] border-[length:var(--border-bold)] border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--text-primary)] hover:shadow-[var(--shadow-hard)]">
        <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-[linear-gradient(135deg,var(--muted-surface),#fff)]">
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            loading="lazy"
            className="h-full w-full object-contain p-4 opacity-90 transition duration-300 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)] backdrop-blur">
              {project.type}
            </span>
            {project.year ? (
              <span className="rounded-full border border-white/70 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--text-muted)] backdrop-blur">
                {project.year}
              </span>
            ) : null}
          </div>
          {project.status === "active" ? (
            <span className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
              In Progress
            </span>
          ) : null}
        </div>

        <div className="space-y-5 p-6">
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)]">{project.role}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.position.map((position) => (
              <span
                key={position}
                className="rounded-full bg-[var(--muted-surface)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
              >
                {position}
              </span>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Stack
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-secondary)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {project.links?.live || project.links?.repo || project.body ? (
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-[var(--text-primary)]">
              {project.links?.live ? <a href={project.links.live}>Live</a> : null}
              {project.links?.repo ? <a href={project.links.repo}>Repository</a> : null}
              {project.body ? (
                <button
                  onClick={() => setModalOpen(true)}
                  className="cursor-pointer underline decoration-2 underline-offset-2 transition hover:text-[var(--text-secondary)]"
                >
                  Case study
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </article>

      {modalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <h2 className="text-xl font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                {project.title}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="cursor-pointer text-2xl leading-none text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                &times;
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-[var(--text-secondary)]">
              <Markdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-lg font-semibold text-[var(--text-primary)] first:mt-0">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => <p className="mb-3 leading-6 last:mb-0">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
                  ),
                }}
              >
                {project.body}
              </Markdown>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
