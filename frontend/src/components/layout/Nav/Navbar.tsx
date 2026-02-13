"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Menu, XCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import NavRouter from "./NavRouter";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ user }: { user: any }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
      ? "py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
      : "py-8 bg-transparent"
      }`}>
      <div className="container-premium">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Brand */}
          <div className="flex-shrink-0 md:w-48">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-royal-gold rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <Image
                  src={logo}
                  alt="Saif Academy"
                  className="relative w-10 h-10 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="font-heading font-black text-lg text-white leading-tight uppercase italic tracking-tighter">Saif <span className="text-royal-gold">Academy</span></span>
                <span className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-black">Elite English</span>
              </div>
            </Link>
          </div>

          {/* Center: Main Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-6 lg:gap-10 flex-nowrap">
              <NavRouter mode="main" user={user} />
            </ul>
          </div>

          {/* Right: Auth Links & Mobile Toggle */}
          <div className="flex items-center justify-end gap-6 md:w-64">
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 flex-nowrap">
                <NavRouter mode="auth" user={user} />
              </ul>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:text-royal-gold transition-colors"
            >
              {isOpen ? <XCircle size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-2xl border-t border-white/5"
          >
            <ul className="flex flex-col items-center gap-8 py-12 px-6">
              <NavRouter mode="main" user={user} />
              <div className="w-20 h-px bg-white/10" />
              <NavRouter mode="auth" user={user} />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
