'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import mylogo from '../public/an-logo.svg';


export default function Loader() {
    const [display, setDisplay] = useState(true)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
            setTimeout(() => {
                setDisplay(false)
            }, 1000);
        }, 3000);
    })
    return (
        <>
            {
                display &&
                <div className={`fixed h-screen w-screen bg-white z-50 flex justify-center items-center duration-700 ease-in-out animate-colorChange ${loader ? '' : 'opacity-0 -z-40'}`}>
                    <div className="inline-flex justify-center animate-slideBlurred">
                        <Image src={mylogo} alt="vercel" className="w-[10%] mr-2" />
                        <h1 className="text-5xl"> ALFIAN <span className="font-bold">NAHAR</span></h1>

                    </div>
                </div>
            }
        </>
    )
}