import Link from "next/link";

export default function Navbar() {
    return (
        <nav style={{ padding: "1rem", display: "flex", gap: "2rem", position: "fixed   ", top: "0", }}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/work">Work</Link>
        </nav>
    )
}