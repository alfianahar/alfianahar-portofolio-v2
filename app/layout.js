import Navbar from "./navbar";

export default function RootLayout({ children }) {
    return (
        <html lang="en" >
            <head>
                <title>Alfian Nahar</title>
            </head>
            <body style={{ margin: "0" }}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}