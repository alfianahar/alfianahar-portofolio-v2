"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import mylogo from "../public/an-logo.svg";

const Loader = () => {
  const [display, setDisplay] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
      setTimeout(() => {
        setDisplay(false);
      }, 1000);
    }, 3000);
  });
  return (
    <>
      {display && (
        <div
          className={`fixed h-screen w-screen bg-white z-50 flex justify-center items-center duration-700 ease-in-out  ${
            loader ? "" : "scale-[2] opacity-0 -z-40"
          }`}
        >
          <div className="bg-black fixed h-screen w-[200vw] flex justify-center items-center">
            <div className="-rotate-[10deg] h-screen w-[200vw] bg-gray-200"></div>
          </div>
          <div className="inline-flex justify-center items-center animate-load delay-75">
            <Image src={mylogo} alt="vercel" className="w-[10%] mr-2" />
            <h1 className="animate-text text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 ">
              {" "}
              ALFIAN NAHAR
            </h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
