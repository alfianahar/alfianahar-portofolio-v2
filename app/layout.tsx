import { Rubik } from "@next/font/google";
import localFont from "@next/font/local";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import "./globals.css";

const rubik = localFont({ src: "./Rubik-VariableFont_wght.ttf" });
const rubikgoogle = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  fallback: ["sans"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.className} ${rubikgoogle.variable} font-sans`}
    >
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
