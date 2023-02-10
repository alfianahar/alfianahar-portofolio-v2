"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import ModalNav from "./modal-nav";

const Navbar = () => {
  const [disp, setDisp] = useState(true);
  const [nav, setNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/bio") return setDisp(false);
    return setDisp(true);
  }, [pathname]);
  return (
    <>
      {disp && (
        <header className="fixed top-0 left-0 right-0 bg-black text-white z-10">
          <div className="py-8 px-16 flex justify-between">
            <Link href="/" onClick={() => setNav(false)}>
              ALFIAN <span className="font-extrabold">NAHAR</span>
            </Link>
            <button onClick={() => setNav(!nav)} className="font-bold">
              Menu
            </button>
          </div>
        </header>
      )}
      <ModalNav nav={nav} setNav={setNav} />
    </>
  );
};

export default Navbar;
