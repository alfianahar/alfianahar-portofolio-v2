import { Rubik } from "@next/font/google";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  fallback: ["sans"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} font-sans`}>
      <head>
        <title>Alfian Nahar</title>
      </head>
      <body className="" style={{ margin: "0" }}>
        <Loader />
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
