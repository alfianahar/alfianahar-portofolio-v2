import Link from "next/link";

export default function Navbar() {

    return (
        <nav style={{ padding: "2rem 4rem", display: "flex", justifyContent: "space-between", position: "fixed", top: "0", left: "0", right: "0", background: "white", }}>
            <div>
                <Link href="/">LOGO</Link>
            </div>
            <div >
                <Link href="/" style={{ marginRight: "1.5rem" }}>Home</Link>
                <Link href="/about" style={{ marginRight: "1.5rem" }}>About</Link>
                <Link href="/work" style={{ marginRight: "1.5rem" }}>Work</Link>
            </div>
        </nav>
    )
}