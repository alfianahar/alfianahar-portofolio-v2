'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import vercel from '../public/vercel.svg';


export default function Loader() {
    const [display, setDisplay] = useState(true)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
            setTimeout(() => {
                setDisplay(false)
            }, 1000);
        }, 2000);
    })
    return (
        <>
            {
                display &&
                <div className={`fixed h-screen w-screen bg-white z-50 flex justify-center items-center duration-700 ease-in-out ${loader ? '' : 'opacity-0 -z-40'}`}>
                    <Image src={vercel} alt="vercel" className="animate-slideBlurred" />
                </div>
            }
        </>
    )
}