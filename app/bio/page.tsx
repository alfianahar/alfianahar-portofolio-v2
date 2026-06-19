import Link from "next/link";
import type { Metadata } from "next";
import { BioActions } from "@components/bio/bio-actions";
import { BioCard } from "@components/bio/bio-card";
import { BioChatPreview } from "@components/bio/bio-chat-preview";
import { SiteFooter } from "@components/layout/site-footer";
import { createPageMetadata } from "@lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bio",
  description:
    "Quick links, social profiles, and assistant preview for Alfian Nahar, an AI developer and designer.",
  path: "/bio",
});

export default function BioPage() {
  return (
    <>
      <div
        data-theme="dark"
        className="relative min-h-dvh overflow-hidden bg-[var(--background)] px-6 py-8 text-[var(--text-primary)] sm:px-8 lg:py-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,184,252,0.24),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(213,204,255,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-white/30 hover:text-[var(--text-primary)]"
          >
            <span aria-hidden="true">←</span>
            Back to portfolio
          </Link>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div className="grid gap-4">
              <BioCard />
              <BioActions />
            </div>
            <BioChatPreview />
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
