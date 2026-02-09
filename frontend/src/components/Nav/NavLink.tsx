"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavLinkProps {
  to: string;
  label?: string;
  variant?: "text" | "button";
}

const NavLink = ({ to, label, variant = "text" }: NavLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === to;
  const displayLabel = label || (to === "/" ? "Home" : to.split("/")[1]);

  if (variant === "button") {
    return (
      <li>
        <Link
          href={to}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
            isActive 
              ? "bg-royal-gold text-slate-900 shadow-lg shadow-amber-500/20" 
              : "border border-royal-gold/30 text-royal-gold hover:bg-royal-gold hover:text-slate-900"
          }`}
        >
          {displayLabel}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative group">
      <Link
        href={to}
        className={`uppercase font-black text-[11px] tracking-[0.2em] transition-colors duration-300 ${
          isActive ? "text-royal-gold" : "text-slate-400 hover:text-white"
        }`}
      >
        {displayLabel}
      </Link>
      {isActive && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-royal-gold"
          initial={false}
        />
      )}
    </li>
  );
};

export default NavLink;
