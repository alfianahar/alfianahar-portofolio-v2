import { profile } from "../content/profile";
import { socialLinks } from "../content/social-links";
import type { Project } from "../types/content";
import { absoluteUrl, siteConfig } from "./seo";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.displayName,
    jobTitle: profile.title,
    email: `mailto:${profile.email}`,
    url: siteConfig.url,
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };
}

export function buildProjectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absoluteUrl(project.links?.caseStudy ?? `/work/${project.slug}`),
    creator: {
      "@type": "Person",
      name: profile.name,
    },
    keywords: [...project.tags, ...project.stack].join(", "),
  };
}
