"use client";

import Link from "next/link";
import { useState } from "react";

import { links } from "../constants/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav>
      <div className="navbar">
        <div className="flex-1">
          <a className="btn btn-ghost">Yin Chu</a>
        </div>

        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <details
                open={menuOpen}
                onToggle={(e) => setMenuOpen(e.currentTarget.open)}
                className="dropdown-end"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  Projects
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded ">
                  {links.map((link) => {
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="hover:underline"
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
