"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import ModalNav from "./modal-nav";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const displayNavbar = pathname !== "/bio";

  return (
    <>
      {displayNavbar && (
        <header className="fixed top-0 left-0 right-0 bg-black text-white z-10">
          <div className="py-8 px-16 flex justify-between">
            <Link href="/" onClick={() => setNav(false)}>
              ALFIAN <span className="font-extrabold">NAHAR</span>
            </Link>
            <button onClick={() => setNav((current) => !current)} className="font-bold">
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
