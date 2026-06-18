import localFont from "next/font/local";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const rubik = localFont({
  src: "./Rubik-VariableFont_wght.ttf",
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfian Nahar",
  description: "Personal portfolio for Alfian Nahar.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={rubik.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
