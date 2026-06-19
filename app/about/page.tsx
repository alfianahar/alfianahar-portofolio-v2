import type { Metadata } from "next";
import { AboutHero } from "@components/about/about-hero";
import { createPageMetadata } from "@lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "About Alfian Nahar, an AI developer and designer building modern web applications and product interfaces.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutHero />;
}
