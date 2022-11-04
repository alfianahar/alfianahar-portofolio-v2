'use client';

import Link from "next/link";

export default function NewNavBar({ setNav }) {
    return (
        <nav
            style={{
                padding: '2rem 5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                fontSize: '5rem',
                fontWeight: '700',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: '0',
                background: 'black',
                zIndex: '10',
            }}>
            <Link href="/" style={{ padding: '1rem' }} onClick={() => setNav(false)} >
                Home
            </Link>
            <Link href="/about" style={{ padding: '1rem' }} onClick={() => setNav(false)}>
                About
            </Link>
            <Link href="/work" style={{ padding: '1rem' }} onClick={() => setNav(false)}>
                Work
            </Link>
        </nav>
    )
}