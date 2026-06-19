import type { BioAction } from "@app-types/content";

export const bioActions = [
  {
    label: "View Selected Work",
    href: "/work",
    description: "See product, AI, and web projects with roles and outcomes.",
  },
  {
    label: "About Alfian",
    href: "/about",
    description: "Read the short profile, principles, and collaboration details.",
  },
  {
    label: "Start a Project",
    href: "mailto:alfian.aswinda@gmail.com",
    description: "Reach out for product design, web apps, or AI workflow work.",
    external: true,
  },
] satisfies BioAction[];
