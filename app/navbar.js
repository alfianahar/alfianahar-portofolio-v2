'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ModalNav from './modal-nav';

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
                <header className='fixed top-0 left-0 right-0 bg-black text-white z-10'
                >
                    <div className='py-8 px-16 flex justify-between' >
                        <Link href="/">LOGO</Link>
                        <button onClick={handleClick} >Menu</button>

                    </div>
                </header>
            )}
            {nav && <ModalNav setNav={setNav} />}

        </>
    );
}
