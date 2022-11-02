import { Fira_Sans_Extra_Condensed } from '@next/font/google';
import Navbar from "./navbar";

const fira = Fira_Sans_Extra_Condensed({
    weight: '700',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <head>
                <title>Alfian Nahar</title>
            </head>
            <body style={{ margin: "0" }} className={fira.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}