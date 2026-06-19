import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@components/layout/site-footer";
import { SiteHeader } from "@components/layout/site-header";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@lib/json-ld";
import { createPageMetadata } from "@lib/seo";
import "./globals.css";

const rubik = localFont({
  src: "./Rubik-VariableFont_wght.ttf",
  variable: "--font-rubik",
  display: "swap",
});

export const metadata = createPageMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = [buildPersonJsonLd(), buildWebsiteJsonLd()];

  return (
    <html lang="en" className={rubik.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
