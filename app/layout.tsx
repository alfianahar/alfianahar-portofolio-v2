import localFont from "next/font/local";
import type { ReactNode } from "react";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "../src/lib/json-ld";
import { createPageMetadata } from "../src/lib/seo";
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
        <main>{children}</main>
      </body>
    </html>
  );
}
