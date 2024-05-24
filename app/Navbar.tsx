"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiWeatherSnow } from "react-icons/ti";
import { AiOutlineMenu } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex space-x-6 mb-5 px-5 h-14 items-center max-sm:justify-between">
      <Link href="/">
        <TiWeatherSnow className="text-2xl max-sm:text-3xl" />
      </Link>
      <ul className="hidden sm:flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
      <div onClick={handleNav} className="sm:hidden cursor-pointer">
        <AiOutlineMenu className="text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
