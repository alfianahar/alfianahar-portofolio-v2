import { useState } from "react";
import Markdown from "react-markdown";
import { buttonClassName } from "@components/ui/button";
import type { Project } from "@app-types/content";

const STACK_VISIBLE = 4;
const STATUS_LABEL: Record<string, string> = {
  active: "In Progress",
  shipped: "Shipped",
  archived: "Archived",
};

type ProjectCardProps = {
  project: Project;
};

type ActionLink = { label: string; href: string };

function parseBodyLinks(body: string | undefined): ActionLink[] {
  if (!body) return [];
  const match = body.match(/^##\s+Links\s*$([\s\S]*?)(?=^##\s+|\z)/m);
  if (!match) return [];
  const links: ActionLink[] = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(match[1])) !== null) {
    links.push({ label: m[1], href: m[2] });
  }
  return links;
}

function stripLinksSection(body: string | undefined): string {
  if (!body) return "";
  return body.replace(/^##\s+Links\s*$([\s\S]*?)(?=^##\s+|\z)/m, "").trimEnd();
}

function pickLink(links: ActionLink[], keyword: string): ActionLink | undefined {
  return links.find((l) => l.label.toLowerCase().includes(keyword));
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.13c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.77 1.06.77 2.13v3.16c0 .31.21.67.8.56C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ActionFooter({
  primaryLabel,
  primaryHref,
  onPrimaryClick,
  demoHref,
  repoHref,
  primaryAs = "button",
  showPrimary = true,
}: {
  primaryLabel?: string;
  primaryHref?: string;
  onPrimaryClick?: () => void;
  demoHref?: string;
  repoHref?: string;
  primaryAs?: "button" | "link";
  showPrimary?: boolean;
}) {
  const primaryClass = buttonClassName({
    variant: "brutal",
    size: "sm",
    className: "h-8 px-3 text-xs",
  });
  const justifyClass = showPrimary ? "justify-between" : "justify-end";
  return (
    <div
      className={`flex flex-wrap items-end ${justifyClass} gap-3 border-t border-(--border) pt-5`}
    >
      {showPrimary && primaryLabel ? (
        primaryAs === "link" && primaryHref ? (
          <a href={primaryHref} target="_blank" rel="noreferrer" className={primaryClass}>
            {primaryLabel}
            <span aria-hidden>→</span>
          </a>
        ) : (
          <button type="button" onClick={onPrimaryClick} className={primaryClass}>
            {primaryLabel}
            <span aria-hidden>→</span>
          </button>
        )
      ) : null}

      <div className="flex items-center gap-3 self-end pb-1 text-(--text-muted)">
        {demoHref ? (
          <a
            href={demoHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-(--text-primary) transition hover:text-(--accent)"
          >
            Live Demo
            <span aria-hidden>↗</span>
          </a>
        ) : null}
        {repoHref ? (
          <a
            href={repoHref}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            title="GitHub"
            className="inline-flex items-center text-(--text-primary) transition hover:text-(--accent)"
          >
            <GitHubIcon />
          </a>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const bodyLinks = parseBodyLinks(project.body);
  const demoLink = project.links?.live
    ? { label: "Live Demo", href: project.links.live }
    : (pickLink(bodyLinks, "demo") ?? pickLink(bodyLinks, "live"));
  const repoLink = project.links?.repo
    ? { label: "Repository", href: project.links.repo }
    : (pickLink(bodyLinks, "github") ?? pickLink(bodyLinks, "repo"));

  const hasCaseStudy = Boolean(project.body);
  const visibleStack = project.stack.slice(0, STACK_VISIBLE);
  const hiddenStack = project.stack.length - visibleStack.length;
  const statusLabel = project.status ? (STATUS_LABEL[project.status] ?? project.status) : null;
  const bodyWithoutLinks = stripLinksSection(project.body);

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border-bold border-(--border) bg-(--surface) shadow-(--shadow-soft) transition duration-200 hover:-translate-y-1 hover:border-(--text-primary) hover:shadow-(--shadow-hard)">
        <div className="flex items-center gap-2 border-b border-(--border) px-5 py-3">
          <span className="rounded-full bg-(--muted-surface) px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--text-secondary)">
            {project.type}
          </span>
          {project.year ? (
            <span className="rounded-full bg-(--muted-surface) px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-(--text-secondary)">
              {project.year}
            </span>
          ) : null}
          {statusLabel ? (
            <span
              className={
                project.status === "active"
                  ? "ml-auto rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-semibold text-white"
                  : "ml-auto rounded-full bg-(--muted-surface) px-3 py-1 text-[11px] font-semibold text-(--text-secondary)"
              }
            >
              {statusLabel}
            </span>
          ) : null}
        </div>

        <div className="relative grid aspect-[16/10] place-items-center overflow-hidden border-b border-(--border) bg-[linear-gradient(135deg,var(--muted-surface),var(--surface))]">
          <img
            src={project.thumbnail.src}
            alt={project.thumbnail.alt}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col px-6 pt-6">
          <div>
            <p className="text-sm font-medium text-(--text-muted)">{project.role}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-(--text-primary)">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-(--text-secondary)">
              {project.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {visibleStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-(--border) bg-(--surface) px-3 py-1 text-xs font-medium text-(--text-secondary)"
              >
                {item}
              </span>
            ))}
            {hiddenStack > 0 ? (
              <span className="rounded-full border border-dashed border-(--border) px-3 py-1 text-xs font-medium text-(--text-muted)">
                +{hiddenStack} more
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-auto px-6 pb-6 pt-5">
          {hasCaseStudy ? (
            <ActionFooter
              primaryLabel="Case Study"
              onPrimaryClick={() => setModalOpen(true)}
              demoHref={demoLink?.href}
              repoHref={repoLink?.href}
            />
          ) : demoLink?.href || repoLink?.href ? (
            <ActionFooter
              primaryLabel="View Project"
              primaryAs="link"
              primaryHref={demoLink?.href ?? repoLink?.href}
              demoHref={demoLink?.href}
              repoHref={repoLink?.href}
            />
          ) : null}
        </div>
      </article>

      {modalOpen && project.body ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-(--border) bg-(--muted-surface) px-6 py-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                  Case Study
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-(--text-primary)">
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="cursor-pointer rounded-md p-1 text-2xl leading-none text-(--text-muted) transition hover:bg-(--surface) hover:text-(--text-primary)"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-b border-(--border) px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-(--text-secondary)">
              <span className="rounded-full bg-(--surface) px-3 py-1">{project.type}</span>
              {project.year ? (
                <span className="rounded-full bg-(--surface) px-3 py-1">{project.year}</span>
              ) : null}
              {statusLabel ? (
                <span
                  className={
                    project.status === "active"
                      ? "rounded-full bg-emerald-500/90 px-3 py-1 text-white"
                      : "rounded-full bg-(--surface) px-3 py-1"
                  }
                >
                  {statusLabel}
                </span>
              ) : null}
            </div>

            <div className="overflow-y-auto px-6 py-6 text-sm leading-relaxed text-(--text-secondary)">
              {project.stack.length > 0 ? (
                <div className="mb-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-muted)">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-(--border) bg-(--muted-surface) px-3 py-1 text-xs font-medium text-(--text-secondary)"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <Markdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-6 text-lg font-semibold text-(--text-primary) first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-(--text-primary)">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => <p className="mb-3 leading-6 last:mb-0">{children}</p>,
                  ul: ({ children }) => (
                    <ul className="mb-3 ml-5 list-disc space-y-1">{children}</ul>
                  ),
                  li: ({ children }) => <li className="leading-6">{children}</li>,
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-(--text-primary) underline decoration-2 underline-offset-2"
                    >
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) =>
                    src ? (
                      <img
                        src={typeof src === "string" ? src : ""}
                        alt={alt ?? ""}
                        className="mb-4 w-full rounded-md border border-(--border)"
                        loading="lazy"
                      />
                    ) : null,
                  strong: ({ children }) => (
                    <strong className="font-semibold text-(--text-primary)">{children}</strong>
                  ),
                }}
              >
                {bodyWithoutLinks}
              </Markdown>
            </div>

            {/* {demoLink?.href || repoLink?.href ? (
              <div className="border-t border-(--border) bg-(--muted-surface) px-6 py-4">
                <ActionFooter
                  showPrimary={false}
                  demoHref={demoLink?.href}
                  repoHref={repoLink?.href}
                />
              </div>
            ) : null} */}
          </div>
        </div>
      ) : null}
    </>
  );
}
