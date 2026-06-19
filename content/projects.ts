import type { Project } from "@app-types/content";

export const projects = [
  {
    title: "Portfolio V2",
    slug: "portfolio-v2",
    description:
      "A light-first personal portfolio rewrite focused on premium AI-product aesthetics, SEO, structured content, and a polished chatbot preview.",
    thumbnail: {
      src: "/an-logo.svg",
      alt: "Alfian Nahar logo used as the Portfolio V2 project preview",
    },
    role: "Designer & Developer",
    position: ["personal", "lead", "fullstack"],
    type: "from scratch",
    tags: ["Portfolio", "Frontend", "SEO", "UI/UX"],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Bun", "Vercel"],
    outcome:
      "Defines the new personal brand system and technical foundation for Alfian's public portfolio.",
    links: {
      caseStudy: "/work/portfolio-v2",
    },
  },
  {
    title: "AI Assistant Interface",
    slug: "ai-assistant-interface",
    description:
      "A curated chatbot interface concept that helps visitors understand profile, work, services, and contact paths without pretending to be a full autonomous AI product.",
    thumbnail: {
      src: "/an-logo.svg",
      alt: "AN logo used as the AI assistant interface preview",
    },
    role: "Product Interface Designer",
    position: ["personal", "frontend"],
    type: "experiment",
    tags: ["AI", "UI/UX", "Frontend", "Automation"],
    stack: ["React", "TypeScript", "Tailwind CSS"],
    outcome:
      "Creates a controlled chatbot experience that supports portfolio discovery before real AI integration.",
  },
  {
    title: "Sanitized Work App Preview",
    slug: "sanitized-work-app-preview",
    description:
      "A placeholder entry for future sanitized project demos that should live as separate apps and be linked from the portfolio work section.",
    thumbnail: {
      src: "/an-logo.svg",
      alt: "AN logo used as a sanitized project preview placeholder",
    },
    role: "Developer",
    position: ["developer", "technical test"],
    type: "technical test",
    tags: ["Frontend", "Backend", "Dashboard"],
    stack: ["Next.js", "TypeScript"],
    outcome:
      "Documents the intended structure for future project case studies without exposing private work.",
  },
] satisfies Project[];
