import Link from "next/link";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
            </ul>
        </nav>
    )
}