import Link from "next/link";

export default function NewNavBar() {
    return (
        <nav
            style={{
                padding: '2rem 5rem',
                display: 'flex',
                flexDirection: 'column',
                fontSize: '5rem',
                fontWeight: '700'
            }}>
            <Link href="/" style={{ marginRight: '1.5rem' }} style={{ padding: '1rem' }} >
                Home
            </Link>
            <Link href="/about" style={{ marginRight: '1.5rem' }} style={{ padding: '1rem' }} >
                About
            </Link>
            <Link href="/work" style={{ marginRight: '1.5rem' }} style={{ padding: '1rem' }} >
                Work
            </Link>
        </nav>
    )
}