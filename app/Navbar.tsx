"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TiWeatherSnow } from "react-icons/ti";
import classNames from "classnames";
import styles from "./navbar.module.css";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="flex space-x-6 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <TiWeatherSnow className="text-2xl" />
      </Link>
      <ul className="flex space-x-6 max-sm:space-x-4">
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
    </nav>
  );
};

export default Navbar;
