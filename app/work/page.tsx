import type { Metadata } from "next";
import { ExperienceTimeline } from "@components/work/experience-timeline";
import { ProjectFilters } from "@components/work/project-filters";
import { ProjectGrid } from "@components/work/project-grid";
import { SectionHeading } from "@components/ui/section-heading";
import { Container } from "@components/ui/container";
import { SiteFooter } from "@components/layout/site-footer";
import { experiences } from "@content/experience";
import { projects } from "@content/projects";
import { filterProjects } from "@lib/project-filters";
import { createPageMetadata } from "@lib/seo";
import type { ProjectFilter, ProjectFilterKind } from "@app-types/content";

type WorkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = createPageMetadata({
  title: "Selected Work",
  description:
    "Selected portfolio projects, responsibilities, stack, and experience from Alfian Nahar.",
  path: "/work",
});

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getActiveFilter(params: Record<string, string | string[] | undefined>): ProjectFilter {
  const kind = getSingleParam(params.kind) as ProjectFilterKind | undefined;
  const value = getSingleParam(params.value);

  if (!kind || kind === "all" || !value) {
    return { kind: "all" };
  }

  if (["tag", "type", "position"].includes(kind)) {
    return { kind, value };
  }

  return { kind: "all" };
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = searchParams ? await searchParams : {};
  const activeFilter = getActiveFilter(params);
  const filteredProjects = filterProjects(projects, activeFilter);

  return (
    <>
      <div className="bg-[var(--background)] py-20 sm:py-28">
        <Container size="wide" className="space-y-16">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects shaped around clarity, speed, and useful AI-product thinking."
              description="A focused view of public and sanitized work. Filters are intentionally simple so the portfolio does not become a noisy dashboard."
            />
            <ProjectFilters projects={projects} activeFilter={activeFilter} />
          </div>

          <ProjectGrid projects={filteredProjects} />

          <ExperienceTimeline experiences={experiences} />
        </Container>
      </div>
      <SiteFooter />
    </>
  );
}
