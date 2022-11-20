import { Rubik } from '@next/font/google';
import Loader from '../components/loader';
import Navbar from "../components/navbar";
import './globals.css'

const fira = Rubik({
    // variable: '--font-rubik',
});

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={fira.className}>
            <head>
                <title>Alfian Nahar</title>
            </head>
            <body className='' style={{ margin: "0" }} >
                <Loader />
                <main>
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    );
}