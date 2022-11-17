'use client';

import Link from "next/link";

export default function ModalNav({ nav, setNav }) {
    return (
        <nav className={`py-8 px-16 flex flex-col justify-center text-7xl font-bold min-h-screen min-w-full fixed top-0 bg-black text-white transition ease-in-out duration-500 ${nav ? '' : 'opacity-0 translate-y-full'}`}>
            <Link href="/" className="border-t-4 border-indigo-500 p-8 hover:bg-slate-700" onClick={() => setNav(false)} >
                Home
            </Link>
            <Link href="/about" className="border-y-4 border-indigo-500 p-8 hover:bg-slate-700" onClick={() => setNav(false)}>
                About
            </Link>
            <Link href="/work" className="border-b-4 border-indigo-500 p-8 hover:bg-slate-700" onClick={() => setNav(false)}>
                Work
            </Link>
        </nav>
    )
}