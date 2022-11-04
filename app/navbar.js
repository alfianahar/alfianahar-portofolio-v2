'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import NewNavBar from './modal-nav';

export default function Navbar() {
    const [disp, setDisp] = useState(true);
    const [nav, setNav] = useState(false);
    const pathname = usePathname();

    const handleClick = () => {
        setNav(!nav)
    }

    useEffect(() => {
        if (pathname === '/bio') return setDisp(false);
        return setDisp(true);
        console.log(pathname);
    }, [pathname]);
    return (
        <>
            {disp && (
                <header
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        background: 'black',
                        zIndex: '11',
                    }}
                >
                    <div style={{
                        padding: '2rem 4rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Link href="/">LOGO</Link>
                        <button onClick={handleClick} >Menu</button>

                    </div>
                </header>
            )}
            {nav && <NewNavBar setNav={setNav} />}

        </>
    );
}
