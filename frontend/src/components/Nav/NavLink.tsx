"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NavLink = ({ to, label }: { to: string; label?: string }) => {
  const pathName = usePathname();
  return (
    <motion.li whileHover={{ scale: 1.1 }}>
      <Link
        href={to}
        className={`uppercase font-semibold ${pathName === to ? "text-info" : ""}`}
      >
        {label || to.split("/")[1]}
      </Link>
    </motion.li>
  );
};

export default NavLink;
