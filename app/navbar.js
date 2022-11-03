'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [disp, setDisp] = useState(true);
    const pathname = usePathname();
    useEffect(() => {
        if (pathname === '/bio') return setDisp(false);
        return setDisp(true);
        console.log(pathname);
    }, [pathname]);
    return (
        <>
            {disp && (
                <nav
                    style={{
                        padding: '2rem 4rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        background: 'black',
                    }}
                >
                    <div>
                        <Link href="/">LOGO</Link>
                    </div>
                    <div>
                        <Link href="/" style={{ marginRight: '1.5rem' }}>
                            Home
                        </Link>
                        <Link href="/about" style={{ marginRight: '1.5rem' }}>
                            About
                        </Link>
                        <Link href="/work" style={{ marginRight: '1.5rem' }}>
                            Work
                        </Link>
                        <Link href="/bio" style={{ marginRight: '1.5rem' }}>
                            Bio
                        </Link>
                    </div>
                </nav>
            )}
        </>
    );
}
