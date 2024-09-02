"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "/public/logo.png";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import NavRouter from "./NavRouter";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-base-300 sticky top-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <Link href="/" className="">
                <Image src={logo} alt="Saif Academy" className="w-14" />
              </Link>
            </div>
            <div className="hidden md:block">
              <ul className="ml-10 flex items-baseline space-x-4">
                <NavRouter />
              </ul>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleNavbar} className="btn btn-ghost">
              {/* Icon when the navbar is closed */}
              <IoMenu className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`} />

              {/* Icon when the navbar is open */}
              <IoMdCloseCircleOutline
                className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <motion.ul
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1.5,
        }}
        className={`${
          isOpen ? "flex flex-col gap-2" : "hidden"
        } md:hidden p-3 pl-10 absolute top-16 my-1 left-0 w-full bg-base-300`}
      >
        <NavRouter />
      </motion.ul>
    </nav>
  );
};

export default Navbar;
