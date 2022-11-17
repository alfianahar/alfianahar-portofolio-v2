import { Fira_Sans_Condensed } from '@next/font/google';
import Navbar from "./navbar";
import './globals.css'

const fira = Fira_Sans_Condensed({
    weight: '700',
    subsets: ["latin"]
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={fira.className}>
            <head>
                <title>Alfian Nahar</title>
            </head>
            <body style={{ margin: "0" }} >
                <main>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    );
}